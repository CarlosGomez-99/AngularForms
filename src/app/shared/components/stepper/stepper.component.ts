import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true
    }
  ]
})
export class StepperComponent implements OnInit, ControlValueAccessor {

  currentValue = 5;
  onChange = (_: any) => { };
  onTouch = () => { };
  isDisabled:boolean;

  constructor() { }

  writeValue(obj: number): void {
    if (obj) {
      this.currentValue = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
  }

  increment() {
    this.currentValue++;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  decrement() {
    this.currentValue--;
    this.onTouch();
    this.onChange(this.currentValue);
  }

}
