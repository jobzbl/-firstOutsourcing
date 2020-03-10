import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    set_token(state,token){
      state.token = token;
      window.localStorage.getItem('token')
    },
    del_token(state){
      state.token = '';
      window.localStorage.removeItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
})
