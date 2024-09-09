import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { catchError, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  DrawerComponent,
  FiltersComponent,
  InputDefaultComponent,
  InputOptionComponent,
  InputOptionDirective,
  SelectDateComponent,
  SelectDefaultComponent,
  TableComponent,
  TableOverview,
} from '@oila/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslationService } from '../../services/translation.service';
import {
  TranslationForm,
  TranslationSearchForm,
} from '../../model/translation-form';
import {
  TRANSLATION_ACTIONS,
  TRANSLATION_COLUMN,
  TRANSLATION_FILTER,
} from '../../data/translation-table';
import { QueryParamsService, MessageService } from '@oila/config';
import { OptionStaticDirective, DateRangeDirective } from '@oila/ui';
import {
  SpInterfaceTranslationApiService,
  SpInterfaceTranslationModel,
} from 'libs/config/src/api/myoila.core.api';

@Component({
  selector: 'mg-translation-list',
  standalone: true,
  imports: [
    NzIconDirective,
    InputOptionComponent,
    TableComponent,
    DrawerComponent,
    ReactiveFormsModule,
    InputDefaultComponent,
    TranslocoDirective,
    NzButtonModule,
    FiltersComponent,
    SelectDefaultComponent,
    SelectDateComponent,
    InputOptionDirective,
    OptionStaticDirective,
    DateRangeDirective,
  ],
  templateUrl: './translation-list.component.html',
  styleUrl: './translation-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QueryParamsService],
})
export class TranslationListComponent
  extends TableOverview<
    SpInterfaceTranslationModel,
    TranslationForm,
    TranslationSearchForm
  >
  implements OnInit
{
  constructor(
    private translationClient: SpInterfaceTranslationApiService,
    private destroyRef: DestroyRef,
    private translationService: TranslationService,
    route: ActivatedRoute,
    queryParamsService: QueryParamsService,
    messageService: MessageService
  ) {
    super(messageService, queryParamsService, route);
  }

  ngOnInit(): void {
    this.cols.set(TRANSLATION_COLUMN);
    this.searchOptions.set(TRANSLATION_FILTER);
    this.actions.set(TRANSLATION_ACTIONS);

    this.filterForm = this.translationService.filterForm;
    this.searchForm = this.translationService.searchForm;

    this.getAllTranslations();
  }

  private getAllTranslations(): void {
    this.metaValue$()
      .pipe(
        switchMap((tranformMeta) =>
          this.translationClient.getAll(tranformMeta)
        ),
        tap(({ result }) => this.tableData.set(result.items)),
        tap(({ result }) => this.totalItems.set(result.filteredTotal)),
        tap(() => this.enableAll()),
        catchError(() => this.updateTableError$()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
