import { Image, Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

import { convertCentsToFloat } from '@/utils/convert-cents-to-float'

import { api } from '@/services/api/api-config'

import { ProductDTO } from '@/dtos/product-dto'

type Props = {
  data: ProductDTO
  onPress?: () => void
}

export function ProductItem({ data, onPress }: Props) {
  const priceCentsToFloat = convertCentsToFloat(data.price)
  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(priceCentsToFloat)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className=""
      onPress={onPress}
    >
      <View className="space-y-1">
        <View>
          <Image
            source={{ uri: `${api.defaults.baseURL}/images/${data.product_images[0].path}` }}
            resizeMode="cover"
            className="h-28 w-full rounded-lg"
          />

          <View className="absolute right-2 top-2">
            <View
              className={
                twMerge(
                  'items-center justify-center px-2 py-0.5 rounded-full bg-blue-600',
                  !data.is_new && 'bg-neutral-600',
                )
              }
            >
              <Text className="font-heading text-xs text-center text-white">
                {data.is_new ? 'Novo' : 'Usado'}
              </Text>
            </View>
          </View>

          {data?.is_active === false && (
            <View className="absolute h-full w-full rounded-lg bg-neutral-700/40">
              <View className="flex-1 justify-end p-2">
                <Text className="font-heading text-xs uppercase text-neutral-100">
                  Anúncio desativado
                </Text>
              </View>
            </View>
          )}
        </View>

        <Text className="font-body text-sm text-neutral-600">
          {data.name}
        </Text>

        <Text className="font-heading text-xs text-neutral-700">
          R${' '}
          <Text className="text-base">
            {priceFormatted}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
}
