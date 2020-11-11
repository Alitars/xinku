<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-22 13:56:41
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-11 16:20:45
-->
<template>
  <div class="cotainer">
    <!-- 信息未填写 -->
    <div v-if="status == 0">
      <!-- 头部标题 -->
      <div class="info topBox">
        <div class="img">
          <img
            class="blockImg"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604310092339&di=849416af2d76d002c5c497836099bcd3&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F16%2F20200716225555_ensit.thumb.400_0.jpg"
            alt=""
          />
        </div>
        <div class="tip clearfix">
          <div class="fl text width3">
            <div class="radius">1</div>
            <div class="divinfo">填写企业信息</div>
          </div>
          <div class="fl width3">
            <img src="../../assets/rpe.png" alt="" class="elis" />
          </div>
          <div class="fl text width3">
            <div class="radius ccc">2</div>
            <div class="divinfo">开通上海记账簿账户</div>
          </div>
        </div>
      </div>
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="160px"
        :rules="rules"
      >
        <!-- 基本信息 -->
        <div class="info">
          <div class="tips">企业基本信息</div>
          <div class="input">
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
          </div>
        </div>
        <!--  企业绑卡信息 -->
        <div class="info">
          <div class="tips">企业绑卡信息</div>
          <div class="input">
            <el-form-item label="企业开户名称" prop="company">
              <el-input
                v-model="form.company"
                clearable
                style="width: 200px"
                placeholder="请输入企业开户名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="开户银行" prop="bank">
              <el-input
                v-model="form.bank"
                clearable
                style="width: 200px"
                placeholder="请输入开户银行"
              ></el-input>
            </el-form-item>
            <el-form-item label="对公账号" prop="bankAcount">
              <el-input
                v-model="form.bankAcount"
                clearable
                style="width: 200px"
                placeholder="请输入对公账号"
                maxlength="30"
              ></el-input>
            </el-form-item>
            <el-form-item label="分行名称" prop="bankName">
              <el-input
                v-model="form.bankName"
                clearable
                style="width: 200px"
                placeholder="请输入分行名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="支付密码" prop="payCode">
              <el-input
                v-model="form.payCode"
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
                v-model="form.check"
                clearable
                type="password"
                maxlength="6"
                style="width: 200px"
                placeholder="请输入确认支付密码"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 企业发票 -->
        <div class="info">
          <div class="tips">企业开票信息</div>
          <div class="input">
            <el-form-item
              label="企业账户名称"
              prop="company"
              class="inline"
              label-width="120px"
            >
              <el-input
                v-model="form.company"
                clearable
                style="width: 200px"
                placeholder="请输入企业账户名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="地址"
              prop="displace"
              class="displace"
              label-width="120px"
            >
              <el-input
                v-model="form.displace"
                clearable
                style="width: 200px"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="纳税人识别号"
              prop="socialCode"
              class="inline"
              label-width="120px"
            >
              <el-input
                v-model="form.socialCode"
                maxlength="18"
                clearable
                style="width: 200px"
                placeholder="请输入纳税人识别号"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="对公账号"
              prop="bankAcountPublic"
              class="displace"
              label-width="120px"
            >
              <el-input
                v-model="form.bankAcountPublic"
                clearable
                style="width: 200px"
                placeholder="请输入对公账号"
                maxlength="30"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="开户银行"
              prop="publicBank"
              class="inline"
              label-width="120px"
            >
              <el-input
                v-model="form.publicBank"
                clearable
                style="width: 200px"
                placeholder="请输入开户银行"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="电话"
              prop="checkPhone"
              class="displace"
              label-width="120px"
            >
              <el-input
                v-model="form.checkPhone"
                clearable
                style="width: 200px"
                placeholder="请输入电话"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="center">
          <el-button type="primary" @click="onSubmit" style="width: 150px"
            >下一步</el-button
          >
        </div>
      </el-form>
    </div>
    <!-- 审核中 -->
    <div v-if="status == 1 || status == 2">
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="160px"
        :rules="rules"
      >
        <!-- 基本信息 -->
        <div class="info">
          <div class="img" style="text-align: center">
            <img
              class="block"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604310092339&di=849416af2d76d002c5c497836099bcd3&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F16%2F20200716225555_ensit.thumb.400_0.jpg"
            />
            <img
              class="status"
              src="../../assets/success.png"
              v-if="status == 2"
            />
            <img
              class="status"
              src="../../assets/fail.png"
              v-if="status == 3"
            />
            <img
              class="status"
              src="../../assets/waiting.png"
              v-if="status == 1"
            />
            <!-- // 0:信息未填写 1:审核中 2:审核成功 3：审核失败 -->
            <!-- <div class="tipBtn" v-if="status == 1">审核中</div>
            <div class="tipBtn" v-if="status == 2">审核成功</div>
            <div class="tipBtn" v-if="status == 3">审核失败</div> -->
          </div>
          <div class="line"></div>
          <div class="tips">企业基本信息</div>
          <div class="input">
            <el-form-item label="企业名称">
              <el-input
                v-model="form.company"
                clearable
                :disabled="true"
                style="width: 200px"
                placeholder="请输入企业名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码">
              <el-input
                maxlength="18"
                v-model="form.socialCode"
                :disabled="true"
                clearable
                style="width: 200px"
                placeholder="请输入统一社会信用代码"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业规模">
              <el-input
                v-model="form.size"
                clearable
                :disabled="true"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="注册资金">
              <el-input
                v-model="form.registerMoney"
                clearable
                :disabled="true"
                style="width: 200px"
                placeholder="请输入公司注册资金"
              ></el-input>
              <div class="psstip" style="color: #333">万</div>
            </el-form-item>
            <el-form-item label="创办时间">
              <el-input
                v-model="form.date"
                clearable
                :disabled="true"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="法人姓名">
              <el-input
                v-model="form.headName"
                :disabled="true"
                clearable
                style="width: 200px"
                placeholder="请输入法人姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="法人身份证证件号">
              <el-input
                v-model="form.idcard"
                :disabled="true"
                clearable
                style="width: 200px"
                maxlength="18"
                placeholder="请输入法人身份证证件号"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业管理员手机号">
              <el-input
                v-model="form.companyPhone"
                :disabled="true"
                clearable
                style="width: 200px"
                maxlength="11"
                placeholder="请输入企业管理员手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业邮箱">
              <el-input
                v-model="form.email"
                :disabled="true"
                clearable
                style="width: 200px"
                placeholder="请输入企业邮箱"
              ></el-input>
            </el-form-item>
            <!-- 后台数据 -->
            <el-form-item label="行业所属">
              <el-input
                v-model="form.company"
                :disabled="true"
                clearable
                style="width: 200px"
                placeholder="请输入企业名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业性质">
              <el-input
                v-model="form.company"
                :disabled="true"
                clearable
                style="width: 200px"
                placeholder="请输入企业名称"
              ></el-input>
            </el-form-item>
            <!--  -->
            <el-form-item label="企业介绍">
              <el-input
                type="textarea"
                v-model="form.introduce"
                :disabled="true"
                placeholder="请输入企业介绍"
                maxlength="100"
                minlength="20"
                rows="5"
                resize="none"
                show-word-limit
                style="width: 400px"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <!--  企业绑卡信息 -->
        <div class="info">
          <div class="tips">企业绑卡信息</div>
          <div class="input">
            <el-form-item label="企业开户名称">
              <el-input
                v-model="form.company"
                :disabled="true"
                clearable
                style="width: 200px"
                placeholder="请输入企业开户名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="开户银行">
              <el-input
                v-model="form.bank"
                :disabled="true"
                clearable
                style="width: 200px"
                placeholder="请输入开户银行"
              ></el-input>
            </el-form-item>
            <el-form-item label="对公账号">
              <el-input
                v-model="form.bankAcount"
                clearable
                style="width: 200px"
                :disabled="true"
                placeholder="请输入对公账号"
                maxlength="30"
              ></el-input>
            </el-form-item>
            <el-form-item label="分行名称">
              <el-input
                v-model="form.bankName"
                clearable
                style="width: 200px"
                :disabled="true"
                placeholder="请输入分行名称"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 企业发票 -->
        <div class="info">
          <div class="tips">企业开票信息</div>
          <div class="input">
            <el-form-item
              label="企业账户名称"
              class="inline"
              label-width="120px"
            >
              <el-input
                v-model="form.company"
                clearable
                :disabled="true"
                style="width: 200px"
                placeholder="请输入企业账户名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="地址" class="displace" label-width="120px">
              <el-input
                v-model="form.displace"
                clearable
                style="width: 200px"
                :disabled="true"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="纳税人识别号"
              class="inline"
              label-width="120px"
            >
              <el-input
                v-model="form.socialCode"
                maxlength="18"
                :disabled="true"
                clearable
                style="width: 200px"
                placeholder="请输入纳税人识别号"
              ></el-input>
            </el-form-item>

            <el-form-item label="对公账号" class="displace" label-width="120px">
              <el-input
                v-model="form.bankAcountPublic"
                clearable
                :disabled="true"
                style="width: 200px"
                placeholder="请输入对公账号"
                maxlength="30"
              ></el-input>
            </el-form-item>
            <el-form-item label="开户银行" class="inline" label-width="120px">
              <el-input
                v-model="form.publicBank"
                :disabled="true"
                clearable
                style="width: 200px"
                placeholder="请输入开户银行"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话" class="displace" label-width="120px">
              <el-input
                v-model="form.checkPhone"
                clearable
                :disabled="true"
                style="width: 200px"
                placeholder="请输入电话"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="center" v-if="status == 2">
          <el-button type="primary" @click="submitSuccess" style="width: 150px"
            >下一步</el-button
          >
        </div>
      </el-form>
    </div>
    <!-- 审核失败 -->
    <div v-if="status == 3">
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="160px"
        :rules="rules"
      >
        <!-- 基本信息 -->
        <div class="info">
          <div class="img" style="text-align: center">
            <img
              class="block"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604310092339&di=849416af2d76d002c5c497836099bcd3&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F16%2F20200716225555_ensit.thumb.400_0.jpg"
            />
            <img
              class="status"
              src="../../assets/success.png"
              v-if="status == 2"
            />
            <img
              class="status"
              src="../../assets/fail.png"
              v-if="status == 3"
            />
            <img
              class="status"
              src="../../assets/waiting.png"
              v-if="status == 1"
            />
            <!-- // 0:信息未填写 1:审核中 2:审核成功 3：审核失败 -->
            <!-- <div class="tipBtn" v-if="status == 1">审核中</div>
            <div class="tipBtn" v-if="status == 2">审核成功</div>
            <div class="tipBtn" v-if="status == 3">审核失败</div> -->
          </div>
          <div class="tips">企业基本信息</div>
          <div class="input">
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
          </div>
        </div>
        <!--  企业绑卡信息 -->
        <div class="info">
          <div class="tips">企业绑卡信息</div>
          <div class="input">
            <el-form-item label="企业开户名称" prop="company">
              <el-input
                v-model="form.company"
                clearable
                style="width: 200px"
                placeholder="请输入企业开户名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="开户银行" prop="bank">
              <el-input
                v-model="form.bank"
                clearable
                style="width: 200px"
                placeholder="请输入开户银行"
              ></el-input>
            </el-form-item>
            <el-form-item label="对公账号" prop="bankAcount">
              <el-input
                v-model="form.bankAcount"
                clearable
                style="width: 200px"
                placeholder="请输入对公账号"
                maxlength="30"
              ></el-input>
            </el-form-item>
            <el-form-item label="分行名称" prop="bankName">
              <el-input
                v-model="form.bankName"
                clearable
                style="width: 200px"
                placeholder="请输入分行名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="支付密码" prop="payCode">
              <el-input
                v-model="form.payCode"
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
                v-model="form.check"
                clearable
                type="password"
                maxlength="6"
                style="width: 200px"
                placeholder="请输入确认支付密码"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 企业发票 -->
        <div class="info">
          <div class="tips">企业开票信息</div>
          <div class="input">
            <el-form-item
              label="企业账户名称"
              prop="company"
              class="inline"
              label-width="120px"
            >
              <el-input
                v-model="form.company"
                clearable
                style="width: 200px"
                placeholder="请输入企业账户名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="地址"
              prop="displace"
              class="displace"
              label-width="120px"
            >
              <el-input
                v-model="form.displace"
                clearable
                style="width: 200px"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="纳税人识别号"
              prop="socialCode"
              class="inline"
              label-width="120px"
            >
              <el-input
                v-model="form.socialCode"
                maxlength="18"
                clearable
                style="width: 200px"
                placeholder="请输入纳税人识别号"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="对公账号"
              prop="bankAcountPublic"
              class="displace"
              label-width="120px"
            >
              <el-input
                v-model="form.bankAcountPublic"
                clearable
                style="width: 200px"
                placeholder="请输入对公账号"
                maxlength="30"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="开户银行"
              prop="publicBank"
              class="inline"
              label-width="120px"
            >
              <el-input
                v-model="form.publicBank"
                clearable
                style="width: 200px"
                placeholder="请输入开户银行"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="电话"
              prop="checkPhone"
              class="displace"
              label-width="120px"
            >
              <el-input
                v-model="form.checkPhone"
                clearable
                style="width: 200px"
                placeholder="请输入电话"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="center">
          <el-button type="primary" @click="onSubmit" style="width: 150px"
            >下一步</el-button
          >
        </div>
      </el-form>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="开通上海记账簿账号" :visible.sync="dialogFormVisible">
      <div class="auto">
        <div class="label clearfix">
          <div class="fl">企业名称</div>
          <el-input
            v-model="checkform.name"
            :disabled="true"
            style="width: 200px; float: left"
          >
          </el-input>
        </div>
        <div class="label clearfix">
          <div class="fl">统一社会信用代码</div>
          <el-input
            v-model="checkform.socialCode"
            :disabled="true"
            style="width: 200px; float: left"
          >
          </el-input>
        </div>
        <div class="label clearfix">
          <div class="fl">法人姓名</div>
          <el-input
            v-model="checkform.legalName"
            :disabled="true"
            style="width: 200px; float: left"
          >
          </el-input>
        </div>
        <div class="label clearfix">
          <div class="fl">法人证件号码</div>
          <el-input
            v-model="checkform.idCard"
            :disabled="true"
            style="width: 200px; float: left"
          >
          </el-input>
        </div>
        <div class="label clearfix">
          <div class="fl">企业管理员手机号</div>
          <el-input
            v-model="checkform.companyPhone"
            :disabled="true"
            style="width: 200px; float: left"
          >
          </el-input>
        </div>
        <div class="label clearfix">
          <div class="fl">企业对公账号</div>
          <el-input
            v-model="checkform.acount"
            :disabled="true"
            style="width: 200px; float: left"
          >
          </el-input>
        </div>
        <div class="label clearfix">
          <div class="fl">开户行</div>
          <el-input
            v-model="checkform.bank"
            :disabled="true"
            style="width: 200px; float: left"
          >
          </el-input>
        </div>
        <div class="label red">请确认上海记账簿账户是否有误</div>
        <div>
          <el-input
            placeholder="请输入验证码"
            v-model="checkform.code"
            style="width: 160px"
            clearable
            maxlength="6"
          ></el-input>
          <el-button
            type="primary"
            @click="sendcode"
            :disabled="disabled"
            v-if="disabled == false"
            style="margin-left: 20px; width: 160px"
            >发送验证码
          </el-button>
          <el-button
            type="primary"
            @click="sendcode"
            :disabled="disabled"
            v-if="disabled == true"
            style="margin-left: 20px; width: 160px"
            >{{ btntxt }}
          </el-button>
        </div>
        <div slot="footer" class="dialog-footer">
          <div class="confirm">
            <el-button type="primary" @click="confirm" style="width: 150px"
              >确认开通</el-button
            >
          </div>
          <!--  -->
          <!-- <div class="confirm">
            <el-button type="primary" @click="cancel" style="width: 150px"
              >取 消</el-button
            >
          </div> -->
        </div>
      </div>
    </el-dialog>
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
      } else if (!/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(value)) {//引入methods中封装的检查手机格式的方法
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
        callback(new Error("请输入对公账号!"));
      } else if (!/^[1-9]\d{7,29}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的对公账号!"));
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
      } else if (value != this.form.payCode) {
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
      else if (value.length < 20) {
        callback(new Error("请输入20以上的企业介绍!"))
      } else {
        callback();
      }
    };
    var bankAcountPublic = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入对公账号!"));
      } else if (!/^[1-9]\d{7,29}$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的对公账号!"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入电话或手机号码!"));
      } else if (!/^((0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?)$|^(0?[1][3578][0-9]{9})$|^(400[0-9]{7})$/.test(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的电话或手机号码!"));
      } else {
        callback();
      }
    };
    return {
      // 时间选择禁止选未来时间
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        }
      },
      // 弹出框内容
      checkform: {
        name: '企业名称',
        socialCode: '统一社会信用代码',
        legalName: '法人姓名',
        idCard: '法人证件号码',
        companyPhone: '企业管理员手机号',
        acount: '企业对公账号',
        bank: '开户行',
        code: ''
      },

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
        // 绑卡信息
        bank: '',//开户银行
        bankAcount: '',//对公账号
        bankName: '',//分行名称
        payCode: '',//支付密码
        check: '',//确认支付密码
        // 发票信息
        acountName: '',
        bankAcountPublic: '',//对公帐号
        displace: '',//地址
        publicBank: '',//开户银行
        checkPhone: ''//电话手机号码
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
        bankAcountPublic: [
          { validator: bankAcountPublic, trigger: 'blur' }
        ],
        publicBank: [
          { validator: bank, trigger: 'blur' }
        ],
        checkPhone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      size: [
        { id: '1', size: "微型(0-10人)", },
        { id: '2', size: "小型(11-100人)", },
        { id: '3', size: "中型(101-500人)", },
        { id: '4', size: "大型(500人以上)", },
      ],
      // 发送验证码
      disabled: false,
      time: 0,
      btntxt: "重新发送",
      // 
      imageUrl: '',
      dialogFormVisible: false,//弹出框
      status: 0,  // 0:信息未填写 1:审核中 2:审核成功 3：审核失败
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    confirm () {
      // this.dialogFormVisible = false
      this.$message({
        message: '请核实开通记账簿相关信息',
        center: true,
        type: 'warning'
      })
    },
    cancel () {
      this.dialogFormVisible = false
    },
    sendcode () {
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
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 发送请求跳转
          this.dialogFormVisible = true;
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
    // 审核成功下的提交
    submitSuccess () {

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
</style>