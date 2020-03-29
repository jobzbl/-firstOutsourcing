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
                <span v-if="searchKeyWord!=0">界面相材料：</span>
                <span style="color:#33B0B5" v-if="searchKeyWord!=0">
                    <span v-for="(item,indexh) in element" :key='indexh+"c"'>{{item}}<sub style="font-size:10px;">{{content[indexh]>1?content[indexh]:''}}</sub>
					</span>
                ,</span>
            </div>
            <div class="fl" style="margin-left:5px" v-if="searchKeyWord!=0">
                <span>数据来源：</span>
                <span style="color:#33B0B5">{{dataSourceObj[source]}}</span>
            </div>
            <div v-if="searchKeyWord==0">
                搜索结果为0
            </div>
        </div>
    </div>
    <template v-for="(data1,index1) in pageData">
        <template v-if="data1.classId==7">
            <div class="wrap" :key="index1+'a'">
                <div class="subfield">
                    <i></i>
                    界面相材料晶体结构：
                </div>
                <div style="overflow:hidden" v-if="data1.keyParentList.length">
                    <div class="fl crystalImg">
                        <img @click="iframeBig()" class="fangda" src="../../../assets/images/fangdafff.png" alt="">
                        <iframe id="iframe" class="iframeStyle" :src='"http://118.190.142.89:8090/3d?dataParam="+threrDArrString'></iframe>
                        <img class="xiazai" src="../../../assets/images/downicon.png" alt="">
                    </div>
                    <div class="fl crystalParameter">
                        <div class="parameterTit">品格参数</div>
                        <div class="tableBorer">
                            <el-row type="flex" class="row-bg">
                                <el-col :span="24" v-if="paramLenght&&paramLenght.dataChildList">
                                    <el-row v-for="itm in paramLenght.dataChildList" :key="itm.dataId+'b'">
                                        <el-col :span="12" class="parameterBox bgColor">{{itm.dataT}} (Å)</el-col>
                                        <el-col :span="12" class="parameterBox">
                                            <div :title="itm.dataValue">{{itm.dataValue}}</div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="24" v-if="paramAngle&&paramAngle.dataChildList">
                                    <el-row v-for="itm in paramAngle.dataChildList" :key="itm.dataId+'c'">
                                        <el-col :span="12" class="parameterBox bgColor">{{itm.dataT}} (°)</el-col>
                                        <el-col :span="12" class="parameterBox"><div :title="itm.dataValue">{{itm.dataValue}}</div></el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="parameterTit">原子位置(分数坐标)</div>
                            <template v-for="(item,index2) in data1.keyParentList" >
                            <div v-if="item.dataKey == 29" :key="index2+'d'" style="max-height:660px;overflow:auto">
                                <template v-for="(itm,i) in item.dataChildList">
                                    <div class="bgColor atomtit" :key="i+'e'" :style="i==0?'':'margin-top:30px'">{{itm.dataKey}}</div>
                                    <ul class="yuanziAddressUl" :key="i+'f'">
                                        <li v-for="(li,ai) in itm.tempList" :key="ai+'g'">
                                            <div>{{li.dataQ}}</div>
                                            <div>{{li.dataValue}}</div>
                                        </li>
                                    </ul>
                                </template>
                            </div>
                            </template>
                    </div>
                </div>
            </div>
        </template>
    </template>
    <template v-for="(data2,index3) in pageData">
        <template v-if="data2.classId==29">
            <div class="wrap" :key="index3+'h'">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    界面相材料电子结构：
                </div>
                <div class="erpTit" v-if="data2.keyParentList.length">
                    <div v-for="(item,index4) in data2.keyParentList" :key="index4+'i'" class="fl parameterTit" :style="index4==0?'border-right:1px solid #fff':''">{{item.dataKeyName}}</div>
                    <!-- <div class="fl parameterTit">电子能态密度</div> -->
                </div>
                <div class="erpBigBox" v-if="data2.keyParentList.length">
                    <div class="fl" v-for="(item,index5) in data2.keyParentList" :key="index5+'j'" :style="index5==0?'border-right:1px solid #ddd;width:50%':'width:50%'">
                        <img @click="bigImgBox=true,nowImg=item.dataValue" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                        <img style="width:80%;height:90%" class="spareImg" :src="item.dataValue?item.dataValue:'../../../assets/images/take.png'" alt="">
                    </div>
                    <!-- <div class="fl" style="width:50%">
                        <img class="fangda" src="../../../assets/images/fangda000.png" alt="">
                        <img src="../../../assets/images/nomore.png" alt="">
                    </div> -->
                </div>
            </div>
        </template>
    </template>


    <template v-for="(data3,index6) in pageData">
        <template v-if="data3.classId==8">
            <div class="wrap" :key="index6+'k'">
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
                                <img v-if="tabPosition=='left'?item.dataKey==31:item.dataKey==32" :key="item.dataId+'l'" :src="item.dataValue" style="width:100%;height:100%" alt="">
                            </template>
                        </div>
                    </div>
                    <div class="fl matrixDataBigBox borderTL" :style="data3.keyParentList.length>12?'overflow-y:auto;width: 800px;margin-left: 15px;':''">
                        <div v-for="item in data3.keyParentList" :key="item.dataKey+'m'">
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

    <template v-for="(data4,index7) in pageData">
        <template v-if="data4.classId==10">
            <div class="wrap" :key="index7+'n'">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    界面相合成：
                </div>
                <div class="hechengBigBox borderTL" :style="data4.keyParentList.length>10?'height: auto;':''">
                    <div v-if="data4.keyParentList.length>3" @click="classId10=!classId10" class="downIcon"><img :style="!classId10?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                    <div v-for="(item, index8) in data4.keyParentList" :key="index8+'o'">
                        <div class="hechengRowBox" v-if="classId10?index8<3:true">
                            <span>{{item.dataKeyName}}</span>
                            <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.dataValue}}</div>
                        </div>
                    </div>

                    <!-- <div><span>界面相合成热处理温度</span>1000 °C</div> -->
                    <!-- <div><span>界面相合成原料</span>BF3-NH3-H2</div> -->
                </div>
            </div>
        </template>
    </template>

    <template v-for="(data5,index9) in pageData">
        <template v-if="data5.classId==9">
            <div class="wrap" :key="index9+'p'">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    界面相结构和成分：
                </div>
                <template v-for="item1 in data5.keyParentList">
                    <template v-if="item1.dataKey==7&&item1.dataChildList.length">
                            <div class="chengfenTable borderTL" :key="item1.dataId+'q'">
                                <ul class="chengfenTitle clearFloat">
                                    <li>
                                        <span style="right:4px;top:4px">成分</span>
                                        <span style="left:4px;bottom:4px">表征方法</span>
                                        <span class="hr"></span>
                                    </li>
                                    <li>B</li><li>N</li><li>O</li>
                                </ul>
                                <ul class="chengfenTrs clearFloat" v-for="(data5,indexa) in chenfenTable" :key="indexa+'i'">
                                    <li>{{data5.name}}</li>
                                    <li v-for="(item,i) in data5.data" :key="i+'s'">{{item}}</li>
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
                            <div style="height: 525px;border-right:1px solid #ddd;" :key="item.dataId+'t'" v-if="item.dataKey=='58'||item.dataKey=='59'||item.dataKey=='60'">
                                <div class="parameterTit" style="border-right:1px solid #fff;height:40px;width:100%">{{item.dataKeyName}}</div>
                                <img @click="bigImgBox=true,nowImg=item.dataValue" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                                <img class="spareImg" :src="item.dataValue" alt="" style="max-with:90%;margin:0 auto;max-height:360px">
                            </div>
                        </template>
                    </div>
                </div>
                <template v-for="(item,i) in data5.keyParentList">
                    <div :key="i" v-if="item.dataKey==6">
                        <div class="parameterTit" style="border-right:1px solid #fff;margin-top:20px">界面相形貌</div>
                        <div class="xingmaoBorder">
                            <div class="hechengBigBox borderTL">
                                <div v-for="(item, indexb) in data5.keyParentList" :key="indexb+'u'">
                                    <div class="hechengRowBox" v-if="item.dataKey==4||item.dataKey==5">
                                        <span>{{item.dataKeyName}}</span>
                                        <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.dataValue}}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-for="(item, indexv) in data5.keyParentList" :key="indexv+'v'">
                                <div class="borderTL imgDatailsList" v-if="item.dataKey==6">
                                    <ul class="clearFloat">
                                        <li v-for="(itm, indexc) in item.dataValue" :key="indexc+'w'">
                                            <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                                            <img class="spareImg" :src="itm!=null?itm:'../../../assets/images/nomore.png'" style="max-width:80%;max-height:190px;margin:0 auto" alt="">
                                            <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{item.dateTips}}</div>
                                        </li>
                                        <li v-for="(itm, indexr) in 5-item.dataValue.length" :key="indexr+'w1'">
                                            <!-- <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt=""> -->
                                            <img class="spareImg" :src="'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
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

    <template v-for="(data6,indexd) in pageData">
        <template v-if="data6.classId==11">
            <div class="wrap" :key="indexd+'x'">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    复合材料结构和成分:
                </div>
                <div class="hechengBigBox borderTL" :style="data6.keyParentList.length>10?'height: auto;':''">
                    <div v-if="data6.keyParentList.length>3" @click="classId11=!classId11" class="downIcon"><img :style="!classId11?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                    <div v-for="(item, indexz) in data6.keyParentList" :key="indexz+'y'">
                        <div class="hechengRowBox" v-if="classId11?indexz<3:true">
                            <span>{{item.dataKeyName}}</span>
                            <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.dataValue}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </template>

    <template v-for="(data7,indexx) in pageData">
        <template v-if="data7.classId==13">
            <div class="wrap" :key="indexx+'z'">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    界面力学性能：
                </div>
                <div class="hechengBigBox borderTL">
                    <!-- :style="data.keyParentList.length>10?'height: auto;':''" -->
                    <!-- <div v-if="data.keyParentList.length>3" @click="classId13=!classId13" class="downIcon"><img :style="!classId13?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div> -->
                    <div v-for="(item, indexy) in data7.keyParentList" :key="indexy+'qw'">
                        <div class="hechengRowBox" v-if="item.dataKey==18">
                            <span>{{item.dataKeyName}}</span>
                            <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.dataValue}}</div>
                        </div>
                    </div>
                </div>
                <div v-for="(item, indext) in data7.keyParentList" :key="indext+'we'">
                    <div class="borderTL imgDatailsList" v-if="item.dataValue.length>0&&item.dataKey==61">
                        <ul class="clearFloat">
                            <li v-for="(itm, indexr) in item.dataValue" :key="indexr+'er'">
                                <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                                <img class="spareImg" :src="itm!=null?itm:'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                                <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{item.dateTips}}</div>
                            </li>
                            <li v-for="(itm, indexr) in 5-item.dataValue.length" :key="indexr+'er1'">
                                <img class="spareImg" :src="'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </template>
    </template>

    <template v-for="(data8,indexe) in pageData">
        <template v-if="data8.classId==14">
            <div class="wrap" :key="indexe+'df'">
            <div class="subfield" style="margin-top:42px">
                <i></i>
                复合材料力学性能：
            </div>
            
            <div class="hechengBigBox borderTL" :style="data8.keyParentList.length>10?'height: auto;':''">
                <div v-if="data8.keyParentList.length>3" @click="classId14=!classId14" class="downIcon"><img :style="!classId14?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                <div v-for="(item, indexs) in data8.keyParentList" :key="indexs+'as'">
                    <div class="hechengRowBox" v-if="classId14?indexs<3:true&&item.dataKey!=23">
                        <span>{{item.dataKeyName}}</span>
                        <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.dataValue}}</div>
                    </div>
                </div>
            </div>
            <div v-for="(item, indexn) in data8.keyParentList" :key="indexn+'df'">
                <div class="borderTL imgDatailsList" v-if="item.dataValue.length>0&&item.dataKey==23">
                    <ul class="clearFloat">
                        <li v-for="(itm, indexm) in item.dataValue" :key="indexm+'fg'">
                            <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                            <img class="spareImg" :src="itm!=null?itm:'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                            <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{item.dateTips}}</div>
                        </li>
                        <li v-for="(itm, indexr) in 5-item.dataValue.length" :key="indexr+'wee'">
                             <img class="spareImg" :src="'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        </template>
    </template>
    <template v-for="(data9,indexk) in pageData">
        <template v-if="data9.classId==15">
            <div class="wrap" :key="indexk+'ty'">
                <div class="subfield" style="margin-top:42px">
                    <i></i>
                    复合材料抗氧化性能：
                </div>
                <div class="hechengBigBox borderTL" :style="data9.keyParentList.length>10?'height: auto;':''">
                    <div v-if="data9.keyParentList.length>4" @click="classId15=!classId15" class="downIcon"><img :style="!classId15?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
                    <div v-for="(item, indexl) in data9.keyParentList" :key="indexl+'op'">
                        <template v-if="classId15?indexl<3:true">
                            <div class="hechengRowBox" v-if="item.dataKey!=63">
                                <span>{{item.dataKeyName}}</span>
                                <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.dataValue}}</div>
                            </div>
                        </template>
                    </div>
                </div>
                <div v-for="(item, indexo) in data9.keyParentList" :key="indexo+'ed'">
                    <div class="borderTL imgDatailsList" v-if="item.dataValue.length>0&&item.dataKey==63">
                        <ul class="clearFloat">
                            <li v-for="(itm, indexp) in item.dataValue" :key="indexp+'lk'">
                                <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                                <img class="spareImg" :src="itm!=null?itm:'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                                <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{item.dateTips}}</div>
                            </li>
                            <li v-for="(itm, indexr) in 5-item.dataValue.length" :key="indexr+'erw'">
                                <img class="spareImg" :src="'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </template>
    </template>
        <el-dialog title="" :visible.sync="bigImgBox" :destroy-on-close='true' :show-close='false'>
            <div style="text-align:center">
                <img class="spareImg" :src="nowImg" style="display:inline-block;width:90%;margin: 0 auto;height:auto;" alt="">
            </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="bigIframeBox" :destroy-on-close='true' :show-close='false'>
            <div style="height:700px">
                <iframe id="iframe" style="height:100%;width:100%;" :src='"http://118.190.142.89:8090/3d?dataParam="+threrDArrString'></iframe>
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
            bigIframeBox:false,
            nowImg:'',
            nowIframe:'',
            classId10:true,
            classId11:true,
            classId14:true,
            classId15:true,
            classId13:true,
            pageData:[],
            chenfenTable:[],
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
            content:'',
            element:'',
            dataSourceObj:{},
            threrDObj:{},
            threrDArr:[],
            threrDArrString:'',
            chenfenTableXPS:[],
            chenfenTableAES:[],
        }
    },
    created() {
        this.init()
    },
    methods: {
        iframeBig(){
            this.bigIframeBox = true
            
        },
        init(){
            let iframe = document.getElementById('iframe')
            console.log(iframe)
            if(this.searchKeyWord!=0){
                if(typeof this.$route.query.content == 'string'){
                    this.content = this.$route.query.content.split(':')
                }else{
                    this.content = this.$route.query.content
                }
                if(typeof this.$route.query.element == 'string'){
                    this.element = this.$route.query.element.split(',')
                }else{
                    this.element = this.$route.query.element
                }
            }else{
                // return false
            }
            
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
                    for(let m=0;m<resData[i].keyParentList.length;m++){ // 检出所有类型是图片的数据
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
                            resData[i].keyParentList[m].dataValue = resData[i].keyParentList[m].dataValue.split(',')
                        }

                        if(resData[i].keyParentList[m].dataKey==29){ //
                            let keyParentList = resData[i].keyParentList[m]
                            if(keyParentList.dataChildList.length){
                                for(var n=0;n<keyParentList.dataChildList.length;n++){
                                    let threrDObjArr = [keyParentList.dataChildList[n].dataKey]
                                    if(keyParentList.dataChildList[n].tempList.length){
                                        for(var b=0;b<keyParentList.dataChildList[n].tempList.length;b++){
                                            threrDObjArr.push(keyParentList.dataChildList[n].tempList[b].dataValue)
                                            this.threrDObj[n]=threrDObjArr
                                        }
                                    }
                                }
                            }
                            // this.threrDArr = 
                            for(let key  in this.threrDObj){ // 给3d图用的参数
                                this.threrDArr.push(this.threrDObj[key].join('-'))
                            }
                            this.threrDArrString = this.threrDArr.join(',')
                        }

                        // 界面相结构成分表格
                        // XPS
                        if(resData[i].keyParentList[m].dataKey==7){
                            let _keyParentList = resData[i].keyParentList[m]
                            if(_keyParentList.dataChildList.length>0){
                                for(let i=0;i<_keyParentList.dataChildList.length;i++){
                                    if(_keyParentList.dataChildList[i].tempList.length){
                                        for(let b=0;b<_keyParentList.dataChildList[i].tempList.length;b++){
                                            this.chenfenTableXPS.push({
                                                dataT:_keyParentList.dataChildList[i].tempList[b].dataT,
                                                dataValue:_keyParentList.dataChildList[i].tempList[b].dataValue
                                            })
                                        }
                                    }
                                }
                            }
                        }

                        // AES
                        if(resData[i].keyParentList[m].dataKey==8){
                            let _keyParentList = resData[i].keyParentList[m]
                            if(_keyParentList.dataChildList.length>0){
                                for(let i=0;i<_keyParentList.dataChildList.length;i++){
                                    if(_keyParentList.dataChildList[i].tempList.length){
                                        for(let b=0;b<_keyParentList.dataChildList[i].tempList.length;b++){
                                            this.chenfenTableAES.push({
                                                dataT:_keyParentList.dataChildList[i].tempList[b].dataT,
                                                dataValue:_keyParentList.dataChildList[i].tempList[b].dataValue
                                            })
                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                }
                let _chenfenTableAES = []
                let _chenfenTableXPS = []
                if(this.chenfenTableAES.filter(x=>x.dataT=='B').length){
                    _chenfenTableAES.push(this.chenfenTableAES.filter(x=>x.dataT=='B')[0].dataValue)
                }else{
                    _chenfenTableAES.push('--')
                }
                if(this.chenfenTableAES.filter(x=>x.dataT=='N').length){
                    _chenfenTableAES.push(this.chenfenTableAES.filter(x=>x.dataT=='N')[0].dataValue)
                }else{
                    _chenfenTableAES.push('--')
                }
                if(this.chenfenTableAES.filter(x=>x.dataT=='O').length){
                    _chenfenTableAES.push(this.chenfenTableAES.filter(x=>x.dataT=='O')[0].dataValue)
                }else{
                    _chenfenTableAES.push('--')
                }

                if(this.chenfenTableXPS.filter(x=>x.dataT=='B').length){
                    _chenfenTableXPS.push(this.chenfenTableXPS.filter(x=>x.dataT=='B')[0].dataValue)
                }else{
                    _chenfenTableXPS.push('--')
                }
                if(this.chenfenTableXPS.filter(x=>x.dataT=='N').length){
                    _chenfenTableXPS.push(this.chenfenTableXPS.filter(x=>x.dataT=='N')[0].dataValue)
                }else{
                    _chenfenTableXPS.push('--')
                }
                if(this.chenfenTableXPS.filter(x=>x.dataT=='O').length){
                    _chenfenTableXPS.push(this.chenfenTableXPS.filter(x=>x.dataT=='O')[0].dataValue)
                }else{
                    _chenfenTableXPS.push('--')
                }
                // this.chenfenTable
                this.chenfenTable=[
                    {name:'XPS',data:_chenfenTableXPS},
                    {name:'AES',data:_chenfenTableAES},
                ]
                console.log(this.chenfenTable)
                this.pageData = resData
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
    .iframeStyle{
        height: 673px;
        width: 665px;
        position: absolute;
        left: -44px;
        top: -36px;
    }
    .spareImg:after { 
    content: url('../../../assets/images/nomore.png');
    display: block;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    background-color: #fff;
    }
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
        z-index: 999
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
    .chengfenTrs{
        display: flex;
        justify-content: flex-start;
    }
    .chengfenTrs li{
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        height: 40px;
        line-height: 40px;
        width: 333px;
        text-align: center;
        font-size: 14px;
        color: #4d4d4d;
        /* float: left; */
    }
    .chengfenTrs>:first-child{
        width: 200px;
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
        transform: rotate(14deg);
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
        display: flex;
        justify-content: flex-start;
    }
    .chengfenTitle li{
        text-align: center;
        height: 53px;
        line-height: 53px;
        border-bottom: 1px solid #ddd;
        border-right:1px solid #ddd;
        width: 333px;
        /* float: left; */
        background: #E2FCF9;
        color: #4d4d4d;
        font-size: 14px;
        font-weight: bold;
    }
    .chengfenTitle>:first-child{
        width: 200px;
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
        min-height: 40px;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        line-height: 40px;
        font-size: 14px;
        color: #4d4d4d;
        display: flex;
        justify-content: flex-start;
    }
    .hechengRowBoxRow::-webkit-scrollbar { /*滚动条整体样式*/
        width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 2px;
    }
    .hechengRowBoxRow::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px #fafafa;
        background: rgba(0,0,0,.075);
    }
    .hechengRowBoxRow::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px #fafafa;
        border-radius: 0;
        background: #ececec;
    }
    .hechengBigBox span{
        display: inline-block;
        width: 168px;
        padding-left: 15px;
        background: #E2FCF9;
        margin-right: 14px;
        border-right:1px solid #ddd;
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
        left:unset;
        z-index: 999;
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
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        line-height: 40px;
        font-size: 14px;
    }
    .parameterBox div{
        width:100%;
        margin:0 auto;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .tableBorer{
        /* border-left: 1px solid #ddd; */
        border-right: 1px solid #ddd;
        margin-bottom: 20px;
        max-height:160px;
        overflow-y:auto;
        overflow-x:hidden;
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
        padding-top: 1px;
        width: 500px;
        height: 586px;
        background: #000;
        border-radius: 10px;
        margin-right: 37px;
        position: relative;
        overflow: hidden;
    }
    .crystalImg img{
        position: absolute;
    }
    .crystalImg .fangda{
        top: 24px;
        right: 24px;
        z-index: 999;
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