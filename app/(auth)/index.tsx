import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import ApplicationStatusCard from '../components/applicationStatusCard';
import { fontStyles } from '../../fonts';

export default function App() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  onAuthStateChanged(auth, (user) => {
    if (!user) router.replace("/")
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", auth.currentUser!.uid);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const user = docSnapshot.data();
          setUserData(user);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
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
              // setPassportData(passportDoc.data());
            }
          }

          if (userData.nationalIDApp) {
            const nationalRef = doc(db, "requests", userData.nationalIDApp);
            const nationalDoc = await getDoc(nationalRef);
            if (nationalDoc.exists()) {
              // setNationalData(nationalDoc.data());
            }
          }

          if (userData.licenseApp) {
            const licenseRef = doc(db, "requests", userData.licenseApp);
            const licenseDoc = await getDoc(licenseRef);
            if (licenseDoc.exists()) {
              // setLicenseData(licenseDoc.data());
            }
          }
        } catch (error) {
          console.error("Error fetching additional data: ", error);
        }
      };

      fetchAdditionalData();
    }
  }, [userData]);

  // Sample data for applications
  const licenseData = {
    type: "License Renewal",
    progress: 0.8,
    messages: [
      {
        submissionMessage: ["", "", "Your application is under review."],
      },
    ],
  };

  const passportData = {
    type: "Passport Renewal",
    progress: 0.6,
    messages: [
      {
        submissionMessage: ["", "", "Verification in progress."],
      },
    ],
  };

  const nationalData = {
    type: "National ID Update",
    progress: 0.3,
    messages: [
      {
        submissionMessage: ["", "", "Documents pending approval."],
      },
    ],
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primaryBlue} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={[fontStyles.sectionHeading, { marginHorizontal: 'auto' }]}>
        Welcome back {userData.userName}!
      </Text>
      <View style={styles.applicationOverviewContainer}>
        <Text style={fontStyles.subHeading}>Application Overview</Text>
        <View style={styles.Cardscontainer}>
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
        </View>
      </View>
      <StatusBar style="auto" />
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
    marginTop:32,
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
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: theme.primaryBlue,
  },
});
