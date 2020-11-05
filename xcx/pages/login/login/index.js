//index.js
//获取应用实例
const {
  config
} = getApp()
var app = getApp()
const {
  checkPhone
} = require("../../../utils/util.js")
const {
  login
} = require("../../../services/login.js")

Page({
  data: {
    form: {
      phone: "",
      password: "",
      // captchaVal: "",
      rememberPwd: false
    },
    active: 0,
    // codeImgUrl: "",
    phoneErrMsg: "",
    passwordErrMsg: "",
    // captchaValErrMsg: ""
  },

  /**
   * 获取图片验证码
   */
  // getCaptcha() {
  //   this.setData({
  //     codeImgUrl: `${config.domain}${config.context_person}/person_/personal/captcha.jpg?random=${Math.random()}`
  //   })
  // },
  // 是否选中记住密码
  remmberChange(e){
    this.setData({
      ['form.rememberPwd']: !this.data.form.rememberPwd
    })
  },
  onLoad: function() {
    // this.getCaptcha();
    const _this = this;
    wx.getStorage({
      key: 'accountInfo',
      success: ({data}) => {
        _this.setData({
          ['form.phone']: data.phone,
          ['form.password']: data.password,
          ['form.rememberPwd']: data.rememberPwd,
        })
      },
    })
  },

  /**
   * 表单修改
   */
  onFormChange(e) {
    const {
      id
    } = e.target;
    this.setData({
      [`form.${id}`]: e.detail
    });
  },
  // onChange(e){
  //   const {
  //     id
  //   } = e.target;
  //   this.setData({
  //     [`form.${id}`]: e.detail.toUpperCase()
  //   });
  // },
  /**
   * 忘记密码
   */
  forgetPass(){
    wx.navigateTo({
      url: '../../user-info/user-info3/forgetPass/forgetPass',
    })
  },
  /**
   * 检查是否有空的字段
   */
  _checkHasEmpty() {
    const fieldNames = Object.keys(this.data.form);
    let result = true;
    fieldNames.map(fieldName => {
      let val = this.data.form[fieldName]
      // console.log(this.data.form,val.toString())
      if(typeof(val) !== 'boolean'){
        if(val == ''){
          this.setData({
            [`${fieldName}ErrMsg`]: "该选项不能为空"
          })
          result = false;
        }else{
          this.setData({
            [`${fieldName}ErrMsg`]: ""
          })
        }
      }
      
      // if (val.trim &&!val.trim()) {
      //   this.setData({
      //     [`${fieldName}ErrMsg`]: "该选项不能为空"
      //   })
      //   result = false;
      // } else {
      //   this.setData({
      //     [`${fieldName}ErrMsg`]: ""
      //   })
      // }
    })
    return result;
  },

  /**
   * 检查手机号格式
   */
  _checkPhone: function () {
    let {
      phone
    } = this.data.form;
    let result = true;
    if (!checkPhone(phone)) {
      this.setData({
        phoneErrMsg: "手机号格式错误"
      })
      return false;
    } else {
      this.setData({
        phoneErrMsg: ""
      })
    }
    return result;
  },

  /**
   * 登录
   */
  tologin: function() {
    let {
      phone,
      password,
      rememberPwd
    } = this.data.form;
    if (!this._checkHasEmpty()) {
      return;
    }
    if (!this._checkPhone()) {
      return;
    }
    if (rememberPwd) {
      wx.setStorage({
        key: "accountInfo",
        data: {
          phone,
          password,
          rememberPwd
        }
      })
    } else {
      wx.removeStorage({
        key: 'accountInfo'
      })
    }
    login(this.data.form).then(curUserInfo => {
      const { sessionToken } = curUserInfo.content
      app.globalData.token = sessionToken
      wx.setStorage({
        key: "sessionToken",
        data: sessionToken
      })
      wx.setStorage({
        key: "curUserInfo",
        data: curUserInfo
      })
      wx.switchTab({
        url: '/pages/homepage/homepage',
      })
    })
  },


  /**
   * 跳转到注册页面
   */
  toRegist() {
    wx.navigateTo({
      url: '../regist/index'
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '薪酷灵活用工平台，为中小企业提供灵活用工及薪资结算服务平台',
      path: '/pages/homepage/homepage',
      imageUrl:'https://xinkush.vipcaihui.cn/image/M00/00/04/rB_sZV9wWwWAanH1AAGEA1_W9DA872.png',
    }
  }
})