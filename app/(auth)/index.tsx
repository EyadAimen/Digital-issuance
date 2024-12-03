import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Modal, Pressable } from 'react-native';
import { theme } from '../../theme';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ApplicationStatusCard from '../components/applicationStatusCard';
import { fontStyles } from '../../fonts';
import { router } from 'expo-router';
import ApplicationDetailsModal from '../components/applicationDetailsModal';

export default function App() {
  const [userData, setUserData] = useState<any>(null);
  const [licenseData, setLicenseData] = useState<any>(null);
  const [licenseLastMessage, setLicenseLastMessage] = useState<any>(null);
  const [passportData, setPassportData] = useState<any>(null);
  const [passportLastMessage, setPassportLastMessage] = useState<any>(null);
  const [nationalData, setNationalData] = useState<any>(null);
  const [nationalLastMessage, setNationalLastMessage] = useState<any>(null);


  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  onAuthStateChanged(auth, (user) => {
    if (!user) router.replace("/");
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", auth.currentUser!.uid);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data());
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
              const mesgCollection = collection(passportRef, "messages");
              const q = query(mesgCollection, orderBy("date", "desc"), limit(1));
              const querySnapshot = await getDocs(q);
            
              if(!querySnapshot.empty) {
                const lastDoc = querySnapshot.docs[0];
                setPassportLastMessage(lastDoc.data());
              }
            }
          }

          if (userData.nationalIDApp) {
            const nationalRef = doc(db, "requests", userData.nationalIDApp);
            const nationalDoc = await getDoc(nationalRef);
            if (nationalDoc.exists()) {
              setNationalData(nationalDoc.data());
              const mesgCollection = collection(nationalRef, "messages");
              const q = query(mesgCollection, orderBy("date", "desc"), limit(1));
              const querySnapshot = await getDocs(q);
            
              if(!querySnapshot.empty) {
                const lastDoc = querySnapshot.docs[0];
                setNationalLastMessage(lastDoc.data());
              }
            }
          }

          if (userData.licenseApp) {
            const licenseRef = doc(db, "requests", userData.licenseApp);
            const licenseDoc = await getDoc(licenseRef);
            if (licenseDoc.exists()) {
              setLicenseData(licenseDoc.data());
              const mesgCollection = collection(licenseRef, "messages");
              const q = query(mesgCollection, orderBy("date", "desc"), limit(1));
              const querySnapshot = await getDocs(q);
            
              if(!querySnapshot.empty) {
                const lastDoc = querySnapshot.docs[0];
                setLicenseLastMessage(lastDoc.data());
              }
              
            }
          }
        } catch (error) {
          console.error("Error fetching additional data: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAdditionalData();
    }
  }, [userData]); 




  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primaryBlue} />
      </View>
    );
  }

  const handleViewDetails = (application: any, message: any) => {
    setSelectedApplication(application);
    setSelectedMessage(message);
    setIsModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[fontStyles.sectionHeading, { marginHorizontal: 'auto' }]}>
        Welcome back {userData.userName}!
      </Text>
      <View style={styles.applicationOverviewContainer}>
        <Text style={fontStyles.subHeading}>Application Overview</Text>
        <View style={styles.Cardscontainer}>
          {passportData? (
            <ApplicationStatusCard 
            application={passportData.type}
            progress={passportData.progress}
            onPress={() => handleViewDetails(passportData, passportLastMessage)}
            />
          ) : (null)}

          {nationalData? (
            <ApplicationStatusCard 
            application={nationalData.type}
            progress={nationalData.progress}
            onPress={() => handleViewDetails(nationalData, nationalLastMessage)}
            />
          ) : (null)}

          {licenseData? (
            <ApplicationStatusCard 
            application={licenseData.type}
            progress={licenseData.progress}
            onPress={() => handleViewDetails(licenseData, licenseLastMessage)}
            />
          ) : (null)}
          
        </View>
      </View>
      {isModalVisible? (

        <ApplicationDetailsModal
          isModalVisible={isModalVisible} 
          setIsModalVisible = {setIsModalVisible}
          application={selectedApplication}
          msg={selectedMessage}
        />
      ) : (null)

      }
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
  applicationOverviewContainer: {
    marginTop: 32,
    gap: 16,
  },
  Cardscontainer: {
    gap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.whiteColor,
  }
});
