/*
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-27 18:45:34
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-20 15:01:22
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';
import api from './request/api';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$api = api
// VueAMap.initAMapApiLoader({
//   key: '8472aefbec5cc754eb71745a4d9bedff',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   // v: '1.4.4'
// });
// Vue.use(VueAMap);
// if (process.env.NODE_ENV === 'production') {
//   /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
//   if (process.env.VUE_APP_FLAG === 'pro') {
//       //production 打包线上环境 build
//       axios.defaults.baseURL = 'https://xinkush.vipcaihui.cn';
//   } else {
//       //test 打包测试环境
//       axios.defaults.baseURL = 'http://115.29.65.123';
//   }
// } else {
//   //dev 开发环境
//   axios.defaults.baseURL = 'http://115.29.65.123';
// }
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
