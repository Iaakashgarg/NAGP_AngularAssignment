import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrderSummary } from '../models/orderSummary.model';
import { Product } from '../models/product.model';
import { CartService } from './cart.service';

const dummyProduct: Product = {
  id: '1000',
  code: "EC1024",
  brand: "Adidas",
  name: "Sweatshirt",
  description: "Men Navy Blue Essential 3-Stripes Solid Sweatshirt",
  image: "assets/product-images/adidas_ss1.jpg",
  price: 1099,
  category: "Clothing",
  quantity: 1,
  inventoryStatus: "IN STOCK",
  rating: 5,
  size: 'Small'
};


const dummyOrderDetails: OrderSummary = {
  totalItems: 1, subTotal: 1099, shippingHandling: 0, discount: 0, taxes: 87.92, total: 1186.92
};

const items: Product[] = []
items.push(dummyProduct);

const dummyCart = {
  items: items
}

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return no results when user cart is empty', (done: DoneFn) => {
    expect(service.getCartById(104)).toBe(null);
    done();
  });

  it('should return user cart based on user id', (done: DoneFn) => {
    service.addItemToCart(dummyProduct, 1, 'Small', 101);
    expect(service.getCartById(101)).toEqual(dummyCart);
    done();
  });

  it('should return length of cart items after adding item to cart', (done: DoneFn) => {
    service.addItemToCart(dummyProduct, 2, 'Small', 101);
    expect(service.getCartById(101).items.length).toBe(1);
    done();
  });

  it('should check if same item exists in cart and return -1 if not exists', (done: DoneFn) => {
    service.addItemToCart(dummyProduct, 2, 'Small', 101);
    expect(service.isSameItemExists('1009', 'Small', 101)).toBe(-1);
    done();
  });

  it('should check if same item exists in cart and return index if item exists', (done: DoneFn) => {
    service.addItemToCart(dummyProduct, 2, 'Small', 101);
    expect(service.isSameItemExists('1000', 'Small', 101)).toBe(0);
    done();
  });

  it('should remove item from user cart successfully', (done: DoneFn) => {
    service.addItemToCart(dummyProduct, 2, 'Small', 101);
    service.removeItemFromCart(dummyProduct, 101);
    expect(service.getCartById(101).items.length).toBe(0);
    done();
  });

  it('should change the quantity of item in user cart', (done: DoneFn) => {
    service.addItemToCart(dummyProduct, 2, 'Small', 101);
    service.changeItemQuantity(dummyProduct.id, 'Small', 3, 101);
    expect(service.getCartById(101).items[0].quantity).toBe(3);
    done();
  });

  it('should place the order successfully and empties user cart after order confirmation', (done: DoneFn) => {
    service.addItemToCart(dummyProduct, 2, 'Small', 101);
    service.placeOrder(101);
    expect(service.getCartById(101)).toBe(null);
    done();
  });

  it('should return the order details based on user id', (done: DoneFn) => {
    service.addItemToCart(dummyProduct, 1, 'Small', 101);
    expect(service.getOrderDetailsById(101)).toEqual(dummyOrderDetails);
    done();
  });

  it('should return the order details based on the user cart', (done: DoneFn) => {
    service.addItemToCart(dummyProduct, 1, 'Small', 101);
    expect(service.getOrderDetails(items)).toEqual(dummyOrderDetails);
    done();
  });


});

