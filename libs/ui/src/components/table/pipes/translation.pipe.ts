import { Pipe, PipeTransform } from '@angular/core';
import {
  TranslateParams,
  TranslocoService,
  isNumber,
} from '@jsverse/transloco';

@Pipe({
  name: 'translation',
  standalone: true,
})
export class TranslationPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform<T>(value: T, isTranslate: boolean): T {
    if (isTranslate && !isNumber(value)) {
      return this.translocoService.translate(value as TranslateParams);
    }

    return value as T;
  }
}
