/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { twMerge } from 'tailwind-merge'

type Props = {
  label?: string
  className?: string
  initialState?: 'checked' | 'unchecked'
  checked?: boolean
  disabled?: boolean
  value?: boolean | string
  onChange?: (value: boolean | string | undefined) => void
  onPress?: () => void
}

export function CheckBox({
  label,
  initialState = 'unchecked',
  className,
  checked = false,
  disabled = false,
  value,
  onChange,
  onPress,
}: Props) {
  const [isSelected, setIsSelected] = useState<boolean | string | undefined>(false)

  function handleToggleCheckBox() {
    if(onPress) {
      onPress()
      return
    }
    
    setIsSelected((prevState) => {
      if (typeof prevState === 'string') {
        if (prevState.length === 0) {
          return value
        }

        return ''
      }

      return !prevState
    })

    if (onChange) {
      onChange(isSelected)
    }
  }

  useEffect(() => {
    if (!onChange) {
      return
    }

    onChange(isSelected)
  }, [isSelected, onChange])

  useEffect(() => {
    if (!value) {
      return
    }

    if (initialState === 'unchecked') {
      setIsSelected(typeof value === 'string' ? '' : false)
      return
    }

    setIsSelected(value)
  }, [initialState])

  return (
    <TouchableOpacity
      className="flex-row items-center space-x-2"
      onPress={handleToggleCheckBox}
    >
      <View
        className={
          twMerge(
            'items-center justify-center h-5 w-5 border-2 border-neutral-400',
            (isSelected || checked) && 'border-blue-300 bg-blue-300',
          )
        }
      >
        <View>
          {(checked || isSelected) && (
            <Feather name="check" size={16} color="white" />
          )}
        </View>
      </View>

      <Text className="font-body text-base text-neutral-600">
        {label}
      </Text>
    </TouchableOpacity>
    // <TouchableOpacity
    //   disabled={disabled}
    //   className={twMerge(
    //     `items-center justify-center h-5 w-5 border-2 border-neutral-400  ${
    //       (isSelected || checked) && 'border-blue-300 bg-blue-300'
    //     }`,
    //     className,
    //   )}
    //   onPress={handleToggleCheckBox}
    // >
    //   <View>
    //     {(checked || isSelected) && (
    //       <Feather name="check" size={16} color="white" />
    //     )}
    //   </View>
    // </TouchableOpacity>
  )
}
