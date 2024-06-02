import { api } from "@/services/api/api-config"

import { ProductDTO } from "@/dtos/product-dto"

type GetProductsProps = {
  params?: {
    is_new?: boolean
    accept_trade?: boolean
    payment_methods?: string[]
    query?: string
  }
}

export async function getProducts({ params }: GetProductsProps) {
  const response = await api.get<ProductDTO[]>('/products', {
    params
  })

  return response.data
}
