import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AppComponent } from './app.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',                     
    component: LayoutComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule)
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
     ButtonModule,  
    ToolbarModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
