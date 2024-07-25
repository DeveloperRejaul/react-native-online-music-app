import { createContext, useContext, useEffect, useState} from 'react';
import { MusicProviderTypes,ContextTypes } from './types';
import TrackPlayer, { AddTrack, AppKilledPlaybackBehavior, RepeatMode } from 'react-native-track-player';
import { PlaybackService } from '../utils/service';

// setup Track Player
TrackPlayer.registerPlaybackService(() => PlaybackService);

// create a context
const Context = createContext <ContextTypes>( {} as ContextTypes);


// setup provider
export function MusicProvider({ children }: MusicProviderTypes) {
  const [isSetupPlayer, setIsSetupPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicPosition, setMusicPosition] = useState(0);
  const [musicDuration, setMusicDuration] = useState(0);


 
  // handle add music
  const addMusic = async (music: AddTrack) => {
    await TrackPlayer.add(music);
  };
    
  // handle get progress
  const getProgress = async () => await TrackPlayer.getProgress();

  // handle play music
  const playMusic = async () => {
    try {
      await TrackPlayer.play();
      const { duration, position } = await getProgress();
      setMusicPosition(position);
      setMusicDuration(duration); 
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };
    
  // handle pause music 
  const pauseMusic = async () => {
    try {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } catch (error) {
      console.log(error);
        
    }
  };
    
  // handle reset music
  const resetMusic = async () => {
    try {
      await TrackPlayer.reset();
      setIsPlaying(false);
      setMusicPosition(0);
      setMusicDuration(0); 
    } catch (error) {
      console.log(error);
    }
  };
  
  // handle play background setup
  const setBackgroundMusic = () => { 
    TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
    });
  }; 
    
  // handle player setup 
  const playerSetup = async () => {
    if (!isSetupPlayer) {
      await TrackPlayer.setupPlayer();
      setIsSetupPlayer(true);
    }
  };
    
  // handle mode player 
  const setRepeatMode = async () => await TrackPlayer.setRepeatMode(RepeatMode.Queue);

  // handle seekTo music
  const seekTo = async (num: number) => await TrackPlayer.seekTo(num); 
   
    
  useEffect(() => {
    const init = async () => { 
      await playerSetup();
      await setRepeatMode();
      setBackgroundMusic();
    };
    init();
  },[]);

 
    
    
  return (
    <Context.Provider value={{
      addMusic, playMusic, pauseMusic, resetMusic,
      setBackgroundMusic, playerSetup, setRepeatMode,
      getProgress,seekTo,
      isPlaying,musicPosition, musicDuration,
    }}
    > 
      { children}
    </Context.Provider>
  );
}

export const useMusic = () => useContext(Context);