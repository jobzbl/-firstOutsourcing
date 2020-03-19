<template>
  <div class="bigBox">
    <img src="../assets/images/loginBg.png" class="loginBg" alt="login">
    <div class="loginBox">
      <div class="loginName">{{loginText}}</div>
      <el-form v-if="isLogin==1" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <div style="display:flex">
              <el-input v-model="ruleForm.captcha" placeholder="请输入验证码" style="width:35%"></el-input>
              <img @click="getUuid()" :src="url+'/captcha.jpg?uuid='+ruleForm.uuid" alt="" class="codeImg" style="width:24%">
              <span>看不清楚？ <a class="inA" @click="getUuid()">换一张</a></span>
            </div>
          </el-form-item>
          <div class="forgetPasBox">
              <el-checkbox v-model="autoLogin">下次自动登录</el-checkbox>
            <!-- <el-radio-group v-model="autoLogin">
              <el-radio label="下次自动登录"></el-radio>
            </el-radio-group> -->
            <span @click="forgetPW">忘记密码？</span>
          </div>
        <div class="forgetPasBox">
          <el-button style="width:100%;height:46px;font-size:18px" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <div class="forgetPasBox">
          <el-button class="register" style="width:100%;height:46px;font-size:18px" @click="registerBut1('ruleForm')">注册</el-button>
        </div>
      </el-form>
      <el-form v-if="isLogin==2" :model="register" :rules="ruleRegister" ref="ruleRegister" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
            <el-input v-model="register.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
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
            <el-button type="primary" style="width:100%;height:46px;font-size:18px" @click="registerBut2('ruleRegister')">确定</el-button>
          </div>
          <div class="forgetPasBox">
            <el-button class="register" style="width:100%;height:46px;font-size:18px"  @click="goSubmitForm('ruleRegister')">返回登录</el-button>
          </div>
          
      </el-form>
      <el-form v-if="isforgetPW" :model="forgetPWArr" :rules="ruleforgetPWArr" ref="forgetPW" label-width="100px" class="demo-ruleForm">
        <div v-if="!mailDelivery">
          <div class="goLogin">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="forgetPWArr.username" placeholder="请输入用户名"></el-input>
              <span style="cursor: pointer;" @click="goZhuce()">去注册<i class="iconfont icongengduo"></i></span>
            </el-form-item>
          </div>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="forgetPWArr.email" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="verifyCodeIsShow&&forgetPWArr.email" label="验证码" prop="verifyCode">
            <el-input v-model="forgetPWArr.verifyCode" placeholder="请输入验证码"></el-input>
          </el-form-item>
        </div>
        <!-- <div v-if="mailDelivery" style="font-size:16px;color:#999;text-align:center;margin-bottom:60px">
          邮件已发送至你的邮箱<span style="color:#333">{{forgetPWArr.email}}</span>快去查收邮件吧
        </div> -->
        <div class="forgetPasBox">
          <el-button v-if="!mailDelivery&&!verifyCodeIsShow" style="width:100%;height:46px;font-size:18px" type="primary" @click="forgetSubmitForm('forgetPW')">发送验证邮件</el-button>
          <el-button v-if="mailDelivery" style="width:100%;height:46px;font-size:18px" type="primary" @click="sent('forgetPW')">邮件已发送 <i style="color:#fff" class="iconfont icondui"></i> </el-button>
          <el-button v-if="!mailDelivery&&verifyCodeIsShow" style="width:100%;height:46px;font-size:18px" type="primary" @click="nextStep()">下一步</el-button>
        </div>
        <div class="forgetPasBox">
          <el-button class="register" style="width:100%;height:46px;font-size:18px" @click="registerforget('forgetPW')">去登录</el-button>
        </div>
       </el-form>
       
      <el-form v-if="!init" :model="forgetPWArr" :rules="rulesetPassword" ref="setPassword" label-width="100px" class="demo-ruleForm">
          <el-form-item label="新密码" prop="password">
            <el-input v-model="forgetPWArr.password" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码" prop="newPassword">
            <el-input v-model="forgetPWArr.newPassword" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <div class="forgetPasBox">
            <el-button class="register" style="width:100%;height:46px;font-size:18px" @click="setPasswordOk('setPassword')">确定</el-button>
          </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import base from '../request/base'; // 导入接口域名列表
import qs from 'qs'

export default {
    name: 'login',
  data() {
    var verifyCodeFun = (rule, value, callback) => {
      console.log(rule)
      console.log(value)
      console.log(callback)
      // if (!value) {
      //   return callback(new Error('年龄不能为空'));
      // }
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('请输入数字值'));
      //   } else {
      //     if (value < 18) {
      //       callback(new Error('必须年满18岁'));
      //     } else {
      //       callback();
      //     }
      //   }
      // }, 1000);
    };
    return {
      verifyCodeIsShow:false,
      setPassword:{
        name:''
      },
      forgetPWArr:{
        email:'',
        username:'',
        verifyCode:''
      },
      isforgetPW:false,
      url:base.sq,
      loginText:'账号登录',
      isLogin: 1,
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
      rulesetPassword:{
        password: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
        newPassword: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
      },
      ruleforgetPWArr:{
        username: [
            { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        verifyCode: [
            { validate:verifyCodeFun, trigger: 'blur' },
        ],
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
      },
      mailDelivery:false,
      init:true,
    }
  },
  created() {
      this.getUuid()
      this.initFun()
  },
  methods: {
    initFun(){
      if(!this.init){
        this.loginText = '设置新密码'
        this.isLogin = 3
      }
    },
    goZhuce(){
      this.mailDelivery = true
      this.isforgetPW = false
      this.isLogin = 2
      this.loginText = '账号注册'
    },
    setPasswordOk(){
      var parmas = {
          username:this.forgetPWArr.username,
          password:this.forgetPWArr.password,
          newPassword:this.forgetPWArr.newPassword,
        }
      this.$api.forgetPassword3(qs.stringify(parmas)).then(()=>{
        this.verifyCodeIsShow = true
        this.mailDelivery = false
        this.isforgetPW = false
        this.isLogin = 1
        this.loginText = '账号登录'
        this.init= true
        this.getUuid()
      })
    },
    forgetSubmitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var parmas = {
            username:this.forgetPWArr.username,
            email:this.forgetPWArr.email
          }
          this.$api.forgetPassword(qs.stringify(parmas)).then(res=>{
            console.log(res)
            this.verifyCodeIsShow = true
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    nextStep(){
        var parmas = {
          username:this.forgetPWArr.username,
          verifyCode:this.forgetPWArr.verifyCode
        }
        this.$api.forgetPassword2(qs.stringify(parmas)).then(res=>{
          console.log(res)
          if(res.data.msg == 'success'){
            this.loginText = '设置新密码'
            this.isLogin = 3
            this.init = false
            this.isforgetPW = false
          }
          // this.verifyCodeIsShow = true
        })
    },
    sent(){
      
    },
    registerforget(){
      this.verifyCodeIsShow = false
        this.mailDelivery = true
        this.isforgetPW = false
        this.isLogin = 1
        this.loginText = '账号登录'
      this.getUuid()

    },
    forgetPW(){
      this.mailDelivery = false
      this.isforgetPW = true
      this.loginText = '忘记密码'
      this.isLogin = 3
      this.forgetPWArr.email = ''
      this.forgetPWArr.username = ''
    },
    getUuid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      this.ruleForm.uuid = (S4() + S4() + "-" + S4() + "-" + S4());
    },
    setCookie(userInif,exdays){
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie = "userInif"+userInif
    },
    clearCookie: function() {
      this.setCookie("", -1); //修改2值都为空，天数为负1天就好了
    },
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.userInfo.user = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.userInfo.pass = arr2[1];
          }
        }
      }
    },
    submitForm(formName) {
      this.isLogin = 1
      // 点击登录 跳转到登录界面
      this.$refs[formName].validate((valid) => {
        // 判断是否存在空的必填项
      if (valid) {
        var that = this
        this.$api.login(that.ruleForm).then( res => {
          that.getUuid()
          localStorage.setItem("token", res.data.token)
          if(this.autoLogin){
            this.setCookie(that.ruleForm, 7);
          }else{
            this.clearCookie();
          }
          if(res.data.msg==='success'){
            this.$api.getNowUserInfo().then(res2=>{
              localStorage.setItem("user", JSON.stringify(res2.data.user))
              if(res.data.code==0){
                that.$router.push('/')
              }
            })
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
      this.getUuid()
      this.isLogin = 1
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
      this.verifyCodeIsShow = false
      this.$nextTick(()=>{
        this.$refs[formName].resetFields();
      })
        this.isLogin = 2
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
  .goLogin{
    position: relative;
  }
  .goLogin i{
    color:#33B0B5;
    display: inline-block;
    transform:rotate(-90deg)!important
  }
  .goLogin span{
    font-size:16px;
    color:#33B0B5;
    position: absolute;
    top:50%;
    right:-80px;
    transform: translate(0,-50%);
  }
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
        width: 480px;
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