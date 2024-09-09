import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mg-translation-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './translation-form.component.html',
  styleUrl: './translation-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationFormComponent {}
