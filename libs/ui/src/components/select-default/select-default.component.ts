import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomSelectItem, FunctionType, ValidationOverview } from '@oila/config';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'ui-select-default',
  templateUrl: './select-default.component.html',
  styleUrl: './select-default.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, NzSelectModule, TranslocoPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDefaultComponent),
      multi: true,
    },
  ],
})
export class SelectDefaultComponent extends ValidationOverview implements ControlValueAccessor, AfterViewInit {
  value = model<number>();
  required = input<boolean>();
  label = input<string>('');
  options = model<CustomSelectItem[]>([]);
  isTranslate = input<boolean>();
  disabled = signal<boolean>(false);

  ngAfterViewInit(): void {
    this.listenValue();
  }

  onChange: FunctionType<number> = () => {};
  onTouched: FunctionType<number> = () => {};

  writeValue(value: number): void {
    this.value.set(value);
  }

  registerOnChange(fn: FunctionType<number>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: FunctionType<number>): void {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean): void {
    this.disabled.set(state);
  }

  onModelChange($event: number): void {
    this.onChange($event);
  }
}
