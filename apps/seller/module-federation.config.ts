import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'seller',
  exposes: {
    './Routes': 'apps/seller/src/app/remote-entry/entry.routes.ts',
  }
};

export default config;
