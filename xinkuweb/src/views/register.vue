<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-26 16:03:15
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-28 09:47:56
-->
<template>
  <div class="box">
    <div class="tit clearfix">
      <h1 class="fl">注册企业用户</h1>
      <h2 class="fr" @click="goback">
        返回登录<img src="../assets/back.png" alt="" />
      </h2>
    </div>
    <!-- 表单 -->
    <div class="form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="phone" class="el">
          <el-input
            placeholder="请输入手机号码"
            v-model="ruleForm.phone"
            clearable
            maxlength="11"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="name" class="el" style="margin-bottom: 10px">
          <el-input
            placeholder="请输入企业联系人姓名"
            v-model="ruleForm.name"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item class="el" style="margin-bottom: 0">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="password" class="el">
          <el-input
            placeholder="请输入包含数字字母在内6~16的组合密码"
            v-model="ruleForm.password"
            type="password"
            clearable
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="el">
          <el-input
            placeholder="请再次输入密码"
            v-model="ruleForm.checkPass"
            type="password"
            maxlength="16"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="invite" class="el">
          <el-input
            placeholder="请输入邀请人手机号(非必填)"
            v-model="ruleForm.invite"
            maxlength="11"
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
          <el-checkbox v-model="checked" disabled>我已阅读并接受</el-checkbox>
          <div @click="open">
            <h1>《平台注册服务协议》《平台隐私权政策》</h1>
            <h1>《上海银行电商资金管理业务服务协议》</h1>
          </div>
        </div>
        <el-form-item style="width: 50%; margin: 0 auto; margin-top: 20px">
          <el-button type="primary" style="width: 100%" @click="submit"
            >同意并完成注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- diolog -->
    <el-dialog title="协议" :visible.sync="textShow" width="30%" center>
      <div v-html="text"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="read">确认阅读</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import agreement from '../utils/agreement.js'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    var phone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入手机号!"));
      } else if (!/^1(3|4|5|6|7|8)\d{9}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    var name = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入企业联系人姓名!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的联系人姓名!"));
      } else {
        callback();
      }
    };
    var password = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码!"));
      } else if (!/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,16}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确密码格式!"));
      } else {
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码!"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("密码不一致，请重新输入!"));
      } else if (!/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,16}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确密码格式!"));
      } else {
        callback();
      }
    };
    var invite = (rule, value, callback) => {
      if (value == "") {
        callback();
      } else if (!/^1(3|4|5|6|7|8)\d{9}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    var code = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入验证码！"));
      } else {
        callback();
      }
    };
    // 这里存放数据
    return {
      ruleForm: {
        phone: '',
        name: '',
        sex: '0',
        password: '',
        checkPass: '',
        invite: '',
        code: ''
      },
      rules: {
        phone: [
          { validator: phone, trigger: 'blur' }
        ],
        name: [
          { validator: name, trigger: 'blur' }
        ],
        password: [
          { validator: password, trigger: 'blur' }
        ],
        checkPass: [
          { validator: checkPass, trigger: 'blur' }
        ],
        invite: [
          { validator: invite, trigger: 'blur' }
        ],
        code: [
          { validator: code, trigger: 'blur' }
        ],
      },
      // 发送验证码
      disabled: false,
      time: 0,
      btntxt: "重新发送",
      // 
      checked: false,
      textShow: false,
      text: agreement.agreement
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    open () {
      this.textShow = true
      this.checked = true
    },
    read () {
      this.textShow = false
    },
    sendcode () {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.ruleForm.phone == '') {
        this.$message({
          message: '手机号不能为空',
          center: true,
          type: 'warning'
        })
        return
      }
      if (!reg.test(this.ruleForm.phone)) {
        this.$message({
          message: '请输入正确的手机号',
          center: true,
          type: 'warning'

        })
        return
      } else {
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
    goback () {
      this.$router.push({
        path: "/login",
      })
    },
    // 提交表单
    submit () {
      if (this.checked == false) {
        this.$message({
          message: '请先阅读相关协议！',
          center: true,
          type: 'warning'
        })
        return false;
      } else {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            // 发送请求跳转
          } else {
            this.$message({
              message: '请核实输入的相关信息',
              center: true,
              type: 'warning'
            })
            return false;
          }
        });
      }

    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
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
.box {
  width: 400px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 70px;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 30px;
  box-sizing: border-box;
  .tit {
    h1 {
      font-size: 20px;
      font-weight: 600;
    }
    h2 {
      font-size: 14px;
      height: 22px;
      line-height: 22px;
      color: #40a9ff;
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
  }
  .form {
    margin-top: 20px;
  }
}
.el {
  margin: 0 auto;
  margin-bottom: 20px;
}
.for {
  h1 {
    color: #40a9ff;
    font-size: 14px;
    margin-top: 8px;
    margin-left: 18px;
    cursor: pointer;
  }
}
</style>