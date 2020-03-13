<template>
    <div>
    <div class="wrap">
        <div style="margin-top:12px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="elsePage" :to="{ path: '/' }"> <i style="color:#33B0B5" class="iconfont iconiconfontzhizuobiaozhun023101"></i> 首页</el-breadcrumb-item>
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
    </div>
    <div class="wrap" v-for="(data,index) in pageData" :key="index">
        <template v-if="data.classId==7">
            <div class="subfield">
                <i></i>
                界面相材料晶体结构：
            </div>
            <div style="overflow:hidden">
                <div class="fl crystalImg">
                    <img class="fangda" src="../../../assets/images/fangdafff.png" alt="">
                    <img class="xiazai" src="../../../assets/images/downicon.png" alt="">
                </div>
                <div class="fl crystalParameter">
                    <div class="parameterTit">品格参数</div>
                    <div class="tableBorer">
                        <el-row type="flex" class="row-bg">
                            <el-col :span="24">
                                <el-row v-for="itm in paramLenght.dataChildList" :key="itm.dataId">
                                    <el-col :span="12" class="parameterBox bgColor">a (Å)</el-col>
                                    <el-col :span="12" class="parameterBox">{{itm.dataValue}}</el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="24">
                                <el-row v-for="itm in paramAngle.dataChildList" :key="itm.dataId">
                                    <el-col :span="12" class="parameterBox bgColor">{{itm.dataTips}} (°)</el-col>
                                    <el-col :span="12" class="parameterBox">{{itm.dataValue}}</el-col>
                                </el-row>
                            </el-col>
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
        </template>

        <template v-if="data.classId==0">
            <div class="subfield" style="margin-top:42px">
                <i></i>
                界面相材料电子结构：
            </div>
            <div class="erpTit">
                <div class="fl parameterTit" style="border-right:1px solid #fff;">能带结构</div>
                <div class="fl parameterTit">电子能态密度</div>
            </div>
            <div class="erpBigBox">
                <div class="fl" style="border-right:1px solid #ddd;">
                    <img class="fangda" src="../../../assets/images/fangda000.png" alt="">
                    <img src="../../../assets/images/take.png" alt="">
                </div>
                <div class="fl">
                    <img class="fangda" src="../../../assets/images/fangda000.png" alt="">
                    <img src="../../../assets/images/take.png" alt="">
                </div>
            </div>
        </template>

        <template v-if="data.classId==8">
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
                    <div class="matrixbox borderTL">
                        <div class="matrixRowBox" v-for="(item, index) in matrixData" :key="index">
                            <div v-for="(data, index2) in item" :key="index2">{{data}}</div>
                        </div>
                    </div>
                </div>
                <div class="fl matrixDataBigBox borderTL">
                    <div v-for="item in data.keyParentList" :key="item.dataKey">
                        <div class="matrixRSmallBox fl" v-if="item.dataKey!=31&&item.dataKey!=32">
                            <div class="matrixBgBox" >
                                <span>{{item.dataKeyName}}</span>
                                <!-- <sub>{{item.sub}}</sub> -->
                                <!-- <span>{{item.bracket}}</span> -->
                            </div>
                            <div>{{item.dataValue}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-if="data.classId==10">
            <div class="subfield" style="margin-top:42px">
                <i></i>
                界面相合成：
            </div>
            <div class="hechengBigBox borderTL" :style="data.keyParentList.length>10?'overflow-y: scroll;':''">
                <div v-if="data.keyParentList.length>3" @click="classId10=!classId10" class="downIcon"><img :style="!classId10?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                <div v-for="(item, index) in data.keyParentList" :key="index">
                    <div class="hechengRowBox" v-if="classId10?index<3:true">
                        <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                    </div>
                </div>

                <!-- <div><span>界面相合成热处理温度</span>1000 °C</div> -->
                <!-- <div><span>界面相合成原料</span>BF3-NH3-H2</div> -->
            </div>
        </template>
        
        <template v-if="data.classId==9">
            <div class="subfield" style="margin-top:42px">
                <i></i>
                界面相结构和成分：
            </div>
            <div class="chengfenTable borderTL">
                <ul class="chengfenTitle clearFloat">
                    <li>
                        <span style="right:4px;top:4px">成分</span>
                        <span style="left:4px;bottom:4px">表征方法</span>
                        <span class="hr"></span>
                    </li>
                    <li>B</li><li>N</li><li>O</li><li>--</li><li>--</li>
                </ul>
                <ul class="chengfenTrs clearFloat" v-for="(data,index) in chenfenTable" :key="index">
                    <li>{{data.name}}</li>
                    <li v-for="(item,i) in data.data" :key="i">{{item}}</li>
                </ul>
            </div>
            <div class="erpTit">
                <div class="fl parameterTit" style="border-right:1px solid #fff;width:33%">XRD图谱</div>
                <div class="fl parameterTit" style="border-right:1px solid #fff;width:33%">拉曼吸收峰</div>
                <div class="fl parameterTit" style="width:33%">红外吸收峰</div>
            </div>
            <div class="erpBigBox">
                <div class="fl" style="border-right:1px solid #ddd;width:33%"><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/take.png" alt=""></div>
                <div class="fl" style="border-right:1px solid #ddd;width:33%"><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/take.png" alt=""></div>
                <div class="fl" style="width:33%"><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/take.png" alt=""></div>
            </div>
            <div class=" parameterTit" style="border-right:1px solid #fff;margin-top:20px">界面相形貌</div>
            <div class="xingmaoBorder">
                <div class="hechengBigBox borderTL">
                    <div v-for="(item, index) in data.keyParentList" :key="index">
                        <div class="hechengRowBox" v-if="item.dataKey==4||item.dataKey==5">
                            <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                        </div>
                    </div>
                </div>
                <div class="borderTL imgDatailsList">
                    <ul class="clearFloat">
                        <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                        <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                        <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                        <li class="nomore"><img src="../../../assets/images/nomore.png" alt=""></li>
                        <li class="nomore"><img src="../../../assets/images/nomore.png" alt=""></li>
                    </ul>
                </div>
            </div>
        </template>
        <template v-if="data.classId==11">
            <div class="subfield" style="margin-top:42px">
                <i></i>
                复合材料结构和成分:
            </div>
            <div class="hechengBigBox borderTL" :style="data.keyParentList.length>10?'overflow-y: scroll;':''">
                <div v-if="data.keyParentList.length>3" @click="classId11=!classId11" class="downIcon"><img :style="!classId11?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                <div v-for="(item, index) in data.keyParentList" :key="index">
                    <div class="hechengRowBox" v-if="classId11?index<3:true">
                        <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                    </div>
                </div>
            </div>
        </template>

        <template v-if="data.classId==13">
            <div class="subfield" style="margin-top:42px">
                <i></i>
                界面力学性能：
            </div>
            <div class="hechengBigBox borderTL" :style="data.keyParentList.length>10?'overflow-y: scroll;':''">
                <div v-if="data.keyParentList.length>3" @click="classId13=!classId13" class="downIcon"><img :style="!classId13?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                <div v-for="(item, index) in data.keyParentList" :key="index">
                    <div class="hechengRowBox" v-if="classId13?index<3:true">
                        <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                    </div>
                </div>
            </div>
            <div class="borderTL imgDatailsList" style="margin-top:50px;">
                <ul class="clearFloat">
                    <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                    <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                    <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                    <li class="nomore"><img src="../../../assets/images/nomore.png" alt=""></li>
                    <li class="nomore"><img src="../../../assets/images/nomore.png" alt=""></li>
                </ul>
            </div>
        </template>

        <template v-if="data.classId==14">
            <div class="subfield" style="margin-top:42px">
                <i></i>
                复合材料力学性能：
            </div>
            
            <div class="hechengBigBox borderTL" :style="data.keyParentList.length>10?'overflow-y: scroll;':''">
                <div v-if="data.keyParentList.length>3" @click="classId14=!classId14" class="downIcon"><img :style="!classId14?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                <div v-for="(item, index) in data.keyParentList" :key="index">
                    <div class="hechengRowBox" v-if="classId14?index<3:true">
                        <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                    </div>
                </div>
            </div>
            <div class="borderTL imgDatailsList" style="margin-top:50px;">
                <ul class="clearFloat">
                    <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                    <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                    <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                    <li class="nomore"><img src="../../../assets/images/nomore.png" alt=""></li>
                    <li class="nomore"><img src="../../../assets/images/nomore.png" alt=""></li>
                </ul>
            </div>
        </template>

        <template v-if="data.classId==15">
            <div class="subfield" style="margin-top:42px">
                <i></i>
                复合材料抗氧化性能：
            </div>
            <div class="hechengBigBox borderTL" :style="data.keyParentList.length>10?'overflow-y: scroll;':''">
                <div v-if="data.keyParentList.length>3" @click="classId15=!classId15" class="downIcon"><img :style="!classId15?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                <div v-for="(item, index) in data.keyParentList" :key="index">
                    <div class="hechengRowBox" v-if="classId15?index<3:true">
                        <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                    </div>
                </div>
            </div>
            <div class="borderTL imgDatailsList" style="margin-top:50px;margin-bottom:250px">
                <ul class="clearFloat">
                    <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                    <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                    <li><img class="fangda" src="../../../assets/images/fangda000.png" alt=""><img src="../../../assets/images/img123.png" alt=""></li>
                    <li class="nomore"><img src="../../../assets/images/nomore.png" alt=""></li>
                    <li class="nomore"><img src="../../../assets/images/nomore.png" alt=""></li>
                </ul>
            </div>
        </template>
    </div>
    </div>
</template>

<script>
export default {
    name: 'searchResult',
    data() {
        return {
            classId10:true,
            classId11:true,
            classId14:true,
            classId15:true,
            classId13:true,
            pageData:[],
            chenfenTable:[
                {name:'名义',data:['--','--','--','--','--']},
                {name:'XPS',data:['23','45','54','--','--']},
                {name:'AES',data:['23','34','55','--','--']},
                {name:'EELS',data:['23','56','34','--','--']},
                {name:'--',data:['--','--','--','--','--']},
            ],
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
            ],
            searchKeyWord:this.$route.query.id,
            paramLenght:{dataChildList:[]},
            paramAngle:{dataChildList:[]},
            paramPositionB:[{x:'',y:'',z:''}],
            paramPositionN:[{x:'',y:'',z:''}],
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(){
            this.$api.searchResult({dataContail:this.searchKeyWord}).then(res=>{
                var resData = res.data.data
                this.pageData = resData
                for(var i=0;i<resData.length;i++){
                    if(resData[i].classId==7){
                        this.paramLenght = resData[i].keyParentList.filter(x=>x.dataKey==27)[0]
                        this.paramAngle = resData[i].keyParentList.filter(x=>x.dataKey==28)[0]
                        // this.paramPositionB = resData[i].keyParentList.filter(x=>x.dataKey==29)[0].dataChildList.filter(x=>x.dataDescription=='B')
                        // this.paramPositionB.x = resData[i].keyParentList.filter(x=>x.dataKey==29)[0].dataChildList.filter(x=>x.dataDescription=='B').filter(x=>x.dataTips=='x')[0].dataValue
                        // this.paramPositionB.y = resData[i].keyParentList.filter(x=>x.dataKey==29)[0].dataChildList.filter(x=>x.dataDescription=='B').filter(x=>x.dataTips=='y')[0].dataValue
                        // this.paramPositionB.z = resData[i].keyParentList.filter(x=>x.dataKey==29)[0].dataChildList.filter(x=>x.dataDescription=='B').filter(x=>x.dataTips=='z')[0].dataValue
                        
                        // this.paramPositionN.x = resData[i].keyParentList.filter(x=>x.dataKey==29)[0].dataChildList.filter(x=>x.dataDescription=='N').filter(x=>x.dataTips=='x')[0].dataValue
                        // this.paramPositionN.y = resData[i].keyParentList.filter(x=>x.dataKey==29)[0].dataChildList.filter(x=>x.dataDescription=='N').filter(x=>x.dataTips=='y')[0].dataValue
                        // this.paramPositionN.z = resData[i].keyParentList.filter(x=>x.dataKey==29)[0].dataChildList.filter(x=>x.dataDescription=='N').filter(x=>x.dataTips=='z')[0].dataValue
                        
                    }
                }
            })
        }
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
    .imgDatailsList{
        margin-top: 20px;
        height: 409px;
        overflow: hidden;
    }
    .imgDatailsList img{
        width: 100%;
        height: auto;
    }
    .imgDatailsList .fangda{
        position: absolute;
        top: 10px;
        right: 10px;
        width: auto;
    }
    .nomore img{
        width: 148px;
        height: auto;
        position: absolute;
        top: 50%;
        transform:translate(-50%,-50%);
        left: 50%;
    }
    .imgDatailsList li{
        position: relative;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        width: 233px;
        height: 100%;
        float: left;
        padding-top: 60px;
        text-align:center;
    }
    .imgDatailsList ul{
        width: 1205px;
        height: 100%;
    }
    .borderTL{
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
    }
    .xingmaoBorder{
        border: 1px solid #ddd;
        border-top: none;
        padding: 21px 16px 23px 16px;
    }
    .chengfenTrs li{
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        height: 40px;
        line-height: 40px;
        width: 211px;
        text-align: center;
        font-size: 14px;
        color: #4d4d4d;
        float: left;
    }
    .chengfenTrs>:first-child{
        width: 143px;
        background: #E2FCF9;
        color: #4D4D4D;
        position: relative;
    }
    .chengfenTitle .hr{
        width: 120%;
        border-top: 1px solid #fff;
        height: 0;
        left: 0;
        top: 0;
        transform: rotate(20deg);
        transform-origin:top left;
    }
    .chengfenTitle span{
        position: absolute;
        line-height: 20px!important;
        font-size: 16px;
    }
    .chengfenTitle{
        height: 53px;
        line-height: 53px;
    }
    .chengfenTitle li{
        text-align: center;
        height: 53px;
        line-height: 53px;
        border-bottom: 1px solid #ddd;
        border-right:1px solid #ddd;
        width: 211px;
        float: left;
        background: #E2FCF9;
        color: #4d4d4d;
        font-size: 14px;
        font-weight: bold;
    }
    .chengfenTitle>:first-child{
        width: 143px;
        background: #33B0B5;
        color: #fff;
        position: relative;
    }
    .chengfenTable{
        margin-bottom: 20px;
    }
    .downIcon{
        width: 60px;
        height: 30px!important;
        border-top: none;
        text-align: center;
        position: absolute;
        left: 50%;
        margin-left: 30px;
        bottom: -30px;
    }
    .hechengBigBox{
        position: relative;
        max-height:400px;
    }
    .hechengBigBox .hechengRowBox{
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
    .erpBigBox .fangda{
        transform:translate(0,0)!important;
        right: 10px!important;
        top: 10px!important;
        left:unset
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
        position: relative;
    }
    .crystalImg img{
        position: absolute;
    }
    .crystalImg .fangda{
        top: 24px;
        right: 24px;
    }
    .crystalImg .xiazai{
        bottom: 24px;
        right: 24px;
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