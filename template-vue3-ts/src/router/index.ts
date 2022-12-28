import { createRouter, createWebHistory } from 'vue-router';

import { useRoutesStore, useUserStore } from '@/store';

import { commRoutes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: commRoutes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to) => {
  const routesStore = useRoutesStore();
  const userStore = useUserStore();

  if (routesStore.allowedRoutes.map.has(to.path)) {
    return true;
  }

  const signinRoute = {
    path: '/signin',
    query: { redirect: to.fullPath },
  };

  if (!userStore.token) {
    if (!routesStore.allowedRoutes.map.has(signinRoute.path)) {
      console.warn('could not find the signin route');
      return false;
    }

    return signinRoute;
  }

  try {
    await userStore.fetchUserInfo();
  } catch {
    routesStore.restore();
    return signinRoute;
  }

  if (routesStore.authRoutes.tree.length > 0) {
    return true;
  }
  try {
    await routesStore.setAuthRoutes();
    return to.fullPath;
  } catch {
    routesStore.restore();
    return signinRoute;
  }
});

export * from './helper';
export default router;
