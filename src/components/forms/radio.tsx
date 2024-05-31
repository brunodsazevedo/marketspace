import { ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

type Props = {
  selected?: boolean
  label?: string
  children?: ReactNode
  onPress?: () => void
}

export function Radio({ selected, label, onPress }: Props) {
  return (
    <TouchableOpacity className="flex-row items-center space-x-2" onPress={onPress}>
      <View
        className={
          twMerge(
            'h-6 w-6 p-1 rounded-full border-2 border-neutral-400',
            selected && 'border-blue-300'
          )
        }
      >
        {selected && (
          <View className="h-full w-full rounded-full bg-blue-300" />
        )}
      </View>

      <View>
        <Text className="font-body text-base text-neutral-600">
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
