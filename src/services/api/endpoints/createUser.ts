import { api } from '@/services/api/api-config'

type CreateUserProps = {
  data: FormData
}

export async function createUser({ data }: CreateUserProps) {
  await api.post('/users', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
