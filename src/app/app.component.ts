import { Inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from './shared/constants/app-constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = AppConstants.EMart;
  browserLang = AppConstants.EnCode;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'ge']);
    translate.setDefaultLang(AppConstants.EnCode);
    if (localStorage.length === 0) {
      this.browserLang = translate.getBrowserLang();
    } else {
      this.browserLang = localStorage.getItem(AppConstants.LanguageCode);
    }
    if (this.browserLang != null) {
      translate.use(this.browserLang.match(/en|fr|ge/) ? this.browserLang : AppConstants.EnCode);
    }
  }
  
  ngOnInit() {
    
  }
}
