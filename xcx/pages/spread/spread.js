const{reportDetail} = require("../../services/user-info.js")
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
    page:1,
    queryDate:'',
    list:[],
  },
  getDetail(){
    var {token,page,type,queryDate} = this.data
    reportDetail(token,page,type,queryDate).then((res)=>{
      let list=this.data.list
      list.push(...res.rows)
      this.setData({
        allPage:res.pages,		//总页数
        list		//数据渲染的数组
      })
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.time){
      this.setData({
        queryDate:options.time
      })
    }
    var token = wx.getStorageSync('sessionToken')
    this.setData({
      type:options.type,
      token:token
    })
    this.getDetail()
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
    // 上拉加载更多
    if(this.data.page<this.data.allPage){		//判断page是否大于总页数page_cout
        this.setData({
          page:++this.data.page
        })
        this.getDetail()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})