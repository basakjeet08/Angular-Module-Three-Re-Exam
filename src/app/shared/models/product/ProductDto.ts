export class ProductDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly amount: number,
    readonly pricePerItem: number
  ) {}
}
