import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  forwardRef,
  input,
  model,
} from '@angular/core';

import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FunctionType, ValidationOverview } from '@oila/config/typings';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'ui-input-default',
  standalone: true,
  imports: [NzFormModule, NzInputModule, FormsModule, NgTemplateOutlet, NzIconModule, NgxMaskDirective],
  templateUrl: './input-default.component.html',
  styleUrl: './input-default.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDefaultComponent),
      multi: true,
    },
  ],
})
export class InputDefaultComponent extends ValidationOverview implements ControlValueAccessor, AfterViewInit {
  value = model<string>();
  required = input<boolean>(false);
  label = input<string>();
  placeholder = input<string>('');
  size = input<NzSizeLDSType>('large');
  type = model<string>('text');
  autocomplete = input<string>();
  suffix = input<TemplateRef<void>>();
  maskFormat = input<string>();
  shownMakTyped = input<boolean>();
  shownMaskExpression = input<string>();
  specialMaskCharacters = input<string[]>();
  disabled = model<boolean>(false, { alias: 'blocked' });
  isPassword = input<boolean>(false);
  readonly = input<boolean>();
  passwordIcon = computed<string>(() => (this.type() === 'password' ? 'eye-invisible' : 'eye'));

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
    this.disabled.set(state);
  }

  onModelChange($event: string): void {
    this.onChange($event.toString().trim());
  }

  togglePassword(): void {
    const nextType = this.type() === 'text' ? 'password' : 'text';

    this.type.set(nextType);
  }
}
