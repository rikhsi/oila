import {
  AfterContentInit,
  DestroyRef,
  Directive,
  Injector,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import moment from 'moment';
import { SelectDateComponent } from '../components';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Directive({
  selector: '[uiDateRange]',
  standalone: true,
})
export class DateRangeDirective implements AfterContentInit {
  label = input<string>(null, { alias: 'uiDateRange' });
  selectDate = contentChildren<SelectDateComponent>(SelectDateComponent, {
    descendants: true,
  });

  from = computed<SelectDateComponent>(() => this.selectDate()?.[0]);
  to = computed<SelectDateComponent>(() => this.selectDate()?.[1]);

  constructor(private destroyRef: DestroyRef, private injector: Injector) {}

  ngAfterContentInit(): void {
    this.initRange();
  }

  private initRange(): void {
    if (this.from() && this.to()) {
      this.toggleTo(true);

      toObservable(this.from().value, { injector: this.injector })
        .pipe(
          tap((fromDate) => {
            if (fromDate) {
              this.toggleTo(false);

              this.to().nzDisabledDate.set((current: Date) => {
                return (
                  current && moment(current).isBefore(moment(fromDate), 'day')
                );
              });
            } else {
              this.to().value.set(null);
              this.to().onModelChange();
              this.toggleTo(true);
            }
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    }
  }

  private toggleTo(state: boolean): void {
    this.to().disabled.set(state);
  }
}
