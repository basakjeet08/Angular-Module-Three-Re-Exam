import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { UserDto, UserRole } from '../models/users/UserDto';
import { IntermediateOrder } from '../models/order/IntermediateOrder';
import {
  ADD_TO_CART_ENDPOINT,
  USER_CREATE_ENDPOINT,
  USER_FETCH_BY_ID_ENDPOINT,
} from '../constants/url-constants';
import { map } from 'rxjs';
import { mapFirebaseObject } from '../util/firebase-object-mapper';

@Injectable({ providedIn: 'root' })
export class UserService {
  // This is the user id for the current logged in user
  userId: string = '';

  // Injecting the required dependencies
  constructor(private http: HttpClient, profileService: ProfileService) {
    profileService.userSubject$.subscribe((user) => (this.userId = user?.id!));
  }

  // This function puts the user data in the firebase database
  createUser(user: UserDto) {
    // This is the new user object
    user = { ...user, role: UserRole.USER };

    return this.http.put<UserDto>(
      USER_CREATE_ENDPOINT.replace(':id', user.id),
      user
    );
  }

  // This function fetch the user
  fetchUserById(id: string) {
    return this.http
      .get<UserDto | null>(USER_FETCH_BY_ID_ENDPOINT.replace(':id', id))
      .pipe(map((response) => mapFirebaseObject(response, id)));
  }

  // This function updates the user
  updateUser(user: {
    id: string;
    email?: string;
    role?: UserRole;
    cart?: IntermediateOrder[];
    orderList?: string[];
  }) {
    return this.http
      .patch<UserDto | null>(ADD_TO_CART_ENDPOINT.replace(':id', user.id), user)
      .pipe(map((response) => mapFirebaseObject(response, this.userId)));
  }
}
