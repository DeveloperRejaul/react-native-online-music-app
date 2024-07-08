import { Text, Image, useWindowDimensions, Pressable, ImageSourcePropType, View } from 'react-native';
import Favorite from '../assets/icons/favorite';
import { colors } from '../constants/colors';

interface CardProps { 
  onPress?: () => void;
  img: ImageSourcePropType;
  title: string;
  color: string;
  name: string;
}


export default function Card(props: CardProps) { 
  const { width, height } = useWindowDimensions();

  const cardHeight = height / 3.5;
  const cardWidth = (width / 2) * 0.8;
  const cardImageHeight = cardHeight * 0.9;


  return (
    <Pressable
      onPress={props.onPress}
      className='mr-5'
      style={{
        width: cardWidth,
        height: cardHeight
      }}
    >
      <View
        style={{
          position: 'absolute',
          height: cardImageHeight,
          width: cardWidth,
          top: 0, right: 0, left: 0,
        }}
      >
        <Image
          resizeMode='cover'
          style={{width:'100%'}}
          source={props.img}
        />
        <View
          className='h-2 w-full'
          style={{ backgroundColor: props.color }}
        />
        <Text
          numberOfLines={2}
          className='text-light-800'
        >
          {props.title}
        </Text>
      </View>
      <View
        className='flex-row'
        style={{
          position:'absolute',
          top: cardHeight / 2,
          columnGap:10
        }}
      >
        <View
          className='h-6 w-2'
          style={{ backgroundColor: props.color}}
        />
        <Text className='font-bold text-light-100'>{ props.name}</Text>
      </View>
      <View
        className='m-1 absolute right-1'
      >
        <Favorite
          color={colors.light[100]}
          outline={colors.light[100]}
        />
      </View>
    </Pressable>
  );
}