import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { FormBase } from '@oila/config';
import { MultiLanguageField } from 'libs/config/src/api/myoila.core.api';

export interface IOptionForm {
  translations: FormControl<MultiLanguageField>;
  terms: FormArray<FormGroup<IOptionTerm>>;
  optionType: FormControl<number>;
  viewType: FormControl<number>;
}

export interface IOptionTerm {
  translations: FormControl<MultiLanguageField>;
  order: FormControl<number>;
  additional: FormControl<string>;
}
export type LanguageTranslationFG = FormBase<ILanguageTranslation>;

export interface ILanguageTranslation {
  langKey: string;
  langValue: string;
}
