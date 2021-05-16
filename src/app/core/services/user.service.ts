import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { AppConstants } from "src/app/shared/constants/app-constants";
import { LoggedInUser } from "../models/loggedInUser.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {

    private USER_SERVICE_BASE_URL = "/assets/templates/user.json";
    user: LoggedInUser = {} as LoggedInUser;
    public userSub = new BehaviorSubject<LoggedInUser>(this.user);

    constructor(private readonly http: HttpClient) {
      const user = JSON.parse(localStorage.getItem(AppConstants.User));
      if (user !== null && user !== undefined && user.isLoggedIn === true) {
        this.userSub.next(user);
      }
    }

    validateUser(userInput: any): Observable<User> {
      return this.http.get<User[]>(this.USER_SERVICE_BASE_URL).pipe(map(value =>
         value.find(user => user.email === userInput.email && user.password === userInput.password)));
    }

    getCurrentUserId(): number {
      let userId = 0;
      this.userSub.subscribe(res => {
        if (res !=null && res != undefined) {
          userId = res.id;
        }
      })
      return userId;
    }

    getCurrentUserEmail(): string {
      let email: string;
      this.userSub.subscribe(res => {
        if (res !=null && res != undefined) {
          email = res.email;
        }
      })
      return email;
    }

    getCurrentUserAddress(): string {
      let address: string;
      this.userSub.subscribe(res => {
        if (res !=null && res != undefined) {
          address = res.address;
        }
      })
      return address;
    }

    setUserSub(user: LoggedInUser) {
      this.userSub.next(user);
    }

  }