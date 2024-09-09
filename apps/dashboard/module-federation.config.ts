import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'dashboard',
  remotes: [],
  additionalShared: [
    {
      libraryName: '@angular/cdk',
      sharedConfig: { singleton: true, strictVersion: true },
    },
    {
      libraryName: '@angular/common/http',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@angular/core/rxjs-interop',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@angular/common',
      sharedConfig: { singleton: true, eager: true, requiredVersion: false },
    },
    {
      libraryName: '@angular/core',
      sharedConfig: { singleton: true, eager: true, requiredVersion: false },
    },
    {
      libraryName: '@angular/animations',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@angular/animations',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@angular/router',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@angular/forms',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@jsverse/transloco',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: 'ng-zorro-antd',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: 'ngx-mask',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: 'ngx-progressbar',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@angular/platform-browser',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@auth0/angular-jwt',
      sharedConfig: { singleton: true, eager: true },
    },
  ],
};

export default config;
