const{getNum,today,yesterday} = require("../../services/user-info.js")
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
  gotobill(e){
    const {type} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/spread/spread?type='+type,
    })
  },
  goBill(e){
    // const{time,type} =e.currentTarget.dataset 
    // wx.navigateTo({
    //   url:'/pages/bill/bill?time=' +time+'&type=' +type,
    // })
    wx.showToast({
      title: '敬请期待！',
      icon:'none',
      duration:700,
    })
  },
  goall(){
    // wx.navigateTo({
    //   url:'/pages/bill/bill',
    // })
    wx.showToast({
      title: '敬请期待！',
      icon:'none',
      duration:700,
    })
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
    
    // 今天
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
     // 昨天
     var day1 = new Date();
     day1.setTime(day1.getTime()-24*60*60*1000);
     var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
     this.setData({
       today:s2,
       yesterday:s1
     })
    
    getNum(token).then((res)=>{
      this.setData({
        report:res.data,
        amount:res.data.amount
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
  onShareAppMessage: function () {

  }
})