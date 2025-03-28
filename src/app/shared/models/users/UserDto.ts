import { IntermediateOrder } from '../order/IntermediateOrder';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserDto {
  id: string;
  email?: string;
  role?: UserRole;

  // One to One Relationship with cart
  cart?: IntermediateOrder[];
  orderList?: string[];
}
