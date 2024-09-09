import { AbstractControl } from '@angular/forms';

export type FormValue<F> = {
  [K in keyof F]: F[K] extends AbstractControl ? F[K]['value'] : never;
};
export type FormBase<F> = { [K in keyof F]: AbstractControl };
export type FunctionType<T> = (value?: T) => void;

export type JwtOptions = {
  tokenGetter: () => string;
};
