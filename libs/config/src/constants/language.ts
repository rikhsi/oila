import { EnumLanguage } from "../api/myoila.core.api";

export enum LANGUAGE {
  uz = 'uz',
  ru = 'ru',
}

export const STANDARD_LANG: { [key in string]: string } = {
  ru: 'ru-Ru',
  uz: 'uz-Latn-UZ',
};

export const LANGUAGE_ID: Record<string, number> = {
  [LANGUAGE.uz]: EnumLanguage.Uz,
  [LANGUAGE.ru]: EnumLanguage.Ru
}