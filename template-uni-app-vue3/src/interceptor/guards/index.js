import { useUserStore } from '@/store';
import { authRoutes, signinRoute, bottomNavigation } from './routes';
import { resolvePath, transformPath } from '@/utils';

export const guards = (args, action = 'navigateTo') => {
  const signinPath = signinRoute.path;
  const userStore = useUserStore();
  const state = transformPath(args.url);
  const path = resolvePath(state);
  const isAuthRoute = authRoutes.has(path);

  const route = { ...args, ...state, to: path, isAuthRoute, signed: userStore.signed };

  // 未登录用户访问需要授权的页面时，重定向至登录页面
  if (signinPath && !userStore.signed && isAuthRoute) {
    if (state.from === signinPath && action === 'navigateTo') {
      action = 'redirectTo';
    }

    if (bottomNavigation.has(signinPath)) {
      action = 'switchTab';
    }

    uni[action]({
      url: signinPath,
      success: () => {
        setTimeout(() => {
          uni.showModal({
            title: '提醒',
            content: `请登录后继续 (●'◡'●)`,
            showCancel: false,
            confirmText: '好的',
          });
        }, 80);
      },
    });

    return false;
  }

  return route;
};

export default function () {
  ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'].forEach((action) => {
    uni.addInterceptor(action, {
      invoke: (args) => {
        return guards(args, action);
      },
    });
  });
}
