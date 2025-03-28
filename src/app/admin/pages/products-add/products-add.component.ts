import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css'],
})
export class ProductsAddComponent {
  // These are the values for the card
  userInput = { id: '', name: '', amount: null, pricePerItem: null };

  // Injecting the necessary dependencies
  constructor(
    private productService: ProductService,
    private location: Location
  ) {}

  // This function is invoked when the user clicks on the add button
  onSubmitClick() {
    this.productService.createProduct(this.userInput).subscribe({
      // Success State
      next: () => this.location.back(),
    });
  }
}
