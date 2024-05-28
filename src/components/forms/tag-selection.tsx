import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

import CloseCircleSvg from '@/assets/x-circle.svg'

type Props = {
  label: string
  selected?: boolean
  onChange?: () => void
}

export function TagSelection({ label, selected }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View
        className={
          twMerge(
            'flex-row items-center px-4 py-1.5 rounded-full space-x-1.5 bg-neutral-200',
            selected && 'pr-1.5 bg-blue-300',
          )
        }
      >
        <View>
          <Text
            className={
              twMerge(
                'font-heading text-xs uppercase text-neutral-500',
                selected && 'text-white'
              )
            }
          >
            {label}
          </Text>
        </View>

        {selected && (
          <CloseCircleSvg height={16} width={16} fill="white" />
        )}
      </View>
    </TouchableOpacity>
    // <TouchableOpacity
    //   activeOpacity={0.7}
    //   className={
    //     twMerge(
    //       'flex-row items-center justify-center px-6 py-1.5 space-x-1.5 rounded-full bg-neutral-200',
    //       selected && 'bg-blue-500'
    //     )
    //   }
    // >
    //   <Text
    //     className={
    //       twMerge(
    //         'font-heading text-xs uppercase text-neutral-500',
    //         selected && 'text-white'
    //       )
    //     }
    //   >
    //     {label}
    //   </Text>

    //   {selected && (
    //     <CloseCircleSvg height={16} fill="white" />
    //   )}
    // </TouchableOpacity>
  )
}
