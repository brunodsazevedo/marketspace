import { ReactNode } from 'react'
import { Text, View } from 'react-native'

type Props = {
  message?: string
  children?: ReactNode
}

export function EmptyList({ message, children }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      {message && (
        <Text className="font-body text-sm text-center text-neutral-500">
          {message}
        </Text>
      )}

      {children}
    </View>
  )
}
