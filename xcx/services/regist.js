const { request } = getApp();

exports.regist = function (data) {
  return request({
    url: '/person_/personal/addPersonalUser',
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data
  })
}

exports.sendSecurityCode = function (mobilePhone) {
  return request({
    url: `/person_/personal/sendSecurityCode?mobilePhone=${mobilePhone}`,
    method: 'POST'
  })
}

// 企业注册发送信息
exports.ndSecurityCode = function (mobilePhone) {
  return request({
    url: `/company_/bususer/ndSecurityCode`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    module: "enterprise",
    data: {
      mobilePhone
    }
  })
}
// 找回密码
exports.findPassword = function(data){
  return request({
    url: '/person_/personal/editPersonalUser',
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data
  })
}

exports.registEnterprise = function (data) {
  return request({
    url: '/company_/bususer/reg',
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    module: "enterprise",
    method: 'POST',
    data
  })
}