<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-22 13:56:41
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-06 16:12:13
-->
<template>
  <div class="cotainer">
    <!-- 头部标题 -->
    <div class="info topBox">
      <div class="img">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604310092339&di=849416af2d76d002c5c497836099bcd3&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F16%2F20200716225555_ensit.thumb.400_0.jpg"
          alt=""
        />
      </div>
      <div class="tip clearfix">
        <div class="fl text">
          <div class="radius">1</div>
          <div class="divinfo">填写企业信息</div>
        </div>
        <div class="fl">
          <img src="../../assets/rpe.png" alt="" class="elis" />
        </div>
        <div class="fl text">
          <div class="radius">2</div>
          <div class="divinfo">开通上海记账簿账户</div>
        </div>
      </div>
    </div>
    <!-- 企业基本信息 -->
    <div class="info">
      <div class="tips">企业基本信息</div>
      <div class="input">
        <el-form
          ref="form"
          label-position="left"
          :model="form"
          label-width="180px"
          :rules="rules"
        >
          <el-form-item label="上传企业电子营业执照">
            <!-- <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
            </el-upload> -->

            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="succsUpload"
              :before-upload="beforeAvatarUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="企业名称" prop="company">
            <el-input
              v-model="form.company"
              clearable
              style="width: 200px"
              placeholder="请输入企业名称"
            ></el-input>
            <div class="psstip" style="color: #ff1600">
              请输入营业执照上的公司全称,避免开户失败
            </div>
          </el-form-item>
          <el-form-item label="统一社会信用代码" prop="socialCode">
            <el-input
              maxlength="18"
              v-model="form.socialCode"
              clearable
              style="width: 200px"
              placeholder="请输入统一社会信用代码"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业规模" prop="size">
            <!-- <el-select
              v-model="form.size"
              placeholder="请选择企业规模"
              style="width: 200px"
            >
              <el-option label="1-20人" value="1"></el-option>
              <el-option label="20-99人" value="2"></el-option>
              <el-option label="99-250人" value="3"></el-option>
              <el-option label="500人以上" value="4"></el-option>
            </el-select> -->
            <el-select
              v-model="form.size"
              placeholder="请选择企业规模"
              style="width: 200px"
            >
              <el-option
                v-for="item in size"
                :key="item.id"
                :label="item.size"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册资金" prop="registerMoney">
            <el-input
              v-model="form.registerMoney"
              clearable
              style="width: 200px"
              placeholder="请输入公司注册资金"
            ></el-input>
            <div class="psstip" style="color: #333">万</div>
          </el-form-item>
          <el-form-item label="创办时间" prop="date">
            <el-date-picker
              type="date"
              placeholder="请选择创办时间"
              v-model="form.date"
              style="width: 200px"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              :editable="false"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="法人姓名" prop="headName">
            <el-input
              v-model="form.headName"
              clearable
              style="width: 200px"
              placeholder="请输入法人姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="法人身份证证件号" prop="idcard">
            <el-input
              v-model="form.idcard"
              clearable
              style="width: 200px"
              maxlength="18"
              placeholder="请输入法人身份证证件号"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业管理员手机号" prop="companyPhone">
            <el-input
              v-model="form.companyPhone"
              clearable
              style="width: 200px"
              maxlength="11"
              placeholder="请输入企业管理员手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业邮箱" prop="email">
            <el-input
              v-model="form.email"
              clearable
              style="width: 200px"
              placeholder="请输入企业邮箱"
            ></el-input>
          </el-form-item>
          <!-- 后台数据 -->
          <el-form-item label="行业所属">
            <el-input
              v-model="form.company"
              clearable
              style="width: 200px"
              placeholder="请输入企业名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业性质">
            <el-input
              v-model="form.company"
              clearable
              style="width: 200px"
              placeholder="请输入企业名称"
            ></el-input>
          </el-form-item>
          <!--  -->
          <el-form-item label="企业介绍" prop="introduce">
            <el-input
              type="textarea"
              v-model="form.introduce"
              placeholder="请输入企业介绍"
              maxlength="100"
              minlength="20"
              rows="5"
              resize="none"
              show-word-limit
              style="width: 400px"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 企业绑卡信息 -->
    <div class="info">
      <div class="tips">企业绑卡信息</div>
      <div class="input">
        <el-form
          ref="formInfo"
          label-position="left"
          :model="formInfo"
          label-width="120px"
          :rules="rules"
        >
          <el-form-item label="开户名称" prop="name">
            <el-input
              v-model="formInfo.name"
              clearable
              style="width: 200px"
              placeholder="请输入开户名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户银行" prop="bank">
            <el-input
              v-model="formInfo.bank"
              clearable
              style="width: 200px"
              placeholder="请输入开户银行"
            ></el-input>
          </el-form-item>
          <el-form-item label="对公账号" prop="bankAcount">
            <el-input
              v-model="formInfo.bankAcount"
              clearable
              style="width: 200px"
              placeholder="请输入对公账号"
              maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item label="分行名称" prop="bankName">
            <el-input
              v-model="formInfo.bankName"
              clearable
              style="width: 200px"
              placeholder="请输入分行名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付密码" prop="payCode">
            <el-input
              v-model="formInfo.payCode"
              clearable
              type="password"
              maxlength="6"
              style="width: 200px"
              placeholder="请输入支付密码"
            ></el-input>
            <div class="psstip">请输入6位的数字密码</div>
          </el-form-item>
          <el-form-item label="确认支付密码" prop="check">
            <el-input
              v-model="formInfo.check"
              clearable
              type="password"
              maxlength="6"
              style="width: 200px"
              placeholder="请输入确认支付密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 企业开票信息 -->
    <div class="info">
      <div class="tips">企业开票信息</div>
      <div class="input">
        <el-form
          ref="formBill"
          label-position="left"
          :model="formBill"
          label-width="120px"
          :rules="rules"
          :inline="true"
        >
          <el-form-item label="账户名称" prop="acountName">
            <el-input
              v-model="formBill.acountName"
              clearable
              style="width: 200px"
              placeholder="请输入账户名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="displace" class="displace">
            <el-input
              v-model="formBill.displace"
              clearable
              style="width: 200px"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号" prop="acountName">
            <el-input
              v-model="formBill.acountName"
              clearable
              style="width: 200px"
              placeholder="请输入纳税人识别号"
            ></el-input>
          </el-form-item>
          <el-form-item label="对公账号" prop="acountName" class="displace">
            <el-input
              v-model="formBill.acountName"
              clearable
              style="width: 200px"
              placeholder="请输入对公账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户银行" prop="acountName">
            <el-input
              v-model="formBill.acountName"
              clearable
              style="width: 200px"
              placeholder="请输入开户银行"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="acountName" class="displace">
            <el-input
              v-model="formBill.acountName"
              clearable
              style="width: 200px"
              placeholder="请输入电话"
            ></el-input>
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
    var company = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入企业名称!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的企业名称!"));
      } else {
        callback();
      }
    };
    var socialCode = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入统一社会信用代码!"));
      } else if (!/^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的统一社会信用代码!"));
      } else {
        callback();
      }
    };
    var registerMoney = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入注册资金!"));
      } else if (!/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的注册资金!"));
      } else {
        callback();
      }
    };
    var headName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入企业法人姓名!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的企业法人姓名!"));
      } else {
        callback();
      }
    };
    var idcard = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入法人身份证信息!"));
      } else if (!/^[1-8][1-7]\d{4}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的法人身份证信息!"));
      } else {
        callback();
      }
    };
    var companyPhone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入企业管理员手机号!"));
      } else if (!/^1(3|4|5|6|7|8)\d{9}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的企业管理员手机号!"));
      } else {
        callback();
      }
    };
    var email = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入企业邮箱!"));
      } else if (!/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的企业邮箱!"));
      } else {
        callback();
      }
    };
    var name = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入开户名称!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的开户名称!"));
      } else {
        callback();
      }
    };
    var bank = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入开户行!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的开户行!"));
      } else {
        callback();
      }
    };
    var bankAcount = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入对公账户!"));
      } else if (!/^[1-9]\d{7,29}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的对公账户!"));
      } else {
        callback();
      }
    };
    var bankName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入分行名称!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的分行名称!"));
      } else {
        callback();
      }
    };
    var payCode = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入支付密码!"));
      } else if (!/^\d{6}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的密码格式!"));
      } else {
        callback();
      }
    };
    var check = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入支付密码!"));
      } else if (value != this.formInfo.payCode) {
        callback(new Error("密码不一致，请重新输入!"));
      } else if (!/^\d{6}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的密码格式!"));
      } else {
        callback();
      }
    };
    var acountName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入账户名称!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的账户名称!"));
      } else {
        callback();
      }
    };
    var displace = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入地址信息!"));
      }
      // else if (!/[\u4e00-\u9fa5]/.test(value)) {//引入methods中封装的检查手机格式的方法
      //   callback(new Error("请输入正确的地址信息!"));
      // } 
      else {
        callback();
      }
    };
    var introduce = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入企业介绍!"));
      }
      else {
        callback();
      }
    };
    // /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/
    return {
      // 时间选择禁止选未来时间
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        }
      },
      imageUrl: '',
      form: {
        company: '',//企业名称
        socialCode: '',//社会信用代码
        size: '', //企业规模
        registerMoney: '',//注册资金
        date: '',//创办时间
        headName: '',//企业法人
        idcard: '',//身份证
        companyPhone: '',//企业联系人手机号
        email: '',//企业邮箱
        introduce: '',//企业介绍
      },
      formInfo: {
        name: '',//开户名称
        bank: '',//开户行
        bankAcount: '',//对公账户
        bankName: '',//分行名称
        payCode: '',//支付密码
        check: '',//确认支付密码
      },
      formBill: {
        acountName: '',//账号名称
        displace: '',//地址
      },
      rules: {
        company: [
          { validator: company, trigger: 'blur' }
        ],
        socialCode: [
          { validator: socialCode, trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请选择企业规模', trigger: 'change' }
        ],
        registerMoney: [
          { validator: registerMoney, trigger: 'blur' }
        ],
        // date type 由date改为string ，change getTime()方法报错
        date: [
          { required: true, type: 'string', message: '请选择日期', trigger: 'change' }
        ],
        headName: [
          { validator: headName, trigger: 'blur' }
        ],
        idcard: [
          { validator: idcard, trigger: 'blur' }
        ],
        companyPhone: [
          { validator: companyPhone, trigger: 'blur' }
        ],
        email: [
          { validator: email, trigger: 'blur' }
        ],
        introduce: [
          { validator: introduce, trigger: 'blur' }
        ],
        // 绑卡信息
        name: [
          { validator: name, trigger: 'blur' }
        ],
        bank: [
          { validator: bank, trigger: 'blur' }
        ],
        bankAcount: [
          { validator: bankAcount, trigger: 'blur' }
        ],
        bankName: [
          { validator: bankName, trigger: 'blur' }
        ],
        payCode: [
          { validator: payCode, trigger: 'blur' }
        ],
        check: [
          { validator: check, trigger: 'blur' }
        ],
        // 企业开票信息
        acountName: [
          { validator: acountName, trigger: 'blur' }
        ],
        displace: [
          { validator: displace, trigger: 'blur' }
        ],
      },
      size: [
        { id: '1', size: "微型(0-10人)", },
        { id: '2', size: "小型(11-100人)", },
        { id: '3', size: "中型(101-500人)", },
        { id: '4', size: "大型(500人以上)", },
      ]
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    succsUpload (e, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
  width: 1000px;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 30px;
}
.text {
  text-align: center;
  .divinfo {
    color: #7e7e7e;
    font-size: 14px;
    margin: 20px 0;
  }
}
.topBox {
  text-align: center;
  img {
    margin: 15px 0;
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
}
.fl {
  width: 33.3%;
}
.tip {
  width: 500px;
  margin: 0 auto;
  .elis {
    height: 6px;
    width: 70px;
    border-radius: 0;
    margin-top: 30px;
  }
}
.radius {
  background-color: #40a9ff;
  height: 24px;
  width: 24px;
  line-height: 24px;
  border-radius: 50%;
  color: #fff;
  margin: 0 auto;
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
  padding-top: 20px;
  padding-bottom: 40px;
  margin-left: 110px;
}
.psstip {
  display: inline-block;
  margin-left: 20px;
  color: #979797;
  font-size: 14px;
}
.displace {
  margin-left: 20px;
}
</style>