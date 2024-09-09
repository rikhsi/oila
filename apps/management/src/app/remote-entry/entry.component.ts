import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  selector: 'mg-management-entry',
  template: `<router-outlet></router-outlet>`,
})
export class RemoteEntryComponent {}
