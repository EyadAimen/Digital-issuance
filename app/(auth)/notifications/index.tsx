import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import NotificationMessageComponent from '../../components/notificationMessageComponent';
import { theme } from '../../../theme';
import { fontStyles } from '../../../fonts';

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
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


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

      {(!licenseData && !passportData && !nationalData)?
        <View style={styles.emptyContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/bell.png")}
            // placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <Text style={fontStyles.subHeading}>No Notificaitons</Text>
          <Text style={[fontStyles.body, {color:theme.greyText}]}>You didn't get any notifications</Text>
        </View>
        :null
      }
      </ScrollView>
      <StatusBar style="auto" />
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
