const wxp = require('./wx-promise')
const {
  domain,
  context_person,
  context_enterprise
} = require('../config/index')

let showGlobalModal = false

function request(options) {
  return new Promise((resolve, reject) => {
    wxp.request({
        ...options,
        url: fixedDomain(options.url, options.module),
        header: {
          ...options.header,
          // WEB 后台登录 TOKEN
          // 'X-ACCESS-TOKEN': wx.getStorageSync('wx-accesstoken')
        },
        timeout: options.timeout || 15000
      })
      .then(({
        statusCode,
        data
      }) => {
        const {
          code,
          content
        } = data
        if (code === "200") {
          return resolve(data)
        } else if(code === "3"){
            Toast(data)
          return reject(data)
        }else if(code === "2"){
          Toast(data)
          return reject(data)
        }else if(code === "1"){
          Toast(data)
          return reject(data)
        }else if(code === "500"){
          Toast(data)
          return reject(data)
        }else if(code === '401'){
          Toast('登录失效')
          wx.navigateTo({
            url: '/pages/login/login/index',
          })
        }else if(code === '10'){
          Toast(data)
          return reject(data)
        }else if(code === '0000'){
          return resolve(data)
        }else if(code =='0'){
          Toast(data)
          return reject(data)
        }else if(code === '4'){
          Toast(data)
          return reject(data)
        }
        
      })
      .catch((error) => {
        wx.hideLoading()
        if (!showGlobalModal) {
          showGlobalModal = true
          wx.showModal({
            title: '温馨提示',
            content: '当前人数较多，请稍后再试',
            showCancel: false,
            success: () => {
              showGlobalModal = false
            }
          })
        }
        console.error(error)
        return reject(error)
      })
  })
}

function Toast(data){
  wx.showToast({
    title: data.message,
    icon: 'none',
    duration:700
  })
}
function fixedDomain(url, module) {
  let context = context_person;
  if (url.indexOf('http') === 0) {
    return url
  }
  if(module==="enterprise"){
    context = context_enterprise
  }

  return `${domain}${context}${url}`
}

module.exports = {
  request,
}