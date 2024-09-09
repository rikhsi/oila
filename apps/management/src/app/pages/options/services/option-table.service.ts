import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OptionListSearchForm } from '../models/option-table-form';

@Injectable({ providedIn: 'root' })
export class OptionTableService {
  readonly filterForm: FormGroup = new FormGroup<OptionListSearchForm>({
    name_multilang: new FormControl<string>(''),
  });
  readonly searchForm: FormGroup = new FormGroup<OptionListSearchForm>({
    name_multilang: new FormControl<string>(''),
  });
}
