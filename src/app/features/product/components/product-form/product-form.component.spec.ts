import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) }
        },
        {
          provide: ProductService,
          useValue: {
            getProductById: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with all controls', () => {
    const form = component.productForm;

    expect(form).toBeTruthy();
    expect(form.contains('name')).toBeTrue();
    expect(form.contains('description')).toBeTrue();
    expect(form.contains('sku')).toBeTrue();
    expect(form.contains('category')).toBeTrue();
    expect(form.contains('price')).toBeTrue();
    expect(form.contains('currency')).toBeTrue();
    expect(form.contains('stock')).toBeTrue();
  });
});
