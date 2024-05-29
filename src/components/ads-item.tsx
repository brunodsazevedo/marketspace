import { Image, Text, View } from 'react-native'

export function AdsItem() {
  return (
    <View className="pb-6 space-y-1">
      <View>
        <Image
          source={{ uri: 'https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/tadeaioo/catalog/prime/nude/tenis-feminino-academia-ultrabone-ultra-prime-nude-rosa-1.jpg' }}
          className="h-28 w-40 rounded-lg"
        />
      </View>

      <Text className="font-body text-sm text-neutral-600">
        Tênis Rosa
      </Text>

      <Text className="font-heading text-base text-neutral-600">
        R$ 59,90
      </Text>
    </View>
  )
}
