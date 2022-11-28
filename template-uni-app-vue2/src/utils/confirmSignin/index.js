import store from '@/store';
import { signinRoute } from '@/interceptor/guards/routes';
import { getCurrentPagePath } from '../path';

export const confirmSignin = async ({ success, fail, complete, ...options } = {}) => {
  const appStore = store.state.app;
  const userStore = store.state.user;

  store.commit('signout');

  if (appStore.confirmModalOpen) {
    return Promise.reject({ errMsg: '确认登录窗口已打开' });
  }

  const currentPath = getCurrentPagePath();
  const signinPath = signinRoute.path;

  if (!signinPath) {
    return Promise.reject({ errMsg: '登录页面不存在' });
  }

  if (currentPath === signinPath) {
    return Promise.reject({ errMsg: '登录页不弹窗提醒' });
  }

  return new Promise((resolve, reject) => {
    store.commit('openConfirmModal');

    const title = userStore.token
      ? '登录已过期，是否重新登录？'
      : '您还未登录，是否前去登录？';

    uni.showModal({
      title,
      ...options,
      success: (res) => {
        if (typeof success === 'function') {
          success(res);
        }

        if (res.confirm) {
          if (currentPath !== signinPath) {
            store.commit('cleanUser');
            uni.redirectTo({ url: signinPath });
          }
        }

        if (res.confirm || res.cancel) {
          store.commit('closeConfirmModal');
        }

        resolve();
      },
      fail: (error) => {
        if (typeof fail === 'function') {
          fail(error);
        }
        reject(error);
      },
      complete: (res) => {
        if (typeof complete === 'function') {
          complete(res);
        }
      },
    });
  });
};
