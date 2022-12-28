import Cookies from 'js-cookie';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { Signin } from '@/api/types';
import { fetchUserInfo, signin, signout } from '@/api/user';
import { TOKEN_STORE } from '@/config';

import useRoutesStore from './routes';

interface State {
  info: Record<string, any>;
  token?: string;
}

const initialState: State = (() => {
  const info = {};
  const token = Cookies.get(TOKEN_STORE);

  return { info, token };
})();

const store = defineStore({
  id: 'user',
  state: (): State => ({
    ...initialState,
  }),
  actions: {
    setUser(payload: State) {
      const token = payload.token || this.token;
      this.info = payload.info || this.info;
      this.token = token;
      Cookies.set(TOKEN_STORE, token as string);
    },
    cleanup() {
      this.info = {};
      this.token = undefined;
      Cookies.remove(TOKEN_STORE);
    },
    async signin(payload: Signin) {
      try {
        const res = await signin(payload);
        if (res.code !== 0) {
          throw new Error(res.message || '登录失败');
        }

        let token, info;

        try {
          ({ token, ...info } = res.data || {});
        } catch {
          // Swallow the exceptions.
        }

        if (!token) {
          throw new Error('登录失败');
        }

        this.setUser({ token, info });
        return Promise.resolve(res);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async signout() {
      try {
        const routesStore = useRoutesStore();

        const res = await signout();
        if (res.code !== 0) {
          throw new Error(res.message || '登出失败');
        }

        routesStore.restore();
        this.cleanup();

        return Promise.resolve(res);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async fetchUserInfo() {
      try {
        const res = await fetchUserInfo();
        // -2 未登录
        // -3 登录过期
        if ([-2, -3].includes(res.code)) {
          throw new Error(res.message || '未登录或者登录信息已过期');
        }

        if (res.code !== 0) {
          throw new Error(res.message || '用户信息获取失败');
        }

        this.setUser({ info: res.data });
        return Promise.resolve(res);
      } catch (error) {
        this.cleanup();
        return Promise.reject(error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot));
}

export default store;
