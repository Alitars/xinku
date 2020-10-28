<template>
  <div class="index">
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

    <div style="margin-top: 5px">
      <el-row :gutter="10">
        <el-col :xs="3" :sm="3" :md="3" :lg="3" class="left-aside">
          <!-- logo 姓名 -->
          <div>
            <div class="sidelogo">
              <img
                src="https://xinkush.vipcaihui.cn/image/M00/00/06/rB_sZV-NVImAFZjUAAA9SStOvaw801.png"
                alt="logo"
              />
              <h3>用户名</h3>
            </div>

            <el-menu
              default-active=""
              class="el-menu-vertical-demo"
              unique-opened
              @select="handleSelect"
              background-color="#fff"
              text-color="#333"
              active-text-color="#40a9ff"
            >
              <!-- 企业信息 -->
              <el-menu-item index="1">
                <i class="el-icon-setting"></i>
                <span slot="title">企业信息</span>
              </el-menu-item>
              <!-- 职位管理 -->
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>职位管理</span>
                </template>
                <el-menu-item index="2-1">职位管理</el-menu-item>
                <el-menu-item index="2-2">发布职位</el-menu-item>
              </el-submenu>
              <!-- 企业管理 -->
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>企业管理</span>
                </template>
                <el-menu-item index="3-1">员工管理</el-menu-item>
                <el-menu-item index="3-2">员工薪资管理</el-menu-item>
              </el-submenu>
              <!-- 企业账户 -->
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>企业账户</span>
                </template>
                <el-menu-item index="4-1">记账簿账号</el-menu-item>
                <el-menu-item index="4-2">账单信息</el-menu-item>
                <el-menu-item index="4-3">提现</el-menu-item>
                <el-menu-item index="4-4">充值</el-menu-item>
                <el-menu-item index="4-5">发票管理</el-menu-item>
              </el-submenu>
              <!-- 安全设置 -->
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>安全设置</span>
                </template>
                <el-menu-item index="5-1">修改登录密码</el-menu-item>
                <el-menu-item index="5-2">修改支付密码</el-menu-item>
                <el-menu-item index="5-3">修改邮箱</el-menu-item>
                <el-menu-item index="5-4">修改企业管理员</el-menu-item>
                <el-menu-item index="5-5">修改对公账号</el-menu-item>
              </el-submenu>
              <!-- 我的推广 -->
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>我的推广</span>
                </template>
                <el-menu-item index="6-1">我要推广</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :xs="21" :sm="21" :md="21" :lg="21">
          <div style="margin-top: 10px">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
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
    handleSelect (key) {
      switch (key) {
        case "1":
          this.$router.push({
            path: "/companyInfo",
          });
          break;
        case "2-1":
          this.$router.push({
            path: "/postManage",
          });
          break;
        case "2-2":
          this.$router.push({
            path: "/sendPost",
          });
          break;
        case "3-1":
          this.$router.push({
            path: "/staffManage",
          });
          break;
        case "3-2":
          this.$router.push({
            path: "/salaryManage",
          });
          break;
        case "4-1":
          this.$router.push({
            path: "/bookAcount",
          });
          break;
        case "4-2":
          this.$router.push({
            path: "/billInfo",
          });
          break;
        case "4-3":
          this.$router.push({
            path: "/cash",
          });
          break;
        case "4-4":
          this.$router.push({
            path: "/credit",
          });
          break;
        case "4-5":
          this.$router.push({
            path: "/invoice",
          });
          break;
        case "5-1":
          this.$router.push({
            path: "/password",
          });
          break;
        case "5-2":
          this.$router.push({
            path: "/payCode",
          });
          break;
        case "5-3":
          this.$router.push({
            path: "/emailCode",
          });
          break;
        case "5-4":
          this.$router.push({
            path: "/contactsCode",
          });
          break;
        case "5-5":
          this.$router.push({
            path: "/editAcount",
          });
          break;
        case "6-1":
          this.$router.push({
            path: "/extension",
          });
          break;
      }
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
}
.el-menu {
  border: none;
}
.el-submenu .el-menu-item {
  text-align: center;
}
</style>