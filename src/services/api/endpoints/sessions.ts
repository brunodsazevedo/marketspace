import { api } from '@/services/api/api-config'

import { SessionDTO } from '@/dtos/SessionDTO'

type SessionsProps = {
  data: {
    email: string
    password: string
  }
}

export async function sessions({ data }: SessionsProps) {
  const response = await api.post<SessionDTO>('/sessions', data)

  return response.data
}
