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
                        <el-select clearable v-model ="formInline.dataSource" style="width:160px" placeholder="请选择数据来源">
                            <el-option v-for="item in dataSourceObj" :key="item.structureId" :label="item.stKey" :value="item.structureId"></el-option>
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
        <div class="updataBigBox" v-for="(item, index) in formInline.itemList" :key="index">
            <el-form :inline="true" :model="item" class="demo-form-inline" label-position="right" label-width="68px">
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="数据分类">
                            <el-select clearable v-model ="sub[index].classify" style="width:240px" @change="dataSel(sub[index].classify,sub[index].dataType)" placeholder="请选择数据来源">
                                <el-option v-for="item in dataClassifyArr" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="数据类型" class="marginZero">
                            <el-select clearable v-model ="sub[index].dataType" style="width:160px" @change="dataSel(sub[index].classify,sub[index].dataType)" placeholder="请选择数据来源">
                                <el-option v-for="item in dataTypeArr" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="text-align:right">
                        <el-form-item label="关键词">
                            <el-select clearable v-model ="item.dataKey" style="width:460px" placeholder="请选择数据来源">
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
                            <div class="inputBoxDiv" style="">
                                <span v-for="(item,i) in item.dataFile" :key="i">{{item}} <i @click="removeFile(index,i)" class="iconfont iconcuowu"></i> </span>
                            </div>
                            <!-- <el-input v-model="item.dataFile " style="width:382px"></el-input> -->
                            <el-upload
                            class="upload-demo upDataBox"
                            action="0"
                            :before-upload="beforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-change="handleChange"
                            :file-list="fileList">
                            <el-button @click="shangchuanB(index)" size="small" type="primary">上传</el-button>
                            </el-upload>
                            <!-- <el-button class="upDataBox">上传</el-button> -->
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
        <div class="pushButton" @click="pushArr()">
            <i class="iconfont iconjiahao"></i>
        </div>
        <div style="margin-top:55px;text-align:center;margin-bottom:90px;">
            <el-button class="saveUpdata" type="primary" @click="saveUpdata">保存</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'updata',
    data(){
        return {
            fileList: [],
            formInline:{
                dataElement:'',
                dataContent:'',
                dataSource:'',
                dataDescription:'',
                itemList:[
                    {
                        dataKey:'',
                        dataValue:'',
                        dataTips:'',
                        dataFile:[],
                    },
                ],
            },
            sub:[
                {classify:'', dataType:'',dataFile:[]}
            ],
            dataClassifyArr:[], // 数据分类
            dataTypeArr:[], // 数据类型
            keywordArr:[], // 关键词
            dataSourceObj:[], // 来源
            rules:{
                dataNumber: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                dataContent: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                dataElement: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
            },
            nowIndex:0,
        }
    },
    created(){
        this.getSelectArr()
    },
    methods:{
        removeFile(index,i){
            // this.$api.fileDelete(this.sub[index].dataFile[i]).then(res=>{
            //     console.log(res)
                this.formInline.itemList[index].dataFile.splice(i,1)
            // })
        },
        beforeUpload(file){
            let fd = new FormData();
            fd.append('file',file);//传文件
            this.$api.fileUpData(fd).then(res=>{
                this.formInline.itemList[this.nowIndex].dataFile.push(res.data.url)
                this.sub[this.nowIndex].dataFile.push(fd)
            })
            return false  //屏蔽了action的默认上传
        },
        shangchuanB(index){
            this.nowIndex = index
        },
        uploadError(err){
            console.log(err)
        },
        uploadSuccess(res){
            console.log(res)
        },
        handleChange(file, fileList) {
            // 
            // this.$api.fileUpData(file).then(res=>{
            //     console.log(res)
            // })
            console.log(fileList)
            // this.fileList = fileList.slice(-3);
        },
        pushArr(){
            this.formInline.itemList.push({
                dataKey:'',
                dataValue:'',
                dataTips:'',
                dataFile:[]
            })
            this.sub.push({classify:'', dataType:'',dataFile:[]})
        },
        saveUpdata(){
            for(let i=0;i<this.formInline.itemList.length;i++){
                this.formInline.itemList[i].dataFile = this.formInline.itemList[i].dataFile.toString()
            }
            this.$api.upData(this.formInline).then(res=>{
                if(res.data.msg==='success'){
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }
                console.log(res)
            })
        },
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
            this.$api.getDataSource().then(res=>{ // 数据来源
                this.dataSourceObj = res.data.data
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
    .saveUpdata{
            width: 180px;
            height: 40px;
            padding: 0px;
            text-align: center;
            line-height: 40px;
            font-size: 18px!important;
    }
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
        .el-button--primary{
            padding: 0;
            width: 100%;
            height: 100%;
            background: none!important;
            color: #33B0B5!important;
            border: none;
            span{
                font-size: 16px!important;
            }
        }
    }
    .marginZero{
        .el-form-item__label-wrap{
            margin-left: 0!important;
        }
    }
</style>

<style scoped>
    .inputBoxDiv{
        border:1px solid #C0C4CC;
        height:40px;width:382px;
        background:#fff;
        border-radius:3px;
        text-align:left;
        padding-left: 10px;
        line-height: 40px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: normal
    }
    .inputBoxDiv span{
        display: inline-block;
        overflow: hidden;
        height: 20px;
        line-height: 20px;
        width: 40px;
        color: #fff;
        background: #999;
        vertical-align: middle;
        padding-left: 3px;
        border-radius: 3px;
        cursor: pointer;
        position: relative;
        margin-right: 5px;
    }
    .iconcuowu{
        position: absolute;
        top: 0;
        right: 0;
        background: #666;
    }
    .pushButton{
        margin-left: 1140px;
        height: 60px;
        width: 60px;
        border: 1px dashed #33B0B5;
        text-align: center;
        line-height: 60px;
        font-weight: bold;
        margin-top:23px;
    }
    .pushButton i{
        font-size: 32px;
        color: #33B0B5;
    }
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
