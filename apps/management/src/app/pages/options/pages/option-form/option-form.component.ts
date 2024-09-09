import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslocoModule } from '@jsverse/transloco';
import { OptionFormService } from './services/option-form.service';
import { IOptionTerm } from '../../models/option-form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { optionTypes, optionViewTypes } from './data/option-types';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BreadCrumbComponent,
  InputDefaultComponent,
  SelectDefaultComponent,
  TranslationsInputComponent,
} from '@oila/ui';
import {
  CustomSelectItem,
  MANAGEMENT_ROUTE,
  MessageService,
  OPTION_PAGE,
} from '@oila/config';
import {
  OptionCreateDTO,
  OptionsApiService,
} from 'libs/config/src/api/myoila.admin.api';

@Component({
  selector: 'mg-option-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputDefaultComponent,
    SelectDefaultComponent,
    NzIconModule,
    TranslocoModule,
    NzButtonModule,
    TranslationsInputComponent,
    NzDividerModule,
    RouterModule,
    BreadCrumbComponent,
    TranslocoModule,
  ],
  templateUrl: './option-form.component.html',
  styleUrl: './option-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OptionFormService],
})
export class OptionFormComponent implements AfterViewInit {
  optionsTypes: CustomSelectItem[] = optionTypes;
  viewTypes: CustomSelectItem[] = optionViewTypes;
  optionForm = this.optionFormService.optionForm;

  optionId$ = this.route.params.pipe(
    map((params) => params[OPTION_PAGE.optionId])
  );

  option$ = this.optionId$.pipe(
    filter((optionId) => !!optionId),
    switchMap((optionId) => this.optionClient.getById(optionId)),
    map((res) => res.result),
    tap((option) => this.optionFormService.patchOptionForm(option)),
    catchError(() => {
      this.messageService.onNotifyError('option.error', 1000);
      return EMPTY;
    })
  );
  option = toSignal(this.option$);

  optionId = toSignal(this.optionId$);

  isEditMode = computed(() => this.optionId());
  constructor(
    private optionFormService: OptionFormService,
    private optionClient: OptionsApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    // effect(() => {
    //   if (this.isEditMode() && this.option()) {
    //     this.optionFormService.patchOptionForm(this.option());
    //     console.log(this.optionForm.value);
    //   }
    // });
  }

  addTerm(): void {
    const term = this.optionFormService.createOptionTermFormGroup();
    this.optionTermsFormArray.push(term);
  }

  goToOptions(): void {
    this.router.navigate([MANAGEMENT_ROUTE.options]);
  }
  ngAfterViewInit(): void {
    if (!this.isEditMode()) {
      this.addTerm();
    }
  }

  deleteTerm(i: number): void {
    this.optionTermsFormArray.removeAt(i);
  }

  get optionTermsFormArray() {
    return this.optionForm.get('terms') as FormArray<FormGroup<IOptionTerm>>;
  }

  save(): void {
    if (this.isEditMode()) {
      this.editOption();
    } else {
      this.addOption();
    }
  }

  private editOption(): void {}

  private addOption(): void {
    const optionCreateDTO: OptionCreateDTO =
      this.optionFormService.mapOptionToCreateDTO();
    this.optionClient.create(optionCreateDTO).subscribe({
      next: () => {
        this.messageService.onNotifySuccess('option.added', 1000);
      },
      error: () => {
        this.messageService.onNotifyError('option.error', 1000);
      },
    });
  }
}
