import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import  { onAuthStateChanged, User } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';

export default function RootLayout() {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState<User | null>();
	const router = useRouter();
	const segments = useSegments();
	const auth = FIREBASE_AUTH
	

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if(currentUser) { setUser(currentUser) }
			else { setUser(null) }
			setInitializing(false)
		});
		console.log("USER => ", user)
		
	}, []);

	useEffect(() => {
		if (initializing) return;

		const inAuthGroup = segments[0] === '(auth)';

		if (user && !inAuthGroup) {
			router.replace('/(auth)/home');
		} else if (!user && inAuthGroup) {
			router.replace('/');
		}
	}, [user, initializing]);

	if (initializing)
		return (
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);

	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: 'Sign in' }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
		</Stack>
	);
}