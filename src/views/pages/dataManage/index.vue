<template>
    <div class="wrap">
        <div class="haederBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="right" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="数据编号">
                            <el-input v-model="formInline.dataNumber" style="width:280px" placeholder="例如：0002，0003-0023，0027"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="界面相成分">
                            <el-select v-model="formInline.chenfen" style="width:200px" placeholder="请选择界面相成分">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据分类">
                            <el-select v-model="formInline.chenfen" style="width:300px" placeholder="请选择数据分类">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>  
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据来源">
                            <el-select v-model="formInline.chenfen" placeholder="请选择数据来源">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据类型">
                            <el-select v-model="formInline.chenfen" placeholder="请选择数据类型">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="buttonRow">
            <el-button> <i class="iconfont iconshangchuan"></i> 上传文件</el-button>
            <el-button @click="delect('')"> <i class="iconfont iconshanchu"></i> 批量删除</el-button>
            <el-button> <i class="iconfont iconxiazai"></i> 批量下载</el-button>
        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" header-row-class-name="tableHeader" :data="tableData" tooltip-effect="dark" style="width: 100%" 
                @selection-change="handleSelectionChange" border row-class-name="tableTr">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="dataNumber" label="数据编号" width="190"></el-table-column>
                <el-table-column prop="chenfen" label="界面相成分" width="190"></el-table-column>
                <el-table-column prop="dataClass" label="数据分类" width="320"></el-table-column>
                <el-table-column prop="dataFrom" label="数据来源" width="130"></el-table-column>
                <el-table-column prop="dataType" label="数据类型" width="106"></el-table-column>
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
                    共<span style="color:#33B0B5">18</span>条数据，当前页显示 <span style="color:#33B0B5">10</span> 条树
                </span>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="100"
					layout="prev, pager, next, jumper"
					:total="1000">
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
            dataNumber:'',
            chenfen:'',
            dataClass:'',
            dataFrom:'',
            dataType:''
        },
        tableData:[
            {
                dataNumber:'12',
                chenfen:'123',
                dataClass:'qwe',
                dataFrom:'qwe',
                dataType:'qwe'
            }
        ],
        }
    },
    components: {
        removeComponent:removeComponent
    },
    created(){

    },
    methods:{
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
        onSubmit(){},
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
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
