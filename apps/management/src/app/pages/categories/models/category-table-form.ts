import { FormControl } from '@angular/forms';

export type CategorySearchForm = {
  name: FormControl<string>;
  parent: FormControl<string>;
};
