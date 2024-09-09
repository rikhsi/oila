import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private notification: NzNotificationService,
    private translocoService: TranslocoService
  ) {}

  onNotifyError(text: string, nzDuration = 20000): string {
    return this.notification.error('', this.translocoService.translate(text), {
      nzDuration,
    }).messageId;
  }

  onNotifySuccess(text: string, nzDuration = 2000, title = ''): string {
    return this.notification.success(
      this.translocoService.translate(title),
      this.translocoService.translate(text),
      {
        nzDuration,
      }
    ).messageId;
  }

  onNotifyWarning(text: string, nzDuration = 10000): string {
    return this.notification.warning(
      '',
      this.translocoService.translate(text),
      {
        nzDuration,
      }
    ).messageId;
  }

  onNotifyInfo(text: string, nzDuration = 2000): string {
    return this.notification.info('', this.translocoService.translate(text), {
      nzDuration,
    }).messageId;
  }
}
