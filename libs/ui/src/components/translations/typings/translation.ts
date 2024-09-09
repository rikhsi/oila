import { FormBase } from '@oila/config';

export type LanguageTranslationFG = FormBase<ILanguageTranslation>;

export interface ILanguageTranslation {
  langKey: string;
  langValue: string;
}
