import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "application", }} />
      <Stack.Screen name="passport" options={{ title: "Passport" }} />
      <Stack.Screen name="license" options={{ title: "License" }} />
      <Stack.Screen name="national_id" options={{ title: "National ID" }} />
    </Stack>
  );
}