import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  ICategoryForm,
  ICategoryOptionForm,
} from '../../../models/category-form';
import { map, Observable, withLatestFrom, catchError, of } from 'rxjs';
import {
  CategoryCreateDTO,
  OptionDTO,
  OptionsApiService,
} from 'libs/config/src/api/myoila.admin.api';
import { CustomSelectItem, StorageService } from '@oila/config';

@Injectable()
export class CategoryFormService {
  constructor(
    private optionsClient: OptionsApiService,
    private storageService: StorageService
  ) {}

  categoryForm = new FormGroup<ICategoryForm>({
    options: new FormArray([]),
    parentId: new FormControl<number>(null),
    translations: new FormControl(null),
  });

  selectedOptionsIds$ = this.categoryForm
    .get('options')
    .valueChanges.pipe(
      map((options) => options.map((option) => option.optionId))
    );

  allOptionsRes$ = this.optionsClient.getAll({ pageIndex: 0, pageSize: 1000 });

  allOptions$ = this.allOptionsRes$.pipe(
    map((res) => res.result.items),
    catchError(() => of([]))
  );

  selectableOptions$: Observable<CustomSelectItem[]> =
    this.selectedOptionsIds$.pipe(
      withLatestFrom(this.allOptions$),
      map(([selectedIds, allOptions]) => {
        const filteredOptions = this.filterIncludedOptions(
          selectedIds,
          allOptions
        );
        return this.mapOptionsToSelectItems(filteredOptions);
      })
    );

  createOptionFormGroup(
    optionId?: number,
    isCharacterstics?: boolean,
    isRequired?: boolean
  ): FormGroup<ICategoryOptionForm> {
    return new FormGroup<ICategoryOptionForm>({
      isCharacteristics: new FormControl<boolean>(isCharacterstics),
      isRequired: new FormControl<boolean>(isRequired),
      optionId: new FormControl<number>(optionId),
    });
  }

  mapFormToCreateCategoryDTO(): CategoryCreateDTO {
    const formValue = this.categoryForm.value;

    // const categoryCreateDTO: CategoryCreateDTO = {
    //   parentId: formValue.parentId,
    //   name: formValue.translations,
    //   options: formValue.options.map((option) => ({
    //     optionId: option.optionId,
    //     isRequired: !!option.isRequired,
    //     isCharacteristic: !!option.isCharacteristics,
    //   })),
    // };

    return null; // dto поменяли xd
  }

  private filterIncludedOptions(
    selectedOptionIds: number[],
    allOptions: OptionDTO[]
  ): OptionDTO[] {
    return allOptions.filter(
      (option) => !selectedOptionIds.includes(option.id)
    );
  }

  private mapOptionsToSelectItems(options: OptionDTO[]): CustomSelectItem[] {
    return options.map((option) => ({
      label: option.name[this.storageService.lang],
      value: option.id,
    }));
  }
}
