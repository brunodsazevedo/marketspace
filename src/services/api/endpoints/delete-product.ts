import { api } from "@/services/api/api-config";

export async function deleteProduct(productId: string) {
  await api.delete(`/products/${productId}`)
}
