import { Injectable } from '@angular/core';
import { CategorySearchForm } from '../models/category-table-form';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CategoryTableService {
  readonly searchForm: FormGroup = new FormGroup<CategorySearchForm>({
    name: new FormControl<string>(''),
    parent: new FormControl<string>(''),
  });

  readonly filterForm: FormGroup = new FormGroup<any>({});
}
