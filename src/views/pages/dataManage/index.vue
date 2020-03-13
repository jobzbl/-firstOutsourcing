<template>
    <div class="wrap">
        <div class="haederBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="right" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="数据编号">
                            <el-input v-model="formInline.dataNum" style="width:280px" placeholder="例如：0002，0003-0023，0027"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="界面相成分">
                            <el-input v-model="formInline.dataContail" style="width:280px" placeholder="例如：0002，0003-0023，0027"></el-input>
                            <!-- <el-select v-model="formInline.dataContail" style="width:200px" placeholder="请选择界面相成分">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据分类">
                            <el-select v-model="formInline.classification" style="width:300px" placeholder="请选择数据分类">
                                <el-option v-for="item in dataClassifyObj" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>  
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据来源">
                            <el-select v-model="formInline.dataSource" placeholder="请选择数据来源">
                                <el-option v-for="item in dataSourceObj" :key="item.structureId" :label="item.stKey" :value="item.structureId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据类型">
                            <el-select v-model="formInline.dataType" placeholder="请选择数据类型">
                                <el-option v-for="item in dataTypeObj" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                        <el-form-item>
                            <el-button type="primary" @click="getListdata()">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="buttonRow">
            <el-button @click="updata()"> <i class="iconfont iconshangchuan"></i> 上传文件</el-button>
            <el-button @click="delect('')"> <i class="iconfont iconshanchu"></i> 批量删除</el-button>
            <el-button> <i class="iconfont iconxiazai"></i> 批量下载</el-button>
        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" header-row-class-name="tableHeader" :data="tableData.list" tooltip-effect="dark" style="width: 100%" 
                @selection-change="handleSelectionChange" border row-class-name="tableTr">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="dataNum" label="数据编号" width="190"></el-table-column>
                <el-table-column prop="dataContail" label="界面相成分" width="190"></el-table-column>
                <el-table-column prop="classificationName" label="数据分类" width="320"></el-table-column>
                <el-table-column label="数据来源" width="130">
                    <template slot-scope="scope">
                        {{dataSourceArr[scope.row.dataSource]}}
                    </template>
                </el-table-column>
                <el-table-column prop="typeName" label="数据类型" width="106"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div class="caozuoBox" style="text-align:center">
                            <el-button type="text" style="color:#33B0B5;">
                                <router-link :to="{path:'/data-cen/dataManage/dataEdit',query:{id:scope.row.dataNumber}}">编辑</router-link>
                            </el-button>
                            <el-button @click="delect(scope.row.dataNumber)" type="text" style="color:#EF992A;">
                                删除
                            </el-button>
                            <el-button type="text" style="color:#248AD1;">
                                查看
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paginationDiv2">
                <span style="font-size:14px;float:left;height:40px;line-height:40px">
                    共<span style="color:#33B0B5">{{tableData.totalPage}}</span>条数据，当前页显示 <span style="color:#33B0B5">{{tableData.pageSize}}</span> 条树
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
        <removeComponent :visible.sync="isBoxShow" :data="isBoxData" @changeShow="changeShow"></removeComponent>
    </div>
</template>

<script>
import removeComponent from '../component/remove.vue' // 将子组件引入父组件中
export default {
    data() {
        return {
        isBoxShow:false,
        isBoxData:'',
		currentPage: 1,
        formInline:{
            dataNum:'',
            dataContail:'',
            classification:'',
            dataSource:'',
            dataType:''
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
        dataClassifyArr:{},
        dataTypeArr:{},
        dataSourceArr:{}
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
        getSelectObj(){
            this.$api.dataTypelist().then(res=>{ // 数据类型
                this.dataTypeObj = res.data.data
                this.dataTypeObj.map(x=>{
                    Object.assign(this.dataTypeArr,{[x.id]: x.paramValue})
                })
                console.log(this.dataTypeArr)
            })
            this.$api.dataClassify().then(res=>{ // 数据分类
                this.dataClassifyObj = res.data.data
                this.dataClassifyObj.map(x=>{
                    Object.assign(this.dataClassifyArr,{[x.id]: x.paramValue})
                })
                console.log(this.dataClassifyArr)

            })
            this.$api.getDataSource().then(res=>{ // 数据来源
                this.dataSourceObj = res.data.data
                this.dataSourceObj.map(x=>{
                    Object.assign(this.dataSourceArr,{[x.structureId]: x.stKey})
                })
                
                console.log(this.dataSourceArr)
            })
            
        },
        getListdata(){
            this.$api.dataManage({
                page:this.tableData.currPage,
                limit:this.tableData.pageSize,
                // dataNum:this.formInline.dataNum,
                // dataContail:this.formInline.dataContail,
                // classification:this.formInline.classification,
                // dataSource:this.formInline.dataSource,
                // dataType:this.formInline.dataType,
                }).then(res=>{
                this.tableData = res.data.page
                console.log(res)
            })
        },
        updata(){
            this.$router.push({path:'/data-cen/dataManage/updata'})
        },
        changeShow(val){
            this.isBoxShow = val;
            console.log(val)
        },
        delect(val){
            this.isBoxShow = true;
            this.isBoxData = val;
        },
        removeDataOk(){
            console.log('已删除')
        },
        handleSelectionChange(){},
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.getListdata()
        console.log(`当前页: ${val}`);
        },
    }
}
</script>
<style lang="less">
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
