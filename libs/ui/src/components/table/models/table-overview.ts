import { Directive, signal, viewChild } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import {
  FilterItem,
  FilterValue,
  FormBase,
  FormValue,
} from '@oila/config';
import { MessageService, QueryParamsService } from '@oila/config';
import { ActivatedRoute } from '@angular/router';
import { deepEqual, transformMeta } from '@oila/config';
import { InputOptionDirective } from '../../input-option';
import { FiltersComponent } from '../../filters/filters.component';
import { TableActionItem, TableColumn } from './table-base';
import { ZorroFilterRequest } from 'libs/config/src/api/myoila.core.api';

@Directive()
export class TableOverview<
  T,
  F extends FormBase<F> = FormBase<AbstractControl>,
  S extends FormBase<S> = FormBase<AbstractControl>
> {
  inputOption = viewChild(InputOptionDirective);
  filterComponent = viewChild(FiltersComponent);

  tableData = signal<T[]>([]);
  totalItems = signal<number>(0);
  cols = signal<TableColumn[]>([]);
  searchOptions = signal<FilterItem[]>([]);
  actions = signal<TableActionItem[]>([]);
  filterValue = signal<FilterValue>({});

  tableLoading = signal<boolean>(true);
  downloadLoading = signal<boolean>(false);

  metaChange$ = new Subject<ZorroFilterRequest>();
  submit$ = new Subject<void>();
  updateFilter$ = new Subject<void>();
  reset$ = new Subject<void>();
  download$ = new Subject<void>();

  filterForm = new FormGroup<F>({} as F);
  searchForm = new FormGroup<S>({} as S);

  constructor(
    private messageService: MessageService,
    private queryParamsService: QueryParamsService,
    public route: ActivatedRoute
  ) {}

  protected metaValue$(): Observable<ZorroFilterRequest> {
    return this.queryParamsService.initParams$(this.route).pipe(
      tap((params) => {
        this.searchForm.disable();
        this.filterForm.patchValue(params as FormValue<F>);
        this.searchForm.patchValue(params as FormValue<S>);
      }),
      switchMap(() =>
        combineLatest([
          this.metaChange$,
          this.submitRes$(),
          this.searchForm.valueChanges.pipe(startWith({})),
          this.reset$.pipe(startWith({})),
        ]).pipe(
          debounceTime(500),
          tap(() => this.disableAll()),
          tap(([, filters, search]) =>
            this.queryParamsService.patchMeta({ ...filters, ...search })
          ),
          map(([meta, filters, search]) =>
            transformMeta(meta, { ...filters, ...search })
          ),
          tap(() => this.filterComponent().generateItems())
        )
      )
    );
  }

  private submitRes$(): Observable<FormValue<F>> {
    return this.submit$.asObservable().pipe(
      startWith({}),
      map(() => this.filterForm.value as FormValue<F>),
      tap((value) => this.filterValue.set(value)),
      distinctUntilChanged(deepEqual)
    );
  }

  protected onResetAll(): void {
    Object.values(this.filterForm.controls).forEach((control) => {
      const hasRequiredValidator = control.hasValidator(Validators.required);

      if (!hasRequiredValidator) {
        control.reset(null, { emitEvent: false, onlySelf: true });
      }
    });

    this.filterForm.updateValueAndValidity();
    this.inputOption().reset();
    this.reset$.next();
  }

  protected onResetControl(names: string | string[]): void {
    if (Array.isArray(names)) {
      names.forEach((name) => {
        this.filterForm.get(name).reset(null);
      });
    } else {
      this.filterForm.get(names).reset(null);
    }

    this.submit$.next();
  }

  protected disableAll(disableSearch: boolean = false): void {
    this.tableLoading.set(true);
    this.filterForm.disable({ emitEvent: false });

    if (disableSearch) {
      this.searchForm.disable({ emitEvent: false });
    }
  }

  protected enableAll(): void {
    this.tableLoading.set(false);
    this.filterForm.enable({ emitEvent: false });
    this.searchForm.enable({ emitEvent: false });
  }

  protected updateTableError$(): Observable<never> {
    this.messageService?.onNotifyError('table.update_error');

    return EMPTY;
  }

  protected downloadSuccess(): void {
    this.messageService.onNotifySuccess('table.download_success', 5000);
  }

  protected downloadError$(): Observable<never> {
    this.messageService?.onNotifyError('table.download_error');

    return EMPTY;
  }
}
