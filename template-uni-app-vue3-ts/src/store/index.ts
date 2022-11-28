import { createPinia } from 'pinia';

const store = createPinia();

export default store;

export { default as useAppStore } from './modules/app';
export { default as useUserStore } from './modules/user';
