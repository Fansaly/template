import { useAppStore, useUserStore } from '@/store';
import { signinRoute } from '@/interceptor/guards/routes';
import { getCurrentPagePath } from '../path';

export const confirmSignin = async ({
  success,
  fail,
  complete,
  ...options
}: UniApp.ShowModalOptions = {}) => {
  const appStore = useAppStore();
  const userStore = useUserStore();

  userStore.signout();

  if (appStore.confirmModalOpen) {
    return Promise.reject({ errMsg: '确认登录窗口已打开' });
  }

  const currentPath = getCurrentPagePath();
  const signinPath = signinRoute?.path;

  if (!signinPath) {
    return Promise.reject({ errMsg: '登录页面不存在' });
  }

  if (currentPath === signinPath) {
    return Promise.reject({ errMsg: '登录页不弹窗提醒' });
  }

  return new Promise<void>((resolve, reject) => {
    appStore.openConfirmModal();

    const title = userStore.token
      ? '登录已过期，是否重新登录？'
      : '您还未登录，是否前去登录？';

    uni.showModal({
      title,
      ...options,
      success: (res) => {
        success?.(res);

        if (res.confirm) {
          if (currentPath !== signinPath) {
            userStore.cleanUser();
            uni.redirectTo({ url: signinPath });
          }
        }

        if (res.confirm || res.cancel) {
          appStore.closeConfirmModal();
        }

        resolve();
      },
      fail: (error) => {
        fail?.(error);
        reject(error);
      },
      complete: (res) => {
        complete?.(res);
      },
    });
  });
};
