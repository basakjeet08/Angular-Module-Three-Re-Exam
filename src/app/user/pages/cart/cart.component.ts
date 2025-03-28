import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { CartItemDto } from 'src/app/shared/models/cart/CartItemDto';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // This is the values for this component
  cartItems: CartItemDto[] = [];

  // Injecting the necessary dependencies
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Fetching the current user cart details
  ngOnInit(): void {
    this.fetchCartDetails();
  }

  // This function fetches the cart details
  fetchCartDetails() {
    // Stating the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.cartService.fetchCartDetails().subscribe({
      // Success State
      next: (cartItems) => {
        this.loaderService.endLoading();
        this.cartItems = cartItems;

        if (cartItems.length === 0) {
          this.toastService.showToast({
            type: 'info',
            message: 'You have no products inside the cart !!',
          });
        } else {
          this.toastService.showToast({
            type: 'success',
            message: 'Cart details fetched successfully !!',
          });
        }
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the place order button is clicked
  onPlaceOrderClick() {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the api
    this.orderService.placeOrder().subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Order placed successfully !!',
        });

        this.router.navigate(['../', 'orders'], { relativeTo: this.route });
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
