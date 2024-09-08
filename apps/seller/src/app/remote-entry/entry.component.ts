import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'seller-seller-entry',
  template: `<seller-nx-welcome></seller-nx-welcome>`,
})
export class RemoteEntryComponent {}
