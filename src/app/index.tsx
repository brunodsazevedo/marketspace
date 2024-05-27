import React, { useEffect } from 'react'
import { Redirect, SplashScreen } from 'expo-router'

import { useAuth } from '@/hooks/use-auth'

export default function HomeApp() {
  const { isAuthLoaded } = useAuth()

  useEffect(() => {
    if(isAuthLoaded) {
      SplashScreen.hideAsync()
    }
  }, [isAuthLoaded])
  
  if(!isAuthLoaded) {
    return null
  }

  return (
    <Redirect href="/catalogs" />
  );
}
