import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE } from './storageConfig'

type StorageAuthSessionProps = {
  token: string
  refresh_token: string
}

export async function saveAuthSessionStorage(data: StorageAuthSessionProps) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify(data))
}

export async function getAuthSessionStorage() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  const authSession: StorageAuthSessionProps = response ? JSON.parse(response) : {}

  return authSession
}

export async function removeAuthSessionStorage() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
