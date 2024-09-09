import { FormControl } from '@angular/forms';

export type TranslationForm = {
  project: FormControl<number>;
  createdDate_to: FormControl<string>;
  createdDate_from: FormControl<string>;
  id?: FormControl<number>;
  active?: FormControl<boolean>;
};

export type TranslationSearchForm = {
  key: FormControl<string>;
  name_multilang: FormControl<string>;
};
