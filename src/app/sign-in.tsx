import { Input } from '@/components/forms/input'
import { Text, View } from 'react-native'

export default function SignIn() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>sign-in</Text>
      <View className="w-full px-6">
        <Input placeholder="teste texto" />
      </View>
    </View>
  )
}
