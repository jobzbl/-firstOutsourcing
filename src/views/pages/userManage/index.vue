<template>
    <div class="wrap">
        <div class="haederBox">
            <el-form v-if="quanxian.indexOf('1')!='-1'" :inline="true" :model="formInline" class="demo-form-inline" label-position="right" label-width="90px">
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
                            <el-button type="primary" @click="getListData(true)">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="buttonRow">
            <el-button v-if="quanxian.indexOf('4')!='-1'" @click="removeData('')"> <i class="iconfont iconshanchu"></i> 批量删除</el-button>
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
                            :disabled="quanxian.indexOf('3')=='-1'"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div style="text-align:center">
                            <div v-if="quanxian.indexOf('3')=='-1'&&quanxian.indexOf('4')=='-1'">无权限</div>
                            <el-button type="text" v-if="quanxian.indexOf('3')!='-1'" @click="editUser(scope.row.userId)" style="color:#33B0B5;text-decoration: underline">修改</el-button>
                            <el-button type="text" v-if="quanxian.indexOf('4')!='-1'" @click="removeData(scope.row.userId)" style="color:#EF992A;text-decoration: underline">删除</el-button>
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
                    <el-select  v-model="editDataForm.roleIdList" @change="roleChange($event)"  style="width:420px" placeholder="请选择数据类型">
                        <el-option v-for="(item,index) in userRole" :key="index" :label="item.roleName" :value="item.roleId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限" prop="menuIdList">
                    <el-select :disabled='true' v-model="editDataForm.menuIdList" multiple style="width:420px" placeholder="请选择数据类型">
                        <el-option v-for="item in selectMenu" :key="item.menuId" :label="item.name" :value="item.menuId"></el-option>
                    </el-select>
                </el-form-item>
                <div class="formButtonBox">
                    <el-button @click="close('editDataForm')">取 消</el-button>
                    <el-button type="primary" @click="submitForm('editDataForm')">确 定</el-button>
                </div>
            </el-form>
        </el-dialog>
        <removeComponent :visible.sync="isBoxShow" :msg="removeMsg" @changeShow="changeShow"></removeComponent>
    </div>
</template>

<script>
import removeComponent from '../component/remove.vue' // 将子组件引入父组件中
export default {
    data() {
        return {
            removeMsg:[],
            quanxian:localStorage.getItem('menuIdList'),
            isBoxShow:false,
            isBoxData:'',
            editDataForm:{
                userId:'',
                username:'',
                name:'',
                company:'',
                department:'',
                email:'',
                roleIdList:'1',
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
                    { type:'number', required: true, message: '请选择用户类型', trigger: 'blur', }
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
            nowCheckedArr:[],
            deleteMultiple:false, // 批量删除
            removeId:''
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
                    message: '请至少勾选一条数据',
                    type: 'warning'
                });
                return
            }else{
                let parmas = this.nowCheckedArr.map(x=>{return x.userId})
                this.$api.onDown(parmas).then(res=>{
                    let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});  // res就是接口返回的文件流了
                    let objectUrl = URL.createObjectURL(blob); 
                    window.location.href = objectUrl; 
                    // const link = document.createElement('a')
                    // const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
                    // link.style.display = 'none'
                    // link.href = URL.createObjectURL(blob)
                    // link.setAttribute('download', `${name}.xlsx`)
                    // document.body.appendChild(link)
                    // link.click()
                    // document.body.removeChild(link)
                })
            }
            
        },
        roleChange(e){
            if(e==1){
                this.editDataForm.menuIdList = [1,2,3,4]
            }
            if(e==2){
                this.editDataForm.menuIdList = [1,2,3]
            }
            if(e==3){
                this.editDataForm.menuIdList = [1]
            }
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
                this.editDataForm.roleIdList = res.data.user.roleIdList.toString()*1
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
        getListData(judeg){
            if(judeg){
                this.tableData.currPage = 1
            }
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
            pranam.status = value?1:0
            this.$api.editStatus(pranam).then(res=>{
                if(res.data.code==0){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getListData()
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
        onSubmit(){},
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange() {
            this.formInline.name=''
            this.formInline.company=''
            this.formInline.department=''
            this.formInline.status=''
            this.getListData()
        },
        handleClose() {},
        close(formName){
            this.$refs[formName].resetFields();
            this.editData = false
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editDataForm.roleIdList = this.editDataForm.roleIdList.toString()
                    this.editDataForm.roleIdList = this.editDataForm.roleIdList.split('')
                    this.editDataForm.roleIdList[0] = parseInt(this.editDataForm.roleIdList[0])
                    console.log(this.editDataForm)
                    this.$api.editUser(this.editDataForm).then(res=>{
                        if(res.data.code==0){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.getListData()
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
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
        removeData(val){
            
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
                parmas = this.nowCheckedArr.map(x=>{return x.userId})
            }else{
                parmas = this.removeId
            }
            this.$api.deleteUser(parmas).then(res=>{
                if(res.data.code==0){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getListData()
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
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
