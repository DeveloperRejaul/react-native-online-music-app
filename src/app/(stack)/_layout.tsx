import { Stack } from 'expo-router';

export default () => (
  <Stack
    initialRouteName='index'
    screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
  />
);
