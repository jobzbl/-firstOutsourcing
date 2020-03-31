<template>
    <div class="wrap">
        <div style="margin:24px 0;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="elsePage" :to="{ path: '/' }"> <i style="color:#33B0B5" class="iconfont iconiconfontzhizuobiaozhun023101"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item class="nowPage">个人中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-radio-group v-model="tabPosition" class="tabPosition" style="margin-bottom:20px;font-size:16px">
                <el-radio-button label="left">基本信息</el-radio-button>
                <el-radio-button label="right">修改密码</el-radio-button>
            </el-radio-group>
        </div>
        <div class="tabDiv">
            <div v-if="tabPosition=='left'" >
                <el-form :model="details" :rules="detailsRules" ref="detailsRule" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
                        <el-input v-model="details.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
                        <el-input v-model="details.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="company">
                        <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
                        <el-input v-model="details.company"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="department">
                        <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
                        <el-input v-model="details.department"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
                        <el-input v-model="details.email"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="details.tips"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
                        <el-input v-model="details.password" type="password"></el-input>
                    </el-form-item>
                    <div class="okButtonBox">
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
                        <el-button type="primary" @click="submitForm2('detailsRule')">保存</el-button>
                    </div>
                </el-form>
            </div>
            <div v-if="tabPosition=='right'">
                <el-form :model="editPassword" :rules="editPasswordRules" ref="editPassword" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="password">
                        <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
                        <el-input v-model="editPassword.password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
                        <el-input v-model="editPassword.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="newPassword2">
                        <el-input style="position:fixed;bottom:-999999px" type="password"></el-input>
                        <el-input v-model="editPassword.newPassword2"></el-input>
                    </el-form-item>
                    <div class="okButtonBox">
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <div v-if="zhuceSuccess" class="mask"></div>
        <div v-if="zhuceSuccess" class="zhucechenggong">
        <i class="iconfont icondui"></i>
        <div>保存成功！</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            zhuceSuccess:false,
            tabPosition:'left',
            details:{
                username:'',
                name:'',
                company:'',
                department:'',
                email:'',
                password:'',
                tips:'',
            },
            detailsRules:{
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                company:[
                    { required: true, message: '请输入单位', trigger: 'blur' },
                ],
                department:[
                    { required: true, message: '请输入部门', trigger: 'blur' },
                ],
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
            editPasswordRules:{
                password: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                ],
                newPassword:[
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
                newPassword2:[
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                ],
            },
            editPassword:{
                password:'',
                newPassword:'',
                newPassword2:''
            }
        }
    },
    created(){
        this.getUserInfo()
    },
    methods:{
        getUserInfo(){
            this.$api.getNowUserInfo().then(res=>{
                this.details = res.data.user
                this.details.password = ''
            })
        },
        submitForm2(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.editUser(this.details).then(res=>{ // 数据来源
                        if(res.data.code==0){
                            this.zhuceSuccess = true
                            setTimeout(()=>{
                                this.zhuceSuccess = false
                            },2000)
                        }
                        if(res.data.code==-1){
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitForm(){
            this.$refs['editPassword'].validate((valid) => {
                if (valid) {
                    if(this.editPassword.newPassword!=this.editPassword.newPassword2){
                        this.$message({
                            message: '两次密码输入不一致',
                            type: 'warning'
                        });
                        return
                    }
                    this.$api.editPasword({password:this.editPassword.password,newPassword:this.editPassword.newPassword}).then(res=>{ // 数据来源
                        if(res.data.code==0){
                            this.zhuceSuccess = true
                            setTimeout(()=>{
                                this.zhuceSuccess = false
                            },2000)
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }

}
</script>
<style lang="less">
    .tabDiv{
        width:500px; 
        margin:0 auto;
        .el-form-item__label {
            font-size: 16px;
        }
    }
</style>

<style scoped>
    .okButtonBox{
        width:430px;
        margin: 75px auto;
        display: flex;
        justify-content: space-between
    }
    .okButtonBox button{
        width: 180px;
        height: 40px;
        line-height: 40px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .tabPosition{
        border-radius: 20px;
        overflow: hidden;
        border:1px solid #33B0B5
    }
</style>
