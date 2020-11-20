// pages/infoshow/infoshow.js
const {
  config
} = getApp()
const {
  queryJobInfo,
  sendSecurityCodeToBoshByToken,
  editJobInfo
} = require("../../services/user-info.js")
const baseUrl = config.domain + config.context_person;
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idCardChooseShow: false, //身份证选择弹层
    form: {
      sessionToken: "",
      name: "",
      idNum: "",        //身份证号
      phone: "",
      codeValidate: "",  //验证码
      age: 0,           //年龄
      sex: "0",         //0男1女
      bankId: "",       //银行卡类型
      cardNum: "",      //银行卡号
      smsOrderId: "",   //修改个人信息特殊短信发送接口获取
      idEffecDate: "",  //证件有效期开始日期
      expDay: "",       //证件有效期到期日期
      licIssuAutho: "", //发证机关,
      idNumAddrBefore:'',//身份证正面
      idNumAddrAfter:'',//身份证背面照片路径
    },
    idCardImgs: {
      imageBefore: "",
      imageBeforeUrl: "",
      imageAfter: "",
      imageAfterUrl: ""
    },
    sendBtnText: "发送验证码", //发送验证码按钮文本
    sendBtnDisable: false,

  },
  sendSecurityCode: function () {

    let seconds = 60;
    // 设置按钮文本
    this.setData({
      sendBtnText: `${--seconds}s后可重新发送`
    })
    let intervalHandler = setInterval(() => {
      this.setData({
        sendBtnText: `${--seconds}s后可重新发送`
      })
    }, 1000)
    this.setData({
      sendBtnDisable: true
    })

    sendSecurityCodeToBoshByToken(this.data.form.sessionToken).then(res=>{
      this.setData({
        ['form.smsOrderId']: res.content.smsOrderId
      })
    })

    setTimeout(() => {
      this.setData({
        sendBtnDisable: false,
        sendBtnText: "发送验证码"
      })
      clearInterval(intervalHandler)

    }, seconds * 1000)
  },
  onFormChange(e) {
    const {
      id
    } = e.target;
    this.setData({
      [`form.${id}`]: e.detail
    });
  },
  onIdCardClose() {
    this.setData({
      idCardChooseShow: false
    })
  },
  uploadIdcardImgs(){
    const _this = this;
    _this.setData({
      idCardChooseShow: false,
    })
  },
   // 显示身份证选择弹层
   showIdCardChoosePopup() {
    this.setData({ idCardChooseShow: true })
  },

    // 点击上传图片
    upPhoto: function (e) {
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
      wx.uploadFile({
        url: url,
        filePath: filePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        }, // 设置请求的 header
        formData: {
          "sessionToken": this.data.form.sessionToken,
          "_": Math.random(),
        }, // HTTP 请求中其他额外的 form data
        success: function (res) {
          that.setData({
            [`idCardImgs.${that.data.currentPhotoKey}`]: JSON.parse(res.data).content,
            [`idCardImgs.${that.data.currentPhotoKey}Url`]: config.fileBasePath + JSON.parse(res.data).content
          })
          if(that.data.currentPhotoKey == 'imageBefore'){
            that.setData({
              [`form.idNumAddrBefore`]: JSON.parse(res.data).content,
            })
          }else if(that.data.currentPhotoKey == 'imageAfter'){
            that.setData({
              [`form.idNumAddrAfter`]: JSON.parse(res.data).content,
            })
          }
          wx.showToast({
            title: "图片修改成功",
            icon: 'success',
            duration: 700
          })
        },
        fail: function (res) { }
      })
    },
  // 保存表单
  saveForm(){
    if(this.data.form.codeValidate == ''){
      wx.showToast({
        title:'请输入验证码',
        icon: "none",
        duration:700
      })
      return false;
    }
    if(this.data.form.smsOrderId == ''){
      wx.showToast({
        title:'请发送验证码',
        icon: "none",
        duration:700
      })
      return false;
    }
    if(this.data.form.idNumAddrBefore == ''||this.data.form.idNumAddrAfter == ''){
      wx.showToast({
        title:'请上传身份证图片',
        icon: "none",
        duration:700
      })
      return false;
    }
    editJobInfo(this.data.form).then(res=>{
      wx.showToast({
        title:"信息资料审核1~3天",
        icon: "none",
        duration:2000,
        success:(e)=>{
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 2000)
        }
      })
    }).catch(err=>{
      wx.showToast({
        title:err.message,
        icon: "none",
        duration:700
      })
    })
  },
  // 取消
  cancel(){
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const token = wx.getStorageSync("sessionToken")
    const curUserInfo = wx.getStorageSync("curUserInfo")
    this.setData({
      ['form.phone']: curUserInfo.content.phone,
      ['form.sessionToken']: token
    })
    if(token != undefined||token != null || token.length != 0){
      queryJobInfo(token).then(res => {
        const { user ,payCard} = res.content;
        const {idNumAddrBefore,idNumAddrAfter} = user
        if(user.eAuthStatus == '4'){
          Dialog.alert({
            message: '身份证认证失败，请重新上传！',
          }).then(() => {
            // on close
          });
        }
        let accountNo = payCard.cardNum
        let idNo = user.idNum
        let eNum = user.eAccountNo
        this.setData({
          infoList:user,
          cardList:payCard,
          // ['idCardImgs.imageBefore']: idNumAddrBefore,
          // ['idCardImgs.imageBeforeUrl']: config.fileBasePath + "/" + idNumAddrBefore,
          // ['idCardImgs.imageAfter']: idNumAddrAfter,
          // ['idCardImgs.imageAfterUrl']: config.fileBasePath + "/" + idNumAddrAfter,
          ['form.name']: user.name,
          ['form.idNum']: user.idNum,
          ['form.age']: user.age,
          ['form.sex']: user.sex,
          ['form.bankId']: payCard.bankId,
          ['form.cardNum']: payCard.cardNum,
          ['form.idEffecDate']:user.idEffecDate,
          ['form.expDay']: user.expDay,
          ['form.licIssuAutho']: user.licIssuAutho,
          ['form.idNumAddrBefore']: '',
          ['form.idNumAddrAfter']: '',
          cardNum:accountNo.substr(0,3) + '*******' + accountNo.substr(accountNo.length - 4),
          idCard:idNo.substr(0,3) + '*******' + idNo.substr(idNo.length - 3),
          eNum:eNum.substr(0,3) + '*******' + eNum.substr(eNum.length - 4)
        })
      })
    }
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