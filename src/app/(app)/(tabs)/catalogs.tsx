import { useCallback, useRef, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useFocusEffect } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/button'
import { InputSearch } from '@/components/forms/input-search'
import { ModalBottom, BottomSheetModal } from '@/components/bottom-sheet'
import { ProductItem } from '@/components/product-item'
import { getUserProducts } from '@/services/api/endpoints/get-user-products'

import { FiltersModalContent, FiltersProductFormProps } from '@/sections/catalogs/modal/filters-modal-content'

import { useAuth } from '@/hooks/use-auth'

import { api } from '@/services/api/api-config'
import { getProducts } from '@/services/api/endpoints/get-products'

import themeColors from '@/theme/colors'

import PlusSvg from '@/assets/plus.svg'
import ArrowRightSvg from '@/assets/arrow-right.svg'
import TagSvg from '@/assets/tag.svg'
import DefaultAvatar from '@/assets/avatar-default.png'
import { CatalogsLoader } from '@/sections/catalogs/catalogs-loader'

export default function Catalogs() {
  const [inputQuery, setInputQuery] = useState('')
  const [filtersProduct, setFiltersProduct] = useState<FiltersProductFormProps | undefined>(undefined)

  const modalFiltersRef = useRef<BottomSheetModal>(null)
  const firstTimeRef = useRef(true)

  const { user } = useAuth()
  
  const {
      isFetching: isProductsDataFetching,
      data: productsData,
      refetch: refetchProducts
    } = useQuery({
    initialData: [],
    queryKey: ['products', filtersProduct],
    queryFn: () => getProducts({
      params: {
        ...filtersProduct
      }
    })
  })

  const { data: userProductsData, refetch: refetchUserProduct } = useQuery({
    initialData: [],
    queryKey: ['userAds'],
    queryFn: getUserProducts,
  })

  const firstNameUser = user?.name.split(' ')[0]

  function handleShowFilters() {
    modalFiltersRef.current?.present()
  }

  function handleAddNewAds() {
    router.push('/ads/create/create-ads-form-step')
  }

  function handleShowDetailAds(productId: string) {
    router.push(`/ads/${productId}/detail`)
  }

  function handleApplyFilters(data: FiltersProductFormProps) {
    modalFiltersRef.current?.dismiss()
    setFiltersProduct({
      query: inputQuery,
      ...data,
    })
  }

  function handleApplyQueryFilter() {
    setFiltersProduct((prevData) => ({
      ...prevData,
      query: inputQuery,
    }))
  }

  function handleGoMyAds() {
    router.push('/my-ads')
  }

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      refetchProducts()
      refetchUserProduct()
    }, []),
  )

  return (
    <SafeAreaView
      edges={['top']}
      className="flex-1 bg-neutral-200"
    >
      <View className="flex-row items-center justify-between py-8 px-6 space-x-2">
        <View className="flex-1 flex-row items-center space-x-2">
          <View className="h-12 w-12 rounded-full border-2 border-blue-500">
            <Image
              source={
                user?.avatar
                ? { uri: `${api.defaults.baseURL}/images/${user?.avatar}` }
                : DefaultAvatar
              }
              className="h-full w-full rounded-full"
            />
          </View>

          <View>
            <Text className="font-body text-base text-neutral-700">
              Boas vindas,{'\n'}
              <Text className="font-heading">
                {`${firstNameUser}!`}
              </Text>
            </Text>
          </View>
        </View>

        <View className="flex-1">
          <Button
            variant="black"
            title="Criar anúncio"
            leftIcon={PlusSvg}
            onPress={handleAddNewAds}
          />
        </View>
      </View>

      {isProductsDataFetching ? (
        <CatalogsLoader />
      ) : (
        <FlatList
          data={productsData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            productsData.length === 0 ? {
              flex: 1,
            } : {
              paddingHorizontal: 12,
              paddingBottom: 64,
          }}
          numColumns={2}
          renderItem={({ item }) => (
            <View className="basis-1/2 px-3 mb-5">
              <ProductItem
                data={item}
                onPress={() => handleShowDetailAds(item.id)}
              />
            </View>
          )}
          ListHeaderComponent={
            <View className={
              twMerge(
                'space-y-9 px-3 pb-8',
                productsData.length === 0 && 'px-6'
              )
            }>
              <View className="space-y-3">
                <Text className="font-body text-sm text-neutral-500">
                  Seus produtos anunciados para venda
                </Text>
  
                <View className="flex-row items-center justify-between px-4 py-3 rounded-md bg-blue-300/10">
                  <View className="flex-row items-center space-x-4">
                    <TagSvg height={22} fill={themeColors.blue[500]} />
  
                    <View>
                      <Text className="font-heading text-xl text-neutral-600">
                        {userProductsData.length}{'\n'}
                        <Text className="font-body text-sm">
                          anúncios ativos
                        </Text>
                      </Text>
                    </View>
                  </View>
  
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className="flex-row items-center space-x-1"
                      onPress={handleGoMyAds}
                    >
                      <Text className="font-heading text-sm text-blue-500">
                        Meus anúncios
                      </Text>
  
                      <ArrowRightSvg
                        height={16}
                        fill={themeColors.blue[500]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
  
              <View className="space-y-3">
                <Text className="font-body text-sm text-neutral-500">
                  Compre produtos variados
                </Text>
  
                <View className="flex-row items-center space-x-2">
                  <InputSearch
                    value={inputQuery}
                    onChangeText={setInputQuery}
                    placeholder="Buscar anúncios"
                    onFilters={handleShowFilters}
                    onSearch={handleApplyQueryFilter}
                  />
                </View>
              </View>
            </View>
          }
        />
      )}

      <ModalBottom
        modalBottomRef={modalFiltersRef}
        snapPoints={['75%', '75%']}
      >
        <FiltersModalContent
          data={filtersProduct}
          onFilter={handleApplyFilters}
        />
      </ModalBottom>
    </SafeAreaView>
  )
}
