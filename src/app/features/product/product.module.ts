import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'create', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent }
];


@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductModule { }
