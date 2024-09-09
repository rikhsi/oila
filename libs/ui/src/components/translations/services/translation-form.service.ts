import { Injectable } from '@angular/core';
import { optionLanguages } from '../data/langs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {
  ILanguageTranslation,
  LanguageTranslationFG,
} from '../typings/translation';
import { MultiLanguageField } from 'libs/config/src/api/myoila.core.api';

@Injectable()
export class TranslationsFormService {
  langs = optionLanguages;
  translations = new FormArray<FormGroup<LanguageTranslationFG>>([]);

  createLanguageTranslationFormGroup(
    langKey: string
  ): FormGroup<LanguageTranslationFG> {
    return new FormGroup<LanguageTranslationFG>({
      langKey: new FormControl<string>(langKey) as FormControl<string>,
      langValue: new FormControl<string>('', [
        Validators.required,
      ]) as FormControl<string>,
    });
  }

  initTranslations() {
    this.langs.forEach((lang) => {
      const translationControl = this.createLanguageTranslationFormGroup(lang);
      this.translations.push(translationControl);
    });
  }

  mapMultiLanguageFieldToTranslationForm(
    multiLanguageFields: MultiLanguageField
  ): ILanguageTranslation[] {
    return Object.entries(multiLanguageFields).map(([key, value]) => {
      return {
        langKey: key,
        langValue: multiLanguageFields[key],
      };
    });
  }

  mapTranslationFormToMultiLanguageField(
    translations: ILanguageTranslation[]
  ): MultiLanguageField {
    return translations.reduce((acc, translation) => {
      acc[translation.langKey] = translation.langValue;
      return acc;
    }, {}) as MultiLanguageField;
  }
}
