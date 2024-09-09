import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import {
  EnumProject,
  SpInterfaceTranslationApiService,
} from '../api/myoila.core.api';
import { LANGUAGE_ID } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class TranslocoHttpService implements TranslocoLoader {
  constructor(
    private translationsClient: SpInterfaceTranslationApiService,
    private storageService: StorageService
  ) {}

  getTranslation(): Observable<Translation> {
    const lang = this.storageService.lang;

    return this.translationsClient.getAllDictionary(
      EnumProject.Admin,
      LANGUAGE_ID[lang]
    );
  }
}
