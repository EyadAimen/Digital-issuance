import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { fontStyles } from '../../fonts';
import { theme } from '../../theme';
import { Dimensions } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

var width = Dimensions.get('window').width

export default function Passport() {
  const [fullName, setFullName] = useState<string>()
  const [isAbroad, setIsAbroad] = useState<boolean>(false)
  return (
    <View style={styles.container}>
      <View style={styles.promptContainer}>
        <Text style={fontStyles.subHeading}>Passport Renew Application</Text>
        <Text style={fontStyles.body}>Please fill out the details below and ensure all the information is accurate</Text>
      </View>
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
            value={fullName}
            style={styles.textInput}
            onChangeText={setFullName}
            placeholder="E.g 970201141234"
          />
        </View>
        <View style={styles.inputContianer}>
          <Text>No. Current Passport<Text style={{color:theme.failColor}}>*</Text></Text>
          <TextInput
            value={fullName}
            style={styles.textInput}
            onChangeText={setFullName}
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
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 72,
    paddingHorizontal: 18,
    gap: 32,
  },
  promptContainer: {
    display: "flex",
    gap: 12,
  },
  inputsContainer: {

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
  }
});
