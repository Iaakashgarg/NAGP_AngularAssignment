import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from 'src/app/shared/constants/app-constants';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  products: Product[] = [];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  sortKey: string;
  sortByPrice: string;
  searchToolTip: string;
  sortToolTip: string;
  searchPlaceHolder: string;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private primengConfig: PrimeNGConfig, private router: Router, private translate: TranslateService) { }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.products = data.productList;
    });

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];

    this.translate.stream('HOME.SortByPrice').subscribe(res => {
      this.sortByPrice = res;
    });

    this.translate.stream('HOME.SearchToolTip').subscribe(res => {
      this.searchToolTip = res;
    });

    this.translate.stream('HOME.SortToolTip').subscribe(res => {
      this.sortToolTip = res;
    });

    this.translate.stream('HOME.SearchPlaceholder').subscribe(res => {
      this.searchPlaceHolder = res;
    });

    this.primengConfig.ripple = true;
  }

  onSortChange(event: any) {
    let value = event.value;
    if (value.indexOf(AppConstants.Exclamation) === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  goToProductDetail(productId: string) {
    this.router.navigate([AppConstants.SearchPath, productId]);
  }

}
