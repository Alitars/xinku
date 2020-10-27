<!--
 * @Descripttion: 
 * @Author: voanit
 * @Date: 2020-10-19 11:32:51
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-26 16:36:29
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  height: 100%;
}
// 清除默认样式
html,
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
form,
input,
textarea,
p,
th,
td,
img {
  margin: 0;
  padding: 0;
  border: none;
}
html,
body {
  background: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #333;
  font-size: 12px;
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}
strong,
i,
em {
  font-weight: normal;
  font-style: normal;
}
input,
select,
form {
  vertical-align: middle;
  outline: none;
}
a {
  text-decoration: none;
  outline: 0;
  color: #333;
}
img {
  border: none;
  vertical-align: top;
}
/* 设置 i 标签为：渲染多个空格、英语单词自动换行 */
i {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
//设置鼠标悬停时el-submenu的样式
.el-submenu .el-submenu__title:hover {
  background-color: #40a9ff !important;
  color: #fff !important;
  i {
    color: #fff;
  }
}
.el-menu-item:hover {
  background-color: #409eff !important;
  color: #fff !important;
  i {
    color: #fff;
  }
}
#app {
  background-color: #fafbff;
}
</style>
