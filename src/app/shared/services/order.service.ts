import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { ProfileService } from './profile.service';
import { ProductService } from './product.service';
import { UserDto } from '../models/users/UserDto';
import {
  ORDER_CREATE_ENDPOINT,
  USER_FETCH_BY_ID_ENDPOINT,
} from '../constants/url-constants';
import { OrderDto } from '../models/order/OrderDto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // This is the user id for the current logged in user
  userId: string = '';

  // Injecting the required dependencies
  constructor(
    private http: HttpClient,
    profileService: ProfileService,
    private productService: ProductService
  ) {
    profileService.userSubject$.subscribe((user) => (this.userId = user?.id!));
  }

  // This function fetches the user from firebase
  fetchUser() {
    return this.http.get<UserDto>(
      USER_FETCH_BY_ID_ENDPOINT.replace(':id', this.userId)
    );
  }

  // This function takes the current user cart and adds it in the orders
  placeOrder() {
    return this.fetchUser().pipe(
      switchMap((user) => {
        const currentCart = user.cart;
        let cost = 0;

        user.cart.forEach((intermediateOrder) =>
          this.productService
            .fetchProductById(intermediateOrder.productId)
            .subscribe({
              next: (productDto) => {
                cost = +productDto?.pricePerItem! * intermediateOrder.amount;
              },
            })
        );

        return this.http.post(
          ORDER_CREATE_ENDPOINT,
          new OrderDto('', user.id, currentCart, cost)
        );
      })
    );
  }
}
