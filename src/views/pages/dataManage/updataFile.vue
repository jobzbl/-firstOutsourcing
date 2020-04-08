<template>
    <div class="wrap">
        <div style="margin-top:12px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="elsePage" :to="{ path: '/dataManage' }"> <i style="color:#33B0B5" class="iconfont iconiconfontzhizuobiaozhun023101"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item class="nowPage">上传文件</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="buttonRow ">
            <el-upload
            class="upload-demo buttonRowUpDataBox"
            action="0"
            :before-upload="updata"
            :file-list="fileList">
            <el-button @click="shangchuanB()" type="primary"><i class="iconfont iconshangchuan"></i> 批量上传</el-button>
            </el-upload>
            <!-- <el-button @click="updata()"> <i class="iconfont iconshangchuan"></i> 批量上传</el-button> -->
        </div>
        <el-form style="margin-top:20px;" ref="updataTab" :rules="rules" :inline="true" :model="formInline" class="demo-form-inline" label-position="right" label-width="auto">
            <el-row>
                <el-col :span="7">
                    <el-form-item label="界面相成分-元素" prop="dataElement">
                        <el-input v-model.trim="formInline.dataElement" @change="dataElementArr()" style="width:213px" placeholder="请输入界面相成分-元素"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="界面相成分-含量" prop="dataContent">
                        <el-input v-model.trim="formInline.dataContent" style="width:213px" placeholder="请输入界面相成分-含量"></el-input>
                    </el-form-item>  
                </el-col>
                <el-col :span="5">
                    <el-form-item label="数据来源" class="marginZero" prop="dataSource">
                        <el-select v-model="formInline.dataSource" style="width:160px" placeholder="请选择数据来源">
                            <el-option v-for="item in dataSourceObj" :key="item.structureId" :label="item.stKey" :value="item.structureId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        <el-input v-model.trim="formInline.dataDescription " style="width:250px" placeholder="请填写数据描述"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="updataBigBox" v-for="(item, index) in formInline.itemList" :key="index">
            <el-form :inline="true" :model="item" class="demo-form-inline" label-position="right" label-width="68px">
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="数据分类">
                            <el-select v-model ="sub[index].classify" style="width:240px" @change="dataSel(sub[index].classify,sub[index].dataType)" placeholder="请选择数据来源">
                                <el-option v-for="item in dataClassifyArr" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="数据类型" class="marginZero">
                            <el-select v-model ="sub[index].dataType" style="width:160px" @change="dataSel(sub[index].classify,sub[index].dataType)" placeholder="请选择数据来源">
                                <el-option v-for="item in dataTypeArr" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="text-align:right">
                        <el-form-item label="关键词">
                            <el-select v-model ="item.dataKey" style="width:460px" placeholder="请选择数据来源">
                                <el-option v-for="item in keywordArr" :key="item.structureId" :label="item.stKey" :value="item.structureId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row type="flex" class="row-bg" justify="space-between" v-if="item.dataKey == 29">
                    <el-col :span="12">
                        <el-form-item label="选择字段" class="marginZero">
                            <el-select v-model="item.dataQ" style="width:495px" placeholder="请选择字段">
                                <el-option label="x" value="x"></el-option>
                                <el-option label="y" value="y"></el-option>
                                <el-option label="z" value="z"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="选择字段" class="marginZero">
                            <el-select v-model="item.dataT" style="width:495px" placeholder="请选择字段">
                                <el-option label="B" value="B"></el-option>
                                <el-option label="N" value="N"></el-option>
                                <el-option label="O" value="O"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> -->
               
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="12" v-if="item.dataKey == 7||item.dataKey == 8">
                        <el-form-item label="选择字段" class="marginZero">
                            <el-select v-model="item.dataT" style="width:495px" placeholder="请选择字段">
                                <el-option label="B" value="B"></el-option>
                                <el-option label="N" value="N"></el-option>
                                <el-option label="O" value="O"></el-option>
                                <!-- <el-option v-for="(item,index) in elementArr" :key="index" :label="item" :value="item"></el-option> -->
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="item.dataKey == 27">
                        <el-form-item label="选择字段" class="marginZero">
                            <el-select v-model="item.dataT" style="width:495px" placeholder="请选择数据来源">
                                <el-option label="a (Å)" value="a"></el-option>
                                <el-option label="b (Å)" value="b"></el-option>
                                <el-option label="c (Å)" value="c"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="item.dataKey == 28">
                        <el-form-item label="选择字段" class="marginZero">
                            <el-select v-model="item.dataT" style="width:495px" placeholder="请选择数据来源">
                                <el-option label="α (°)" value="α"></el-option>
                                <el-option label="β (°)" value="β"></el-option>
                                <el-option label="γ (°)" value="γ"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- 数值与字段 -->
                    <el-col :span="12" v-if="sub[index].dataType==2||sub[index].dataType==5">
                        <el-form-item label="数据值" class="marginZero">
                            <el-input v-model="item.dataValue" style="width:495px" placeholder="请输入数据值"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 字段候选 -->
                    <el-col :span="12" v-if="sub[index].dataType==6">
                        <el-form-item label="数据值" class="marginZero">
                            <el-select v-model="item.dataValue" style="width:495px" placeholder="请选择数据值">
                                <!-- <el-option label="请选择数据值" value="1"></el-option> -->
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- 文件与图片 -->
                    <el-col v-if="sub[index].dataType==4||sub[index].dataType==3" span="24" style="text-align:right;display:flex;margin-left:-12px;margin-bottom:20px;display:flex">
                        <span class="labelSpan" v-if="sub[index].dataType==3" style="align-self: center;">图片上传</span>
                        <span class="labelSpan" v-if="sub[index].dataType==4" style="align-self: center;" >文件上传</span>
                        <div class="inputBoxDiv" style="">
                            <span v-for="(item,i) in item.dataFile" :key="i">{{item}} <i @click="removeFile(index,i)" class="iconfont iconcuowu"></i> </span>
                        </div>
                        <!-- <el-input v-model="item.dataFile " style="width:382px"></el-input> -->
                        <el-upload
                        class="upload-demo upDataBox"
                        action="0"
                        :before-upload="beforeUpload"
                        :file-list="fileList">
                        <el-button @click="shangchuanB(index)" size="small" type="primary">上传</el-button>
                        </el-upload>
                        <span class="updataTip">{{sub[index].dataType==4?'(请上传cif格式的结构文件)':'(请上传png/jpg/jpeg格式的图片)'}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="数据摘要">
                            <el-input type="textarea" :rows="2" v-model="item.dataTips" style="width:1074px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="pushButton" @click="pushArr()">
            <i class="iconfont iconjiahao"></i>
        </div>
        <div style="margin-top:55px;text-align:center;margin-bottom:90px;">
            <el-button class="saveUpdata" type="primary" @click="saveUpdata('updataTab')">保存</el-button>
        </div>
    </div>
</template>
<script>
import base from '../../../request/base'; // 导入接口域名列表
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
                {classify:'', dataType:'',dataFile:[],dataKey:''}
            ],
            dataClassifyArr:[], // 数据分类
            dataTypeArr:[], // 数据类型
            keywordArr:[], // 关键词
            dataSourceObj:[], // 来源
            rules:{
                dataSource: [
                    { required: true, message: '请输入数据来源', trigger: 'blur' },
                ],
                dataContent: [
                    { required: true, message: '请输入界面相成分-含量', trigger: 'blur' },
                ],
                dataElement: [
                    { required: true, message: '请输入界面相成分-元素', trigger: 'blur' },
                ],
            },
            nowIndex:0,
            elementArr:[]
        }
    },
    created(){
        this.getSelectArr()
    },
    methods:{
        dataElementArr(){
            this.elementArr = this.formInline.dataElement.split(',')
        },
        removeFile(index,i){
            // this.$api.fileDelete(this.sub[index].dataFile[i]).then(res=>{
            //     console.log(res)
                this.formInline.itemList[index].dataFile.splice(i,1)
            // })
        },
        beforeUpload(file){
            if(this.formInline.itemList[this.nowIndex].dataKey==31||this.formInline.itemList[this.nowIndex].dataKey==32
            ||this.formInline.itemList[this.nowIndex].dataKey==58||this.formInline.itemList[this.nowIndex].dataKey==59
            ||this.formInline.itemList[this.nowIndex].dataKey==60){
                if(this.formInline.itemList[this.nowIndex].dataFile.length==1){
                    this.$message({
                        message: '此关键词中最多只能上传一个图片/文件',
                        type: 'warning'
                    });
                    return
                }
            } else if(this.formInline.itemList[this.nowIndex].dataFile.length==5){
                this.$message({
                    message: '此关键词中最多只能上传五个图片/文件',
                    type: 'warning'
                });
                return
            }
            // this.formInline.itemList.dataKey ==31 32 58 59 60
            let fd = new FormData();
            if(this.formInline.itemList[this.nowIndex].dataKey!==29){
                if(file.type=='image/png'||file.type=='image/jpg'||file.type=='image/jpeg'){
                    fd.append('file',file);//传文件
                    this.$api.fileUpData(fd).then(res=>{
                        if(res.data.code==0){
                            this.formInline.itemList[this.nowIndex].dataFile.push(base.sq+res.data.url)
                            this.sub[this.nowIndex].dataFile.push(fd)
                            console.log(this.formInline)
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }
                        
                    })
                }else{
                    this.$message({
                        message: '请上传png/jpg/jpeg格式的图片',
                        type: 'warning'
                    });
                }
            }else{
                fd.append('file',file);//传文件
                this.$api.fileUpData(fd).then(res=>{
                    if(res.data.code==0){
                        this.formInline.itemList[this.nowIndex].dataFile.push(base.sq+res.data.url)
                        this.sub[this.nowIndex].dataFile.push(fd)
                        console.log(this.formInline)
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            }

            return false  //屏蔽了action的默认上传
        },
        updata(file){
            let fd = new FormData();
            fd.append('file',file);//传文件
            this.$api.bulkImport(fd).then(res=>{
                if(res.data.code==-1){
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }else{
                    this.formInline = res.data.data
                }
                for(var i=0;i<this.formInline.itemList.length;i++){
                    this.sub.push( {classify:'', dataType:'',dataFile:[],dataKey:''})
                }
                console.log(this.formInline)
            })
            return false  //屏蔽了action的默认上传
        },
        shangchuanB(index){
            this.nowIndex = index
        },
        
        
        pushArr(){
            this.formInline.itemList.push({
                dataKey:'',
                dataValue:'',
                dataTips:'',
                dataFile:[]
            })
            this.sub.push({classify:'', dataType:'',dataFile:[],dataKey:''})
        },
        saveUpdata(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    for(let i=0;i<this.formInline.itemList.length;i++){
                        if(this.sub[i].dataType==3||this.formInline.itemList[i].dataKey==29){
                            if(this.formInline.itemList[i].dataFile&&this.formInline.itemList[i].dataFile.length){
                                this.formInline.itemList[i].dataValue = this.formInline.itemList[i].dataFile.toString()
                            }else{
                                this.formInline.itemList[i].dataFile = ''
                            }
                        }else{
                            this.formInline.itemList[i].dataFile = ''
                        }
                            this.formInline.itemList[i].dataFile = ''
                    }
                    console.log(this.formInline)
                    let _itemList = this.formInline.itemList.filter(x=>x.dataKey=='')||[]
                    if(_itemList.length>0){
                        this.$message({
                            message: '请选择关键词',
                            type: 'warning'
                        });
                        return false
                    }
                    let _elementReg = /^,?(?:[a-zA-Z]+,)*(?:[a-zA-Z]+)?$/
                    let _contentReg = /^[0-9:]*$/
                    if(!_elementReg.test(this.formInline.dataElement)){
                        this.$message({
                            message: '界面相成分-元素输入格式错误',
                            type: 'warning'
                        });
                        return false
                    }
                    if(!_contentReg.test(this.formInline.dataContent)){
                        this.$message({
                            message: '界面相成分-含量输入格式错误',
                            type: 'warning'
                        });
                        return false
                    }
                    
                    this.$api.upData(this.formInline).then(res=>{
                        if(res.data.code==0){
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            setTimeout(() => {
                                this.$router.push('/dataManage')
                            }, 1000);
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }
                        
                        console.log(res)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        },
        
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
    .buttonRowUpDataBox{
        button{
            background:#fff
        }
        button:hover{
            background:#fff;
            color:#33B0B5
        }
        button:focus{
            background:#fff;
            color:#33B0B5
        }
    }
    .saveUpdata{
            width: 180px;
            height: 40px;
            padding: 0px;
            text-align: center;
            line-height: 40px;
            font-size: 18px!important;
    }
    .row-bg{
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
    }
    .marginZero{
        .el-form-item__label-wrap{
            margin-left: 0!important;
        }
    }
</style>

<style scoped>
    .iconshangchuan{
        color: #fff!important;
    }
    .updataTip{
        font-size: 14px;
        color: #999;
        margin-left: 20px;
        margin-top: 6px;
    }
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
        /* margin-left: 24px; */
    }
    .updataBigBox{
        min-height: 240px;
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
