import { AxiosRequestConfig } from "axios";

import { api } from "@/services/api/api-config"

import { UserDTO } from "@/dtos/UserDTO";

export async function getUser(token?: string) {
  const config: AxiosRequestConfig = {}

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await api.get<UserDTO>('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  return response.data
}
