<template>
  <div class="bigBox">
    <img class="bigBgimg" src="../assets/images/bigbgimg.png" alt="">
    <div class="loginBgImg">
      <img class="img1" src="../assets/images/login1.png" alt="">
      <img class="img2" src="../assets/images/login2.png" alt="">
    </div>
    <!-- <img src="../assets/images/loginBg.png" class="loginBg" alt="login"> -->
    <div class="borderBox">
      <img class="huawen" src="../assets/images/huawen.png" alt="">
      <div class="loginBgImg">
        <img class="img1" src="../assets/images/login1.png" alt="">
        <img class="img2" src="../assets/images/login2.png" alt="">
      </div>
      <div class="loginBox">
        <div class="loginName">账号注册</div>
        <el-form :model="register" :rules="ruleRegister" ref="ruleRegister" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
              <el-input v-model="register.username" autocomplete='new-password' placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="register.name"  autocomplete='new-password' placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="company">
              <el-input v-model="register.company"  autocomplete='new-password' placeholder="请输单位"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="department">
              <el-input v-model="register.department"  autocomplete='new-password' placeholder="请输入部门"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="register.email"  autocomplete='new-password' placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <div style="postion:relative;">
                <div class="passwordBox" v-if="passwordBox1">
                  <div v-for="(item,index) in register.password" :key="index"></div>
                </div>
                <el-input :class="passwordBox1?'passwordInput':''" v-model="register.password" type="text" placeholder="请输入密码"></el-input>
                <i @click="eyeButton()" :class="passwordBox1?'iconyanjing':'iconyanjing1'" class="iconfont eyeButton "></i>
              </div>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword" class="confirmPassword">
              <div style="postion:relative;">
                <div class="passwordBox" v-if="passwordBox2">
                  <div v-for="(item,index) in register.confirmPassword" :key="index"></div>
                </div>
                <el-input :class="passwordBox2?'passwordInput':''" v-model="register.confirmPassword" type="text" placeholder="请输入密码"></el-input>
                <i @click="eyeButton2()" :class="passwordBox2?'iconyanjing':'iconyanjing1'" class="iconfont eyeButton "></i>
              </div>
              <!-- <div style="postion:relative">
                <el-input class="fakeInput" v-model="register.confirmPassword" type="text"></el-input>
                <el-input tabindex='-1' v-model="register.confirmPassword" :type="passwordBox2?'text':'text'"  autocomplete='new-password' placeholder="请再次输入密码"></el-input>
                <i @click="eyeButton2()" :class="passwordBox2?'iconyanjing':'iconyanjing1'" class="iconfont eyeButton "></i>
              </div> -->
            </el-form-item>
            <div class="forgetPasBox">
              <el-button type="primary" style="width:100%;height:46px;font-size:18px" @click="registerBut2('ruleRegister')">确定</el-button>
            </div>
            <div class="forgetPasBox">
              <el-button class="register" style="width:100%;height:46px;font-size:18px"  @click="goSubmitForm('ruleRegister')">返回登录</el-button>
            </div>
        </el-form>
      </div>
    </div>
    <div v-if="zhuceSuccess" class="mask"></div>
    <div v-if="zhuceSuccess" class="zhucechenggong">
      <i class="iconfont icondui"></i>
      <div>注册成功！</div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'register',
  data() {
    return {
      zhuceSuccess:false,
      register: {
        username: '',
        name: '',
        company: '',
        department: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      ruleRegister: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 32, message: '最多输入32个字符', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 32, message: '最多输入32个字符', trigger: 'blur' }
        ],
        company: [
            { required: true, message: '请输入单位', trigger: 'blur' },
            { min: 1, max: 32, message: '最多输入32个字符', trigger: 'blur' }
        ],
        department: [
            { required: true, message: '请输入部门', trigger: 'blur' },
            { min: 1, max: 32, message: '最多输入32个字符', trigger: 'blur' }
        ],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { min: 1, max: 32, message: '最多输入32个字符', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码只能输入6-20个字母、数字、下划线！', trigger: 'blur' }
        ],
        confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码只能输入6-20个字母、数字、下划线！', trigger: 'blur' }
        ],
      },
      passwordBox1:true,
      passwordBox2:true
    }
  },
  created() {
  },
  methods: {
    eyeButton(){
      this.passwordBox1=!this.passwordBox1
    },
    eyeButton2(){
      this.passwordBox2=!this.passwordBox2
    },
    goSubmitForm(){
      this.$router.push('/login')
    },
    registerBut2(formName) {
      this.$refs[formName].validate((valid) => {
            if (valid) {
              var reg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(!reg.test(this.register.email)){
              this.$message({
                  message: '邮箱格式不正确',
                  type: 'warning'
                });
              return false
            }
            this.$api.signIn(this.register).then( res => {
              if(res.data.code!=-1&&res.data.code!=500){
                this.zhuceSuccess = true
                setTimeout(() => {
                  this.goSubmitForm()
                }, 2000);
              }else{
                let msg
                if(res.data.msg.indexOf('<br>')){
                  msg = res.data.msg.replace("<br>","")
                }else{
                  msg = res.data.msg
                }
                this.$message({
                  message: msg,
                  type: 'warning'
                });
              }
            })
          } else {
          console.log('error submit!!');
          return false;
          }
        })
    }
  },
}
</script>

<style lang="less">
  .passwordInput{
    // top:-3px;
    .el-input__inner{
      color:transparent;
      caret-color:#000!important;
    }
    // input::placeholder{
    //   color:#e1e1e1!important;
    // }
    // input::-webkit-input-placeholder{
    //   color:#e1e1e1!important;
    // }
    // input:-moz-placeholder{
    //   color:#e1e1e1!important;
    // }
    // input::-moz-placeholder{
    //   color:#e1e1e1!important;
    // }
    // input:-ms-placeholder{
    //   color:#e1e1e1!important;
    // }
  }
  .confirmPassword .el-form-item__error{
    z-index: 9999;
  }
  // .fakeInput {
  //   position:absolute!important;
  //   z-index:999;
  // }
  // .fakeInput .el-input__inner{
  //   color:rgba(0,0,0,.0);
  //   background:rgba(0,0,0,.0);
  //   font-size: 1px;
  // }
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
  .passwordBox{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    left:11px;
    display: flex;
    z-index: 999;
  }
  .passwordBox div{
    justify-content: flex-start;
    height: 5px;
    width:5px;
    background:#464646;
    border-radius:5px;
    margin-left:3px;
  }
  
  .eyeButton{
    position: absolute;
    right:10px;
    z-index: 99999;
  }
  .mask{
    position: fixed;
    left: 0;
    top:0;
    height: 100%;
    width: 100%;
    background:rgba(0,0,0,.8);

  }
  .zhucechenggong{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    height: 255px;
    width: 255px;
    background:#fff;
    border-radius:5px;
    text-align:center;
    padding-top:70px;
  }
  .zhucechenggong i{
    font-size:90px;
    color:#5cc0c4;
  }
  .zhucechenggong div{
    font-size:14px;
    color:#666;
    line-height:20px
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
      width: 54.8%;
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