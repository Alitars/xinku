/*
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-28 10:07:22
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-29 16:46:39
 */
import axios from './http';

function login(){
  return axios.post('/login',{
    token:1234545,
  })
}

export default {
  login
}