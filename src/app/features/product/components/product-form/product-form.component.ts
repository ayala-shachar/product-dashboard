import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductCategory } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productCategories:{ label: string, value: string }[] = [];
  isEditMode: boolean = false;
  productId!: number;

  constructor(
    private fb: FormBuilder, private productService: ProductService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      salePrice: [null],
      currency: ['ILS', [Validators.required]],
      stock: [null, [Validators.required, Validators.min(0.01)]],
      isActive: [true],
      minStockAlert: [null],
      imageUrl: [''],
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });

     this.productCategories = Object.keys(ProductCategory)
      .filter(key => key !== '')
      .map(key => ({
        label: ProductCategory[key as keyof typeof ProductCategory],
        value: key
      }));
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      this.productForm.patchValue(product);
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
