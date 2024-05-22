import { Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/forms/input'

import TagSvg from '@/assets/tag.svg'

export default function SignIn() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>sign-in</Text>
      <View className="w-full px-6">
        <Input placeholder="teste texto" />
      </View>

      <View className="w-full p-6">
        <Button leftIcon={TagSvg} title="Button" />
      </View>
    </View>
  )
}
