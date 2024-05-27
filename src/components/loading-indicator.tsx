import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { styled } from 'nativewind'

export function LoadingIndicator(props: ActivityIndicatorProps) {
  const ActivityIndicatorStyled = styled(ActivityIndicator)

  return <ActivityIndicatorStyled {...props} />
}
