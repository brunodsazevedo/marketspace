import { useRef } from 'react'
import { Image, Linking, ScrollView, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-native-toast-message'

import { IconButton } from '@/components/icon-button'
import { Button } from '@/components/button'
import { ProductsSlideImages } from '@/components/products-slide-images'
import { TagSelection } from '@/components/forms/tag-selection'
import { BottomSheetModal, ModalBottom } from '@/components/bottom-sheet'

import themeColors from '@/theme/colors'

import { useAuth } from '@/hooks/use-auth'

import { queryClient } from '@/services/queryClient'
import { api } from '@/services/api/api-config'
import { getProductDetail } from '@/services/api/endpoints/get-product-detail'
import { activeDisableProduct } from '@/services/api/endpoints/active-disable-product'
import { deleteProduct } from '@/services/api/endpoints/delete-product'

import { convertCentsToFloat } from '@/utils/convert-cents-to-float'
import { getPaymentMethodIcon } from '@/utils/get-payment-method-icon'
import { AppError } from '@/utils/AppError'

import { ProductDetailDTO } from '@/dtos/product-dto'

import ArrowLeftSvg from '@/assets/arrow-left.svg'
import PencilSimpleLineSvg from '@/assets/pencil-simple-line.svg'
import PowerSvg from '@/assets/power.svg'
import TrashSvg from '@/assets/trash-simple.svg'
import AvatarDefaultImg from '@/assets/avatar-default.png'
import WhatsAppImg from '@/assets/whatsapp-logo-fill.svg'
import { Skeleton } from '@/components/skeleton'

type RouteParamsProps = {
  id: string
}

export default function DetailAds() {
  const modalConfirmActiveOrDisableProductRef = useRef<BottomSheetModal>(null)
  const modalConfirmDeleteProductRef = useRef<BottomSheetModal>(null)

  const { user } = useAuth()
  const routeParams = useLocalSearchParams<RouteParamsProps>()

  const productDetailQuery = useQuery({
    queryKey: ['productDetail', routeParams.id],
    queryFn: () => getProductDetail(routeParams.id!),
  })

  const activeDisableProductMutation = useMutation({
    mutationKey: ['activeDisableProduct'],
    mutationFn: activeDisableProduct,
    onSuccess: (_, { data }) => {
      const prevData = queryClient.getQueryData<ProductDetailDTO>(['productDetail', routeParams.id])
      
      const nextData = prevData
      if(nextData) {
        nextData.is_active = data.is_active

        queryClient.setQueryData(['productDetail', routeParams.id], nextData)
      }
    },
    onError: (error) => {
      console.log(error)
      
      if(error instanceof AppError) {
        toast.show({
          type: 'error',
          text1: error.message,
        })
        return
      }

      toast.show({
        type: 'error',
        text1: 'Erro ao editar anúncio',
      })
    },
  })

  const deleteProductMutation =useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.show({
        type: 'success',
        text1: 'Anúncio excluído com sucesso!'
      })

      router.replace('/my-ads')
    },
    onError: (error) => {
      console.log(error)
      
      if(error instanceof AppError) {
        toast.show({
          type: 'error',
          text1: error.message,
        })
        return
      }

      toast.show({
        type: 'error',
        text1: 'Erro ao excluir anúncio',
      })
    },
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

  function handleEditAds(product: ProductDetailDTO) {
    router.push({
      pathname: `/ads/${product.id}/edit/edit-ads-form-step`,
      params: {
        adsData: JSON.stringify(product)
      }
    })
  }

  function handleConfirmActiveOrDisableProduct() {
    modalConfirmActiveOrDisableProductRef.current?.present()
  }

  function handleCloseModalConfirmActiveOrDisableProduct() {
    modalConfirmActiveOrDisableProductRef.current?.dismiss()
  }

  function handleActiveOrDisableProduct() {
    modalConfirmActiveOrDisableProductRef.current?.dismiss()

    activeDisableProductMutation.mutate(
      {
        productId: productDetailQuery.data?.id!,
        data: {
          is_active: !productDetailQuery.data?.is_active
        }
      }
    )
  }

  function handleConfirmDeleteProduct() {
    modalConfirmDeleteProductRef.current?.present()
  }

  function handleDeleteProduct() {
    modalConfirmDeleteProductRef.current?.dismiss()
    deleteProductMutation.mutate(productDetailQuery.data?.id!)
  }

  function handleCloseModalConfirmDeleteProduct() {
    modalConfirmDeleteProductRef.current?.dismiss()
  }

  async function handleWhatsAppContact() {
    Linking.openURL(`https://wa.me/${productDetailQuery.data?.user.tel}?text=Oi+${productDetailQuery.data?.user.name}%21+Gostaria+de+solicitar+um+or%C3%A7amento+de+projeto+%3A%29`)
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
            onPress={() => handleEditAds(productDetailQuery.data!)}
          />
        )}
      </SafeAreaView>

      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="space-y-6"
        >
          <View>
            <Skeleton
              isLoading={productDetailQuery.isFetching}
              styles={{
                width: '100%',
                height: 256,
              }}
            >
              <View>
                <ProductsSlideImages
                  data={productImages ?? []}
                />

                {!productDetailQuery.data?.is_active && (
                  <View className="absolute h-full w-full items-center justify-center bg-neutral-700/60">
                    <Text className="font-heading text-sm uppercase text-neutral-100">
                      Anúncio desativado
                    </Text>
                  </View>
                )}
              </View>
            </Skeleton>
          </View>

          <View className="p-6 space-y-6">
            <View className="flex-row items-center space-x-2">
              <View className="h-6 w-6 rounded-full border-2 border-blue-300">
                <Skeleton
                  isLoading={productDetailQuery.isFetching}
                  styles={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 12,
                  }}
                >
                  <Image
                    source={
                      productDetailQuery.data?.user.avatar
                      ? { uri: `${api.defaults.baseURL}/images/${productDetailQuery.data.user.avatar}` }
                      : AvatarDefaultImg
                    }
                    className="h-full w-full rounded-full"
                  />
                </Skeleton>
              </View>

              <View>
                <Skeleton
                  isLoading={productDetailQuery.isFetching}
                  styles={{
                    height: 14,
                    width: 100,
                    borderRadius: 7,
                  }}
                >
                  <Text className="font-body text-sm text-neutral-700">
                    {productDetailQuery.data?.user.name}
                  </Text>
                </Skeleton>
              </View>
            </View>

            <View className="space-y-2">
              <View className="flex-row">
                <Skeleton
                  isLoading={productDetailQuery.isFetching}
                  styles={{
                    height: 20,
                    width: 72,
                    borderRadius: 10,
                  }}
                >
                  <TagSelection
                    label={productDetailQuery.data?.is_new ? 'Novo' : 'Usado'}
                    disabled
                  />
                </Skeleton>
              </View>

              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Skeleton
                    isLoading={productDetailQuery.isFetching}
                    styles={{
                      height: 20,
                      width: 120,
                      borderRadius: 10,
                    }}
                  >
                    <Text className="font-heading flex-wrap text-xl text-neutral-700">
                      {productDetailQuery.data?.name}
                    </Text>
                  </Skeleton>
                </View>

                <View>
                  <Skeleton
                    isLoading={productDetailQuery.isFetching}
                    styles={{
                      height: 20,
                      width: 142,
                      borderRadius: 10,
                    }}
                  >
                    <Text className="font-heading text-sm text-blue-300">
                      R${' '}
                      <Text className="text-xl">
                        {priceFormatted}
                      </Text>
                    </Text>
                  </Skeleton>
                </View>
              </View>

              <View>
                {productDetailQuery.isFetching && (
                  <View className="space-y-2">
                    <View>
                      <Skeleton
                        styles={{
                          height: 14,
                          width: '100%',
                          borderRadius: 7,
                        }}      
                      />
                    </View>

                    <View>
                      <Skeleton
                        styles={{
                          height: 14,
                          width: '100%',
                          borderRadius: 7,
                        }}      
                      />
                    </View>

                    <View>
                      <Skeleton
                        styles={{
                          height: 14,
                          width: '50%',
                          borderRadius: 7,
                        }}      
                      />
                    </View>
                  </View>
                )}

                <Text className="font-body text-sm text-neutral-600">
                  {productDetailQuery.data?.description}
                </Text>
              </View>
            </View>

            <View className="space-y-4">
              <View className="flex-row items-center space-x-2">
                <Skeleton
                  isLoading={productDetailQuery.isFetching}
                  styles={{
                    height: 14,
                    width: 120,
                    borderRadius: 7,
                  }}
                >
                  <Text className="font-heading text-sm text-neutral-600">
                    Aceita troca?
                  </Text>

                  <Text className="font-body text-sm text-neutral-600">
                    {productDetailQuery.data?.accept_trade ? 'Sim' : 'Não'}
                  </Text>
                </Skeleton>
              </View>

              <Text className="font-heading text-sm text-neutral-600">
                Meios de pagamentos
              </Text>

              <View>
                <Skeleton
                  isLoading={productDetailQuery.isFetching}
                  styles={{
                    height: 200,
                    width: '100%',
                    borderRadius: 6,
                  }}
                >
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
                </Skeleton>
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
            variant={
              productDetailQuery.data?.is_active
              ? 'black'
              : 'primary'
            }
            title={
              productDetailQuery.data?.is_active
              ? 'Desativar anúncio'
              : 'Reativar anúncio'
            }
            leftIcon={PowerSvg}
            loading={activeDisableProductMutation.isPending}
            onPress={handleConfirmActiveOrDisableProduct}
          />

          <Button
            variant="secondary"
            title="Excluir anúncio"
            leftIcon={TrashSvg}
            loading={deleteProductMutation.isPending}
            onPress={handleConfirmDeleteProduct}
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView
          edges={['bottom']}
          className="flex-row items-center justify-between p-6 bg-neutral-100"
        >
          <View className="flex-row items-center">
            <Text className="font-heading text-sm text-blue-500">
              R${' '}
            </Text>

            <Text className="font-heading text-2xl text-blue-500">
              {priceFormatted}
            </Text>
          </View>

          <Button
            title="Entrar em contato"
            leftIcon={WhatsAppImg}
            onPress={handleWhatsAppContact}
          />
        </SafeAreaView>
      )}

      <ModalBottom
        modalBottomRef={modalConfirmActiveOrDisableProductRef}
        snapPoints={['35%', '35%']}
      >
        <SafeAreaView
          edges={['bottom']}
          className="flex-1 p-6 space-y-8"
        >
          <Text className="font-heading text-base text-center text-neutral-600">
            {`Deseja realmente ${productDetailQuery.data?.is_active ? 'desativar' : 'ativar'} o anuncio?`}
          </Text>

          <View className="flex-1 justify-end space-y-2">
            
            <Button
              title="Sim, continuar"
              className="bg-red-500"
              onPress={handleActiveOrDisableProduct}
            />

            <Button
              variant="secondary"
              title="Cancelar"
              onPress={handleCloseModalConfirmActiveOrDisableProduct}
            />
          </View>
        </SafeAreaView>
      </ModalBottom>

      <ModalBottom
        modalBottomRef={modalConfirmDeleteProductRef}
        snapPoints={['35%', '35%']}
      >
        <SafeAreaView
          edges={['bottom']}
          className="flex-1 p-6 space-y-8"
        >
          <Text className="font-heading text-base text-center text-neutral-600">
            Deseja realmente excluir o anúncio?
          </Text>

          <View className="flex-1 justify-end space-y-2">
            
            <Button
              title="Sim, excluir!"
              className="bg-red-500"
              onPress={handleDeleteProduct}
            />

            <Button
              variant="secondary"
              title="Cancelar"
              onPress={handleCloseModalConfirmDeleteProduct}
            />
          </View>
        </SafeAreaView>
      </ModalBottom>
    </View>
  )
}
