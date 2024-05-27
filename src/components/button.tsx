import { ElementType, ReactNode } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { twJoin, twMerge } from 'tailwind-merge'
import nwColors from 'tailwindcss/colors'
import { SvgProps } from 'react-native-svg'
import { isLoading } from 'expo-font'
import { LoadingIndicator } from './loading-indicator'

type Props = TouchableOpacityProps & {
  variant?: 'primary' | 'secondary' | 'black'
  leftIcon?: ElementType<SvgProps>
  rightIcon?: ElementType
  title?: string
  loading?: boolean
  children?: ReactNode
}

export function Button(
  {
    variant = 'primary',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    title,
    loading = false,
    disabled,
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

  const textVariantClasses =  {
    primary: 'text-neutral-100',
    secondary: 'text-neutral-600',
    black: 'text-neutral-100',
  }

  const leftIconVariantClasses = {
    primary: nwColors.neutral[100],
    secondary: nwColors.neutral[600],
    black: nwColors.neutral[100],
  }

  const rightIconVariantClasses = {
    primary: nwColors.neutral[100],
    secondary: nwColors.neutral[600],
    black: nwColors.neutral[100],
  }

  const loadingVariantClass = {
    primary: nwColors.neutral[100],
    secondary: nwColors.neutral[600],
    black: nwColors.neutral[100],
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={loading || disabled}
      className={
        twMerge(
          `flex-row items-center justify-center p-3 space-x-2 rounded-md ${containerVariantClasses[variant]}`,
          className,
        )
      }
      {...rest}
    >
      {loading ? (
        <LoadingIndicator size="small" color={loadingVariantClass[variant]} />
      ) : (
        <>
          {LeftIcon && (
            <LeftIcon height={20} width={20} fill={leftIconVariantClasses[variant]} />
          )}
    
          {title && (
            <View className="flex-1">
              <Text className={twJoin('font-heading text-base text-center', textVariantClasses[variant])}>
                {title}
              </Text>
            </View>
          )}
    
          {RightIcon && (
            <RightIcon height={20} width={20} fill={rightIconVariantClasses[variant]} />
          )}
    
          {children}
        </>
      )}
    </TouchableOpacity>
  )
}
