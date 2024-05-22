import { ScrollView, Text, View } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/button'
import { Input } from '@/components/forms/input'
import { InputPassword } from '@/components/forms/input-password'
import { UserPhoto } from '@/components/user-photo'

import LogoSvg from '@/assets/logo.svg'

export default function SignUp() {
  function handleGoSignIn() {
    router.push('/sign-in')
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
            <UserPhoto />
          </View>

          <View>
            <Input placeholder="Nome" />
          </View>

          <View>
            <Input placeholder="E-mail" />
          </View>

          <View>
            <Input placeholder="Telefone" />
          </View>

          <View>
            <InputPassword placeholder="Senha" />
          </View>

          <View>
            <InputPassword placeholder="Confirmar senha" />
          </View>

          <Button variant="black" title="Criar" />
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
