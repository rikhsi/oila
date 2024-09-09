import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IOptionForm, IOptionTerm } from '../../../models/option-form';
import { MultiLanguageField } from 'libs/config/src/api/myoila.core.api';
import {
  OptionCreateDTO,
  OptionDTO,
} from 'libs/config/src/api/myoila.admin.api';

@Injectable()
export class OptionFormService {
  optionForm = new FormGroup<IOptionForm>({
    translations: new FormControl<MultiLanguageField>(
      null,
      Validators.required
    ),
    terms: new FormArray<FormGroup<IOptionTerm>>([]),
    optionType: new FormControl<number>(null, [Validators.required]),
    viewType: new FormControl<number>(null, [Validators.required]),
  });

  createOptionTermFormGroup(): FormGroup<IOptionTerm> {
    const optionTermControl = new FormGroup({
      translations: new FormControl<MultiLanguageField>(null),
      order: new FormControl<number>(null, [Validators.required]),
      additional: new FormControl<string>(''),
    });
    return optionTermControl;
  }

  get optionTranslationFormArray(): FormArray<FormGroup<IOptionTerm>> {
    return this.optionForm.get('terms') as FormArray<FormGroup<IOptionTerm>>;
  }

  mapOptionToCreateDTO(): OptionCreateDTO {
    const formValue = this.optionForm.value;

    const optionCreateDTO: OptionCreateDTO = {
      name: formValue.translations,
      optionType: formValue.optionType,
      terms: formValue.terms.map((term) => ({
        additional: term.additional,
        order: term.order,
        name: term.translations,
      })),
      viewType: formValue.viewType,
    };

    return optionCreateDTO;
  }

  patchOptionForm(dto: OptionDTO): void {
    this.optionForm.setValue({
      translations: dto.name,
      optionType: 1,
      viewType: 2,
      terms: [], // Clear existing form array items
    });

    const termsArray = this.optionTranslationFormArray;
    termsArray.clear(); // Clear the form array

    dto.terms.forEach((term) => {
      const termFormGroup = this.createOptionTermFormGroup();
      termFormGroup.setValue({
        translations: term.name,
        order: term.order,
        additional: term.additional || '',
      });
      termsArray.push(termFormGroup);
    });
  }
}
