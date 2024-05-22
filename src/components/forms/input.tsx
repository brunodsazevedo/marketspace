import { useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import nwColors from 'tailwindcss/colors'

type Props = TextInputProps & {
  errorMessage?: string
}

export function Input({ className, ...rest}: Props) {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <View className="">
      <TextInput
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholderTextColor={nwColors.neutral[400]}
        className={
          twMerge(
            'w-full px-4 py-3 rounded-md border font-title text-base text-neutral-600 border-white bg-white',
            isFocus && 'border-neutral-500',
            className,
          )
        }
        {...rest}
      />
    </View>
  )
}
