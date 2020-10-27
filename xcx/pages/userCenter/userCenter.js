// pages/userCenter/userCenter.js
const {
  netWork
} = require("../../utils/util.js")
const {
  config
} = getApp()
const app = getApp()
const {
  queryJobInfo,
  addHeadAddress
} = require("../../services/user-info.js")
const baseUrl = config.domain + config.context_person;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myExp:[{
      icon:'/images/baseinfo.png',
      id:1,
      name:'基本资料'
    },{
      icon:'/images/card.png',
      id:2,
      name:'我的名片'
    },{
      icon:'/images/myInvite.png',
      id:3,
      name:'我的推广'
    },{
      icon:'/images/request.png',
      id:4,
      name:'求职设置'
    }],
    mySet:[{
      icon:'/images/moneyBag.png',
      id:1,
      name:'我的钱包'
    },{
      icon:'/images/opinion.png',
      id:2,
      name:'意见反馈'
    },{
      icon:'/images/star.png',
      id:3,
      name:'我的收藏'
    },{
      icon:'/images/ownInvite.png',
      id:4,
      name:'我要推广'
    },{
      icon:'/images/moreset.png',
      id:5,
      name:'更多'
    }],
    logoImg:'/images/signdefault.png',
    name:'用户名'
  },
  // 我的简历跳转
  goMy(e){
    var id = e.currentTarget.dataset.id
    if(id == 1){
     if(this.data.eAuthStatus == 3||this.data.eAuthStatus == 2){
      wx.navigateTo({
        url: '/pages/infoshow/infoshow',
      })
     }else if(this.data.eAuthStatus == 1||this.data.eAuthStatus == null){
      wx.navigateTo({
        url: '/pages/user-info/user-info2/index',
      })
     }else if(this.data.eAuthStatus == 4){
       wx.navigateTo({
         url: '/pages/defeatCheck/defeatCheck',
       })
     }
    }else if(id == 3){
      // wx.showToast({
      //   title: '敬请期待！',
      //   icon:'none',
      //   duration:1000
      // })
      wx.navigateTo({
        url: '/pages/myInvite/myInvite',
      })
    }else{
      wx.showToast({
        title: '敬请期待！',
        icon:'none',
        duration:1000
      })
    }
  },
  // 跳转钱包等e
  goset(e){
    var id = e.currentTarget.dataset.id
    if(id == 1){
      wx.navigateTo({
        url: '/pages/moneyBag/moneyBag',
      })
    }else if(id == 4){
      wx.navigateTo({
        url: '/pages/myShare/myShare',
      })
    }else{
      wx.showToast({
        title: '敬请期待！',
        icon:'none',
        duration:1000
      })
    }
  },
  // 上传图片
  // 点击上传图片
  uploadAvatar: function (e) {
    var that = this;
    this.setData({
      currentPhotoKey: e.currentTarget.id
    })
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop('camera')
          }
        }
      }
    })
  },
  chooseWxImageShop: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        /*上传单张*/
        // that.data.orderDetail.shopImage = res.tempFilePaths[0];
        that.upload_file(`${baseUrl}/person_/center/uploadImage`, res.tempFilePaths[0])
        /*上传多张（遍历数组，一次传一张）
         */
        // for (var index in res.tempFilePaths) {
        //   that.upload_file(`${config.domain}/person_/center/addImageAddress`, res.tempFilePaths[index])
        // }
      }
    })
  },
  upload_file: function (url, filePath) {
    var that = this;
    const sessionToken = wx.getStorageSync("sessionToken")
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      }, // 设置请求的 header
      formData: {
        "sessionToken": sessionToken,
        "_": Math.random(),
      }, // HTTP 请求中其他额外的 form data
      success: function (res) {
        that.setData({
          avatar: JSON.parse(res.data).content,
          logoImg: config.fileBasePath + JSON.parse(res.data).content
        })
        addHeadAddress({
          headAddr: JSON.parse(res.data).content,
          sessionToken
        }).then(res=>{
          wx.showToast({
            title: "头像修改成功",
            duration: 700
          })
        })
      },
      fail: function (res) { }
    })
  },
  signOut(){
    wx.removeStorageSync('sessionToken')
    wx.removeStorageSync('curUserInfo')

    wx.navigateTo({
      url: '/pages/login/login/index',
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
    netWork()
    var token = wx.getStorageSync("sessionToken")
    if(token != undefined||token != null || token.length != 0){
      queryJobInfo(token).then(res => {
        const { user } = res.content;
        this.setData({
          authenState:user.authenState,
          eAuthStatus:user.eAuthStatus,
        })
        if(user.headAddr != null){
          this.setData({
            logoImg:  config.fileBasePath + user.headAddr
          })
        }
        if(user.name!= null){
          this.setData({
            name: user.name,
          })
        }else{
          this.setData({
            name: '用户名',
          })
        }
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