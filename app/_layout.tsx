import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import  { onAuthStateChanged, User } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';

export default function RootLayout() {
	const [user, setUser] = useState<User | null>();
	const router = useRouter();
	const segments = useSegments();
	const auth = FIREBASE_AUTH
	

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if(currentUser) { setUser(currentUser) }
			else { setUser(null) }
		});
		
	}, []);

	useEffect(() => {
		const inAuthGroup = segments[0] === '(auth)';
		if (user && !inAuthGroup) {
			router.replace('/(auth)/');
		} else if (!user && inAuthGroup) {
			console.log("User sign out!")
			router.replace('/');
		}
	}, [user]);

	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: 'Sign in' }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
		</Stack>
	);
}