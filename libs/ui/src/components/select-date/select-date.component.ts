import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import moment from 'moment';
import { FunctionType, ValidationOverview } from '@oila/config';

@Component({
  selector: 'ui-select-date',
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzDatePickerModule, FormsModule, NzFormModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDateComponent),
      multi: true,
    },
  ],
})
export class SelectDateComponent extends ValidationOverview implements ControlValueAccessor, AfterViewInit {
  value = model<string>();
  label = input<string>('');
  placeholder = input<string>('');
  disabled = signal<boolean>(false);
  required = input<boolean>();
  autoDisable = input<boolean>(true);
  nzDisabledDate = signal<(current: Date) => boolean>(null);

  transformValue = computed(() => {
    const dateValue = this.value();

    if (!dateValue || !moment(dateValue).isValid()) {
      return null;
    }

    return moment(dateValue).format('DD.MM.yyyy');
  });

  ngAfterViewInit(): void {
    this.listenValue();
  }

  onChange: FunctionType<string> = () => {};
  onTouched: FunctionType<string> = () => {};

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: FunctionType<string>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: FunctionType<string>): void {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean): void {
    if (this.autoDisable()) {
      this.disabled.set(state);
    }
  }

  onModelChange(): void {
    this.onChange(this.transformValue());
  }
}
