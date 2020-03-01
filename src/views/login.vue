<template>
  <div class="bigBox">
    <img src="../assets/images/loginBg.png" class="loginBg" alt="login">
    <div class="loginBox">
      <div class="loginName">{{loginText}}</div>
      <el-form v-if="isLogin" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <div style="display:flex">
              <el-input v-model="ruleForm.captcha" placeholder="请输入验证码" style="width:35%"></el-input>
              <img @click="getUuid()" :src="url+'/captcha.jpg?uuid='+ruleForm.uuid" alt="" class="codeImg" style="width:24%">
              <span style="">看不清楚？ <a class="inA" @click="getUuid()">换一张</a></span>
            </div>
          </el-form-item>
          <div class="forgetPasBox">
            <el-radio-group v-model="autoLogin">
              <el-radio label="下次自动登录"></el-radio>
            </el-radio-group>
            <span>忘记密码？</span>
          </div>
        <div class="forgetPasBox">
          <el-button style="width:100%;height:46px;font-size:18px" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <div class="forgetPasBox">
          <el-button class="register" style="width:100%;height:46px;font-size:18px" @click="registerBut1('ruleForm')">注册</el-button>
        </div>
      </el-form>
      <el-form v-if="!isLogin" :model="register" :rules="ruleRegister" ref="ruleRegister" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="register.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="单位" prop="company">
            <el-input v-model="register.company" placeholder="请输单位"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="register.department" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="register.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="register.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="register.confirmPassword" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <!-- <el-form-item label="用户名" prop="user">
            <el-input v-model="register.user" placeholder="请输入用户名"></el-input>
          </el-form-item> -->
          <div class="forgetPasBox">
            <el-button style="width:100%;height:46px;font-size:18px" type="primary" @click="goSubmitForm('ruleRegister')">登录</el-button>
          </div>
          <div class="forgetPasBox">
            <el-button class="register" style="width:100%;height:46px;font-size:18px" @click="registerBut2('ruleRegister')">注册</el-button>
          </div>
      </el-form>
          
    </div>
  </div>
</template>

<script>
import base from '../request/base'; // 导入接口域名列表

export default {
    name: 'login',
  data() {
    return {
      url:base.sq,
      loginText:'账号登录',
      isLogin: true,
      autoLogin:'',
      ruleForm: {
        username: '',
        password: '',
        // autoLogin: '',
        uuid:'',
        captcha: '',
      },
      register: {
        username: '',
        name: '',
        company: '',
        department: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      },
      ruleRegister: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        company: [
            { required: true, message: '请输入单位', trigger: 'blur' },
        ],
        department: [
            { required: true, message: '请输入部门', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
      this.getUuid()
  },
  methods: {
    getUuid() {
      function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      this.ruleForm.uuid = (S4() + S4() + "-" + S4() + "-" + S4());
    },
    submitForm(formName) {
      this.isLogin = true
      // 点击登录 跳转到登录界面
      this.$refs[formName].validate((valid) => {
        // 判断是否存在空的必填项
      if (valid) {
        var that = this
        this.$api.login(that.ruleForm).then( res => {
          that.getUuid()
          if(res.data.code==0){
            that.$router.push('/')
          }
        })
      } else {
        this.getUuid()
        console.log('error submit!!');
        return false;
      }
      });
    },
    goSubmitForm(formName) {
      this.$nextTick(()=>{
        this.$refs['ruleRegister'].resetFields();
      })
      this.loginText = '账号登录'
      this.isLogin = true
      this.$nextTick(()=>{
        this.$refs['ruleForm'].resetFields();
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    registerBut1(formName) {
      this.$nextTick(()=>{
        this.$refs[formName].resetFields();
      })
        this.isLogin = false
        this.loginText = '账号注册'
      this.$nextTick(()=>{
        this.$refs['ruleRegister'].resetFields();
      })  
    },
    registerBut2(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.signIn(this.register).then( res => {
              console.log(res)
            })
          } else {
          console.log('error submit!!');
          return false;
          }
        })
    }
  }
}
</script>

<style>
  .el-form-item__error{
    box-sizing: content-box;
    position: absolute;
    top:-30px!important;
    left: 10px!important;
    height: 15px;
    background: rgb(238,147,5);
    padding: 5px;
    color: #fff!important
  }
  .forgetPasBox .el-radio__input.is-checked .el-radio__inner{
    border-color: #33B0B5;
    background: #33B0B5;
  }
  .forgetPasBox .el-radio__input.is-checked+.el-radio__label{
    color: #33B0B5
  }
</style>
<style scoped>
  .register{
    border: 1px solid #33B0B5;
    color: #33B0B5;
  }
  .forgetPasBox{
    margin-bottom: 22px;
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .forgetPasBox span{
    color: #33B0B5;
    font-size: 14px
  }
  .inA{
    color: #33B0B5;
    text-decoration: underline;
    cursor: pointer;
  }
  .codeImg{
    width: 22%;
    align-items: center;
    margin: 0 15px;
  }
    .loginName{
        color: #333333;
        font-size: 24px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 34px;
    }
    .loginBox{
        width: 25%;
        position: absolute;
        right: 15%;
        top: 50%;
        transform: translate(0,-50%);
    }
    .bigBox{
        width: 100%;
        height: 100vh;
        position: relative;
        /* background: url('../assets/images/loginBg.png'); */
    }
    .bigBox .loginBg{
        position: absolute;
        width: 100%;
        height: 100%;
        left: -3px;
        z-index: -1;
    }
</style>