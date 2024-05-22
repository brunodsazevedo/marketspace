import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/button'
import { Input } from '@/components/forms/input'
import { InputPassword } from '@/components/forms/input-password'

import LogoSvg from '@/assets/logo.svg'

export default function SignIn() {
  function handleGoSignUp() {
    router.push('/sign-up')
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
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View>
              <InputPassword placeholder="Senha" />
            </View>

            <Button title="Entrar" />
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
