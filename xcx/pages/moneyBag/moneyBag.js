// pages/moneyBag/moneyBag.js
const{myAcount,salaryRecords,AccountBal,getCardInfo,submitMoney,checkId} = require("../../services/user-info.js")
const {
  netWork
} = require("../../utils/util.js")
const {
  config
} = getApp()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    money:'',
    active:0,
    myAcountList:[],//我的账单列表
    recordsList:[],//薪资记录
    myflag:true,
    flag:true,
    cardList:[],//银行卡信息
    show: false,
    moneyNum:'',
    error:false,
  },
  // 更改tabs
  onTabChange(e){
    if(e.detail.index == 1){
      this.getSalary()
      this.getBalance()
    }else{
      this.getMyacount()
      this.getBalance()
    }
  },
  gotoset(){
    wx.navigateTo({
      url: '/pages/money/money',
    })
  },
  goIdcard(){
    wx.navigateTo({
      url: '/pages/addCard/addCard',
    })
  },
  getZero(e){
    var x = e;
    var f = parseFloat(x); // 解析一个字符串，返回一个浮点数；
    var f = Math.round(x*100)/100;
    var s = f.toString(); // 把一个逻辑值转换为字符串，并返回结果；
    var rs = s.indexOf('.'); // 返回某个指定的字符串值在字符串中首次出现的位置；如果字符串值没有出现，返回-1；
    // 没有小数点时：
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s
  },
  getBalance(){
    AccountBal(app.globalData.token).then(res=>{
      var num = this.getZero(res.content.realBalances)
      this.setData({
        money:num
      })
    })
  },
  getMyacount(){
    myAcount(app.globalData.token).then(res=>{
      if(res.content.length == 0){
        this.setData({
          myflag:false
        })
      }else{
        var list = res.content
        for(var i= 0;i<list.length;i++){
          var num = this.getZero(list[i].money)
          list[i].money = num
        }
        this.setData({
          myAcountList:res.content
        })
      }
    })
  },
  getSalary(){
    salaryRecords(app.globalData.token).then(res=>{
      if(res.content.length == 0){
        this.setData({
          flag:false
        })

      }else{
        var list = res.content
        for(var i= 0;i<list.length;i++){
          var num = this.getZero(list[i].salaryMoney)
          list[i].salaryMoney = num
        }
        this.setData({
          recordsList:res.content
        })
      }
    })
  },
  getCard(){
    getCardInfo(app.globalData.token).then(res=>{
      var cardList = res.content
      if(cardList.length != 0){
        var cardNum = cardList[0].cardNum
        var str = cardNum.substring((cardNum.length-4), cardNum.length)
        this.setData({
          cardList:cardList,
          str:str
        })
      }
      
    })
  },
  // 查看是否验证
  getCheck(){
    checkId(app.globalData.token).then(res=>{
      this.setData({
        authenState:res.content.authenState,
        infoName:res.content.name== null?'':res.content.name
      })
    })
  },
  showToast(e){
    wx.showToast({
      title: e,
      icon:'none',
      duration:1000
    })
  },
  // 弹出框
  showPopup(e) {
    if(this.data.authenState == 1){
      this.showToast('请到我的简历（基本资料）填写信息')
    }else if(this.data.authenState == 2){
      this.showToast('后台审核中，请等待1~2天')
    }else if(this.data.authenState == 4){
      this.showToast('信息认证失败，请到我的简历（基本资料）重新填写信息')
    }else{
      this.setData({ 
        show: true,
        cardId:e.currentTarget.dataset.id
      });
    }
  },

  onClose() {
    this.setData({ show: false,moneyNum:'',tip:''});
  },
  moneyChange(e){
    let amount = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    // // 获取可提现的金额
    let balance = this.data.money;
    const that = this;
    let tip = '';
    if (amount > balance) {
      tip = '提款金额不能大于可用余额';
      this.setData({
        error:true
      })
      amount = balance;
    } else if (amount < 1) {
      this.setData({
        error:true
      })
      tip = '提款金额不能小于1元';
    }
    // 转出金额超限 提示
    that.setData({
      moneyNum: amount,
      tip:tip
    });
  },
  // 提交
  nowSub(){
    if(this.data.moneyNum  == ''){
      this.showToast('请输入提款金额')
      return false;
    }else{
      let amount = this.data.moneyNum.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
      // // 获取可提现的金额
      let balance = this.data.money;
      const that = this;
      let tip = '';
      if (amount > balance) {
        tip = '提款金额不能大于可用余额';
        this.setData({
          error:true
        })
        amount = balance;
        return false;
      } else if (amount < 1) {
        this.setData({
          error:true
        })
        tip = '提款金额不能小于1元';
        return false;
      }else{
        this.setData({
          tip:'',
          error:false
        })
        submitMoney(app.globalData.token,this.data.moneyNum,this.data.cardId).then(res=>{
          this.onClose()
          this.getBalance()
          this.getMyacount()
          this.getCard()
        })
      }
    }
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
    // this.setData({
    //   curUserInfo:wx.getStorageSync('curUserInfo').content
    // })
    this.getCheck()
    this.getBalance()
    this.getMyacount()
    this.getCard()
    
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