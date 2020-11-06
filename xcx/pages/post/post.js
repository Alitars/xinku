// const{getImage} = require("../../services/user-info.js")
const {
  config
} = getApp()
const app = getApp()
// http://115.29.65.123/employment-personal/person_/invite/get_wxa_code?sessionToken=111111
Page({
  data: {
    // token: wx.getStorageSync("sessionToken"),
    // 数据区，从服务端拿到的数据
    name: "点多多",    // 姓名
    phone: "推广您的企业,一起赚大钱!",  //
    // posterUrl: "https://xinkush.vipcaihui.cn/image/M00/00/07/rB_sZV-jbVSANH0uAAaReUL6enQ528.png", // 海报地址
    posterUrl: "https://xinkush.vipcaihui.cn/image/M00/00/08/rB_sZV-k-0-AcKA7AAoeEjthEVg458.png", // 海报地址
    photoUrl:  "https://xinkush.vipcaihui.cn/image/M00/00/08/rB_sZV-jqCmARIR8AAAWidSmPvc227.png",                         // 头像地址
    qrcodeUrl: '',                  // 小程序二维码

    // 设置区，针对部件的数据设置
    photoDiam: 50,                // 头像直径
    qrcodeDiam: 100,               // 小程序码直径
    infoSpace: 13,                // 底部信息的间距
    saveImageWidth: 500,          // 保存的图像宽度
    bottomInfoHeight: 0,        // 底部信息区高度
    tips: "扫一扫立即加入我们",   // 提示语

    // 缓冲区，无需手动设定
    canvasWidth: 0,               // 画布宽
    canvasHeight: 0,              // 画布高
    canvasDom: null,              // 画布dom对象
    canvas:null,                  // 画布的节点
    ctx: null,                    // 画布的上下文
    dpr: 2,                       // 设备的像素比
    posterHeight: 0,              // 海报高
  },
  drawImage() {
    const query = wx.createSelectorQuery()  // 创建一个dom元素节点查询器
    query.select('#canvasBox')              // 选择我们的canvas节点
      .fields({                             // 需要获取的节点相关信息
        node: true,                         // 是否返回节点对应的 Node 实例
        size: true                          // 是否返回节点尺寸（width height）
      }).exec((res) => {                    // 执行针对这个节点的所有请求，exec((res) => {alpiny})  这里是一个回调函数
        
        const dom = res[0]                            // 因为页面只存在一个画布，所以我们要的dom数据就是 res数组的第一个元素
        const canvas = dom.node                       // canvas就是我们要操作的画布节点
        const ctx = canvas.getContext('2d')           // 以2d模式，获取一个画布节点的上下文对象
        const dpr = wx.getSystemInfoSync().pixelRatio // 获取设备的像素比，未来整体画布根据像素比扩大
        this.setData({
          canvasDom: dom,   // 把canvas的dom对象放到全局
          canvas: canvas,   // 把canvas的节点放到全局
          ctx: ctx,         // 把canvas 2d的上下文放到全局
          dpr: dpr          // 屏幕像素比
        },function(){
          this.drawing()    // 开始绘图
        })
      })     
      // 对以上设置不明白的朋友
      // 可以参考 createSelectorQuery 的api地址
      // https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html
  },
  drawPoster() {
    const that = this
    return new Promise(function (resolve, reject) {
      let poster = that.data.canvas.createImage();          // 创建一个图片对象
      poster.src = that.data.posterUrl                      // 图片对象地址赋值
      poster.onload = () => {
        that.computeCanvasSize(poster.width, poster.height) // 计算画布尺寸
          .then(function (res) {
            that.data.ctx.drawImage(poster, 0, 0, poster.width, poster.height, 0, 0, res.width, res.height);
            resolve()
          })
      }
    })
  },
  computeCanvasSize(imgWidth, imgHeight){
    const that = this
    return new Promise(function (resolve, reject) {
      var canvasWidth = that.data.canvasDom.width                   // 获取画布宽度
      var posterHeight = canvasWidth * (imgHeight / imgWidth)       // 计算海报高度
      var canvasHeight = posterHeight + that.data.bottomInfoHeight  // 计算画布高度 海报高度+底部高度
      that.setData({
        canvasWidth: canvasWidth,                                   // 设置画布容器宽
        canvasHeight: canvasHeight,                                 // 设置画布容器高
        posterHeight: posterHeight                                  // 设置海报高
      }, () => { // 设置成功后再返回
        that.data.canvas.width = that.data.canvasWidth * that.data.dpr // 设置画布宽
        that.data.canvas.height = canvasHeight * that.data.dpr         // 设置画布高
        that.data.ctx.scale(that.data.dpr, that.data.dpr)              // 根据像素比放大
        setTimeout(function(){
          resolve({ "width": canvasWidth, "height": posterHeight })    // 返回成功
        },1200)
      })
    })
  },
  drawInfoBg() {
    this.data.ctx.save();
    this.data.ctx.fillStyle = "#ffffff";                                         // 设置画布背景色
    this.data.ctx.fillRect(0, this.data.canvasHeight - this.data.bottomInfoHeight, this.data.canvasWidth, this.data.bottomInfoHeight); // 填充整个画布
    this.data.ctx.restore();
  },

  // 绘制头像
  drawPhoto() {
    let photoDiam = this.data.photoDiam               // 头像路径
    let photo = this.data.canvas.createImage();       // 创建一个图片对象
    photo.src = this.data.photoUrl                    // 图片对象地址赋值
    photo.onload = () => {
      let radius = photoDiam / 2                      // 圆形头像的半径
      let x = this.data.infoSpace                     // 左上角相对X轴的距离
      let y = this.data.canvasHeight - photoDiam - 70 // 左上角相对Y轴的距离 ：整体高度 - 头像直径 - 微调
      this.data.ctx.save()
      this.data.ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI) // arc方法画曲线，按照中心点坐标计算，所以要加上半径
      this.data.ctx.clip()
      this.data.ctx.drawImage(photo, 0, 0, photo.width, photo.height, x, y, photoDiam, photoDiam) // 详见 drawImage 用法
      this.data.ctx.restore();
    }
  },
  // 绘制小程序码
  drawQrcode() {
    let diam = this.data.qrcodeDiam                    // 小程序码直径
    let qrcode = this.data.canvas.createImage();       // 创建一个图片对象
    qrcode.src = this.data.qrcodeUrl                   // 图片对象地址赋值
    qrcode.onload = () => {
      let radius = diam / 2                                        // 半径，
      let x = this.data.canvasWidth - this.data.infoSpace - diam       // 左上角相对X轴的距离：画布宽 - 间隔 - 直径
      let y = this.data.canvasHeight - this.data.infoSpace - diam - 100   // 左上角相对Y轴的距离 ：画布高 - 间隔 - 直径 + 微调
      this.data.ctx.save()
      this.data.ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI) // arc方法画曲线，按照中心点坐标计算，所以要加上半径
      this.data.ctx.clip()
      this.data.ctx.drawImage(qrcode, 0, 0, qrcode.width, qrcode.height, x, y, diam, diam) // 详见 drawImage 用法
      this.data.ctx.restore();
    }
  },
  // 绘制文字
  drawText() {
    const infoSpace = this.data.infoSpace         // 下面数据间距
    const photoDiam = this.data.photoDiam         // 圆形头像的直径
    this.data.ctx.save();
    this.data.ctx.font = "14px Arial";             // 设置字体大小
    this.data.ctx.fillStyle = "#333333";           // 设置文字颜色
    // 姓名（距左：间距 + 头像直径 + 间距）（距下：总高 - 间距 - 文字高 - 头像直径 + 下移一点 ）
    this.data.ctx.fillText(this.data.name, infoSpace * 2 + photoDiam, this.data.canvasHeight - infoSpace - 14 - photoDiam + 8);
    // 电话（距左：间距 + 头像直径 + 间距 - 微调 ）（距下：总高 - 间距 - 文字高 - 上移一点 ）
    this.data.ctx.fillText(this.data.phone, infoSpace * 2 + photoDiam - 2, this.data.canvasHeight - infoSpace - 14 - 16);
    // 提示语（距左：间距 ）（距下：总高 - 间距 ）
    this.data.ctx.fillText(this.data.tips, infoSpace * 2 + photoDiam - 2, this.data.canvasHeight - infoSpace);
    this.data.ctx.restore();
  },
  drawing() {
    const that = this;
    wx.showLoading({title:"生成中"}) // 显示loading
    that.drawPoster()               // 绘制海报
      .then(function () {           // 这里用同步阻塞一下，因为需要先拿到海报的高度计算整体画布的高度
        // that.drawInfoBg()           // 绘制底部白色背景
        // that.drawPhoto()            // 绘制头像
        that.drawQrcode()           // 绘制小程序码
        // that.drawText()             // 绘制文字
        wx.hideLoading()            // 隐藏loading
      })
  },
  savetup: function () {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 560,
      height: 760,
      destWidth: 560,
      destHeight: 760,
      canvasId: 'myCanvasBig',
      success: function (res) {
        //调取小程序当中获取图片
        console.log(res.tempFilePath);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              title: '图片保存成功！',
              content: '请将图片分享到朋友圈',
              showCancel: false,
              confirmText: '知道了',
              confirmColor: '#72B9C3',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  that.setData({
                    hideshare:true
                  })
                }
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  onReady(){
   
    this.drawImage()
  },
  onLoad: function() {
    if(wx.getStorageSync('curUserInfo')){
      this.setData({
        referrerPhone:wx.getStorageSync('curUserInfo').content.phone,
        qrcodeUrl:config.domain+'/employment-personal/person_/invite/get_wxa_code?sessionToken=' + wx.getStorageSync("sessionToken")
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login/index',
      })
    }
  },
 
  
  //点击保存到相册
  saveShareImg: function() {
    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function() {
      wx.hideLoading();
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.data.canvasWidth,
        height: that.data.canvasHeight,
        destWidth: that.data.canvasWidth*that.data.dpr,
        destHeight:that.data.canvasHeight*that.data.dpr,
        canvas: that.data.canvas,
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showModal({
                title: '图片保存成功！',
                content: '请将图片分享到朋友圈',
                showCancel: false,
                confirmText: '知道了',
                confirmColor: '#72B9C3',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    that.setData({
                      hideshare:true
                    })
                  }
                }
              })
            }
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }, 1000);
  },
  onShareAppMessage: function (res) {
    return {
      title: '薪酷灵活用工平台，为中小企业提供灵活用工及薪资结算服务平台',
      path: '/pages/login/regist/index?referrerPhone='+this.data.referrerPhone,
      imageUrl:'https://xinkush.vipcaihui.cn/image/M00/00/04/rB_sZV9wWwWAanH1AAGEA1_W9DA872.png',
    }
  },
})