import { Image, ScrollView, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'

import { IconButton } from '@/components/icon-button'
import { Button } from '@/components/button'
import { ProductsSlideImages } from '@/components/products-slide-images'
import { TagSelection } from '@/components/forms/tag-selection'

import themeColors from '@/theme/colors'

import { useAuth } from '@/hooks/use-auth'

import { api } from '@/services/api/api-config'
import { getProductDetail } from '@/services/api/endpoints/get-product-detail'

import { convertCentsToFloat } from '@/utils/convert-cents-to-float'
import { getPaymentMethodIcon } from '@/utils/get-payment-method-icon'

import ArrowLeftSvg from '@/assets/arrow-left.svg'
import PencilSimpleLineSvg from '@/assets/pencil-simple-line.svg'
import PowerSvg from '@/assets/power.svg'
import TrashSvg from '@/assets/trash-simple.svg'
import AvatarDefaultImg from '@/assets/avatar-default.png'
import WhatsAppImg from '@/assets/whatsapp-logo-fill.svg'

type RouteParamsProps = {
  id: string
}

export default function DetailAds() {
  const { user } = useAuth()
  const routeParams = useLocalSearchParams<RouteParamsProps>()

  const productDetailQuery = useQuery({
    queryKey: ['productDetail', routeParams.id],
    queryFn: () => getProductDetail(routeParams.id!),
  })

  const productImages = productDetailQuery.data?.product_images.map((imagesData) => ({
    id: imagesData.id,
    uri: `${api.defaults.baseURL}/images/${imagesData.path}`,
  }))

  const priceInFloat = convertCentsToFloat(productDetailQuery.data?.price || 0)

  const priceFormatted = new Intl.NumberFormat('pt-Br', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInFloat)

  function handleBack() {
    router.back()
  }

  return (
    <View className="flex-1 bg-neutral-200">
      <SafeAreaView
        edges={['top']}
        className="flex-row items-center justify-between px-6 pt-6 pb-3"
      >
        <IconButton
          icon={ArrowLeftSvg}
          iconSize={24}
          iconColor={themeColors.neutral[700]}
          className="bg-transparent p-0"
          onPress={handleBack}
        />

        {user?.id === productDetailQuery.data?.user_id && (
          <IconButton
            icon={PencilSimpleLineSvg}
            iconSize={24}
            iconColor={themeColors.neutral[700]}
            className="bg-transparent p-0"
          />
        )}
      </SafeAreaView>

      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="space-y-6"
        >
          <View>
            <ProductsSlideImages
              data={productImages ?? []}
            />
          </View>

          <View className="p-6 space-y-6">
            <View className="flex-row items-center space-x-2">
              <View className="h-6 w-6 rounded-full border-2 border-blue-300">
                <Image
                  source={
                    productDetailQuery.data?.user.avatar
                    ? { uri: `${api.defaults.baseURL}/images/${productDetailQuery.data.user.avatar}` }
                    : AvatarDefaultImg
                  }
                  className="h-full w-full rounded-full"
                />
              </View>

              <Text className="font-body text-sm text-neutral-700">
                {productDetailQuery.data?.user.name}
              </Text>
            </View>

            <View className="space-y-2">
              <View className="flex-row">
                <TagSelection
                  label={productDetailQuery.data?.is_new ? 'Novo' : 'Usado'}
                  disabled
                />
              </View>

              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="font-heading flex-wrap text-xl text-neutral-700">
                    {productDetailQuery.data?.name}
                  </Text>
                </View>

                <Text className="font-heading text-sm text-blue-300">
                  R${' '}
                  <Text className="text-xl">
                    {priceFormatted}
                  </Text>
                </Text>
              </View>

              <Text className="font-body text-sm text-neutral-600">
                {productDetailQuery.data?.description}
              </Text>
            </View>

            <View className="space-y-4">
              <View className="flex-row items-center space-x-2">
                <Text className="font-heading text-sm text-neutral-600">
                  Aceita troca?
                </Text>

                <Text className="font-body text-sm text-neutral-600">
                  {productDetailQuery.data?.accept_trade ? 'Sim' : 'Não'}
                </Text>
              </View>

              <Text className="font-heading text-sm text-neutral-600">
                Meios de pagamentos
              </Text>

              <View className="space-y-2">
                {productDetailQuery.data?.payment_methods.map((paymentMethod) => {
                  const PaymentMethodIcon = getPaymentMethodIcon(paymentMethod.key)

                  return (
                    <View
                      key={paymentMethod.key}
                      className="flex-row items-center space-x-2"
                    >
                      <PaymentMethodIcon height={18} fill={themeColors.neutral[700]} />

                      <Text className="font-body text-sm text-neutral-600">
                        {paymentMethod.name}
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {user?.id === productDetailQuery.data?.user_id ? (
        <SafeAreaView
          edges={['bottom']}
          className="p-6 space-y-2"
        >
          <Button
            variant="black"
            title="Desativar anúncio"
            leftIcon={PowerSvg}
          />

          <Button
            variant="secondary"
            title="Excluir anúncio"
            leftIcon={TrashSvg}
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView
          edges={['bottom']}
          className="flex-row items-center justify-between p-6 bg-neutral-100"
        >
          <Text className="font-heading text-sm text-blue-500">
            R${' '}
            <Text className="text-2xl">
              {priceFormatted}
            </Text>
          </Text>

          <Button
            title="Entrar em contato"
            leftIcon={WhatsAppImg}
          />
        </SafeAreaView>
      )}
    </View>
  )
}
