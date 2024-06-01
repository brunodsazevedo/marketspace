import { api } from "@/services/api/api-config"

import { ProductDetailDTO } from "@/dtos/product-dto"

export async function getProductDetail(productId: string) {
  const response = await api.get<ProductDetailDTO>(`/products/${productId}`)

  return response.data
}
