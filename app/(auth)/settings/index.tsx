import { StatusBar } from 'expo-status-bar';
import { SetStateAction, useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { Alert, StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { fontStyles } from '../../../fonts';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '../../../theme';
import { router } from 'expo-router';

export default function Settings() {
  const [userData, setUserData] = useState<any>(null); // State to store the fetched data
  const [isEdit, setEdit] = useState(false);
  const [phone, setPhone] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [showDetails, setSHowDetails] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const userDocRef = doc(db, "users", auth.currentUser!.uid);

  const handleSignOut = () => {
    Alert.alert(
      `${userData.userName}`,
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign out",
          onPress: async () => {
            try {
              await signOut(FIREBASE_AUTH);
              console.log("User signed out successfully");
            } catch (error) {
              console.error("Error signing out:", error);
            }
          },
          style: "destructive",
        },
      ]
    )
  }

  const handleChangePassword = async () => {
    const email = FIREBASE_AUTH.currentUser?.email;

    if (email)
  
    Alert.alert(
      "Change Password",
      "Are you sure you want to reset your password? An email with a reset link will be sent to your registered email address.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await sendPasswordResetEmail(FIREBASE_AUTH, email);
              Alert.alert("Success", "A password reset link has been sent to your email.", [{ text: "OK" }]);
            } catch (error: any) {
              console.error("Error sending password reset email:", error);
              Alert.alert("Error", error.message || "Failed to send the password reset email.", [{ text: "OK" }]);
            }
          },
          style: "default",
        },
      ]
    )
    }
  

  // handle the change submit
  const handleChange = async () => {
    if (userName && phone) {
      await setDoc(userDocRef, { userName: userName, phone: phone }, { merge: true }).then(() => {
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
      <View style={styles.settingsItemContainer}>
          <Pressable style={styles.settingsItem} onPress={handleChangePassword}>
            <AntDesign name="lock1" size={28} color={theme.blackText} />
            <Text style={fontStyles.subHeading}>Change Password</Text>
          </Pressable>
          <Pressable style={styles.settingsItem} onPress={handleSignOut}>
            <AntDesign name="logout" size={24} color={theme.blackText} />
            <Text style={fontStyles.subHeading}>Signout</Text>
          </Pressable>
        </View>
      {/* Render user data */}
      {/* <View style={styles.userDataContainer}> */}


        {/* {userData ? (
          <View>
            <Text style={[fontStyles.subHeading, { marginHorizontal: 'auto' }]}>{userData.userName}</Text>
            <Text style={[fontStyles.subHeading, {marginHorizontal:'auto'}]}>Phone no: {userData.phone}</Text> 
            {showDetails? (
              <View>
                <Text>Full name: {userData.fullName}</Text>
                <Text>NIRC: {userData.id}</Text>
              </View>
            ) : (null)
          }

            <FormButton title='Show more details' handlePress={() => {setSHowDetails(!showDetails)}}></FormButton>

            {isEdit ? (
              <View>
                <FormInputField label={'User name'} placeholder={''} value={userName} setValue={setUserName} />
                <FormInputField label={'Phone'} placeholder={''} value={phone} setValue={setPhone} />
                <FormButton title='Confirm edit' handlePress={handleChange}></FormButton>
              </View>
            )
              : (null)}
            <FormButton title='Edit profile' handlePress={() => { setEdit(!isEdit) }}></FormButton>
          </View>

        ) : (
          <Text>No user data</Text>
        )} */}
        {/* <FormButton title="Sign Out" handlePress={handleSignOut} /> */}
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
  // userDataContainer: {
  //   marginTop: 20,
  //   padding: 10,
  //   width: '80%',
  //   gap: 10,
  // },
  // userData: {
  //   padding: 10,
  //   borderBottomWidth: 1,
  //   borderColor: '#ddd',
  //   marginBottom: 10,
  // },
  settingsItemContainer: {
    marginTop: 48,
    gap: 12
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    borderBottomColor: theme.grey2Text,
    borderBottomWidth: 2
  },
});
