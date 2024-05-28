import { Platform, TouchableOpacity } from 'react-native'
import { Tabs } from 'expo-router'

import { useAuth } from '@/hooks/use-auth'

import HomeSvg from '@/assets/home.svg'
import TagSvg from '@/assets/tag.svg'
import SignOutSvg from '@/assets/sign-out.svg'

export default function TabLayout() {
  const { handleConfirmSignOut } = useAuth()

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarInactiveTintColor: '#9F9BA1',
      tabBarActiveTintColor: '#3E3A40',
      tabBarLabel: () => null,
      tabBarStyle: {
        height: Platform.OS === 'android' ? 60 : 88,
      }
    }}>
      <Tabs.Screen
        name="catalogs"
        options={{
          tabBarIcon: ({ size, color }) => (
            <HomeSvg height={size} width={size} fill={color} />
          )
        }}
      />

      <Tabs.Screen
        name="my-ads"
        options={{
          tabBarIcon: ({ size, color }) => (
            <TagSvg height={size} width={size} fill={color} />
          )
        }}
      />

      <Tabs.Screen
        name="sign-out"
        options={{
          tabBarButton: ({ children }) => (
            <TouchableOpacity
              activeOpacity={1}
              className="flex-1"
              onPress={handleConfirmSignOut}
            >
              {children}
            </TouchableOpacity>
          ),
          tabBarIcon: ({ size }) => (
            <SignOutSvg height={size} width={size} fill="#E07878" />
          )
        }}
      />      
    </Tabs>
  )
}
