import { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { router } from 'expo-router'
import { useQuery } from '@tanstack/react-query'

import { Header } from '@/components/header'
import { IconButton } from '@/components/icon-button'
import { ProductItem } from '@/components/product-item'
import { Select } from '@/components/forms/select'
import { OptionProps } from '@/components/forms/select/option'
import { EmptyList } from '@/components/empty-list'

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

  const userProductsQuery = useQuery({
    queryKey: ['userProducts'],
    queryFn: getUserProducts,
    initialData: []
  })
  
  function handleAddNewAds() {
    router.push('/ads/create/create-ads-form-step')
  }

  function handleShowDetailAds(productId: string) {
    router.push(`/ads/${productId}/detail`)
  }

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
        <FlatList
          data={userProductsQuery.data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            userProductsQuery.data.length === 0 ? {
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
            <View className="flex-row items-center justify-between px-3 pt-2 pb-6">
              <Text className="font-body text-sm text-neutral-600">
                9 anúncios
              </Text>

              <Select options={statusOptions} />
            </View>
          }
          ListEmptyComponent={
            <EmptyList message="Cadastre seu primeiro produto!" />
          }
        />
      </View>
    </View>
  )
}
