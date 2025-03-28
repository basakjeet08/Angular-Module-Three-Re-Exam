import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { OrderDto } from 'src/app/shared/models/order/OrderDto';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  // These are the data for this component
  orderList: OrderDto[] = [];

  // Injecting the required dependencies
  constructor(
    private orderService: OrderService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  // Fetching the order while loading the component
  ngOnInit(): void {
    this.fetchOrders();
  }

  // This function fetches the orders
  fetchOrders() {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the api
    this.orderService.fetchOrderByCurrentUser().subscribe({
      // Success State
      next: (orderList: OrderDto[]) => {
        this.loaderService.endLoading();
        this.orderList = orderList;

        if (orderList.length === 0) {
          this.toastService.showToast({
            type: 'info',
            message: 'You have no orders till now !!',
          });
        } else {
          this.toastService.showToast({
            type: 'success',
            message: 'All orders are fetched properly !!',
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
}
