<template>
    <div style="padding-bottom:60px;">
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
                <span style="color:#33B0B5">{{dataContail}},</span>
            </div>
            <div class="fl" style="margin-left:5px">
                <span>数据来源：</span>
                <span style="color:#33B0B5">{{dataSourceObj[source]}}</span>
            </div>
        </div>
    </div>
    <template v-for="(data1,index) in pageData">
        <template v-if="data1.classId==7">
            <div class="wrap" :key="index">
                <div class="subfield">
                    <i></i>
                    界面相材料晶体结构：
                </div>
                <div style="overflow:hidden" v-if="data1.keyParentList.length">
                    <div class="fl crystalImg">
                        <a href="javascript:void(0)"
                        onclick="window.open(&quot;https://chemapps.stolaf.edu/jmol/jmol.php?model=acetone&amp;width=100%&amp;height=100%&amp;script=background+white%3Brotate+x+180&amp;caption=acetone&quot;,&quot;&quot;,&quot;width=600,height=600,scrollbars=no&quot;)">点击跳转到晶体模型</a>
                        <img class="fangda" src="../../../assets/images/fangdafff.png" alt="">
                        <!-- <v-html-panel name="iframe" style="width:100%;height:100%;" url.asyc="file:///C:/Users/dell/Desktop/html.html"></v-html-panel> -->
                        <!-- <a href="https://chemapps.stolaf.edu/jmol/jmol.php?model=acetone&width=50%&height=50%&script=background+white%3Brotate+x+180&caption=acetone">asd</a> -->
                        <!-- <script type="text/javascript" src="https://chemapps.stolaf.edu/jmol/jmol.php?model=acetone&link=3D model"></script> -->
                        <iframe style="height:100%;width:100%" src="https://chemapps.stolaf.edu/jmol/jmol.php?model=acetone&amp;width=100%&amp;height=100%&amp;script=background+white%3Brotate+x+180&amp;caption=acetone&quot;,&quot;&quot;,&quot;width=600,height=600,scrollbars=no&quot;"></iframe>
                        <img class="xiazai" src="../../../assets/images/downicon.png" alt="">
                    </div>
                    <div class="fl crystalParameter">
                        <div class="parameterTit">品格参数</div>
                        <div class="tableBorer">
                            <el-row type="flex" class="row-bg">
                                <el-col :span="24" v-if="paramLenght&&paramLenght.dataChildList">
                                    <el-row v-for="itm in paramLenght.dataChildList" :key="itm.dataId">
                                        <el-col :span="12" class="parameterBox bgColor">a (Å)</el-col>
                                        <el-col :span="12" class="parameterBox">{{itm.dataValue}}</el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="24" v-if="paramAngle&&paramAngle.dataChildList">
                                    <el-row v-for="itm in paramAngle.dataChilldList" :key="itm.dataId">
                                        <el-col :span="12" class="parameterBox bgColor">{{itm.dataTips}} (°)</el-col>
                                        <el-col :span="12" class="parameterBox">{{itm.dataValue}}</el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="parameterTit">原子位置(分数坐标)</div>
                        <template v-for="(item,index) in data1.keyParentList" >
                            <div v-if="item.dataKey == 29" :key="index">
                                <template v-for="(itm,i) in item.dataChildList">
                                    <div class="bgColor atomtit" :key="i" :style="i==0?'':'margin-top:30px'">{{itm.dataKey}}</div>
                                    <ul class="yuanziAddressUl" :key="i">
                                        <li v-for="(li,ai) in itm.tempList" :key="ai">
                                            <div>{{li.dataTips}}</div>
                                            <div>{{li.dataValue}}</div>
                                        </li>
                                    </ul>
                                </template>
                            </div>
                        </template>
                        <!-- <div class="bgColor atomtit" style="margin-top:30px">N</div>
                        <ul class="yuanziAddressUl">
                            <li>
                                <div>x</div>
                                <div>1</div>
                            </li>
                            <li>
                                <div>y</div>
                                <div>2</div>
                            </li>
                            <li>
                                <div>z</div>
                                <div>3</div>
                            </li>
                        </ul> -->
                    </div>
                </div>
            </div>
        </template>
    </template>
    <template v-for="(data2,index) in pageData">
        <template v-if="data2.classId==29">
            <div class="wrap" :key="index">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    界面相材料电子结构：
                </div>
                <div class="erpTit" v-if="data2.keyParentList.length">
                    <div v-for="(item,index) in data2.keyParentList" :key="index" class="fl parameterTit" :style="index==0?'border-right:1px solid #fff':''">{{item.dataKeyName}}</div>
                    <!-- <div class="fl parameterTit">电子能态密度</div> -->
                </div>
                <div class="erpBigBox" v-if="data2.keyParentList.length">
                    <div class="fl" v-for="(item,index) in data2.keyParentList" :key="index" :style="index==0?'border-right:1px solid #ddd;width:50%':'width:50%'">
                        <img @click="bigImgBox=true,nowImg=item.dataValue" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                        <img style="width:80%;height:90%" :src="item.dataValue?item.dataValue:'../../../assets/images/take.png'" alt="">
                    </div>
                    <!-- <div class="fl" style="width:50%">
                        <img class="fangda" src="../../../assets/images/fangda000.png" alt="">
                        <img src="../../../assets/images/take.png" alt="">
                    </div> -->
                </div>
            </div>
        </template>
    </template>


    <template v-for="(data3,index) in pageData">
        <template v-if="data3.classId==8">
            <div class="wrap" :key="index">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    界面相材料力学性能：
                </div>
                <el-radio-group v-if="data3.keyParentList.length" v-model="tabPosition" class="tabPosition" style="margin-bottom:20px;font-size:16px">
                    <el-radio-button label="left">刚度矩阵C<sub>ij </sub>(GPa)</el-radio-button>
                    <el-radio-button label="right">柔度矩阵S<sub>ij </sub>(1/GPa)</el-radio-button>
                </el-radio-group>
                <div class="clearFloat clearFloat" v-if="data3.keyParentList.length">
                    <div class="fl matrixBigBox">
                        <div class="matrixMask"></div>
                        <div class="matrixbox borderTL">
                            <!-- <div class="matrixRowBox" v-for="(item, index) in matrixData" :key="index">
                                <div v-for="(data, index2) in item" :key="index2">{{data}}</div>
                            </div> -->
                            <template v-for="item in data3.keyParentList">
                                <img v-if="tabPosition=='left'?item.dataKey==31:item.dataKey==32" :key="item.dataId" :src="item.dataValue" style="width:100%;height:100%" alt="">
                            </template>
                        </div>
                    </div>
                    <div class="fl matrixDataBigBox borderTL" :style="data3.keyParentList.length>12?'overflow-y: scroll;width: 800px;margin-left: 15px;':''">
                        <div v-for="item in data3.keyParentList" :key="item.dataKey">
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
            </div>
        </template>
    </template>

    <template v-for="(data4,index) in pageData">
        <template v-if="data4.classId==10">
            <div class="wrap" :key="index">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    界面相合成：
                </div>
                <div class="hechengBigBox borderTL" :style="data4.keyParentList.length>10?'overflow-y: scroll;':''">
                    <div v-if="data4.keyParentList.length>3" @click="classId10=!classId10" class="downIcon"><img :style="!classId10?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                    <div v-for="(item, index) in data4.keyParentList" :key="index">
                        <div class="hechengRowBox" v-if="classId10?index<3:true">
                            <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                        </div>
                    </div>

                    <!-- <div><span>界面相合成热处理温度</span>1000 °C</div> -->
                    <!-- <div><span>界面相合成原料</span>BF3-NH3-H2</div> -->
                </div>
            </div>
        </template>
    </template>

    <template v-for="(data5,index) in pageData">
        <template v-if="data5.classId==9">
            <div class="wrap" :key="index">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    界面相结构和成分：
                </div>
                <template v-for="item1 in data5.keyParentList">
                    <template v-if="item1.dataKey==7&&item1.dataChildList.length">
                            <div class="chengfenTable borderTL" :key="item1.dataId">
                                <ul class="chengfenTitle clearFloat">
                                    <li>
                                        <span style="right:4px;top:4px">成分</span>
                                        <span style="left:4px;bottom:4px">表征方法</span>
                                        <span class="hr"></span>
                                    </li>
                                    <li>B</li><li>N</li><li>O</li><li>--</li><li>--</li>
                                </ul>
                                <ul class="chengfenTrs clearFloat" v-for="(data5,index) in chenfenTable" :key="index">
                                    <li>{{data5.name}}</li>
                                    <li v-for="(item,i) in data5.data" :key="i">{{item}}</li>
                                </ul>
                            </div>
                    </template>
                </template>

                <!-- <div class="erpTit">
                    <div class="fl parameterTit" style="border-right:1px solid #fff;width:33%">XRD图谱</div>
                    <div class="fl parameterTit" style="border-right:1px solid #fff;width:33%">拉曼吸收峰</div>
                    <div class="fl parameterTit" style="width:33%">红外吸收峰</div>
                </div> -->
                <div class="erpBigBox" style="height:auto">
                    <div class="erpBigBoxFlex">
                        <template v-for="item in data5.keyParentList">
                            <div style="height: 525px;border-right:1px solid #ddd;" :key="item.dataId" v-if="item.dataKey=='58'||item.dataKey=='59'||item.dataKey=='60'">
                                <div class="parameterTit" style="border-right:1px solid #fff;height:40px;width:100%">{{item.dataKeyName}}</div>
                                <img @click="bigImgBox=true,nowImg=item.dataValue" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                                <img :src="item.dataValue" alt="" style="max-with:90%;margin:0 auto;max-height:360px">
                            </div>
                        </template>
                    </div>
                </div>
                <template v-for="(item,i) in data5.keyParentList">
                    <div :key="i" v-if="item.dataKey==6">
                        <div class="parameterTit" style="border-right:1px solid #fff;margin-top:20px">界面相形貌</div>
                        <div class="xingmaoBorder">
                            <div class="hechengBigBox borderTL">
                                <div v-for="(item, index) in data5.keyParentList" :key="index">
                                    <div class="hechengRowBox" v-if="item.dataKey==4||item.dataKey==5">
                                        <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                                    </div>
                                </div>
                            </div>
                            <div v-for="(item, index) in data5.keyParentList" :key="index">
                                <div class="borderTL imgDatailsList" v-if="item.dataKey==6">
                                    <ul class="clearFloat">
                                        <li v-for="(itm, index) in item.dataValue" :key="index">
                                            <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                                            <img :src="itm!=null?itm:'../../../assets/images/nomore.png'" style="max-width:80%;max-height:190px;margin:0 auto" alt="">
                                            <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{item.dateTips}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </template>

    <template v-for="(data6,index) in pageData">
        <template v-if="data6.classId==11">
            <div class="wrap" :key="index">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    复合材料结构和成分:
                </div>
                <div class="hechengBigBox borderTL" :style="data6.keyParentList.length>10?'overflow-y: scroll;':''">
                    <div v-if="data6.keyParentList.length>3" @click="classId11=!classId11" class="downIcon"><img :style="!classId11?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                    <div v-for="(item, index) in data6.keyParentList" :key="index">
                        <div class="hechengRowBox" v-if="classId11?index<3:true">
                            <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </template>

    <template v-for="(data7,index) in pageData">
        <template v-if="data7.classId==13">
            <div class="wrap" :key="index">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    界面力学性能：
                </div>
                <div class="hechengBigBox borderTL">
                    <!-- :style="data.keyParentList.length>10?'overflow-y: scroll;':''" -->
                    <!-- <div v-if="data.keyParentList.length>3" @click="classId13=!classId13" class="downIcon"><img :style="!classId13?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div> -->
                    <div v-for="(item, index) in data7.keyParentList" :key="index">
                        <div class="hechengRowBox" v-if="item.dataKey==18">
                            <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                        </div>
                    </div>
                </div>
                <div v-for="(item, index) in data7.keyParentList" :key="index">
                    <div class="borderTL imgDatailsList" v-if="item.dataValue.length>0&&item.dataKey==61">
                        <ul class="clearFloat">
                            <li v-for="(itm, index) in item.dataValue" :key="index">
                                <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                                <img :src="itm!=null?itm:'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                                <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{itm.dataDescription}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </template>
    </template>

    <template v-for="(data8,index) in pageData">
        <template v-if="data8.classId==14">
            <div class="wrap" :key="index">
            <div class="subfield" style="margin-top:42px">
                <i></i>
                复合材料力学性能：
            </div>
            
            <div class="hechengBigBox borderTL" :style="data8.keyParentList.length>10?'overflow-y: scroll;':''">
                <div v-if="data8.keyParentList.length>3" @click="classId14=!classId14" class="downIcon"><img :style="!classId14?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                <div v-for="(item, index) in data8.keyParentList" :key="index">
                    <div class="hechengRowBox" v-if="classId14?index<3:true&&item.dataKey!=23">
                        <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                    </div>
                </div>
            </div>
            <div v-for="(item, index) in data8.keyParentList" :key="index">
                <div class="borderTL imgDatailsList" v-if="item.dataValue.length>0&&item.dataKey==23">
                    <ul class="clearFloat">
                        <li v-for="(itm, index) in item.dataValue" :key="index">
                            <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                            <img :src="itm!=null?itm:'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                            <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{itm.dataDescription}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        </template>
    </template>
    <template v-for="(data9,index) in pageData">
        <template v-if="data9.classId==15">
            <div class="wrap" :key="index">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    复合材料抗氧化性能：
                </div>
                <div class="hechengBigBox borderTL" :style="data9.keyParentList.length>10?'overflow-y: scroll;':''">
                    <div v-if="data9.keyParentList.length>3" @click="classId15=!classId15" class="downIcon"><img :style="!classId15?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                    <div v-for="(item, index) in data9.keyParentList" :key="index">
                        <div class="hechengRowBox" v-if="classId15?index<3:true">
                            <span>{{item.dataKeyName}}</span>{{item.dataValue}}
                        </div>
                    </div>
                </div>
                <div v-for="(item, index) in data9.keyParentList" :key="index">
                    <div class="borderTL imgDatailsList" v-if="item.dataValue.length>0&&item.dataKey==63">
                        <ul class="clearFloat">
                            <li v-for="(itm, index) in item.dataValue" :key="index">
                                <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                                <img :src="itm!=null?itm:'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                                <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{itm.dataDescription}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </template>
    </template>
        <el-dialog title="" :visible.sync="bigImgBox" :destroy-on-close='true' :show-close='false'>
            <div style="text-align:center">
                <img :src="nowImg" style="display:inline-block;width:90%;margin: 0 auto;height:auto;" alt="">
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'searchResult',
    data() {
        return {
            bigImgBox:false,
            nowImg:'',
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
            matrixRightData:[
               
            ],
            searchKeyWord:this.$route.query.id,
            paramLenght:{dataChildList:[]},
            paramAngle:{dataChildList:[]},
            paramPositionBArr:[],
            paramPositionNArr:[],
            paramPositionBArrArr:[],
            paramPositionNArrArr:[],
            dataContail:this.$route.query.id,
            source:this.$route.query.source,
            dataSourceObj:{}
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(){
            this.$api.getDataSource().then(res=>{ // 数据来源
                res.data.data.map(x=>{
                    Object.assign(this.dataSourceObj,{[x.structureId]: x.stKey})
                })
            })
            this.$api.searchResult({dataContail:this.searchKeyWord}).then(res=>{
                var resData = res.data.data
                this.processingData(resData)
                for(var i=0;i<resData.length;i++){
                    if(resData[i].classId==7){
                        this.paramLenght = resData[i].keyParentList.filter(x=>x.dataKey==27)[0]
                        this.paramAngle = resData[i].keyParentList.filter(x=>x.dataKey==28)[0]
                    }
                    for(let m=0;m<resData[i].keyParentList.length;m++){
                        if(resData[i].keyParentList[m].dataKey == '61'
                        ||resData[i].keyParentList[m].dataKey == '31'
                        ||resData[i].keyParentList[m].dataKey == '32'
                        ||resData[i].keyParentList[m].dataKey == '6'
                        ||resData[i].keyParentList[m].dataKey == '23'
                        ||resData[i].keyParentList[m].dataKey == '56'
                        ||resData[i].keyParentList[m].dataKey == '57'
                        ||resData[i].keyParentList[m].dataKey == '58'
                        ||resData[i].keyParentList[m].dataKey == '60'
                        ||resData[i].keyParentList[m].dataKey == '59'
                        ||resData[i].keyParentList[m].dataKey == '63'){
                            console.log(resData[i].className)
                            resData[i].keyParentList[m].dataValue = resData[i].keyParentList[m].dataValue.split(',')
                        }
                    }
                }
                this.pageData = resData
                console.log(resData)
            })
        },
        processingData(data){
            for(let i=0;i<data.length;i++){
                if(data[i].classId==7){
                    for(let m=0;m<data[i].keyParentList.length;m++){
                        if(data[i].keyParentList[m].dataKey=='29'){
                            // this.processingData2(data[i].keyParentList[m])
                        }
                    }
                }else{
                    return
                }
            }
        },
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
    .yuanziAddressUl{
        border-left: 1px solid #e1e1e1;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
    }
    .yuanziAddressUl li{
        flex: 1;
        text-align: center;
    }
    .yuanziAddressUl div{
        height: 40px;
        line-height: 40px;
        border-right: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
    }
    .imgDatailsList{
        margin-top: 35px;
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
        width: 239px;
        height: 100%;
        float: left;
        padding-top: 60px;
        text-align:center;
    }
    .xingmaoBorder .imgDatailsList li{
        width: 233px
    }
    .imgDatailsList ul{
        width: 1205px;
        height: 100%;
    }
    .borderTL{
        border: 1px solid #ddd;
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
    .erpBigBoxFlex{
        display: flex;
        justify-content: space-between;
    }
    .erpBigBoxFlex>div{
        flex: 1
    }
    .erpBigBox{
        height: 525px;
        border: 1px solid #ddd;
        border-top: none;
    }
    .erpBigBox div{
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
        top: 50px!important;
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
        /* background: #000; */
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