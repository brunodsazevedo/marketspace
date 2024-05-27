import { useEffect } from "react"
import { Stack, Redirect } from "expo-router"

import { useAuth } from "@/hooks/use-auth"

export default function AppLayout() {
  const { isAuthenticated } = useAuth()

  if(!isAuthenticated) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  )
}
