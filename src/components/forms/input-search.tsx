import { useState } from 'react'
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import nwColors from 'tailwindcss/colors'

import themeColors from '@/theme/colors'

import SearchSvg from '@/assets/magnifying-glass.svg'
import SlidersSvg from '@/assets/sliders.svg'

type Props = TextInputProps & {
  errorMessage?: string
  onFilters?: () => void
  onSearch?: () => void
}

export function InputSearch(
  {
    errorMessage,
    className,
    onFilters,
    onSearch,
    ...rest
  }: Props
) {
  const [isFocus, setIsFocus] = useState(false)

  const isInvalid = !!errorMessage

  return (
    <View>
      <View
        className={
          twMerge(
            'flex-row items-center justify-between w-full rounded-md border bg-white border-white',
            isFocus && 'border-neutral-500',
            isInvalid && 'border-red-500',
          )
        }
      >
        <TextInput
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

        <View className="flex-row items-center space-x-3">
          <TouchableOpacity
            activeOpacity={0.7}
            className="rounded-full"
            onPress={onSearch}
          >
            <SearchSvg
              height={20}
              stroke={themeColors.neutral[600]}
            />
          </TouchableOpacity>

          <View className="">
            <View className="h-5 w-0.5 bg-neutral-400" />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="rounded-full pr-2"
            onPress={onFilters}
          >
            <SlidersSvg
              height={20}
              stroke={themeColors.neutral[600]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isInvalid && (
        <Text className="font-body text-sm text-red-500">
          {errorMessage}
        </Text>
      )}
    </View>
  )
}
