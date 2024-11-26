import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { fontStyles } from '../../fonts';
import { theme } from '../../theme';
import { Dimensions } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Dropdown } from 'react-native-element-dropdown';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';

var width = Dimensions.get('window').width

export default function Passport() {
  const [fullName, setFullName] = useState<string>()
  const [identityNumber, setIdentityNumber] = useState<string>()
  const [passportNumber, setPassportNumber] = useState<string>()
  const [isAbroad, setIsAbroad] = useState<boolean>(false)
  const [collectionOffice, setCollectionOffice] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);
  const formData = new FormData();

  let data = [{
    value: 'Banana', label: "Banana"
  }, {
    value: 'Mango', label: "Mango",
  }, {
    value: 'Pear', label: "Pear",
  }]

  let photoFile: Blob = new Blob()
  
  const handleSubmit = () => {
    // console.log("Full Name: ", fullName)
    // console.log("Identity No: ", identityNumber)
    // console.log("Passport No: ", passportNumber)
    // console.log("Is Abroad: ", isAbroad)
    console.log("Photo File: ", photoFile)
    if(fullName) formData.append("fullName", fullName)
    if(identityNumber) formData.append("identityNo", identityNumber)
    if(passportNumber) formData.append("passportNo", passportNumber)
    formData.append("passportPhoto", photoFile)

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
        
        photoFile = new Blob ([JSON.stringify({
          name: file.name.split(".")[0],
          uri: file.uri,
          type: file.mimeType,
          size: file.size,
          })]
        )
    } catch(err) {
      console.error(err)
    }
  }
  return (
    <ScrollView style={styles.container}>
        <Text style={fontStyles.body}>Please fill out the details below and ensure all the information are accurate</Text>
        <View style={styles.inputsContainer}>
            <View style={styles.inputContianer}>
              <Text>Full Name (as per passport) <Text style={{color:theme.failColor}}>*</Text></Text>
              <TextInput
                value={fullName}
                style={styles.textInput}
                onChangeText={setFullName}
                placeholder="E.g Muhammad Amir bin Abdullah"
              />
            </View>
            <View style={styles.inputContianer}>
              <Text>Identification No.<Text style={{color:theme.failColor}}>*</Text></Text>
              <TextInput
                value={identityNumber}
                style={styles.textInput}
                onChangeText={setIdentityNumber}
                placeholder="E.g 970201141234"
              />
            </View>
            <View style={styles.inputContianer}>
              <Text>No. Current Passport<Text style={{color:theme.failColor}}>*</Text></Text>
              <TextInput
                value={passportNumber}
                style={styles.textInput}
                onChangeText={setPassportNumber}
                placeholder="E.g A02667184"
              />
            </View>
            <View style={styles.inputContianer}>
              <Text>Collection Office<Text style={{color:theme.failColor}}>*</Text></Text>
              <RadioButtonGroup
                containerStyle={styles.radioContainer}
                selected={isAbroad}
                onSelected={setIsAbroad}
                radioBackground={theme.primaryBlue}
                size={20}
                containerOptionStyle={styles.radioButton}
              >
                <RadioButtonItem 
                  value={false}
                  label= {
                    <Text style={fontStyles.body}>In the Country</Text>
                  }
                />
                <RadioButtonItem
                  value={true}
                  label={
                    <Text style={fontStyles.body}>Abroad</Text>
                  }
                />
              </RadioButtonGroup>
          </View>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={collectionOffice}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setCollectionOffice(item.value);
                  console.log(item.value)
                  setIsFocus(false);
                }}
              />
          <View style={styles.specifcationContianer}>
            <Text style={fontStyles.subHeading}>Personal photo specification</Text>
            <View style={styles.specifcationText}>
              <Text>
                {'\u2022   '}The photo background MUST be white without any shadows, backgrounds using other colors will not be accepted.
              </Text>
              <Text>
                {'\u2022  '}Dark colored clothing that covers the shoulders and chest.
              </Text>
              <Text>
                {'\u2022  '}Female applicants who wear a headscarf or hijab must wear a headscarf or hijab that is dark, unpatterned and must not cover the face.
              </Text>
              <Text>
                {'\u2022  '}Applicants are not allowed to wear glasses, contact lenses and any accessories on the face, ears and head.
              </Text>
              <Text>
                {'\u2022  '}The picture uploaded is the latest face (picture taken within 1 month).
              </Text>
            </View>
            <View style={styles.fileUploadContainer}>
              <FontAwesome name="file-photo-o" size={32} color={theme.lightBlue} />
                {photoFile? 
                <View style={styles.uploadBtnContainer}>
                  <Pressable onPress={uploadDoc}><Text style={[fontStyles.body, {color:theme.lightBlue}]}>Click here</Text></Pressable>
                  <Text style={fontStyles.body}> to upload</Text>
                </View>:
                <View></View>
                }
            </View>
          </View>
          <Pressable style={styles.buttonStyle} onPress={handleSubmit}>
            <Text style={[fontStyles.buttonLabels, {color:theme.whiteColor}]}>Submit</Text>
          </Pressable>
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
  radioContainer: {
    flexDirection: "row",
    gap: 16,
  },
  radioButton: {
    gap: 4,
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: theme.primaryBlue,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 6,
    marginTop: 48,
  },

  dropdown: {
    borderColor: theme.grey2Text,
    borderWidth: 1,
    alignSelf: "stretch",
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    borderRadius: 6,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  specifcationContianer: {
    gap: 16,
  },
  specifcationText: {
    gap: 8,
    paddingHorizontal: 8
  },
  fileUploadContainer: {
    alignItems: "center",
    gap: 12,
    borderStyle: 'dashed',
    borderColor: theme.lightBlue,
    borderWidth: 3,
    paddingHorizontal: 16,
    paddingVertical: 48,
    borderRadius: 6
  },
  uploadBtnContainer: {
    flexDirection: 'row'
  }
});
