import { Tabs } from 'expo-router';

export default () => (
  <Tabs screenOptions={{ headerShown: false }} initialRouteName='home' >
    <Tabs.Screen name='home' />
    <Tabs.Screen name='profile' />
  </Tabs>
);