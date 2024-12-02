import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Modal, Pressable } from 'react-native';
import { theme } from '../../theme';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ApplicationStatusCard from '../components/applicationStatusCard';
import { fontStyles } from '../../fonts';
import { router } from 'expo-router';
import ApplicationDetailsModal from '../components/applicationDetailsModal';

export default function App() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Sample data
  const applications = [
    {
      type: "License Renewal",
      progress: 0.8,
      updateMessage: "Your application is under review.",
    },
    {
      type: "Passport Renewal",
      progress: 0.6,
      updateMessage: "Verification in progress.",
    },
    {
      type: "National ID Update",
      progress: 0.3,
      updateMessage: "Documents pending approval.",
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primaryBlue} />
      </View>
    );
  }

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
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
          {applications.map((app, index) => (
            <ApplicationStatusCard
              key={index}
              application={app.type}
              progress={app.progress}
              updateMessage={app.updateMessage}
              onPress={() => handleViewDetails(app)} // Pass selected application
            />
          ))}
        </View>
      </View>
      <ApplicationDetailsModal 
        isModalVisible={isModalVisible} 
        setIsModalVisible = {setIsModalVisible}
        application={selectedApplication}
      />
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
