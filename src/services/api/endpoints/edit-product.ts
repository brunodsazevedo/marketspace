import { api } from "@/services/api/api-config";

type EditProductProps = {
  data: {
    id: string
    name: string
    description: string
    is_new: boolean
    price: number
    accept_trade: boolean
    payment_methods: string[]
  }
}

export async function editProduct({ data }: EditProductProps) {
  const response = await api.put(`/products/${data.id}`, data)

  return response.data
}
