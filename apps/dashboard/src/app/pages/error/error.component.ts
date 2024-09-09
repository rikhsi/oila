import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseLayoutService } from '@dash/layout/base-layout/base-layout.service';
import { TranslocoDirective } from '@jsverse/transloco';
import { ERROR_ROUTE, ROOT_ROUTE } from '@oila/config';
import { AuthService } from '@oila/config';
import { redirectByRole } from '@oila/config';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule, NzResultStatusType } from 'ng-zorro-antd/result';
import { map } from 'rxjs';

@Component({
  selector: 'ped-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzResultModule, NzButtonModule, TranslocoDirective],
})
export class ErrorComponent implements OnInit, OnDestroy {
  param = toSignal<ERROR_ROUTE>(
    this.route.params.pipe(map((params) => Object.values(params)[0]))
  );

  errorType = computed<NzResultStatusType>(() => {
    switch (this.param()) {
      case ERROR_ROUTE.accessDenied:
        return '403';

      default:
        return '404';
    }
  });

  errorTitle = computed<string>(() => {
    switch (this.param()) {
      case ERROR_ROUTE.accessDenied:
        return 'error.access_denied.title';

      default:
        return 'error.not_found.title';
    }
  });

  errorInfo = computed<string>(() => {
    switch (this.param()) {
      case ERROR_ROUTE.accessDenied:
        return 'error.access_denied.info';

      default:
        return 'error.not_found.info';
    }
  });

  constructor(
    private route: ActivatedRoute,
    private blService: BaseLayoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  onNavigate(): void {
    const url = redirectByRole(this.authService.roleId);

    if (url.includes(ROOT_ROUTE.error)) {
      this.authService.signOut();
    } else {
      this.router.navigate(url);
    }
  }

  ngOnInit(): void {
    this.blService.isEmpty = true;
  }

  ngOnDestroy(): void {
    this.blService.isEmpty = false;
  }
}
