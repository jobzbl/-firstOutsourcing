<template>
  <div>
    <div class="header">
      <div style="width:100%;background: #1A242F;">
        <div class="wrap flexSb logoTextBox">
          <div class="flexSb">
            <div class="logoText"></div>
            <div class="logoName">SiC<sub>f</sub>/SiC<span>陶瓷基复合材料界面相数据库</span></div>
          </div>
          <div class="searchBox">
            <div style="width:380px" class="inputBox">
              <el-input placeholder="输入关键字搜索" v-model="input3" @blur="searchBlur" class="input-with-select">
                <el-button slot="append" @click="searchBut()" class="searchBut" icon="el-icon-search"></el-button>
              </el-input>
              <ul class="sousuokuang" v-if="sousuojieguo.length">
                <li v-for="data in sousuojieguo" :key="data.dataId+'m'" @click="dianjili()">
                  <router-link :to="{path:'/result',query:{'id':data.dataContail,'dataTips':data.dataDescription,'dataPid':data.dataPid,'dataValue':data.param2,'dataMain':data.dataMain}}">
                  {{data.dataContail}}-{{data.param106}}-{{data.param107}}-{{data.param108}}
                  </router-link>
                </li>
              </ul>
              <!-- <ul class="sousuokuang" v-if="sousuojieguo.length">
                <li>无内容</li>
              </ul> -->
            </div>
            <div class="userButton">
               <!-- :style="quanxian.indexOf('3')>0?'cursor:not-allowed;color:#d1d1d1;pointer-events: none':''" -->
              <span :title="userName" style="display: inline-block;
                    width: 55px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;">
                <router-link :to="{path:'/data-cen/user/personalCenter'}">{{userName}}</router-link>
              </span>
              <span>|</span>
              <span v-if="roleIdList==1">超级管理员</span>
              <span v-if="roleIdList==2">管理员</span>
              <span v-if="roleIdList==3">一般用户</span>
              <span style="cursor: pointer;" @click="out()"><i class="iconfont icontuichufffpx"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bigScroll2">
    <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dheader',
  data() {
    return {
      input3:'',
      name:'',
      userName:'',
      roleIdList:'',
      quanxian:localStorage.getItem('roleIdList'),
      sousuojieguo:[]
    }
  },
  created() {
      this.init()
  },
  methods: {
    dianjili(){
      this.$router.go(0)
    },
    searchBlur(){
       this.sousuojieguo =[]
    },
    searchBut(){
      if(this.input3==''){
        this.$message({
            message: '请输入关键字',
            type: 'warning'
        });
        return
      }
      this.$api.getSysDataList({page:1,limit:10,dataContail:this.input3}).then( res => {
        this.sousuojieguo = res.data.page.list
        console.log(this.sousuojieguo)
        // if(res.data.page.list.length){
        //   // 'content':data.dataContent,'element':data.dataElement
        //   this.$router.push('/result?id='+res.data.page.list[0].dataContail
        //   +'&dataTips='+JSON.stringify(res.data.page.list[0].dataDescription)
        //   +'&dataPid='+JSON.stringify(res.data.page.list[0].dataPid)
        //   +'&dataValue='+JSON.stringify(res.data.page.list[0].param2)
        //   )
        // }else{
        //   this.$router.push('/result?id=0')
        // }
      })
    },
    out(){
      if(localStorage.getItem("autoLogin")=='false'){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
      this.$router.push('/login')
    },
    init() {
      this.name = JSON.parse(localStorage.getItem("user")).name
      this.userName = JSON.parse(localStorage.getItem("user")).username
      this.roleIdList = JSON.parse(localStorage.getItem("roleIdList"))[0]
        // this.$router.push('/login') 
    },
  }
}
</script>

<style>
  .sousuokuang{
    position: absolute;
    background: #fff;
    width: 380px;
    border: 1px solid #e1e1e1;
    z-index: 99999;
  }
  .sousuokuang li{
    padding: 15px;
  }
  .sousuokuang li:hover{
    background: #33B0B5;
    color: #fff;
    cursor: pointer;
  }
  .bigScroll2{
    height: calc(100vh - 60px);
    overflow-y:auto;
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
    background: url('../assets/images/logo.png') no-repeat left;
    color: #fff;
    width: 30px;
    font-size: 24px;
    font-family:FZCYJ;
    height: 60px;
    line-height: 60px;
  }
  .logoName{
    color: #fff;
    font-size: 26px;
    margin-left: 10px;
    font-family:"Times New Roman",Georgia,Serif;
  }
  .logoName span{
    font-weight: bold;
  }
</style>