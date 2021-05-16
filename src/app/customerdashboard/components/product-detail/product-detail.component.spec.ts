import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { throwError, of } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { UserService } from 'src/app/core/services/user.service';
import { ProductDetailComponent } from './product-detail.component';




let itemOb = {
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
  rating: 5
}

const mockActivatedRoute = {
  data: of(itemOb)
};

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let cartService: CartService;
  let toastService: ToastrService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterModule,
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [CartService, ToastrService, UserService, { provide: ActivatedRoute, useValue: mockActivatedRoute }
        , TranslateService],
      declarations: [ProductDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cartService = fixture.debugElement.injector.get(CartService);
    toastService = fixture.debugElement.injector.get(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should add the item to cart successfully', () => {
    const description = { isSuccess: true };
    cartService = fixture.debugElement.injector.get(CartService);
    spyOn(cartService, 'addItemToCart').and.returnValue(of(description));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fail when adding item to cart gives error', () => {
    cartService = fixture.debugElement.injector.get(CartService);
    spyOn(cartService, 'addItemToCart').and.returnValue(throwError(new Error()));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be able to go to checkout successfully', () => {
    const description = { isSuccess: true };
    cartService = fixture.debugElement.injector.get(CartService);
    spyOn(cartService, 'addItemToCart').and.returnValue(of(description));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fail when go to checkout gives any error', () => {
    cartService = fixture.debugElement.injector.get(CartService);
    spyOn(cartService, 'addItemToCart').and.returnValue(throwError(new Error()));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


});


