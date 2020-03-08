<template>
    <div class="wrap">
        <div class="haederBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="right" label-width="90px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <el-input v-model="formInline.name" style="width:200px" placeholder="例如：0002，0003-0023，0027"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="单位">
                            <el-select v-model="formInline.danwei" style="width:200px" placeholder="请选择界面相成分">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="部门">
                            <el-select v-model="formInline.bumen" style="width:200px" placeholder="请选择数据分类">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>  
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="是否可用">
                            <el-select v-model="formInline.isUsable" style="width:200px" placeholder="请选择数据来源">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="角色名称">
                            <el-select v-model="formInline.roleName" style="width:200px" placeholder="请选择数据类型">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="权限">
                            <el-select v-model="formInline.quanxian" multiple style="width:500px" placeholder="请选择数据类型">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="text-align:right">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="buttonRow">
            <el-button> <i class="iconfont iconshanchu"></i> 批量删除</el-button>
            <el-button> <i class="iconfont iconxiazai"></i> 批量下载</el-button>
        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" header-row-class-name="tableHeader" :data="tableData" tooltip-effect="dark" style="width: 100%" 
                @selection-change="handleSelectionChange" border row-class-name="tableTr">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="userCode" sortable label="用户名" width="100"></el-table-column>
                <el-table-column prop="name" sortable label="姓名" width="77"></el-table-column>
                <el-table-column prop="danwei" label="单位" width="153"></el-table-column>
                <el-table-column prop="bumen" label="部门" width="84"></el-table-column>
                <el-table-column prop="emial" label="邮箱" width="177"></el-table-column>
                <el-table-column prop="userType" label="用户类型" width="111"></el-table-column>
                <el-table-column prop="quanxian" label="权限" width="187"></el-table-column>
                <el-table-column prop="isUsable" label="是否可用" width="153">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.isUsable"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="100"
                            inactive-value="0">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div style="text-align:center">
                            <el-button type="text" @click="editData=true" style="color:#33B0B5;text-decoration: underline">修改</el-button>
                            <el-button type="text" @click="removeData(scope.row.userCode)" style="color:#EF992A;text-decoration: underline">删除</el-button>
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
        <el-dialog class="editDataBox" :visible.sync="editData" width="660px" :before-close="handleClose" :show-close='false'>
            <el-form ref="editDataForm" :model="editDataForm" label-width="100px" :rules="rules">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="editDataForm.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editDataForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="danwei">
                    <el-input v-model="editDataForm.danwei" placeholder="请输入单位"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="bumen">
                    <el-input v-model="editDataForm.bumen" placeholder="请输入部门"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editDataForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="userType">
                    <el-select v-model="formInline.userType" style="width:420px" placeholder="请选择数据类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限" prop="quanxian">
                    <el-select v-model="formInline.quanxian" multiple style="width:420px" placeholder="请选择数据类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <div class="formButtonBox">
                    <el-button @click="close('editDataForm')">取 消</el-button>
                    <el-button type="primary" @click="submitForm('editDataForm')">确 定</el-button>
                </div>
            </el-form>
        </el-dialog>
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
            editDataForm:{
                userName:'',
                name:'',
                danwei:'',
                bumen:'',
                email:'',
                userType:'',
                quanxian:[]
            },
            editData:false,
            currentPage: 1,
            formInline:{
                name:'',
                danwei:'',
                bumen:'',
                isUsable:'',
                roleName:'',
                quanxian:[],
            },
            tableData:[
                {
                    userCode:'job',
                    name:'千万',
                    danwei:'技术部',
                    bumen:'技术',
                    emial:'12312312345@qq.com',
                    userType:'管理员',
                    quanxian:'查询、上传、修改、删除',
                    isUsable:true,
                },
                {
                    userCode:'aob',
                    name:'啊千万',
                    danwei:'技术部',
                    bumen:'技术',
                    emial:'12312312345@qq.com',
                    userType:'管理员',
                    quanxian:'查询、上传、修改、删除',
                    isUsable:true,
                }
            ],
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                danwei: [
                    { required: true, message: '请输入单位', trigger: 'blur' },
                ],
                bumen: [
                    { required: true, message: '请输入部门', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                userType: [
                    { type: 'date', required: true, message: '请选择用户类型', trigger: 'change' }
                ],
                quanxian: [
                    { type: 'date', required: true, message: '请选择权限', trigger: 'change' }
                ],
                
            }
        }
    },
    created(){

    },
    methods:{
        handleSelectionChange(){},
        onSubmit(){},
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        },
        handleClose() {},
        close(formName){
            this.$refs[formName].resetFields();
            this.editData = false
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editData = false
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        removeData(data){
            console.log(data)
            this.isBoxShow = true;
            this.isBoxData = 'data'
        },
        removeDataOk(){
            console.log('已删除')
        },
        changeShow(val){
            this.isBoxShow = val;
            console.log(val)
        },
        
    },
    components: {
        removeComponent:removeComponent
    }
}
</script>
<style lang="less">
    .editDataBox{
        .el-form-item__label{
            font-size: 16px
        }
        .el-dialog__body{
            padding-left:70px;
            padding-right:70px;
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
        border-color:#33B0B5
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
    .tableTr td{
        text-align: center!important
    }

</style>

<style scoped>
    .formButtonBox{
        width: 430px;
        margin: 40px auto;
        display: flex;
        justify-content: space-between;
    }
    .formButtonBox button{
        height: 40px;
        width: 180px;
    }
    .buttonRow i{
        color: #33B0B5
    }
    .buttonRow{
        text-align: right;
    }
    .haederBox{
        margin-top: 40px;
    }
</style>
