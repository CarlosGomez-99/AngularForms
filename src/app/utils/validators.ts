import { AbstractControl } from '@angular/forms';
import { Category } from '../core/models/category.model';
import { CategoriesService } from '../core/services/categories.service';
import { map } from 'rxjs/operators';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    const value = control.value;
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
      return { invalid_password: true };
    }
    return null;
  }

  static matchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      return { password_not_match: true };
    }
    return null;
  }

  static validateCategoryName(service: CategoriesService) {    
    return (control: AbstractControl) => {
      const value = control.value;
      return service.checkAvailability(value)
        .pipe(
          map((response: Boolean) => {
            return response ? { name_not_available: true } : null;
          })
        );
    }
  }

}
