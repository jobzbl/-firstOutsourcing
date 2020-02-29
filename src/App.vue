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
</style>
