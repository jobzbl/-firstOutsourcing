<template>
  <div class="bigBox">
    <img class="bigBgimg" src="../assets/images/bigbgimg.png" alt="">
    <!-- <img src="../assets/images/loginBg.png" class="loginBg" alt="login"> -->
    <div class="borderBox">
      <img class="huawen" src="../assets/images/huawen.png" alt="">
      <div class="loginBgImg">
        <img class="img1" src="../assets/images/login1.png" alt="">
        <img class="img2" src="../assets/images/login2.png" alt="">
      </div>
      <div class="loginBox">
        <div class="loginName">{{loginText}}</div>
        <el-form v-if="isLogin==1" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <div style="position:relative">
                <el-input v-model="ruleForm.password" :type="passwordBox?'password':'text'" placeholder="请输入密码">
                </el-input>
                <i @click="eyeButton()" :class="passwordBox?'iconyanjing':'iconyanjing1'" class="iconfont eyeButton "></i>
              </div>
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
            <el-button class="register" style="width:100%;height:46px;font-size:18px" @click="quzhuce('ruleForm')">注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
    
  </div>
</template>

<script>
import base from '../request/base'; // 导入接口域名列表

export default {
    name: 'login',
  data() {
    return {
      verifyCodeIsShow:false,
      totalTime:120,
      setPassword:{
        name:''
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
      rulesetPassword:{
        password: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
        newPassword: [
            { required: true, message: '不能为空', trigger: 'blur' },
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
      mailDelivery:false,
      init:true,
      passwordBox:true,
    }
  },
  created() {
      this.getUuid()
  },
  methods: {
    eyeButton(){
      this.passwordBox=!this.passwordBox
    },
    forgetPW(){
      this.$router.push('/forgetPas')
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
          localStorage.setItem("roleIdList", JSON.stringify(res.data.roleIdList))
          localStorage.setItem("menuIdList", JSON.stringify(res.data.menuIdList))
          if(this.autoLogin){
            localStorage.setItem("autoLogin", true)
          }else{
            localStorage.setItem("autoLogin", false)
          }
          if(this.autoLogin){
            this.setCookie(that.ruleForm, 7);
          }else{
            this.clearCookie();
          }
          if(res.data.code==0){
            this.$api.getNowUserInfo().then(res2=>{
              localStorage.setItem("user", JSON.stringify(res2.data.user))
              if(res.data.code==0){
                that.$router.push('/')
              }
            })
          }else{
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
          
        })
      } else {
        this.getUuid()
        console.log('error submit!!');
        return false;
      }
      });
    },
    quzhuce() {
      this.$router.push('/register')
    },
    
  }
}
</script>

<style style lang="less">
  .bigBox{
    .el-input.is-active .el-input__inner, .el-input__inner:focus{
      background: rgba(51,176,181,.1);
    }
  } 
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
  .eyeButton{
    position: absolute;
    right:10px;
  }
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
    .borderBox{
      width: 90%;
      height: 80%;
      background:#fff;
      box-shadow: 0 0 20px rgba(29,37,47,.24);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 50px;
    }
    .huawen{
      max-height: auto;
      max-width: 48%;
    }
    @media screen and (max-width: 1680px) {
      .loginBox{
        left: 53%;
      }
      .bigBgimg{
        width: 57%!important
      }
    }
    @media screen and (max-width: 1660px) {
      .bigBgimg{
        width: 56.6%
      }
    }
    @media screen and (max-width: 1600px) {
      .bigBgimg{
        width: 52.4%!important
      }
      .huawen{
        height: 90%;
      }
      .borderBox{
        height: 90%;
      }
    }
    @media screen and (max-width: 1440px) {
      .huawen{
        height:84%;
      }
      .bigBgimg{
        width: 54%!important
      }
    }
    @media screen and (max-width: 1400px) {
      .huawen{
        height: 67%;
      }
      .bigBgimg{
        width: 55%
      }
    }
    
    @media screen and (max-width: 1366px) {
      .huawen{
        height: 92%;
      }
      .bigBgimg{
        width: 52%!important
      }
    }
    .bigBgimg{
      height: auto;
      width: 54.4%;
    }
    .bigBox{
        width: 100%;
        height: 100vh;
        position: relative;
        /* background-image: url('../assets/images/loginBg.png');
        background-repeat:no-repeat;
        background-size: auto 100vh;
        background-attachment:fixed; */
        /* background-position:center; */
    }
    .bigBox .loginBg{
        position: absolute;
        width: 100%;
        height: 100%;
        left: -3px;
        z-index: -1;
    }
</style>