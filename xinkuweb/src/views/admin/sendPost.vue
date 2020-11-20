<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-22 13:56:41
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-17 11:46:10
-->
<template>
  <div class="cotainer">
    <el-form
      ref="form"
      label-position="left"
      :model="form"
      label-width="160px"
      :rules="rules"
    >
      <!-- 基本信息 -->
      <div class="info">
        <div class="tips">基本信息</div>
        <div class="input">
          <el-form-item label="行业类别" prop="industryType">
            <el-input
              v-model="form.industryType"
              clearable
              style="width: 200px"
              placeholder="请输入行业类别"
            ></el-input>
            <!-- <div class="psstip" style="color: #ff1600">
              请输入营业执照上的公司全称,避免开户失败
            </div> -->
          </el-form-item>
          <el-form-item label="发布职位名称" prop="workName">
            <el-input
              v-model="form.workName"
              clearable
              style="width: 200px"
              placeholder="请输入发布职位名称"
            ></el-input>
          </el-form-item>
          <!-- prop="school" -->
          <el-form-item label="学历要求" prop="school">
            <el-select
              v-model="form.school"
              placeholder="请选择学历"
              style="width: 200px"
            >
              <el-option label="不限" value="不限"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位是否所有人可见">
            <el-radio-group v-model="form.show" @change="xlsxChange">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户邀请表" prop="xlsx" v-if="showXlsx">
            <el-upload
              class="upload-demo"
              :action="UploadUrl()"
              :before-upload="beforeUploadFile"
              :on-change="fileChange"
              :on-exceed="exceedFile"
              :on-success="handleSuccess"
              :on-error="handleError"
              :on-remove="remove"
              accept=".xlsx"
              :auto-upload="false"
              :limit="1"
              :file-list="form.fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>

              <div slot="tip" class="el-upload__tip">
                只能上传excel，请注意上传文件格式
              </div>
            </el-upload>
            <div
              style="
                display: inline-block;
                font-size: 13px;
                color: #40a9ff;
                margin-left: 10px;
                cursor: pointer;
              "
            >
              <div @click="seeExcel" v-if="hasFmt" style="display: inline">
                查看用户邀请表
              </div>
              <div style="display: inline; margin-left: 15px">
                下载用户邀请表模板
              </div>
            </div>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="1">不限</el-radio>
              <el-radio label="2">男</el-radio>
              <el-radio label="3">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="薪资" prop="money">
            <el-input
              v-model="form.money"
              clearable
              style="width: 200px"
              placeholder="请输入薪资"
            ></el-input>
            <div
              style="
                margin-left: 10px;
                margin-right: 10px;
                display: inline-block;
              "
            >
              元/
            </div>
            <el-select
              v-model="form.size"
              size="mini"
              style="width: 50px；display:inline-block;"
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
          <el-form-item label="工作日期" prop="date">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              :editable="false"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="详细地址"
            prop="adress"
            style="width: 50%; display: inline-block"
          >
            <el-cascader
              v-model="form.adress"
              :options="options"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item
            prop="areaDetail"
            label-width="0"
            style="width: 50%; display: inline-block"
          >
            <el-input
              v-model="form.areaDetail"
              clearable
              style="width: 200px"
              placeholder="请输入详细地址"
              id="areaDetail"
            ></el-input>
          </el-form-item>
          <el-form-item label="地图">
            <div class="amap-wrapper" id="container" ref="container"></div>
          </el-form-item>
        </div>
      </div>
      <!--  企业绑卡信息 -->
      <div class="info">
        <div class="tips">职位信息</div>
        <div class="input">
          <div class="clearfix">
            <div class="fl lab">岗位要求</div>
            <div ref="require" class="fl require"></div>
            <div class="red" v-if="flag1">请输入岗位要求</div>
          </div>
          <div class="clearfix" style="margin-top: 30px">
            <div class="fl lab">职位内容</div>
            <div ref="content" class="fl require"></div>
            <div class="red" v-if="flag2">请输入职位内容</div>
          </div>
        </div>
      </div>
      <!-- 这里是发布 -->
      <div class="center">
        <el-button type="primary" @click="onSubmit" style="width: 150px"
          >发布职位</el-button
        >
      </div>
    </el-form>

    <el-dialog
      title="导入结果"
      :visible.sync="dialogVisible"
      width="600px"
      center
    >
      <div class="import">
        <div>导入成功用户</div>
        <div class="importList">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="results" label="邀请结果" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 导入失败 -->
      <div class="import" style="margin-top: 10px">
        <div>导入失败用户</div>
        <div class="importList">
          <el-table :data="errData" stripe style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="results" label="异常原因" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="redTips">提示:导入用户失败无法接受任务，请重新导入</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="width: 100px"
          >关 闭</el-button
        >
        <el-button
          type="primary"
          @click="dialogVisible = false"
          style="width: 100px"
          >继续导入</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import options from '../../utils/country-data';
import wangEditor from 'wangeditor';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    var industryType = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入行业类别!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的行业类别!"));
      } else {
        callback();
      }
    };
    var workName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入开户名称!"));
      } else if (/[^\u4E00-\u9FA5]/g.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的开户名称!"));
      } else {
        callback();
      }
    };
    var introduce = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入企业介绍!"));
      }
      else if (value.length < 20) {
        callback(new Error("请输入20以上的企业介绍!"))
      } else {
        callback();
      }
    };
    var money = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入薪资!"));
      }
      else if (value.length < 0) {
        callback(new Error("请输入正确的薪资数!"))
      } else {
        callback();
      }
    };
    var areaDetail = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入详细的地址信息!"));
      } else {
        callback();
      }
    };
    var xlsx = (rule, value, callback) => { // 图片验证
      if (!this.hasFmt) {
        callback(new Error('请上传excel!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        industryType: '',//行业类别
        introduce: '',//企业介绍
        workName: '',// 职位名称
        show: '1',//职位是否所有人可见
        sex: '1',//性别
        size: '1',//薪资结算方式
        money: '',//薪资
        date: [],//日期
        adress: '',//地理位置
        areaDetail: '',//详细地址
        requireData: '',//富文本
        contentData: '',//富文本
        fileList: [],//上传文件
        school: '',//学历要求
      },
      rules: {
        industryType: [
          { validator: industryType, trigger: 'blur' }
        ],

        introduce: [
          { validator: introduce, trigger: 'blur' }
        ],
        workName: [
          { validator: workName, trigger: 'blur' }
        ],
        money: [
          { validator: money, trigger: 'blur' }
        ],
        date: [
          { required: true, type: 'array', message: '请选择日期', trigger: 'change' }
        ],
        adress: [
          { type: 'array', message: "请选择地址", trigger: "blur" }
        ],
        areaDetail: [
          { validator: areaDetail, trigger: 'blur' }
        ],
        xlsx: [
          { validator: xlsx, trigger: 'change' }
        ],
        school: [
          { type: 'array', message: "请选择学历", trigger: "blur" }
        ],
      },
      size: [
        { id: '1', size: "月", },
        { id: '2', size: "周", },
        { id: '3', size: "天", },
        { id: '4', size: "时", },
      ],
      editor1: null, //岗位要求
      editor: null,//职位内容
      options: options,//省市区
      //富文本提示信息
      flag1: false,
      flag2: false,
      hasFmt: false,
      showXlsx: false,
      dialogVisible: false,//弹框组件
      tableData: [{
        name: '徐坑坑',
        phone: '12345678910',
        results: '憨憨徐凡'
      }, {
        name: '徐坑坑',
        phone: '12345678910',
        results: '憨憨徐凡'
      }, {
        name: '徐坑坑',
        phone: '12345678910',
        results: '憨憨徐凡'
      }, {
        name: '徐坑坑',
        phone: '12345678910',
        results: '憨憨徐凡'
      }],
      errData: [{
        name: '徐坑坑',
        phone: '12345678910',
        results: '憨憨徐凡'
      }, {
        name: '徐坑坑',
        phone: '12345678910',
        results: '憨憨徐凡'
      }, {
        name: '徐坑坑',
        phone: '12345678910',
        results: '憨憨徐凡'
      }, {
        name: '徐坑坑',
        phone: '12345678910',
        results: '憨憨徐凡'
      },]
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 点击弹框用户邀请表
    seeExcel () {
      this.dialogVisible = true
    },
    // 是否显示上传xlsx
    xlsxChange () {
      if (this.form.show == 1) {
        this.showXlsx = false
      } else {
        this.showXlsx = true

      }
    },
    // 插件地图--------------------------------------------------
    select (e) {
      this.placeSearch.setCity(e.poi.adcode)
      this.placeSearch.search(e.poi.name) // 关键字查询查询
    },
    handleMap (o, a) {
      console.log(11)
      this.$emit('bMapDate', o, a)
    },
    mapInit () {
      var that = this
      const map = new AMap.Map(this.$refs.container, {
        resizeEnable: true
      }) // 创建Map实例
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
        var autoOptions = {
          // 使用联想输入的input的id
          input: "areaDetail"
        }
        var autocomplete = new AMap.Autocomplete(autoOptions)

        var placeSearch = new AMap.PlaceSearch({
          map: map
        })
        AMap.event.addListener(autocomplete, 'select', function (e) {
          //TODO 针对选中的poi实现自己的功能
          that.form.areaDetail = e.poi.name
          placeSearch.search(e.poi.name)
        })
      })
    },
    // -------------------------------------------------------
    handleChange (value) {
      console.log(value);
    },
    onSubmit () {
      if (this.form.requireData.length == 0) {
        this.flag1 = true
        return false
      }
      if (this.form.contentData.length == 0) {
        this.flag2 = true
        return false
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 发送请求跳转
          this.flag1 = false
          this.flag2 = false
          console.log(this.form)
        } else {
          this.flag1 = false
          this.flag2 = false
          this.$message({
            message: '请核实输入的相关信息',
            center: true,
            type: 'warning'
          })
          return false;
        }
      });
    },
    // 上传用户表
    // 文件超出个数限制时的钩子
    exceedFile (files, fileList) {
      this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
    },
    // 文件状态改变时的钩子
    fileChange (file, fileList) {
      if (fileList.length > 0) {
        this.hasFmt = true;
      } else {
        this.hasFmt = false;
      }
      this.form.fileList.push(file.raw);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile (file) {
      console.log('before upload');
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.xlsx的文件');
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M');
      }
    },
    // 文件上传成功时的钩子
    handleSuccess () {
      this.$message.success('文件上传成功');
    },
    // 文件上传失败时的钩子
    handleError () {
      this.$message.error('文件上传失败');
    },
    remove () {
      this.form.fileList = []
      this.hasFmt = false;
    },
    UploadUrl: function () {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ""
    },
    // uploadFile() {
    //   if (this.fileList.length === 0){
    //     this.$message.warning('请上传文件');
    //   } else {
    //     let form = new FormData();
    //     form.append('file', this.fileList);
    //     this.$axios({
    //       method:"post",
    //       url: "/statistical/uploadbug",
    //       headers:{
    //         'Content-type': 'multipart/form-data'
    //       },
    //       data:form
    //     }).then(
    //       res=>{

    //       },err =>{
    //       });
    //   }
    // }

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.mapInit()
    const editor1 = new wangEditor(this.$refs.require)
    editor1.config.height = 150
    editor1.config.menus = [
      'head', // 标题
      'bold', // 粗体
      'italic', // 字号
    ]
    editor1.config.showFullScreen = false
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor1.config.onchange = (newHtml) => {
      this.form.requireData = newHtml
    }
    editor1.config.zIndex = 100
    // 创建编辑器
    editor1.create()
    this.editor1 = editor1
    // 第二个文本框
    const editor2 = new wangEditor(this.$refs.content)
    editor2.config.height = 150
    editor2.config.menus = [
      'head', // 标题
      'bold', // 粗体
      'italic', // 字号
    ]
    editor2.config.showFullScreen = false
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor2.config.onchange = (newHtml) => {
      this.form.contentData = newHtml
    }
    // 创建编辑器
    editor2.config.zIndex = 100

    editor2.create()
    this.editor2 = editor2
  },
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
.redTips {
  color: red;
  font-size: 12px;
  text-align: center;
  margin-top: 20px;
}
.import {
  .importList {
    border: 1px solid #cecece;
    margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
}
.upload-demo {
  width: 200px !important;
  display: inline-block;
}
.red {
  color: red;
  font-size: 14px;
  margin-left: 20px;
  margin-top: 80px;
  float: left;
}
.search-box {
  width: 220px;
}
.lab {
  font-size: 14px;
  line-height: 40px;
  margin-right: 100px;
}
.require {
  width: 400px;
}
.block {
  display: block;
  margin: 15px auto;
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.status {
  display: block;
  height: 28px;
  width: 100px;
  margin: 10px auto;
}
.abs {
  position: relative;
}
.tipBtn {
  position: absolute;
  bottom: 0;
  right: 100px;
  color: #fff;
  background-color: #029588;
  height: 30px;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  line-height: 30px;
  width: 80px;
  border-radius: 20px;
}
.auto {
  margin: 0 auto;
  text-align: center;
  width: 70%;
}
.confirm {
  width: 50%;
  text-align: center;
  margin: 0 auto;
}
.dialog-footer {
  margin-top: 20px;
}
.label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  margin-top: 10px;
  .fl {
    width: 50%;
    text-align: left;
  }
}
.red {
  color: red;
}
.info {
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.04);
  width: 1000px;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 30px;
}
.center {
  margin-top: 30px;
  text-align: center;
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
}
.blockImg {
  margin: 15px 0;
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.width3 {
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
.ccc {
  background-color: #ececec;
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
  margin-left: 40px;
  display: inline-block !important;
}
.inline {
  display: inline-block !important;
}
.amap-wrapper {
  width: 484px;
  height: 240px;
}
</style>