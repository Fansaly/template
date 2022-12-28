import { RouteRecordRaw } from 'vue-router';

import { dfs, DFSState } from '@/utils';

type State = DFSState<Route>;

export const generateRoutes = (
  routes: RouteRecordRaw[] | Route[],
  callback?: (route: Route, state?: State) => void,
): Route[] => {
  return dfs<RouteRecordRaw | Route, Route>(routes, (route, state = {}) => {
    if (state.isChild && route.path && route.path !== '/') {
      route.path = route.path.replace(/^\//, '');
    }

    let fullpath = route.path;
    if (state.isChild && !/^(http(s)?:)?\/\//.test(fullpath)) {
      let parentpath = state.parent?.meta?.fullpath || '';
      parentpath = parentpath === '/' ? '' : parentpath;
      fullpath = parentpath + '/' + fullpath;
    }

    if (!route.meta) {
      route.meta = { fullpath };
    } else {
      route.meta.fullpath = fullpath;
    }

    const redirect = state.parent?.redirect;
    if (
      typeof redirect === 'string' &&
      !/^\//.test(redirect) &&
      redirect === fullpath.split('/').pop()
    ) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.parent!.redirect = fullpath;
    }

    callback?.(route, state);
  });
};

export const cloneRoutes = (source: Route[] = []) => {
  const result: Route[] = [];

  if (!Array.isArray(source)) {
    return result;
  }

  const reserved = ['alias', 'aliasOf', 'fullPath', 'meta', 'name', 'path', 'redirect'];

  source.forEach((item) => {
    const data: Route = {
      path: item.path,
      meta: item.meta,
    };

    (Object.keys(item) as Array<keyof Route>).forEach((key) => {
      if (reserved.includes(key)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data[key] = item[key];
      }
    });

    data.children = cloneRoutes(item.children);

    if (data.children.length === 0) {
      delete data.children;
    }

    result.push(data);
  });

  return result;
};

export const generateMapTreeRoutes = (
  source: RouteRecordRaw[] | Route[],
  callback?: (route: Route, state?: State) => void,
): {
  map: Map<string, Route>;
  tree: Route[];
  routes: RouteRecordRaw[];
} => {
  const routes = generateRoutes(source) as RouteRecordRaw[];

  const tree = cloneRoutes(routes as Route[]);
  const map = new Map();

  dfs<Route, Route>(tree, (route, state) => {
    callback?.(route, state);

    if (route.meta.fullpath) {
      map.set(route.meta.fullpath, route);
    }
  });

  return { map, tree, routes };
};
