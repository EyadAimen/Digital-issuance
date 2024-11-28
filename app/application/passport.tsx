import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { fontStyles } from '../../fonts';
import { theme } from '../../theme';
import * as DocumentPicker from 'expo-document-picker';
import { FormInputField } from '../components/form/formInputField';
import { FormRadioInputField } from '../components/form/formRadioInputField';
import { FormDropdownField } from '../components/form/formDropdownField';
import { FormButton } from '../components/form/formButton';
import { FormPhotoUpload } from '../components/form/formPhotoUpload';
import { router } from 'expo-router';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

type errorsType = {
  fullName: string,
  identityNo: string,
  passportNo: string,
  collectionOffice: string,
  photoFile: string,
  
}

export default function Passport() {
  const [fullName, setFullName] = useState<string>()
  const [identityNumber, setIdentityNumber] = useState<string>()
  const [passportNumber, setPassportNumber] = useState<string>()
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
        userID: "pxanKx1FkCcIhByoy6XFGxZgm073",
        // userID: auth.currentUser!.uid,
        type: "Passport",
        fullName: fullName,
        identityNo: identityNumber,
        passportNo: passportNumber,
        collectionOffice: collectionOffice,
        personalPhoto: photoFile
      };
      const reqRef = collection(db,"requests");
      try {
        await addDoc(reqRef, formData).then(()=> {
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
        })
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
    if(!passportNumber) errors.passportNo = "Passport Number is required"
    else if (!passportPattern.test(passportNumber)) {
      errors.passportNo = "The Passport Number must start with either 'A,' 'H,' or 'K,' followed by exactly 8 digits (e.g., A02667184).";
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
              label= "Full Name (as per passport) "
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
            <FormInputField 
              label= "No. Current Passport"
              value= {passportNumber}
              setValue= {setPassportNumber}
              placeholder= "E.g A02667184"
              error= {errors?.passportNo? errors.passportNo: ""}
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
  }
});
