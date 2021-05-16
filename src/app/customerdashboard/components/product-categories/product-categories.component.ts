import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode } from 'primeng/api';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { AppConstants } from 'src/app/shared/constants/app-constants';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

  data: TreeNode[];
  selectedNode: TreeNode;
  categories: string[];
  children: TreeNode<any>[] = [];
  products: Product[];
  categoryToolTip: string;
  searchPlaceHolder: string;
  constructor(private productService: ProductService,
    private router: Router, private activatedRoute: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.products = data.productList;
    });
    this.productService.getAllCategories().subscribe(res => {
      this.categories = res;
      this.categories.forEach((item, index) => {
        const obj: TreeNode = {
          label: item, expanded: true, data: {
            name: AppConstants.EMart + AppConstants.Underscore + item,
            'avatar': 'saul.jpg'
          }, type: 'person',
          styleClass: 'p-category',
        };
        this.children[index] = obj;
      })
    });

    this.data = [{
      label: AppConstants.Categories,
      type: 'person',
      styleClass: 'p-category',
      expanded: true,
      data: { name: AppConstants.ProductCategory, 'avatar': 'walter.jpg' },
      children: this.children
    }];

    this.translate.stream('HOME.CategoryToolTip').subscribe(res => {
      this.categoryToolTip = res;
    })
    this.translate.stream('HOME.SearchToolTip').subscribe(res => {
      this.searchPlaceHolder = res;
    });

  }

  goToProductDetail(productId: string) {
    this.router.navigate([AppConstants.SearchPath, productId]);
  }

  onNodeSelect(event: any) {
    if (event.node !== null && event.node.label !== AppConstants.Categories) {
      this.productService.getProductByCategory(event.node.label).subscribe(items => {
        this.products = items;
      });
    }
  }
}