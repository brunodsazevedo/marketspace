import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { TagSelection } from '@/components/forms/tag-selection'
import { Switch } from '@/components/forms/switch'
import { CheckBox } from '@/components/forms/check-box'
import { IconButton } from '@/components/icon-button'
import { Button } from '@/components/button'
import { useBottomSheetModal } from '@/components/bottom-sheet'

import CloseSvg from '@/assets/x.svg'

type Props = {
  data?: FiltersProductFormProps
  onFilter: (data: FiltersProductFormProps) => void
}

export type FiltersProductFormProps = {
  is_new?: boolean
  accept_trade?: boolean
  payment_methods?: string[]
  query?: string
}

const paramsFiltersParamsScheme = yup.object({
  is_new: yup.boolean(),
  accept_trade: yup.boolean(),
  payment_methods: yup.array(yup.string().required()),
})

export function FiltersModalContent({ data, onFilter }: Props) {
  const { control, setValue, getValues, reset, handleSubmit } = useForm({
    resolver: yupResolver(paramsFiltersParamsScheme)
  })

  const { dismissAll } = useBottomSheetModal()

  function handleToggleNewCondition(isNewValue: boolean) {
    const oldCondition = getValues('is_new')

    if(isNewValue === oldCondition) {
      setValue('is_new', undefined)
      return
    }

    setValue('is_new', isNewValue)
  }

  function handleCheckOption(valueSelect: string) {
    const paymentMethods = getValues('payment_methods') || []
    const isValueSelected = paymentMethods?.some((item) => item === valueSelect)
    
    if(isValueSelected) {
      const paymentMethodsUpdated = paymentMethods?.filter((item) => item !== valueSelect)
      setValue('payment_methods', paymentMethodsUpdated)
      return
    }

    paymentMethods?.push(valueSelect)
    setValue('payment_methods', paymentMethods)
  }

  function handleResetFilters() {
    reset()
  }

  function handleApplyFilters(dataForm: FiltersProductFormProps) {
    onFilter(dataForm)
  }

  useEffect(() => {
    if(data) {
      setValue('accept_trade', data.accept_trade)
      setValue('is_new', data.is_new)
      setValue('payment_methods', data.payment_methods)
    }
  }, [])

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
          onPress={dismissAll}
        />
      </View>

      <View className="flex-1 px-6 space-y-6">
        <View className="space-y-3">
          <Text className="font-heading text-sm text-neutral-600">
            Condição
          </Text>

          <View>
            <Controller
              control={control}
              name="is_new"
              render={({ field: { value } }) => (
                <View className="flex-row items-center space-x-2">
                  <View>
                    <TagSelection
                      label="Novo"
                      selected={value === true}
                      onPress={() => handleToggleNewCondition(true)}
                    />
                  </View>

                  <View>
                    <TagSelection
                      label="Usado"
                      selected={value === false}
                      onPress={() => handleToggleNewCondition(false)}
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </View>

        <View className="space-y-3">
          <Text className="font-heading text-sm text-neutral-600">
            Aceita troca?
          </Text>

          <View>
            <Controller
              control={control}
              name="accept_trade"
              render={({ field: { value, onChange } }) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
          </View>
        </View>

        <View className="space-y-3">
          <Text className="font-heading text-sm text-neutral-600">
            Meios de pagamentos aceitos
          </Text>

          <View>
            <Controller
              control={control}
              name="payment_methods"
              render={({ field: { value } }) => (
                <View className="space-y-3">
                  <View>
                    <CheckBox
                      label="Boleto"
                      checked={value?.includes('boleto')}
                      onPress={() => handleCheckOption('boleto')}
                    />
                  </View>

                  <View>
                    <CheckBox
                      label="Pix"
                      checked={value?.includes('pix')}
                      onPress={() => handleCheckOption('pix')}
                    />
                  </View>

                  <View>
                    <CheckBox
                      label="Dinheiro"
                      checked={value?.includes('cash')}
                      onPress={() => handleCheckOption('cash')}
                    />
                  </View>

                  <View>
                    <CheckBox
                      label="Cartão de Crédito"
                      checked={value?.includes('card')}
                      onPress={() => handleCheckOption('card')}
                    />
                  </View>

                  <View>
                    <CheckBox
                      label="Depósito Bancário"
                      checked={value?.includes('deposit')}
                      onPress={() => handleCheckOption('deposit')}
                    />
                  </View>
                </View>
              )}
            />
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
            onPress={handleResetFilters}
          />
        </View>

        <View className="flex-1">
          <Button
            variant="black"
            title="Aplicar filtros"
            onPress={handleSubmit(handleApplyFilters)}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
