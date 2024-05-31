import { api } from "@/services/api/api-config"

import { CreateProductsResponseDTO } from "@/dtos/create-products-response-dto"

type CreateProducts = {
  data: {
    name: string
    description: string
    is_new: boolean
    price: number
    accept_trade: boolean
    payment_methods: string[]
  }
}

export async function createProducts({data}: CreateProducts) {
  const response = await api.post<CreateProductsResponseDTO>('/products', data)

  return response.data
}
