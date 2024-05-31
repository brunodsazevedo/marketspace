import { api } from "@/services/api/api-config"

import { AddProductsImageResponseDTO } from "@/dtos/add-products-image-response-dto"

export async function addProductsImage(data: FormData) {
  const response = await api.post<AddProductsImageResponseDTO>('/products/images', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}
