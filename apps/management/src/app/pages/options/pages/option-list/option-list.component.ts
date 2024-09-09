import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionListSearchForm } from '../../models/option-table-form';
import { ActivatedRoute, Router } from '@angular/router';
import {
  OPTION_ACTIONS,
  OPTION_COLUMNS,
  OPTION_FILTER,
} from './data/option-table';
import { OptionTableService } from '../../services/option-table.service';
import { catchError, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MessageService, OPTION_PAGE, QueryParamsService } from '@oila/config';
import {
  FiltersComponent,
  InputOptionComponent,
  InputOptionDirective,
  TableComponent,
  TableOverview,
} from '@oila/ui';
import {
  OptionDTO,
  OptionsApiService,
} from 'libs/config/src/api/myoila.admin.api';

@Component({
  selector: 'mg-option-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    FiltersComponent,
    InputOptionComponent,
    NzButtonModule,
    InputOptionDirective,
    TableComponent,
  ],
  templateUrl: './option-list.component.html',
  styleUrl: './option-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QueryParamsService],
})
export class OptionListComponent
  extends TableOverview<OptionDTO, {}, OptionListSearchForm>
  implements OnInit
{
  constructor(
    route: ActivatedRoute,
    queryParamsService: QueryParamsService,
    messageService: MessageService,
    private destroyRef: DestroyRef,
    private optionTableService: OptionTableService,
    private optionClient: OptionsApiService,
    private router: Router
  ) {
    super(messageService, queryParamsService, route);
  }

  ngOnInit(): void {
    this.cols.set(OPTION_COLUMNS);

    this.searchOptions.set(OPTION_FILTER);
    this.actions.set(OPTION_ACTIONS);
    this.filterForm = this.optionTableService.filterForm;
    this.searchForm = this.optionTableService.searchForm;

    this.getAllOptions();
  }
  navigatetToAddForm(): void {
    this.router.navigate([OPTION_PAGE.create], { relativeTo: this.route });
  }

  editOption(option: OptionDTO): void {
    const optioId = option.id;
    this.router.navigate([OPTION_PAGE.edit, optioId], {
      relativeTo: this.route,
    });
  }

  private getAllOptions(): void {
    this.metaValue$()
      .pipe(
        switchMap((transformMeta) => this.optionClient.getAll(transformMeta)),
        tap((res) => {
          const result = res.result;
          this.tableData.set(result.items);
          this.totalItems.set(result.total);
          this.enableAll();
        }),
        catchError(() => this.updateTableError$()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
