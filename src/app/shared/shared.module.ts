import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductCardComponent,
    LoaderComponent,
    ToastComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    ProductCardComponent,
    LoaderComponent,
    ToastComponent,
  ],
})
export class SharedModule {}
