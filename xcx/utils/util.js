const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const checkPhone = phone => {
  if (!(/^1[3456789]\d{9}$/.test(phone))) {
    // alert("手机号码有误，请重填");
    return false;
  }else{
    return true;
  }
}


// 登录判断
const netWork = () =>{
  var checkToken = wx.getStorageSync('sessionToken')
  if(checkToken.length == 0||checkToken == ''||checkToken == null){
    wx.showToast({
      title: '登录失效，请重新登录',
      icon: 'none',
      duration: 2000,
    })
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/login/login/index',
      })
    }, 2000);
  }
}
module.exports = {
  formatTime: formatTime,
  formatDate,
  checkPhone,
  netWork,
}
