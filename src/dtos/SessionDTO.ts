import { UserDTO } from './UserDTO'

export type SessionDTO = {
  token: string
  refresh_token: string
  user: UserDTO
}
