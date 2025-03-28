import { Component, OnInit } from '@angular/core';
import { CartDto } from 'src/app/shared/models/cart/CartDto';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // This is the values for this component
  cartDto: CartDto = new CartDto([], []);

  // Injecting the necessary dependencies
  constructor(private cartService: CartService) {}

  // Fetching the current user cart details
  ngOnInit(): void {
    this.cartService.fetchCartDetails();

    this.cartService.fetchCartDetails().subscribe({
      next: (cartDto) => (this.cartDto = cartDto),
    });
  }
}
