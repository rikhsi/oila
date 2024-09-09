import { LANGUAGE } from '@oila/config';

export const optionLanguages = Object.keys(LANGUAGE).map(
  (key) => LANGUAGE[key]
);
