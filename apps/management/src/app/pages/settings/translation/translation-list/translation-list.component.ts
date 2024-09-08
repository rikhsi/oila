import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mg-translation-list',
  standalone: true,
  imports: [],
  templateUrl: './translation-list.component.html',
  styleUrl: './translation-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationListComponent {

}
