import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MultiLanguageField } from 'libs/config/src/api/myoila.core.api';

export interface ICategoryForm {
  translations: FormControl<MultiLanguageField>;
  parentId: FormControl<number>;
  options: FormArray<FormGroup<ICategoryOptionForm>>;
}

export interface ICategoryOptionForm {
  optionId: FormControl<number>;
  isRequired: FormControl<boolean>;
  isCharacteristics: FormControl<boolean>;
}
