import { IntermediateOrder } from '../order/IntermediateOrder';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserDto {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly role: UserRole,

    // One to One Relationship with cart
    readonly cart: IntermediateOrder[],
    readonly orderList: string[]
  ) {}
}
