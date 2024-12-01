import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< Updated upstream:app/notifications/index.tsx
import { NotificationMessageComponent } from '../components/notificationMessageComponent';
=======
import NotificationMessageComponent from '../../components/notificationMessageComponent';
>>>>>>> Stashed changes:app/(auth)/notifications/index.tsx

export default function Notifications() {
  return (
    <View style={styles.container}>
      <NotificationMessageComponent date='25 Nov 2024' status='Fail' statusMessage='missing documents' message='Submit the required documents' />
      <NotificationMessageComponent date='25 Nov 2024' status='Success' statusMessage='Ready document' message='Your document is ready please come t the facility and collect the document' />
      <NotificationMessageComponent date='25 Nov 2024' status='Warning' statusMessage='Come to the facility to address this issue' message='Some security measure must be done before processding with the rest procedures' />
      <NotificationMessageComponent date='25 Nov 2024' status='Fail' statusMessage='missing documents' message='Submit the required documents' />
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
