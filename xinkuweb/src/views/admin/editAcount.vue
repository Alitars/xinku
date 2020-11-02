<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-28 16:17:20
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-02 09:09:54
-->
<template>
  <div class="info">
    <div class="tip">{{ flag == true ? '绑定对公账号' : '解绑对公账号' }}</div>

    <div class="input" v-if="flag">
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="开户名称" prop="name">
          <el-input
            v-model="form.name"
            clearable
            style="width: 300px"
            placeholder="请输入开户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="bank">
          <el-select
            v-model="form.bank"
            placeholder="请选择开户银行"
            style="width: 300px"
          >
            <el-option
              v-for="item in bank"
              :key="item.bankId"
              :label="item.bankName"
              :value="item.bankId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对公账号" prop="acount">
          <el-input
            v-model="form.acount"
            clearable
            style="width: 300px"
            placeholder="请输入对公账号"
            maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="分行名称" prop="bankname">
          <el-input
            v-model="form.bankname"
            clearable
            style="width: 300px"
            placeholder="请输入分行名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="el">
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
    <div class="input" v-else>
      <div class="label clearfix">
        <div class="fl">开户名称</div>
        <el-input
          placeholder="开户行名称"
          v-model="checkform.name"
          :disabled="true"
          style="width: 300px; margin-left: 50px"
        >
        </el-input>
      </div>
      <div class="label clearfix">
        <div class="fl">开户银行</div>
        <el-input
          placeholder="开户行名称"
          v-model="checkform.bankname"
          :disabled="true"
          style="width: 300px; margin-left: 50px"
        >
        </el-input>
      </div>
      <div class="label clearfix">
        <div class="fl">对公账号</div>
        <el-input
          placeholder="开户行名称"
          v-model="checkform.acount"
          :disabled="true"
          style="width: 300px; margin-left: 50px"
        >
        </el-input>
      </div>
      <div class="label clearfix">
        <div class="fl">分行名称</div>
        <el-input
          placeholder="开户行名称"
          v-model="checkform.bank"
          :disabled="true"
          style="width: 300px; margin-left: 50px"
        >
        </el-input>
      </div>
      <div class="unbind">
        <el-button type="primary" @click="unbind()" style="width: 150px"
          >解绑对公账号</el-button
        >
      </div>
    </div>
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
    var name = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入开户名称!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的开户名称!"));
      } else {
        callback();
      }
    };
    var acount = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入对公账号!"));
      } else if (!/^[1-9]\d{7,29}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的对公账号！"));
      } else {
        callback();
      }
    };
    var bankname = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入分行名称!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的分行名称!"));
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
        name: '',
        acount: '',
        bankname: '',
        bank: '',
        code: ''
      },
      checkform: {
        name: '这里是开户行',
        bankname: '上海银行',
        acount: '这里是对公账号',
        bank: '这里是分行的名称',
      },
      rules: {
        name: [
          { validator: name, trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请选择开户银行！', trigger: 'change' }
        ],
        acount: [
          { validator: acount, trigger: 'blur' }
        ],
        bankname: [
          { validator: bankname, trigger: 'blur' }
        ],
        code: [
          { validator: code, trigger: 'blur' }
        ],
      },
      bank: [
        { bankId: 1, bankName: "中国建设银行", boshBankCode: "PCBC" },
        { bankId: 2, bankName: "中国工商银行", boshBankCode: "ICBK" },
        { bankId: 3, bankName: "中国农业银行", boshBankCode: "ABOC" },
        { bankId: 4, bankName: "中国银行", boshBankCode: "BKCH" },
        { bankId: 5, bankName: "交通银行", boshBankCode: "COMM" },
        { bankId: 6, bankName: "招商银行", boshBankCode: "CMBC" },
        { bankId: 7, bankName: "中信银行", boshBankCode: "CIBK" },
        { bankId: 8, bankName: "中国民生银行", boshBankCode: "MSBC" },
        { bankId: 9, bankName: "兴业银行", boshBankCode: "FJIB" },
        { bankId: 10, bankName: "上海浦东发展银行", boshBankCode: null },
        { bankId: 11, bankName: "中国邮政储蓄银行", boshBankCode: "PSBC" },
        { bankId: 12, bankName: "中国光大银行", boshBankCode: "EVER" },
        { bankId: 13, bankName: "平安银行", boshBankCode: "SZDB" },
        { bankId: 14, bankName: "华夏银行", boshBankCode: "HXBK" },
        { bankId: 15, bankName: "北京银行", boshBankCode: "BJCN" },
        { bankId: 16, bankName: "广发银行", boshBankCode: "GDBK" },
        { bankId: 17, bankName: "上海银行", boshBankCode: "BOSH" },
        { bankId: 18, bankName: "江苏银行", boshBankCode: "BOJS" },
        { bankId: 19, bankName: "浙商银行", boshBankCode: "ZJCB" },
        { bankId: 20, bankName: "南京银行", boshBankCode: "NJCB" },
      ],

      // 发送验证码
      disabled: false,
      time: 0,
      btntxt: "重新发送",
      // 
      flag: false,
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
    // 解绑对公账号
    unbind () {
      this.flag = true
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
          this.flag = false
        } else {
          console.log('error submit!!');
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
  width: 660px;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 60px;
}
.input {
  padding-top: 40px;
  // padding-bottom: 100px;
  margin-left: 100px;
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
  margin-left: 100px;
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