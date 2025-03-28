import { Component, OnInit } from '@angular/core';
import { OrderDto } from 'src/app/shared/models/order/OrderDto';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  // These are the data for this component
  orderList: OrderDto[] = [];

  // Injecting the required dependencies
  constructor(private orderService: OrderService) {}

  // Fetching the order while loading the component
  ngOnInit(): void {
    this.fetchOrders();
  }

  // This function fetches the orders
  fetchOrders() {
    this.orderService.fetchAllOrders().subscribe({
      next: (orderList: OrderDto[]) => (this.orderList = orderList),
    });
  }
}
