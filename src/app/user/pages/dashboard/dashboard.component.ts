import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // Injecting the necessary dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is invoked when the user clicks on the show products list page
  onProductListPageClick() {
    this.router.navigate(['../', 'products'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the show cart page
  onCartPageClick() {
    this.router.navigate(['../', 'cart'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the show order list page
  onOrderListPageClick() {
    this.router.navigate(['../', 'orders'], { relativeTo: this.route });
  }
}
