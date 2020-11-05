<template>
  <div class="index">
    <el-container>
      <el-header style="height: 75px; padding: 0" class="header">
        <div class="header clearfix">
          <img src="../assets/logo.png" alt="" class="logo-icon" />
          <!-- 账号登录 -->
          <div class="account fr">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                上海彩荟网络科技有限公司<i
                  class="el-icon-arrow-down el-icon--right"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="topNav clearfix">
            <div
              :class="[showBorder == 0 ? 'active fl' : 'fl']"
              @click="goOther(0)"
            >
              首页
            </div>
            <div
              :class="[showBorder == 1 ? 'active fl' : 'fl']"
              @click="goOther(1)"
            >
              人才搜索
            </div>
            <div
              :class="[showBorder == 2 ? 'active fl' : 'fl']"
              @click="goOther(2)"
            >
              服务产品
            </div>
            <div
              :class="[showBorder == 3 ? 'active fl' : 'fl']"
              @click="goOther(3)"
            >
              站内信
            </div>
            <div
              :class="[showBorder == 4 ? 'active fl' : 'fl']"
              @click="goOther(4)"
            >
              关于我们
            </div>
          </div>
        </div>
      </el-header>
      <el-container style="position: relative">
        <el-aside class="left-aside" style="width: 180px">
          <div>
            <div class="sidelogo">
              <img
                src="https://xinkush.vipcaihui.cn/image/M00/00/06/rB_sZV-NVImAFZjUAAA9SStOvaw801.png"
                alt="logo"
              />
              <h3>用户名</h3>
            </div>

            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              unique-opened
              background-color="#fff"
              text-color="#333"
              :router="true"
              active-text-color="#40a9ff"
            >
              <!-- 企业信息 -->
              <el-menu-item index="/companyInfo">
                <i class="iconfont icon-icon_xinyong_xianxing_jijin--copy"></i>
                <span slot="title">企业信息</span>
              </el-menu-item>
              <!-- 职位管理 -->
              <el-submenu index="2">
                <template slot="title">
                  <i class="iconfont icon-qiyechaxun-copy"></i>
                  <span>职位管理</span>
                </template>
                <el-menu-item index="/postManage">职位管理</el-menu-item>
                <el-menu-item index="/sendPost">发布职位</el-menu-item>
              </el-submenu>
              <!-- 企业管理 -->
              <el-submenu index="3">
                <template slot="title">
                  <i class="iconfont icon-qiyeguanli1-copy"></i>
                  <span>企业管理</span>
                </template>
                <el-menu-item index="/staffManage">员工管理</el-menu-item>
                <el-menu-item index="/salaryManage">员工薪资管理</el-menu-item>
              </el-submenu>
              <!-- 企业账户 -->
              <el-submenu index="4">
                <template slot="title">
                  <i class="iconfont icon-shenhe-copy"></i>
                  <span>企业账户</span>
                </template>
                <el-menu-item index="/bookAcount">记账簿账号</el-menu-item>
                <el-menu-item index="/billInfo">账单信息</el-menu-item>
                <el-menu-item index="/cash">提现</el-menu-item>
                <el-menu-item index="/credit">充值</el-menu-item>
                <el-menu-item index="/invoice">发票管理</el-menu-item>
              </el-submenu>
              <!-- 安全设置 -->
              <el-submenu index="5">
                <template slot="title">
                  <i class="iconfont icon-qiyeshezhi-copy"></i>
                  <span>安全设置</span>
                </template>
                <el-menu-item index="/password">修改登录密码</el-menu-item>
                <el-menu-item index="/payCode">修改支付密码</el-menu-item>
                <el-menu-item index="/emailCode">修改企业邮箱</el-menu-item>
                <el-menu-item index="/contactsCode"
                  >修改企业管理员</el-menu-item
                >
                <el-menu-item index="/editAcount">修改对公账号</el-menu-item>
              </el-submenu>
              <!-- 我的推广 -->
              <el-submenu index="6">
                <template slot="title">
                  <i class="iconfont icon-icon_tuiguang-copy"></i>
                  <span>我的推广</span>
                </template>
                <el-menu-item index="/extension">我要推广</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- </div> -->
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      activeName: 'second',
      showBorder: 0,
    }
  },
  methods: {
    daping () {

    },
    goOther (e) {
      this.showBorder = e
    },
    // 退出登录
    handleCommand (e) {
      if (e == 'loginOut') {
        this.$router.push({
          path: '/login'
        })
      }
    },
  },
}
</script>
<style lang="less" scoped>
.header {
  position: fixed !important;
  top: 0;
  z-index: 9999;
}
.el-main {
  background-color: #fafbff;
  padding: 0 0 20px 180px;
  margin-top: 75px;
  box-sizing: border-box;
}
.index {
  height: 100%;
  .header {
    height: 75px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.04);
    position: relative;
  }
  .containerWrapper {
    width: 100%;
    height: 93%;
    .sidebarWrapper {
      height: 100%;
      width: 10%;
      float: left;
    }
    .contentWrapper {
      width: 90%;
      float: left;
      height: 100%;
      .mainContent {
        height: 100%;
      }
    }
  }
  .el-menu-item {
    padding: 0 20px !important;
    min-width: auto !important;
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
  .account {
    margin-top: 30px;
    margin-right: 20px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
.sidelogo {
  text-align: center;
  margin-top: 30px;
  img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
  h3 {
    font-size: 16px;
    color: #333;
    margin: 14px 0;
  }
}
.left-aside {
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
  padding: 0 !important;
  position: fixed;
  left: 0;
  top: 75px;
  z-index: 99;
}
.el-menu {
  border: none;
}
.el-submenu .el-menu-item {
  text-align: center;
}
</style>