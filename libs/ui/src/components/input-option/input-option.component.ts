import { ChangeDetectionStrategy, Component, forwardRef, model, signal } from '@angular/core';
import { InputDefaultComponent } from '../input-default/input-default.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterItem } from '@oila/config';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'ui-input-option',
  templateUrl: './input-option.component.html',
  styleUrl: './input-option.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOptionComponent),
      multi: true,
    },
  ],
  imports: [
    InputDefaultComponent,
    NzDropDownModule,
    TranslocoDirective,
    NzIconDirective,
    NzButtonModule,
    NzRadioModule,
    FormsModule,
    NzBadgeModule
  ],
})
export class InputOptionComponent {
  value = signal<string>(null);
  selectedItem = signal<FilterItem>(null);
  selectedOption = signal<string>(null);
  searchOptions = signal<FilterItem[]>([]);
  isDropdown = signal<boolean>(false);
  disabled = model<boolean>(false);
}
