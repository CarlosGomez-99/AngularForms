import { Category } from 'src/app/core/models/category.model';
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category?: Category;
}
