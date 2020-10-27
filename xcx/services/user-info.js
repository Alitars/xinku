const { request } = getApp();

// 获取用户详细信息
exports.queryUserMessage = function (sessionToken = "31f7aad7861fa805049910eabbe33108") {
  return request({
    url: `/person_/account/queryUserMessage?sessionToken=${sessionToken}`,
    method: 'GET'
  })
}

// 获取个人简历信息
exports.queryJobInfo = function (sessionToken) {
  return request({
    url: `/person_/center/queryJobInfo`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken: sessionToken
    }
  })
}

// 获取任务列表
exports.getJobList = function(sessionToken,pageSize,page,positionTime){
  return request({
    url: `/person_/internship/selectsigninfo`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken: sessionToken,
      pageSize:pageSize,
      page:page,
      positionTime:positionTime
    }
  })
}


//  修改个人信息特殊短信发送
exports.sendSecurityCodeToBoshByToken = function (sessionToken) {
  return request({
    url: `/person_/personal/sendSecurityCodeOnBosh`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data: {
      sessionToken: sessionToken
    }
  })
}


//  身份证上传
exports.addImageAddress = function (data) {
  return request({
    url: `/person_/center/addImageAddress`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data
  })
}


//  个人信息修改
exports.editJobInfo = function (data) {
  return request({
    url: `/person_/center/editJobInfo`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data
  })
}


//  个人信息修改
exports.addHeadAddress = function (data) {
  return request({
    url: `/person_/center/addHeadAddress`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data
  })
}

// 我的账单
exports.myAcount = function (sessionToken) {
  return request({
    url: `/person_/account/queryBillDetail`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
      page:1,
      positionTime:4,
    }
  })
}

// 薪资记录
exports.salaryRecords = function (sessionToken) {
  return request({
    url: `/person_/account/querySalaryDetail`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
      page:1,
      positionTime:4,
    }
  })
}


// 账户余额
exports.AccountBal = function (sessionToken) {
  return request({
    url: `/person_/account/queryUserBalance`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
    }
  })
}

// 获取银行卡信息
exports.getCardInfo = function (sessionToken) {
  return request({
    url: `/person_/account/queryUserCards`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
    }
  })
}

// 提现
exports.submitMoney = function (sessionToken,withdrawalsMoney,cardId) {
  return request({
    url: `/person_/bosh/withdraw`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
      withdrawalsMoney:withdrawalsMoney,
      cardId:cardId
    }
  })
}

// 获取任务详情

exports.getTaskDetail = function (sessionToken,enterpriseId,positionId) {
  return request({
    url: `/person_/internship/queryInternshipDetailsToken`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
      enterpriseId:enterpriseId,
      positionId:positionId
    }
  })
}
// 接受任务
exports.doTask = function (sessionToken,signId) {
  return request({
    url: `/person_/internship/updatesigninfo`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
      signId:signId,
      signAgreement:''
    }
  })
}

// 推广

exports.invite = function (sessionToken,name,phone,type,orgName) {
  return request({
    url: `/person_/invite/add`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
      name:name,
      phone:phone,
      type:type == '企业'?2:1,
      orgName:orgName?orgName:''
    }
  })
}

// 身份验证

exports.checkId = function (sessionToken) {
  return request({
    url: `/person_/account/queryUserMessage`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
    }
  })
}

// 获取推广人数

exports.getNum = function (sessionToken) {
  return request({
    url: `/person_/invite/report`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
    }
  })
}

// 今日详情
exports.today = function (sessionToken) {
  return request({
    url: `/person_/invite/today_report`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
    }
  })
}

// 昨日详情yesterday
exports.yesterday = function (sessionToken) {
  return request({
    url: `/person_/invite/yesterday_report`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
    }
  })
}
// 推广详情
exports.reportDetail= function (sessionToken,page,type,queryDate) {
  return request({
    url: `/person_/invite/my_list`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
      page:page,
      pageSize:15,
      type:type,
      queryDate:queryDate
    }
  })
}

// 收益详情 
exports.commission= function (sessionToken,page,queryDate) {
  return request({
    url: `/person_/invite/commission/list`,
    header: {
      "Content-Type": "application/x-www-form-urlencoded" //使用form方式传递参数
    },
    method: 'POST',
    data:{
      sessionToken:sessionToken,
      page:page,
      pageSize:10,
      queryDate:queryDate
    }
  })
}