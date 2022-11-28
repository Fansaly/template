import pagesJson from '@/pages.json';
import { absolutePath } from '@/utils';

const { pages: rootPages = [], subPackages = [] } = pagesJson;

const routes = [];
const authRoutes = new Map();
const signinRoute = {};

const transform = ({ path, meta, ...rest }) => {
  path = absolutePath(path);
  meta = meta || {};

  const route = { ...rest, path, meta };
  const { type, requiredAuth } = meta;

  if (type === 'signin') {
    Object.assign(signinRoute, route);
  }

  if (requiredAuth) {
    authRoutes.set(route.path, route);
  }

  return route;
};

rootPages.forEach((item) => {
  routes.push(transform(item));
});
subPackages.forEach(({ root, pages }) => {
  pages.forEach((item) => {
    item.path = `${root}/${item.path}`;
    routes.push(transform(item));
  });
});

const tabBarNavigation = (pagesJson.tabBar && pagesJson.tabBar.list) || [];
const bottomNavigation = new Map(
  tabBarNavigation.map((item) => [absolutePath(item.pagePath), item]),
);

export { routes, authRoutes, signinRoute, bottomNavigation };
