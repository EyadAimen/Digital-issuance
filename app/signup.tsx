import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { fontStyles } from '../fonts';
import { theme } from '../theme';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import {  doc, setDoc } from 'firebase/firestore';
import { router } from 'expo-router';
import FormInputField from './components/form/formInputField';
import FormButton from './components/form/formButton';


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
      await createUserWithEmailAndPassword(auth, email, password).then(async () => {
        try {
          const userData = {
            userName: userName,
            fullName: fullName,
            id: identityNumber,
            phone: phone
          }
          const userRef = doc(db,"users",auth.currentUser!.uid);
          await setDoc(userRef, userData).then(()=> {router.navigate("/(auth)")});
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
        <KeyboardAvoidingView behavior='padding' >
        
            {/* User name */}
            <FormInputField label={'User Name'} placeholder={'E.g Muhammad'} value={userName} setValue={setUserName} />
            
            {/* Full name */}
              <FormInputField label={'Full Name'} placeholder={'E.g Muhammad Amir bin Abdullah'} value={fullName} setValue={setFullName} />
              
            {/* Email */}
            
            <FormInputField label={'Email'} placeholder={"E.g muhammad@gmail.com"} value={email} setValue={setEmail} />
          
            {/* Identification No */}
            <FormInputField label={'NRIC/Passoprt Number'} placeholder={"E.g 970201141234"} value={identityNumber} setValue={setIdentityNumber} />
            
            {/* Identification No */}
            <FormInputField label={'Phone number'} placeholder={"E.g +60112121112"} value={phone} setValue={setPhone} />
            

            {/* Password */}
            <FormInputField label={'Password'} placeholder={"E.g Password123"} value={password} setValue={setPassword} isSecure={true} />

            {/* Confirm passowrd */}
            <FormInputField label={'Confirm Password'} placeholder={"E.g Password123"} value={confirmPassword} setValue={setConfirmPassword} isSecure={true} />

            <FormButton title={'Sign up'} handlePress={handleSignUp} />
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
});