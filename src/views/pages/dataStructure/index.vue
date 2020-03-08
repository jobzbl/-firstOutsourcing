<template>
    <div class="wrap">
        <div class="haederBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="right" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="关键词">
                            <el-input v-model="formInline.keyword" style="width:280px" placeholder="请输入关键词"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="数据分类">
                            <el-select v-model="formInline.dataClassify" style="width:200px" placeholder="请选择数据分类">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="数据类型">
                            <el-select v-model="formInline.dataType" placeholder="请选择数据类型">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="text-align:right">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="buttonRow buttonRow2">
            <el-button @click="addkeyWordFun"> <i class="iconfont iconshanchu"></i> 新增关键词</el-button>
            <el-button @click="mergeKeyWord"> <i class="iconfont iconxiazai"></i> 合并关键词</el-button>
        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" header-row-class-name="tableHeader" :data="tableData" tooltip-effect="dark" style="width: 100%" 
                @selection-change="handleSelectionChange" border row-class-name="tableTr">
                <el-table-column prop="keyword" label="关键词" width="391"></el-table-column>
                <el-table-column prop="dataClassify" label="数据分类" width="319"></el-table-column>
                <el-table-column prop="dataType" label="数据类型" width="295"></el-table-column>
                <el-table-column label="勾选合并关键词">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.merge"></el-checkbox>
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
                            <el-button type="primary" @click="handleClose2(true)">下一步</el-button>
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
                        <el-radio v-model="radio" label="1">关键词1</el-radio>
                        <el-radio v-model="radio" label="2">数据类型1</el-radio>
                    </div>
                    <div style="display:flex;justify-content: space-between;padding:0 70px;margin-top:13px">
                        <el-radio v-model="radio" label="3">关键词2</el-radio>
                        <el-radio v-model="radio" label="4">数据类型2</el-radio>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <div class="formButtonBox">
                            <el-button type="primary" @click="handleClose3(true)">确定</el-button>
                            <el-button @click="handleClose3">取 消</el-button>
                        </div>
                    </span>
                </el-dialog>
            </div>
            <div class="removeDialog addKeyWordBox">
                <el-dialog title="关键词信息" :visible.sync="addKeyWord" width="400px" :show-close='false'>
                    <el-form ref="addKeyWord" :rules="addKeyWordRules" :model="addKeyWordArr" label-width="80px">
                        <el-form-item label="关键词" prop="keyword">
                            <el-input v-model="addKeyWordArr.keyword"></el-input>
                        </el-form-item>
                        <el-form-item label="数据分类">
                            <el-select v-model="addKeyWordArr.dataClassify" style="width:240px" placeholder="请选择数据分类">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="数据类型">
                            <el-select v-model="addKeyWordArr.dataType" style="width:240px" placeholder="请选择数据类型">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <div class="formButtonBox">
                            <el-button type="primary" @click="submitForm('addKeyWord')">确定</el-button>
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
        addKeyWordArr:{
            dataType:'',
            dataClassify:'',
            keyword:'',
        },
        addKeyWordRules:{
            keyword: [
                   { required: true, message: '请输入关键词', trigger: 'blur' },
               ],
        },
        radio:'1',
        addKeyWord:false,
        mergeName:false,
        merge:false,
        keywordShow:false,
		currentPage: 1,
        formInline:{
            keyword:'',
            dataClassify:'',
            dataType:''
        },
        tableData:[
            {
                keyword:'12',
                dataClassify:'123',
                dataType:'qwe',
                merge:false
            }
        ],
        }
    },
    created(){

    },
    methods:{
        addkeyWordFun(){
            this.addKeyWord = true
        },
        mergeKeyWord() {
            this.merge = true
            this.mergeName = true
        },
        handleSelectionChange(){},
        onSubmit(){},
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addKeyWord = false
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        handleClose(){
            this.keywordShow = false
        },
        handleClose2(){
            this.merge = false
        },
        handleClose3(){
            this.mergeName = false
        },
        handleClose4(){
            this.addKeyWord = false
        }
    }
}
</script>
<style lang="less">
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
