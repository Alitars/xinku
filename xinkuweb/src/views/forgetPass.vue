<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-26 15:19:17
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-27 16:19:33
-->
<template>
  <div class="login clearfix">
    <div class="fl left">
      <img
        src="https://xinkush.vipcaihui.cn/image/M00/00/06/rB_sZV-WmCSAGEKwAAF6P6bNX2M039.png"
        alt=""
      />
    </div>
    <div class="fr right">
      <div class="clearfix">
        <h1 class="fl">忘记密码</h1>
        <h2 class="fr" @click="goback">
          返回登录 <img src="../assets/back.png" alt="" />
        </h2>
      </div>
      <!-- 登录 -->
      <div class="inputbox">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item
            prop="phone"
            style="margin: 0 auto; margin-bottom: 20px"
          >
            <el-input
              placeholder="请输入手机号码"
              v-model="ruleForm.phone"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            style="margin: 0 auto; margin-bottom: 20px"
          >
            <el-input
              placeholder="请输入包含数字字母在内6~16的组合密码"
              v-model="ruleForm.password"
              type="password"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="checkPass"
            style="margin: 0 auto; margin-bottom: 20px"
          >
            <el-input
              placeholder="请再次输入密码"
              v-model="ruleForm.checkPass"
              type="password"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="code" class="el">
            <el-input
              placeholder="请输入验证码"
              v-model="ruleForm.code"
              clearable
              maxlength="6"
              style="width: 150px"
            ></el-input>
            <el-button
              type="primary"
              @click="sendcode"
              :disabled="disabled"
              v-if="disabled == false"
              style="margin-left: 6px"
              >发送验证码
            </el-button>
            <el-button
              type="primary"
              @click="sendcode"
              :disabled="disabled"
              v-if="disabled == true"
              style="margin-left: 6px"
              >{{ btntxt }}
            </el-button>
          </el-form-item>
          <div class="clearfix for">
            <!-- <div class="change">切换密码登录</div> -->
            <!-- <div class="change">切换验证码登录</div> -->
            <!-- <el-checkbox v-model="checked">记住密码</el-checkbox> -->
            <!-- <div class="forget" @click="gotoForget">忘记密码</div> -->
          </div>
          <el-form-item style="width: 80%; margin: 0 auto">
            <el-button type="primary" style="width: 100%" @click="submitForm"
              >修改密码</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入验证码'));
      } else {
        if (this.ruleForm.checkCode !== '') {
          this.$refs.ruleForm.validateField('checkCode');
        }
        callback();
      }
    };
    return {
      ruleForm: {
        phone: '',
        password: '',
        // checkCode: '',
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { validator: checkphone, trigger: 'blur' }
        ],
        checkCode: [
          { validator: checkCode, trigger: 'blur' }
        ]
      },
      disabled: false,
      time: 0,
      btntxt: "重新发送",
      checked: false,//记住密码
    };
  },
  methods: {
    sendcode () {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.ruleForm.phone == '') {
        this.$message({
          message: '手机号不能为空',
          center: true
        })
        return
      }
      if (!reg.test(this.ruleForm.phone)) {
        this.$message({
          message: '请输入正确的手机号',
          center: true
        })
        return
      } else {
        console.log(this.ruleForm.phone);
        this.$message({
          message: '发送成功',
          type: 'success',
          center: true
        });
        this.time = 60;
        this.disabled = true;
        this.timer();
      }
    },
    //60S倒计时
    timer () {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    // 检查手机号码
    isCellPhone (val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    // 登录
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 发送请求跳转
        } else {
          this.$message({
            message: '请核实输入的手机号以及密码',
            center: true,
            type: 'warning'
          })
          return false;
        }
      });
    },
    // 跳转忘记密码
    goback () {
      this.$router.push({
        path: "/login",
      });
    }
  }
}
</script>
<style lang='less' scoped>
// @import url(); 引入公共css类
.login {
  width: 700px;
  // height: 500px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 70px;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 30px;
  box-sizing: border-box;
  .left {
    width: 40%;
    height: 100%;
    margin-top: 80px;
    img {
      width: 100%;
    }
  }
  .right {
    width: 60%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    h1 {
      font-size: 22px;
      font-weight: 600;
      margin-left: 20px;
    }
    h2 {
      cursor: pointer;
      font-size: 14px;
      color: #40a9ff;
      height: 22px;
      line-height: 22px;
      position: relative;
      padding-right: 16px;
      cursor: pointer;
      img {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 14px;
        width: 8px;
      }
    }
    .inputbox {
      margin-top: 22px;
      margin-left: 20px;
    }
    .forget {
      cursor: pointer;
      color: #adadad;
      float: right;
      line-height: 19px;
      font-size: 14px;
    }
    .change {
      cursor: pointer;
      color: #40a9ff;
      float: left;
    }
    .forget:hover {
      color: #40a9ff;
    }
    .for {
      margin-bottom: 20px;
    }
    .register {
      cursor: pointer;
      color: #adadad;
      text-align: center;
      margin-top: 20px;
    }
    .register:hover {
      color: #40a9ff;
    }
  }
}
// 发送验证码
// .code {
//   .el-input {
//     width: 55%;
//     border-radius: 0px;
//     float: left;
//     display: inline-block;
//   }
//   .el-button {
//     width: 45%;
//     border-top-left-radius: 0px;
//     border-bottom-left-radius: 0px;
//     border-left: 0px;
//     float: left;
//     display: inline-block;
//   }
// }
</style>