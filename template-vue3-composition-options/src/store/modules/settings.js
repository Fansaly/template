import { acceptHMRUpdate, defineStore } from 'pinia';

import { SETTINGS } from '@/config';
import { localStorage } from '@/utils';

const defaultState = {
  header: {
    fixed: true,
  },
  sidebar: {
    fixed: true,
    // 左侧导航收起状态
    collapsed: false,
  },
};

const initialState = (() => {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS));
  } catch (e) {
    return { ...defaultState };
  }
})();

const store = defineStore({
  id: 'settings',
  state: () => ({
    ...initialState,
  }),
  actions: {
    openSider() {
      this.sidebar.collapsed = false;
    },
    closeSider() {
      this.sidebar.collapsed = true;
    },
    toggleSider() {
      this.sidebar.collapsed = !this.sidebar.collapsed;
    },
    reset() {
      Object.assign(this, defaultState);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot));
}

export default store;
