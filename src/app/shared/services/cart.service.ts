import { Injectable } from '@angular/core';

import { switchMap, map } from 'rxjs';
import { ProfileService } from './profile.service';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { CartItemDto } from '../models/cart/CartItemDto';

@Injectable({ providedIn: 'root' })
export class CartService {
  // This is the user id for the current logged in user
  userId: string = '';

  // Injecting the required dependencies
  constructor(
    profileService: ProfileService,
    private productService: ProductService,
    private userService: UserService
  ) {
    profileService.userSubject$.subscribe((user) => (this.userId = user?.id!));
  }

  // This function adds in the user cart
  updateCart(newElement: { productId: string; amount: number }) {
    return this.userService.fetchUserById(this.userId).pipe(
      switchMap((user) => {
        // Adding the new element to the cart
        let currentCart = user?.cart || [];

        // If Element already present
        const intermediate = currentCart.find(
          (item) => item.productId === newElement.productId
        );

        if (intermediate) {
          currentCart = currentCart.map((item) => {
            if (item.productId === newElement.productId) {
              return { ...item, amount: item.amount + newElement.amount };
            } else {
              return { ...item };
            }
          });
        } else {
          currentCart.push(newElement);
        }

        return this.userService.updateUser({ ...user!, cart: currentCart });
      })
    );
  }

  // This function fetches the current user cart details along with Product Details
  fetchCartDetails() {
    return this.userService.fetchUserById(this.userId).pipe(
      switchMap((userData) => {
        const userCart = userData?.cart || [];
        const cartProduct = userCart || [];

        return this.productService
          .fetchProductByIds(cartProduct.map((item) => item.productId)!)
          .pipe(
            map((productList, index) =>
              productList.map(
                (product) => new CartItemDto(product, cartProduct[index].amount)
              )
            )
          );
      })
    );
  }
}
