import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const COLLAPSE = trigger('collapse', [
  state('true', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
  state('false', style({ height: '0', visibility: 'hidden' })),
  transition('false => true', animate(200 + 'ms ease-in')),
  transition('true => false', animate(200 + 'ms ease-out')),
]);
