<template>
    <div class="wrap">
        <div style="margin-top:12px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="elsePage" :to="{ path: '/dataManage' }"> <i style="color:#33B0B5" class="iconfont iconiconfontzhizuobiaozhun023101"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item class="nowPage">数据编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="buttonRow buttonRowEdit">
            <el-button> <i class="iconfont iconwenjian"></i> 选择文件格式</el-button>
            <el-button> <i class="iconfont iconshangchuan"></i> 上传更新数据</el-button>
        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" header-row-class-name="tableHeader" :data="tableData" tooltip-effect="dark" style="width: 100%" 
                @selection-change="handleSelectionChange" border row-class-name="tableTr">
                <el-table-column prop="dataNumber" label="数据关键字词" width="239"></el-table-column>
                <el-table-column prop="chenfen" label="数据类型" width="214"></el-table-column>
                <el-table-column prop="dataClass" label="数据值" width="344"></el-table-column>
                <el-table-column prop="dataFrom" label="数据摘要"></el-table-column>
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
        <div class="dateEditSeaveBox">
            <el-button @click="close('editDataForm')">保存</el-button>
            <el-button type="primary" @click="submitForm('editDataForm')">提交数据</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'dataEdit',
    data(){
        return {
            tableData:[
                {
                    dataNumber:'12',
                    chenfen:'123',
                    dataClass:'qwe',
                    dataFrom:'qwe',
                    dataType:'qwe'
                }
            ],
        }
    },
    methods:{
        handleSelectionChange(){},
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        },
    }
    
}
</script>
<style lang="less">
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
