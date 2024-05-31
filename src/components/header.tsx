import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { IconButton } from '@/components/icon-button'

import themeColors from '@/theme/colors'

import ArrowLeftSvg from '@/assets/arrow-left.svg'

type Props = {
  title: string
  onBack: () => void
}

export function Header({ title, onBack }: Props) {
  return (
    <SafeAreaView
      edges={['top']}
      className="flex-row items-center p-6"
    >
      <IconButton
        icon={ArrowLeftSvg}
        iconColor={themeColors.neutral[700]}
        iconSize={24}
        className="rounded-full p-0 bg-transparent"
        onPress={onBack}
      />

      <View className="flex-1 items-center justify-center pr-8">
        <Text className="font-heading text-center text-xl text-neutral-700">
          {title}
        </Text>
      </View>
    </SafeAreaView>
  )
}
