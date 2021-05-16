import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductResolver } from './resolver/product.resolver';
import { ProductsResolver } from './resolver/products.resolver';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: 'search', component: SearchProductComponent, resolve: {
          productList: ProductsResolver
        }
      },
       {
        path: 'search/:productId', component: ProductDetailComponent
        , resolve: {
          product: ProductResolver
        }
      },
      {
        path: 'cart', component: UserCartComponent, canActivate: [AuthGuard]
      },
      {
        path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]
      },
      {
        path: 'product-category', component: ProductCategoriesComponent, resolve: {
          productList: ProductsResolver
        }
      },
      { path: '', redirectTo: 'search', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    component: ErrorPageComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDashboardRoutingModule { }
