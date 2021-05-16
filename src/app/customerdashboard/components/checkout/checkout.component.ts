import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { OrderSummary } from 'src/app/core/models/orderSummary.model';
import { CartService } from 'src/app/core/services/cart.service';
import { UserService } from 'src/app/core/services/user.service';
import { AppConstants } from 'src/app/shared/constants/app-constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,
    public translate: TranslateService, private cartService: CartService, private userService: UserService,
     private toastService: ToastrService) { }

  emptyCart: boolean = true;;
  userId: number;
  orderSummary: OrderSummary;
  
  statesList: string[] = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh',
    'Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland'
    ,'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttarakhand','Uttar Pradesh','West Bengal','Andaman and Nicobar Islands'
    ,'Chandigarh','Dadra and Nagar Haveli','Daman and Diu','Delhi','Lakshadweep','Puducherry'];

  checkoutForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl(''),
    address: new FormGroup({
      address1: new FormControl('',Validators.required),
      street: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      zip: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{6}")])
    }),
    phoneNumber: new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl('',[Validators.required,Validators.email]),
  });

  get form(){
    return this.checkoutForm.controls;
  }

  get address(){
    return (this.checkoutForm.get(AppConstants.Address) as FormGroup).controls;
  }

       
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.userId = this.userService.getCurrentUserId();
    this.cartService.cartSub.subscribe(res => {
      if (res !== undefined && res !== null && res.items !== undefined && res.items.length > 0) {
        this.emptyCart = false;
        this.orderSummary = this.cartService.getOrderDetailsById(this.userId);
      }
      else {
        this.emptyCart = true;
      }
    })
  }


  placeOrder() {
    this.confirmationService.confirm({
        message: this.translate.instant('HOME.ProceedMsg'),
        header: this.translate.instant('HOME.Confirmation'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.cartService.placeOrder(this.userId);
            this.toastService.success(this.translate.instant('HOME.OrderPlacedSuccessfully'));
            this.checkoutForm.reset();
        },
        reject: () => {
            this.toastService.warning(this.translate.instant('HOME.NotProceed'));
        }
    });
}

}
