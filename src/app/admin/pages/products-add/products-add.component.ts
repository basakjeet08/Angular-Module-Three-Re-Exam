import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from 'src/app/shared/models/product/ProductDto';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css'],
})
export class ProductsAddComponent implements OnInit {
  // These are the values for the card
  userInput = { id: '', name: '', amount: 0, pricePerItem: 0 };

  // This denotes if the current mode is in edit or add
  isEditMode = false;

  // Injecting the necessary dependencies
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // This function checks if the page is in edit mode or add mode
  ngOnInit(): void {
    this.userInput.id = this.route.snapshot.queryParams['id'];
    if (this.userInput.id) {
      this.isEditMode = true;
      this.fetchProductDetails();
    }
  }

  // This function fetches the product details for the given product
  fetchProductDetails() {
    this.productService.fetchProductById(this.userInput.id).subscribe({
      next: (product: ProductDto | null) => {
        if (!product) {
          alert('The provided Product Id is wrong');
          this.location.back();
        } else {
          this.userInput.name = product.name;
          this.userInput.amount = product.amount;
          this.userInput.pricePerItem = product.pricePerItem;
        }
      },
    });
  }

  // This function is invoked when the user clicks on the add button
  onSubmitClick() {
    const observable = this.isEditMode
      ? this.productService.updateProductById(this.userInput)
      : this.productService.createProduct(this.userInput);

    observable.subscribe({
      // Success State
      next: () => this.location.back(),
    });
  }
}
