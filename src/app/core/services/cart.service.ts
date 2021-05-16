import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AppConstants } from 'src/app/shared/constants/app-constants';
import { OrderSummary } from '../models/orderSummary.model';
import { Product } from '../models/product.model';
import { UserCart } from '../models/userCart.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  index: number = -1;
  userCart: UserCart = {} as UserCart;
  orderDetails: OrderSummary = {} as OrderSummary;
  cartSub = new BehaviorSubject<UserCart>(this.userCart);
  description = { isSuccess: true };

  constructor(private userService: UserService) {
    const user = JSON.parse(localStorage.getItem(AppConstants.User));
    if (user !== null && user !== undefined && user.isLoggedIn === true) {
      this.setCartSub(this.getCartById(user.id));
    }
  }


  public getCartById(id: number) {
    return JSON.parse(localStorage.getItem(AppConstants.Cart + id.toString()));
  }

  public getOrderDetailsById(userId: number): OrderSummary {
    const cart = this.getCartById(userId);
    return this.getOrderDetails(cart.items);
  }

  public getOrderDetails(items: Product[]): OrderSummary {
    this.orderDetails.totalItems = items.length;
    this.orderDetails.subTotal = 0;
    items.forEach(item => {
      this.orderDetails.subTotal += item.price * item.quantity;
    });
    this.orderDetails.shippingHandling = this.orderDetails.subTotal > 799 ? 0 : 99;
    this.orderDetails.discount = this.orderDetails.subTotal > 1099 ? 50 : 0;
    this.orderDetails.taxes = this.orderDetails.subTotal * 0.08;
    this.orderDetails.total = this.orderDetails.subTotal + this.orderDetails.shippingHandling + this.orderDetails.taxes
      - this.orderDetails.discount;
    return this.orderDetails;
  }

  public isSameItemExists(productId: string, size: string, userId: number): number {
    const oldCart: UserCart = this.getCartById(userId);
    if (oldCart !== undefined && oldCart !== null) {
      this.index = oldCart.items.findIndex(x => x.id === productId && x.size === size);
    }
    return this.index;
  }

  public addItemToCart(product: Product, quantity: number, size: string, userId: number) {
    try {
      const index = this.isSameItemExists(product.id, size, userId);
      let cart = this.getCartById(userId);
      if (index !== -1) {
        cart.items.splice(index, 1);
      }
      product.quantity = quantity;
      product.size = size;
      if (cart !== undefined && cart !== null) {
        cart.items.push(product);
      }
      else {
        const items: Product[] = [];
        items.push(product);
        this.userCart.email = this.userService.getCurrentUserEmail();
        this.userCart.items = Object.assign([], items);
        cart = this.userCart;
      }
      localStorage.setItem(AppConstants.Cart + userId.toString(), JSON.stringify(cart));
      this.setCartSub(cart);
      return of(this.description);
    }
    catch (error) {
      console.error(error);
      return of(error);
    }
  }

  public removeItemFromCart(item: Product, userId: number) {
    const cart: UserCart = this.getCartById(userId);
    if (cart != null && cart != undefined && cart.items.length > 0) {
      const index = this.isSameItemExists(item.id, item.size, userId);
      cart.items.splice(index, 1);
      localStorage.setItem(AppConstants.Cart + userId.toString(), JSON.stringify(cart));
      this.setCartSub(cart);
    }
  }

  public changeItemQuantity(productId: string, size: string, qty: number, userId: number) {
    const cart: UserCart = this.getCartById(userId);
    if (cart != null && cart != undefined && cart.items.length > 0) {
      const index = this.isSameItemExists(productId, size, userId);
      cart.items[index].quantity = qty;
      localStorage.setItem(AppConstants.Cart + userId.toString(), JSON.stringify(cart));
      this.setCartSub(cart);
    }
  }

  setCartSub(userCart: UserCart) {
    this.cartSub.next(userCart);
  }

  placeOrder(userId: number) {
    localStorage.removeItem(AppConstants.Cart + userId.toString());
    this.setCartSub(null);
  }
}
