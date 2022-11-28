import { acceptHMRUpdate, defineStore } from 'pinia';

import { fetchUserInfo, signin, signout } from '@/api/user';
import { TOKEN_STORE, USER_INFO } from '@/config';
import { pick } from '@/utils';

const initialState = (() => {
  let info = {
    avatarUrl: '',
    nickName: '',
  };
  let token = null;
  let signed = false;

  try {
    info = JSON.parse(uni.getStorageSync(USER_INFO));
    token = uni.getStorageSync(TOKEN_STORE);
    signed = !!token;
  } catch (e) {
    // Swallow the exceptions.
  }

  return { info, token, signed };
})();

const store = defineStore({
  id: 'user',
  state: () => ({
    ...initialState,
  }),
  actions: {
    setUserInfo(payload) {
      this.info = { ...this.info, ...payload };
      uni.setStorageSync(USER_INFO, JSON.stringify(payload));
    },
    setAuth(token) {
      this.token = token;
      this.signed = !!token;
      if (token) {
        uni.setStorageSync(TOKEN_STORE, token);
      } else {
        uni.removeStorageSync(TOKEN_STORE);
      }
    },
    cleanUser() {
      this.info = {};
      uni.removeStorageSync(USER_INFO);
    },
    signin(payload) {
      return new Promise((resolve, reject) => {
        const params = pick(payload, ['avatarUrl', 'nickName', 'code']);

        signin(params)
          .then((res) => {
            if (!res.success) {
              throw { errMsg: res.message || '登录失败' };
            }

            const token = res.data;
            this.setUserInfo(pick(payload, ['avatarUrl', 'nickName']));
            this.setAuth(token);
            resolve({ token });
          })
          .catch((err) => {
            this.setAuth(null);
            reject(err);
          });
      });
    },
    fetchUserInfo(payload) {
      return new Promise((resolve, reject) => {
        const token = uni.getStorageSync(TOKEN_STORE);
        if (!token) {
          throw { errMsg: '请先登录' };
        }

        fetchUserInfo(payload)
          .then((res) => {
            if (!res.success) {
              throw { errMsg: res.message || '获取用户信息失败' };
            }

            this.setAuth(token);
            resolve();
          })
          .catch((err) => {
            this.setAuth(null);
            reject(err);
          });
      });
    },
    signout() {
      return new Promise((resolve, reject) => {
        signout()
          .then((res) => {
            if (!res.success) {
              throw { errMsg: res.message || '登出失败' };
            }

            this.setAuth(null);
            this.cleanUser();
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot));
}

export default store;
