import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { ProfileService } from './profile.service';
import {
  ORDER_CREATE_ENDPOINT,
  USER_UPDATE_ENDPOINT,
} from '../constants/url-constants';
import { OrderDto } from '../models/order/OrderDto';
import { UserService } from './user.service';

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
    private userService: UserService
  ) {
    profileService.userSubject$.subscribe((user) => (this.userId = user?.id!));
  }

  // This function takes the current user cart and adds it in the orders
  placeOrder() {
    return this.userService.fetchUserById(this.userId).pipe(
      switchMap((user) => {
        const currentCart = user?.cart || [];
        let cost = 0;

        return this.http.post<OrderDto | null>(
          ORDER_CREATE_ENDPOINT,
          new OrderDto('', user!.id, currentCart, cost)
        );
      }),
      switchMap((orderDto) =>
        this.http.patch(USER_UPDATE_ENDPOINT.replace(':id', this.userId), {
          cart: [],
        })
      )
    );
  }
}
