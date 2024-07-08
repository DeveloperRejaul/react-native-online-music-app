import { ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import * as documentPicker from 'expo-document-picker';
import Header from '@/src/components/header';
import ColorPicker from '@/src/components/color-picker';
import Input from '@/src/components/input';
import { useForm } from 'react-hook-form';
import Button from '@/src/components/Button';

export default function Create() {
  const { control } = useForm();
  const [audio, setAudio] = useState<documentPicker.DocumentPickerResult>();
  const [image, setImage] = useState<documentPicker.DocumentPickerResult>();

  const handleAudioSelect = async () => {
    const file = await documentPicker.getDocumentAsync({ type: 'audio/*' });
    setAudio(file);
    
  };
  const handleImageSelect = async () => {
    const file = await documentPicker.getDocumentAsync({ type: 'image/*' }); 
    setImage(file);
    
  };
  
  return (
    <View className='container'>
      <Header title='Create Music' />
      <ScrollView>
        <View className='flex-1 center w-full' style={{rowGap:10}}>
          <Input name='name' control={control} className='w-full' label='Name' placeholder='Enter your song name' />
          <Input name='title' control={control} className='w-full' label='Title' placeholder='Enter song title' />
          
          <Button text='Select Image' onPress={handleImageSelect} />
          <Button text='Select Music' onPress={ handleAudioSelect} />
          <ColorPicker />
        </View>
      </ScrollView>
    </View>
  );
}