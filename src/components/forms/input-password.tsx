import { useState } from 'react'
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import nwColors from 'tailwindcss/colors'

import EyeSvg from '@/assets/eye.svg'
import EyeSlashSvg from '@/assets/eye-slash.svg'

type Props = TextInputProps & {
  errorMessage?: string
}

export function InputPassword({ className, ...rest}: Props) {
  const [isFocus, setIsFocus] = useState(false)
  const [isSecureText, setIsSecureText] = useState(true)

  function handleToggleTextSecure() {
    setIsSecureText((prevState) => !prevState)
  }

  return (
    <View className={twMerge('flex-row items-center justify-between w-full rounded-md border bg-white border-white', isFocus && 'border-neutral-500')}>
      <TextInput
        secureTextEntry={isSecureText}
        keyboardType="visible-password"
        autoCapitalize="none"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholderTextColor={nwColors.neutral[400]}
        className={
          twMerge(
            'flex-1 px-4 py-3 font-title text-base text-neutral-600',
            className,
          )
        }
        {...rest}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        className="rounded-full pr-2"
        onPress={handleToggleTextSecure}
      >
        {!isSecureText ? (
          <EyeSlashSvg height={20} fill={nwColors.neutral[500]} />
        ) : (
          <EyeSvg height={20} fill={nwColors.neutral[500]} />
        )}
      </TouchableOpacity>
    </View>
  )
}
