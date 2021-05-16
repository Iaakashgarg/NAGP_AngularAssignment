import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PrimeComponentsModule } from '../prime-components.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CustomerDashboardRoutingModule } from './customerdashboard-routing.module';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ErrorPageComponent,
    LoginPageComponent,
    ProductDetailComponent,
    SearchProductComponent,
    UserCartComponent,
    CheckoutComponent,
    ProductCategoriesComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PrimeComponentsModule,
    SharedModule,
    CustomerDashboardRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ConfirmationService]
})
export class CustomerDashboardModule { }
