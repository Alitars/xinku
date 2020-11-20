<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-27 18:45:34
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-20 14:39:02
-->
<template>
  <div class="container">
    <!-- 企业信息 -->
    <div class="top">
      <div class="clearfix">
        <div class="fl name">每日兼职派单人员</div>
        <div class="fl status">招聘中</div>
        <div class="fl close">关闭职位</div>
      </div>
      <div class="info clearfix">
        <div class="fl sex">男</div>
        <div class="fl marginL">本科</div>
        <div class="fl marginL">100元/月</div>
      </div>
      <div class="adress">徐汇区斜土路2929号英雄大厦15楼</div>
    </div>
    <div class="line"></div>
    <div class="search">
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="40px"
      >
        <el-form-item
          label="姓名"
          class="inline"
          prop="name"
          style="margin-left: 0"
        >
          <el-input
            v-model="form.name"
            clearable
            style="width: 130px"
            placeholder="姓名"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" class="inline margin" prop="phone">
          <el-input
            v-model="form.phone"
            clearable
            style="width: 130px"
            placeholder="手机"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" class="inline margin" prop="sex">
          <el-select
            v-model="form.sex"
            placeholder="性别"
            style="width: 130px"
            size="small"
          >
            <el-option label="不限" value="不限"></el-option>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历" class="inline margin" prop="school">
          <el-select
            v-model="form.school"
            placeholder="学历"
            style="width: 130px"
            size="small"
          >
            <el-option label="不限" value="不限"></el-option>
            <el-option label="大专" value="大专"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="inline margin" label-width="0">
          <el-button
            type="primary"
            @click="onSubmit"
            style="width: 70px"
            size="small"
            >查 询</el-button
          >
          <el-button
            type="primary"
            @click="resetForm('form')"
            style="width: 70px"
            size="small"
            >重 置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="import">
      <el-button type="primary" style="width: 120px" size="small"
        >导入用户邀请表</el-button
      >
      <el-button type="primary" style="width: 120px" size="small"
        >批量删除</el-button
      >
      <el-button type="primary" style="width: 120px" size="small"
        >导 出</el-button
      >
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="姓名" width="120" align="center" prop="name">
        </el-table-column>
        <el-table-column prop="phone" label="手机" width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          show-overflow-tooltip
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="school"
          label="学历"
          show-overflow-tooltip
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="8"
        layout="prev, pager, next, jumper"
        :total="100"
        style="text-align: center; padding: 10px 0"
      >
      </el-pagination>
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
        name: '',
        phone: '',
        sex: '',
        school: '',
      },
      tableData: [{
        name: '张三',
        phone: '18580473851',
        sex: '女',
        school: '博士',
        time: '2020-11-20'
      }, {
        name: '迪丽热巴',
        phone: '18580473851',
        sex: '女',
        school: '博士',
        time: '2020-11-20'
      }, {
        name: '古力娜扎',
        phone: '18580473851',
        sex: '女',
        school: '博士',
        time: '2020-11-20'
      }, {
        name: '马尔扎哈',
        phone: '18580473851',
        sex: '女',
        school: '博士',
        time: '2020-11-20'
      }, {
        name: '迪丽热巴',
        phone: '18580473851',
        sex: '女',
        school: '博士',
        time: '2020-11-20'
      }, {
        name: '古力娜扎',
        phone: '18580473851',
        sex: '女',
        school: '博士',
        time: '2020-11-20'
      }, {
        name: '马尔扎哈',
        phone: '18580473851',
        sex: '女',
        school: '博士',
        time: '2020-11-20'
      }, {
        name: '张三',
        phone: '18580473851',
        sex: '女',
        school: '博士',
        time: '2020-11-20'
      },],
      multipleSelection: [],//选中项
      currentPage: 1,//当前页
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    resetForm () {
      this.$refs.form.resetFields();
    },
    onSubmit () {
      console.log(this.$refs.form)
    },
    // 分页器
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(val);
      // console.log(`当前页: ${val}`);
      // 这里请求数据val是当前页
    },
    // 选择
    handleSelectionChange (val) {
      this.multipleSelection = val;
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
.import {
  margin-left: 25px;
}
.table {
  margin: 10px 25px;
}
.search {
  margin-top: 20px;
  margin-left: 25px;
}
.line {
  height: 20px;
  background-color: #fafbff;
}
.top {
  background-color: #fff;
  padding: 20px 25px;
  font-size: 15px;
  .adress {
    margin-top: 30px;
  }
  .info {
    margin-top: 20px;
    .sex {
      width: 30px;
    }
    .marginL {
      margin-left: 26px;
    }
  }
  .name {
    width: 270px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 34px;
    height: 34px;
  }
  .status {
    margin-left: 30px;
    line-height: 34px;
    height: 34px;
    font-weight: 600;
  }
  .close {
    border: 1px solid #dedede;
    padding: 10px 20px;
    margin-left: 100px;
    cursor: pointer;
    color: #61b8ff;
    border-radius: 5px;
  }
}
.container {
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.04);
  width: 1000px;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 30px;
}
.inline {
  display: inline-block;
  margin-left: 10px;
}
</style>