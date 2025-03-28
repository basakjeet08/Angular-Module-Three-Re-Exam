import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, map } from 'rxjs';
import { ProfileService } from './profile.service';
import { UserDto } from '../models/users/UserDto';
import { USER_FETCH_BY_ID_ENDPOINT } from '../constants/url-constants';
import { ProductService } from './product.service';
import { CartDto } from '../models/cart/CartDto';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  // This is the user id for the current logged in user
  userId: string = '';

  // Injecting the required dependencies
  constructor(
    private http: HttpClient,
    profileService: ProfileService,
    private productService: ProductService,
    private userService: UserService
  ) {
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

        return this.userService.updateUser({ ...user, cart: currentCart });
      })
    );
  }

  // This function fetches the current user cart details along with Product Details
  fetchCartDetails() {
    return this.fetchUser().pipe(
      switchMap((userData) => {
        const cartProducts = userData.cart.map((item) => item.productId);
        return this.productService.fetchProductByIds(cartProducts).pipe(
          map(
            (productList) =>
              new CartDto(
                productList,
                userData.cart.map((item) => item.amount)
              )
          )
        );
      })
    );
  }
}
