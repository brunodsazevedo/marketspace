/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import {
  BottomSheetBackdropProps,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const Backdrop = ({ style }: BottomSheetBackdropProps) => {
  const { dismissAll } = useBottomSheetModal()

  const backdropOpacity = useSharedValue(0)

  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }))

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: '#000',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  )

  useEffect(() => {
    backdropOpacity.value = withTiming(0.5, { duration: 200 })
  }, [])

  return (
    <TouchableWithoutFeedback onPress={dismissAll}>
      <Animated.View style={containerStyle} />
    </TouchableWithoutFeedback>
  )
}

export { Backdrop }
