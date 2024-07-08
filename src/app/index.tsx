// import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
// import { store } from '../utils/store';
// import useFetch from '../hooks/useFetch';
// import Loading from '../components/loading';

export default function Index() {
  // const router= useRouter();
  // const { Get, isLoading, isSuccess, isError } = useFetch();


  // useEffect(() => { 
  //   const init = async () => { 
  //     const token = await store.find('access_token');
  //     if (token) return await Get({ endPoint: 'user/auth', token });
  //     router.replace('(auth)');
  //   };
  //   init();
  // }, []);
 
  
  // if(isLoading) return <Loading />;
  // if(isSuccess) return <Redirect href={'(tab)/home'} />;
  // if (isError) return <Redirect href='(auth)' />;
  return <Redirect href={'(tab)/home'} />;
}