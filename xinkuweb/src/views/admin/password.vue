<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-22 14:18:11
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-23 17:05:22
-->
<template>
  <div class="info">
    <div class="tips">修改登录密码</div>
    <div class="input">
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="旧密码">
          <el-input
            v-model="form.old"
            clearable
            style="width: 200px"
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            v-model="form.new"
            clearable
            style="width: 200px"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码">
          <el-input
            v-model="form.again"
            clearable
            style="width: 200px"
            placeholder="请再次输入新密码"
          ></el-input>
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
    // 这里存放数据
    return {
      form: {
        old: '',
        new: '',
        again: ''
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onSubmit () {
      console.log('submit!');
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
  margin: 16px 16px 0 16px;
  background-color: #fff;
  border-radius: 10px;
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
</style>