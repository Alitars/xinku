// pages/infoshow/infoshow.js
const {
  config
} = getApp()
const {
  queryJobInfo
} = require("../../services/user-info.js")
const baseUrl = config.fileBasePath;
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  preview(){
    wx.previewImage({
      urls: [baseUrl+ this.data.before,baseUrl+ this.data.after],
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
    if(token != undefined||token != null || token.length != 0){
      queryJobInfo(token).then(res => {
        const { user ,payCard} = res.content;
        const {idNumAddrBefore,idNumAddrAfter} = user
        if(user.eAuthStatus == '3'){
          Dialog.alert({
            message: '身份认证成功！',
          }).then(() => {
            // on close
          });
        }else if(user.eAuthStatus == '2'){
          Dialog.alert({
            message: '身份证已上传，请耐心等待审核！',
          }).then(() => {
            // on close
          });
        }
        this.setData({
          infoList:user,
          cardList:payCard,
          before:idNumAddrBefore,
          after:idNumAddrAfter
        })
      })
    }
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