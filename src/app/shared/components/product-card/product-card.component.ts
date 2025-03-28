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

  editAccess = false;

  // Injecting the necessary dependencies
  constructor(private profileService: ProfileService) {
    this.editAccess = this.profileService.getUser()?.role === UserRole.ADMIN;
  }

  // This function is invoked when the user clicks on the edit button
  onEditClick() {
    this.editEmitter.emit(this.product.id);
  }
}
