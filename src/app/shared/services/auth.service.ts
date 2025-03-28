import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthResponse } from '../models/auth/AuthResponse';
import {
  FIREBASE_LOGIN_ENDPOINT,
  FIREBASE_REGISTER_ENDPOINT,
} from '../constants/url-constants';
import { switchMap, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Injecting the required dependencies
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private profileService: ProfileService
  ) {}

  // This funciton registers the user
  registerUser(user: { email: string; password: string }) {
    return this.http.post<AuthResponse>(FIREBASE_REGISTER_ENDPOINT, user).pipe(
      switchMap((response) =>
        this.userService.createUser({
          id: response.localId,
          email: response.email,
        })
      )
    );
  }

  // This function does the login request
  loginUser(user: { email: string; password: string }) {
    return this.http.post<AuthResponse>(FIREBASE_LOGIN_ENDPOINT, user).pipe(
      switchMap((response) => this.userService.fetchUserById(response.localId)),
      tap((userData) => this.profileService.setUserToLocal(userData!))
    );
  }
}
