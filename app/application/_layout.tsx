import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Application", }} />
      <Stack.Screen name="passport" options={{ title: "Passport Renew Application" }} />
      <Stack.Screen name="license" options={{ title: "License" }} />
      <Stack.Screen name="national_id" options={{ title: "National ID" }} />
    </Stack>
  );
}