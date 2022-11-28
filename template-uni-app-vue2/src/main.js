import '@/interceptor';

import Vue from 'vue';
import uView from 'uview-ui';

import App from '@/App';
import store from '@/store';

App.mpType = 'app';
Vue.config.productionTip = false;
Vue.prototype.$store = store;

Vue.use(uView);

const app = new Vue({ store, ...App });

app.$mount();
