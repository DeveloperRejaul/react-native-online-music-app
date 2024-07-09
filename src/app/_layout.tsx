import '../../global.css';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import TrackPlayer, { AppKilledPlaybackBehavior, RepeatMode } from 'react-native-track-player';
import mp3 from '@/src/assets/audio/sample.mp3';
import coverPhoto from '@/src/assets/images/demo.jpg';
import { PlaybackService } from '../utils/service';
// TrackPlayer.registerPlaybackService(() => PlaybackService);


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => { 
    const init = async () => { 

      try {
        // await TrackPlayer.setupPlayer();
        // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
         
        // add audio in player
        // await TrackPlayer.add({
        //   url: mp3,
        //   title: 'Track Title',
        //   artist: 'Track Artist',
        //   artwork: coverPhoto
        // });

        // // setup audio in background 
        // TrackPlayer.updateOptions({
        //   android: {
        //     appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        //   },
        // });
        // await TrackPlayer.play();
        // await TrackPlayer.pause();
        // await TrackPlayer.reset();
      } catch (error) {
        console.log(error);
      }
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
