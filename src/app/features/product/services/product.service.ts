import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

 
 getProducts(
  filters: any,
  sort: { field: keyof Product; direction: 'asc' | 'desc' },
  search: string,
  page: number,
  pageSize: number
): Observable<HttpResponse<Product[]>> {

  let params = new HttpParams()
    .set('_page', page)
    .set('_limit', pageSize);

  if (sort?.field) {
    params = params.set('_sort', sort.field).set('_order', sort.direction);
  }

  if (filters.name) {
    params = params.set('name_like', filters.name);
  }
  if (filters.category) {
    params = params.set('category', filters.category);
  }
  if (filters.price != null) {
    params = params.set('price_gte', filters.price);
  }
  if (filters.salePrice != null) {
    params = params.set('salePrice_gte', filters.salePrice);
  }
  if (filters.stock != null) {
    params = params.set('stock_gte', filters.stock);
  }
  
  if (filters.currency) {
    params = params.set('currency', filters.currency);
  }

  if (search) {
    params = params.set('q', search);
  }

  return this.http.get<Product[]>(this.apiUrl, { params, observe: 'response' });
}


  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
