import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'dashboard',
  remotes: [],
  additionalShared: [
    {
      libraryName: '@angular/cdk',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@oila/config',
      sharedConfig: { singleton: true, eager: true, requiredVersion: false },
    },
    {
      libraryName: '@oila/ui',
      sharedConfig: { singleton: true, eager: true, requiredVersion: false },
    },
    {
      libraryName: '@angular/animations',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@angular/common',
      sharedConfig: { singleton: true, eager: true, requiredVersion: false },
    },
    {
      libraryName: '@angular/common/http',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: 'gridstack/dist/angular',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@angular/forms',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@angular/router',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: 'ngx-progressbar',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@angular/core',
      sharedConfig: { singleton: true, eager: true, requiredVersion: false },
    },
    {
      libraryName: '@angular/core/rxjs-interop',
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
      libraryName: '@angular/platform-browser',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@auth0/angular-jwt',
      sharedConfig: { singleton: true, eager: true },
    },
    {
      libraryName: '@ant-design/icons-angular',
      sharedConfig: { singleton: true, eager: true },
    },
  ],
};

export default config;
