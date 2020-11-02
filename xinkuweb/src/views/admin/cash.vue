<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-28 16:17:20
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-02 10:26:12
-->
<template>
  <div class="info">
    <div class="tip">提现转出</div>

    <div class="input">
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="申请提款余额" prop="money">
          <el-input
            v-model="form.money"
            clearable
            style="width: 300px"
            placeholder="请输入需要提款的金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户余额">
          <el-input
            v-model="form.allmoney"
            :disabled="true"
            style="width: 300px"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="提款银行">
          <el-input
            v-model="form.bankname"
            :disabled="true"
            style="width: 300px"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="开户人">
          <el-input
            v-model="form.acountName"
            :disabled="true"
            style="width: 300px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="支付密码" prop="password">
          <el-input
            v-model="form.password"
            clearable
            type="password"
            style="width: 300px"
            placeholder="请输入支付密码"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="el" label="验证码">
          <el-input
            placeholder="请输入验证码"
            v-model="form.code"
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 150px"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!--  -->
    <div class="tips">
      提醒:建议绑定[上海银行、中国银行、农业银行、工商银行、建设银行、邮储银行、
      中信银行、光大银行、广发银行、兴业银行、平安银行、北京银行],暂不支持华夏
      银行、民生银行
    </div>
  </div>
</template>

<script>

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    var money = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入需要提款的金额!"));
      } else if (value > this.form.allmoney) {
        callback(new Error("您输入的金额大于账户余额，请重新输入!"));
      } else if (!/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的提款金额!(金额为小数点后两位)"));
      } else {
        callback();
      }
    };
    var password = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入支付密码!"));
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("密码格式错误！请输入大小写字母,数字密码且6-16位！"));
      } else {
        callback();
      }
    };
    var code = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入验证码!"));
      } else if (!/^[1-9]\d{1,6}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("输入验证码格式不正确!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        money: '',
        password: '',
        code: '',
        allmoney: 1000,
        bankname: '这里是提款的银行',
        acountName: '这里是开户人'
      },
      rules: {
        money: [
          { validator: money, trigger: 'blur' }
        ],
        password: [
          { validator: password, trigger: 'blur' }
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
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    sendcode () {
      // const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      // if (this.ruleForm.phone == '') {
      //   this.$message({
      //     message: '手机号不能为空',
      //     center: true,
      //     type: 'warning'
      //   })
      //   return
      // }
      // if (!reg.test(this.ruleForm.phone)) {
      //   this.$message({
      //     message: '请输入正确的手机号',
      //     center: true,
      //     type: 'warning'

      //   })
      //   return
      // } else {
      //   this.$message({
      //     message: '发送成功',
      //     type: 'success',
      //     center: true
      //   });
      //   this.time = 60;
      //   this.disabled = true;
      //   this.timer();
      // }
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
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 
          this.$confirm('提现到账时间预计1~3个工作日', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'success ',
            center: true
          })
        } else {
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
.input {
  padding-top: 40px;
  // padding-bottom: 100px;
  margin-left: 210px;
}
.label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  margin-top: 20px;
  .name {
    margin-left: 50px;
  }
}
.unbind {
  margin-top: 20px;
  margin-left: 108px;
}
.tips {
  padding-bottom: 100px;
  margin-left: 210px;
  margin-top: 20px;
  color: #ff1600;
  font-size: 12px;
  width: 420px;
  line-height: 20px;
}
.tip {
  margin-left: 30px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  padding-top: 30px;
}
</style>