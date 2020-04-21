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
    // 搜索结果页
    searchResult(params){
        return axios.get(`${base.sq}/sys/sysData/info`,{
            params
        })
    },
    // 数据管理列表
    dataManage(params){
        return axios.get(`${base.sq}/sys/sysData/querylist`,{
            params
        })
    },
    // 获取数据类型
    dataTypelist(){
        return axios.get(`${base.sq}/sys/config/typeList`)
    },
    // 获取数据分类
    dataClassify(){
        return axios.get(`${base.sq}/sys/config/classList`)
    },
    // 获取关键词
    getKeyword(params){
        return axios.get(`${base.sq}/sys/sysDatastructure/queryKey`,{
            params
        })
    },
    // 获取数据来源
    getDataSource(){
        return axios.get(`${base.sq}/sys/sysDatastructure/querySource`)
    },
    // 获取数据结构管理
    getdataStrutureData(params){
        return axios.get(`${base.sq}/sys/sysDatastructure/list`,{params})
    },
    // 获取用户列表
    getUserList(params){
        return axios.get(`${base.sq}/sys/user/list`,{params})
    },
    // 获取用户权限
    getUserSelectMenu(){
        return axios.get(`${base.sq}/sys/user/selectMenu`)
    },
    // 获取用户类型
    getUserRole(){
        return axios.get(`${base.sq}/sys/user/selectRole`)
    },
    // 上传数据
    upData(params){
        return axios.post(`${base.sq}/sys/sysData/save`,params)
    },
    // 保存关键字
    addKey(params){
        return axios.post(`${base.sq}/sys/sysDatastructure/save`,params)
    },
    // 合并关键字
    mergeKey(params){
        return axios.post(`${base.sq}/sys/sysDatastructure/merge`,params)
    },
    // 获取用户信息
    getUserInfo(params){
        return axios.get(`${base.sq}/sys/user/info/${params}`)
    },
    // 获取当前用户信息
    getNowUserInfo(){
        return axios.get(`${base.sq}/sys/user/info`)
    },
    // 修改用户信息
    editUser(params){
        return axios.post(`${base.sq}/sys/user/update`,params)
    },
    // 修改用户信息
    editUser2(params){
        return axios.post(`${base.sq}/sys/user/updateInfo`,params)
    },
    // 修改密码
    editPasword(params){
        return axios.post(`${base.sq}/sys/user/password`,params)
    },
    // 删除数据 管理
    deleteData(params){
        return axios.post(`${base.sq}/sys/sysData/delete`,params)
    },
    // 删除用户
    deleteUser(params){
        return axios.post(`${base.sq}/sys/user/delete`,params)
    },
    // 修改数据
    editData(params){
        return axios.post(`${base.sq}/sys/sysDat/upData`,params)
    },
    // 获取数据信息（单条）
    getDataOne(id,params){
        return axios.get(`${base.sq}/sys/sysData/info/${id}`,{params})
    },
    // 上传数据
    fileUpData(params){
        return axios.post(`${base.sq}/sys/oss/upload`,params)
    },
    // 删除上传文件
    fileDelete(params){
        return axios.post(`${base.sq}/sys/oss/delete`,params)
    },
    // 保存编辑
    eidtSave(params){
        return axios.post(`${base.sq}/sys/sysData/update`,params)
    },
    // 上传文件
    upFile(params){
        return axios.post(`${base.sq}/sys/sysData/import`,params)
    },
    // 下载
    onFile(params){
        return axios.post(`${base.sq}/sys/sysData/export`,params,{responseType: 'blob'})
    },
    // 下载
    onDown(params){
        return axios.post(`${base.sq}/sys/user/export`,params)
    },
    // 忘记密码
    forgetPassword(params){
        return axios.get(`${base.sq}/sys/user/forgetPassword?${params}`)
    },
    // 忘记密码2
    forgetPassword2(params){
        return axios.get(`${base.sq}/sys/user/reset_password?${params}`)
    },
    // 忘记密码3
    forgetPassword3(params){
        return axios.get(`${base.sq}/sys/user/confirm_password?${params}`)
    },
    // 修改用户状态
    editStatus(params){
        return axios.post(`${base.sq}/sys/user/updateStatus`,params)
    },
    // 批量导入
    bulkImport(params){
        return axios.post(`${base.sq}/sys/sysData/batchImport`,params)
    },
    // 获取原子位置坐标
    atomSeat(params){
        return axios.get(`${base.sq}/sys/sysData/trans?${params}`)
    },
}
export default article;