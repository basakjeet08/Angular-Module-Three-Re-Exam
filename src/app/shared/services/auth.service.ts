import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthResponse } from '../models/auth/AuthResponse';
import {
  FIREBASE_LOGIN_ENDPOINT,
  FIREBASE_REGISTER_ENDPOINT,
  USER_CREATE_ENDPOINT,
  USER_FETCH_BY_ID_ENDPOINT,
} from '../constants/url-constants';
import { switchMap, tap } from 'rxjs';
import { UserDto } from '../models/users/UserDto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Injecting the required dependencies
  constructor(
    private http: HttpClient,
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

    return this.http.put<UserDto>(USER_CREATE_ENDPOINT.replace(':id', id), {
      id: id,
      email: authResponse.email,
      role: role,
    });
  }

  // This function does the login request
  loginUser(user: { email: string; password: string }) {
    return this.http.post<AuthResponse>(FIREBASE_LOGIN_ENDPOINT, user).pipe(
      switchMap((response) => this.fetchUser(response)),
      tap((userData: UserDto) => this.profileService.setUserToLocal(userData))
    );
  }

  // This function stores the user in the local storage
  fetchUser(authResponse: AuthResponse) {
    return this.http.get<UserDto>(
      USER_FETCH_BY_ID_ENDPOINT.replace(':id', authResponse.localId)
    );
  }
}
