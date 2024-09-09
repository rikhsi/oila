import { NgComponentOutlet } from '@angular/common';
import { WritableSignal } from '@angular/core';
import { CustomSelectItem } from '@oila/config/typings';

export type StaticOption = { [key in string]: CustomSelectItem[] };

export interface StaticOptionComponent extends NgComponentOutlet {
  options: WritableSignal<CustomSelectItem[]>;
}
