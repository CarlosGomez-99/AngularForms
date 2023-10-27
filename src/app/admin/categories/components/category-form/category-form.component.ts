import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { CategoriesService } from 'src/app/core/services/categories.service';
import { MyValidators } from 'src/app/utils/validators';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  categoryId: string;
  action: string = 'Crear';

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params.id;
      if (this.categoryId) {
        this.action = 'Actualizar';
        this.getCategory();
      }
    });
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)], MyValidators.validateCategoryName(this.categoriesService)],
      image: ['', [Validators.required]],
    })
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  saveCategory() {
    if (this.form.valid) {
      this.categoryId ? this.updateCategory() : this.createCategory();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCategory() {
    const category = this.form.value;
    this.categoriesService.createCategory(category)
      .subscribe((newCategory) => {
        console.log(newCategory);
        this.router.navigate(['./admin/categories']);
      });
  }

  private updateCategory() {
    const category = this.form.value;
    this.categoriesService.updateCategory(this.categoryId, category)
      .subscribe((updatedCategory) => {
        console.log(updatedCategory);
        this.router.navigate(['./admin/categories']);
      });
  }

  private getCategory() {
    this.categoriesService.getCategory(this.categoryId).subscribe((category) => {
      this.form.patchValue(category);
    });
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      const name = file.name;
      const ref = this.storage.ref(name);
      const task = this.storage.upload(name, file);

      task.snapshotChanges()
        .pipe(
          finalize(() => {
            const urlImage$ = ref.getDownloadURL();
            urlImage$.subscribe((url) => {
              this.imageField.setValue(url);
            })
          })
        )
        .subscribe();
    }
  }

}
