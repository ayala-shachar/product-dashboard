export interface Product {
  id: number;
  name: string;
  description?: string;
  sku?: string;             
  category: ProductCategory;
  tags?: string[];
  price: number;
  salePrice?: number;
  currency: 'USD' | 'ILS' | 'EUR';
  stock: number;
  isActive: boolean;        
  minStockAlert?: number;
  imageUrl?: string;
  createdAt: string;         
  updatedAt: string;
}

export enum ProductCategory {
  Electronics = 'electronics',
  Clothing = 'clothing',
  Home = 'home',
  Books = 'books'
}
