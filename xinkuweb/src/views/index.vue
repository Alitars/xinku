<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-19 17:04:39
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-26 10:29:48
-->
<template>
  <div class="container">
    <!-- <el-row>
      <el-button @click="gotoHome">默认按钮</el-button>
      <el-button @click="login">跳转登录</el-button>
    </el-row> -->
    <div class="header clearfix">
      <img src="../assets/logo.png" alt="" class="logo-icon" />
      <div class="topNav clearfix">
        <div
          :class="[showBorder == 0 ? 'active fl' : 'fl']"
          @click="goOther(0)"
        >
          首页
        </div>
        <div
          :class="[showBorder == 4 ? 'active fl' : 'fl']"
          @click="goOther(4)"
        >
          关于我们
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      showBorder: 1,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合

  methods: {
    gotoHome () {
      this.$router.push({ path: "/Homes" });
    },
    login () {
      this.$router.push({ path: "/login" })
    },
    goOther (e) {
      this.showBorder = e
    },
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
<style lang='scss' scoped>
.container {
  background-color: #fafbff;
}
.header {
  height: 75px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.04);
  position: relative;
}
.logo-icon {
  width: 200px;
  height: 60px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}
.topNav {
  float: right;
  line-height: 73px;
  font-size: 16px;
  margin-right: 50px;
  div {
    margin: 0 20px;
    cursor: pointer;
    width: 74px;
    text-align: center;
    height: 60px;
  }
  .active {
    border-bottom: 2px solid #40a9ff;
    color: #40a9ff;
  }
}
// @import url(); 引入公共css类
</style>