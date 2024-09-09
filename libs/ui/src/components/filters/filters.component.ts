import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  contentChild,
  contentChildren,
  input,
  model,
  output,
} from '@angular/core';
import { FiltersActionComponent, FiltersSelectedComponent } from './components';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NgTemplateOutlet } from '@angular/common';
import { DrawerComponent, SelectDefaultComponent, SelectMultipleComponent } from '..';
import { FilterItem } from '@oila/config';
import { DateRangeDirective } from '../../directives';

@Component({
  selector: 'ui-filters',
  standalone: true,
  imports: [
    FiltersActionComponent,
    FiltersSelectedComponent,
    TranslocoDirective,
    NzButtonModule,
    NzIconDirective,
    NgTemplateOutlet,
    DrawerComponent,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  drawerControls = contentChild<TemplateRef<ElementRef>>('drawerControls');
  searchFilter = contentChild<TemplateRef<ElementRef>>('searchFilter');

  selectDefaultList = contentChildren<SelectDefaultComponent>(SelectDefaultComponent);
  selectMultipleList = contentChildren<SelectMultipleComponent>(SelectMultipleComponent);
  dateRangeList = contentChildren<DateRangeDirective>(DateRangeDirective);

  isDrawer = model<boolean>();
  activeFilters = model<FilterItem<string>[]>([]);

  showReport = input<boolean>();
  isLoading = input<boolean>();
  isReportLoading = input<boolean>();

  report = output<void>();
  submit = output<void>();
  reset = output<void>();
  resetControl = output<string[]>();

  onSubmit(): void {
    this.submit.emit();
    this.isDrawer.set(false);
  }

  generateItems(): void {
    this.activeFilters.set([
      ...this.generateSelectDefault(),
      ...this.generateSelectMultiple(),
      ...this.generateSelectDate(),
    ]);
  }

  private generateSelectDefault(): FilterItem<string>[] {
    const selectedItems = this.selectDefaultList().filter((selectDefault) => !!selectDefault.value());

    const activatedItems: FilterItem<string>[] = selectedItems.map((item) => ({
      label: item.label(),
      value: item.options().find((option) => option.value === item.value()).label,
      controlNames: [item.controlName],
    }));

    return activatedItems;
  }

  private generateSelectMultiple(): FilterItem<string>[] {
    const selectedItems = this.selectMultipleList().filter((selectNultiple) => !!selectNultiple.value()?.length);

    const activatedItems: FilterItem<string>[] = selectedItems.map((item) => ({
      label: item.label(),
      value: item.options().find((option) => option.value === item.value()[0]).label,
      counter: item.value().length,
      controlNames: [item.controlName],
    }));

    return activatedItems;
  }

  private generateSelectDate(): FilterItem<string>[] {
    const selectedItems = this.dateRangeList().filter(
      (dateRange) => dateRange.from()?.transformValue() && dateRange.to()
    );

    const activatedItems: FilterItem<string>[] = selectedItems.map((item) => {
      const fromDate = item.from().transformValue();
      const toDate = item.to().transformValue() ?? '';

      return {
        label: item.label(),
        value: toDate ? `${fromDate} - ${toDate}` : fromDate,
        controlNames: [item.from().controlName, item.to().controlName],
      };
    });

    return activatedItems;
  }
}
