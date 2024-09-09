import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  Renderer2,
  input,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Directive({
  selector: '[uiSkeleton]',
  standalone: true,
})
export class SkeletonDirective implements AfterViewInit {
  isLoading = input<boolean>();

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private destroyRef: DestroyRef,
    private injector: Injector
  ) {}

  ngAfterViewInit(): void {
    this.toggleLoading();
  }

  private toggleLoading(): void {
    toObservable(this.isLoading, { injector: this.injector })
      .pipe(
        tap((state) => {
          this.toggleAnimation(state);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private toggleAnimation(state: boolean): void {
    if (state) {
      this.renderer.addClass(this.el.nativeElement, 'skeleton');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'skeleton');
    }
  }
}
