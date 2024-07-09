import { FlatList, Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import React from 'react';
import Button from '@/src/components/Button';
import { colors } from '@/src/constants/colors';
import Card from '@/src/components/Card';
import { musics } from '@/src/db/music';
import { useRouter } from 'expo-router';
import img from '@/src/assets/images/demo.jpg';
import Favorite from '@/src/assets/icons/favorite';
import Slider from '@react-native-community/slider';
import Play from '@/src/assets/icons/play';


type DataType = {
  img: ImageSourcePropType
  title: string
}
interface CardPropsTypes { 
  data?: DataType[],
  onPress?: () => void
}

export default function Home() {
  const router = useRouter();

  const handleSideBar = async () => {};

  return (
    <View className='container pt-16'>
      {/* Button Part */}
      <View
        className='flex-row'
        style={{columnGap:10}}
      >
        <Button
          text='M'
          onPress={handleSideBar}
        />
     

        <Button
          text='All'
          onPress={handleSideBar}
          className='!bg-success-500 !px-5'
          textStyle={{fontWeight:'normal'}}
        />
        <Button
          text='Music'
          onPress={handleSideBar}
          className='!bg-dark-200 !px-5'
          textStyle={{fontWeight:'normal', color:colors.light[100]}}
        />
      </View>
      {/* musics */}
      <View className='py-5' >
        <Text className='sub-title !text-left mb-7'>To get you started</Text>
        <CardList data={musics} />
      </View>

      {/* Music Listen bottom Bar */}
      <View
        className='bg-light-900 px-3 pb-1 rounded-lg absolute bottom-5 w-full mx-5'
      >
        <View className='flex-row justify-between w-full items-center pb-1 pt-2' >
          <Pressable
            onPress={() => router.push({
              pathname: '(stack)/listen',
              params: musics[0]
            })}
            className='flex-row' style={{ columnGap: 15 }}
          >
            <Image
              style={{height:50, width:50}}
              source={img}
              className='rounded-md'
            />
            <View>
              <Text className='font-bold text-light-100'>Atif Islam</Text>
              <Text className='text-light-100'>Lorem ipsum dolor </Text>
            </View>
          </Pressable>
          <View className='flex-row' style={{columnGap:10}}>
            <Favorite
              color={colors.light[100]}
              outline={colors.light[100]}
              style={{marginTop:7}}
            />
            <Play
              color={colors.light[100]}
              outline={colors.light[100]}
            />
          </View>
        </View>
        <Slider
          style={{ width: '100%', height: 10 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={colors.light[100]}
          maximumTrackTintColor={colors.dark[700]}
          thumbTintColor={colors.light[900]}
        />
      </View>
    </View>
  );
}

function CardList(props: CardPropsTypes) { 
  return (
    <FlatList
      showsHorizontalScrollIndicator={ false}
      horizontal
      data={props.data}
      renderItem={({ item, index }) => { 
        return (
          <Card
            name='Atif islam'
            color={colors.error[700]}
            onPress={props.onPress}
            key={index}
            img={item.img}
            title={item.title}
          />
        );
      }}
    />
  );
}