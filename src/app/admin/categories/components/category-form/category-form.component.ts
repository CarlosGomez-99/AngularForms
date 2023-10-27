import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
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
    console.log(this.form.value);
    
    if (this.form.valid) {
      this.createCategory();
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

  onFileSelected(event) {
    const file:File = event.target.files[0];
    if (file) {
      const name = file.name;
      const ref = this.storage.ref(name);
      const task = this.storage.upload(name, file);
      
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            const urlImage$ = ref.getDownloadURL();
            urlImage$.subscribe((url) => {
              console.log('image url', url);
              this.imageField.setValue(url);
            })
          })
        )
        .subscribe();
    }
  }

}
