import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {App}  from './AppStack';

import Loading from '../components/Loading';

export default function Routes() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])


  if(loading) {
    return(
      <Loading />
    )
  }
  return (
    <NavigationContainer>
        <App />
    </NavigationContainer>
  )
}