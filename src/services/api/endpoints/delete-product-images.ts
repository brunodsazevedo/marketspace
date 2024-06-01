import { api } from "@/services/api/api-config";

type Props = {
  data: {
    productImagesIds: string[]
  }
}

export async function deleteProductImages({ data }: Props) {
  await api.delete('/products/images', {
    data,
  })
}
