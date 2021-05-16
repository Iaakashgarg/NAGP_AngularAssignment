import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { LoggedInUser } from 'src/app/core/models/loggedInUser.model';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let userService: UserService;
  let user: User = {
    id: 102,
    name: "Mayank Garg",
    email: "mg@yahoo.com",
    password: "mayank@jain",
    address:""
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      declarations: [ LoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the user successfully', () => {
    userService = fixture.debugElement.injector.get(UserService);
    spyOn(userService, 'validateUser').and.returnValue(of(user));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should fail when validating the user ', () => {
    let loggedInUser = {} as LoggedInUser;
    userService = fixture.debugElement.injector.get(UserService);
    spyOn(userService, 'validateUser').and.returnValue(
      throwError(new Error('Some error occurred while validating user!'))
    );
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.loggedInUser).toEqual(loggedInUser);
  });


});
