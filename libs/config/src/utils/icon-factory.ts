import { NzIconService } from 'ng-zorro-antd/icon';
import { EMPTY, Observable } from 'rxjs';
import { SVG_ICONS } from '../constants';

export function iconFactory(
  iconService: NzIconService
): () => Observable<void> {
  const prefix = 'oila:';

  Object.entries(SVG_ICONS).forEach(([key, value]) => {
    iconService.addIconLiteral(prefix + key, value);
  });

  return (): Observable<never> => EMPTY;
}
