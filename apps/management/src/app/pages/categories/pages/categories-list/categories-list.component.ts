import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySearchForm } from '../../models/category-table-form';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryTableService } from '../../services/category-table.service';
import { CATEGORIES_ACTIONS, CATEGORIES_COLUMNS, CATEGORIES_FILTER } from './data/categories-table';
import { catchError, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@jsverse/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FiltersComponent, InputOptionComponent, InputOptionDirective, TableComponent, TableOverview } from '@oila/ui';
import { CategoriesApiService, CategoryDTO } from 'libs/config/src/api/myoila.admin.api';
import { CATEGORY_PAGE, MessageService, QueryParamsService } from '@oila/config';

@Component({
  selector: 'mg-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    FiltersComponent,
    TableComponent,
    InputOptionDirective,
    NzButtonModule,
    ReactiveFormsModule,
    InputOptionComponent,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QueryParamsService],
})
export class CategoriesListComponent extends TableOverview<CategoryDTO, any, CategorySearchForm> implements OnInit {
  constructor(
    messageService: MessageService,
    queryParamsService: QueryParamsService,
    route: ActivatedRoute,
    private destroyRef: DestroyRef,
    private categoryTableService: CategoryTableService,
    private categoryClient: CategoriesApiService,
    private router: Router
  ) {
    super(messageService, queryParamsService, route);
  }
  ngOnInit(): void {
    this.cols.set(CATEGORIES_COLUMNS);

    this.searchOptions.set(CATEGORIES_FILTER);
    this.actions.set(CATEGORIES_ACTIONS);
    this.filterForm = this.categoryTableService.filterForm;
    this.searchForm = this.categoryTableService.searchForm;

    this.getAllCategories();
  }
  navigatetToAddForm(): void {
    this.router.navigate([CATEGORY_PAGE.create], { relativeTo: this.route });
  }

  editCategory(category: CategoryDTO): void {}
  
  private getAllCategories(): void {
    this.metaValue$()
      .pipe(
        switchMap((transformMeta) => this.categoryClient.getAll(transformMeta)),
        tap(({ result }) => {
          this.tableData.set(result.items);
          this.totalItems.set(result.total);
          this.tableLoading.set(false);
        }),
        catchError(() => this.updateTableError$()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
