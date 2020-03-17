<template>
    <div class="wrap">
        <div class="haederBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="right" label-width="90px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <el-input v-model="formInline.name" style="width:200px" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="单位">
                            <el-input v-model="formInline.company" style="width:200px" placeholder="请输入单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="部门">
                            <el-input v-model="formInline.department" style="width:200px" placeholder="请输入部门"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="是否可用">
                            <el-select clearable v-model ="formInline.status" style="width:200px" placeholder="请选择是否可用">
                                <el-option label="禁用" value="0"></el-option>
                                <el-option label="正常" value="1"></el-option>
                            </el-select>   
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="角色名称">
                            <el-select clearable v-model ="formInline.roleIdArray" style="width:200px" placeholder="请选择角色名称">
                                <el-option v-for="item in userRole" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="权限">
                            <el-select clearable v-model ="formInline.menu" multiple style="width:500px" placeholder="请选择权限">
                                <el-option v-for="item in selectMenu" :key="item.menuId" :label="item.name" :value="item.menuId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" style="text-align:right">
                        <el-form-item>
                            <el-button type="primary" @click="getListData()">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="buttonRow">
            <el-button @click="removeData('')"> <i class="iconfont iconshanchu"></i> 批量删除</el-button>
            <el-button @click="onDown()"> <i class="iconfont iconxiazai"></i> 批量下载</el-button>
        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" header-row-class-name="tableHeader" :data="tableData.list" tooltip-effect="dark" style="width: 100%" 
                @selection-change="handleSelectionChange" border row-class-name="tableTr">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="username" sortable label="用户名" width="100"></el-table-column>
                <el-table-column prop="name" sortable label="姓名" width="77"></el-table-column>
                <el-table-column prop="company" label="单位" width="153"></el-table-column>
                <el-table-column prop="department" label="部门" width="84"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="177"></el-table-column>
                <el-table-column prop="role" label="用户类型" width="111">
                    <!-- <template slot-scope="scope">
                        <span v-for="item in scope.row.role" :key="item.roleId">{{userRoleArr[item]}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="menu" label="权限" width="187">
                    <!-- <template slot-scope="scope">
                        <span v-for="item in scope.row.menu" :key="item.menuId">{{userRoleArr[item]}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column label="是否可用" width="153">
                    <template slot-scope="scope">
                        <el-switch
                            @change="statusChange(scope.row,$event)"
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div style="text-align:center">
                            <el-button type="text" @click="editUser(scope.row.userId)" style="color:#33B0B5;text-decoration: underline">修改</el-button>
                            <el-button type="text" @click="removeData(scope.row.userId)" style="color:#EF992A;text-decoration: underline">删除</el-button>
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
        <el-dialog class="editDataBox" :visible.sync="editData" width="660px" :before-close="handleClose" :show-close='false'>
            <el-form ref="editDataForm" :model="editDataForm" label-width="100px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editDataForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editDataForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="company">
                    <el-input v-model="editDataForm.company" placeholder="请输入单位"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="department">
                    <el-input v-model="editDataForm.department" placeholder="请输入部门"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editDataForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="roleIdList">
                    <el-select  v-model="editDataForm.roleIdList" multiple style="width:420px" placeholder="请选择数据类型">
                        <el-option v-for="(item,index) in userRole" :key="index" :label="item.roleName" :value="item.roleId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限" prop="menuIdList">
                    <el-select  v-model="editDataForm.menuIdList" multiple style="width:420px" placeholder="请选择数据类型">
                        <el-option v-for="item in selectMenu" :key="item.menuId" :label="item.name" :value="item.menuId"></el-option>
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
                userId:'',
                username:'',
                name:'',
                company:'',
                department:'',
                email:'',
                roleIdList:[],
                menuIdList:[]
            },
            editData:false,
            currentPage: 1,
            formInline:{
                name:'',
                company:'',
                department:'',
                status:'',
                roleIdArray:[],
                menu:[],
            },
            rules: {
                roleIdList: [
                    { type:'array', required: true, message: '请选择用户类型', trigger: 'blur', }
                ],
                menuIdList: [
                    { type:'array', required: true, message: '请选择权限', trigger: 'blur', }
                ],
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                company: [
                    { required: true, message: '请输入单位', trigger: 'blur' },
                ],
                department: [
                    { required: true, message: '请输入部门', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
            },
            tableData:{
                totalCount:0,
                pageSize:10,
                totalPage:0,
                currPage:1,
                list:[]
            },
            selectMenu:[],
            userRole:[],
            userInfo:{},
            selectMenuArr:[],
            userRoleArr:[],
            nowCheckedArr:[]
        }
    },
    created(){
        this.getListData()
        this.getArrObj()
    },
    methods:{
        onDown(){
            if(this.nowCheckedArr.length==0){
                this.$message({
                    message: '请勾选需要下载的数据',
                    type: 'warning'
                });
                return
            }
            this.$api.onDown('').then(res=>{
                console.log(res)
            })
        },
        editUser(id){
            this.editData=true
            this.$api.getUserInfo(id).then(res=>{
                this.editDataForm.userId = res.data.user.userId
                this.editDataForm.username = res.data.user.username
                this.editDataForm.name = res.data.user.name
                this.editDataForm.company = res.data.user.company
                this.editDataForm.department = res.data.user.department
                this.editDataForm.email = res.data.user.email
                this.editDataForm.roleIdList = res.data.user.roleIdList
                this.editDataForm.menuIdList = res.data.user.menuIdList
            })
        },
        getArrObj(){
            this.$api.getUserSelectMenu().then(res=>{ // 权限
                this.selectMenu = res.data.data
                this.selectMenu.map(x=>{
                    Object.assign(this.selectMenuArr,{[x.menuId]: x.name})
                })
            })
            this.$api.getUserRole().then(res=>{ // 用户类型
                this.userRole = res.data.data
                this.userRole.map(x=>{
                    Object.assign(this.userRoleArr,{[x.roleId]: x.roleName})
                })
            })
        },
        getListData(){
            var parmas = {
                page:this.tableData.currPage,
                limit:this.tableData.pageSize,
                name:this.formInline.name,
                company:this.formInline.company,
                department:this.formInline.department,
                status:this.formInline.status,
                roleIdArray:this.formInline.roleIdArray.toString()?'['+this.formInline.roleIdArray.toString()+']':'',
                menuIdArray:this.formInline.menu.toString()?'['+this.formInline.menu.toString()+']':''
            }
            this.$api.getUserList(parmas).then(res=>{
                    this.tableData = res.data.page
                    for(var i=0;i<this.tableData.list.length;i++){
                        if(this.tableData.list[i].status != 0){
                            this.tableData.list[i].status = true
                        }else{
                            this.tableData.list[i].status = false
                        }
                    }
                    console.log(this.tableData)
                    console.log(res.data)

                })
        },
        statusChange(data,value){
            console.log(data)
            let pranam = {}
            pranam.userId = data.userId,
            pranam.username = data.username,
            pranam.name = data.name,
            pranam.company = data.company,
            pranam.department = data.department,
            pranam.email = data.email,
            pranam.roleIdList = data.role,
            pranam.menuIdList = data.menu,
            pranam.status = value?1:0
            this.$api.editUser(pranam).then(res=>{
                if(res.data.msg==='success'){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getListData()
                }
            })
        },
        handleSelectionChange(val){
            this.nowCheckedArr = val
        },
        onSubmit(){},
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.getListdata()
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
                    this.$api.editUser(this.editDataForm).then(res=>{
                        if(res.data.msg==='success'){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.getListData()
                        }
                        // this.selectMenu = res.data.data
                    })
                    this.editData = false
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        removeData(data){
            if(data==''&&this.nowCheckedArr.length==0){
                this.$message({
                    message: '请勾选需要删除的数据',
                    type: 'warning'
                });
                return
            }
            if(data==''&&this.nowCheckedArr.length>0){
                this.isBoxShow = true;
                return
            }
            this.$api.deleteUser([data]).then(res=>{
                if(res.data.msg==='success'){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getListData()
                }
            })
        },
        removeDataOk(){
            let parmas = this.nowCheckedArr.map(x=>{return x.userId})
            this.$api.deleteUser(parmas).then(res=>{
                if(res.data.msg==='success'){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getListData()
                }
            })
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
