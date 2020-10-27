// pages/user-info1/userinfo1.js
const {
  config
} = getApp()
const {
  queryJobInfo,
  addHeadAddress
} = require("../../../services/user-info.js")
const baseUrl = config.domain + config.context_person;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "请完善个人信息",
    avatar: "",
    avatarUrl: "https://xinkush.vipcaihui.cn/image/M00/00/04/rB_sZV9v6-GAOJbpAAAPwdxPtMs134.png"
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
    const sessionToken = wx.getStorageSync("sessionToken")
    queryJobInfo(sessionToken).then(res => {
      const { user } = res;
      if(user.headAddr != null){
        this.setData({
          avatarUrl:  config.fileBasePath + user.headAddr
        })
      }
      if(user.name!= null){
        this.setData({
          name: user.name,
        })
      }
      
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
    // /person_/center/addHeadAddress
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
          avatarUrl: config.fileBasePath + JSON.parse(res.data).content
        })
        addHeadAddress({
          headAddr: JSON.parse(res.data).content,
          sessionToken
        }).then(res=>{
          wx.showToast({
            title: "头像修改成功",
            icon: 'success',
            duration: 700
          })
        })
      },
      fail: function (res) { }
    })
  },

})