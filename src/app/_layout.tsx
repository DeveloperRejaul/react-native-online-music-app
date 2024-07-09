import '../../global.css';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => { 
    const init =async () => { 
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers, // Change as you like
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix, // Change as you like
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });
    }; 
    init();
  },[]);
 

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name='index' />
        <Stack.Screen
          name='(stack)'
          options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
        />
        <Stack.Screen name='(tab)' />
      </Stack>
      <Toast />
    </>
  );
}
