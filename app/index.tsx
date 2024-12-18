import { Link, router, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../theme';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { fontStyles } from '../fonts';
import FormButton from './components/form/formButton';
import FormInputField from './components/form/formInputField';


export default function SginIn() {
  // Handle the input fields
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleSignIn = async() => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch(e: any) {
      Alert.alert(
        "Sign in failed",
        e.message,
        [{
          text: "Ok"
        }]
      );
    } finally { setLoading(false) }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primaryBlue} />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='position' >
            {/* Email */}
            <FormInputField label={'Email'} placeholder={"E.g muhammad@gmail.com"} value={email} setValue={setEmail} />
            
            {/* Passowrd */}
            <FormInputField label={'Password'} placeholder={"E.g Password123"} value={password} setValue={setPassword} isSecure={true} />

          <FormButton 
            title='Sign in'
            handlePress={handleSignIn}
          />
          <View style={styles.signUpBox}>
          <Text>Don't have an account? </Text>
          <Link href={"/signup"} style={styles.signUpText}>Sign up</Link>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.whiteColor,
  }
});