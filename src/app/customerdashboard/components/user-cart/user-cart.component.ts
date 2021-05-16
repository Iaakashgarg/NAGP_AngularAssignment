import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { OrderSummary } from 'src/app/core/models/orderSummary.model';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { UserService } from 'src/app/core/services/user.service';
import { AppConstants } from 'src/app/shared/constants/app-constants';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  quantity: number[] = [1, 2, 3, 4, 5]
  items: Product[] = [];
  itemQuantity: FormArray;
  priceDetails: OrderSummary = {} as OrderSummary;
  userAddress: string;
  userId: number;
  constructor(private cartService: CartService,
    private router: Router, public translate: TranslateService, private userService: UserService,
    private toastService: ToastrService) { }


  ngOnInit(): void {
    this.userId = this.userService.getCurrentUserId();
    this.cartService.setCartSub(this.cartService.getCartById(this.userId));

    if (this.userId !== null && this.userId !== undefined && this.userId !== 0) {
      this.userAddress = this.userService.getCurrentUserAddress();
    }
    this.cartService.cartSub.subscribe(cart => {
      if (cart !== null && cart !== undefined) {
        this.items = cart.items;
        this.priceDetails = this.cartService.getOrderDetails(this.items);
      }
    })
  }

  checkout() {
    this.router.navigate([AppConstants.CheckoutPath]);
  }

  removeItem(item: Product) {
    this.cartService.removeItemFromCart(item, this.userId);
    this.toastService.info(this.translate.instant('HOME.RemoveFromCart'));
  }

  changeItemQuantity(productId: string, size: string, qty: number) {
    this.cartService.changeItemQuantity(productId, size, qty, this.userId);
    this.toastService.info(this.translate.instant('HOME.ItmQtyChanged'));
  }

  goToProductDetail(productId: string) {
    this.router.navigate([AppConstants.SearchPath, productId]);
  }
}
