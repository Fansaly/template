import { acceptHMRUpdate, defineStore } from 'pinia';

import { fetchUserMenus } from '@/api/user';
import router, { generateMapTreeRoutes } from '@/router';
import { allowedRoutes, standRoutes } from '@/router/routes';
import { pick } from '@/utils';

interface Routes {
  map: Map<string, Route>;
  tree: Route[];
}

interface State {
  allowedRoutes: Routes;
  authRoutes: Routes;
}

const initialState: State = {
  allowedRoutes: pick(allowedRoutes, ['map', 'tree']),
  authRoutes: { map: new Map(), tree: [] },
};

const store = defineStore({
  id: 'routes',
  state: (): State => ({
    ...initialState,
  }),
  actions: {
    setRoutes(routes: Routes) {
      this.authRoutes = routes;
    },
    restore() {
      const allRoutes = router.getRoutes();
      const authRoutesMap = this.authRoutes.map;

      allRoutes.forEach((route) => {
        const name = route.name;
        const fullpath = (route.meta?.fullpath as string) || '';

        if (name && fullpath && authRoutesMap.has(fullpath)) {
          router.removeRoute(name);
        }
      });

      this.authRoutes = { ...initialState.authRoutes };
    },
    async setAuthRoutes() {
      try {
        const res = await fetchUserMenus();

        if (res.code !== 0) {
          throw new Error(res.message || '获取菜单失败');
        }

        if (!Array.isArray(res.data)) {
          res.data = [];
        }

        if (res.data.length === 0 && standRoutes.length === 0) {
          throw new Error('请至少设置 1 个菜单');
        }

        const result = generateMapTreeRoutes([...standRoutes, ...res.data]);

        result.routes.forEach((route) => router.addRoute(route));
        this.setRoutes(pick(result, ['map', 'tree']));

        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot));
}

export default store;
