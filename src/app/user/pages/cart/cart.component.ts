import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Fetching the current user cart details
  ngOnInit(): void {
    this.cartService.fetchCartDetails();

    this.cartService.fetchCartDetails().subscribe({
      next: (cartItems) => (this.cartItems = cartItems),
    });
  }

  // This function is invoked when the place order button is clicked
  onPlaceOrderClick() {
    this.orderService.placeOrder().subscribe({
      // Success State
      next: () => {
        this.router.navigate(['../', 'orders'], { relativeTo: this.route });
      },
    });
  }
}
