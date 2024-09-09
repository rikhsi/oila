import {
  AfterViewInit,
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  ElementRef,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AuthService } from '@oila/config/services';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { doesUserHasPermission } from '@oila/config/utils/permission';

@Directive({
  selector: '[uiPermission]',
  standalone: true,
})
export class PermissionDirective implements AfterViewInit {
  permissions = input<number[]>([], { alias: 'uiPermission' });
  permission$ = toObservable<number[]>(this.permissions);

  constructor(
    private authService: AuthService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<ElementRef<HTMLElement>>,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.permission$
      .pipe(
        distinctUntilChanged((prev, curr) => prev.join(',') === curr.join(',')),
        map((permissions) =>
          doesUserHasPermission(this.authService.permissions, permissions)
        ),
        tap((isAlloved) => {
          if (isAlloved) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
