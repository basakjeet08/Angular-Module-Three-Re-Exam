import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CartComponent } from './pages/cart/cart.component';
import { userGuard } from './guards/user.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// These are the routes for the user module
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [userGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'orders', component: OrdersComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UserComponent,
    ProductsComponent,
    OrdersComponent,
    CartComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class UserModule {}
