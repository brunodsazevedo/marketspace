import { ReactNode, createContext, useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/button'
import { BottomSheetModal, ModalBottom } from '@/components/bottom-sheet'

import { api } from '@/services/api/api-config'
import { getUser } from '@/services/api/endpoints/getUser';

import { getAuthSessionStorage, removeAuthSessionStorage, saveAuthSessionStorage } from '@/storage/authSessionStorage';
import { storageUserRemove, storageUserSave } from '@/storage/userStorage';

import { UserDTO } from '@/dtos/UserDTO'
import { SessionDTO } from '@/dtos/SessionDTO'

type AuthContextDataProps = {
  user: UserDTO | null
  isAuthLoaded: boolean
  isAuthenticated: boolean
  onSignIn: (email: string, password: string) => Promise<void>
  onSignOut: () => Promise<void>
  onUpdateUserProfile: (userUpdated: UserDTO) => Promise<void>
  handleConfirmSignOut: () => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

type AuthSession = Omit<SessionDTO, 'user'>

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isSignOutLoading, setIsSignOutLoading] = useState(false)
  const [user, setUser] = useState<UserDTO | null>(null)
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)

  const modalConfirmSignOutRef = useRef<BottomSheetModal>(null)

  const isAuthenticated = !!user?.id

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, authSessions: AuthSession) {
    await storageUserSave(userData)
    await saveAuthSessionStorage(authSessions)
  }

  function handleConfirmSignOut() {
    modalConfirmSignOutRef.current?.present()
  }

  function handleCancelSignOut() {
    modalConfirmSignOutRef.current?.dismiss()
  }

  async function onSignIn(email: string, password: string) {
    const { data } = await api.post('/sessions', { email, password });

    if(data.user && data.token && data.refresh_token) {
      await storageUserAndTokenSave(data.user, { token: data.token, refresh_token: data.refresh_token });

      userAndTokenUpdate(data.user, data.token);
    }
  }

  async function onSignOut() {
    try {
      setIsSignOutLoading(true)

      delete api.defaults.headers.common['Authorization']
      setUser(null)
  
      await storageUserRemove()
      await removeAuthSessionStorage()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSignOutLoading(false)
      modalConfirmSignOutRef.current?.dismiss()
    }
  }

  async function onUpdateUserProfile(data: UserDTO) {
    setUser(data)
  }

  async function onLoadAuth() {
    try {
      const authSession = await getAuthSessionStorage()
      if(!authSession) {
        return
      }

      const { token } = authSession

      const userData = await getUser(token)

      userAndTokenUpdate(userData, token)
    } catch (error) {
      console.log(error)
    } finally {
      setIsAuthLoaded(true)
    }
  }

  useEffect(() => {
    onLoadAuth()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthLoaded,
      isAuthenticated,
      onSignIn,
      onSignOut,
      onUpdateUserProfile,
      handleConfirmSignOut,
    }}>
      { children }

      <ModalBottom
        modalBottomRef={modalConfirmSignOutRef}
        snapPoints={['30%', '30%']}
      >
        <SafeAreaView
          edges={['bottom']}
          className="flex-1 px-6 py-4"
        >
          <Text className="font-heading text-base text-center text-neutral-600">
            Deseja realmente sair?
          </Text>

          <View className="flex-1 justify-end space-y-2">
            <Button
              title="Sim, sair!"
              loading={isSignOutLoading}
              className="bg-red-500"
              onPress={onSignOut}
            />

            <Button
              variant="black"
              title="Cancelar"
              onPress={handleCancelSignOut}
            />
          </View>
        </SafeAreaView>
      </ModalBottom>
    </AuthContext.Provider>
  )
}
