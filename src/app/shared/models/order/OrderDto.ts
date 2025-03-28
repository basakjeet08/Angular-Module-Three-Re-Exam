import { IntermediateOrder } from './IntermediateOrder';

export enum OrderStatus {
  PLACED = 'PLACED',
  PROCESSING = 'PROCESSING',
  ON_THE_WAY = 'ON THE WAY',
  DELIVERED = 'DELIVERED',
}

export class OrderDto {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly productList: IntermediateOrder[],
    readonly totalPrice: number,
    readonly status: OrderStatus
  ) {}
}
