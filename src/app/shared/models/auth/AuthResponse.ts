export class AuthResponse {
  constructor(
    readonly idToken: string,
    readonly email: string,
    readonly localId: string
  ) {}
}
