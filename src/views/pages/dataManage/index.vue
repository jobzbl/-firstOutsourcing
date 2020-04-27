<template>
    <div class="wrap">
        <div class="haederBox" v-if="quanxian.indexOf(1)!=-1">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-row>
                        <el-col :span="8"><div class="formLabel" style="padding-right:10px">数据编号</div></el-col>
                        <el-col :span="16">
                            <el-input v-model="formInline.beginNum" style="width:45%" placeholder="最小值"></el-input>
                            -
                            <el-input v-model="formInline.endNum" style="width:45%" placeholder="最大值"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row>
                        <el-col :span="9"><div class="formLabel" style="padding-right:10px">界面相主成分</div></el-col>
                        <el-col :span="15">
                            <!-- dataClassifyObj 为数据分类的数据 -->
                            <!-- dataTypeObj 数据类型 -->
                            <el-select clearable v-model ="formInline.dataContail" style="width:100%" placeholder="请选择界面相主成分">
                                <el-option label="BN" value="BN"></el-option>
                                <el-option label="C" value="C"></el-option>
                                <el-option label="RE2SiO5" value="RE2SiO5"></el-option>
                                <el-option label="RE2Si2O7" value="RE2Si2O7"></el-option>
                                <el-option label="BN/SiC" value="BN/SiC"></el-option>
                                <el-option label="BN/C" value="BN/C"></el-option>
                                <el-option label="C/SiC" value="C/SiC"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row>
                        <el-col :span="8"><div class="formLabel" style="padding-right:10px">界面相类型</div></el-col>
                        <el-col :span="16">
                            <el-select clearable v-model ="formInline.param80" style="width:100%" placeholder="请选择界面相类型">
                                <el-option label="多层" value="多层"></el-option>
                                <el-option label="单层" value="单层"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-top:20px">
                <el-col :span="8">
                    <el-row >
                        <el-col :span="8"><div class="formLabel" style="padding-right:10px">数据来源</div></el-col>
                        <el-col :span="16">
                            <el-select clearable v-model ="formInline.param2" style="width:100%" placeholder="请选择数据来源">
                                <el-option v-for="item in dataSourceObj" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row>
                        <el-col :span="9"><div class="formLabel" style="padding-right:10px">界面相掺杂元素</div></el-col>
                        <el-col :span="15">
                            <el-input v-model="formInline.param7" style="width:100%" placeholder="请输入界面相掺杂元素"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row>
                        <el-col :span="8"><div class="formLabel" style="line-height:16px;padding-right:10px">界面相材料密度 （g/cm<sup>3</sup>)</div></el-col>
                        <el-col :span="16">
                            <el-input v-model="formInline.param30[0]" style="width:45%" placeholder="最小值"></el-input>
                            -
                            <el-input v-model="formInline.param30[1]" style="width:45%" placeholder="最大值"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-top:20px">
                <el-col :span="8">
                    <el-row>
                        <el-col :span="8"><div class="formLabel" style="line-height:16px;padding-right:10px">界面相材料杨氏模量 Ev(GPa)</div></el-col>
                        <el-col :span="16">
                            <el-input v-model="formInline.param39[0]" style="width:45%" placeholder="最小值"></el-input>
                            -
                            <el-input v-model="formInline.param39[1]" style="width:45%" placeholder="最大值"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row >
                        <el-col :span="9"><div class="formLabel" style="padding-right:10px">复合材料合成方法</div></el-col>
                        <el-col :span="15">
                            <el-input v-model="formInline.param79" style="width:100%" placeholder="请输入复合材料合成方法"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row>
                        <el-col :span="8"><div class="formLabel" style="padding-right:10px">复合材料类型</div></el-col>
                        <el-col :span="16">
                            <el-select clearable v-model ="formInline.param12" style="width:100%" placeholder="请选择复合材料类型">
                                <el-option label="model-composite" value="model-composite"></el-option>
                                <el-option label="mini-composite" value="mini-composite"></el-option>
                                <el-option label="1D" value="1D"></el-option>
                                <el-option label="2D" value="2D"></el-option>
                                <el-option label="2.5D" value="2.5D"></el-option>
                                <el-option label="3D" value="3D"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-top:20px">
                <el-col :span="8">
                    <el-row>
                        <el-col :span="8"><div class="formLabel" style="line-height:16px;padding-right:10px">热膨胀系数<br/>（10 <sup>-6</sup>k<sup>-1</sup>）</div></el-col>
                        <el-col :span="16">
                            <el-input v-model="formInline.param74[0]" style="width:45%" placeholder="最小值"></el-input>
                            -
                            <el-input v-model="formInline.param74[1]" style="width:45%" placeholder="最大值"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row>
                        <el-col :span="9"><div class="formLabel" style="padding-right:10px">弯曲强度 （MPa)</div></el-col>
                        <el-col :span="15">
                            <el-input v-model="formInline.param99[0]" style="width:45%" placeholder="最小值"></el-input>
                            -
                            <el-input v-model="formInline.param99[1]" style="width:45%" placeholder="最大值"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <div class="buttonRow" style="margin:20px 0;">
                <!-- <el-button @click="addSearch()"><i class="iconfont iconjiahao"></i>查询条件</el-button> -->
                <el-button @click="reset()">重置</el-button>
                <el-button type="primary" @click="getListdata(true)">查询</el-button>
            </div>
        </div>
        <div class="buttonRow">
            <!-- <router-link :to="{path:'/data-cen/dataManage/updata',query:{'id':scope.row.dataId,'type':'edit'}}">编辑</router-link> -->

            <el-button v-if="quanxian.indexOf(2)!=-1"> <i class="iconfont iconshangchuan"></i> 
            <router-link :to="{path:'/data-cen/dataManage/updata',query:{'id':'','type':'add'}}">上传数据</router-link>
            </el-button>
            <el-button v-if="quanxian.indexOf(4)!=-1" @click="delect('')"> <i class="iconfont iconshanchu"></i> 批量删除</el-button>
            <el-button @click="onDown()"> <i class="iconfont iconxiazai"></i> 批量下载</el-button>
            <el-button @click="downModel()"> <i class="iconfont iconxiazai"></i> 下载模版</el-button>
        </div>
        <div class="tableBox dataManage">
            <el-table ref="multipleTable" header-row-class-name="tableHeader" :data="tableData.list" tooltip-effect="dark" style="width: 100%" 
                @selection-change="handleSelectionChange" border row-class-name="tableTr">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="dataNum" label="数据编号" width="90"></el-table-column>
                <el-table-column prop="dataContail" label="界面相主成分" width="110">
                    <!-- <template slot-scope="scope">
                        <span v-for="(item,index) in scope.row.dataElement" :key='index'>{{item}}<sub style="font-size:10px">{{scope.row.dataContent[index]>1?scope.row.dataContent[index]:''}}</sub>
                        </span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="param7" label="界面相掺杂元素" width="130"></el-table-column>
                <el-table-column prop="param80" label="界面相类型" width="110"></el-table-column>
                <el-table-column prop="param30" label="界面相材料密度 （g/cm³)" width="200"></el-table-column>
                <!-- <el-table-column prop="classificationName" label="数据分类" width="320"></el-table-column> -->
                <el-table-column prop="param39" label="界面相材料杨氏模量 Ev(GPa)" width="220">    </el-table-column>
                <el-table-column prop="param79" label="复合材料合成方法" width="150">    </el-table-column>
                <el-table-column prop="param74" label="热膨胀系数(10¯⁶K¯¹)" width="170">    </el-table-column>
                <el-table-column prop="param99" label="弯曲强度（MPa)" width="140">    </el-table-column>
                <el-table-column prop="param12" label="复合材料类型" width="130">    </el-table-column>
                <el-table-column prop="param2" label="数据来源" width="90">
                    <template slot-scope="scope">
                        <span>
                            {{dataSourceArr[scope.row.param2]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div class="caozuoBox" style="text-align:center">
                            <el-button v-if="quanxian.indexOf(3)!=-1" type="text" style="color:#33B0B5;">
                                <!-- <router-link :to="{path:'/data-cen/dataManage/dataEdit',query:{'id':scope.row.dataId,'type':'edit'}}">编辑</router-link> -->
                                <router-link :to="{path:'/data-cen/dataManage/updata',query:{'id':scope.row.dataId,'type':'edit'}}">编辑</router-link>
                            </el-button>
                            <el-button  v-if="quanxian.indexOf(4)!=-1" @click="delect(scope.row.dataId)" type="text" style="color:#EF992A;">
                                删除
                            </el-button>
                            <el-button v-if="quanxian.indexOf(1)!=-1" type="text" style="color:#248AD1;">
                                <router-link :to="{path:'/data-cen/dataManage/updata',query:{'id':scope.row.dataId,'type':'check'}}">查看</router-link>
                                <!-- <router-link :to="{path:'/data-cen/dataManage/dataEdit',query:{'id':scope.row.dataId,'type':'check'}}">查看</router-link> -->
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paginationDiv2">
                <span style="font-size:14px;float:left;height:40px;line-height:40px">
                    共<span style="color:#33B0B5">{{tableData.totalCount}}</span>条数据，当前页显示 <span style="color:#33B0B5">{{tableData.list.length}}</span> 条数据
                </span>
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="tableData.currPage"
					:page-size="tableData.pageSize"
					layout="prev, pager, next, jumper"
					:total="tableData.totalCount">
				</el-pagination>
			</div>
        </div>
        <removeComponent :visible.sync="isBoxShow" :msg="removeMsg" @changeShow="changeShow"></removeComponent>
    </div>
</template>

<script>
import axios from '../../../request/http'; // 导入http中创建的axios实例
import base from '../../../request/base'; // 导入接口域名列表
import removeComponent from '../component/remove.vue' // 将子组件引入父组件中
export default {
    data() {
        return {
        queryCondition:[
            {beiyong:[],dataKey:'80',dataValue:''}, // 界面相类型
            {beiyong:[],dataKey:'7',dataValue:''}, // 界面相掺杂元素
            {beiyong:[],dataKey:'30',dataValue:''}, // 界面相材料密度 （g/cm
            {beiyong:[],dataKey:'39',dataValue:''}, // 界面相材料杨氏模量 Ev(GPa)
            {beiyong:[],dataKey:'79',dataValue:''}, // 复合材料合成方法
            {beiyong:[],dataKey:'12',dataValue:''}, // 复合材料类型
            {beiyong:[],dataKey:'74',dataValue:''}, // 热膨胀系数 （10
            {beiyong:[],dataKey:'99',dataValue:''}, // 弯曲强度 （MPa)
        ],
        quanxian:localStorage.getItem('menuIdList'),
        isBoxShow:false,
        removeMsg:[],
		currentPage: 1,
        formInline:{
            beginNum:'',
            endNum:'',
            dataContail:'',
            param30:[],
            param39:[],
            param74:[],
            param99:[],
            param79:'',
            param13:'',
            param2:'',
            param7:'',
            param12:'',
            param80:'',
            page:'',
            limit:'',
        },
        tableData:{
            totalCount:0,
			pageSize:10,
			totalPage:0,
			currPage:1,
            list:[]
        },
        dataClassifyObj:[], // 数据分类
        dataTypeObj:[], // 数据类型
        dataSourceObj:[], // 数据来源
        dataKeyObj:[], // 关键词
        dataClassifyArr:{},
        dataTypeArr:{},
        dataSourceArr:{},
        nowCheckedArr:[], // 当前选中
        deleteMultiple:false, // 批量删除
        removeId:''
        }
    },
    components: {
        removeComponent:removeComponent
    },
    created(){
        this.getSelectObj()
        this.getListdata()
    },
    methods:{
        dataClassChange(e){
            this.dataSel(e)
        },
        // 查询关键字
        dataSel(data1){
            this.$api.getKeyword({paramType:data1}).then(res=>{
                console.log(res)
                this.dataKeyObj = res.data.data
                // this.keywordArr = res.data.data
            })
        },
        // 增加查询条件
        addSearch(){
            if(this.queryCondition.length<5){
                this.queryCondition = [
                    ...this.queryCondition,
                    {andOr:'And',dataClass:'',dataKey:'',dataValue:''}
                ]
            }
        },
        reset(){
            this.formInline={
                beginNum:'',
                endNum:'',
                dataContail:'',
                param30:[],
                param39:[],
                param74:[],
                param99:[],
                param79:'',
                param13:'',
                param2:'',
                param7:'',
                param12:'',
                param80:'',
                page:'',
                limit:'',
            }
            this.getListdata()
        },
        onDown(){
            if(this.nowCheckedArr.length==0){
                this.$message({
                    message: '请至少勾选一条数据',
                    type: 'warning'
                });
                return
            }else{
                let parmas = this.nowCheckedArr.map(x=>{return x.dataId})
                // this.$api.onFile(parmas).then(res=>{
                //     // let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});  // res就是接口返回的文件流了
                //     // let objectUrl = URL.createObjectURL(blob); 
                //     // window.location.href = objectUrl; 
                //     const link = document.createElement('a')
                //     const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
                //     link.style.display = 'none'
                //     link.href = URL.createObjectURL(blob)
                //     link.setAttribute('download', name+'.xlsx')
                //     document.body.appendChild(link)
                //     link.click()
                //     document.body.removeChild(link)
                // })
                axios.post(`${base.sq}/sys/sysData/export`,parmas,{responseType: 'blob'}).then(res=>{
                    const link = document.createElement('a')
                    const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
                    link.style.display = 'none'
                    link.href = URL.createObjectURL(blob)
                    console.log(name)
                    console.log('asdasdasdasd')
                    link.setAttribute('download', 'data.xls')
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })
            }
        },
        downModel(){
            window.location.href = base.downDemo; 
        },
        getSelectObj(){
            this.$api.dataTypelist().then(res=>{ // 数据类型
                this.dataTypeObj = res.data.data
                this.dataTypeObj.map(x=>{
                    Object.assign(this.dataTypeArr,{[x.id]: x.paramValue})
                })
            })
            this.$api.dataClassify().then(res=>{ // 数据分类
                this.dataClassifyObj = res.data.data
                this.dataClassifyObj.map(x=>{
                    Object.assign(this.dataClassifyArr,{[x.id]: x.paramValue})
                })

            })
            this.$api.getDataSource().then(res=>{ // 数据来源
                this.dataSourceObj = res.data.data
                let _dataSourceArr = {}
                this.dataSourceObj.map(x=>{
                    Object.assign(_dataSourceArr,{[x.id]: x.paramValue})
                })
                this.dataSourceArr = _dataSourceArr
            })
            
        },
        getListdata(judeg){
            if(judeg){
                this.tableData.currPage = 1
            }
            console.log(this.formInline.beginNum == false)
            if(!this.formInline.beginNum){
                this.formInline.beginNum = this.formInline.endNum
            }
            if(!this.formInline.endNum){
                this.formInline.endNum = this.formInline.beginNum
            }
            // typeof(this.formInline.param30)=='string'?.this.formInline.param30 = this.formInline.param30.split(','):this.formInline.param30
            // typeof(this.formInline.param39)=='string'?.this.formInline.param39 = this.formInline.param39.split(','):this.formInline.param39
            // typeof(this.formInline.param74)=='string'?.this.formInline.param74 = this.formInline.param74.split(','):this.formInline.param74
            // typeof(this.formInline.param99)=='string'?.this.formInline.param99 = this.formInline.param99.split(','):this.formInline.param99
            
            let params = Object.assign({}, this.formInline);
            params.page=this.tableData.currPage;
            params.limit = this.tableData.pageSize;
            // params.param30 = params.param30.filter(x=>x.trim())
            // params.param39 = params.param30.filter(x=>x.trim())
            // params.param74 = params.param30.filter(x=>x.trim())
            // params.param99 = params.param30.filter(x=>x.trim())
            let verOff = true
            for(let i=0;i<params.param30.length;i++){
                if(params.param30[0]>params.param30[1]){
                    this.$message({
                        message: '最小值不能大于最大值',
                        type: 'warning'
                    });
                    verOff = false
                }
                if(params.param30[i]==''){
                    params.param30 = []
                }
            }
            for(let i=0;i<params.param39.length;i++){
                if(params.param39[0]>params.param39[1]){
                    this.$message({
                        message: '最小值不能大于最大值',
                        type: 'warning'
                    });
                    verOff = false
                }
                if(params.param39[i]==''){
                    params.param39 = []
                }
            }
            for(let i=0;i<params.param74.length;i++){
                if(params.param74[0]>params.param74[1]){
                    this.$message({
                        message: '最小值不能大于最大值',
                        type: 'warning'
                    });
                    verOff = false
                }
                if(params.param74[i]==''){
                    params.param74 = []
                }
            }
            for(let i=0;i<params.param99.length;i++){
                if(params.param99[0]>params.param99[1]){
                    this.$message({
                        message: '最小值不能大于最大值',
                        type: 'warning'
                    });
                    verOff = false
                }
                if(params.param99[i]==''){
                    params.param99 = []
                }
            }
            if(!verOff){
                return false
            }
            console.log(params)
            if(params.param30.length!=2&&params.param30.length>0){
                this.$message({
                    message: '范围查询时两个数为必填项',
                    type: 'warning'
                });
                return false;
            }else if(params.param39.length!=2&&params.param39.length>0){
                this.$message({
                    message: '范围查询时两个数为必填项',
                    type: 'warning'
                });
                return false;
            }else if(params.param74.length!=2&&params.param74.length>0){
                this.$message({
                    message: '范围查询时两个数为必填项',
                    type: 'warning'
                });
                return false;
            }else if(params.param99.length!=2&&params.param99.length>0){
                this.$message({
                    message: '范围查询时两个数为必填项',
                    type: 'warning'
                });
                return false;
            }
            params.param30 = params.param30.join('-')
            params.param39 = params.param39.join('-')
            params.param74 = params.param74.join('-')
            params.param99 = params.param99.join('-')
             Object.keys(params).forEach(x=>{
                if(!params[x]){
                    delete params[x]
                }
            })
            this.$api.dataManage(params).then(res=>{
                if(res.data.code==0){
                    this.tableData = res.data.page
                    // let dataList = this.tableData.list 
                    // for(var i=0;i<dataList.length;i++){
                    //     // 将字符串转为数组 后面五个关键词的数组
                    //     if(dataList[i].params){
                    //     let dataKeyArr = dataList[i].params.split('~')
                    //     }
                    //     this.tableData.list[i].params = {}
                    //     for(let r=0;r<dataKeyArr.length;r++){
                    //         Object.assign(this.tableData.list[i].params,{
                    //             [dataKeyArr[r].split('-')[0]]:dataKeyArr[r].split('-')[1]
                    //         });
                    //     }
                    // }
                    console.log(this.tableData.list)
                }
            })
        },
        updata(){ 
            this.$router.push({path:'/data-cen/dataManage/updata',params:{id:'',type:'add'}})
        }, 
        changeShow(val){
            this.isBoxShow = val;
        },
        delect(val){
            if(val==''&&this.nowCheckedArr.length==0){
                this.$message({
                    message: '请勾选需要删除的数据',
                    type: 'warning'
                });
                return
            }else{
                this.isBoxShow = true
            }
            if(val==''&&this.nowCheckedArr.length>0){
                this.removeMsg=[]
                this.deleteMultiple = true
                this.isBoxShow = true
            }else if (val){
                this.removeMsg=['是否确定删除数据','数据删除后，不可恢复']
                this.removeId = [val]
                this.deleteMultiple = false
                this.isBoxShow = true
            }
        },
        removeDataOk(){
            let parmas
            if(this.deleteMultiple){
                parmas = this.nowCheckedArr.map(x=>{return x.dataId})
            }else{
                parmas = this.removeId
            }
            this.$api.deleteData(parmas).then(res=>{ // 数据类型
                this.dataTypeObj = res.data.data
                if(res.data.code==0){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getListdata()
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }
            })
        },
        handleSelectionChange(val){
            this.nowCheckedArr = val
        },
        handleCurrentChange(val) {
            this.formInline.dataContail=''
            this.formInline.dataSource=''
            this.getListdata()
            console.log(`当前页: ${val}`);
        },
    }
}
</script>
<style lang="less">
    .tableBox{
        .el-button--text:focus, .el-button--text:hover{
            border-color: rgba(0,0,0,.0)!important;
        }
    }
    .paginationDiv2{
        margin-top: 24px;
		.el-pagination{
            text-align: right
			/* display: inline-block; */
		}
		.btn-prev{
			height: 35px;
			width: 37px;
			border:1px solid rgba(51,176,181,1);
			text-align: center;
			line-height: 35px;
			padding: 0!important;
			border-radius: 3px;
		}
		.number, .btn-next, .el-pager li.btn-quicknext,.el-pagination__editor{
			color: #666;
			height: 35px;
			width: 37px;
			border:1px solid rgba(51,176,181,1)!important;
			text-align: center;
			line-height: 35px;
			padding: 0!important;
			border-radius: 3px;
			margin:0 3px;
		}
		.active{
			background: #33B0B5;
			color: #fff!important;
		}
		.el-pagination__jump{
			height: 35px!important;
			color: #666;
			line-height: 35px!important;
		}
		.btn-next {
			margin-left: 5px!important;
		}
		.el-pagination__editor{
			width: 53px!important;
		}
		.el-pagination__editor .el-input__inner{
			outline:none!important;
			border: none!important;
			color: #666!important;
		}
		.el-icon{
			color: #666
		}
		.el-pager li.btn-quicknext{
		}
	}
    .tableBox{
        
        margin-top: 20px
    }
    .buttonRow .el-button{
        border-color:#33B0B5;
        color: #33B0B5;
        font-size: 16px
    }
    .tableHeader{
        height: 70px;
        line-height:70px;
    }
    .dataManage .tableHeader th{
        padding: 0!important;
        background: #E2FCF9!important;
        font-size: 14px!important;
        color: #4D4D4D!important;
        text-align: center!important
    }
</style>

<style scoped>
    .formLabel{
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #333;
        width: 100%;
        text-align: right

    }
    .caozuoBox{
        text-align: center;
    }
    .caozuoBox button{
        text-decoration: underline
    }
    .caozuoBox a{
        text-decoration: none;
        color: inherit
    }
    .buttonRow i{
        color: #33B0B5
    }
    .buttonRow{
        text-align: right;
        color: #33B0B5
    }
    .haederBox{
        margin-top: 40px;
    }
</style>
