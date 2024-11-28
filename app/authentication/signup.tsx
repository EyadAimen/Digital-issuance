import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { fontStyles } from '../../fonts';
import { theme } from '../../theme';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { collection, doc, setDoc } from 'firebase/firestore';


export default function SignUp() {
  // Handle the input fields
  const [userName, setUserName] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [identityNumber, setIdentityNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  
  const handleSignUp = async() => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password).then(async () => {
        try {
          const userData = {
            userName: userName,
            fullName: fullName,
            id: identityNumber,
            phone: phone
          }
          const userRef = doc(db,"users",auth.currentUser!.uid);
          await setDoc(userRef, userData);
        } catch(e) {
          alert("something went wrong");
        }
      });
      
    } catch(e: any) {
      alert('Sign up failed' + e.message);
    }
  }
  
  return (
    <ScrollView style={styles.container} >
        <KeyboardAvoidingView behavior='position' >
        
        <View style={styles.inputsContainer}>
            {/* User name */}
            <View style={styles.inputContianer}>
              <Text>User Name <Text style={{color:theme.failColor}}>*</Text></Text>
              <TextInput
                value={userName}
                style={styles.textInput}
                onChangeText={setUserName}
                placeholder="E.g Muhammad"
              />
            </View>


            {/* Full name */}
            <View style={styles.inputContianer}>
              <Text>Full Name <Text style={{color:theme.failColor}}>*</Text></Text>
              <TextInput
                value={fullName}
                style={styles.textInput}
                onChangeText={setFullName}
                placeholder="E.g Muhammad Amir bin Abdullah"
              />
            </View>
            
            {/* Email */}
            <View style={styles.inputContianer}>
              <Text>Email<Text style={{color:theme.failColor}}>*</Text></Text>
              <TextInput
                value={email}
                style={styles.textInput}
                onChangeText={setEmail}
                placeholder="E.g muhammad@gmail.com"
              />
            </View>


            {/* Identification No */}
            <View style={styles.inputContianer}>
              <Text>NRIC/Passoprt Number<Text style={{color:theme.failColor}}>*</Text></Text>
              <TextInput
                value={identityNumber}
                style={styles.textInput}
                onChangeText={setIdentityNumber}
                placeholder="E.g 970201141234"
              />
            </View>

            {/* Identification No */}
            <View style={styles.inputContianer}>
              <Text>Phone number<Text style={{color:theme.failColor}}>*</Text></Text>
              <TextInput
                value={phone}
                style={styles.textInput}
                onChangeText={setPhone}
                placeholder="E.g +60112121112"
              />
            </View>
            
            {/* Passowrd */}
            <View style={styles.inputContianer}>
              <Text>Password<Text style={{color:theme.failColor}}>*</Text></Text>
              <TextInput
                value={password}
                style={styles.textInput}
                onChangeText={setPassword}
                placeholder="E.g Password123"
                secureTextEntry={true}
              />
            </View>

            {/* Confirm passowrd */}
            <View style={styles.inputContianer}>
              <Text>Password<Text style={{color:theme.failColor}}>*</Text></Text>
              <TextInput
                value={confirmPassword}
                style={styles.textInput}
                onChangeText={setConfirmPassword}
                placeholder="E.g Password123"
                secureTextEntry={true}
              />
            </View>
          
          <Pressable style={styles.buttonStyle} onPress={handleSignUp}>
            <Text style={[fontStyles.buttonLabels, {color:theme.whiteColor}]}>Sign up</Text>
          </Pressable>
          
        </View>
      <StatusBar style="auto" />
      </KeyboardAvoidingView>
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
  buttonStyle: {
    backgroundColor: theme.primaryBlue,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 6,
    marginTop: 20,
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
  
});