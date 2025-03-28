import { ProductDto } from '../product/ProductDto';

export class CartItemDto {
  constructor(readonly product: ProductDto, readonly amount: number) {}
}
