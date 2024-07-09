import '../../global.css';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';
import 'react-native-reanimated';
// import mp3 from '@/src/assets/audio/sample.mp3';
// import coverPhoto from '@/src/assets/images/demo.jpg';

// import TrackPlayer from 'react-native-track-player';
// import { PlaybackService } from '../utils/service';

// TrackPlayer.registerPlaybackService(() => PlaybackService);

// Prevent the splash screen from auto-hiding before asset loading is complete.


SplashScreen.preventAutoHideAsync();
export default async function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  // useEffect(() => {
  //   const init = async () => { 
  //     // await TrackPlayer.setupPlayer({});
  //     // await TrackPlayer.add({
  //     //   url: require('track.mp3'),
  //     //   title: 'Track Title',
  //     //   artist: 'Track Artist',
  //     //   artwork: require('track.png')
  //     // });
  //     // TrackPlayer.setRepeatMode(RepeatMode.Queue);
  //   };
  //   init();
  // } , []); 

  if (!loaded) { 
    return null;
  } 

  // useEffect(() => {
  //   const init = async() => {
  //     await TrackPlayer.setupPlayer();
  //   };
  //   init();
  // }, []);

  // const track1 = {
  //   url: 'http://webaudioapi.com/samples/audio-tag/chrono.mp3', 
  //   title: 'Avaritia',
  //   artist: 'deadmau5',
  //   album: 'while(1<2)',
  //   genre: 'Progressive House, Electro House',
  //   date: '2014-05-20T07:00:00+00:00', // RFC 3339
  //   artwork: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', 
  //   duration: 402 
  // };

  // const track2 = {
  //   url: require('./coelacanth.ogg'), // Load media from the app bundle
  //   title: 'Coelacanth I',
  //   artist: 'deadmau5',
  //   artwork: require('./cover.jpg'), // Load artwork from the app bundle
  //   duration: 166
  // };

  // const track3 = {
  //   url: 'file:///storage/sdcard0/Downloads/artwork.png', // Load media from the file system
  //   title: 'Ice Age',
  //   artist: 'deadmau5',
  //   // Load artwork from the file system:
  //   artwork: 'file:///storage/sdcard0/Downloads/cover.png',
  //   duration: 411
  // };

  // You can then [add](https://rntp.dev/docs/api/functions/queue#addtracks-insertbeforeindex) the items to the queue
  // await TrackPlayer.add([track1]);
  
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
