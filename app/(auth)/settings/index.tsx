import { StatusBar } from 'expo-status-bar';
import { SetStateAction, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { FormButton } from '../../components/form/formButton';
import { FormInputField } from '../../components/form/formInputField';

export default function Settings() {
  const [userData, setUserData] = useState<any>(null); // State to store the fetched data
  const [isEdit, setEdit] = useState(false);
  const [phone, setPhone] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [showDetails, setSHowDetails] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const userDocRef = doc(db, "users", auth.currentUser!.uid);
  
  // Handle sign-out function
  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  // handle the change submit
  const handleChange = async () => {
    if(userName && phone ){
      await setDoc(userDocRef, {userName: userName, phone: phone }, {merge : true}).then(()=> {
        Alert.alert(
          "Success",
          " ",
          [{
            text: "OK"
          }]
        )  
      });
    } else {
      Alert.alert(
        "Failed",
        "One of the input fields is empty",
        [{
          text: "OK"
        }]
      )
    }
  }

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const userDocRef = doc(db, "users", auth.currentUser!.uid);
        
        await getDoc(userDocRef); 
        onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data());
            
          } 
        });
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FormButton title="Sign Out" handlePress={handleSignOut} />

      {/* Render user data */}
      <View style={styles.userDataContainer}>
        {userData ? (
            <View>
            <Text>User name: {userData.userName}</Text>
            <Text>Phone no: {userData.phone}</Text>
            {showDetails? (
              <View>
                <Text>Full name: {userData.fullName}</Text>
                <Text>NIRC: {userData.id}</Text>
              </View>
            ) : (null)
            }

            <FormButton title='Show more details' handlePress={() => {setSHowDetails(!showDetails)}}></FormButton>
            
            {isEdit? (
              <View>
                <FormInputField label={'User name'} placeholder={''} value={userName} setValue={setUserName} />
                <FormInputField label={'Phone'} placeholder={''} value={phone} setValue={setPhone} />
                <FormButton title='Confirm edit' handlePress={handleChange}></FormButton>

              </View>
            ) 
            : (null)}
            <FormButton title='Edit profile' handlePress={() => {setEdit(!isEdit)}}></FormButton>
            </View>
            
        ) : (
          <Text>No user data</Text>
        )}
      </View>
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
