import type { PropType as VuePropType } from 'vue';
import { RouteMeta as RouterRouteMeta, RouteRecordRaw } from 'vue-router';

import { Response as Data } from '@/api/types';

declare global {
  type PropType<T> = VuePropType<T>;

  interface RouteMeta extends RouterRouteMeta {
    fullpath: string;
    icon?: string;
  }
  interface Route extends Omit<RouteRecordRaw, 'meta' | 'children'> {
    meta: RouteMeta;
    children?: Route[];
  }

  type Response = Data;
}
