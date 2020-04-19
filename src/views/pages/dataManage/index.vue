<template>
    <div class="wrap">
        <div class="haederBox" v-if="quanxian.indexOf(1)!=-1">
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-row :gutter="20">
                        <el-col :span="6"><div class="formLabel">数据编号</div></el-col>
                        <el-col :span="18">
                            <el-input v-model="formInline.beginNum" style="width:100px" placeholder="最小值"></el-input>
                            -
                            <el-input v-model="formInline.endNum" style="width:100px" placeholder="最大值"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="7">
                    <el-row :gutter="20">
                        <el-col :span="8"><div class="formLabel">界面主相成分</div></el-col>
                        <el-col :span="16">
                            <!-- dataClassifyObj 为数据分类的数据 -->
                            <!-- dataTypeObj 数据类型 -->
                            <el-select clearable v-model ="formInline.dataContail" style="width:100%" placeholder="请选择界面主相成分">
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
                <el-col :span="10">
                    <el-row :gutter="20">
                        <el-col :span="5"><div class="formLabel">数据来源</div></el-col>
                        <el-col :span="18">
                            <el-select clearable v-model ="formInline.dataSource" style="width:100%" placeholder="请选择数据来源">
                                <el-option v-for="item in dataSourceObj" :key="item.structureId" :label="item.paramValue" :value="item.structureId"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-for="(item,index) in queryCondition" :key='index' style="margin-top:20px">
                <el-col :span="2">
                    <el-select v-model="item.andOr" style="width:100%" placeholder="请选择界面主相成分">
                        <el-option label="And" value="And"></el-option>
                        <el-option label="Or" :disabled="true" value="Or"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-select @change="dataClassChange($event)" clearable v-model="item.dataClass" style="width:100%" placeholder="请选择数据分类">
                        <el-option v-for="item in dataClassifyObj" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-select clearable v-model ="item.dataKey" style="width:100%" placeholder="请选择关键词">
                        <el-option v-for="item in dataKeyObj" :key="item.structureId" :label="item.stKey" :value="item.structureId"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="item.dataValue" style="width:100%" placeholder="请输入搜索条件"></el-input>
                </el-col>
            </el-row>
            <div class="buttonRow" style="margin:20px 0;">
                <el-button @click="addSearch()"><i class="iconfont iconjiahao"></i>查询条件</el-button>
                <el-button @click="reset()">重置</el-button>
                <el-button type="primary" @click="getListdata(true)">查询</el-button>
            </div>
        </div>
        <div class="buttonRow">
            <el-button v-if="quanxian.indexOf(2)!=-1" @click="updata()"> <i class="iconfont iconshangchuan"></i> 上传数据</el-button>
            <el-button v-if="quanxian.indexOf(4)!=-1" @click="delect('')"> <i class="iconfont iconshanchu"></i> 批量删除</el-button>
            <el-button @click="onDown()"> <i class="iconfont iconxiazai"></i> 批量下载</el-button>
        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" header-row-class-name="tableHeader" :data="tableData.list" tooltip-effect="dark" style="width: 100%" 
                @selection-change="handleSelectionChange" border row-class-name="tableTr">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="dataNum" label="数据编号" width="100"></el-table-column>
                <el-table-column prop="dataContail" label="界面相主成分" width="130">
                    <!-- <template slot-scope="scope">
                        <span v-for="(item,index) in scope.row.dataElement" :key='index'>{{item}}<sub style="font-size:10px">{{scope.row.dataContent[index]>1?scope.row.dataContent[index]:''}}</sub>
                        </span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="params.30" label="界面相材料密度（g/cm3）" width="140"></el-table-column>
                <el-table-column prop="params.39" label="杨氏模量EV" width="130"></el-table-column>
                <el-table-column prop="params.74" label="热膨胀系数" width="140"></el-table-column>
                <!-- <el-table-column prop="classificationName" label="数据分类" width="320"></el-table-column> -->
                <el-table-column prop="params.74" label="复合材料合成方法" width="110">    </el-table-column>
                <el-table-column prop="params.74" label="基体成分" width="90">    </el-table-column>
                <el-table-column prop="params.2" label="数据来源" width="106">
                    <template slot-scope="scope">
                        <span>
                            {{dataSourceArr[scope.row.params[2]]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div class="caozuoBox" style="text-align:center">
                            <el-button v-if="quanxian.indexOf(3)!=-1" type="text" style="color:#33B0B5;">
                                <router-link :to="{path:'/data-cen/dataManage/dataEdit',query:{'id':scope.row.dataId,'type':'edit'}}">编辑</router-link>
                            </el-button>
                            <el-button  v-if="quanxian.indexOf(4)!=-1" @click="delect(scope.row.dataId)" type="text" style="color:#EF992A;">
                                删除
                            </el-button>
                            <el-button v-if="quanxian.indexOf(1)!=-1" type="text" style="color:#248AD1;">
                                <router-link :to="{path:'/data-cen/dataManage/dataEdit',query:{'id':scope.row.dataId,'type':'check'}}">查看</router-link>
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
import removeComponent from '../component/remove.vue' // 将子组件引入父组件中
export default {
    data() {
        return {
        queryCondition:[
            {andOr:'And',dataClass:'',dataKey:'',dataValue:''}
        ],
        quanxian:localStorage.getItem('menuIdList'),
        isBoxShow:false,
        removeMsg:[],
		currentPage: 1,
        formInline:{
            beginNum:'',
            endNum:'',
            dataContail:'',
            dataSource:'',
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
            this.queryCondition = [
                {andOr:'And',dataClass:'',dataKey:'',dataValue:''}
            ]
            this.formInline={
                beginNum:'',
                endNum:'',
                dataContail:'',
                dataSource:'',
                dataType:''
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
                this.$api.onFile(parmas).then(res=>{
                    let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});  // res就是接口返回的文件流了
                    let objectUrl = URL.createObjectURL(blob); 
                    window.location.href = objectUrl; 
                })
            }
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
            let params = []
            this.queryCondition.map(x=>{
                console.log(x)
                if(x.dataKey&&x.dataValue){
                    params.push({
                        dataKey:x.dataKey,
                        dataValue:x.dataValue
                    })
                }
            })
            
            let paramsAll = {
                page:this.tableData.currPage,
                limit:this.tableData.pageSize,
                beginNum:this.formInline.beginNum,
                endNum:this.formInline.endNum,
                dataContail:this.formInline.dataContail,
                dataSource:this.formInline.dataSource,
                params:params.length?JSON.stringify(params):'',
            }
            Object.keys(paramsAll).forEach(x=>{
                if(!paramsAll[x]){
                    delete paramsAll[x]
                }
            })
            this.$api.dataManage(paramsAll).then(res=>{
                    this.tableData = res.data.page
                    let dataList = this.tableData.list 
                    for(var i=0;i<dataList.length;i++){
                        // 将字符串转为数组 后面五个关键词的数组
                        let dataKeyArr = dataList[i].params.split('~')
                        this.tableData.list[i].params = {}
                        for(let r=0;r<dataKeyArr.length;r++){
                            Object.assign(this.tableData.list[i].params,{
                                [dataKeyArr[r].split('-')[0]]:dataKeyArr[r].split('-')[1]
                            });
                        }
                    }
                    console.log(this.tableData.list)
                })
        },
        updata(){
            this.$router.push({path:'/data-cen/dataManage/updata'})
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
    .tableHeader th{
        padding: 0!important;
        background: #E2FCF9!important;
        font-size: 16px!important;
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
