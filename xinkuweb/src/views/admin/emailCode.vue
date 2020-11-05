<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-27 18:45:34
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-03 13:44:33
-->
<template>
  <div class="info">
    <div class="tips">修改企业邮箱</div>
    <div class="input">
      <el-form
        ref="form"
        label-width="100px"
        class="demo-dynamic"
        label-position="left"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="email" label="企业邮箱">
          <el-input
            v-model="form.email"
            placeholder="请输入企业邮箱"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input
            placeholder="请输入验证码"
            v-model="form.code"
            style="width: 160px"
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
          <el-button type="primary" @click="submitForm">确定修改</el-button>
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
    // 这里存放数据
    var code = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入验证码！"));
      } else {
        callback();
      }
    };
    return {
      form: {
        email: '',
        code: '',
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
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
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 放请求
        } else {
          this.$message({
            message: '请输入核对输入的内容是否正确！',
            center: true,
            type: 'warning'
          })
          return false;
        }
      });
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
<style lang='less' scoped>
// @import url(); 引入公共css类
.info {
  width: 670px;
  margin: 0 auto;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  border-radius: 10px;
  margin-top: 60px;
}
.input {
  padding-top: 40px;
  padding-bottom: 100px;
  margin-left: 100px;
  margin-right: 100px;
}
.tips {
  margin-left: 30px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  padding-top: 30px;
}
</style>