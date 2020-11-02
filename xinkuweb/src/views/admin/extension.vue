<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-28 16:17:20
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-02 14:04:21
-->
<template>
  <div class="info">
    <div class="tip">我要推广</div>
    <div class="input">
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="联系人" prop="name">
          <el-input
            v-model="form.name"
            clearable
            style="width: 300px"
            placeholder="请输入联系人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="form.phone"
            clearable
            style="width: 300px"
            maxlength="11"
            placeholder="请输入联系人手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="value"
            placeholder="请选择"
            style="width: 300px"
            @change="changeType"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称" v-if="flag" prop="company">
          <el-input
            v-model="form.company"
            clearable
            style="width: 300px"
            placeholder="请输入企业名称"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 150px"
            >提交</el-button
          >
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
    var name = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入企业联系人姓名!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的联系人姓名!"));
      } else {
        callback();
      }
    };
    var phone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入手机号!"));
      } else if (!/^1(3|4|5|6|7|8)\d{9}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    var company = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入企业名称!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的企业名称!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: '',
        phone: '',
        company: '',
      },
      rules: {
        phone: [
          { validator: phone, trigger: 'blur' }
        ],
        name: [
          { validator: name, trigger: 'blur' }
        ],
        company: [
          { validator: company, trigger: 'blur' }
        ],

      },
      options: [{
        value: '1',
        label: '个人'
      }, {
        value: '2',
        label: '企业'
      }],
      value: '1',
      flag: false,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    changeType (e) {
      if (e == 1) {
        this.flag = false
      } else {
        this.flag = true
      }
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 发送请求跳转
          console.log('验证成功')
        } else {
          this.$message({
            message: '请核实输入的相关信息',
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
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.04);
  width: 900px;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 60px;
}
.input {
  padding-top: 40px;
  padding-bottom: 80px;
  margin-left: 210px;
}
.tip {
  margin-left: 30px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  padding-top: 30px;
}
.center {
  margin: 20px 0;
  margin-left: 112px;
  img {
    height: 90px;
    width: 8px;
    vertical-align: middle;
  }
  div {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
    color: #a0a0a0;
    margin-left: 20px;
  }
}
.box {
  font-size: 14px;
  line-height: 40px;
}
.pay {
  color: #000;
  font-weight: 600;
}
.mg40 {
  margin-left: 40px;
}
</style>