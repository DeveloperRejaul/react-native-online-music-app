/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image, ScrollView, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as documentPicker from 'expo-document-picker';
import { useForm } from 'react-hook-form';
import { Audio } from 'expo-av';
import Header from '@/src/components/header';
import Button from '@/src/components/Button';
import Input from '@/src/components/input';
import ColorPicker from '@/src/components/color-picker';


export default function Create() {
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const { control } = useForm();
  const [audio, setAudio] = useState<string | null>(null);
  const [image, setImage] = useState<string | null> (null);

  const handleAudioSelect = async () => {
    const file = await documentPicker.getDocumentAsync({ type: 'audio/*' });
    if (!file.canceled) setAudio(file?.assets[0]?.uri);
  };
  const handleImageSelect = async () => {
    const file = await documentPicker.getDocumentAsync({ type: 'image/*' }); 
    if (!file.canceled) setImage(`${file?.assets[0]?.uri}`);
  };

  useEffect(() => {
    const init = async () => { 
      await requestPermission();
    };
    init();
    
  },[]);

  return (
    <View className='container'>
      <Header title='Create Music' />
      <ScrollView>
        <View className='flex-1 center w-full' style={{rowGap:10}}>
          <Input name='name' control={control} className='w-full' label='Name' placeholder='Enter your song name' />
          <Input name='title' control={control} className='w-full' label='Title' placeholder='Enter song title' />
          
          <Image
            className='rounded-lg'
            resizeMode='cover'
            style={{height: 100, width: '100%' }}
            source={{ uri: image as string }}
          />
          <ColorPicker />
          <Button text='Select Image' onPress={handleImageSelect} />
          <Button text='Select Music' onPress={ handleAudioSelect} />
        </View>
      </ScrollView>
    </View>
  );
}