import { dfs } from '@/utils';

export const generateRoutes = (routes, callback) => {
  return dfs(routes, (route, state = {}) => {
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
      state.parent.redirect = fullpath;
    }

    callback?.(route, state);
  });
};

export const cloneRoutes = (source = []) => {
  const result = [];

  if (!Array.isArray(source)) {
    return result;
  }

  const reserved = ['alias', 'aliasOf', 'fullPath', 'meta', 'name', 'path', 'redirect'];

  source.forEach((item) => {
    const data = {
      path: item.path,
      meta: item.meta,
    };

    Object.keys(item).forEach((key) => {
      if (reserved.includes(key)) {
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

export const generateMapTreeRoutes = (source, callback) => {
  const routes = generateRoutes(source);

  const tree = cloneRoutes(routes);
  const map = new Map();

  dfs(tree, (route, state) => {
    callback?.(route, state);

    if (route.meta.fullpath) {
      map.set(route.meta.fullpath, route);
    }
  });

  return { map, tree, routes };
};
