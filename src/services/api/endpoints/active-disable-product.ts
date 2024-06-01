import { api } from "@/services/api/api-config"

type Props = {
  productId: string,
  data: {
    is_active: boolean
  }
}

export async function activeDisableProduct({ productId, data }: Props) {
  await api.patch(`/products/${productId}`, data)
}
