import { api } from "@/services/api/api-config"

import { ProductDTO } from "@/dtos/product-dto"

export async function getUserProducts() {
  const response = await api.get<ProductDTO[]>('/users/products')

  return response.data
}
