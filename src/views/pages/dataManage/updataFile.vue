<template>
    <div class="wrap">
        <div style="margin-top:12px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="elsePage" :to="{ path: '/dataManage' }"> <i style="color:#33B0B5" class="iconfont iconiconfontzhizuobiaozhun023101"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item class="nowPage">上传文件</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="buttonRow buttonRow2" style="margin-top:24px;">
            <el-button @click="updata()"> <i class="iconfont iconshangchuan"></i> 批量上传</el-button>
        </div>
        <el-form style="margin-top:20px;" :rules="rules" :inline="true" :model="formInline" class="demo-form-inline" label-position="right" label-width="auto">
            <el-row>
                <el-col :span="7">
                    <el-form-item label="界面相成分-元素" prop="dataElement">
                        <el-input v-model="formInline.dataElement" style="width:213px" placeholder="请输入界面相成分-元素"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="界面相成分-含量" prop="dataContent">
                        <el-input v-model="formInline.dataContent" style="width:213px" placeholder="请输入界面相成分-含量"></el-input>
                    </el-form-item>  
                </el-col>
                <el-col :span="5">
                    <el-form-item label="数据来源" class="marginZero" prop="dataNumber">
                        <el-select v-model="formInline.dataSource" style="width:160px" placeholder="请选择数据来源">
                        <el-option label="公开发表论文" value="1"></el-option>
                        <el-option label="未发表结果" value="2"></el-option>
                        <el-option label="已出版书籍" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        <el-input v-model="formInline.dataDescription " style="width:250px" placeholder="请填写数据描述"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="updataBigBox" v-for="(item, index) in formInline.updataArr" :key="index">
            <el-form :inline="true" :model="item" class="demo-form-inline" label-position="right" label-width="68px">
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="数据分类">
                            <el-select v-model="item.classify" style="width:240px" @change="dataSel(item.classify,item.dataKey)" placeholder="请选择数据来源">
                                <el-option v-for="item in dataClassifyArr" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="数据类型" class="marginZero" prop="dataNumber">
                            <el-select v-model="item.dataKey" style="width:160px" @change="dataSel(item.classify,item.dataKey)" placeholder="请选择数据来源">
                                <el-option v-for="item in dataTypeArr" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="text-align:right">
                        <el-form-item label="关键词" prop="dataNumber">
                            <el-select v-model="item.laiyuan" style="width:460px" placeholder="请选择数据来源">
                                <el-option v-for="item in keywordArr" :key="item.structureId" :label="item.stKey" :value="item.structureId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="12">
                        <el-form-item label="数据值" class="marginZero">
                            <el-input v-model="item.dataValue" style="width:495px" placeholder="请输入数据值"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="text-align:right;display:flex;">
                        <span class="labelSpan">文件上传/图片上传</span>
                            <el-input v-model="item.dataFile " style="width:382px"></el-input>
                            <el-button class="upDataBox">上传</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="数据摘要">
                            <el-input type="textarea" :rows="7" v-model="item.dataTips" style="width:1074px;height:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:'updata',
    data(){
        return {
            formInline:{
                chenfen:'',
                laiyuan:'',
                dataNumber:'',
                updataArr:[
                    {
                        laiyuan:'',
                        classify:'',
                        dataKey:'',
                    },
                ],
            },
            dataClassifyArr:[], // 数据分类
            dataTypeArr:[], // 数据类型
            keywordArr:[], // 关键词
            rules:{
                dataNumber: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                dataContent: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                dataElement: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    created(){
        this.getSelectArr()
    },
    methods:{
        updata(){},
        getSelectArr(){
            this.$api.dataTypelist().then(res=>{
                this.dataTypeArr = res.data.data
                console.log(res)
            })
            this.$api.dataClassify().then(res=>{
                this.dataClassifyArr = res.data.data
                console.log(res)
            })
        },
        dataSel(data1,data2){
            this.$api.getKeyword({paramClass:data1,paramType:data2}).then(res=>{
                this.keywordArr = res.data.data
            })
        },
    }
}
</script>
<style lang="less">
    .upDataBox{
        width: 60px;
        border: 1px solid #33B0B5!important;
        color: #33B0B5!important;
        background-color: #F3FBFB!important;
        text-align: center!important;
        padding: 0!important;
        height: 34px;
        font-size: 16px!important;
        line-height: 34px;
        margin-left: 19px!important;
    }
    .marginZero{
        .el-form-item__label-wrap{
            margin-left: 0!important;
        }
    }
</style>

<style scoped>
    .labelSpan{
        display:inline-block;
        font-size:14px;
        color:#606266;
        width:80px;
        padding-right:12px;
        align-self:auto;
        margin-left: 24px;
    }
    .updataBigBox{
        height: 338px;
        background-color: #F3FBFB;
        border: 1px solid #DDDDDD;
        margin-top:20px;
        padding: 30px 20px 0 26px;
    }
    .buttonRow i{
        color: #33B0B5
    }
    .buttonRow{
        text-align: right;
        color: #33B0B5
    }
</style>
