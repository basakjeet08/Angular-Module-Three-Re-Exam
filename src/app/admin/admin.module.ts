import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsAddComponent } from './pages/products-add/products-add.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from '../shared/guard/auth.guard';

// These are the routes for the admin module
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [adminGuard, authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product-list', component: ProductsListComponent },
      { path: 'product-add', component: ProductsAddComponent },
      { path: 'order-list', component: OrdersListComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProductsListComponent,
    ProductsAddComponent,
    OrdersListComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
