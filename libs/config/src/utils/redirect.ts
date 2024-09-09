import { EnumRole } from '../api/myoila.admin.api';
import { ERROR_ROUTE, ROOT_ROUTE } from '../constants';

export function redirectByRole(roleId: number): string[] {
  switch (roleId) {
    case EnumRole.Seller:
      return [ROOT_ROUTE.seller];

    case EnumRole.Client:
      return [ROOT_ROUTE.error, ERROR_ROUTE.accessDenied];

    default:
      return [ROOT_ROUTE.management];
  }
}
