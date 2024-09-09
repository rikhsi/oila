import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FunctionType, ValidationOverview } from '@oila/config/typings';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'ui-textarea-default',
  standalone: true,
  imports: [NzFormModule, FormsModule, NzInputModule],
  templateUrl: './textarea-default.component.html',
  styleUrl: './textarea-default.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaDefaultComponent),
      multi: true,
    },
  ],
})
export class TextareaDefaultComponent extends ValidationOverview implements ControlValueAccessor {
  value = model<string>();
  required = input<boolean>();
  label = input<string>('');
  placeholder = input<string>('');
  autocomplete = input<string>();
  disabled = model<boolean>(false);
  readonly = input<boolean>(false);
  maxCount = input<number>(200);

  onChange: FunctionType<string> = () => {};
  onTouched: FunctionType<string> = () => {};

  ngAfterViewInit(): void {
    this.listenValue();
  }

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
    this.disabled.set(state);
  }

  onModelChange($event: string): void {
    this.onChange($event.toString().trim());
  }
}
