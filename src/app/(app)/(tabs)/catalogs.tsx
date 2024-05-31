import { useRef } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { Button } from '@/components/button'
import { InputSearch } from '@/components/forms/input-search'
import { ModalBottom, BottomSheetModal } from '@/components/bottom-sheet'
import { AdsItem } from '@/components/ads-item'

import { FiltersModalContent } from '@/sections/catalogs/modal/filters-modal-content'

import { useAuth } from '@/hooks/use-auth'

import { api } from '@/services/api/api-config'

import themeColors from '@/theme/colors'

import PlusSvg from '@/assets/plus.svg'
import ArrowRightSvg from '@/assets/arrow-right.svg'
import TagSvg from '@/assets/tag.svg'
import DefaultAvatar from '@/assets/avatar-default.png'

export default function Catalogs() {
  const modalFiltersRef = useRef<BottomSheetModal>(null)

  const { user } = useAuth()

  const firstNameUser = user?.name.split(' ')[0]

  function handleShowFilters() {
    modalFiltersRef.current?.present()
  }

  function handleAddNewAds() {
    router.push('/ads/create/create-ads-form-step')
  }

  return (
    <SafeAreaView
      edges={['top']}
      className="flex-1 bg-neutral-200"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 74,
        }}
        className="space-y-9"
      >
        <View className="flex-row items-center justify-between space-x-2">
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

        <View className="space-y-3">
          <Text className="font-body text-sm text-neutral-500">
            Seus produtos anunciados para venda
          </Text>

          <View className="flex-row items-center justify-between px-4 py-3 rounded-md bg-blue-300/10">
            <View className="flex-row items-center space-x-4">
              <TagSvg height={22} fill={themeColors.blue[500]} />

              <View>
                <Text className="font-heading text-xl text-neutral-600">
                  4{'\n'}
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
              placeholder="Buscar anúncios"
              onFilters={handleShowFilters}
            />
          </View>
        </View>

        <View className="flex-row justify-between flex-wrap space-x-5">
          <AdsItem />
          <AdsItem />
          <AdsItem />
          <AdsItem />
        </View>
      </ScrollView>

      <ModalBottom
        modalBottomRef={modalFiltersRef}
        snapPoints={['75%', '75%']}
      >
        <FiltersModalContent />
      </ModalBottom>
    </SafeAreaView>
  )
}
