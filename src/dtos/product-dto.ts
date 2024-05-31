type PaymentMethod = {
  key: string;
  name: string;
}

type ProductImage = {
  path: string;
  id: string;
}

export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  product_images: ProductImage[];
  payment_methods: PaymentMethod[];
}
