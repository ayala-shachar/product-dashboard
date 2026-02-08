import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product, ProductCategory } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <--- חובה
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', category: ProductCategory.Electronics, price: 100, stock: 10, currency: 'USD', isActive: true, createdAt: '', updatedAt: '' },
    { id: 2, name: 'Product 2', category: ProductCategory.Books, price: 50, stock: 5, currency: 'ILS', isActive: true, createdAt: '', updatedAt: '' }
  ];

  it('should fetch products', () => {
    service.getProducts({}, { field: 'price', direction: 'asc' }, '', 1, 10)
      .subscribe(res => {
        expect(res.body).toEqual(mockProducts);
      });

    const req = httpMock.expectOne(r => r.url.includes('/products'));
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts, { headers: { 'X-Total-Count': '2' } });
  });

  it('should get a product by id', () => {
    service.getProductById(1).subscribe(res => {
      expect(res).toEqual(mockProducts[0]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts[0]);
  });

  it('should add a product', () => {
    const newProduct: Product = { id: 3, name: 'Product 3', category: ProductCategory.Home, price: 75, stock: 7, currency: 'EUR', isActive: true, createdAt: '', updatedAt: '' };

    service.addProduct(newProduct).subscribe(res => {
      expect(res).toEqual(newProduct);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should update a product', () => {
    const updatedProduct = { ...mockProducts[0], price: 120 };

    service.updateProduct(1, updatedProduct).subscribe(res => {
      expect(res).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });
});
