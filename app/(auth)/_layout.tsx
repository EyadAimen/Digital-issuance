import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="application" options={{ title: "Application", headerShown:false }} />
      <Tabs.Screen name="notifications" options={{ title: "Notifcations", headerShown:false }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", headerShown:false }} />
      
    </Tabs>
  );
}