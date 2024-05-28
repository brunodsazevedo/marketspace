import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TagSelection } from '@/components/forms/tag-selection'
import { Switch } from '@/components/forms/switch'
import { CheckBox } from '@/components/forms/check-box'
import { IconButton } from '@/components/icon-button'
import { Button } from '@/components/button'

import CloseSvg from '@/assets/x.svg'

export function FiltersModalContent() {
  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between px-6 mb-6">
        <Text className="font-heading text-xl text-neutral-700">
          Filtrar anúncios
        </Text>

        <IconButton
          variant="secondary"
          icon={CloseSvg}
          className="bg-transparent"
        />
      </View>

      <View className="flex-1 px-6 space-y-6">
        <View className="space-y-3">
          <Text className="font-heading text-sm text-neutral-600">
            Condição
          </Text>

          <View className="flex-row items-center space-x-2">
            <View>
              <TagSelection label="Novo" selected />
            </View>

            <View>
              <TagSelection label="Usado" />
            </View>
          </View>
        </View>

        <View className="space-y-3">
          <Text className="font-heading text-sm text-neutral-600">
            Aceita troca?
          </Text>

          <Switch />
        </View>

        <View className="space-y-3">
          <Text className="font-heading text-sm text-neutral-600">
            Meios de pagamentos aceitos
          </Text>

          <View className="space-y-3">
            <View>
              <CheckBox label="Boleto" />
            </View>

            <View>
              <CheckBox label="Pix" />
            </View>

            <View>
              <CheckBox label="Dinheiro" />
            </View>

            <View>
              <CheckBox label="Cartão de Crédito" />
            </View>

            <View>
              <CheckBox label="Depósito Bnacário" />
            </View>
          </View>
        </View>
      </View>

      <SafeAreaView
        edges={['bottom']}
        className="flex-row items-center space-x-3 px-6 pb-8"
      >
        <View className="flex-1">
          <Button
            variant="secondary"
            title="Resetar filtros"
          />
        </View>

        <View className="flex-1">
          <Button
            variant="black"
            title="Aplicar filtros"
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
