// pages/myShare/myShare.js
// pages/moneyBag/moneyBag.js
const{invite} = require("../../services/user-info.js")
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
    name:'',//姓名
    phone:'',
    show: false,
    companyName:'',
    actions: [
      {
        name: '企业',
      },
      {
        name: '个人',
      },
    ],
    type:'企业',
    companyShow:true,
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    this.setData({
      type:event.detail.name
    })
    if(event.detail.name == '企业'){
      this.setData({
        companyShow:true
      })
    }else{
      this.setData({
        companyShow:false
      })
    }
  },
  choose(){
    this.setData({
      show:true
    })
  },
  showToast(e,time){
    wx.showToast({
      title: e,
      icon:'none',
      duration:time
    })
  },
  submit(){
    var {name,phone,companyName,type} = this.data
    if(name==""){
      this.showToast('联系人不能为空',700)
      return false;
    }
    // 正则
    const chinese = /[^\u4E00-\u9FA5]/g
    if ((chinese.test(name))) {
      this.showToast('请输入正确联系人姓名',700)
        return false;
    }
    var reg=/^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
    if(phone==""){
      this.showToast('手机号不能为空',700)
      return false;
    }
    if(!reg.test(phone)){
      this.showToast('手机号码格式不正确',700)
      return false;
    }
    if(type=="企业"){
      if(companyName == ''){
        this.showToast('企业名称不能为空',700)
        return false;
      }
    }
    invite(app.globalData.token,name,phone,type,companyName).then(res=>{
      if(res.code == 200){
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000,
          success:function(){
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 2000) //延迟时间
          }
        })
      }
    })
  },
  getName(e){
    this.setData({
      name: e.detail.value
    })
  },
  getPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  getCompany(e){
    this.setData({
      companyName: e.detail.value
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