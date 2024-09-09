import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormService } from './services/category-form.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { filter, map, share, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategoryOptionForm } from '../../models/category-form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {
  BreadCrumbComponent,
  InputDefaultComponent,
  SelectDefaultComponent,
  TranslationsInputComponent,
} from '@oila/ui';
import { CATEGORY_PAGE, MessageService } from '@oila/config';
import { CategoriesApiService } from 'libs/config/src/api/myoila.admin.api';

@Component({
  selector: 'mg-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputDefaultComponent,
    NzIconModule,
    SelectDefaultComponent,
    TranslationsInputComponent,
    NzButtonModule,
    NzDividerComponent,
    BreadCrumbComponent,
    RouterModule,
    TranslocoModule,
    NzCheckboxModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CategoryFormService],
})
export class CategoryFormComponent implements AfterViewInit {
  categoryForm = this.categoryFormService.categoryForm;

  categoryId$ = this.route.params.pipe(
    map((params) => params[CATEGORY_PAGE.categoryId]),
    share()
  );

  selectableOptions = toSignal(this.categoryFormService.selectableOptions$);

  categoryId = toSignal(this.categoryId$);

  category$ = this.categoryId$.pipe(
    filter((categoryId) => !!categoryId),
    switchMap((categoryId) => this.categoryClient.getById(categoryId)),

    map((res) => res.result)
  );

  category = toSignal(this.category$);

  isEditMode = computed(() => !!this.categoryId());
  constructor(
    private categoryFormService: CategoryFormService,
    private route: ActivatedRoute,
    private categoryClient: CategoriesApiService,
    private messageService: MessageService
  ) {}

  ngAfterViewInit(): void {
    if (this.optionsFormArray.length === 0) {
      this.addOption();
    }
  }

  addOption(): void {
    const option = this.categoryFormService.createOptionFormGroup();
    this.optionsFormArray.push(option);
  }

  save(): void {
    if (this.isEditMode()) {
      this.editCagetory();
    } else {
      this.addCategory();
    }
  }

  deleteOption(index: number): void {
    this.optionsFormArray.removeAt(index);
  }

  get optionsFormArray() {
    return this.categoryForm.get('options') as FormArray<
      FormGroup<ICategoryOptionForm>
    >;
  }

  editCagetory(): void {}

  addCategory(): void {
    const categoryCreateDTO =
      this.categoryFormService.mapFormToCreateCategoryDTO();
    this.categoryClient.create(categoryCreateDTO).subscribe({
      next: () => {
        this.messageService.onNotifySuccess(
          'category_created_successfully',
          1000
        );
      },
      error: () => {
        this.messageService.onNotifySuccess('category_creation_failed', 1000);
      },
    });
  }
}
