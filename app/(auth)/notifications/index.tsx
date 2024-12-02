import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD:app/notifications/index.tsx
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NotificationMessageComponent } from '../components/notificationMessageComponent';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
=======
import { StyleSheet, Text, View } from 'react-native';
import NotificationMessageComponent from '../../components/notificationMessageComponent';
>>>>>>> cdcf6ff47a5f873b05130afdcbd9e1dc373cce44:app/(auth)/notifications/index.tsx

export default function Notifications() {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [userData, setUserData] = useState<any>(null);
  const [licenseData, setLicenseData] = useState<any>(null);
  const [passportData, setPassportData] = useState<any>(null);
  const [nationalData, setNationalData] = useState<any>(null);

  type Message = {
    date: Date,
    status: string,
    title: string,
    message: string
  }
  const initialList : Message[] = [];
  const [notificationsList, setNotificationList] = useState<Message>(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", "pxanKx1FkCcIhByoy6XFGxZgm073");
        const docSnapshot = await getDoc(userDocRef);
        
        if (docSnapshot.exists()) {
          const user = docSnapshot.data();
          setUserData(user);

        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []); 

  // fetch the data after the userData is here
  useEffect(() => {
    if (userData) {
      const fetchAdditionalData = async () => {
        try {
          if (userData.passportApp) {
            const passportRef = doc(db, "requests", userData.passportApp);
            const passportDoc = await getDoc(passportRef);
            if (passportDoc.exists()) {
              setPassportData(passportDoc.data());
            }
          }

          if (userData.nationalIDApp) {
            const nationalRef = doc(db, "requests", userData.nationalIDApp);
            const nationalDoc = await getDoc(nationalRef);
            if (nationalDoc.exists()) {
              setNationalData(nationalDoc.data());
            }
          }

          if (userData.licenseApp) {
            const licenseRef = doc(db, "requests", userData.licenseApp);
            const licenseDoc = await getDoc(licenseRef);
            if (licenseDoc.exists()) {
              setLicenseData(licenseDoc.data());
            }
          }
        } catch (error) {
          console.error("Error fetching additional data: ", error);
        }
      };

      fetchAdditionalData();
      
    }
  }, [userData]);
  return (
    <View style={styles.container}>
      <ScrollView>

      {licenseData ? (
        <NotificationMessageComponent
        date={licenseData.messages.slice(-1)[0].submissionMessage[0].toDate()} 
        status={licenseData.messages.slice(-1)[0].submissionMessage[1]}
        title={licenseData.type}
        message={licenseData.messages.slice(-1)[0].submissionMessage[2]}
        />
      ) : null}

      {passportData ? (
        <NotificationMessageComponent
          date={passportData.messages.slice(-1)[0].submissionMessage[0].toDate()} 
          status={passportData.messages.slice(-1)[0].submissionMessage[1]}
          title={passportData.type}
          message={passportData.messages.slice(-1)[0].submissionMessage[2]}
        />
      ) : null}

      {nationalData ? (
        <NotificationMessageComponent
          date={nationalData.messages.slice(-1)[0].submissionMessage[0].toDate()} 
          status={nationalData.messages.slice(-1)[0].submissionMessage[1]}
          title={nationalData.type}
          message={nationalData.messages.slice(-1)[0].submissionMessage[2]}
        />
      ) : null}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
    paddingTop: 10,
    
  },
});
