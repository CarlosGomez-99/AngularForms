import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category;

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.getCategory(params.id);
      }
    });
  }

  createCategory(data: Category) {
    this.categoriesService.createCategory(data)
      .subscribe((newCategory) => {
        console.log(newCategory);
        this.router.navigate(['./admin/categories']);
      });
  }

  updateCategory(data: Category) {
    this.categoriesService.updateCategory(this.category.id, data)
      .subscribe((updatedCategory) => {
        console.log(updatedCategory);
        this.router.navigate(['./admin/categories']);
      });
  }

  private getCategory(id: string) {
    this.categoriesService.getCategory(id).subscribe((category) => {
      this.category = category;
    });
  }

}
