// pages/user-info1/userinfo1.js
const {
  config
} = getApp()
const {
  checkPhone,
  formatDate
} = require("../../../utils/util.js")
const {
  queryJobInfo,
  sendSecurityCodeToBoshByToken,
  addImageAddress,
  editJobInfo
} = require("../../../services/user-info.js")
const {
  bankList
} = require("../../../services/code.js")
const baseUrl = config.domain + config.context_person;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      clearable:true,
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
    errMsg:{
      sessionToken: "",
      name: "",
      idNum: "",        //身份证号
      phone: "",
      codeValidate: "",  //验证码
      age: "",           //年龄
      sex: "",         //0男1女
      bankId: "",       //银行卡类型
      cardNum: "",      //银行卡号
      smsOrderId: "",   //修改个人信息特殊短信发送接口获取
      idEffecDate: "",  //证件有效期开始日期
      expDay: "",       //证件有效期到期日期
      licIssuAutho: "", //发证机关
    },
    idCardImgs: {
      imageBefore: "",
      imageBeforeUrl: "",
      imageAfter: "",
      imageAfterUrl: ""
    },
    currentPhotoKey: "",
    validDate: "请选择有效期",
    banks: [],
    bankName: "请选择银行",
    bankShow: false,
    sendBtnText: "发送验证码", //发送验证码按钮文本
    sendBtnDisable: false,
    idEffecDateShow: false,
    expDayShow: false,
    startDateVal: new Date(2000,1,1).getTime(),
    endDateVal: new Date(2000,1,1).getTime(),
    minDate: new Date(1900,1,1).getTime(),
    maxDate: new Date(2080,1,1).getTime(),
    idCardChooseShow: false, //身份证选择弹层

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sessionToken = wx.getStorageSync("sessionToken")
    const curUserInfo = wx.getStorageSync("curUserInfo")
    this.setData({
      ['form.phone']: curUserInfo.content.phone,
      ['form.sessionToken']: sessionToken
    })
    queryJobInfo(sessionToken).then(res => {
      let {
        user,
        payCard
      } = res.content;
      // !payCard && (payCard = {});
      if(user.idNumAddrBefore == null&&user.idNumAddrAfter == null){
        this.setData({
          ['idCardImgs.imageBefore']: '',
          ['idCardImgs.imageBeforeUrl']: '',
          ['idCardImgs.imageAfter']: '',
          ['idCardImgs.imageAfterUrl']: '',
        })
      }else{
        this.setData({
          ['idCardImgs.imageBefore']: user.idNumAddrBefore,
          ['idCardImgs.imageBeforeUrl']: config.fileBasePath + "/" + user.idNumAddrBefore,
          ['idCardImgs.imageAfter']: user.idNumAddrAfter,
          ['idCardImgs.imageAfterUrl']: config.fileBasePath + "/" + user.idNumAddrAfter,
        })
      }
      this.setData({
        ['form.name']: user.name,
        ['form.idNum']: user.idNum,
        ['form.age']: user.age,
        ['form.sex']: user.sex,
        ['form.bankId']: payCard == null ? '':payCard.bankId,
        ['form.cardNum']: payCard == null ? '':payCard.cardNum,
        ['form.idEffecDate']: user.idEffecDate==null?'2000-01-01':user.idEffecDate,
        ['form.expDay']: user.expDay==null?'2000-01-01':user.expDay,
        ['form.licIssuAutho']: user.licIssuAutho==null?'':user.licIssuAutho,
        ['form.idNumAddrBefore']: user.idNumAddrBefore==null?'':user.idNumAddrBefore,
        ['form.idNumAddrAfter']: user.idNumAddrAfter==null?'':user.idNumAddrAfter,
        bankName:payCard == null ? '请选择银行':payCard.bankName,
        expDay:user.expDay==null?'2000-01-01':user.expDay,
        idEffecDate:user.idEffecDate==null?'2000-01-01':user.idEffecDate,
      })
      
    })
    bankList({
      sessionToken
    }).then(banks => {
      this.setData({
        banks: banks.content.map(item => item.bankName)
      })
    })
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
   * 日期改变事件
   */
  onDateChange(e) {
    const {
      id
    } = e.target;
    const value = e.detail;
    this.setData({
      [`form.${id}`]: formatDate(new Date(value)),
      [`${id}`]:formatDate(new Date(value)),
    });
  },

  onFormChange(e) {
    const {
      id
    } = e.target;
    this.setData({
      [`form.${id}`]: e.detail
    });
  },

  // 显示身份证选择弹层
  showIdCardChoosePopup() {
    this.setData({ idCardChooseShow: true })
  },

  // 显示银行选择弹框
  showBankPopup() {
    if(this.data.bankName == '请选择银行'){
      this.setData({
        bankShow: true,
        // bankName:
      });
    }else{
      this.setData({
        bankShow: true
      });
    }
    
  },

  // 关闭银行选择弹框
  onBankClose() {
    this.setData({
      bankShow: false
    });
  },

  // 改变银行选择弹框内容
  onBankChange(event) {
    const {
      value,
      index
    } = event.detail;
    this.setData({
      ['form.bankId']: index + 1,
      bankName: value
    })
  },

  /**
   * 检查是否有空的字段
   */
  // _checkHasEmpty(form) {
  //   const fieldNames = Object.keys(this.data.form);
  //   let result = true;
  //   fieldNames.map(fieldName => {
  //     if (!this.data.form[fieldName].trim()) {
  //       this.setData({
  //         [`${fieldName}ErrMsg`]: "该选项不能为空"
  //       })
  //       result = false;
  //     } else {
  //       this.setData({
  //         [`${fieldName}ErrMsg`]: ""
  //       })
  //     }
  //   })
  //   return result;
  // },

  onIdCardClose() {
    this.setData({
      idCardChooseShow: false
    })
  },

  //关闭日期选择框
  onDatePickerClose(e){
    this.setData({
      [`${e.target.id}Show`]: false
    });
  },
  onDateDisplay(e) {
    this.setData({
      [`${e.target.id}Show`]: true
    });
  },
  onClose() {
    this.setData({
      calendarShow: false
    });
  },
  // 格式化日期
  formatDate(date) {
    date = new Date(date);
    return formatDate(date);
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    const IdEffecDate = this.formatDate(start);
    const ExpDay = this.formatDate(end)
    this.setData({
      calendarShow: false,
      validDate: `${IdEffecDate} - ${ExpDay}`,
      ['form.idEffecDate']: IdEffecDate,
      ['form.expDay']: ExpDay
    });
  },

  /**
   * 检查手机号码格式
   */
  _checkPhone() {
    const {
      phone
    } = this.data.form;
    let result = false;
    if (!checkPhone(phone)) {
      this.setData({
        phoneErrMsg: "电话号码有误"
      })
    } else {
      this.setData({
        phoneErrMsg: ""
      })
      result = true;
    }
    return result;
  },
  _checkHasEmpty(){
    const fieldNames = Object.keys(this.data.form);
    var {form} = this.data
    let result = true;
    fieldNames.map(fieldName=>{
      if(form[fieldName]=="" || form[fieldName] == undefined||form[fieldName]==null){
        this.setData({
          [`errMsg.${fieldName}`]: "该选项不能为空"
        })
        result = false;
      }else {
          this.setData({
            [`errMsg.${fieldName}`]: ""
          })
        }
    })
    return result; 
  },

  // 检查表单是否有空字段
  // _checkHasEmpty(form) {
  //   const fieldNames = Object.keys(this.data[form]);

  //   let result = true;
  //   let reason = [];
  //   fieldNames.map(fieldName => {
  //     // if(fieldName == "age"){
  //     // }else  
  //     if(this.data[form][fieldName] == '')
  //     if (!this.data[form][fieldName]) {
  //     // if (!this.data[form][fieldName] || (this.data[form][fieldName].trim&&!this.data[form][fieldName].trim())) {
  //       this.setData({
  //         [`errMsg.${fieldName}`]: "该选项不能为空"
  //       })
  //       reason.push(fieldName)
  //       result = false;
  //     } else {
  //       this.setData({
  //         [`errMsg.${fieldName}`]: ""
  //       })
  //     }
  //   })
  //   // console.log(JSON.stringify(reason))
  //   return result;
  // },

  /**
   * 发送短信验证码
   */
  sendSecurityCode: function () {

    if (this._checkPhone() == false) {
      return;
    }
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

  //上传身份证照片
  uploadIdcardImgs(){
    const _this = this;
    _this.setData({
      idCardChooseShow: false,
    })
    // addImageAddress({
    //   sessionToken: this.data.form.sessionToken,
    //   imageBefore: this.data.idCardImgs.imageBefore,
    //   imageAfter: this.data.idCardImgs.imageAfter
    // }).then(res=>{
    //   wx.showToast({
    //     title:"上传成功",
    //     icon: "success"
    //   })
    //   _this.setData({
    //     idCardChooseShow: false
    //   })
    // }).catch(err=>{
      
    //   wx.showToast({
    //     title:"上传失败",
    //     icon: "none"
    //   })
    // })
  },

  // 保存表单
  saveForm(){
    
    if(this.data.form.idNumAddrBefore==''||this.data.form.idNumAddrAfter==''){
      wx.showToast({
        title: '请上传身份证图片',
        icon:'none',
        duration:1000
      })
      return false;
    }
    if (!this._checkHasEmpty("form")) {
      return ;
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

  onClickLeft(){
    wx.navigateBack({ changed: true });
  }
})