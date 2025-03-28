import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDto } from '../../models/product/ProductDto';
import { ProfileService } from '../../services/profile.service';
import { UserRole } from '../../models/users/UserDto';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  // These are the value for the component
  @Input('product') product!: ProductDto;
  @Output('onEditClick') editEmitter = new EventEmitter<string>();
  @Output('onAddToCartClick') cartEmitter = new EventEmitter<number>();

  isAdmin = false;
  userAmount = 0;

  // Injecting the necessary dependencies
  constructor(private profileService: ProfileService) {
    this.isAdmin = this.profileService.getUser()?.role === UserRole.ADMIN;
  }

  // This function is invoked when the user clicks on the edit button
  onEditClick() {
    this.editEmitter.emit(this.product.id);
  }

  // This function in invoked when the user clicks on the + button
  onIncreaseClick() {
    if (this.userAmount < this.product.amount!) {
      this.userAmount++;
    }
  }

  // This function in invoked when the user clicks on the + button
  onDecreaseClick() {
    if (this.userAmount > 0) {
      this.userAmount--;
    }
  }

  // This function in invoked when the user clicks on the Add to Cart button
  onAddToCartClick() {
    this.cartEmitter.emit(this.userAmount);
  }
}
