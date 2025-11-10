import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/manrope';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="registration" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="nearbyPlaces" />
        <Stack.Screen name="placeDetails" />
        <Stack.Screen name="createHangout" />
        <Stack.Screen name="hangoutInfo" />
        <Stack.Screen name="addExpense" />
        <Stack.Screen name="hangoutSettings" />
        <Stack.Screen name="friends" />
        <Stack.Screen name="vehicles" />
        <Stack.Screen name="places" />
        <Stack.Screen name="addVehicle" />
        <Stack.Screen name="appSettings" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
