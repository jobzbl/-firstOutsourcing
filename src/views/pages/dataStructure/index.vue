<template>
    <div class="wrap">
        <div class="haederBox">
            <el-form v-if="quanxian.indexOf(1)!=-1" :inline="true" :model="formInline" class="demo-form-inline" label-position="right" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="关键词">
                            <el-input v-model="formInline.stKey" style="width:280px" placeholder="请输入关键词"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="数据分类">
                            <el-select clearable v-model ="formInline.stClassification" style="width:199px" placeholder="请选择数据分类">
                                <el-option v-for="item in dataClassifyObj" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="数据类型">
                            <el-select clearable v-model ="formInline.stType"  style="width:199px" placeholder="请选择数据类型">
                                <el-option v-for="item in dataTypeObj" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="text-align:right">
                        <el-form-item>
                            <el-button type="primary" @click="getListdata(true)">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="buttonRow buttonRow2" v-if="quanxian.indexOf(3)!=-1">
            <el-button @click="addkeyWordFun"> <i class="iconfont iconjiahao"></i> 新增关键词</el-button>
            <el-button @click="mergeKeyWord"> <i class="iconfont iconhebingbanqun"></i> 合并关键词</el-button>
        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" header-row-class-name="tableHeader" :data="tableData.list" tooltip-effect="dark" style="width: 100%" 
                @selection-change="handleSelectionChange" border row-class-name="tableTr">
                <el-table-column prop="stKey" label="关键词" width="391"></el-table-column>
                <el-table-column label="数据分类" width="319">
                    <template slot-scope="scope">
                        {{dataClassifyArr[scope.row.stClassification]}}
                    </template>
                </el-table-column>
                <el-table-column label="数据类型" width="295">
                    <template slot-scope="scope">
                        {{dataTypeArr[scope.row.stType]}}
                    </template>
                </el-table-column>
                <el-table-column label="勾选合并关键词">
                    <template slot-scope="scope">
                        <el-checkbox :checked="isCheck" @change="checkout(scope.row,$event)"></el-checkbox>
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
        <div>
            <!-- 确认勾选合并的关键词 -->
            <div class="removeDialog">
                <el-dialog title="确认提示" :visible.sync="keywordShow" width="400px" :show-close='false'>
                    <div style="display:flex;justify-content:flex-start">
                        <div style="width:50px;height:50px;">
                            <img src="../../../assets/images/issue.png" alt="" style="width:100%;height:auto;">
                        </div>
                        <div style="margin-left:20px;">
                            <div style="color:#4d4d4d;font-size:18px;font-weight:bold">是否确定合并勾选的数据</div>
                            <div style="color:#666;font-size:14px;margin-top:10px;">合并数据后，数据分类相同</div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <div class="formButtonBox">
                            <el-button type="primary" @click="next(true)">下一步</el-button>
                            <el-button @click="handleClose2">取 消</el-button>
                        </div>
                    </span>
                </el-dialog>
            </div>
            <!-- 合并失败 -->
            <div>
                <el-dialog :visible.sync="merge" width="290px" :show-close='false'>
                    <div style="text-align:center;">
                        <img src="../../../assets/images/waring.png" alt="" style="width:78px;height:70px;margin-bottom:18px">
                        <div style="font-size:14px;color:#666;">数据类型无法统一，合并关键词失败！</div>
                    </div>
                </el-dialog>
            </div>
            <!-- 确认合并 -->
            <div class="removeDialog mergeName">
                <el-dialog title="确认提示" :visible.sync="mergeName" width="400px" :show-close='false'>
                    <div style="font-size:14px;color:#666;margin-bottom:37px">请选择合并关键词后的关键词名称：</div>
                    <div style="display:flex;justify-content: space-between;padding:0 70px">
                        <el-radio :title="checkArr[0].stKey" v-if="checkArr.length>1" v-model="radio" label="0">{{checkArr[0].stKey}}</el-radio>
                        <el-radio :title="dataTypeArr[checkArr[0].stType]" v-if="checkArr.length>1" v-model="radio1" label="0">{{dataTypeArr[checkArr[0].stType]}}</el-radio>
                    </div>
                    <div style="display:flex;justify-content: space-between;padding:0 70px;margin-top:13px">
                        <el-radio :title="checkArr[1].stKey" v-if="checkArr.length>1" v-model="radio" label="1">{{checkArr[1].stKey}}</el-radio>
                        <el-radio :title="dataTypeArr[checkArr[1].stType]" v-if="checkArr.length>1" v-model="radio1" label="1">{{dataTypeArr[checkArr[1].stType]}}</el-radio>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <div class="formButtonBox">
                            <el-button type="primary" @click="mergeKey(checkArr[0].structureId,checkArr[1].structureId)">确定</el-button>
                            <el-button @click="handleClose3">取 消</el-button>
                        </div>
                    </span>
                </el-dialog>
            </div>
            <div class="removeDialog addKeyWordBox">
                <el-dialog title="关键词信息" destroy-on-close :visible.sync="addKeyWord" width="400px" :show-close='false'>
                    <el-form ref="addKeyWord" :rules="addKeyWordRules" :model="addKeyWordArr" label-width="80px">
                        <el-form-item label="关键词" prop="stKey">
                            <el-input v-model.trim="addKeyWordArr.stKey" placeholder="请输入关键词"></el-input>
                        </el-form-item>
                        <el-form-item label="数据分类" prop="stClassification">
                            <el-select clearable v-model ="addKeyWordArr.stClassification" style="width:240px" placeholder="请选择数据分类">
                                <el-option v-for="item in dataClassifyObj" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="数据类型" prop="stType">
                            <el-select clearable v-model ="addKeyWordArr.stType" style="width:240px" placeholder="请选择数据类型">
                                <el-option v-for="item in dataTypeObj" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <div class="formButtonBox">
                            <el-button type="primary" @click="saveKey('addKeyWord')">确定</el-button>
                            <el-button @click="handleClose4">取 消</el-button>
                        </div>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        isCheck:false,
        isdisabled:false,
        addKeyWordArr:{
            stKey:'',
            stClassification:'',
            stType:'',
        },
        addKeyWordRules:{
            stKey: [
                { required: true, message: '请输入关键词', trigger: 'blur' },
            ],
            stClassification:[
                { required: true, message: '请选择数据分类', trigger: 'blur', }
            ],
            stType:[
                { required: true, message: '请选择数据类型', trigger: 'blur', }
            ]

        },
        radio:'0',
        radio1:'0',
        addKeyWord:false,
        mergeName:false,
        merge:false,
        keywordShow:false,
		currentPage: 1,
        formInline:{
            stKey:'',
            stClassification:'',
            stType:'',
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
        dataSourceArr:{},
        checkArr:[],
        quanxian:localStorage.getItem('menuIdList')
        }
    },
    created(){
        this.getSelectObj()
    },
    methods:{
        checkout(data,value){
            if(value){
                this.checkArr.push(data)
            }else{
               this.checkArr = this.checkArr.filter(x=>x.structureId!=data.structureId) 
            }
            if(this.checkArr.length>=2){
                this.isdisabled=true
            }
        },
        mergeKey(structureId1,structureId2){
            this.$api.mergeKey({
                structureId1:structureId1,
                structureId2:structureId2,
                stKey:this.checkArr[this.radio].stKey,
                stType:this.checkArr[this.radio].stType,
                }).then(res=>{ 
                    this.mergeName = false
                    this.keywordShow = false
                    if(res.data.code==0){
                        this.$message({
                            message: '合并成功',
                            type: 'success'
                        });
                        this.getListdata()
                        this.isCheck = false
                        this.isdisabled=false
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
            }) 
        },
        getSelectObj(){
            this.$api.dataTypelist().then(res=>{ // 数据类型
                this.dataTypeObj = res.data.data
                this.getListdata()
                this.dataTypeObj.map(x=>{
                    Object.assign(this.dataTypeArr,{[x.id]: x.paramValue})
                })
            })
            this.$api.dataClassify().then(res=>{ // 数据分类
                this.dataClassifyObj = res.data.data
                this.getListdata()
                this.dataClassifyObj.map(x=>{
                    Object.assign(this.dataClassifyArr,{[x.id]: x.paramValue})
                })

            })
            this.$api.getDataSource().then(res=>{ // 数据来源
                this.dataSourceObj = res.data.data
                this.dataSourceObj.map(x=>{
                    Object.assign(this.dataSourceArr,{[x.structureId]: x.stKey})
                })
            })
            
        },
        getListdata(judeg){
            console.log(judeg)
            if(judeg){
                this.tableData.currPage = 1
            }
            this.$api.getdataStrutureData({
                page:this.tableData.currPage,
                limit:this.tableData.pageSize,
                stKey:this.formInline.stKey,
                stType:this.formInline.stType,
                stClassification :this.formInline.stClassification,
                }).then(res=>{
                this.tableData = res.data.page
            })
        },
        addkeyWordFun(){
            this.addKeyWord = true
        },
        mergeKeyWord() {
            if(this.checkArr.length<2){ // 如果没有选择数据
                this.$message({
                    message: '请选择两条',
                    type: 'warning'
                });
                return
            }else{ // 选择数据之后进行确认弹框
                this.keywordShow = true
            }
            
        },
        handleSelectionChange(){},
        onSubmit(){},
        handleCurrentChange() {
            // this.formInline.stKey=''
            // this.formInline.stType=''
            // this.formInline.stClassification=''
            console.log(this.formInline)
            this.getListdata()
        },
        saveKey(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.addKey(this.addKeyWordArr).then(res=>{ // 数据来源
                        if(res.data.code==0){
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.addKeyWord = false
                            this.addKeyWordArr = {
                                stKey:'',
                                stClassification:'',
                                stType:'',
                            }
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        next(){
            let fisrt = this.checkArr[0].stType
            let notLength = this.checkArr.filter(x=>x.stType!=fisrt)||[]
            console.log(notLength.length)
            if(notLength.length>0){
                this.merge = true
            }else{
                this.mergeName = true
            }
            this.isdisabled=false
            this.isCheck=false
        },
        handleClose2(){
            this.keywordShow = false
        },
        handleClose3(){
            this.mergeName = false
            this.keywordShow = false
        },
        handleClose4(){
            this.addKeyWord = false
        }
    }
}
</script>
<style lang="less">
    .mergeName{
        .el-radio{
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .buttonRow2{
        button{
            height:36px;
            line-height:36px;
            padding-top:0;
            padding-bottom:0
        }
    }
    .mergeName {
        .el-dialog__body{
            padding: 13px 15px;
        }
        .el-dialog__footer{
            padding-bottom: 1px;
        }
    }
    .addKeyWordBox{
        .el-dialog__body{
            padding-left: 40px;
            padding-right: 40px;
        }
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
    }
    .haederBox{
        margin-top: 40px;
    }
</style>
