import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const SHRINK_TEXT = trigger('shrinkText', [
  state(
    'false',
    style({
      width: '*',
    })
  ),
  state(
    'true',
    style({
      width: '35px',
    })
  ),
  transition('false => true', [
    animate(
      '0.5s ease-in-out',
      style({
        width: '35px',
      })
    ),
    animate(
      '0.5s',
      style({
        opacity: 0,
      })
    ),
  ]),
  transition('true => false', [
    animate(
      '0.5s ease-in-out',
      style({
        width: '*',
        opacity: 1,
      })
    ),
  ]),
]);
