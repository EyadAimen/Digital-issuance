import { Tabs } from "expo-router";
import { theme } from '../../theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index"
        options={{ 
          title: "Home",
          tabBarIcon: ({focused}) => (
            focused?
            <MaterialCommunityIcons name="home" size={28} color={theme.primaryBlue} />
            :<MaterialCommunityIcons name="home-outline" size={28} color={theme.greyText} />
          ), 
        }}
      />
      <Tabs.Screen 
        name="application" 
        options={{ 
          title: "Application", 
          headerShown:false,
          tabBarIcon: ({focused}) => (
            focused?
            <Ionicons name="document-text" size={24} color={theme.primaryBlue} />
            :<Ionicons name="document-text-outline" size={24} color={theme.greyText} />
          ), 
        }}
      />
      <Tabs.Screen 
        name="notifications" 
        options={{ 
          title: "Notifcations",
          headerShown:false,
          tabBarIcon: ({focused}) => (
            focused?
            <Octicons name="bell-fill" size={22} color={theme.primaryBlue} />
            :<Octicons name="bell" size={22} color={theme.greyText} />
          ), 
        }}
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: "Settings",
          headerShown:false,
          tabBarIcon: ({focused}) => (
            focused?
            <Ionicons name="settings-sharp" size={24} color={theme.primaryBlue} />
            :<Ionicons name="settings-outline" size={24} color={theme.greyText} />
          ), 
        }}
      />
      
    </Tabs>
  );
}