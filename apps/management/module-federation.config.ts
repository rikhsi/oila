import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'management',
  exposes: {
    './Routes': 'apps/management/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
