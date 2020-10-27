// pages/taskDetail/taskDetail.js
const {
  getTaskDetail,
  doTask
} = require("../../services/user-info.js")
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
    showTip:false,
  },
  getData(token,id,pid){
    getTaskDetail(token,id,pid).then(res=>{
      var money = res.content.monthlySalary
     var time = res.content.createDate.substring(0,10)
      this.setData({
        list:res.content,
        time:time
      })
    })
  },

  gotoTask(){
    if(this.data.status == 5){

    }
  },
  want(){
    doTask(app.globalData.token,this.data.sign).then(res=>{
      this.setData({
        statustxt:'已接受任务',
        showTip:false
      })
      wx.showToast({
        title: '恭喜你！已成功接受任务',
        icon:'none',
        duration:1000
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      pid:options.pid,
      status:options.status,
      sign:options.sign,
      pstatus:options.pstatus,
      close:options.close
    })
    var {status,sign,status,pstatus,close} = options

    if(close == 2){
      if(status == 0){
        // this.setData({
        //   statustxt :'已接受任务'
        // })
        this.setData({
          showTip:true
        })
      }
      if(status == 1){
        this.setData({
          statustxt :'已接受任务'
        })
      }
    }else{
      this.setData({
        statustxt :'任务已结束'
      })
    }
    // if(status == 2){
    //   this.setData({
    //     statustxt :'已接受任务'
    //   })
    // };
    // if(status == 3){this.setData({
    //   statustxt :'已解约'
    // })};
    // if(status == 4){
    //   this.setData({
    //     statustxt :'结束'
    //   })};
    // if(status == 5){
    //   this.setData({
    //     statustxt :'拒绝'
    //   })
    // };
    // if(status == 6){
    //   this.setData({
    //     statustxt :'任务已结束'
    //   })
    // };
    // if(Pstatus =='1') {
    //   this.setData({
    //     statustxt :'任务未审核'
    //   })
    // };
    // if(close =='1') {
    //   this.setData({
    //     statustxt :'任务已结束'
    //   })
    // };
    // if (status == 1&&Pstatus=='2'&&close=='2'){
    //   this.setData({
    //     showTip:true
    //   })
    // }

    this.getData(app.globalData.token,options.id,options.pid)
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