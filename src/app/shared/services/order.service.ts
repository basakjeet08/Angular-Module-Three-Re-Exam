import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs';
import { ProfileService } from './profile.service';
import {
  ORDER_CREATE_ENDPOINT,
  ORDER_FETCH_ALL_ENDPOINT,
} from '../constants/url-constants';
import { OrderDto, OrderStatus } from '../models/order/OrderDto';
import { UserService } from './user.service';
import { CartService } from './cart.service';
import { IntermediateOrder } from '../models/order/IntermediateOrder';
import { mapFirebaseListObject } from '../util/firebase-object-mapper';

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
    private userService: UserService,
    private cartService: CartService
  ) {
    profileService.userSubject$.subscribe((user) => (this.userId = user?.id!));
  }

  // This function takes the current user cart and adds it in the orders
  placeOrder() {
    return this.cartService.fetchCartDetails().pipe(
      // Posting the orders
      switchMap((cartItemList) => {
        let totalPrice = 0;

        // This is the list of product Ids with Amount
        const productListIds = cartItemList.map((item) => {
          totalPrice += item.amount * item.product.pricePerItem;
          return new IntermediateOrder(item.product.id, item.amount);
        });

        const order = new OrderDto(
          '',
          this.userId,
          productListIds,
          totalPrice,
          OrderStatus.PLACED
        );
        return this.http.post(ORDER_CREATE_ENDPOINT, order);
      }),

      // Updating the user cart
      switchMap(() =>
        this.userService.updateUser({
          id: this.userId,
          cart: [],
        })
      )
    );
  }

  // This function fetches all the orders
  fetchAllOrders() {
    return this.http
      .get<{ [key: string]: OrderDto }>(ORDER_FETCH_ALL_ENDPOINT)
      .pipe(map((response) => mapFirebaseListObject(response)));
  }

  // This function fetches the orders of the current user
  fetchOrderByCurrentUser() {
    return this.fetchAllOrders().pipe(
      map((orderDtoList) =>
        orderDtoList.filter((orderDto) => orderDto.userId === this.userId)
      )
    );
  }
}
