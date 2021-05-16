import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { AppConstants } from 'src/app/shared/constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly router: Router, private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


      this.userService.userSub.subscribe(user => {
        if (user != null && user != undefined) {
          if (!user.isLoggedIn) {
              this.router.navigate([AppConstants.LoginPath]);
                return false;
            }
          return true;
        }
      });
      return true;
    }
}
