<template>
    <router-view/>
</template>

<style>
@import './common/font/font.css';
*{
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
a{
  text-decoration: none;
  color: inherit
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
body{
  margin: 0;
  padding: 0;
}
ul,li{
  list-style: none;
}
.wrap{
  width: 1200px;
  margin: 0 auto;
}
.flexSb{
  display: flex;
  justify-content: space-between
}
.flexStrat{
  display: flex;
  justify-content: flex-start;
}
.fl{
  float: left;
}
::-webkit-scrollbar {
  width: 10px; /*滚动条宽度*/
  height: 16px; /*滚动条高度*/
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: #E2FCF9; /*滚动条的背景颜色*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #33B0B5; /*滚动条的背景颜色*/
}
</style>
