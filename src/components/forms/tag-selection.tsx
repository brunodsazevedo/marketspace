import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

import CloseCircleSvg from '@/assets/x-circle.svg'

type Props = {
  label: string
  selected?: boolean
  disabled?: boolean
  onPress?: () => void
}

export function TagSelection({ label, disabled = false, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View
        className={
          twMerge(
            'flex-row items-center px-4 py-1.5 rounded-full space-x-1.5 bg-neutral-300',
            selected && 'pr-1.5 bg-blue-300',
            // !disabled && 'pr-1.5',
          )
        }
      >
        <View>
          <Text
            className={
              twMerge(
                'font-heading text-xs uppercase text-neutral-600',
                selected && 'text-white'
              )
            }
          >
            {label}
          </Text>
        </View>

        {!disabled && selected && (
          <CloseCircleSvg height={16} width={16} fill="white" />
        )}
      </View>
    </TouchableOpacity>
  )
}
