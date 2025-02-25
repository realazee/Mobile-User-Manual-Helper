import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    // Hide splash screen once the app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="upload">
      <Tabs.Screen
        name="index"
        options={{
          href: null,  // This hides the tab
        }}
      />
      
      {/* Upload Screen Tab */} 
      <Tabs.Screen
        name="upload"  // Ensure you have a corresponding upload.tsx file
        options={{
          title: 'Upload', // Label in the tab bar
        }}
      />
      
      {/* Ask Screen Tab */}
      <Tabs.Screen
        name="ask" // Ensure you have a corresponding ask.tsx file
        options={{
          title: 'Ask', // Label in the tab bar
        }}
      />
    </Tabs>
  );
}   
