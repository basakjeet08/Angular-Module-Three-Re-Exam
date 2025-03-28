import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  // This function is invoked when the user clicks on the edit button
  onEditClick(id: string) {
    this.router.navigate(['../', 'product-add'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }
}
