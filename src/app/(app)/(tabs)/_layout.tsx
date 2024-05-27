import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="catalogs"
        // options={}
      />

      <Tabs.Screen
        name="my-ads"
        // options={}
      />
    </Tabs>
  )
}
