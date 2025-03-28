import { Injectable } from '@angular/core';

import { switchMap, map } from 'rxjs';
import { ProfileService } from './profile.service';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { CartItemDto } from '../models/cart/CartItemDto';
import { IntermediateOrder } from '../models/order/IntermediateOrder';
import { ProductDto } from '../models/product/ProductDto';

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
  updateCart(newElement: IntermediateOrder) {
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
            return item.productId === newElement.productId
              ? { ...item, amount: item.amount + newElement.amount }
              : { ...item };
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
            map((productList: ProductDto[], index: number) =>
              productList.map((product: ProductDto) => {
                // Cart Item Dto
                const cartItem: CartItemDto = {
                  product: product,
                  amount: cartProduct[index].amount,
                };

                return cartItem;
              })
            )
          );
      })
    );
  }
}
