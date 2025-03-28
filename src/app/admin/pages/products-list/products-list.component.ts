import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ProductDto } from 'src/app/shared/models/product/ProductDto';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  // These are the data for this component
  productList: ProductDto[] = [];

  // Injecting the necessary dependencies
  constructor(
    private productService: ProductService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Initial Api calls are done
  ngOnInit(): void {
    this.fetchProducts();
  }

  // This function Fetches the products
  fetchProducts() {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.productService.fetchAllProducts().subscribe({
      // Success State
      next: (productList) => {
        this.loaderService.endLoading();
        this.productList = productList;

        if (productList.length === 0) {
          this.toastService.showToast({
            type: 'info',
            message: 'There are no products available right now !!',
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

  // This function is invoked when the user clicks on the edit button
  onEditClick(id: string) {
    this.router.navigate(['../', 'product-add'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }

  // This function is invoked when the user clicks on the increase product button
  onCounterButtonClick(amount: number, product: ProductDto) {
    // Starting the Loading State
    this.loaderService.startLoading();
    product.amount! += amount;

    // Calling the Api
    this.productService.updateProductById(product).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Product updates successfully !!',
        });

        this.fetchProducts();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the delete button
  onDeleteClick(productId: string) {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the Api
    this.productService.deleteById(productId).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Product deleted successfully !!',
        });

        this.fetchProducts();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
