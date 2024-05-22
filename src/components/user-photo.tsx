import { Image, ImageSourcePropType, View } from 'react-native'

import { IconButton } from '@/components/icon-button'

import AvatarDefault from '@/assets/avatar-default.png'
import PencilSvg from '@/assets/pencil-simple-line.svg'

type Props = {
  source?: ImageSourcePropType
  onPress?: () => void
}

export function UserPhoto({ source, onPress }: Props) {
  return (
    <View className="">
      <View className="rounded-full border-2 border-blue-300">
        <Image
          source={source ?? AvatarDefault}
          className="h-20 w-20"
        />
      </View>

      <View className="absolute -right-2 bottom-0">
        <IconButton
          icon={PencilSvg}
          className="h-10 w-10 rounded-full"
          onPress={onPress}
        />
      </View>
    </View>
  )
}
