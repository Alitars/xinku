const { request } = getApp();

exports.login = function(data) {
  return request({
    url: '/person_/personal/loginPersonalUser',
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{ ...data, cityId: 110100}
  })
}