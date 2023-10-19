import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('');
  dateField = new FormControl('');
  numberField = new FormControl(24);

  categoryField = new FormControl('category-4');
  tagField = new FormControl('');

  agreeField = new FormControl(false);
  genderField = new FormControl('');
  zoneField = new FormControl('');

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

}
