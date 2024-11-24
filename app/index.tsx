import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { ApplicationStatusCard } from './components/applicationStatusCard';

export default function App() {
  return (
    <View style={styles.container}>
      <ApplicationStatusCard application='License' progress={50} updateMessage='security check completed'/>
      <ApplicationStatusCard application='License' progress={50} updateMessage='security check completed'/>
      <ApplicationStatusCard application='License' progress={50} updateMessage='security check completed'/>
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
});
