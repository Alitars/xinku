/*
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-28 10:07:33
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-29 16:40:05
 */
import axios from 'axios';
import qs from 'qs';
 
// 根据环境变量区分接口地址
switch(process.env.NODE_ENV){
    case "production":
      axios.defaults.baseURL = 'https://xinkush.vipcaihui.cn';
      break;
    case "test":
      axios.defaults.baseURL = 'http://115.29.65.123';
      break;
    default:
      axios.defaults.baseURL = 'http://115.29.65.123';
}
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data =>qs.stringify(data)


axios.interceptors.request.use(config=>{
  let token = localStorage.getItem('token');
  token&&(config.headers.Authorization = token);
  return config
}),error=>{
  return Promise.reject(error)
};

//添加响应拦截器
axios.interceptors.response.use(response=>{
  return response.data;
}),error=>{
  let {response} = error
  if(response){
    // 服务器返回结果
  }else{
    if(!window.navigator.onLine){
      // 断网 跳转断网
      return;
    }
    return Promise.reject(error);
  }
}

export default axios;