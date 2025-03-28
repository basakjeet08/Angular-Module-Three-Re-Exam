import { IntermediateOrder } from './IntermediateOrder';

export class OrderDto {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly productList: IntermediateOrder[],
    readonly totalPrice: number
  ) {}
}
