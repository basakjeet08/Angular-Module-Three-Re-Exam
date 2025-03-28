import { Component } from '@angular/core';
import { ProductDto } from 'src/app/shared/models/product/ProductDto';
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
  constructor(private productService: ProductService) {}

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
}
