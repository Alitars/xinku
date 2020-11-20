/*
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-19 11:32:51
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-18 15:41:20
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import Homes from '../views/Homes.vue'
import companyInfo from '../views/admin/companyInfo.vue' //企业信息
import postManage from '../views/admin/postManage.vue' //职业管理
import sendPost from '../views/admin/sendPost.vue' //发布职位
import staffManage from '../views/admin/staffManage.vue' //员工管理
import salaryManage from '../views/admin/salaryManage.vue' //员工薪资管理
import bookAcount from '../views/admin/bookAcount.vue' //记账簿账号
import billInfo from '../views/admin/billInfo.vue' //账单信息
import cash from '../views/admin/cash.vue' //提现
import credit from '../views/admin/credit.vue' //充值
import invoice from '../views/admin/invoice.vue' //发票管理
import password from '../views/admin/password.vue' //修改密码
import payCode from '../views/admin/payCode.vue' //修改支付密码
import emailCode from '../views/admin/emailCode.vue' //修改邮箱
import contactsCode from '../views/admin/contactsCode.vue' //修改平台联系人
import extension from '../views/admin/extension.vue' //我的推广
import login from '../views/login.vue'  //登录
import forgetPass from '../views/forgetPass.vue'  //登录
import register from '../views/register.vue'  //登录
import editAcount from '../views/admin/editAcount.vue'  //修改对公账号
import forgetPay from '../views/admin/forgetPay.vue'  //修改对公账号
import jobApplication from '../views/admin/jobApplication.vue'  //职位申请详情



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    redirect: "/login",
    children:[
      {
        // 登录页面
        path: '/login',
        name: 'login',
        component: login
      },
      {
        // 忘记密码
        path: '/forgetPass',
        name: 'forgetPass',
        component: forgetPass
      },
      {
        // 注册
        path: '/register',
        name: 'register',
        component: register
      },
    ]
  },
  {
    path: "/Homes",
    name: "Homes",
    component: Homes,
    redirect: "/companyInfo", //当路由未匹配时重定向，可作初始化显示页面设置
    meta: { title: '首页' },
    children: [
      {
        //企业信息
        path: "/companyInfo",
        name: "companyInfo",
        meta: { title: '企业信息' },
        component: companyInfo
      },
      {
        //职业管理
        path: "/postManage",
        name: "postManage",
        component: postManage,
        meta: { title: '职业管理' }
      },
      {
        //发布职位
        path: "/sendPost",
        name: "sendPost",
        component: sendPost,
        meta: { title: '发布职位' }
      },
      {
        //员工管理
        path: "/staffManage",
        name: "staffManage",
        component: staffManage,
        meta: { title: '员工管理' }
      },
      {
        //员工薪资管理
        path: "/salaryManage",
        name: "salaryManage",
        component: salaryManage,
        meta: { title: '员工薪资管理' }
      },
      {
        //记账簿账号
        path: "/bookAcount",
        name: "bookAcount",
        component: bookAcount,
        meta: { title: '记账簿账号' }
      },
      {
        //账单信息
        path: "/billInfo",
        name: "billInfo",
        component: billInfo,
        meta: { title: '账单信息' }
      },
      {
        //提现
        path: "/cash",
        name: "cash",
        component: cash,
        meta: { title: '提现' }
      },
      {
        //充值
        path: "/credit",
        name: "credit",
        component: credit,
        meta: { title: '充值' }
      },
      {
        //发票管理
        path: "/invoice",
        name: "invoice",
        component: invoice,
        meta: { title: '发票管理' }
      },
      {
        //修改密码
        path: "/password",
        name: "password",
        component: password,
        meta: { title: '修改密码' }
      },
      {
        //修改支付密码
        path: "/payCode",
        name: "payCode",
        component: payCode,
        meta: { title: '修改支付密码' }
      },
      {
        //修改邮箱
        path: "/emailCode",
        name: "emailCode",
        component: emailCode,
        meta: { title: '修改邮箱' }
      },
      {
        //修改平台联系人
        path: "/contactsCode",
        name: "contactsCode",
        component: contactsCode,
        meta: { title: '修改平台联系人' }
      },
      {
        //我的推广
        path: "/extension",
        name: "extension",
        component: extension,
        meta: { title: '我的推广' }
      },
      {
        //修改对公账号
        path: "/editAcount",
        name: "editAcount",
        component: editAcount,
        meta: { title: '修改对公账号' }
      },
      {
        //忘记支付密码
        path: "/forgetPay",
        name: "forgetPay",
        component: forgetPay,
        meta: { title: '忘记支付密码' }
      },
      {
        // 职位申请详情
        path: "/jobApplication",
        name: "jobApplication",
        component: jobApplication,
        meta: { title: '职位申请详情' }
      }
      
    ]
  }
]

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};


const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router
