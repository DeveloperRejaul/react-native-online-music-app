import { View, Text } from 'react-native';
import React from 'react';
import Header from '@/src/components/header';

export default function Create() {
  return (
    <View className='container'>
      <Header title='Create Music' />
      <View className='flex-1 center'>
        <Text className='text-light-100'>Create</Text>
      </View>
    </View>
  );
}