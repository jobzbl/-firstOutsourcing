import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './request/api' // 导入api接口
import { Button } from 'vant';
import 'vant/lib/index.css';
import qs from 'qs';
import $ from 'jquery' 
Vue.prototype.qs = qs;
Vue.use(Button);

Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码
Vue.prototype.$ = $;
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
