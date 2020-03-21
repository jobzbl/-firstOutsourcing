<template>
  <div>
    <div class="header">
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
              <span>{{name}}</span>
              <span style="cursor: pointer;" @click="out()"><i class="iconfont icontuichufffpx"></i></span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="wrap flexStrat headerMenu">
        <div :class="{headerMenuHover:headerMenu==1}" @click="menuClick(1)" style="margin-left:0"><router-link :to="{path:'/'}"></router-link>首页</div>
        <div style="cursor:not-allowed;color:#d1d1d1;pointer-events: none;" :class="{headerMenuHover:headerMenu==2}" @click="menuClick(2)">界面相介绍</div>
        <div style="cursor:not-allowed;color:#d1d1d1;pointer-events: none;" :class="{headerMenuHover:headerMenu==3}" @click="menuClick(3)">界面相筛选</div>
        <div :class="{headerMenuHover:headerMenu==4}" @click="menuClick(4)"><router-link :to="{path:'/dataManage'}"></router-link>数据管理</div>
        <div :class="{headerMenuHover:headerMenu==5}" @click="menuClick(5)"><router-link :to="{path:'/dataStructure'}"></router-link>数据结构管理</div>
        <div :class="{headerMenuHover:headerMenu==6}" @click="menuClick(6)"><router-link :to="{path:'/userManage'}"></router-link>用户管理</div>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'layOut',
  data() {
    return {
      headerMenu:1,
      input3:'',
      name:'',
      nowPath:''
    }
  },
  created() {
      this.init()
  },
  methods: {
    menuClick(e) {
      this.headerMenu = e
    },
    out(){
      this.$router.push('/login')
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
    init() {
      console.log(this.$router.history.current.path)
      if(this.$router.history.current.path == '/'){
          this.headerMenu = 1
        }
        if(this.$router.history.current.path == '/dataManage'){
          this.headerMenu = 4
        }
        if(this.$router.history.current.path == '/dataStructure'){
          this.headerMenu = 5
        }
        if(this.$router.history.current.path == '/userManage'){
          this.headerMenu = 6
        }
      this.name = JSON.parse(localStorage.getItem("user")).name
        // this.$router.push('/login') 
    },
  },
  watch: {
    $route: {
      handler: function(val){
        console.log(val);
        if(val.path == '/'){
          this.headerMenu = 1
        }
        if(val.path == '/dataManage'){
          this.headerMenu = 4
        }
        if(val.path == '/dataStructure'){
          this.headerMenu = 5
        }
        if(val.path == '/userManage'){
          this.headerMenu = 6
        }
      },
      // 深度观察监听
      deep: true
    }
  },
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
    position: relative;
  }
  .headerMenu a{
    color: inherit;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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