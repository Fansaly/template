import { createPinia } from 'pinia';

const store = createPinia();

export default store;

export { default as useRoutesStore } from './modules/routes';
export { default as useSettingsStore } from './modules/settings';
export { default as useUserStore } from './modules/user';
