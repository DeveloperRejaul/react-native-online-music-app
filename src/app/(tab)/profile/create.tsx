import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as documentPicker from 'expo-document-picker';
import { useForm } from 'react-hook-form';
import Header from '@/src/components/header';
import Input from '@/src/components/input';
import ColorPicker from '@/src/components/color-picker';
import { colors } from '@/src/constants/colors';
import { Audio, AVPlaybackSource } from 'expo-av';
import Play from '@/src/assets/icons/play';
import Pause from '@/src/assets/icons/pause';


export default function Create() {
  const { control } = useForm();
  const [image, setImage] = useState<string | null>(null);
  
  const [audio, setAudio] = useState<AVPlaybackSource | null>(null);
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying , setIsPlaying] = useState(false);
  
  const handleImageSelect = async () => {
    const file = await documentPicker.getDocumentAsync({ type: 'image/*' }); 
    if (!file.canceled) setImage(`${file?.assets[0]?.uri}`);
  };


  // handle audio music
  const handleAudioSelect = async () => {
    const file = await documentPicker.getDocumentAsync({ type: 'audio/*' });
    if (!file.canceled) setAudio(file?.assets[0]);
  };

  async function playSound() {
    if (audio && !sound) {
      setIsPlaying(true);
      const { sound } = await Audio.Sound.createAsync(audio);
      setSound(sound);
      await sound.playAsync();
    } 

    if (sound) {
      setIsPlaying(true);
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  useEffect(() => {
    const init = async () => {};
    init();
  }, [sound]);
  


  return (
    <View className='container'>
      <Header title='Create Music' />
      <ScrollView>
        <View className='flex-1 center w-full' style={{rowGap:10}}>
          <Input name='name' control={control} className='w-full' label='Name' placeholder='Enter your song name' />
          <Input name='title' control={control} className='w-full' label='Title' placeholder='Enter song title' />
          
          <Text className='text-light-100 font-bold w-full text-xl mt-1'>Select Image</Text>
          {image ?
            <Image
              className='rounded-lg'
              resizeMode='cover'
              style={{height: 100, width: '100%' }}
              source={{ uri: image as string }}
            /> : <Pressable onPress={handleImageSelect} style={{height:100, width:'100%', backgroundColor:colors.light[600]}} className='rounded-lg' />
          }
          
          <Text className='text-light-100 font-bold w-full text-xl mt-1'>Select Music</Text>
          {audio ?
            <View
              className='rounded-lg bg-light-600 justify-center'
              style={{height: 100, width: '100%' }}
            >
           
              {
                isPlaying ?
                  <Pause color={colors.light[100]}
                    onPress={() => {
                      setIsPlaying(false);
                      if (sound) sound.pauseAsync();
                    }}
                  /> :
                  <Play
                    color={colors.light[100]}
                    outline={colors.light[100]}
                    onPress={playSound}
                  />
              }
              
            </View> : <Pressable onPress={handleAudioSelect} style={{ height: 100, width: '100%', backgroundColor: colors.light[600] }} className='rounded-lg' />
          }



          <ColorPicker />
        </View>
      </ScrollView>
    </View>
  );
}