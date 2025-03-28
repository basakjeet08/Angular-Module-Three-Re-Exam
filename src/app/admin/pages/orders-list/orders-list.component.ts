import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
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
    // Starting the loader state
    this.loaderService.startLoading();

    // Calling the APi
    this.orderService.fetchAllOrders().subscribe({
      // Success State
      next: (orderList: OrderDto[]) => {
        this.loaderService.endLoading();
        this.orderList = orderList;

        if (orderList.length === 0) {
          this.toastService.showToast({
            type: 'info',
            message: 'There are currently no orders yet !!',
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

  // This function is invoked when the user clicks on the move status to next stage button
  onChangeStatusToNextClick(orderId: string) {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.orderService.updateOrderStatus(orderId).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'Order Status updated successfully !!',
        });

        this.fetchOrders();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
