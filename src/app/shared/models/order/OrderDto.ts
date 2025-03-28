import { IntermediateOrder } from './IntermediateOrder';

export enum OrderStatus {
  PLACED = 'PLACED',
  PROCESSING = 'PROCESSING',
  ON_THE_WAY = 'ON THE WAY',
  DELIVERED = 'DELIVERED',
}

export interface OrderDto {
  id: string;
  userId: string;
  productList: IntermediateOrder[];
  totalPrice: number;
  status: OrderStatus;
}
