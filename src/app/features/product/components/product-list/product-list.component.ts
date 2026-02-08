import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, ProductCategory } from '../../models/product.model';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { debounceTime, startWith, switchMap, tap } from 'rxjs/operators';

interface SortState {
  field: keyof Product;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']

})
export class ProductListComponent implements OnInit {
  filtersForm!: FormGroup;
  searchForm!: FormGroup;

  products: Product[] = [];
  totalRecords = 0;
  page = 1;
  pageSize = 5;
  sortSubject = new BehaviorSubject<SortState>({ field: 'name', direction: 'asc' });
  categories = Object.values(ProductCategory);
  currencies = ['USD', 'ILS', 'EUR'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      name: [''],
      category: [''],
      price: [null],
      salePrice: [null],
      stock: [null],
      currency: ['']
    });

    this.searchForm = this.fb.group({ global: [''] });

    this.route.queryParams.subscribe(params => {
      if (params['sortField'] && params['sortDir']) {
        this.sortSubject.next({ field: params['sortField'], direction: params['sortDir'] });
      }
      Object.keys(this.filtersForm.controls).forEach(key => {
        if (params[key] != null) {
          this.filtersForm.controls[key].setValue(params[key], { emitEvent: false });
        }
      });
      if (params['page']) this.page = +params['page'];
      if (params['pageSize']) this.pageSize = +params['pageSize'];
    });

    combineLatest([
      this.sortSubject,
      this.filtersForm.valueChanges.pipe(startWith(this.filtersForm.value), debounceTime(200)),
      this.searchForm.valueChanges.pipe(startWith(this.searchForm.value), debounceTime(200))
    ])
      .pipe(
        switchMap(([sort, filters, search]) => this.loadProducts(filters, sort, search.global))
      )
      .subscribe();

    this.filtersForm.valueChanges.pipe(debounceTime(300)).subscribe(filters => {
      this.page = 1;
      this.updateUrl(filters, this.sortSubject.value, this.page, this.pageSize);
    });

    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.page = 1;
      this.updateUrl(this.filtersForm.value, this.sortSubject.value, this.page, this.pageSize);
    });

    this.sortSubject.subscribe(sort => {
      this.updateUrl(this.filtersForm.value, sort, this.page, this.pageSize);
    });
  }

  private loadProducts(filters: any, sort: SortState, search: string) {
    return this.productService
      .getProducts(filters, sort, search, this.page, this.pageSize)
      .pipe(
        tap(res => {
          this.products = res.body || [];
          this.totalRecords = +res.headers.get('X-Total-Count')!;
        }),
        switchMap(() => of([]))
      );
  }

  setSort(field: keyof Product) {
    const current = this.sortSubject.value;
    this.sortSubject.next({
      field,
      direction: current.field === field && current.direction === 'asc' ? 'desc' : 'asc'
    });
  }

  clearFilters() {
    this.filtersForm.reset({
      name: '',
      category: '',
      price: null,
      salePrice: null,
      stock: null,
      currency: ''
    });
    this.page = 1;
    this.updateUrl(this.filtersForm.value, this.sortSubject.value, this.page, this.pageSize);
  }

  onPageChange(event: any) {
    this.page = event.first / event.rows + 1;
    this.pageSize = event.rows;

    this.loadProducts(this.filtersForm.value, this.sortSubject.value, this.searchForm.value.global)
      .subscribe();

    this.updateUrl(this.filtersForm.value, this.sortSubject.value, this.page, this.pageSize);
  }

  private updateUrl(filters: any, sort: SortState, page: number, pageSize: number) {
    const queryParams: any = { ...filters, sortField: sort.field, sortDir: sort.direction, page, pageSize };
    this.router.navigate([], { relativeTo: this.route, queryParams, queryParamsHandling: 'merge' });
  }

  editProduct(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

}
