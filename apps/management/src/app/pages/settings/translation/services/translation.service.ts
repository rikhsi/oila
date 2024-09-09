import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslationForm, TranslationSearchForm } from '../model/translation-form';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  readonly filterForm: FormGroup = new FormGroup<TranslationForm>({
    project: new FormControl<number>(null),
    active: new FormControl<boolean>(null),
    createdDate_to: new FormControl(null),
    createdDate_from: new FormControl(null),
  });

  readonly searchForm: FormGroup = new FormGroup<TranslationSearchForm>({
    key: new FormControl<string>(''),
    name_multilang: new FormControl<string>(''),
  });
}
