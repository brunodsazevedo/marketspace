import { useState } from 'react'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-native-toast-message'

import { Button } from '@/components/button'
import { Input } from '@/components/forms/input'
import { InputPassword } from '@/components/forms/input-password'

import { useAuth } from '@/hooks/use-auth'

import { AppError } from '@/utils/AppError'

import LogoSvg from '@/assets/logo.svg'

type FormDataProps = {
  email: string
  password: string
}

const signInScheme = yup.object({
  email: yup.string().required('E-mail é obrigatório').email('Informe um e-mail válido'),
  password: yup.string().required('Senha é obrigatório'),
})

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { onSignIn } = useAuth()

  const { control, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(signInScheme)
  })  

  function handleGoSignUp() {
    router.push('/sign-up')
  }

  async function handleSignIn(dataForm: FormDataProps) {
    try {
      setIsLoading(true)
      console.log(dataForm);
      
      await onSignIn(dataForm.email, dataForm.password)

      setIsLoading(false)

      router.push('/catalogs')
    } catch (error) {
      console.log(error)
      setIsLoading(false)

      if(error instanceof AppError) {
        console.log(error.message)
        
        toast.show({
          type: 'error',
          text1: error.message,
        })

        return
      }

      toast.show({
        type: 'error',
        text1: 'Erro ao efetuar login!',
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        edges={['bottom']}
        className="flex-1 bg-neutral-100"
      >
        <View className="items-center justify-between rounded-b-3xl py-24 px-10 space-y-20 bg-neutral-200">
          <View className="items-center justify-center space-y-6">
            <LogoSvg width={70} />

            <View className="items-center justify-center">
              <Text className="font-heading text-center text-2xl text-neutral-700">
                marketspace
              </Text>

              <Text className="font-body text-center text-sm text-neutral-500">
                Seu espaço de compra e venda
              </Text>
            </View>
          </View>
          
          <View className="space-y-4 w-full">
            <Text className="font-body text-center text-sm text-neutral-600">
              Acesse sua conta
            </Text>

            <View>
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    errorMessage={errors.email && errors.email.message}
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

            <Button
              title="Entrar"
              loading={isLoading}
              onPress={handleSubmit(handleSignIn)}
            />
          </View>
        </View>

        <View className="items-center justify-center space-y-4 px-10 py-14 bg-neutral-100">
          <Text className="font-body text-sm text-center neutral-600">
            Ainda não tem acesso?
          </Text>

          <Button
            variant="secondary"
            title="Criar uma conta"
            onPress={handleGoSignUp}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
