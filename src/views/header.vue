<template>
  <div>
    <header class="header">
      <div style="width:100%;background: #1A242F;">
        <div class="wrap flexSb logoTextBox">
          <div class="logoText"></div>
          <div class="searchBox">
            <div style="width:380px" class="inputBox">
              <el-input placeholder="输入关键字搜索" v-model="input3" class="input-with-select">
                <el-button slot="append" class="searchBut" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div class="userButton">
              <span><router-link :to="{path:'/data-cen/user/personalCenter'}">shy</router-link></span>
              <span>|</span>
              <span>超级管理员</span>
              <span><i class="iconfont icontuichufffpx"></i></span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'header',
  data() {
    return {
      input3:''
    }
  },
  created() {
      this.init()
  },
  methods: {
    init() {
        // this.$router.push('/login') 
     }
  }
}
</script>

<style>
  .userButton{
    color: #fff;
    width: 200px;
    padding-left: 20px;
    display: flex;
    justify-content: space-around
  }
  .searchBox{
    display: flex;
    justify-content: space-between;
  }
  .inputBox .el-input__inner{
    border-radius: 0
  }
  .inputBox .el-input-group__append{
    background:#33B0B5;
    border: 0;
  }
  .searchBut .el-icon-search{
    color: #fff
  }
  .searchBut{
    color: #fff;
  }
  .logoTextBox div{
    align-self: center;
  }
  .logoText{
    background: url('../assets/images/logo.png') no-repeat center;
    color: #fff;
    width: 442px;
    font-size: 24px;
    font-family:FZCYJ;
    height: 60px;
    line-height: 60px;
  }
</style>