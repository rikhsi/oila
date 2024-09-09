import { AbstractControl, FormGroup, FormArray } from '@angular/forms';

export type CustomSelectItem<T = number> = {
  value: T;
  label?: string;
};

export type ControlType = AbstractControl | FormGroup | FormArray;
