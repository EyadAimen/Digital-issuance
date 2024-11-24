import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApplicationNavigationComponent } from '../components/applicationNavigationComponent';
import { theme } from '../../theme';

export default function Application() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select the the document that you want to renew</Text>
      <ApplicationNavigationComponent appName="License" onPress={() => router.navigate("/application/license")} />
      <ApplicationNavigationComponent appName="Passport" onPress={() => router.navigate("/application/passport")} />
      <ApplicationNavigationComponent appName="National ID" onPress={() => router.navigate("/application/national_id")} />
  
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
  text: {
    color: theme.blackText,
    marginHorizontal: 15,
    marginBottom: 10,
    fontSize:22,
    fontWeight:'500',
    
  }
});
