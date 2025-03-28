import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  // Injecting the necessary dependencies
  constructor(private productService: ProductService) {}

  // Initial Api calls are done
  ngOnInit(): void {
    this.fetchProducts();
  }

  // This function Fetches the products
  fetchProducts() {
    this.productService.fetchAllProducts().subscribe({
      next: (data) => console.log(data),
    });
  }
}
