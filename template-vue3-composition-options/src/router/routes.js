import { generateMapTreeRoutes } from './helper';

export const commRoutes = [
  {
    meta: { title: '404', hidden: true },
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404'),
  },
  {
    meta: { title: '注册', hidden: true },
    name: 'Signup',
    path: '/signup',
    component: () => import('@/pages/Sign/Signup'),
  },
  {
    meta: { title: '登录', hidden: true },
    name: 'Signin',
    path: '/signin',
    component: () => import('@/pages/Sign/Signin'),
  },
];

export const standRoutes = [
  {
    meta: { title: '首页' },
    name: 'Home',
    path: '/',
    redirect: 'dashboard',
    component: () => import('@/layout/Default'),
    children: [
      {
        meta: { title: '概览', icon: 'unordered-list-outlined' },
        name: 'Dashboard',
        path: 'dashboard',
        component: () => import('@/pages/Home'),
      },
    ],
  },
  {
    meta: { title: '示例' },
    name: 'examples',
    path: '/examples',
    redirect: 'composition',
    component: () => import('@/layout/Default'),
    children: [
      {
        meta: { title: 'Composition', icon: 'align-left-outlined' },
        name: 'composition',
        path: 'composition',
        component: () => import('@/pages/Examples/Composition'),
      },
      {
        meta: { title: 'Options', icon: 'align-center-outlined' },
        name: 'options',
        path: 'options',
        component: () => import('@/pages/Examples/Options/index.vue'),
      },
    ],
  },
];

export const allowedRoutes = (() => {
  const routes = commRoutes.filter((v) => v.path.indexOf('*') === -1);
  return generateMapTreeRoutes(routes);
})();
