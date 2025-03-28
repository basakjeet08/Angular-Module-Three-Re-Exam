export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserDto {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly role: UserRole
  ) {}
}
