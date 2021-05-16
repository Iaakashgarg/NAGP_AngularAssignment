import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/models/product.model';
import { UserCart } from 'src/app/core/models/userCart.model';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';
import { AppConstants } from 'src/app/shared/constants/app-constants';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  items: Product[];
  product: Product;
  userCart: UserCart;
  quantity: number[] = [1, 2, 3, 4, 5]
  sizes: string[] = ['Small', 'Medium', 'Large'];
  chosenSize: string;
  selectedQty: number = 1;
  userId: number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute, private cartService: CartService, private userService: UserService,
    private toastService: ToastrService, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data.product;
    })
    this.userId = this.userService.getCurrentUserId();
    console.log(this.userId);
  }

  addToCart(product: Product, selectedQty: number, size: string) {
    if (this.userId !== undefined && this.userId !== null && this.userId > 0) {
      this.cartService.addItemToCart(product, selectedQty, size, this.userId).subscribe(() => {
        this.toastService.info(this.translate.instant('HOME.AddedToCart'));
      }, () => {
        this.toastService.error(this.translate.instant('HOME.ErrorMsg'));  // something went wrong error message
      });
    } else {
      this.toastService.info(this.translate.instant('HOME.PleaseLoginMsg'));
      this.router.navigate([AppConstants.LoginPath]);
    }

  }


  goToCheckout(product: Product, selectedQty: number, size: string) {
    if (this.userId !== undefined && this.userId !== null && this.userId > 0) {
      this.cartService.addItemToCart(product, selectedQty, size, this.userId);
      this.router.navigateByUrl(AppConstants.CheckoutPath);
    } else {
      this.toastService.info(this.translate.instant('HOME.PleaseLoginMsg'));
      this.router.navigate([AppConstants.LoginPath]);
    }
  }
}
