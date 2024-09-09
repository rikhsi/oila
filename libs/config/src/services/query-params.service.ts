import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { FilterValue, FormValue } from '../typings';
import {
  removeProperty,
  parseQueryParam,
  filterByValue,
} from '../utils/object-transform';

@Injectable()
export class QueryParamsService {
  constructor(private router: Router) {}

  initParams$(
    route: ActivatedRoute,
    skip: string[] = []
  ): Observable<FilterValue> {
    return route.queryParams.pipe(
      map((queryParams) => removeProperty(queryParams, skip)),
      map((queryParams) => {
        const currentFilters: FilterValue = {};

        Object.entries(queryParams).forEach((item) => {
          currentFilters[item[0]] = parseQueryParam(item[1] as string);
        });

        return currentFilters;
      }),
      tap((queryParams) => this.router.navigate([], { queryParams })),
      take(1)
    );
  }

  patchMeta<T>(filters: FormValue<T>, skip: string[] = []): void {
    const filteredParams = removeProperty(filters, skip);

    this.router.navigate([], {
      queryParams: {
        ...filterByValue(filteredParams),
      },
    });
  }
}
