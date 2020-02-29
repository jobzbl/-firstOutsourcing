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
              <span>shy</span>
              <span>|</span>
              <span>超级管理员</span>
              <span><i class="iconfont icontuichufffpx"></i></span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="wrap flexStrat headerMenu">
        <div :class="{headerMenuHover:headerMenu==1}" @click="menuClick(1)" style="margin-left:0">首页</div>
        <div :class="{headerMenuHover:headerMenu==2}" @click="menuClick(2)">界面相介绍</div>
        <div :class="{headerMenuHover:headerMenu==3}" @click="menuClick(3)">界面相筛选</div>
        <div :class="{headerMenuHover:headerMenu==4}" @click="menuClick(4)">数据管理</div>
        <div :class="{headerMenuHover:headerMenu==5}" @click="menuClick(5)">数据结构管理</div>
        <div :class="{headerMenuHover:headerMenu==6}" @click="menuClick(6)">用户管理</div>
      </div>
    </header>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'layOut',
  data() {
    return {
      headerMenu:1,
      input3:''
    }
  },
  created() {
      this.init()
  },
  methods: {
    menuClick(e) {
      this.headerMenu = e
    },
    init() {
        // this.$router.push('/login') 
     }
  }
}
</script>

<style>
  .headerMenu div{
    height: 40px;
    line-height: 40px;
    margin-top: 12px;
    padding: 0 35px;
    margin-left: 40px;
    border-radius: 30px;
    font-size: 18px;
    color: #333333;
    cursor: pointer;
  }
  .headerMenuHover{
    background: #33B0B5;
    color: #fff!important
  }
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