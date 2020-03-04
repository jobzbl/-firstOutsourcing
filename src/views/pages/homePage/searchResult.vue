<template>
    <div class="wrap">
        <div style="margin-top:12px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="elsePage" :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item class="nowPage">搜索结果页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin:30px 0 36px;overflow:hidden;font-size:16px;color:#4d4d4d;">
            <div class="fl">
                <span style="font-weight:bold;">具体结果页：</span>
                <span>界面相材料：</span>
                <span style="color:#33B0B5">BxNySiz,</span>
            </div>
            <div class="fl" style="margin-left:5px">
                <span>数据来源</span>
                <span style="color:#33B0B5">DOI:123343.3435/adbc</span>
            </div>
        </div>
        <div class="subfield">
            <i></i>
            界面相材料晶体结构：
        </div>
        <div style="overflow:hidden">
            <div class="fl crystalImg"></div>
            <div class="fl crystalParameter">
                <div class="parameterTit">品格参数</div>
                <div class="tableBorer">
                    <el-row type="flex" class="row-bg">
                        <el-col :span="6" class="parameterBox bgColor">a (Å)</el-col>
                        <el-col :span="6" class="parameterBox"></el-col>
                        <el-col :span="6" class="parameterBox bgColor">α (°)</el-col>
                        <el-col :span="6" class="parameterBox borNot"><div></div></el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="6" class="parameterBox bgColor">b (Å)</el-col>
                        <el-col :span="6" class="parameterBox"></el-col>
                        <el-col :span="6" class="parameterBox bgColor">β (°)</el-col>
                        <el-col :span="6" class="parameterBox borNot"><div></div></el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg">
                        <el-col :span="6" class="parameterBox bgColor">c (Å)</el-col>
                        <el-col :span="6" class="parameterBox"></el-col>
                        <el-col :span="6" class="parameterBox bgColor">γ (°)</el-col>
                        <el-col :span="6" class="parameterBox borNot"><div></div></el-col>
                    </el-row>
                </div>
                <div class="parameterTit">原子位置(分数坐标)</div>
                <div class="bgColor atomtit">B</div>
                <el-table class="atomTable" :data="tableData" height="130" border style="width: 100%">
                    <el-table-column align="center" prop="x" label="x" width="220"></el-table-column>
                    <el-table-column align="center" prop="y" label="y" width="220"></el-table-column>
                    <el-table-column align="center" prop="z" label="z"></el-table-column>
                </el-table>
                <div class="bgColor atomtit" style="margin-top:30px">N</div>
                <el-table class="atomTable" :data="tableData" height="130" border style="width: 100%">
                    <el-table-column align="center" prop="x" label="x" width="220"></el-table-column>
                    <el-table-column align="center" prop="y" label="y" width="220"></el-table-column>
                    <el-table-column align="center" prop="z" label="z"></el-table-column>
                </el-table>
            </div>
        </div>

        <div class="subfield" style="margin-top:42px">
            <i></i>
            界面相材料电子结构：
        </div>
        <div class="erpTit">
            <div class="fl parameterTit" style="border-right:1px solid #fff;">能带结构</div>
            <div class="fl parameterTit">电子能态密度</div>
        </div>
        <div class="erpBigBox">
            <div class="fl" style="border-right:1px solid #ddd;"><img src="../../../assets/images/take.png" alt=""></div>
            <div class="fl"><img src="../../../assets/images/take.png" alt=""></div>
        </div>
        <div class="subfield" style="margin-top:42px">
            <i></i>
            界面相材料力学性能：
        </div>
        <el-radio-group v-model="tabPosition" class="tabPosition" style="margin-bottom:20px;font-size:16px">
            <el-radio-button label="left">刚度矩阵C<sub>ij </sub>(GPa)</el-radio-button>
            <el-radio-button label="right">柔度矩阵S<sub>ij </sub>(1/GPa)</el-radio-button>
        </el-radio-group>
        <div class="clearFloat clearFloat">
            <div class="fl matrixBigBox">
                <div class="matrixMask"></div>
                <div class="matrixbox">
                    <div class="matrixRowBox" v-for="(item, index) in matrixData" :key="index">
                        <div v-for="(data, index2) in item" :key="index2">{{data}}</div>
                    </div>
                </div>
            </div>
            <div class="fl matrixDataBigBox">
                <div class="matrixRSmallBox fl" v-for="(item, index) in matrixRightData" :key="index">
                    <div class="matrixBgBox" >
                        <span>{{item.name}}</span>
                        <sub>{{item.sub}}</sub>
                        <span>{{item.bracket}}</span>
                    </div>
                    <div>{{item.value}}</div>
                </div>
            </div>
        </div>
        <div class="subfield" style="margin-top:42px">
            <i></i>
            界面相合成：
        </div>
        <div class="hechengBigBox">
            <div class="downIcon"><i></i></div>
            <div><span>界面相合成方法</span>TG-CVI, "Thermal Gradient Chemical vapour infiltration"</div>
            <div><span>界面相合成热处理温度</span>1000 °C</div>
            <div><span>界面相合成原料</span>BF3-NH3-H2</div>
        </div>
        <div class="subfield" style="margin-top:42px">
            <i></i>
            界面相结构和成分：
        </div>
        <div>这有个表</div>
        <div class="erpTit">
            <div class="fl parameterTit" style="border-right:1px solid #fff;width:33%">XRD图谱</div>
            <div class="fl parameterTit" style="border-right:1px solid #fff;width:33%">拉曼吸收峰</div>
            <div class="fl parameterTit" style="width:33%">红外吸收峰</div>
        </div>
        <div class="erpBigBox">
            <div class="fl" style="border-right:1px solid #ddd;width:33%"><img src="../../../assets/images/take.png" alt=""></div>
            <div class="fl" style="border-right:1px solid #ddd;width:33%"><img src="../../../assets/images/take.png" alt=""></div>
            <div class="fl" style="width:33%"><img src="../../../assets/images/take.png" alt=""></div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'searchResult',
    data() {
        return {
            tabPosition:'left',
            tableData:[
                {x:'1',y:'2',z:'3'},
                {x:'1',y:'2',z:'3'},
                {x:'1',y:'2',z:'3'},
            ],
            matrixData: [
                ['','','','','',''],
                ['','','','','',''],
                ['','','','','',''],
                ['','','','','',''],
                ['','','','','',''],
                ['','','','','',''],
            ],
            matrixRightData:[
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
                { name:'体模量 B',sub:'V',bracket:'(GPa)',value:'',allName:'' },
            ]
        }
    },
    created() {

    },
    methods: {

    }
}
</script>
    
<style lang="less">
    .atomTable {
        td{
            padding: 0px!important;
            height: 40px!important;
            line-height: 40px
        }
        th{
            padding: 0px!important;
            height: 40px!important;
            line-height: 40px
        }
    }
    .elsePage .el-breadcrumb__inner{
        font-size:14px!important;
        color:#B2B2B2!important;
        font-weight:500!important;
    }
    .nowPage .el-breadcrumb__inner{
        font-size:14px;
        color:#33B0B5!important;
    }
    .tabPosition .el-radio-button__inner{
        border: none!important
    }
</style>
<style scoped>
    .downIcon{
        width: 60px;
        height: 30px!important;
        border: 1px solid #ddd;
        border-top: none;
        text-align: center;
        position: absolute;
        left: 50%;
        margin-left: 30px;
        bottom: -30px;
    }
    .hechengBigBox{
        position: relative;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
    }
    .hechengBigBox>div{
        height: 40px;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        line-height: 40px;
        font-size: 14px;
        color: #4d4d4d;
    }
    .hechengBigBox span{
        display: inline-block;
        width: 168px;
        padding-left: 15px;
        background: #E2FCF9;
        margin-right: 14px;
        border-right:1px solid #ddd;
        height: 39px;
        font-weight: bold;
    }
    .matrixBgBox{
        background:#E2FCF9;
        border-bottom:1px solid #ddd;
        font-weight:bold
    }
    .matrixRSmallBox div{
        height: 50%;
        text-align: center;
        color: #4d4d4d;
        font-size: 16px;
        line-height: 60px;
    }
    .matrixRSmallBox{
        height: 120px;
        width: 197px;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
    }
    .matrixDataBigBox{
        margin-top: 10px;
        width: 792px;
        height: 360px;
        margin-left: 24px;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
    }
    .matrixRowBox{
        width:360px;
        margin-left: -1px;
    }
    .matrixRowBox div{
        float: left;
        width: 60px;
        height: 60px;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
    }
    .matrixBigBox{
        width: 384px;
        border: 2px solid #33B0B5;
        height: 380px;
        position: relative;
        z-index: 1
    }
    .matrixMask{
        position: absolute;
        left: 15px;
        right: 15px;
        top: -10px;
        height: 400px;
        background: #fff;
        z-index: 2
    }
    .matrixbox{
        position: absolute;
        left: 10px;
        top: 8px;
        height: 360px;
        width: 360px;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        z-index: 3
    }
    .clearFloat{
        overflow: hidden;
    }
    .erpBigBox{
        height: 475px;
        border: 1px solid #ddd;
        border-top: none;
    }
    .erpBigBox div{
        width: 50%;
        height: 100%;
        text-align: center;
        overflow: hidden;
        position: relative;
    }
    .erpBigBox img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        max-width: 100%;
        height: auto;
    }
    .erpTit{
        overflow: hidden;
    }
    .erpTit div{
        width: 50%;
    }
    .tabPosition{
        border-radius: 20px;
        overflow: hidden;
        border:1px solid #33B0B5
    }
    .atomtit{
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        padding-left: 16px;
        border: 1px solid #ddd;
        border-top: none;
    }
    .bgColor{
        background: #E2FCF9;
    }
    .borNot{
        border-right: none!important
    }
    .parameterBox{
        height: 40px;
        text-align: center;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        line-height: 40px;
        font-size: 14px;
    }
    .tableBorer{
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .parameterTit{
        color: #fff;
        font-size: 16px;
        padding: 11px 15px;
        background: #33B0B5
    }
    .crystalParameter{
        width: 660px;
    }
    .crystalImg{
        width: 500px;
        height: 586px;
        background: #000;
        border-radius: 10px;
        margin-right: 37px;
    }
    .subfield{
        border-bottom: 1px dashed rgba(204,204,204,1);
        padding: 2px 12px 12px 12px;
        font-size: 18px;
        color: #4d4d4d;
        position: relative;
        margin-bottom: 20px;
    }
    .subfield i{
        position: absolute;
        top: 0;
        bottom: 8px;
        left: 0;
        display: inline-block;
        width: 4px;
        border-radius: 2px;
        background: #33B0B5
    }
</style>