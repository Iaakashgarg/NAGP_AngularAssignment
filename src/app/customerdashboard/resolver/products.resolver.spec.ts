import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProductsResolver } from './products.resolver';


describe('ProductsResolver', () => {
  let resolver: ProductsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]
    });
    resolver = TestBed.inject(ProductsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
