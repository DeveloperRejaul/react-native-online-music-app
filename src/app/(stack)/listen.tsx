import { Image, ImageSourcePropType, Text, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import ArrowLeft from '@/src/assets/icons/arrow-left';
import Dots from '@/src/assets/icons/dots';
import Minus from '@/src/assets/icons/minus';
import Next from '@/src/assets/icons/next';
import Pause from '@/src/assets/icons/pause';
import Play from '@/src/assets/icons/play';
import Plus from '@/src/assets/icons/plus';
import { colors } from '@/src/constants/colors';


export default function Listen() {
  const params = useLocalSearchParams();
  const { height, width} = useWindowDimensions();
  const color = params.color as string; 
  const img = params.img as ImageSourcePropType; 
  const isPlaying = false;
  
  return (
    <LinearGradient
      colors={[color, '#0000000e']}
      className='container'
    >
      <Header />
      <View className='flex-1 center'>
        <View style={{ width: '100%', height:height/2 }} >
          <Image
            className='rounded-xl'
            source={img}
            resizeMode='cover'
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        {/* Music control part*/}
        <View className='w-full py-10' style={{rowGap:20}} > 
          <View className='w-full flex-row items-center justify-between'>
            <View>
              <Text className='sub-title !text-left'>Lorem, ipsum.</Text>
              <Text className='text-light-200'>Lorem, ipsum.</Text>
            </View>
            <View className='flex-row' style={{columnGap:10}}>
              <Plus color={colors.light[100]} />
              <Minus outline={colors.light[100]} />
            </View>
          </View>
          <View>
            <Slider
              style={{ width: width-10, height: 10, transform:[{translateX:-10}] }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={colors.light[100]}
              maximumTrackTintColor={colors.light[500]}
              thumbTintColor={colors.light[100]}
            />
            <View className='flex-row justify-between px-4'>
              <Text className='text-light-300 mt-1'>0.20</Text>
              <Text className='text-light-300 mt-1'>4.20</Text>
            </View>
          </View>
          <View className='flex-row center' style={{columnGap:30}}>
            <Next color={colors.light[100]} style={{ transform: [{ rotate: '180deg' }] }} size={50} />
            <View className='w-20 h-20 bg-light-100 rounded-full center'>
              { isPlaying ? <Pause color={colors.dark[100]} />: <Play color={colors.dark[100]} /> }
            </View>
            <Next color={colors.light[100]} size={50} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}



function Header() {
  const router = useRouter();
  return (
    <View className='pt-14 flex-row justify-between items-center'>
      <ArrowLeft
        color={colors.light[100]}
        style={{ transform: [{ rotate: '-90deg' }] }}
        onPress={()=> router.back()}
      />
      <View>
        <Text className='text-light-100'> Lorem ipsum dolor sit amet. </Text>
        <Text className='text-light-100 font-bold'> Lorem ipsum dolor </Text>
      </View>
      <Dots
        color={colors.light[100]}
        size={30}
      />
    </View>
  );
}
