import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { ApplicationStatusCard } from './components/applicationStatusCard';
import { FormButton } from './components/form/formButton';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

export default function App() {
  const [userData, setUserData] = useState<any>(null);
  const [licenseData, setLicenseData] = useState<any>(null);
  const [passportData, setPassportData] = useState<any>(null);
  const [nationalData, setNationalData] = useState<any>(null);

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
 
 
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
      {licenseData ? (
        <ApplicationStatusCard
          application={licenseData.type}
          progress={licenseData.progress}
          updateMessage={licenseData.messages.slice(-1)[0].submissionMessage[2]}
        />
      ) : null}

      {passportData ? (
        <ApplicationStatusCard
          application={passportData.type}
          progress={passportData.progress}
          updateMessage={passportData.messages.slice(-1)[0].submissionMessage[2]}
        />
      ) : null}

      {nationalData ? (
        <ApplicationStatusCard
          application={nationalData.type}
          progress={nationalData.progress}
          updateMessage={nationalData.messages.slice(-1)[0].submissionMessage[2]}
        />
      ) : null}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.whiteColor,
    justifyContent: 'center',
  },
});
