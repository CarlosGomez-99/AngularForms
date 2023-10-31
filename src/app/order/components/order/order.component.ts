import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from './../../../core/models/product.model';
import { CartService } from './../../../core/services/cart.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<Product[]>;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {
    this.products$ = this.cartService.cart$;
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: this.formBuilder.array([])
    });
  }

  addAddressField() {
    this.addressField.push(this.createAddressField());
  }

  deleteAddressField(index: number ){
    this.addressField.removeAt(index)
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      console.log(value);
    }
  }

  private createAddressField(): FormGroup {
    return this.formBuilder.group({
      zip: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get addressField() {
    return this.form.get('address') as FormArray;
  }

}
