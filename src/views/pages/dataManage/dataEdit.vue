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
            <el-button style="background:none;color:#33B0B5" @click="shangchuanB()" size="small" type="primary"><i class="iconfont iconshangchuan"></i>上传更新数据</el-button>
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
                        <div style="padding:0" v-if="scope.row.typeName=='图片'">
                            <img :src="scope.row.dataValue" alt="" style="max-height:100px;max-width:100%;" @dblclick="editSpan1C(scope.row)">
                            <el-upload
                            :style="scope.row.status?'display:none':'display:block'"
                            class="upload-demo upDataBox"
                            action="0"
                            :before-upload="beforeUpload2"
                            :file-list="fileList2">
                            <el-button @click="shangchuanB()" size="small" type="primary">替换图片</el-button>
                            </el-upload>
                            <!-- style="visibility: hidden;" -->

                            <!-- <span :style="scope.row.status?'display:block':'display:none'" class="editSpan" @dblclick="editSpan1C(scope.row)">{{scope.row.dataValue}}</span> -->
                            <!-- <input :style="scope.row.status?'display:none':'display:block'" class="editInput" type="text" v-model="scope.row.dataValue"> -->
                            <!-- <i @click="clearCon(scope.row,'status')" class="iconfont iconguanbi" :style="scope.row.status?'display:none':'display:block'"></i>
                            <i @click="saveData(scope.row)" class="iconfont icondui1" :style="scope.row.status?'display:none':'display:block'"></i> -->
                        </div>
                        <div style="padding:0" v-if="scope.row.typeName!='图片'">
                            <span :style="scope.row.status?'display:block':'display:none'" class="editSpan" @dblclick="editSpan1C(scope.row)">{{scope.row.dataValue}}</span>
                            <input :style="scope.row.status?'display:none':'display:block'" class="editInput" type="text" v-model="scope.row.dataValue">
                            <i @click="clearCon(scope.row,'status')" class="iconfont iconguanbi" :style="scope.row.status?'display:none':'display:block'"></i>
                            <i @click="saveData(scope.row,'status')" class="iconfont icondui1" :style="scope.row.status?'display:none':'display:block'"></i>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="数据摘要">
                    <template slot-scope="scope">
                        <div style="padding:0">
                            <span :style="scope.row.dataContent?'display:block':'display:none'" class="editSpan" @dblclick="editSpan2C(scope.row)">{{scope.row.dataTips}}</span>
                            <input :style="scope.row.dataContent?'display:none':'display:block'" class="editInput" type="text" v-model="scope.row.dataTips">
                            <i @click="clearCon(scope.row,'dataContent')" class="iconfont iconguanbi" :style="scope.row.dataContent?'display:none':'display:block'"></i>
                            <i @click="saveData(scope.row,'dataContent')" class="iconfont icondui1" :style="scope.row.dataContent?'display:none':'display:block'"></i>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paginationDiv2">
                <span style="font-size:14px;float:left;height:40px;line-height:40px">
                    共<span style="color:#33B0B5">18</span>条数据，当前页显示 <span style="color:#33B0B5">10</span> 条树
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
export default {
    name:'dataEdit',
    data(){
        return {
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
            nowRowData:''
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
                this.saveData(this.nowRowData,'status')
            })
            return false
        },
        beforeUpload(file){
            let fd = new FormData();
            fd.append('file',file);//传文件
            this.$api.upFile(fd).then(res=>{
                console.log(res)
                // this.formInline.itemList[this.nowIndex].dataFile.push(res.data.url)
                // this.sub[this.nowIndex].dataFile.push(fd)
            })
            return false  //屏蔽了action的默认上传
        },
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
                if(res.data.msg==='success'){
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
                data.dataContent = true
            }
            for(let i=0;i<this.saveArr.itemList.length;i++){
                if(this.saveArr.itemList[i].dataId == data.dataId){
                    this.saveArr.itemList.splice(i,1)
                }
            }
            setTimeout(() => {
                this.saveArr.itemList.push({
                    dataId: data.dataId,
                    dataValue: data.dataValue,
                    dataTips: data.dataTips
                })
            console.log(this.saveArr)
            });
        },
        getListdata(){
            console.log(this.type)
            console.log(this.$route.query.id)
            this.$api.getDataOne(this.$route.query.id,{page:this.tableData.currPage,limit:this.tableData.pageSize,}).then(res=>{ // 数据来源
                this.tableData = res.data.page
                for(let i=0;i<this.tableData.list.length;i++){
                    this.tableData.list[i].status = true
                    this.tableData.list[i].dataContent = true
                }
                console.log(res)
            })
        },
        editSpan1C(data){
            if(this.type=='edit'){
                data.status = false
                if(data.typeName=='图片'){
                    console.log('')
                    this.nowRowData = data
                }
            }
        },
        editSpan2C(data){
            if(this.type=='edit'){
                data.dataContent = false
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
        top: 50%;
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
