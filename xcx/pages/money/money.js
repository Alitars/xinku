// pages/money/money.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendBtnText: "发送验证码",
    form: {
      phone: "", //电话号码
      password: "", //密码
      truepassword: "", //确认密码
      code: "" //短信验证码
    },
    passwordErrMsg: "", //密码错误提示
    truepasswordErrMsg: "", //确认密码错误提示
    codeErrMsg: "", //验证码错误提示
    personRegistDisabled: true, //完成按钮是否可用

  },
  // 更改表单
  onFormChange(e) {
    const {
      id
    } = e.target;
    const form = e.target.dataset.form || "form";
    this.setData({
      [`${form}.${id}`]: e.detail
    });
  },
  // 发送验证码
  sendSecurityCode: function () {
    const {
      phone
    } = this.data.form;
    if (!this._checkPhone(phone)) {
      return;
    }
    let seconds = 60;
    // 设置按钮文本
    this.setData({
      sendBtnText: `${--seconds}s`
    })
    let intervalHandler = setInterval(() => {
      this.setData({
        sendBtnText: `${--seconds}s`
      })
    }, 1000)
    this.setData({
      sendBtnDisable: true
    })
    sendSecurityCode(this.data.form.phone)

    setTimeout(() => {
      this.setData({
        sendBtnDisable: false,
        sendBtnText: "发送验证码"
      })
      clearInterval(intervalHandler)

    }, seconds * 1000)
  },

  // 重置
  reset(){
    this.setData({
      ['form.password']:'',
      ['form.truepassword']:'',
      ['form.code']:'',
      passwordErrMsg:'',
      truepasswordErrMsg:'',
      codeErrMsg:''
    })
  },
  // 确认
  judge(){
    var form = this.data.form
    const {
      password,
      phone,
      code,
      truepassword,
    } = form;
    if(password.length<6){
      this.setData({
        passwordErrMsg:'请输入六位密码'
      })
    }else{
      if(password == ''){
        this.setData({
          passwordErrMsg:'该项不能为空'
        })
      }else{
        this.setData({
          passwordErrMsg:''
        })
      }
      if(truepassword== ''){
        this.setData({
          truepasswordErrMsg:'该项不能为空'
        })
      }else{
        this.setData({
          truepasswordErrMsg:''
        })
      }
      if(code== ''){
        this.setData({
          codeErrMsg:'该项不能为空'
        })
      }else{
        this.setData({
          codeErrMsg:''
        })
      }
      if(password!== truepassword){
       if(password ==""){
         this.setData({
          passwordErrMsg:'该项不能为空'
         })
       }
       if(truepassword== ''){
        this.setData({
          truepasswordErrMsg:'该项不能为空'
         })
       }else{
        this.setData({
          truepasswordErrMsg:'输入密码不一致'
         })
       }
      }else{
        this.setData({
          truepasswordErrMsg:''
        })
      }
    }
  },
  sure(){
   this.judge()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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