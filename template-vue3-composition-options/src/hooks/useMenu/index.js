import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useRoutesStore } from '@/store';

export const useMenu = () => {
  const route = useRoute();
  const routesStore = useRoutesStore();

  const matchedRoutes = computed(() => route.matched);
  const paths = computed(() => {
    return matchedRoutes.value.map((item) => item.meta.fullpath);
  });

  const openKeys = computed(() => paths.value.slice(0, -1));
  const selectedKeys = computed(() => paths.value);

  const headerMenus = computed(() => routesStore.authRoutes.tree);

  const sidebarMenus = computed(() => {
    const mainRoute = matchedRoutes.value[0];
    const fullpath = mainRoute.meta.fullpath;
    return routesStore.authRoutes.map.get(fullpath)?.children || [];
  });

  return { headerMenus, sidebarMenus, openKeys, selectedKeys };
};
