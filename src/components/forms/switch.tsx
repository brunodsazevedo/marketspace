import { Text, View, Switch as RNSwitch, SwitchProps } from 'react-native'

import themeColors from '@/theme/colors'

type Props = SwitchProps & {}

export function Switch({ ...rest }: Props) {
  return (
    <View className="">
      <View className="flex-row">
        <RNSwitch
          trackColor={{false: themeColors.neutral[300], true: themeColors.blue[300]}}
          thumbColor={themeColors.neutral[100]}
          {...rest}
        />
      </View>
    </View>
  )
}
