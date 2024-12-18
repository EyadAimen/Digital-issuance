import { StatusBar } from 'expo-status-bar';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { fontStyles } from '../../../fonts';
import { theme } from '../../../theme';
import FormInputField from '../../components/form/formInputField';
import FormRadioInputField from '../../components/form/formRadioInputField';
import FormDropdownField from '../../components/form/formDropdownField';
import FormPhotoUpload from '../../components/form/formPhotoUpload';
import FormButton from '../../components/form/formButton';
import { Image } from 'expo-image';

type errorsType = {
  fullName: string,
  identityNo: string,
  passportNo: string,
  collectionOffice: string,
  photoFile: string,
  
}

export default function NationalID() {
  const [fullName, setFullName] = useState<string>()
  const [identityNumber, setIdentityNumber] = useState<string>()
  const [isAbroad, setIsAbroad] = useState<boolean>(false)
  const [collectionOffice, setCollectionOffice] = useState<string>();
  const [errors, setErrors] = useState<errorsType>()
  const [photoFile, setPhotoFile] = useState<DocumentPicker.DocumentPickerAsset>()

  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;
  
  const handleSubmit = async () => {

    const isValid = validateForm()

    if (isValid) {
      const formData = {
        
        userID: auth.currentUser!.uid,
        type: "NRIC",
        fullName: fullName,
        identityNo: identityNumber,
        collectionOffice: collectionOffice,
        progress: 10,
        personalPhoto: photoFile
      };

      const initialMessage = {
        date: new Date(),
        status: "Submitted",
        message: "Application submitted successfully"
      };

      const reqRef = collection(db,"requests");
      try {
          const reqDoc = await addDoc(reqRef, formData);
          const reqDocRef = doc(db, "requests", reqDoc.id);
          const msgRef = collection(reqDocRef, "messages");
          const userRef = doc(db,"users",auth.currentUser!.uid);

          await setDoc(userRef, {nationalIDApp: reqDoc.id}, {merge : true});
          await addDoc(msgRef, initialMessage);
          setFullName("")
          setIdentityNumber("")
          setCollectionOffice("")
          setPhotoFile(undefined)
          Alert.alert(
            "Application Submitted",
            "We will notify you about the application updates",
            [{
              text: "OK",
              onPress: () => router.navigate("/"),
            }]
          );
        
      } catch(e) {
        Alert.alert(
          "Submission failed",
          "Something went wrong",
          [{
            text: "OK",
          }]
        )
      }
    }
  }

  const validateForm = () => {
    let errors = {
      fullName: "",
      identityNo: "",
      passportNo: "",
      collectionOffice: "",
      photoFile: "",
    }

    const namePattern = /^[a-zA-Z\s]+$/;
    const idPattern = /^\d{12}$/;
    const passportPattern = /^[AHK]\d{8}$/;

    if(!fullName) errors.fullName = "Full Name is required" 
    else if (!namePattern.test(fullName)) {
      errors.fullName = "Full Name must only contain letters and spaces (E.g Muhammad Amir bin Abdullah)";
    }
    if(!identityNumber) errors.identityNo = "Idenitity Number is required"
    else if (!idPattern.test(identityNumber)) {
      errors.identityNo = "Identification Number must be exactly 12 digits (E.g 970201141234)";
    }
    if(!collectionOffice) errors.collectionOffice = "Collection Office is required"
    if(!photoFile) errors.photoFile = "Personal Photo is required"

    setErrors(errors)
    if(errors.fullName || errors.collectionOffice || errors.identityNo || errors.passportNo || errors.photoFile) return false
    else return true
  }

  const  uploadDoc = async () => {
    console.log("Pressed")
    try {
        const doc: Promise<DocumentPicker.DocumentPickerResult> = DocumentPicker.getDocumentAsync({
          type: "image/*"
        })
        const assest = (await doc).assets
        if(!assest) return
        
        const file = assest[0] 
        
        setPhotoFile(file)
    } catch(err) {
      console.error(err)
    }
  }
  return (
    <ScrollView style={styles.container}>
        <Text style={fontStyles.body}>Please fill out the details below and ensure all the information are accurate</Text>
        <View style={styles.inputsContainer}>
            <FormInputField 
              label= "Full Name (as per national ID) "
              value= {fullName}
              setValue= {setFullName}
              placeholder= "E.g Muhammad Amir bin Abdullah"
              error= {errors?.fullName? errors.fullName: ""}
            />
            <FormInputField 
              label= "Identification No."
              value= {identityNumber}
              setValue= {setIdentityNumber}
              placeholder= "E.g 970201141234"
              error= {errors?.identityNo? errors.identityNo: ""}
            />
            <FormRadioInputField 
              label= "Collection Office"
              value= {isAbroad}
              setValue= {setIsAbroad}
            />
            <FormDropdownField 
              value={collectionOffice}
              setValue={setCollectionOffice}
              filter={isAbroad}
              error= {errors?.collectionOffice? errors.collectionOffice: ""}
            />
<View style={styles.specifcationContianer}>
            <Text style={fontStyles.subHeading}>Personal photo specification</Text>
            <View style={styles.specifcationTextContainer}>
              <View style={styles.specifcationItem}>
                <Text>•</Text>
                <Text style={{marginLeft: 10}}>
                  The photo background MUST be white without any shadows, backgrounds using other colors will not be accepted.
                </Text>
              </View>
              <View style={styles.specifcationItem}>
                <Text>•</Text>
                <Text style={{marginLeft: 10}}>
                  Dark colored clothing that covers the shoulders and chest.
                </Text>
              </View>
              <View style={styles.specifcationItem}>
                <Text>•</Text>
                <Text style={{marginLeft: 10}}>
                  Female applicants who wear a headscarf or hijab must wear a headscarf or hijab that is dark, unpatterned and must not cover the face.
                </Text>
              </View>
              <View style={styles.specifcationItem}>
                <Text>•</Text>
                <Text style={{marginLeft: 10}}>
                  Applicants are not allowed to wear glasses, contact lenses and any accessories on the face, ears and head.
                </Text>
              </View>
              <View style={styles.specifcationItem}>
                <Text>•</Text>
                <Text style={{marginLeft: 10}}>
                  The picture uploaded is recent (picture taken within 1 month).
                </Text>
              </View>
              <View style={styles.sampleContainer}>
                <Text style={fontStyles.subHeading}>Sample Picture</Text>
                <Image
                  style={styles.image}
                  source={require("../../../assets/sample_pic.jpg")}
                  contentFit="cover"
                  transition={100}
                />
              </View>
            </View>
            <FormPhotoUpload 
              file={photoFile}
              upload={uploadDoc}
              error={errors?.photoFile}
            />
            <FormButton 
                title= "Submit"
                handlePress= {handleSubmit}
            />
          </View>
        </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.whiteColor,
    paddingVertical: 56,
    paddingHorizontal: 18,
    gap: 48,
  },
  inputsContainer: {
    marginTop: 32,
    gap:12,
  },
  inputContianer: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  textInput: {    
    borderColor: theme.grey2Text,
    borderWidth: 1,
    alignSelf: "stretch",
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    borderRadius: 6,
  },
  specifcationContianer: {
    gap: 16,
  },
  specifcationTextContainer: {
    gap: 8,
    paddingHorizontal: 8
  },
  specifcationItem: {
    flexDirection: 'row'
  },
  sampleContainer: {
    gap: 16,
  },
  image: {
    width:246.14, 
    height: 300,
    marginHorizontal: "auto",
    marginBottom: 12,
    padding: 20,
  },
});
