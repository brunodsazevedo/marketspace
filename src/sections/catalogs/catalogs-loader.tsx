import { Text, View } from 'react-native'

import { Skeleton } from '@/components/skeleton'

export function CatalogsLoader() {
  return (
    <View className="flex-1 px-6 space-y-8">
      <View className="space-y-3">
        <View>
          <Skeleton
            styles={{
              height: 14,
              width: 200,
              borderRadius: 7,
            }}
          />
        </View>

        <View>
          <Skeleton
            styles={{
              height: 96,
              width: '100%',
              borderRadius: 6,
            }}
          />
        </View>
      </View>

      <View className="space-y-3">
        <View>
          <Skeleton
            styles={{
              height: 14,
              width: 200,
              borderRadius: 7,
            }}
          />
        </View>

        <View>
          <Skeleton
            styles={{
              height: 48,
              width: '100%',
              borderRadius: 6,
            }}
          />
        </View>
      </View>

      <View className="flex-row flex-wrap justify-between">
        <View>
          <Skeleton
            styles={{
              height: 112,
              width: 162,
              borderRadius: 7,
              marginBottom: 12,
            }}
          />
        </View>

        <View>
        <Skeleton
            styles={{
              height: 112,
              width: 162,
              borderRadius: 7,
              marginBottom: 12,
            }}
          />
        </View>

        <View>
          <Skeleton
            styles={{
              height: 112,
              width: 162,
              borderRadius: 7,
              marginBottom: 12,
            }}
          />
        </View>

        <View>
          <Skeleton
            styles={{
              height: 112,
              width: 162,
              borderRadius: 7,
              marginBottom: 12,
            }}
          />
        </View>

        <View>
          <Skeleton
            styles={{
              height: 112,
              width: 162,
              borderRadius: 7,
              marginBottom: 12,
            }}
          />
        </View>

        <View>
          <Skeleton
            styles={{
              height: 112,
              width: 162,
              borderRadius: 7,
              marginBottom: 12,
            }}
          />
        </View>

        <View>
          <Skeleton
            styles={{
              height: 112,
              width: 162,
              borderRadius: 7,
              marginBottom: 12,
            }}
          />
        </View>

        <View>
          <Skeleton
            styles={{
              height: 112,
              width: 162,
              borderRadius: 7,
              marginBottom: 12,
            }}
          />
        </View>
      </View>
    </View>
  )
}
