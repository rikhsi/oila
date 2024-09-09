import { StorageService } from '../services';
import { EMPTY, Observable } from 'rxjs';

export function langFactory(
  storageService: StorageService
): () => Observable<string> {
  const lang = storageService.lang ?? 'uz';

  storageService.lang = lang;

  return () => EMPTY;
}
