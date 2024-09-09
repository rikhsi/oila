import {
  AfterViewInit,
  DestroyRef,
  Directive,
  Host,
  Injector,
  Self,
  input,
} from '@angular/core';
import { InputOptionComponent } from './input-option.component';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  Observable,
  combineLatest,
  filter,
  map,
  skip,
  switchMap,
  tap,
} from 'rxjs';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FilterItem } from '@oila/config/typings';

@Directive({
  selector: '[uiInputOption]',
  standalone: true,
})
export class InputOptionDirective implements AfterViewInit {
  searchOptions = input<FilterItem[]>([], { alias: 'uiInputOption' });

  private get form(): FormGroup {
    return this.formGroupDirective.form;
  }

  private selectedOptionChange$: Observable<FilterItem> = toObservable(
    this.inputOption.selectedOption
  ).pipe(
    filter((option) => !!option),
    skip(1),
    map((option) =>
      this.searchOptions().find((item) => item.controlName === option)
    ),
    tap((selectedItem) => this.inputOption.selectedItem.set(selectedItem)),
    filter(() => !!Object.values(this.form.value).filter((v) => !!v).length),
    tap(() => this.reset())
  );

  private valueChange$: Observable<string> = toObservable(
    this.inputOption.value
  ).pipe(
    tap((value) =>
      this.form.get(this.inputOption.selectedOption()).setValue(value)
    )
  );

  constructor(
    private destroyRef: DestroyRef,
    private injector: Injector,
    @Self() private formGroupDirective: FormGroupDirective,
    @Host() @Self() private inputOption: InputOptionComponent
  ) {}

  ngAfterViewInit(): void {
    this.searchOptionsChange();
  }

  reset(): void {
    this.form.reset();
    this.inputOption.value.set(null);
  }

  private searchOptionsChange(): void {
    toObservable(this.searchOptions, { injector: this.injector })
      .pipe(
        filter(() => !!Object.keys(this.form.controls).length),
        filter((options) => !!options.length),
        tap((options) => this.inputOption.searchOptions.set(options)),
        tap((options) => this.defineInitialSelectedItem(options)),
        switchMap(() =>
          combineLatest([this.selectedOptionChange$, this.valueChange$])
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private defineInitialSelectedItem(options: FilterItem[]): void {
    const trueKey = Object.entries<string>(this.form.value).find(
      ([, value]) => !!value
    );
    const matchedItem = options.find(
      ({ controlName }) => controlName === trueKey?.[0]
    );
    const selectedItem = matchedItem ?? options[0];

    this.inputOption.selectedItem.set(selectedItem);
    this.inputOption.selectedOption.set(selectedItem.controlName);
    this.inputOption.value.set(trueKey?.[1]);

    if (!trueKey) {
      this.form.reset();
    }
  }
}
