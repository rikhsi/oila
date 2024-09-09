import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectorService {
  private readonly userAgent: string = navigator.userAgent.toLowerCase();
  private readonly platform: string = navigator.platform.toLowerCase();

  getBrowserName(): string {
    if (this.isFirefox()) return 'Firefox';
    if (this.isChrome()) return 'Chrome';
    if (this.isSafari()) return 'Safari';
    if (this.isOpera()) return 'Opera';
    if (this.isEdge()) return 'Edge';
    if (this.isIE()) return 'Internet Explorer';
    return 'Unknown';
  }

  getDeviceType(): string {
    if (this.isSmartphone()) return 'Smartphone';
    if (this.isTablet()) return 'Tablet';
    if (this.isDesktop()) return this.isLaptop() ? 'Laptop' : 'Desktop';
    return 'Unknown';
  }

  private isFirefox(): boolean {
    return /firefox|fxios/.test(this.userAgent);
  }

  private isChrome(): boolean {
    return (
      /chrome|chromium|crios/.test(this.userAgent) &&
      !this.isOpera() &&
      !this.isEdge()
    );
  }

  private isSafari(): boolean {
    return /safari/.test(this.userAgent) && !this.isChrome();
  }

  private isOpera(): boolean {
    return /opr|opera/.test(this.userAgent);
  }

  private isEdge(): boolean {
    return /edg/.test(this.userAgent);
  }

  private isIE(): boolean {
    return /msie|trident/.test(this.userAgent);
  }

  private isSmartphone(): boolean {
    return /android|iphone|ipod|blackberry|opera mini|opera mobi|iemobile|mobile/.test(
      this.userAgent
    );
  }

  private isTablet(): boolean {
    return /ipad|android(?!.*mobile)|tablet/.test(this.userAgent);
  }

  private isDesktop(): boolean {
    return !this.isSmartphone() && !this.isTablet();
  }

  private isLaptop(): boolean {
    return /win|mac|linux/.test(this.platform);
  }
}
