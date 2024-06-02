import { useCallback, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { router, useFocusEffect } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'

import { Header } from '@/components/header'
import { IconButton } from '@/components/icon-button'
import { ProductItem } from '@/components/product-item'
import { Select } from '@/components/forms/select'
import { OptionProps } from '@/components/forms/select/option'
import { EmptyList } from '@/components/empty-list'

import { MyAdsLoaders } from '@/sections/my-ads/my-ads-loaders'

import { getUserProducts } from '@/services/api/endpoints/get-user-products'

import themeColors from '@/theme/colors'

import PlusIcon from '@/assets/plus.svg'

export default function MyAds() {
  const [statusOptions, setStatusOptions] = useState<OptionProps[]>([
    {
      label: 'Todos',
      value: 'all',
      selected: true
    },
    {
      label: 'Ativos',
      value: 'active',
      selected: false
    },
    {
      label: 'Inativo',
      value: 'disabled',
      selected: false
    },
  ])

  const firstTimeRef = useRef(true)

  const userProductsQuery = useQuery({
    queryKey: ['userProducts'],
    queryFn: getUserProducts,
    initialData: []
  })
  
  const statusSelected = statusOptions.find((item) => item.selected)

  const productsDataFiltered = userProductsQuery.data?.filter((product) => {
    if (statusSelected?.value === 'active' && product.is_active) {
      return true
    }
  
    if (statusSelected?.value === 'disable' && !product.is_active) {
      return true
    }
  
    if (statusSelected?.value === 'all') {
      return true
    }
  
    return false; // Caso nenhum dos valores corresponda, retorna false explicitamente
  }) || []

  function handleAddNewAds() {
    router.push('/ads/create/create-ads-form-step')
  }

  function handleShowDetailAds(productId: string) {
    router.push(`/ads/${productId}/detail`)
  }

  function handleSelectOption(valueOption: string) {
    const statusOptionsUpdated = statusOptions.map((option) => {
      if(option.value === valueOption) {
        return {
          ...option,
          selected: true
        }
      }

      return {
        ...option,
        selected: false,
      }
    })

    setStatusOptions(statusOptionsUpdated)
  }

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      userProductsQuery.refetch()
    }, []),
  )

  return (
    <View className="flex-1 bg-neutral-200">
      <Header
        title="Meus anúncios"
        rightElement={
          <IconButton
            icon={PlusIcon}
            iconSize={24}
            iconColor={themeColors.neutral[700]}
            className="p-0 bg-transparent"
            onPress={handleAddNewAds}
          />
        }
      />

      <View className="flex-1">
        {userProductsQuery.isFetching ? (
          <MyAdsLoaders />
        ) : (
          <FlatList
            data={productsDataFiltered}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              productsDataFiltered.length === 0 ? {
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
                  'flex-row items-center justify-between px-3 pt-2 pb-6',
                  productsDataFiltered.length === 0 && 'px-6'
                )
              }>
                <Text className="font-body text-sm text-neutral-600">
                  {productsDataFiltered.length} anúncio(s)
                </Text>

                <Select
                  value={statusSelected?.value}
                  onChange={handleSelectOption}
                  options={statusOptions}
                />
              </View>
            }
            ListEmptyComponent={
              <EmptyList message="Não há produtos a serem listados!" />
            }
          />
        )}
      </View>
    </View>
  )
}
