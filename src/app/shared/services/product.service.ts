import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PRODUCT_CREATE_ENDPOINT,
  PRODUCTS_FETCH_ALL_ENDPOINT,
} from '../constants/url-constants';
import { ProductDto } from '../models/product/ProductDto';
import { map } from 'rxjs';
import { mapFirebaseListObject } from '../util/firebase-object-mapper';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Injecting the necessary dependencies
  constructor(private http: HttpClient) {}

  // This function creates a product
  createProduct(product: {
    name: string;
    amount: number | null;
    pricePerItem: number | null;
  }) {
    return this.http.post<ProductDto>(PRODUCT_CREATE_ENDPOINT, product);
  }

  // This function fetches all the products from the backend
  fetchAllProducts() {
    return this.http
      .get<{ [key: string]: ProductDto }>(PRODUCTS_FETCH_ALL_ENDPOINT)
      .pipe(map((response) => mapFirebaseListObject(response)));
  }
}
