import { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import {
  ModalBottom,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@/components/bottom-sheet'

import { Option, OptionProps } from './option'

import CaretDownIcon from '@/assets/caret-down.svg'

type Props = {
  options: OptionProps[]
  value?: string
  onChange?: (event: string) => void
}

export function Select({ options, value, onChange }: Props) {
  const [selectOptions, setSelectOptions] = useState<OptionProps[]>([])

  const modalOptionsSelectRef = useRef<BottomSheetModal>(null)

  const optionSelected = selectOptions.find((item) => item.selected)

  function handleShowModalOptions() {
    modalOptionsSelectRef.current?.present()
  }

  function handleSelectOption(valueOption: string) {
    modalOptionsSelectRef.current?.dismiss()

    if (onChange) {
      onChange(valueOption)
    }

    const selectOptionsUpdated = selectOptions.map((item) => {
      if (item.value === valueOption) {
        return {
          ...item,
          selected: true,
        }
      }

      return {
        ...item,
        selected: false,
      }
    })

    setSelectOptions(selectOptionsUpdated)
  }

  useEffect(() => {
    if (options.length === 0) {
      return
    }

    if (value) {
      const optionsUpdated = options.map((item) => ({
        ...item,
        selected: item.value === value,
      }))
      setSelectOptions(optionsUpdated)

      return
    }

    setSelectOptions(options)
  }, [options, value])

  return (
    <View className="">
      <TouchableOpacity
        activeOpacity={1}
        className=""
        onPress={handleShowModalOptions}
      >
        <View className="flex-row items-center h-9 w-full rounded-md px-3 py-2 space-x-2 border border-neutral-300">
          <View className="">
            {optionSelected && optionSelected.value && (
              <Text
                numberOfLines={1}
                className="font-body text-sm text-neutral-600"
              >
                {optionSelected.label}
              </Text>
            )}
          </View>

          <CaretDownIcon height={18} />
        </View>
      </TouchableOpacity>

      <ModalBottom
        modalBottomRef={modalOptionsSelectRef}
        snapPoints={['90%', '90%']}
      >
        <View className="flex-1">
          <BottomSheetScrollView
            contentContainerStyle={{ paddingBottom: 72 }}
            className="px-6"
          >
            {options.map((option) => (
              <Option
                key={option.value}
                data={option}
                onPress={() => handleSelectOption(option.value)}
              />
            ))}
          </BottomSheetScrollView>
        </View>
      </ModalBottom>
    </View>
  )
}
