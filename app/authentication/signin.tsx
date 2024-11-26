import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../../theme';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { fontStyles } from '../../fonts';

export default function SginIn() {
  // Handle the input fields
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  

  const auth = FIREBASE_AUTH;

  const handleSignIn = async() => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password).then(()=>{alert("signed in")});
      
    } catch(e: any) {
      alert('Sign in failed' + e.message);
    }
  }
  
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='position' >
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

          <Pressable style={styles.buttonStyle} onPress={handleSignIn}>
            <Text style={[fontStyles.buttonLabels, {color:theme.whiteColor}]}>Sign in</Text>
          </Pressable>

          <View style={styles.signUpBox}>
          <Text>Don't have an account? </Text>
          <Link href={"authentication/signup"} style={styles.signUpText}>Sign up</Link>
          </View>
          </KeyboardAvoidingView>
          <StatusBar style="auto" />
        </View>
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
  signUpBox: {
    flexDirection: "row",
    marginTop: 10
  },
  signUpText: {
    color: theme.primaryBlue,
  }
});
