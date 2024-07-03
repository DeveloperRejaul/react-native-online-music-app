import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import React from 'react';
import Logo from '@/src/assets/icons/Logo';
import { useForm } from 'react-hook-form';
import Input from '@/src/components/input';

interface InputData { 
  email: string;
  password: string;
  name: string;
}

export default function Signup() {
  const { height} = useWindowDimensions();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '', name:'' }
  });
  
  const handleInput = (data: InputData) => { 
    console.log(data);
  }; 

  return (
    <ScrollView>
      <View className='container center gap-y-10' style={{height: height*1.05}}>
        <View className='center gap-y-2'>
          <Logo />
          <Text className='title'>Welcome to Spotify</Text>
        </View>
        <View className='w-full gap-y-4'>

          <Input
            name='name'
            control={control}
            placeholder='Jon Deo'
            label='Name'
            error={errors.email && 'Name must be required'}
          />
          <Input
            name='email'
            control={control}
            placeholder='example@gmail.com'
            label='Email'
            error={errors.email && 'Email must be required'}
          />
          <Input
            label='Password'
            name='password'
            control={control}
            placeholder='********'
            error={errors.password && 'Password must be required'}
          />
          <Pressable onPress={handleSubmit(handleInput)} className='btn !rounded-xl'>
            <Text className='btn-text'>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
