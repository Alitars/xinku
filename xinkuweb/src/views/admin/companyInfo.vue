<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-22 13:56:41
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-02 16:37:58
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
        <el-form>
          <el-form-item label="上传企业电子营业执照">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 企业绑卡信息 -->
    <div class="info">2</div>
    <!-- 企业开票信息 -->
    <div class="info">3</div>
  </div>
</template>

<script>

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {}
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
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
</style>