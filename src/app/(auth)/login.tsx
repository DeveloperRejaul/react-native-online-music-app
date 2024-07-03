import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Logo from '@/src/assets/icons/Logo';
import { useForm } from 'react-hook-form';
import Input from '@/src/components/input';
import { useRouter } from 'expo-router';

interface InputData { 
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  });
  
  const handleInput = (data: InputData) => { 
    console.log(data);
    router.replace('(tab)/home');
  }; 

  return (
    <View className='container center gap-y-10'>
      <View className='center gap-y-2'>
        <Logo />
        <Text className='title'>Welcome to Spotify</Text>
      </View>
      <View className='w-full gap-y-4'>

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
          <Text className='btn-text'>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
