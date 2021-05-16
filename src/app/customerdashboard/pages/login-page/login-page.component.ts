import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedInUser } from 'src/app/core/models/loggedInUser.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from 'src/app/shared/constants/app-constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loggedInUser: LoggedInUser = {} as LoggedInUser;
  constructor(private userService: UserService, private router: Router,
    private toastService: ToastrService, private translate: TranslateService) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  login() {
    this.userService.validateUser(this.loginForm.value).subscribe(res => {
      if (res != null && res != undefined) {
        this.loggedInUser = { id: res.id, name: res.name, email: res.email, isLoggedIn: true, address: res.address };
        localStorage.setItem(AppConstants.User, JSON.stringify(this.loggedInUser));
        this.toastService.success(this.translate.instant('HOME.LoginSuccessful'));
        this.userService.setUserSub(this.loggedInUser);
        this.router.navigateByUrl(AppConstants.HomePath);
      }
      else {
        this.toastService.error(this.translate.instant('HOME.InvalidCredentials'));
      }
    }
      , err => {
        console.error(err)
        this.toastService.error(this.translate.instant('HOME.ErrorMsg'));
      });
  }

}
