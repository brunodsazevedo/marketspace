import { api } from '@/services/api/api-config'

type SessionsRefreshResponse = {
  token: string
}

export async function sessionsRefresh(token: string) {
  const response = await api.post<SessionsRefreshResponse>('/sessions/refresh-token', { token })

  return response.data
}
