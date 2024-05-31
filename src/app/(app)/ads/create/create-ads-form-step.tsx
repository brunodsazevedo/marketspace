import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker'

import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { IconButton } from '@/components/icon-button'
import { Input } from '@/components/forms/input'
import { Radio } from '@/components/forms/radio'
import { Switch } from '@/components/forms/switch'
import { CheckBox } from '@/components/forms/check-box'
import { CurrencyInput } from '@/components/forms/currency-input'

import themeColors from '@/theme/colors'

import PlusSvg from '@/assets/plus.svg'
import XCircleSvg from '@/assets/x-circle.svg'

type FormDataProps = {
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

const createAdsFormScheme = yup.object({
  images: yup.array(yup.object({
    name: yup.string().required(),
    uri: yup.string().required(),
    type: yup.string().required(),
  })).required().min(1, 'Selecione no mínimo um método de pagamento'),
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Nome é obrigatório'),
  price: yup.number().required('Preço do produto é obrigatório'),
  is_new: yup.boolean().required('Condição do produto é obrigatório'),
  accept_trade: yup.boolean().required(),
  payment_methods: yup.array(
    yup.string().required(),
  ).required().min(1, 'Selecione no mínimo um método de pagamento'),
})

export default function CreateAdsFormStep() {
  const {
    control,
    getValues,
    setValue,
    watch,
    handleSubmit
  } = useForm({
    resolver: yupResolver(createAdsFormScheme),
    defaultValues: {
      images: [],
      payment_methods: [],
      accept_trade: false,
    }
  })

  const formData = watch()

  function handleBack() {
    router.back()
  }

  async function handleSelectImages() {
    try {
      const imagesUpdated = getValues('images')

      const imagesLocation = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        quality: 1,
      })

      if(imagesLocation.canceled) {
        return
      }

      imagesLocation.assets.forEach((asset) => {
        const pathFileSplitted = asset.uri.split('/')
        const fileNameWithExtension = pathFileSplitted[pathFileSplitted.length - 1]
        const fileNameWithExtensionSplitted = fileNameWithExtension.split('.')
        const fileName = fileNameWithExtensionSplitted[0]
        const fileExtension = asset.uri.split('.').pop()

        const imageData = {
          name: `${fileName}`.toLowerCase(),
          uri: asset.uri,
          type: `${asset.type}/${fileExtension}`,
        }

        imagesUpdated?.push(imageData)
      })

      setValue('images', imagesUpdated)
    } catch (error) {
      console.log(error)
    }
  }

  function handleRemoveImage(imageName: string) {
    const images = getValues('images')
    const imagesUpdated = images.filter((item) => item.name !== imageName)

    setValue('images', imagesUpdated)
  }

  function handleCheckOption(valueSelect: string) {
    const paymentMethods = getValues('payment_methods')
    const isValueSelected = paymentMethods?.some((item) => item === valueSelect)
    
    if(isValueSelected) {
      const paymentMethodsUpdated = paymentMethods?.filter((item) => item !== valueSelect)
      setValue('payment_methods', paymentMethodsUpdated)
      return
    }

    paymentMethods?.push(valueSelect)
    setValue('payment_methods', paymentMethods)
  }

  function handleNext(dataForm: FormDataProps) {
    router.push({
      pathname: '/ads/create/confirmation-step',
      params: {
        adsData: JSON.stringify(dataForm)
      }
    })
  }

  return (
    <View className="flex-1 bg-neutral-200">
      <Header
        title="Criar anúncio"
        onBack={handleBack}
      />

      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
          className="space-y-8"
        >
          <View className="space-y-4">
            <Text className="px-6 font-heading text-base text-neutral-600">
              Imagens
            </Text>

            <Text className="px-6 font-body text-sm text-neutral-500">
              Escolha até 3 imagens para mostrar o quando o{'\n'}
              seu produto é incrível!
            </Text>

            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                className="space-x-2"
              >
                {formData.images?.map((imageData, index) => (
                  <View key={index} className="h-28 w-28">
                    <Image
                      source={{ uri: imageData.uri }}
                      className="h-full w-full rounded-md"
                    />

                    <View className="absolute top-1 right-1">
                      <IconButton
                        icon={XCircleSvg}
                        iconSize={24}
                        iconColor={themeColors.neutral[600]}
                        className="h-5 w-5 rounded-full p-0 bg-transparent"
                        onPress={() => handleRemoveImage(imageData.name)}
                      />
                    </View>
                  </View>
                ))}

                <TouchableOpacity
                  activeOpacity={0.7}
                  className="h-28 w-28 items-center justify-center rounded-md bg-neutral-300"
                  onPress={handleSelectImages}
                >
                  <PlusSvg
                    height={24}
                    width={24}
                    fill={themeColors.neutral[400]}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>

          <View className="px-6 space-y-4">
            <Text className="font-heading text-base text-neutral-600">
              Sobre o produto
            </Text>

            <View>
              <Controller
                control={control}
                name="name"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="Título do anúncio"
                  />
                )}
              />
            </View>

            <View>
              <Controller
                control={control}
                name="description"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="Descrição do produto"
                    multiline
                    style={{
                      textAlignVertical: 'top',
                    }}
                    className="h-40"
                  />
                )}
              />
            </View>

            <View className="flex-row items-center space-x-5">
              <View>
                <Controller
                  control={control}
                  name="is_new"
                  render={({ field: { value, onChange } }) => (
                    <Radio
                      selected={value}
                      label="Produto novo"
                      onPress={() => onChange(true)}
                    />
                  )}
                />
              </View>
              
              <View>
                <Controller
                  control={control}
                  name="is_new"
                  render={({ field: { value, onChange } }) => (
                    <Radio
                      selected={value === false}
                      label="Produto usado"
                      onPress={() => onChange(false)}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          <View className="px-6 space-y-4">
            <Text className="font-heading text-base text-neutral-600">
              Venda
            </Text>

            <View>
              <Controller
                control={control}
                name="price"
                render={({ field: { value, onChange } }) => (
                  <CurrencyInput
                    value={value}
                    onChangeValue={onChange}
                    placeholder="Valor do produto"
                    precision={2}
                    prefix="R$ "
                    separator=","
                    delimiter="."
                  />
                )}
              />
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
                  render={({ field: { value, onChange } }) => (
                    <View className="space-y-2">
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
                          label="Cartão de crédito"
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
        </ScrollView>
      </View>

      <SafeAreaView
        edges={['bottom']}
        className="flex-row items-center justify-between px-6 py-5 space-x-3"
      >
        <View className="flex-1">
          <Button
            variant="secondary"
            title="Cancelar"
            onPress={handleBack}
          />
        </View>

        <View className="flex-1">
          <Button
            variant="black"
            title="Avançar"
            onPress={handleSubmit(handleNext)}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
