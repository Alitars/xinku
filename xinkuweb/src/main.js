/*
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-27 18:45:34
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-28 10:58:34
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
