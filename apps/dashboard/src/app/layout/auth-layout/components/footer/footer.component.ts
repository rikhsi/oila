import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'dash-footer',
  standalone: true,
  imports: [CommonModule, TranslocoModule, NzButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less',
})
export class FooterComponent {
  phone: string = '+998 (99) 999-99-99';
}
