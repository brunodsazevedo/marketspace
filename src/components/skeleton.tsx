import { ReactNode, useEffect, useRef } from 'react'
import { Animated, ViewStyle } from 'react-native'

type Props = {
  styles?: ViewStyle
  isLoading?: boolean
  children?: ReactNode
}

export function Skeleton({ styles, isLoading = true, children }: Props) {
  const opacity = useRef(new Animated.Value(0.3))

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),

        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ]),
    ).start()
  }, [opacity])

  if (!isLoading && children) {
    return children
  }

  return (
    <Animated.View
      style={[{ opacity: opacity.current }, styles]}
      className="bg-gray-300"
    ></Animated.View>
  )
}