import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';

import { MyValidators } from 'src/app/utils/validators';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  action: string = 'Crear';
  isNew: boolean = true;

  @Input()
  set category(category: Category) {
    if (category) {
      this.isNew = false;
      this.action = 'Actualizar';
      this.form.patchValue(category);
    }
  }
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit(): void { }


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
      !this.isNew ? this.update.emit(this.form.value) : this.create.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
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
