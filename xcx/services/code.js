const { request } = getApp();

exports.bankList = function (data) {
  return request({
    url: '/person_/account/queryBank',
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data: data
  })
}