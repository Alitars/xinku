<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-28 16:17:20
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-02 11:39:02
-->
<template>
  <div class="info">
    <div class="tip">充值</div>
    <div class="input">
      <div class="box clearfix">
        <div class="fl pay">付款账户:</div>
        <div class="fl mg40">
          <div>
            企业对公账号
            <el-input
              v-model="proAcount"
              :disabled="true"
              style="width: 300px; margin-left: 40px"
            >
            </el-input>
          </div>
          <div>
            开户行
            <el-input
              v-model="bank"
              :disabled="true"
              style="width: 300px; margin-left: 82px; margin-top: 30px"
            >
            </el-input>
          </div>
        </div>
      </div>
      <div class="center">
        <img src="../../assets/箭号@2x.png" alt="" />
        <div>线下汇款</div>
      </div>
      <div class="box clearfix">
        <div class="fl pay">打款账户:</div>
        <div class="fl mg40">
          <div>
            记账簿注册账号名
            <el-input
              v-model="acountName"
              :disabled="true"
              style="width: 300px; margin-left: 12px"
            >
            </el-input>
          </div>
          <div>
            记账簿注册账号
            <el-input
              v-model="acount"
              :disabled="true"
              style="width: 300px; margin-left: 27px; margin-top: 30px"
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    return {
      proAcount: '企业对公账户',
      bank: '开户行',
      acountName: '记账簿注册账号名',
      acount: '记账簿注册账号'
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
  // 这里存放数据
  beforeCreate () { },
  // 生命周期 - 挂载之前 
  beforeMount () { },
  // 生命周期 - 更新之前 
  beforeUpdate () { },
  // 生命周期 - 更新之后 
  updated () { },
  // 生命周期 - 销毁之前 
  beforeDestroy () { },
  // 生命周期 - 销毁完成 
  destroyed () { },
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated () { }
}
</script>
<style lang='less' scoped>
// @import url(); 引入公共css类
.info {
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.04);
  width: 900px;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 60px;
}
.input {
  padding-top: 40px;
  padding-bottom: 80px;
  margin-left: 210px;
}
.tip {
  margin-left: 30px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  padding-top: 30px;
}
.center {
  margin: 20px 0;
  margin-left: 112px;
  img {
    height: 90px;
    width: 8px;
    vertical-align: middle;
  }
  div {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
    color: #a0a0a0;
    margin-left: 20px;
  }
}
.box {
  font-size: 14px;
  line-height: 40px;
}
.pay {
  color: #000;
  font-weight: 600;
}
.mg40 {
  margin-left: 40px;
}
</style>