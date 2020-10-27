const {
  bankList
} = require("../../services/code.js")
const {
  checkPhone,
  formatDate
} = require("../../utils/util.js")
const {
  config
} = getApp()
const {
  sendSecurityCodeToBoshByToken,
} = require("../../services/user-info.js")
const baseUrl = config.domain + config.context_person;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      sessionToken: "",
      phone: "",
      codeValidate: "",  //验证码
      bankId: "",       //银行卡类型
      cardNum: "",      //银行卡号
    },
    errMsg:{
      sessionToken: "",
      phone: "",
      codeValidate: "",  //验证码
      bankId: "",       //银行卡类型
      cardNum: "",      //银行卡号
    },
    banks: [],
    bankName: "请选择银行",
    bankShow: false,
    sendBtnText: "发送验证码", //发送验证码按钮文本
    sendBtnDisable: false,
    IdEffecDateShow: false,
  },
  // 非空校验
  // _checkHasEmpty() {
  //   const fieldNames = Object.keys(this.data.form);
  //   let result = true;
  //   fieldNames.map(fieldName => {
  //     if (!this.data.form[fieldName].trim()) {
  //       this.setData({
  //         [`${fieldName}ErrMsg`]: "该选项不能为空"
  //       })
  //       result = false;
  //     } else {
  //       this.setData({
  //         [`${fieldName}ErrMsg`]: ""
  //       })
  //     }
  //   })
  //   return result;
  // },
  // 检查表单是否有空字段
  _checkHasEmpty(form) {
    const fieldNames = Object.keys(this.data[form]);
    let result = true;
    let reason = [];
    fieldNames.map(fieldName => {
      // if(fieldName == "age"){

      // }else 
      if (!this.data[form][fieldName] || (this.data[form][fieldName].trim&&!this.data[form][fieldName].trim())) {
        this.setData({
          [`errMsg.${fieldName}`]: "该选项不能为空"
        })
        reason.push(fieldName)
        result = false;
      } else {
        this.setData({
          [`errMsg.${fieldName}`]: ""
        })
      }
    })
    // console.log(JSON.stringify(reason))
    return result;
  },
  // 保存表单
  saveForm(){
    if (!this._checkHasEmpty("form")) {
    }
    
    // editJobInfo(this.data.form).then(res=>{
    //   wx.showToast({
    //     title:"保存成功",
    //     icon: "success"
    //   })
    //   wx.navigateBack({
    //     delta: 1,
    //   })
    // }).catch(err=>{
    //   wx.showToast({
    //     title:err.message,
    //     icon: "none",
    //     duration:700
    //   })
    // })
  },
  // 银行卡号更改
  onFormChange(e) {
    const {
      id
    } = e.target;
    this.setData({
      [`form.${id}`]: e.detail
    });
  },
  // 显示银行选择弹框
  showBankPopup() {
    this.setData({
      bankShow: true
    });
  },
  // 关闭银行选择弹框
  onBankClose() {
    this.setData({
      bankShow: false
    });
  },
    // 改变银行选择弹框内容
    onBankChange(event) {
      const {
        value,
        index
      } = event.detail;
      this.setData({
        ['form.bankId']: index + 1,
        bankName: value
      })
    },
    _checkPhone() {
      const {
        phone
      } = this.data.form;
      let result = false;
      if (!checkPhone(phone)) {
        this.setData({
          phoneErrMsg: "电话号码有误"
        })
      } else {
        this.setData({
          phoneErrMsg: ""
        })
        result = true;
      }
      return result;
    },
    // 发送验证码
    sendSecurityCode: function () {
      if (!this._checkPhone()) {
        return;
      }
      let seconds = 30;
      // 设置按钮文本
      this.setData({
        sendBtnText: `${--seconds}s后可重新发送`
      })
      let intervalHandler = setInterval(() => {
        this.setData({
          sendBtnText: `${--seconds}s后可重新发送`
        })
      }, 1000)
      this.setData({
        sendBtnDisable: true
      })
  
      sendSecurityCodeToBoshByToken(this.data.form.sessionToken).then(({smsOrderId})=>{
        this.setData({
          ['form.smsOrderId']: smsOrderId
        })
      })
  
      setTimeout(() => {
        this.setData({
          sendBtnDisable: false,
          sendBtnText: "发送验证码"
        })
        clearInterval(intervalHandler)
  
      }, seconds * 1000)
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync("sessionToken")
    bankList({
      sessionToken:token
    }).then(banks => {
      this.setData({
        banks: banks.content.map(item => item.bankName)
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})