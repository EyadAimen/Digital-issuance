import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Link href={"digital-issuance/authentication/signin"}>
        go to auth
      </Link>
      <Text>This is home screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: theme.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
