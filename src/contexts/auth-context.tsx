import { ReactNode, createContext, useEffect, useState } from 'react'

import { api } from '@/services/api/api-config'

import { getAuthSessionStorage, removeAuthSessionStorage, saveAuthSessionStorage } from '@/storage/authSessionStorage';
import { storageUserRemove, storageUserSave } from '@/storage/userStorage';

import { UserDTO } from '@/dtos/UserDTO'
import { SessionDTO } from '@/dtos/SessionDTO'
import { getUser } from '@/services/api/endpoints/getUser';

type AuthContextDataProps = {
  user: UserDTO | null
  isAuthLoaded: boolean
  isAuthenticated: boolean
  onSignIn: (email: string, password: string) => Promise<void>
  onSignOut: () => Promise<void>
  onUpdateUserProfile: (userUpdated: UserDTO) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

type AuthSession = Omit<SessionDTO, 'user'>

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null)
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)

  const isAuthenticated = !!user?.id

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, authSessions: AuthSession) {
    await storageUserSave(userData)
    await saveAuthSessionStorage(authSessions)
  }

  async function onSignIn(email: string, password: string) {
    const { data } = await api.post('/sessions', { email, password });

    if(data.user && data.token && data.refresh_token) {
      await storageUserAndTokenSave(data.user, { token: data.token, refresh_token: data.refresh_token });

      userAndTokenUpdate(data.user, data.token);
    }
  }

  async function onSignOut() {
    delete api.defaults.headers.common['Authorization']
    setUser(null)

    await storageUserRemove()
    await removeAuthSessionStorage()
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
    }}>
      { children }
    </AuthContext.Provider>
  )
}
