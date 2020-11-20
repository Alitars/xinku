// 广州
module.exports = {
  env: 'dev',   // dev、prod 对应下面的配置
  // domain: 'http://115.29.65.123', //测试服务器 
  // fileBasePath: 'http://115.29.65.123/',
  fileBasePath: 'https://xinkush.vipcaihui.cn/',
  domain: 'https://xinkush.vipcaihui.cn',  //正式服务器
  context_person: "/employment-personal",
  context_enterprise: "/employment-enterprise",
  appid: 'wx4f3bc276ec7424f6',
  captchaAppid: '2030249052', // 腾讯安全验证码的 APPID
  dev: {
  },
  prod: {
  },

  // 区划层级描述 --- 用于区划级联选择器
  regionLevel: [
    {
      title: '市',
    },
    {
      title: '区',
    }
  ],
}
