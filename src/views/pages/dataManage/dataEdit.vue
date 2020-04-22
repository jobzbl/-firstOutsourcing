<template>
    <div class="wrap">
        <div style="margin-top:12px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="elsePage" :to="{ path: '/dataManage' }"> <i style="color:#33B0B5" class="iconfont iconiconfontzhizuobiaozhun023101"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item class="nowPage">{{type=='edit'?'数据编辑':'数据查看'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="buttonRow buttonRowEdit" v-if="type=='edit'">
            <!-- <el-button> <i class="iconfont iconwenjian"></i> 选择文件格式</el-button> -->
            <el-upload
            class="upload-demo upDataBox"
            action="0"
            :before-upload="beforeUpload"
            :file-list="fileList">
            <el-button style="background:none;color:#33B0B5" @click="shangchuanB()" size="small" type="primary"><i class="iconfont iconshangchuan" style="color:#fff"></i>上传更新数据</el-button>
            </el-upload>
            <!-- <el-button> <i class="iconfont iconshangchuan"></i> 上传更新数据</el-button> -->
        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" header-row-class-name="tableHeader" :data="tableData.list" tooltip-effect="dark" style="width: 100%" 
                @selection-change="handleSelectionChange" border row-class-name="tableTr" class="tableEdit">
                <el-table-column label="数据关键字词" width="239">
                    <template slot-scope="scope">
                        <div style="background:#F7F7F7">
                            {{scope.row.keyName}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="数据类型" width="214">
                     <template slot-scope="scope">
                        <div style="background:#F7F7F7">
                            {{scope.row.typeName}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="数据值" width="344">
                    <template slot-scope="scope">
                        <!-- <div></div> -->
                        <div style="padding:0" v-if="scope.row.typeName=='图片'" @dblclick="editSpan1C(scope.row)">
                            <img :src="base.sq+scope.row.dataValue" alt="" style="max-height:100px;max-width:100%;">
                            <el-upload
                            :style="scope.row.status?'display:none':'display:block'"
                            class="upload-demo upDataBox"
                            action="0"
                            :before-upload="beforeUpload2"
                            :file-list="fileList2">
                            <el-button @click="shangchuanB()" size="small" type="primary">替换{{scope.row.typeName}}</el-button>
                            </el-upload>
                        </div>
                        <div style="padding:0" v-if="scope.row.typeName=='文件'" @dblclick="editSpan1C(scope.row)">
                            <span>{{scope.row.dataValue}}</span>
                            <el-upload
                            :style="scope.row.status?'display:none':'display:block'"
                            class="upload-demo upDataBox"
                            action="0"
                            :before-upload="beforeUpload2"
                            :file-list="fileList2">
                            <el-button @click="shangchuanB()" size="small" type="primary">替换{{scope.row.typeName}}</el-button>
                            </el-upload>
                        </div>
                        <div style="padding:0" v-if="scope.row.typeName!='图片'&&scope.row.typeName!='文件'">
                            <span v-if="scope.row.status" class="editSpan" @dblclick="editSpan1C(scope.row)">{{scope.row.dataKey!=2?scope.row.dataValue:dataSourceObj[scope.row.dataValue+'']}}</span>
                            <input v-if="scope.row.dataKey!=2&&scope.row.dataKey!=1&&!scope.row.status" class="editInput" type="text" v-model="scope.row.dataValue">
                            <el-select v-if="scope.row.dataKey==2&&!scope.row.status" clearable v-model="scope.row.dataValue" style="width:80%;padding-left:10px;padding-top:25px" placeholder="请选择界面相类型">
                                <el-option v-for="item in dataSourceObjArr" :key="item.id" :label="item.paramValue" :value="item.id"></el-option>
                            </el-select>
                            <el-select v-if="scope.row.dataKey==1&&!scope.row.status" clearable v-model="scope.row.dataValue" style="width:80%;padding-left:10px;padding-top:25px" placeholder="请选择界面相类型">
                                <el-option label="BN" value="BN"></el-option>
                                <el-option label="C" value="C"></el-option>
                                <el-option label="RE2SiO5" value="RE2SiO5"></el-option>
                                <el-option label="RE2Si2O7" value="RE2Si2O7"></el-option>
                                <el-option label="BN/SiC" value="BN/SiC"></el-option>
                                <el-option label="BN/C" value="BN/C"></el-option>
                                <el-option label="C/SiC" value="C/SiC"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                            <i @click="clearCon(scope.row,'status')" class="iconfont iconguanbi" :style="scope.row.status?'display:none':'display:block'"></i>
                            <i @click="saveData(scope.row,'status')" class="iconfont icondui1" :style="scope.row.status?'display:none':'display:block'"></i>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="数据摘要">
                    <template slot-scope="scope">
                        <div style="padding:0">
                            <span v-if="scope.row.params" class="editSpan" @dblclick="editSpan2C(scope.row)">{{scope.row.dataTips}}</span>
                            <input v-if="!scope.row.params" class="editInput" type="text" v-model="scope.row.dataTips">
                            <i @click="clearCon(scope.row,'params')" class="iconfont iconguanbi" :style="scope.row.params?'display:none':'display:block'"></i>
                            <i @click="saveData(scope.row,'params')" class="iconfont icondui1" :style="scope.row.params?'display:none':'display:block'"></i>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paginationDiv2">
                <span style="font-size:14px;float:left;height:40px;line-height:40px">
                    共<span style="color:#33B0B5">18</span>条数据，当前页显示 <span style="color:#33B0B5">10</span> 条数据
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
        <div class="dateEditSeaveBox" v-if="type=='edit'">
            <el-button class="lingleibaocun" @click="close('save')">保存</el-button>
            <el-button type="primary" @click="close('back')">提交数据</el-button>
        </div>
    </div>
</template>
<script>
import base from '../../../request/base'; // 导入接口域名列表
export default {
    name:'dataEdit',
    data(){
        return {
            dataSourceObj:localStorage.getItem('dataSourceObj')||{},
            dataSourceObjArr:[],
            base:base,
            fileList2:[],
            fileList: [],
            tableData:{
                totalCount:0,
                pageSize:10,
                totalPage:0,
                currPage:1,
                list:[]
            },
            saveArr:{
                flag:'updata',
                itemList:[]
            },
            type:this.$route.query.type,
            nowRowData:{}
        }
    },
    created(){
        this.getListdata()
    },
    methods:{
        beforeUpload2(file){
            let fd = new FormData();
            fd.append('file',file);//传文件
            this.$api.fileUpData(fd).then(res=>{
                this.fileList2.push(fd)
                this.nowRowData.dataValue = res.data.url
                console.log(this.nowRowData)
                this.saveData(this.nowRowData,'status')
            })
            return false
        },
        getListdata(){
            this.$api.getDataSource().then(res=>{ // 数据来源
                this.dataSourceObjArr = res.data.data
                var _dataSourceObj = {}
                res.data.data.map(x=>{
                    Object.assign(_dataSourceObj,{[x.id.toString()]: x.paramValue})
                })
                this.dataSourceObj = _dataSourceObj
            })
            this.$api.getDataOne(this.$route.query.id,{page:this.tableData.currPage,limit:this.tableData.pageSize,}).then(res=>{ // 数据来源
                this.tableData = res.data.page
                for(let i=0;i<this.tableData.list.length;i++){
                    if(this.tableData.list[i].dataKey==2){
                        this.tableData.list[i].dataValue = this.tableData.list[i].dataValue*1
                    }
                    this.tableData.list[i].status = true
                    this.tableData.list[i].params = true
                }
                console.log(res.data.page.list)
            })
        },
        beforeUpload(file){
            let fd = new FormData();
            fd.append('file',file);//传文件
            this.$api.bulkImport(fd).then(res=>{
                if(res.data.code==-1){
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }else{
                    let resData = res.data.data
                    this.tableData.pageSize = 200
                    this.tableData.list = []
                    for(let i=0;i<resData.list.length;i++){
                        if(resData.list[i].dataClass==''){
                            this.tableData[i].dataKey = '2';
                            this.tableData[i].dataValue = resData.list[i].dataKey
                        }
                        this.tableData[i].dataKey = resData.list[i].dataKey
                        this.tableData[i].dataKey = resData.list[i].dataKey

                    }
                }
                //     this.formInline.dataContail = res.data.data.dataContail
                //     this.formInline.dataDescription = res.data.data.dataDescription
                //     this.formInline.dataSource = res.data.data.list[0].dataKey*1
                //     this.formInline.itemList = []
                //     this.subArr = []
                //     for(var i=1;i<res.data.data.list.length;i++){
                //         console.log(res.data.data.list)
                //         this.dataSel(res.data.data.list[i].dataTips,i-1,res.data.data.list[i].dataKey)
                //         this.subArr.push({
                //             classify2:parseInt(res.data.data.list[i].dataClass),
                //             dataType:parseInt(res.data.data.list[i].dataKey),
                //             dataFile:[],
                //             keywordArr:[]  
                //         })
                //         this.formInline.itemList.push({
                //             dataKey :parseInt(res.data.data.list[i].dataKey)||'',
                //             dataValue : res.data.data.list[i].dataValue||'',
                //             dataTips : res.data.data.list[i].dataTips||'',
                //             dataFile : res.data.data.list[i].dataFile||[],
                //         })
                //     }
                // }
                console.log(this.formInline)
                console.log(res)
            })
            return false
        },
        // beforeUpload(file){
        //     let fd = new FormData();
        //     fd.append('file',file);//传文件
        //     this.$api.upFile(fd).then(res=>{
        //         console.log(res)
        //         // this.formInline.itemList[this.nowIndex].dataFile.push(res.data.url)
        //         // this.sub[this.nowIndex].dataFile.push(fd)
        //     })
        //     return false  //屏蔽了action的默认上传
        // },
        shangchuanB(){

        },
        clearCon(data,val){
            console.log(data)
            console.log(val)

            if(val == 'status'){
                data.dataValue = ''
            }else{
                data.dataTips=''
            }
        },
        close(type){
            this.$api.eidtSave(this.saveArr).then(res=>{ // 数据来源
                if(res.data.code==0){
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    if(type=='back'){
                        setTimeout(() => {
                                this.$router.push('/dataManage')
                        }, 1000);
                    } 
                    this.getListdata()
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }
                   
            })
        },
        saveData(data,val){
            if(val == 'status'){
                data.status = true
            }else{
                data.params = true
            }
            for(let i=0;i<this.saveArr.itemList.length;i++){
                if(this.saveArr.itemList[i].dataKey == data.dataKey){
                    this.saveArr.itemList.splice(i,1)
                }
            }
            setTimeout(() => {
                this.saveArr.itemList.push({
                    dataKey: data.dataKey,
                    dataValue: data.dataValue,
                    dataTips: data.dataTips
                })
            console.log(this.saveArr)
            });
        },
        
        editSpan1C(data){
            if(this.type=='edit'){
                data.status = false
                if(data.typeName=='图片'||data.typeName=='文件'){
                    console.log('')
                    console.log(data)
                    this.nowRowData = data
                }
            }
        },
        editSpan2C(data){
            console.log(data)
            if(this.type=='edit'){
                data.params = false
            }
        },
        // 
        handleSelectionChange(){},
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.getListdata()
        console.log(`当前页: ${val}`);
        },
    }
    
}
</script>
<style lang="less">
    .lingleibaocun .el-button--primary:hover,.lingleibaocun .el-button--primary:focus,{
        color: #33B0B5!important
    }
    .tableEdit{
        .el-table__row{
            td{
                
                padding: 0!important;
                height:54px;
            }
            .cell{
                height: 100%;
                width: 100%;
                padding: 0!important;
                position: relative;
                div{
                    padding: 12px 0;
                    height: 100%;
                }
            }
        }
    }
 .buttonRowEdit{
    button{
        color:#33B0B5;
        height: 36px;
        line-height: 36px;
        padding-top: 0;
        padding-bottom:0;
        font-size:16px;
    }
 }
</style>

<style scoped>
    
    .icondui1,.iconguanbi{
        position: absolute;
        top: 25%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    .icondui1{
        right: 10px;
    }
    .iconguanbi{
        right: 40px;
        font-size: 12px;
    }
    .editInput{
        border: none;
        height: 100%;
        width: 100%;
        outline: none;
        text-align:center;
    }
    .editSpan{
        display: inline-block;
        height: 100%;
        width: 100%;
        text-align: center;
        line-height: 53px;
    }
    .dateEditSeaveBox{
        width: 430px;
        display: flex;
        justify-content: space-between;
        margin: 60px auto;
    }
    .dateEditSeaveBox button{
        width: 180px;
        height: 40px;
        line-height: 40px;
        padding: 0;
        
    }
    .buttonRow i{
        color: #33B0B5;
        font-size:18px;
    }
    .buttonRow{
        text-align: right;
    }
</style>
