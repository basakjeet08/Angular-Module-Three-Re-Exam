import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PRODUCT_CREATE_ENDPOINT,
  PRODUCT_DELETE_ENDPOINT,
  PRODUCT_FETCH_BY_ID_ENDPOINT,
  PRODUCT_UPDATE_BY_ID_ENDPOINT,
  PRODUCTS_FETCH_ALL_ENDPOINT,
} from '../constants/url-constants';
import { ProductDto } from '../models/product/ProductDto';
import { map } from 'rxjs';
import {
  mapFirebaseListObject,
  mapFirebaseObject,
} from '../util/firebase-object-mapper';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Injecting the necessary dependencies
  constructor(private http: HttpClient) {}

  // This function creates a product
  createProduct(product: ProductDto) {
    return this.http.post<ProductDto>(PRODUCT_CREATE_ENDPOINT, product);
  }

  // This function fetches all the products from the backend
  fetchAllProducts() {
    return this.http
      .get<{ [key: string]: ProductDto }>(PRODUCTS_FETCH_ALL_ENDPOINT)
      .pipe(map((response) => mapFirebaseListObject(response)));
  }

  // This function fetches only the product with the given id
  fetchProductById(id: string) {
    return this.http
      .get<ProductDto | null>(PRODUCT_FETCH_BY_ID_ENDPOINT.replace(':id', id))
      .pipe(map((response) => mapFirebaseObject(response, id)));
  }

  // This function fetches all the products with the specific list of ids
  fetchProductByIds(idList: string[]) {
    return this.fetchAllProducts().pipe(
      map((productList) =>
        productList.filter((product) => idList.includes(product.id!))
      )
    );
  }

  // This function updates the product wth the specific Id
  updateProductById(product: ProductDto) {
    return this.http.patch(
      PRODUCT_UPDATE_BY_ID_ENDPOINT.replace(':id', product.id!),
      product
    );
  }

  // This function deletes the product by id
  deleteById(productId: string) {
    return this.http.delete(PRODUCT_DELETE_ENDPOINT.replace(':id', productId));
  }
}
