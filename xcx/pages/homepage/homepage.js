// pages/homepage/homepage.js
const {
  netWork
} = require("../../utils/util.js")
const {
  getJobList,
} = require("../../services/user-info.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: ['https://xinkush.vipcaihui.cn/image/M00/00/05/rB_sZV9yoHOAcwsKAAC6UWY63Qo478.png', 'https://xinkush.vipcaihui.cn/image/M00/00/05/rB_sZV9yoHOAcwsKAAC6UWY63Qo478.png', 'https://xinkush.vipcaihui.cn/image/M00/00/05/rB_sZV9yoHOAcwsKAAC6UWY63Qo478.png'],
    show:true,
    nav:[
      {
        icon:'https://xinkush.vipcaihui.cn/image/M00/00/05/rB_sZV9yn1qAbZe7AAAEwVvt7nk140.png',
        flag:1,
        title:'导航1'
      },
      {
        icon:'https://xinkush.vipcaihui.cn/image/M00/00/05/rB_sZV9ypi-ASbzhAAAEoIrUyjM957.png',
        flag:2,
        title:'导航2'
      },
      {
        icon:'https://xinkush.vipcaihui.cn/image/M00/00/05/rB_sZV9yp5GAVhYlAAADRmTsXts349.png',
        flag:3,
        title:'导航3'
      },
      {
        icon:'https://xinkush.vipcaihui.cn/image/M00/00/05/rB_sZV9yp52AECNdAAAEoNFDS6Y205.png',
        flag:4,
        title:'导航4'
      },
      {
        icon:'https://xinkush.vipcaihui.cn/image/M00/00/05/rB_sZV9yp6mACQ6MAAAFR-QODII031.png',
        flag:5,
        title:'导航5'
      },
    ],
    showBox:false,
    page:1,
    pageSize:10,
    positionTime:3,
    jobList:[]
  },
  isLogin(){
    netWork()
  },
  toCaihui(){
    wx.navigateTo({
      url: '/pages/toCaihui/toCaihui',
    })
  },
  // 跳转详情页
  toDetail(e){
    var {id,pid,sign,status,pstatus,close} =e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/taskDetail/taskDetail?id='+id+'&pid=' + pid+'&sign='+sign+'&status='+ status+'&pstatus='+pstatus+'&close='+ close  ,
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
    if(token){
      this.setData({
        showBox:true
      })
    }
    var {pageSize,page,positionTime} = this.data
    getJobList(token,pageSize,page,positionTime).then(res => {
     this.setData({
       jobList: res.rows
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