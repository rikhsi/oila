import { ZorroFilterRequest } from '../api/myoila.admin.api';
import { REPLACEMENTS } from '../constants';
import { FormValue } from '../typings';

export function transformMeta<T>(
  meta: ZorroFilterRequest,
  formValue: FormValue<T>
): ZorroFilterRequest {
  meta.filter = Object.entries(formValue)
    .filter(([, value]) => !!value)
    .map(([key, value]) => {
      Object.keys(REPLACEMENTS).forEach((pattern) => {
        if (key.includes(pattern)) {
          key = key.replace(pattern, REPLACEMENTS[pattern]);
        }
      });
      return { key, value };
    });

  return meta;
}
