import { ProductDto } from '../product/ProductDto';

export interface CartItemDto {
  product: ProductDto;
  amount: number;
}
