import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Stack } from 'expo-router'
import { SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts, Karla_500Medium, Karla_700Bold } from '@expo-google-fonts/karla'
import { QueryClientProvider } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { AuthContextProvider } from '@/contexts/auth-context'

import { queryClient } from '@/services/queryClient'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Karla_500Medium,
    Karla_700Bold,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <StatusBar
              backgroundColor="transparent"
              style="dark"
              translucent
            />
            
            <Stack screenOptions={{ headerShown: false }} initialRouteName="/sign-in" />
            
            <Toast />
          </AuthContextProvider>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
