<template>
  <div class="bigBox">
    <div class="loginBgImg">
      <img class="img1" src="../assets/images/login1.png" alt="">
      <img class="img2" src="../assets/images/login2.png" alt="">
    </div>
    <img src="../assets/images/loginBg.png" class="loginBg" alt="login">
    <div class="loginBox">
      <div class="loginName">账号注册</div>
      <el-form :model="register" :rules="ruleRegister" ref="ruleRegister" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username" autocomplete="new-password" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="register.name" autocomplete="new-password" placeholder="请输入姓名"></el-input>
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
          <div class="forgetPasBox">
            <el-button type="primary" style="width:100%;height:46px;font-size:18px" @click="registerBut2('ruleRegister')">确定</el-button>
          </div>
          <div class="forgetPasBox">
            <el-button class="register" style="width:100%;height:46px;font-size:18px"  @click="goSubmitForm('ruleRegister')">返回登录</el-button>
          </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'register',
  data() {
    return {
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
            { min: 6, max: 20, message: '密码只能输入6-20个字母、数字、下划线！', trigger: 'blur' }
        ],
        confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码只能输入6-20个字母、数字、下划线！', trigger: 'blur' }
        ],
      },
    }
  },
  created() {
      this.initFun()
  },
  methods: {
    goSubmitForm(){
      this.$router.push('/login')
    },
    registerBut2(formName) {
      this.$refs[formName].validate((valid) => {
            if (valid) {
              var reg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(!reg.test(this.registe.email)){
              return false
            }
            this.$api.signIn(this.register).then( res => {
              if(res.data.code!=-1&&res.data.code!=500){
                this.goSubmitForm()
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