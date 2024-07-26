import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '@/src/components/Button';
import { colors } from '@/src/constants/colors';
import Card from '@/src/components/Card';
import { useRouter } from 'expo-router';
import Favorite from '@/src/assets/icons/favorite';
import Slider from '@react-native-community/slider';
import Play from '@/src/assets/icons/play';
import { useMusic } from '@/src/context/musicContext';
import Pause from '@/src/assets/icons/pause';
import useFetch from '@/src/hooks/useFetch';
import { BASE_URL } from '@/src/constants/const';
import { useActiveTrack, useProgress } from 'react-native-track-player';

interface IMusicData { 
  color: string;
  createdAt: string;
  id: string;
  image: string;
  name: string;
  title: string;
  updatedAt: string;
  url: string;
}
interface CardPropsTypes { 
  onPress: (item: IMusicData) => void;
  setMusicInfo: React.Dispatch<React.SetStateAction<IMusicData>>
  musicInfo: IMusicData
}

export default function Home() {
  const { addMusic, playMusic } = useMusic();
  const [musicInfo, setMusicInfo] = useState<IMusicData>({} as IMusicData);
  const track = useActiveTrack();

  
  const handleCard = async (item: IMusicData) => {
    await addMusic({
      url: `${BASE_URL}/file/${item.url}`,
      title: item.title,
      artist: item.name,
      artwork: item.image as string
    });
    setMusicInfo(item);
    await playMusic();
  };



  return (
    <View className='container pt-16'>
      {/* Button Part */}
      <View className='flex-row' style={{columnGap:10}}>
        <Button
          text='M'
          onPress={()=>{}}
        />
        <Button
          text='All'
          onPress={()=>{}}
          className='!bg-success-500 !px-5'
          textStyle={{fontWeight:'normal'}}
        />
        <Button
          text='Music'
          onPress={()=>{}}
          className='!bg-dark-200 !px-5'
          textStyle={{fontWeight:'normal', color:colors.light[100]}}
        />
      </View>
      <View className='py-5' >
        <Text className='sub-title !text-left mb-7'>To get you started</Text>
        <CardList onPress={handleCard} setMusicInfo={setMusicInfo} musicInfo={musicInfo} />
      </View>

      {/* Music Listen bottom Bar */}
      {track && <MusicBottomBar {...musicInfo} /> }
    </View>
  );
}


function MusicBottomBar(musicInfo: IMusicData ) { 
  const {pauseMusic, playMusic, isPlaying } = useMusic();
  const router = useRouter();

  return (
    <View className='bg-light-900 px-3 pb-1 rounded-lg absolute bottom-5 w-full mx-5'>
      <View className='flex-row justify-between w-full items-center pb-1 pt-2' >
        <Pressable
          onPress={() => router.push({
            pathname: '(stack)/listen',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            params:musicInfo
          })}
          className='flex-row' style={{ columnGap: 15 }}
        >
          <Image
            style={{height:50, width:50}}
            source={{ uri :`${BASE_URL}/file/${musicInfo.image}`}}
            className='rounded-md'
          />
          <View>
            <Text className='font-bold text-light-100'>{musicInfo.name}</Text>
            <Text className='text-light-100' numberOfLines={1}>
              {musicInfo.title?.slice(0, 20)}{musicInfo?.title?.length > 20 && '...'}
            </Text>
          </View>
        </Pressable>
        <View className='flex-row' style={{columnGap:10}}>
          <Favorite
            onPress={() => { }}
            color={colors.light[100]}
            // outline={ true ? colors.light[100] : colors.transparent}
            outline={colors.light[100] }
            style={{marginTop:7}}
          />
          {isPlaying ?
            <Pause
              size={35}
              onPress={async () => await pauseMusic()}
              color={colors.light[100]}
              outline={colors.light[100]}
            />:
            <Play
              size={35}
              onPress={async() => await playMusic() }
              color={colors.light[100]}
              outline={colors.light[100]}
            />}
        </View>
      </View>
      <SliderCom />
    </View>
  );
}



function SliderCom() {
  const { musicDuration, seekTo } = useMusic();
  const { position } = useProgress();
  return (
    <Slider
      value={position / musicDuration}
      style={{ width: '100%', height: 10 }}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor={colors.light[100]}
      maximumTrackTintColor={colors.dark[700]}
      thumbTintColor={colors.light[900]}
      onValueChange={async (value: number) => {
        await seekTo(value * musicDuration);
      }}
    />
  );
}


function CardList(props: CardPropsTypes) { 
  const { Get, data, isLoading, isError, isSuccess } = useFetch<IMusicData[]>();
  const { isPlaying } = useMusic();
  const track = useActiveTrack();

  
  useEffect(() => { 
    (async () => { 
      await Get({endPoint:'music'});
    })();
  }, []);

  
  useEffect(() => { 
    if (data !==null && isSuccess && track && JSON.stringify(props.musicInfo) === '{}') {
      const url = track.url.split('/').pop();
      const activeMusic = data.find(music => music.url === url);
      props.setMusicInfo(activeMusic!);
    }
  }, [data, isSuccess,isPlaying]);

  if(isLoading) return <ActivityIndicator size={50} color={colors.light[100]} />;
  if(isError) return <Text> Something went wrong  </Text>;

  if(isSuccess && data !== null)
    return (
      <FlatList
        showsHorizontalScrollIndicator={ false}
        horizontal
        data={data}
        renderItem={({ item, index }) => (
          <Card
            name='Atif islam'
            color={colors.error[700]}
            onPress={() => props.onPress(item)}
            key={index}
            image={item.image}
            title={item.title}
          />
        )
        }
      />
    );
}



