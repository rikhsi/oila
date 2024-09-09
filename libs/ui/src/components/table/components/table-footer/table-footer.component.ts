import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'ui-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrl: './table-footer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzDropDownModule,
    NzSkeletonModule,
    NzIconDirective,
    NzButtonModule,
    NzPaginationModule,
    TranslocoDirective,
  ],
})
export class TableFooterComponent {
  total = input<number>();
  pageSizeOption = input<number[]>([10, 20, 40, 50]);
  pageSize = model<number>(10);
  pageIndex = model<number>(1);
  loading = input<boolean>();

  changePageSize(size: number): void {
    this.pageSize.set(size);
  }
}
