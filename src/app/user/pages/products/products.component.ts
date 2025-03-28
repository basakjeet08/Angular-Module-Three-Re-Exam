import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Initial Api calls are done
  ngOnInit(): void {
    this.fetchProducts();
  }

  // This function Fetches the products
  fetchProducts() {
    this.productService.fetchAllProducts().subscribe({
      next: (productList) => (this.productList = productList),
    });
  }

  // This function is invoked when the user clicks on the add to cart option
  onAddToCartClick(amount: number, id: string) {
    this.cartService.updateCart({ productId: id, amount: amount }).subscribe({
      // Success State
      next: () =>
        this.router.navigate(['../', 'cart'], { relativeTo: this.route }),
    });
  }
}
