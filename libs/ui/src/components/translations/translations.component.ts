import { ChangeDetectionStrategy, Component, DestroyRef, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { optionLanguages } from './data/langs';
import { TranslationsFormService } from './services/translation-form.service';
import { InputDefaultComponent } from '../input-default/input-default.component';
import { DrawerComponent } from '../drawer/drawer.component';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { ILanguageTranslation } from './typings/translation';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MultiLanguageField } from 'libs/config/src/api/myoila.core.api';

@Component({
  selector: 'ui-translations-input',
  standalone: true,
  imports: [CommonModule, InputDefaultComponent, DrawerComponent, ReactiveFormsModule],
  templateUrl: './translations.component.html',
  styleUrl: './translations.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TranslationsFormService,
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TranslationsInputComponent), multi: true },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TranslationsInputComponent),
      multi: true,
    },
  ],
})
export class TranslationsInputComponent implements OnInit, ControlValueAccessor {
  langs = optionLanguages;
  isDisabled = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  translations = this.translationsFormService.translations;

  onTranslationChange$ = this.translations.valueChanges.pipe(
    // tap((translations: ILanguageTranslation[]) => {
    //   const multiLangField: MultiLanguageField =
    //     this.translationsFormService.mapTranslationFormToMultiLanguageField(translations);
    //   this.onChange(multiLangField);
    // }),
    takeUntilDestroyed(this.destroyRef)
  );

  constructor(private translationsFormService: TranslationsFormService, private destroyRef: DestroyRef) {}

  ngOnInit() {
    this.translationsFormService.initTranslations();
    this.onTranslationChange$.subscribe();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  writeValue(translations: MultiLanguageField): void {
    if (translations) {
      const mappedTranslations = this.translationsFormService.mapMultiLanguageFieldToTranslationForm(translations);
      this.translations.setValue(mappedTranslations);
    }
  }
  validate(control: AbstractControl): ValidationErrors | null {
    // Implement your validation logic here
    // Example: Check if the translations form group is valid
    return this.translations.invalid ? { invalidTranslations: true } : null;
  }
}
