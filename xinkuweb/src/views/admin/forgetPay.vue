<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-22 14:18:11
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-30 15:54:00
-->
<template>
  <div class="info">
    <div class="tips">找回支付密码</div>
    <div class="input">
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="支付密码" prop="new">
          <el-input
            v-model="form.new"
            type="password"
            clearable
            style="width: 200px"
            placeholder="请输入新的支付密码"
            maxlength="16"
          ></el-input>
          <div class="psstip">
            请输入首字母大写+小写字母+数字在内6~16位的组合密码
          </div>
        </el-form-item>
        <el-form-item label="确认密码" prop="again">
          <el-input
            v-model="form.again"
            type="password"
            clearable
            style="width: 200px"
            maxlength="16"
            placeholder="请再次确认支付密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input
            placeholder="请输入验证码"
            v-model="form.code"
            style="width: 200px"
            clearable
            maxlength="6"
          ></el-input>
          <el-button
            type="primary"
            @click="sendcode"
            :disabled="disabled"
            v-if="disabled == false"
            style="margin-left: 20px"
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    var old = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码!"));
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确密码格式!"));
      } else {
        callback();
      }
    }
    var again = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码!"));
      } else if (value != this.form.new) {
        callback(new Error("密码不一致，请重新输入!"));
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确密码格式!"));
      } else {
        callback();
      }
    }
    var code = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入验证码！"));
      } else {
        callback();
      }
    };
    // 这里存放数据
    return {
      form: {
        new: '',
        again: '',
        code: '',
      },
      rules: {
        new: [
          { validator: old, trigger: 'blur' }
        ],
        again: [
          { validator: again, trigger: 'blur' }
        ],
        code: [
          { validator: code, trigger: 'blur' }
        ]

      },
      // 发送验证码
      disabled: false,
      time: 0,
      btntxt: "重新发送",
      // 
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    sendcode () {
      this.$message({
        message: '发送成功',
        type: 'success',
        center: true
      });
      this.time = 60;
      this.disabled = true;
      this.timer();
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
    // 跳转忘记支付密码
    gotoPay () {
      this.$router.push({
        path: '/forgetPay'
      })
    },
    // 提交
    onSubmit () {
      this.$refs.form.validate((valid) => {
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
.tips {
  margin-left: 30px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  padding-top: 30px;
}
.input {
  padding-top: 40px;
  padding-bottom: 100px;
  margin-left: 100px;
}
.forget {
  display: inline-block;
  margin-left: 20px;
  color: #979797;
  font-size: 14px;
  cursor: pointer;
}
.forget:hover {
  color: #40a9ff;
}
.psstip {
  display: inline-block;
  margin-left: 20px;
  color: #979797;
  font-size: 14px;
}
</style>