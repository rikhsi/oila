import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { TranslocoPipe } from '@jsverse/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { BreadcrumbItem } from './models/breadcrumb-item';

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzBreadCrumbModule,
    TranslocoPipe,
    NzIconDirective,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadCrumbComponent {
  breadcrumbs = signal<BreadcrumbItem[]>([]);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.initRouteEvent();
  }

  private initRouteEvent(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.setItems();
      });

    this.setItems();
  }

  private setItems(): void {
    this.breadcrumbs.set(this.createBreadcrumbs(this.activatedRoute.root));
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): BreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;

    // Clone the array to ensure a new reference is created
    const newBreadcrumbs = [...breadcrumbs];

    if (children.length === 0) {
      return newBreadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      let breadcrumb = child.snapshot.data['breadcrumb'];

      if (breadcrumb) {
        const breadcrumbExists = newBreadcrumbs.some(
          (item) => item.label === breadcrumb.label && item.url === url
        );

        if (!breadcrumbExists) {
          newBreadcrumbs.push({
            label: breadcrumb.label,
            url,
            icon: breadcrumb?.icon,
          });
        }
      }

      return this.createBreadcrumbs(child, url, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
