const{getNum,today,yesterday} = require("../../services/user-info.js")
const {
  formatDate
} = require("../../utils/util.js")
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
    /**
     * type 0:企业 1:个人 
     * state: 0：推广  1：收益  2:成功注册
     */
  
  },
   /**
     * type 0:企业 1:个人 
     * state: 0：推广  1：收益  2:成功注册
     */
  tohaibao(){
    wx.navigateTo({
      url: '/pages/post/post',
    })
  },
  gotobill(e){
    const {type} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/spread/spread?type='+type,
    })
  },
  goBill(e){
    const{time,type} =e.currentTarget.dataset 
    wx.navigateTo({
      url:'/pages/bill/bill?time=' +time+'&type=' +type,
    })
    // wx.showToast({
    //   title: '敬请期待！',
    //   icon:'none',
    //   duration:700,
    // })
  },
  goall(){
    wx.navigateTo({
      url:'/pages/bill/bill',
    })
    // wx.showToast({
    //   title: '敬请期待！',
    //   icon:'none',
    //   duration:700,
    // })
  },
  gototoday(e){
    const {type} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/spread/spread?type='+type+'&time='+this.data.today,
    })
  },
  goyesterday(e){
    const {type} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/spread/spread?type='+type+'&time='+this.data.yesterday,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('curUserInfo')){
      this.setData({
        referrerPhone:wx.getStorageSync('curUserInfo').content.phone
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login/index',
      })
    }
  },
  formatDate(date) {
    date = new Date(date);
    return formatDate(date);
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
    var token = wx.getStorageSync("sessionToken")
    var day1 = new Date();
    day1.setDate(day1.getDate()-1)
    var s1= formatDate(day1)
    var day2 = new Date();
    day2.setDate(day2.getDate())
    var s2= formatDate(day2)
     this.setData({
       today:s2,
       yesterday:s1
     })
    
    getNum(token).then((res)=>{
      this.setData({
        report:res.data,
        amount:res.data.amount,
        paidAmount:res.data.paidAmount
      })
    })  
    // 今日详情
    today(token).then((res)=>{
      this.setData({
        todayReport:res.data,
        todayNum:res.data.amount
      })
    })  
    // 昨日详情
    yesterday(token).then((res)=>{
      this.setData({
        yesterdayReport:res.data,
        yesterdayNum:res.data.amount
      })
    })  
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
  onShareAppMessage: function (res) {
    return {
      title: '薪酷灵活用工平台，为中小企业提供灵活用工及薪资结算服务平台',
      path: '/pages/login/regist/index?referrerPhone='+this.data.referrerPhone,
      imageUrl:'https://xinkush.vipcaihui.cn/image/M00/00/04/rB_sZV9wWwWAanH1AAGEA1_W9DA872.png',
    }
  },
})