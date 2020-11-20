<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-27 18:45:34
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-18 15:42:08
-->
<template>
  <div class="container">
    <!-- 查询表单 -->
    <div class="search">
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="70px"
      >
        <el-form-item label="选择日期" class="inline" prop="date">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            :editable="false"
            end-placeholder="结束日期"
            size="small"
            style="width: 230px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" class="inline margin" prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择职位状态"
            size="small"
            style="width: 140px"
          >
            <el-option label="全部" value="0"></el-option>
            <el-option label="招聘中" value="1"></el-option>
            <el-option label="待审核" value="2"></el-option>
            <el-option label="未通过" value="3"></el-option>
            <el-option label="已关闭" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位名称" class="inline margin" prop="workName">
          <el-input
            v-model="form.workName"
            clearable
            style="width: 140px"
            placeholder="请输入职位名称"
            size="small"
          ></el-input>
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
    <div class="tosend">
      <el-button
        type="primary"
        @click="goSend"
        style="width: 100px"
        size="small"
        >发布新职位</el-button
      >
    </div>
    <div class="line"></div>
    <div class="info">
      <div v-for="item in list" :key="item.id">
        <div class="infobox clearfix">
          <div class="fl left">
            <div class="name">
              <div class="inline workName">{{ item.workName }}</div>
              <div class="inline">
                {{
                  item.status == 0
                    ? '招聘中'
                    : item.status == 1
                    ? '待审核'
                    : item.status == 2
                    ? '未通过'
                    : '已关闭'
                }}
              </div>
            </div>
            <div class="sexinfo">
              <div class="inline sex">
                {{ item.sex == 0 ? '不限' : item.sex == 1 ? '男' : '女' }}
              </div>
              <div class="inline school">
                {{
                  item.school == 0
                    ? '不限'
                    : item.school == 1
                    ? '大专'
                    : item.school == 2
                    ? '本科'
                    : item.school == 3
                    ? '硕士'
                    : '博士'
                }}
              </div>
              <div class="inline" style="width: 100px">{{ item.money }}</div>
            </div>
          </div>
          <div class="fl center">
            <div style="color: #acacac">{{ item.time }}</div>
            <div class="adress">
              {{ item.adress }}
            </div>
          </div>
          <div class="fr right">
            <div style="color: #acacac; text-align: center">
              <div
                class="inline pointer"
                v-if="item.status == 0 || item.status == 3"
              >
                重新发布
              </div>
              <div class="inline pointer" v-if="item.status == 0">关闭职位</div>
              <div class="inline pointer" v-if="item.status == 2">删除职位</div>
            </div>
            <div class="btn">
              <el-button
                type="primary"
                style="width: 120px"
                @click="goDetail(item.id)"
                v-if="item.status == 0 || item.status == 3"
                >查看申请</el-button
              >
              <el-button disabled style="width: 120px" v-if="item.status == 1"
                >待审核</el-button
              >
              <el-button
                type="primary"
                style="width: 120px"
                v-if="item.status == 2"
                >重新发布</el-button
              >
            </div>
          </div>
        </div>
        <!-- <div class="infobox clearfix">
          <div class="fl left">
            <div class="name">
              <div class="inline workName">这里是职位名称</div>
              <div class="inline">招聘中</div>
            </div>
            <div class="sexinfo">
              <div class="inline sex">男</div>
              <div class="inline school">本科</div>
              <div class="inline">100元/天</div>
            </div>
          </div>
          <div class="fl center">
            <div style="color: #acacac">2020-12-02 15:32</div>
            <div class="adress">
              上海市徐汇区斜土路2899号英雄大厦15楼asdfadasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsadas
            </div>
          </div>
          <div class="fr right">
            <div style="color: #acacac; text-align: center">
              <div class="inline pointer">重新发布</div>
              <div class="inline pointer">关闭职位</div>
              <div class="inline pointer">删除职位</div>
            </div>
            <div class="btn">
              <el-button type="primary" style="width: 120px"
                >查看申请</el-button
              >
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="4"
      layout="prev, pager, next, jumper"
      :total="1000"
      style="text-align: center; padding: 10px 0"
    >
    </el-pagination>
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
        date: '',//日期查询
        status: '',//状态
        workName: ''//职位名称
      },
      list: [
        {
          id: 1,
          workName: '测试测试',
          sex: '0',
          school: '0',
          status: 0,//0 招聘中  1 待审核  2 未通过 3已关闭
          time: '2020-12-10 10:30',
          money: '900元/天',
          adress: '上海市徐汇区斜土路英雄大厦彩荟网络科技有限公司',
        },
        {
          id: 2,
          workName: '测试测试',
          sex: '1',
          school: '1',
          status: 1,//0 招聘中  1 待审核  2 未通过 3已关闭
          time: '2020-12-10 10:30',
          money: '100元/时',
          adress: '上海市徐汇区斜土路英雄大厦彩荟网络科技有限公司',
        }, {
          id: 3,
          workName: '测试测试',
          sex: '2',
          school: '2',
          status: 2,//0 招聘中  1 待审核  2 未通过 3已关闭
          time: '2020-12-10 10:30',
          money: '10000元/月',
          adress: '上海市徐汇区斜土路英雄大厦彩荟网络科技有限公司',
        }, {
          id: 4,
          workName: '测试测试',
          sex: '0',
          school: '3',
          status: 3,//0 招聘中  1 待审核  2 未通过 3已关闭
          time: '2020-12-10 10:30',
          money: '1000元/天',
          adress: '上海市徐汇区斜土路英雄大厦彩荟网络科技有限公司',
        }, {
          id: 5,
          workName: '测试测试',
          sex: '2',
          school: '4',
          status: 3,//0 招聘中  1 待审核  2 未通过 3已关闭
          time: '2020-12-10 10:30',
          money: '700元/天',
          adress: '上海市徐汇区斜土路英雄大厦彩荟网络科技有限公司',
        }
      ],
      currentPage: 1,//当前页
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    goDetail (e) {
      this.$router.push({
        path: '/jobApplication',
        query: { id: e }
      })
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
    // 重置输入框
    resetForm () {
      this.$refs.form.resetFields();
    },
    onSubmit () {
      console.log(this.$refs.form)
    },
    goSend () {
      this.$router.push({
        path: "/sendPost",
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
.btn {
  margin-top: 10px;
  text-align: center;
}
.name {
  .workName {
    font-weight: 600;
    margin-right: 50px;
  }
}
.pointer {
  cursor: pointer;
  margin-right: 10px;
}
.center {
  margin-left: 80px;
  .adress {
    margin-top: 40px;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.sex {
  margin-right: 40px;
  width: 30px;
}
.school {
  margin-right: 40px;
}
.info {
  .infobox {
    border-bottom: 4px solid #fafbff;
    padding: 24px;
    background-color: #fff;
    font-size: 14px;
  }
  .infobox:hover {
    background-color: #f4f4f4;
  }
}

.sexinfo {
  margin-top: 40px;
}
.container {
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.04);
  width: 1000px;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 30px;
}
.search {
  padding-top: 20px;
  margin-left: 30px;
}
.inline {
  display: inline-block;
}
.margin {
  margin-left: 20px;
}
.tosend {
  margin-left: 30px;
  margin-bottom: 20px;
}
.line {
  background-color: #fafafa;
  height: 20px;
  width: 100%;
}
</style>