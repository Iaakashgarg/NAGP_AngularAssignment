import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { TranslateService } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http';
import { Languages } from 'src/app/core/models/languages.model';
import { AppConstants } from '../../constants/app-constants';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    items: MenuItem[];
    languageList: Array<Languages>;
    preferredLang: string;
    selected = AppConstants.EnName;
    languages = AppConstants.LanguageFilePath;
    userName: string = '';
    isLoggedIn = false;
    param = { name: this.userName };
    navbarCollapsed = true;

    constructor(private userService: UserService, private router: Router,
        public translate: TranslateService, private httpClient: HttpClient, private toastService: ToastrService) {
        this.getLanguages().subscribe(languages => {
            this.languageList = languages;
            if (localStorage.length !== 0) {
                this.preferredLang = localStorage.getItem(AppConstants.LanguageCode);
                const languageCode = this.preferredLang ? this.preferredLang : AppConstants.EnCode;
                this.selected = this.languageList.find(x => x.Code === languageCode).Language;
            }
        });
    }

    ngOnInit(): void {

        this.userService.userSub.subscribe(user => {
            if (user != null && user != undefined) {
                this.userName = user.name
                this.param = { name: this.userName }
                if (user.isLoggedIn === true) {
                    this.isLoggedIn = true;
                }
            }
            else {
                this.isLoggedIn = false;
            }
        });

    }

    navigateToCart() {
        this.router.navigateByUrl(AppConstants.CartPath);
    }

    logout() {
        localStorage.removeItem(AppConstants.User);
        this.router.navigate([AppConstants.HomePath]);
        this.userService.setUserSub(null);
        this.toastService.info(this.translate.instant('HOME.LogoutMsg'));
    }


    setSelected(language: string) {
        this.selected = language;
        const selectedLanguageCode = this.languageList.find(x => x.Language === language).Code;
        localStorage.setItem(AppConstants.LanguageCode, selectedLanguageCode);
    }

    public getLanguages(): Observable<any> {
        return this.httpClient.get(this.languages);
    }

    toggleNavbarCollapsing() {
        this.navbarCollapsed = !this.navbarCollapsed;
    }

}
