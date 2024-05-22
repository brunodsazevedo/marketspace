import { ElementType, ReactNode } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { twJoin, twMerge } from 'tailwind-merge'
import nwColors from 'tailwindcss/colors'
import { SvgProps } from 'react-native-svg'

type Props = TouchableOpacityProps & {
  variant?: 'primary' | 'secondary' | 'black'
  icon?: ElementType<SvgProps>
  children?: ReactNode
}

export function IconButton(
  {
    variant = 'primary',
    icon: Icon,
    className,
    children,
    ...rest
  }: Props
) {
  const containerVariantClasses =  {
    primary: 'bg-blue-300',
    secondary: 'bg-neutral-300',
    black: 'bg-neutral-700',
  }

  const iconVariantClasses = {
    primary: nwColors.neutral[100],
    secondary: nwColors.neutral[600],
    black: nwColors.neutral[100],
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={
        twMerge(
          `flex-row items-center justify-center p-3 space-x-2 rounded-md ${containerVariantClasses[variant]}`,
          className,
        )
      }
      {...rest}
    >
      {Icon && (
        <Icon height={20} width={20} fill={iconVariantClasses[variant]} />
      )}

      {children}
    </TouchableOpacity>
  )
}
