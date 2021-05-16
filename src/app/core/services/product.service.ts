import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public PRODUCT_SERVICE_URL = "/assets/templates/products.json";

  constructor(private readonly http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.PRODUCT_SERVICE_URL);
  }

  public getProductById(productId: string): Observable<Product> {
    return this.http.get<Product[]>(this.PRODUCT_SERVICE_URL).pipe(map(item => item.find(itm => itm.id === productId)));
  }

  public getAllCategories(): Observable<string[]> {
    return this.http.get<Product[]>(this.PRODUCT_SERVICE_URL).pipe(map(item => item.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index)));
  }

  public getProductByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCT_SERVICE_URL).pipe(map(item => item.filter(itm => itm.category === category)));
  }


}
