import { StatusBar } from 'expo-status-bar';


import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import NotificationMessageComponent from '../../components/notificationMessageComponent';
import { theme } from '../../../theme';
import { fontStyles } from '../../../fonts';
import { Image } from 'expo-image';

export default function Notifications() {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  type Message = {
    id: string,
    date: Date,
    status: string,
    title: string,
    message: string
  }
  const initialList : Message[]  = [{id: "0",date: new Date(), status: "", title: "", message: ""}]
  const [notificationsList, setNotificationList] = useState<Message[]>(initialList); 

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userDocRef = doc(db, "users", auth.currentUser!.uid);
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
          let newNotifications: Message[] = [];
          if (userData.passportApp) {
            const passportRef = doc(db, "requests", userData.passportApp);
            const passportDoc = await getDoc(passportRef);
            const mesgCollection = collection(passportRef, "messages");
            const querySnapshot = await getDocs(mesgCollection);
            const passportNotifications: Message[] = querySnapshot.docs.map((doc) => {
              const data = doc.data();
              const date = data.date.toDate();
              return {id: date.toTimeString(), date: date, status: data.status, title: passportDoc.data()!.type,message: data.message};
            });

            newNotifications = [...newNotifications, ...passportNotifications];
            

          }

          if (userData.nationalIDApp) {
            const nationalRef = doc(db, "requests", userData.nationalIDApp);
            const nationalDoc = await getDoc(nationalRef);
            const mesgCollection = collection(nationalRef, "messages");
            const querySnapshot = await getDocs(mesgCollection);
            const nationalIDNotifications: Message[] = querySnapshot.docs.map((doc) => {
              const data = doc.data();
              const date = data.date.toDate();
              return {id: date.toTimeString(), date: date, status: data.status, title: nationalDoc.data()!.type,message: data.message};
            });

            newNotifications = [...newNotifications, ...nationalIDNotifications];


          }

          if (userData.licenseApp) {
            const licenseRef = doc(db, "requests", userData.licenseApp);
            const licenseDoc = await getDoc(licenseRef);
            const mesgCollection = collection(licenseRef, "messages");
            const querySnapshot = await getDocs(mesgCollection);
            const licenseNotifications: Message[] = querySnapshot.docs.map((doc) => {
              const data = doc.data();
              const date = data.date.toDate();
              return {id: date.toTimeString(), date: date, status: data.status, title: licenseDoc.data()!.type,message: data.message};
            });

            newNotifications = [...newNotifications, ...licenseNotifications];

          }
          setNotificationList(newNotifications)
          setLoading(false);

        } catch (error) {
          setLoading(false);
          console.error("Error fetching additional data: ", error);
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
  return (
    <View style={styles.container}>
      <ScrollView style={styles.notificationContainer}>
        {
          notificationsList.map(item => (
            <NotificationMessageComponent 
              date={item.date}
              status = {item.status}
              title= {item.title}
              message= {item.message}
              key={item.id}
            />
          ))
        }
      </ScrollView>
      {!notificationsList?
        <View style={styles.emptyContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/bell.png")}
            contentFit="cover"
            transition={100}
          />
          <Text style={fontStyles.subHeading}>No Notificaitons</Text>
          <Text style={[fontStyles.body, {color:theme.greyText}]}>You didn't get any notifications</Text>
        </View>
        :null
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.whiteColor,
    paddingVertical: 32,
    // gap: 32,
  },
  notificationContainer: {
    gap: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.whiteColor,
    paddingVertical: 56,
    paddingHorizontal: 18,
    gap: 48,
  },
  image: {
    width:100, 
    height: 100,
    marginBottom: 12
  },
  emptyContainer: {
    alignItems:'center',
    justifyContent: 'center',
    gap: 10,
  },
});
