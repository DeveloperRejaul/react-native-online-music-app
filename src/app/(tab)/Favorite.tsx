import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { musics } from '@/src/db/music';

export default function Favorite() {
  return (
    <View className='container pt-14'>
      <FlatList
        data={musics}
        renderItem={({item }) => {
          return (
            <View className='flex-row mb-4'> 
              <Image
                className='rounded-full'
                source={item.img}
                style={{
                  height: 70,
                  width: 70,
                }}
              />
              <View className='pl-3 justify-center pr-5'>
                <Text
                  numberOfLines={2}
                  className='text-light-100 font-bold'
                >
                  {item.title}
                </Text>
                <Text className='text-light-800'>{item.name}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}