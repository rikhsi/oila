import { EnumRole } from '../api/myoila.admin.api';
import { EnumProject } from '../api/myoila.core.api';
import { StaticOption } from '../typings';
import { createSelectItem } from '../utils';

export const SELECT_ITEMS_CONFIG: StaticOption = {
  project: createSelectItem(EnumProject),
  role: createSelectItem(EnumRole),
};
