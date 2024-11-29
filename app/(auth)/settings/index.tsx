import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FormButton } from '../../components/form/formButton';

export default function Settings() {
  const [userData, setUserData] = useState<any>(null); // State to store the fetched data
  const [isEdit, setEdit] = useState(false);
  const [isChangePassword, setChangePassword] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  // Handle sign-out function
  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      Alert.alert(
        "Success",
        "You have signed out successfully",
        [{
          text: "OK",
          onPress: () => router.navigate("authentication/signin")
        }]
      );
    });
  };

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", "pxanKx1FkCcIhByoy6XFGxZgm073");
        const docSnapshot = await getDoc(userDocRef); 
        
        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [auth.currentUser!.uid]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Settings Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />

      {/* Render user data */}
      <View style={styles.userDataContainer}>
        {userData ? (
            <View>
            <Text>Name: {userData.userName}</Text>
            <Text>Email: {userData.email}</Text>
            </View>
            
        ) : (
          <Text>No user data</Text>
        )}
      </View>
      <FormButton title={'Sign Up'} handlePress={handleSignOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDataContainer: {
    marginTop: 20,
    padding: 10,
    width: '80%',
  },
  userData: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
});
