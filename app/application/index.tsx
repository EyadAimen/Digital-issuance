import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Application() {
  return (
    <View style={styles.container}>
      <Text>This is application screen</Text>
      <Link
        href="/application/passport"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /passport
    </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
