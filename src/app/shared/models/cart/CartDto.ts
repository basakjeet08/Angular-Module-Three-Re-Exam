import { ProductDto } from './../product/ProductDto';

export class CartDto {
  constructor(
    readonly productList: ProductDto[],
    readonly amountList: number[]
  ) {}
}
