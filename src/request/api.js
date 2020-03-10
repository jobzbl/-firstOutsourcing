import base from './base'; // 导入接口域名列表
import axios from './http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const article = {    
    // 新闻列表    
    // articleList () {        
    //     return axios.get(`${base.sq}/topics`);    
    // },    
    // 新闻详情,演示    
    // articleDetail (id, params) {        
    //     return axios.get(`${base.sq}/topic/${id}`, {            
    //         params: params        
    //     });    
    // },
    // 登录    
    login (params) {        
        return axios.post(`${base.sq}/sys/login`, params);    
    },
    //注册
    signIn (params) {
        return axios.post(`${base.sq}/regedit`, params);    
    },
    //获取一级分类列表
    stairList () {
        return axios.get(`${base.sq}/sys/sysComposition/queryFirst`);    
    },
    //获取二级分类列表
    secondList (id) {
        return axios.get(`${base.sq}/sys/sysComposition/querySecond/${id}`);    
    },
    //获取三级分类列表
    threeLeve (id) {
        return axios.get(`${base.sq}/sys/sysComposition/queryThree/${id}`);    
    },
    // 根绝分类查询详情
    getSysDataList (params) {
        return axios.get(`${base.sq}/sys/sysData/list`,{
            params
        });    
    },
    // 其他接口…………
}
export default article;