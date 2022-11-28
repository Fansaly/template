import { signin, signout, fetchUserInfo } from '@/api/user';
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

export default {
  state: {
    ...initialState,
  },
  mutations: {
    setUserInfo: (state, payload) => {
      state.info = { ...state.info, ...payload };
      uni.setStorageSync(USER_INFO, JSON.stringify(payload));
    },
    setAuth: (state, token) => {
      state.token = token;
      state.signed = !!token;
      if (token) {
        uni.setStorageSync(TOKEN_STORE, token);
      } else {
        uni.removeStorageSync(TOKEN_STORE);
      }
    },
    cleanUser: (state) => {
      state.info = {};
      uni.removeStorageSync(USER_INFO);
    },
  },
  actions: {
    signin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const params = pick(payload, ['avatarUrl', 'nickName', 'code']);

        signin(params)
          .then((res) => {
            if (!res.success) {
              throw { errMsg: res.message || '登录失败' };
            }

            const token = res.data;
            commit('setUserInfo', pick(payload, ['avatarUrl', 'nickName']));
            commit('setAuth', token);
            resolve({ token });
          })
          .catch((err) => {
            commit('setAuth', null);
            reject(err);
          });
      });
    },
    fetchUserInfo({ commit }, payload) {
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

            commit('setAuth', token);
            resolve();
          })
          .catch((err) => {
            commit('setAuth', null);
            reject(err);
          });
      });
    },
    signout({ commit }) {
      return new Promise((resolve, reject) => {
        signout()
          .then((res) => {
            if (!res.success) {
              throw { errMsg: res.message || '登出失败' };
            }

            commit('setAuth', null);
            commit('cleanUser');
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
