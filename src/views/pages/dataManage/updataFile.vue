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
                <el-col :span="9">
                    <el-form-item label="界面相主成分" prop="dataContail">
                        <el-select v-model="formInline.dataContail" style="width:100%" placeholder="请选择界面相主成分">
                            <el-option label="BN" value="BN"></el-option>
                            <el-option label="C" value="C"></el-option>
                            <el-option label="RE2SiO5" value="RE2SiO5"></el-option>
                            <el-option label="RE2Si2O7" value="RE2Si2O7"></el-option>
                            <el-option label="BN/SiC" value="BN/SiC"></el-option>
                            <el-option label="BN/C" value="BN/C"></el-option>
                            <el-option label="C/SiC" value="C/SiC"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="数据来源" class="marginZero" prop="dataSource">
                        <el-select v-model="formInline.dataSource" style="width:100%" placeholder="请选择数据来源">
                            <el-option v-for="item in dataSourceObj" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-input v-model.trim="formInline.dataDescription " style="width:100%" placeholder="请填写数据描述"></el-input>
                </el-col>
            </el-row>
        </el-form>
        <div class="updataBigBox" v-for="(item, index) in formInline.itemList" :key="index">
                <el-row :gutter="20">
                    <el-col :span="5">
                        <el-select v-model ="subArr[index].classify2" style="width:100%" @change="dataSel($event,index,'')" placeholder="请选择数据分类">
                            <el-option v-for="item in dataClassifyArr" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        <el-select v-model ="item.dataKey" style="width:100%" @change="dataKeyChange($event,index)" placeholder="请选择关键词">
                            <el-option v-for="item in subArr[index].keywordArr" :key="item.structureId" :label="item.stKey" :value="item.structureId"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <div class="dataTypeClass" style="border:1px solid #e1e1e1">{{dataTypeArr[subArr[index].dataType]||'数据类型'}}</div>
                    </el-col>
                    <!-- item.dataKey -->
                    <el-col :span="11" v-if="item.dataKey==12" style="text-align:right;">
                        <el-select v-model="formInline.dataValue" style="width:100%" placeholder="请选择数据值">
                            <el-option label="model-composite" value="model-composite"></el-option>
                            <el-option label="mini-composite" value="mini-composite"></el-option>
                            <el-option label="1D" value="1D"></el-option>
                            <el-option label="2D" value="2D"></el-option>
                            <el-option label="2.5D" value="2.5D"></el-option>
                            <el-option label="3D" value="3D"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="11" v-if="item.dataKey==80" style="text-align:right;">
                        <el-select v-model="formInline.dataValue" style="width:100%" placeholder="请选择数据值">
                            <el-option label="单层" value="单层"></el-option>
                            <el-option label="多层" value="多层"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="11" v-if="item.dataKey!=80&&item.dataKey!=12&&subArr[index].dataType!=3&&subArr[index].dataType!=4" style="text-align:right;">
                        <el-input v-model.trim="item.dataValue " style="width:100"></el-input>
                    </el-col>
                    <el-col :span="11" v-if="subArr[index].dataType==4||subArr[index].dataType==3"  style="text-align:right;display:flex;margin-left:-12px;margin-bottom:20px;display:flex">
                        <div class="inputBoxDiv" style="width:88%">
                            <span v-if="!item.dataFile.length" class="updataTip">{{subArr[index].dataType==4?'(请上传cif格式的结构文件)':'(请上传png/jpg/jpeg格式的图片)'}}</span>
                            <span class="fangkuai" v-for="(item,i) in item.dataFile" :key="i">{{item}} <i @click="removeFile(index,i)" class="iconfont iconcuowu"></i> </span>
                        </div>
                        <!-- <el-input v-model="item.dataFile " style="width:382px"></el-input> -->
                        <el-upload
                        class="upload-demo upDataBox"
                        action="0"
                        style="display: flex;width:6%;margin-left:2%"
                        :before-upload="beforeUpload"
                        :file-list="fileList">
                        <el-button @click="shangchuanB(index)" size="small" type="primary">上传</el-button>
                        </el-upload>
                        <!-- <span class="updataTip">{{subArr[index].dataType==4?'(请上传cif格式的结构文件)':'(请上传png/jpg/jpeg格式的图片)'}}</span> -->
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                            <el-input type="textarea" placeholder="请输入数据摘要" :rows="2" v-model="item.dataTips" style="width:100%;margin-top:10px"></el-input>
                    </el-col>
                </el-row>
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
            nowStType:'',
            fileList: [],
            formInline:{
                dataContail:'',
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
            subArr:[
                {classify2:null, dataType:'',dataFile:[],keywordArr:[]}
            ],
            dataClassifyArr:[], // 数据分类
            dataTypeArr:{}, // 数据类型
            keywordArr:[], // 关键词
            dataSourceObj:[], // 来源
            rules:{
                dataSource: [
                    { required: true, message: '请输入数据来源', trigger: 'blur' },
                ],
                dataContail: [
                    { required: true, message: '请输入界面相成分-元素', trigger: 'blur' },
                ],
            },
            nowIndex:0,
            // elementArr:[]
        }
    },
    created(){
        this.getSelectArr()
    },
    methods:{
        dataElementArr(){
            // this.elementArr = this.formInline.dataElement.split(',')
        },
        removeFile(index,i){
            // this.$api.fileDelete(this.subArr[index].dataFile[i]).then(res=>{
            //     console.log(res)
                this.formInline.itemList[index].dataFile.splice(i,1)
            // })
        },
        beforeUpload(file){
            // 61 96
            if(this.formInline.itemList[this.nowIndex].dataKey==37){
                if(this.formInline.itemList[this.nowIndex].dataFile.length==1){
                    this.$message({
                        message: '此关键词中最多只能上传一个文件',
                        type: 'warning'
                    });
                    return
                }
            } else if(this.formInline.itemList[this.nowIndex].dataKey==61||this.formInline.itemList[this.nowIndex].dataKey==96){
                if(this.formInline.itemList[this.nowIndex].dataFile.length==1){
                    this.$message({
                        message: '此关键词中最多只能上传一个图片',
                        type: 'warning'
                    });
                    return
                }
            }else if(this.formInline.itemList[this.nowIndex].dataFile.length==5){
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
                            this.subArr[this.nowIndex].dataFile.push(fd)
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
                if(file.name.indexOf('cif')>0){
                    console.log(file)
                    fd.append('file',file);//传文件
                    this.$api.fileUpData(fd).then(res=>{
                        if(res.data.code==0){
                            this.formInline.itemList[this.nowIndex].dataFile.push(base.sq+res.data.url)
                            this.subArr[this.nowIndex].dataFile.push(fd)
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
                        message: '请上传cif格式的文件',
                        type: 'warning'
                    });
                }

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
                    this.formInline.dataContail = res.data.data.dataContail
                    this.formInline.dataDescription = res.data.data.dataDescription
                    this.formInline.dataSource = res.data.data.list[0].dataKey*1
                    this.formInline.itemList = []
                    this.subArr = []
                    for(var i=1;i<res.data.data.list.length;i++){
                        console.log(res.data.data.list)
                        this.dataSel(res.data.data.list[i].dataTips,i-1,res.data.data.list[i].dataKey)
                        this.subArr.push({
                            classify2:parseInt(res.data.data.list[i].dataClass),
                            dataType:parseInt(res.data.data.list[i].dataKey),
                            dataFile:[],
                            keywordArr:[]  
                        })
                        this.formInline.itemList.push({
                            dataKey :parseInt(res.data.data.list[i].dataKey)||'',
                            dataValue : res.data.data.list[i].dataValue||'',
                            dataTips : res.data.data.list[i].dataTips||'',
                            dataFile : res.data.data.list[i].dataFile||[],
                        })
                    }
                }
                console.log(this.formInline)
            })
            return false  //屏蔽了action的默认上传
        },
        shangchuanB(index){
            this.nowIndex = index
        },
        
        pushArr(){
            console.log('pushArr')
            this.formInline.itemList.push({
                dataKey:'',
                dataValue:'',
                dataTips:'',
                dataFile:[]
            })
            this.subArr.push({classify2:null,dataType:'',dataFile:[],keywordArr:[]})
        },
        saveUpdata(formName){
            let dataSource = this.formInline.dataSource
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
            });
            for(let i=0;i<this.formInline.itemList.length;i++){
                if(this.formInline.itemList[i].dataFile&&this.formInline.itemList[i].dataFile.length){
                    this.formInline.itemList[i].dataValue = this.formInline.itemList[i].dataFile.toString()
                }
                delete this.formInline.itemList[i].dataFile
            }
            // console.log(this.formInline)
            let _itemList = this.formInline.itemList.filter(x=>x.dataKey=='')||[]
            if(_itemList.length>0){
                this.$message({
                    message: '请选择关键词',
                    type: 'warning'
                });
                return false
            }
            this.formInline.itemList.unshift({
                dataKey:2,
                dataValue:dataSource.toString(),
                dataTips:''
            })
            delete this.formInline.dataSource
            // this.formInline.itemList = this.formInline.itemList.toString()
            // console.log(this.formInline)
            // console.log(this.subArr)
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
            })
        },
        
        getSelectArr(){
            this.$api.dataTypelist().then(res=>{
                res.data.data.map(x=>{
                    Object.assign(this.dataTypeArr,{[x.id]:x.paramValue})
                })
            })
            this.$api.dataClassify().then(res=>{
                this.dataClassifyArr = res.data.data
                console.log(res)
            })
            this.$api.getDataSource().then(res=>{ // 数据来源
                this.dataSourceObj = res.data.data
            })
        },
        dataSel(data2,index,dataKey){
            this.subArr[index].keywordArr = []
            this.formInline.itemList[index].dataKey=""
            this.$api.getKeyword({paramType:data2}).then(res=>{
                this.subArr[index].keywordArr = res.data.data
                if(dataKey){
                    this.dataKeyChange(dataKey,index)
                }
            })
        },
        dataKeyChange(e,index){
            let _keywordArr = this.subArr[index].keywordArr.filter(x=>x.structureId==e)
            if(_keywordArr.length>0){
                this.subArr[index].dataType = _keywordArr[0].stType
            }else{
                this.subArr[index].dataType = ''
            }
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
    .upDataBox{
            .el-upload{
                align-self: center
            }
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
        border:1px solid #DCDFE6;
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
    .fangkuai{
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
    .dataTypeClass{
        height: 40px;
        line-height: 40px;
        background: #fff;
        border-radius: 3px;
        text-align: center;
        font-size: 14px;
        color: #999
    }
</style>
