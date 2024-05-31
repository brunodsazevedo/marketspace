import { Text, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'

export type OptionProps = {
  value: string
  label: string
  selected?: boolean
}

type Props = {
  data: OptionProps
  onPress?: () => void
}

export function Option({ data, onPress }: Props) {
  return (
    <TouchableOpacity
      className="flex-row w-full p-3"
      onPress={onPress}
    >
      <Text className={
        twMerge(
          'font-body text-sm text-neutral-600',
          data.selected && 'font-heading',
        )
      }>
        {data.label}
      </Text>
    </TouchableOpacity>
  )
}
