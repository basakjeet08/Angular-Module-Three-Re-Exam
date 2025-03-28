import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap } from 'rxjs';
import { ProfileService } from './profile.service';
import { UserDto } from '../models/users/UserDto';
import {
  ADD_TO_CART_ENDPOINT,
  USER_FETCH_BY_ID_ENDPOINT,
} from '../constants/url-constants';

@Injectable({ providedIn: 'root' })
export class CartService {
  // This is the user id for the current logged in user
  userId: string = '';

  // Injecting the required dependencies
  constructor(private http: HttpClient, profileService: ProfileService) {
    profileService.userSubject$.subscribe((user) => (this.userId = user?.id!));
  }

  // This function fetches the user from firebase
  fetchUser() {
    return this.http.get<UserDto>(
      USER_FETCH_BY_ID_ENDPOINT.replace(':id', this.userId)
    );
  }

  // This function adds in the user cart
  updateCart(newElement: { productId: string; amount: number }) {
    return this.fetchUser().pipe(
      switchMap((user) => {
        // Adding the new element to the cart
        const currentCart = user.cart || [];
        currentCart.push(newElement);

        return this.http.patch<UserDto>(
          ADD_TO_CART_ENDPOINT.replace(':id', user.id),
          { ...user, cart: currentCart }
        );
      })
    );
  }
}
