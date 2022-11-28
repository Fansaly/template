import '@/interceptor';
import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';

import App from '@/App.vue';
import store from '@/store';

export function createApp() {
  const app = createSSRApp(App);

  app.use(store);

  return { app, Pinia };
}
