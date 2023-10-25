import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) {  }

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/categories`);
  }

  createCategory(data: Partial<Category>) {
    return this.http.post<Category>(`${environment.url_api}/categories`, data);
  }

  updateCategory(id: string, changes: Partial<Category>) {
    return this.http.put<Category>(`${environment.url_api}/categories/${id}`, changes);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${environment.url_api}/categories/${id}`);
  }
}
