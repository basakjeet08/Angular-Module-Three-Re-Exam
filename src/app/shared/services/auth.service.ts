import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthResponse } from '../models/auth/AuthResponse';
import {
  FIREBASE_LOGIN_ENDPOINT,
  FIREBASE_REGISTER_ENDPOINT,
  USER_CREATE_ENDPOINT,
} from '../constants/url-constants';
import { switchMap, tap } from 'rxjs';
import { UserDto, UserRole } from '../models/users/UserDto';
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
  registerUser(user: { email: string; password: string; role: string }) {
    return this.http
      .post<AuthResponse>(FIREBASE_REGISTER_ENDPOINT, user)
      .pipe(switchMap((response) => this.createUser(response, user.role)));
  }

  // This function puts the user data in the firebase database
  createUser(authResponse: AuthResponse, role: string) {
    const id = authResponse.localId;
    const userRole = role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER;

    return this.http.put<UserDto>(
      USER_CREATE_ENDPOINT.replace(':id', id),
      new UserDto(id, authResponse.email, userRole, [], [])
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
