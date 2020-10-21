import Vue from 'vue';
import '@/class-component-hooks';
import './config/externalPlugins';
import './config/globalComponents';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import './assets/style/style';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
