import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ProductDto } from 'src/app/shared/models/product/ProductDto';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  // These are the data for this component
  productList: ProductDto[] = [];

  // Injecting the necessary dependencies
  constructor(
    private productService: ProductService,
    private cartService: CartService,
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
            message: 'There are no products to show !!',
          });
        } else {
          this.toastService.showToast({
            type: 'success',
            message: 'Product data fetched successfully !!',
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

  // This function is invoked when the user clicks on the add to cart option
  onAddToCartClick(amount: number, productId: string) {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the Api
    this.cartService.updateCart({ productId, amount }).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Product Added to cart !!',
        });

        this.router.navigate(['../', 'cart'], { relativeTo: this.route });
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
