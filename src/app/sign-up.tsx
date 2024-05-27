import { ScrollView, Text, View } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-native-toast-message'
import { AxiosError } from 'axios'

import { Button } from '@/components/button'
import { Input } from '@/components/forms/input'
import { InputPassword } from '@/components/forms/input-password'
import { UserPhoto } from '@/components/user-photo'

import { phoneMasker, unMasker } from '@/utils/masks'

import { createUser } from '@/services/api/endpoints/createUser'

import LogoSvg from '@/assets/logo.svg'
import AvatarDefault from '@/assets/avatar-default.png'

type FormDataProps = {
  avatar: {
    name: string
    uri: string
    type: string
  }
  name: string
  email: string
  tel: string
  password: string
  confirmPassword: string
}

const signUpScheme = yup.object({
  avatar: yup.object({
    name: yup.string().required('Imagem é obrigatório'),
    uri: yup.string().required('Imagem é obrigatório'),
    type: yup.string().required('Imagem é obrigatório'),
  }).required('Imagem é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('E-mail é obrigatório').email('Informe um e-mail válido'),
  tel: yup.string().required('Telefone é obrigatório').length(15, 'Informe um telefone válido'),
  password: yup.string().required('Senha é obrigatório'),
  confirmPassword: yup.string().required('Confirmação de senha é obrigatório').oneOf([yup.ref('password')], 'A confirmação da senha não confere.'),
})

export default function SignUp() {
  const signUpMutation = useMutation({
    mutationKey: ['createUsers'],
    mutationFn: createUser,
    onError: (error) => {      
      if(error instanceof AxiosError) {
        console.log(error?.response?.data)
        
        toast.show({
          type: 'error',
          text1: error.message,
        })

        return
      }

      toast.show({
        type: 'error',
        text1: 'Erro ao criar usuário!',
      })
    },
    onSuccess: () => {
      toast.show({
        type: 'success',
        text1: 'Usuário criado com sucesso. Faça seu login!'
      })

      router.push('/sign-in')
    },
  })

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signUpScheme),
  })

  function handleGoSignIn() {
    router.push('/sign-in')
  }

  async function handlePickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
      aspect: [4, 4]
    })

    if(result.canceled) {
      return
    }

    const pathFileSplitted = result.assets[0].uri.split('/')
    const fileNameWithExtension = pathFileSplitted[pathFileSplitted.length - 1]
    const fileNameWithExtensionSplitted = fileNameWithExtension.split('.')
    const fileName = fileNameWithExtensionSplitted[0]
    
    const fileExtension = result.assets[0].uri.split('.').pop()

    setValue('avatar', {
      name: `${fileName}`.toLowerCase(),
      uri: result.assets[0].uri,
      type: `${result.assets[0].type}/${fileExtension}`,
    })
  }

  function handleCreateUser(dataForm: FormDataProps) {
    console.log('dataForm =>', dataForm)
    
    const data = new FormData()

    data.append('avatar', { ...dataForm.avatar } as any)
    data.append('name', dataForm.name)
    data.append('email', dataForm.email)
    data.append('tel', `+55${unMasker(dataForm.tel)}`)
    data.append('password', dataForm.password)

    console.log('FormData =>', data)
    signUpMutation.mutate({ data })
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-neutral-200">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 48, paddingVertical: 40 }}
      >
        <View className="items-center justify-center space-y-4">
          <LogoSvg width={60} />

          <Text className="font-heading text-center text-xl text-neutral-700">
            Boas vindas!
          </Text>

          <Text className="font-body text-center text-sm leading-relaxed text-neutral-600">
            Crie sua conta e use o espaço para comprar{'\n'}
            itens variados e vender seus produtos
          </Text>
        </View>

        <View className="my-10 space-y-4">
          <View className="items-center justify-center">
            <Controller
              control={control}
              name="avatar"
              render={({ field: { value } }) => (
                <UserPhoto
                  source={value?.uri ? { uri: value?.uri } : AvatarDefault}
                  onPress={handlePickImage}
                />
              )}
            />

            {errors.avatar?.uri && (
              <View className="w-full">
                <Text className="font-body text-sm text-center my-1 text-red-500">
                  {errors.avatar?.uri?.message}
                </Text>
              </View>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nome"
                  errorMessage={errors.name && errors.name.message}
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="E-mail"
                  errorMessage={errors.email && errors.email.message}
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="tel"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={(e) => onChange(phoneMasker(e))}
                  placeholder="Telefone"
                  keyboardType="number-pad"
                  maxLength={15}
                  errorMessage={errors.tel && errors.tel.message}
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <InputPassword
                  value={value}
                  onChangeText={onChange}
                  placeholder="Senha"
                  errorMessage={errors.password && errors.password.message}
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { value, onChange } }) => (
                <InputPassword
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirmar senha"
                  errorMessage={errors.confirmPassword && errors.confirmPassword.message}
                />
              )}
            />
          </View>

          <Button
            variant="black"
            title="Criar"
            loading={signUpMutation.isPending}
            onPress={handleSubmit(handleCreateUser)}
          />
        </View>

        <View className="items-center justify-center w-full space-y-4">
          <Text className="font-body text-sm text-center text-neutral-600">
            Já tem uma conta?
          </Text>

          <Button
            variant="secondary"
            title="Ir para o login"
            onPress={handleGoSignIn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
