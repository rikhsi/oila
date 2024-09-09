import { InjectionToken } from '@angular/core';
import { StaticOption } from '../typings';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const SELECT_ITEM_TOKEN = new InjectionToken<StaticOption>('SELECT_ITEM_TOKEN');