import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ProductDto } from 'src/app/shared/models/product/ProductDto';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css'],
})
export class ProductsAddComponent implements OnInit {
  // These are the values for the card
  userInput: ProductDto = { id: '', name: '', amount: 0, pricePerItem: 0 };

  // This denotes if the current mode is in edit or add
  isEditMode = false;

  // Injecting the necessary dependencies
  constructor(
    private productService: ProductService,
    private toastService: ToastService,
    private loaderService: LoaderService,
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
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the Api
    this.productService.fetchProductById(this.userInput.id!).subscribe({
      // Success State
      next: (product: ProductDto | null) => {
        this.loaderService.endLoading();

        // If the product is there or not
        if (product) {
          this.toastService.showToast({
            type: 'success',
            message: 'Product data fetched successfully !!',
          });

          this.userInput = { ...product };
        } else {
          this.toastService.showToast({
            type: 'error',
            message: 'Provided product id is invalid !!',
          });

          this.location.back();
        }
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the add button
  onSubmitClick() {
    // Starting the loading state
    this.loaderService.startLoading();

    const observable = this.isEditMode
      ? this.productService.updateProductById(this.userInput)
      : this.productService.createProduct(this.userInput);

    // Calling the API
    observable.subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Product added in the database !!',
        });

        this.location.back();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
