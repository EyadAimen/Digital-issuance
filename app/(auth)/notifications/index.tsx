import { StatusBar } from 'expo-status-bar';


import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import NotificationMessageComponent from '../../components/notificationMessageComponent';

export default function Notifications() {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
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
