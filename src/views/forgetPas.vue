<template>
  <div class="bigBox">
    <div class="loginBgImg">
      <img class="img1" src="../assets/images/login1.png" alt="">
      <img class="img2" src="../assets/images/login2.png" alt="">
    </div>
    <img src="../assets/images/loginBg.png" class="loginBg" alt="login">
    <div class="loginBox">
      <div class="loginName">忘记密码</div>
      <el-form v-if="!setNewPas" :model="forgetPWArr" :rules="ruleforgetPWArr" ref="forgetPW" label-width="100px" class="demo-ruleForm">
        <div v-if="!mailDelivery">
          <div class="goLogin">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="forgetPWArr.username" placeholder="请输入用户名"></el-input>
              <span style="cursor: pointer;" @click="goZhuce()">去注册<i class="iconfont icongengduo"></i></span>
            </el-form-item>
          </div>
          <div class="goLogin">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="forgetPWArr.email" placeholder="请输入邮箱"></el-input>
              <span :style="verifyCodeIsShow?'color:#999;pointer-events: none':''" style="cursor: pointer;right:-120px" @click="forgetSubmitForm()">
                {{verifyCodeIsShow?totalTime+'s后重新发送':'发送验证邮件'}}
              </span>
            </el-form-item>
            </div>
            <el-form-item label="验证码" prop="verifyCode">
              <el-input v-model="forgetPWArr.verifyCode" placeholder="请输入验证码"></el-input>
            </el-form-item>
          </div>
          <!-- <div v-if="mailDelivery" style="font-size:16px;color:#999;text-align:center;margin-bottom:60px">
            邮件已发送至你的邮箱<span style="color:#333">{{forgetPWArr.email}}</span>快去查收邮件吧
          </div> -->
          <div class="forgetPasBox">
            <!-- <el-button v-if="!mailDelivery&&!verifyCodeIsShow" style="width:100%;height:46px;font-size:18px" type="primary" @click="forgetSubmitForm('')">发送验证邮件</el-button> -->
            <!-- <el-button v-if="mailDelivery" style="width:100%;height:46px;font-size:18px" type="primary" @click="sent('forgetPW')">邮件已发送 <i style="color:#fff" class="iconfont icondui"></i> </el-button> -->
            <el-button v-if="!mailDelivery" style="width:100%;height:46px;font-size:18px" type="primary" @click="nextStep('forgetPW')">下一步</el-button>
          </div>
          <div class="forgetPasBox">
            <el-button class="register" style="width:100%;height:46px;font-size:18px" @click="registerforget('forgetPW')">去登录</el-button>
          </div>
        </el-form>

        <el-form v-if="setNewPas" :model="forgetPWArr" :rules="rulesetPassword" ref="setPassword" label-width="130px" class="demo-ruleForm">
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
    name: 'forgetPas',
  data() {
    return {
      forgetPWArr:{
        email:'',
        username:'',
        verifyCode:''
      },
      mailDelivery:false,
      ruleforgetPWArr:{
        username: [
            { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        verifyCode: [
            { required:true, message: '输入不能为空', trigger: 'blur' },
        ],
      },
      rulesetPassword:{
        password: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { min: 6, max: 20, message: '密码只能输入6-20个字母、数字、下划线！', trigger: 'blur' }
        ],
        newPassword: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { min: 6, max: 20, message: '密码只能输入6-20个字母、数字、下划线！', trigger: 'blur' }
        ],
      },


      
      verifyCodeIsShow:false,
      totalTime:120,
      setPassword:{
        name:''
      },
      
      url:base.sq,
      isLogin: 1,
      register: {
        username2: '',
        name: '',
        company: '',
        department: '',
        email: '',
        password2: '',
        confirmPassword: ''
      },
      
      setNewPas:false,
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
    }
  },
  created() {
  },
  methods: {
    goZhuce(){
      this.$router.push('/register')
    },
    nextStep(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var parmas = {
            username:this.forgetPWArr.username,
            verifyCode:this.forgetPWArr.verifyCode
          }
          this.$api.forgetPassword2(qs.stringify(parmas)).then(res=>{
            if(res.data.msg == 'success'){
              this.loginText = '设置新密码'
              this.setNewPas = true
            }else{
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
        })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    registerforget(){
      this.$router.push('/login')
    },
    setPasswordOk(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var parmas = {
          username:this.forgetPWArr.username,
          password:this.forgetPWArr.password,
          newPassword:this.forgetPWArr.newPassword,
        }
        this.$api.forgetPassword3(qs.stringify(parmas)).then(res=>{
          if(res.data.code!=0){
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }else{
            this.$message({
              message: '密码修改成功',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/login')
            }, 2000);
          }
        })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    forgetSubmitForm(){ // 发送邮箱验证
      if(this.forgetPWArr.username==''){
        this.$message({
            message: '请输入用户名',
            type: 'warning'
        });
        return
      }else if(this.forgetPWArr.email==''){
        this.$message({
            message: '请输入邮箱',
            type: 'warning'
        });
        return
      }
      var parmas = {
        username:this.forgetPWArr.username,
        email:this.forgetPWArr.email
      }
        this.$api.forgetPassword(qs.stringify(parmas)).then((res)=>{
          if(res.data.code!=0){
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }else{
            this.verifyCodeIsShow = true
            let time = window.setInterval(()=>{
              this.totalTime--
              if(this.totalTime == 0){
                window.clearInterval(time)
                this.totalTime = 120
                this.verifyCodeIsShow = false
              }
            },1000)
          }
        })
    },
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
  .loginBgImg{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0
  }
  .loginBgImg .img1{
    position: absolute;
    top:25%;
    left:10%;
    width:13%;
  }
  .loginBgImg .img2{
    position: absolute;
    left:10%;
    top:35%;
    width:30%
  }
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