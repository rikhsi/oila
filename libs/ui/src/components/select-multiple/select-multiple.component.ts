import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CustomSelectItem, FunctionType, ValidationOverview } from '@oila/config';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'ui-select-multiple',
  standalone: true,
  imports: [TranslocoPipe, FormsModule, NzFormModule, NzSelectModule],
  templateUrl: './select-multiple.component.html',
  styleUrl: './select-multiple.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectMultipleComponent),
      multi: true,
    },
  ],
})
export class SelectMultipleComponent extends ValidationOverview
  implements ControlValueAccessor, AfterViewInit
{
  value = model<number[]>([]);
  required = input<boolean>();
  label = input<string>('');
  options = model<CustomSelectItem[]>([]);
  counter = input<number>(1);
  disabled = signal<boolean>(false);

  ngAfterViewInit(): void {
    this.listenValue();
  }

  onChange: FunctionType<number[]> = () => {};
  onTouched: FunctionType<number[]> = () => {};

  writeValue(value: number[]): void {
    this.value.set(value);
  }

  registerOnChange(fn: FunctionType<number[]>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: FunctionType<number[]>): void {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean): void {
    this.disabled.set(state);
  }

  onModelChange($event: number[]): void {
    this.onChange($event);
  }
}