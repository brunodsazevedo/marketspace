import { useRef, useState } from 'react';
import { Dimensions, FlatList, ViewToken } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native'
import { twMerge } from 'tailwind-merge';

type ChangeImageProps = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

type Props = {
  data: {
    id: string | number
    uri: string
  }[]
}

export function ProductsSlideImages({ data }: Props) {
  const [imageIndex, setImageIndex] = useState(0)

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  })

  const { width } = Dimensions.get('window')

  return (
    <View className="">
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item, index }) => {
          return (
            <View className={`items-center justify-center h-64 w-[${width}]`}>
              <Image
                source={{ uri: item.uri }}
                resizeMode="cover"
                style={{
                  width,
                  height: '100%',
                }}
              />
            </View>
          )
        }}
      />

      <View className="absolute bottom-2 w-full px-1">
        <View className="flex-row items-center space-x-1">
          {data.length > 1 && data.map((item, index) => (
            <View
              key={item.id}
              className={
                twMerge(
                  'flex-1 h-[3px] rounded-full bg-neutral-100/50',
                  index <= imageIndex && 'bg-neutral-100',
                )
              }
            />
          ))}
        </View>
      </View>
    </View>
  )
}
