import { Stack } from 'expo-router'
import { useFonts, Karla_500Medium, Karla_700Bold } from '@expo-google-fonts/karla'

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Karla_500Medium,
    Karla_700Bold,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="/sign-in" />
  )
}
