<template>
  <div class="bigBox">
    <img src="../assets/images/loginBg.png" class="loginBg" alt="login">
    <div class="loginBox">
      <div class="loginName">{{loginText}}</div>
      <el-form v-if="isLogin" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="user">
            <el-input v-model="ruleForm.user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="password">
            <div style="display:flex">
              <el-input v-model="ruleForm.password" placeholder="请输入验证码" style="width:37%"></el-input>
              <img src="../assets/images/loginBg.png" alt="" class="codeImg" style="width:22%">
              <span style="">看不清楚？ <a class="inA">换一张</a></span>
            </div>
          </el-form-item>
          <div class="forgetPasBox">
            <el-radio-group v-model="ruleForm.autoLogin">
              <el-radio label="下次自动登录"></el-radio>
            </el-radio-group>
            <span>忘记密码？</span>
          </div>
        <div class="forgetPasBox">
          <el-button style="width:100%;height:46px;font-size:18px" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <div class="forgetPasBox">
          <el-button class="register" style="width:100%;height:46px;font-size:18px" @click="registerBut('ruleForm')">注册</el-button>
        </div>
      </el-form>
      <el-form v-if="!isLogin" :model="register" :rules="ruleRegister" ref="ruleRegister" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="register.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="register.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="单位" prop="danwei">
            <el-input v-model="register.danwei" placeholder="请输单位"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="bumen">
            <el-input v-model="register.bumen" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="emil">
            <el-input v-model="register.emil" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="register.user" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordOk">
            <el-input v-model="register.passwordOk" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="user">
            <el-input v-model="register.user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <div class="forgetPasBox">
            <el-button style="width:100%;height:46px;font-size:18px" type="primary" @click="goSubmitForm('ruleRegister')">登录</el-button>
          </div>
          <div class="forgetPasBox">
            <el-button class="register" style="width:100%;height:46px;font-size:18px" @click="registerBut('ruleRegister')">注册</el-button>
          </div>
      </el-form>
          
    </div>
  </div>
</template>

<script>
export default {
    name: 'login',
  data() {
    return {
      loginText:'账号登录',
      isLogin: true,
      ruleForm: {
        user: '',
        password: '',
        autoLogin: ''
      },
      register: {
        userNmae: '',
        name: '',
        danwei: '',
        bumen: '',
        emil: '',
        password: '',
        passwordOk: ''
      },
      rules: {
        user: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
      ruleRegister: {
        userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        danwei: [
            { required: true, message: '请输入单位', trigger: 'blur' },
        ],
        bumen: [
            { required: true, message: '请输入部门', trigger: 'blur' },
        ],
        emil: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        passwordOk: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.isLogin = true
      this.$refs[formName].validate((valid) => {
      if (valid) {
        alert('submit!');
      } else {
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
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
      });
    },
    registerBut(formName) {
      this.$nextTick(()=>{
        this.$refs[formName].resetFields();
      })
      this.isLogin = false
      this.loginText = '账号注册'
      this.$nextTick(()=>{
        this.$refs['ruleRegister'].resetFields();
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