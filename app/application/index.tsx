import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApplicationNavigationComponent } from '../components/applicationNavigationComponent';
import { theme } from '../../theme';
import { fontStyles } from '../../fonts';

export default function Application() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={fontStyles.body}>Select the document type you want to renew</Text>
      <View style={styles.applicationContainer}>
        <ApplicationNavigationComponent appName="Passport" onPress={() => router.navigate("/application/passport")} />
        <ApplicationNavigationComponent appName="National ID" onPress={() => router.navigate("/application/national_id")} />
        <ApplicationNavigationComponent appName="License" onPress={() => router.navigate("/application/license")} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.whiteColor,
    paddingVertical: 48,
    paddingHorizontal: 18,
    gap: 32,
    // justifyContent: 'center',
  },
  text: {
    color: theme.blackText,
    marginHorizontal: 15,
    marginBottom: 10,
    fontSize:22,
    fontWeight:'500',
  },
  applicationContainer: {
    flexDirection: 'row',
  }
});
