<template>
    <div style="postion:relative">
      <el-input style="position:fixed;left:-999999px" type="password"></el-input>
      <el-input v-model="password" :type="passwordBox?'password':'text'" placeholder="请输入密码"></el-input>
      <i @click="eyeButton()" :class="passwordBox?'iconyanjing':'iconyanjing1'" class="iconfont eyeButton "></i>
    </div>
</template>
<script>
export default {
    name:'passowrdInput',
    data(){
        return {
            passwordBox:true
        }
    },
    props:{
        password:{
            type:String,
            default:''
        }
    },
    methods: {
        eyeButton(){
            this.passwordBox=!this.passwordBox
        }
    }

}
</script>
<style lang="less" scoped>
  .eyeButton{
    position: absolute;
    right:10px;
  }
</style>

