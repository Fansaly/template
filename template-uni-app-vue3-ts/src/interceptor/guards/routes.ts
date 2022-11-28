import pagesJson from '@/pages.json';
import { absolutePath } from '@/utils';
import { PagesJSON, Pages, Page } from './types';

const { pages: rootPages = [], subPackages = [] } = pagesJson as unknown as PagesJSON;

const routes: Pages = [];
const authRoutes = new Map();
let signinRoute: null | Page = null;

const transform = ({ path, meta, ...rest }: Page) => {
  path = absolutePath(path);
  meta = meta || {};

  const route = { ...rest, path, meta };
  const { type, requiredAuth } = meta;

  if (type === 'signin') {
    signinRoute = route;
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

const tabBarNavigation = (pagesJson as unknown as PagesJSON).tabBar?.list ?? [];
const bottomNavigation = new Map(
  tabBarNavigation.map((item) => [absolutePath(item.pagePath), item]),
);

export { routes, authRoutes, signinRoute, bottomNavigation };
