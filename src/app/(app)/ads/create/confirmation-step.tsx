import { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-native-toast-message'

import { Button } from '@/components/button'
import { ProductsSlideImages } from '@/components/products-slide-images'
import { TagSelection } from '@/components/forms/tag-selection'

import { useAuth } from '@/hooks/use-auth'

import { api } from '@/services/api/api-config'
import { createProducts } from '@/services/api/endpoints/create-products'
import { addProductsImage } from '@/services/api/endpoints/add-products-image'

import themeColors from '@/theme/colors'

import { getPaymentMethodIcon } from '@/utils/get-payment-method-icon'
import { AppError } from '@/utils/AppError'

import ArrowLeftSvg from '@/assets/arrow-left.svg'
import TagSvg from '@/assets/tag.svg'
import { formatPaymentMethodName } from '@/utils/format-payment-method-name'

type RouteParamsProps = {
  adsData: string
}

type AdsDataProps = {
  images: {
    name: string
    uri: string
    type: string
  }[]
  name: string
  description: string
  price: number
  is_new: boolean
  accept_trade: boolean
  payment_methods: string[]
}

export default function ConfirmationStep() {
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()
  const routeParams = useLocalSearchParams<RouteParamsProps>()

  const adsData: AdsDataProps = JSON.parse(routeParams.adsData!)

  const createProductsMutation = useMutation({
    mutationKey: ['createProducts'],
    mutationFn: createProducts,
    onSuccess: (response) => {
      const imagesForm = new FormData()

      imagesForm.append('product_id', response.id)
      adsData.images.forEach((imageData) => {
        imagesForm.append('images', {...imageData} as any)
      })

      addProductsImageMutation.mutate(imagesForm)
    },
    onError: (error) => {
      console.log(error)
      
      setIsLoading(false)

      if(error instanceof AppError) {
        toast.show({
          type: 'error',
          text1: error.message,
        })

        return
      }      

      toast.show({
        type: 'error',
        text1: 'Erro ao criar produto!',
      })
    },
  })

  const addProductsImageMutation = useMutation({
    mutationKey: ['addProductsImage'],
    mutationFn: addProductsImage,
    onSuccess: () => {
      setIsLoading(false)

      toast.show({
        type: 'success',
        text1: 'Produto criado com sucesso!',
      })

      router.push('/my-ads')
    },
    onError: (error) => {
      console.log('Add Products Image Error =>', error)
      setIsLoading(false)

      if(error instanceof AppError) {
        toast.show({
          type: 'error',
          text1: error.message,
        })

        return
      }

      toast.show({
        type: 'error',
        text1: 'Erro ao criar produto!',
      })
    },
  })

  const imageProducts = adsData.images.map((item, index) => ({
    id: index,
    uri: item.uri,
  }))

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(adsData.price)

  function handleBack() {
    router.back()
  }

  function handleCreateProduct() {
    setIsLoading(true)

    createProductsMutation.mutate({
      data: {
        ...adsData,
        price: Math.round(adsData.price * 100),
      },
    })
  }
  
  return (
    <View className="flex-1 bg-neutral-200">
      <SafeAreaView
        edges={['top']}
        className="items-center justify-center px-6 pt-8 pb-4 bg-blue-300"
      >
        <Text className="font-heading text-base text-center text-neutral-100">
          Pré visualização do anúncio
        </Text>

        <Text className="font-body text-sm text-center text-neutral-100">
          É assim que seu produto vai aparecer!
        </Text>
      </SafeAreaView>

      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <ProductsSlideImages data={imageProducts} />
          </View>

          <View className="p-6 space-y-6">
            <View className="flex-row items-center space-x-2">
              <View className="h-6 w-6 rounded-full border-2 border-blue-300">
                <Image
                  source={{ uri: `${api.defaults.baseURL}/images/${user?.avatar}` }}
                  className="h-full w-full rounded-full"
                />
              </View>

              <Text className="font-body text-sm text-neutral-700">
                {user?.name}
              </Text>
            </View>

            <View className="space-y-2">
              <View className="flex-row">
                <TagSelection
                  label={adsData.is_new ? 'Novo' : 'Usado'}
                  disabled
                />
              </View>

              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="font-heading flex-wrap text-xl text-neutral-700">
                    {adsData.name}
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
                {adsData.description}
              </Text>
            </View>

            <View className="space-y-4">
              <View className="flex-row items-center space-x-2">
                <Text className="font-heading text-sm text-neutral-600">
                  Aceita troca?
                </Text>

                <Text className="font-body text-sm text-neutral-600">
                  {adsData.accept_trade ? 'Sim' : 'Não'}
                </Text>
              </View>

              <Text className="font-heading text-sm text-neutral-600">
                Meios de pagamentos
              </Text>

              <View className="space-y-2">
                {adsData.payment_methods.map((paymentMethod) => {
                  const PaymentMethodIcon = getPaymentMethodIcon(paymentMethod)
                  const paymentMethodName = formatPaymentMethodName(paymentMethod)

                  return (
                    <View
                      key={paymentMethod}
                      className="flex-row items-center space-x-2"
                    >
                      <PaymentMethodIcon height={18} fill={themeColors.neutral[700]} />

                      <Text className="font-body text-sm text-neutral-600">
                        {paymentMethodName}
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <SafeAreaView
        edges={['bottom']}
        className="flex-row items-center justify-between space-x-3 px-6 pt-5 pb-7"
      >
        <View className="flex-1">
          <Button
            variant="secondary"
            title="Voltar e editar"
            leftIcon={ArrowLeftSvg}
            onPress={handleBack}
          />
        </View>

        <View className="flex-1">
          <Button
            title="Publicar"
            leftIcon={TagSvg}
            loading={isLoading}
            onPress={handleCreateProduct}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
