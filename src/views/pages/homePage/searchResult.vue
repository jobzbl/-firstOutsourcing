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
                    <span>{{searchKeyWord}}，</span>
				</span>
            </div>
            <div class="fl" style="margin-left:5px" v-if="searchKeyWord!=0">
                <span>数据来源：</span>
                <span>{{dataSourceObj[dataValue]}}，</span>
            </div>
            <div v-if="searchKeyWord==0">
                搜索结果为0
            </div>
            <div class="fl" style="margin-left:5px" v-if="searchKeyWord!=0">
                <span>DOI：</span>
                <span>{{dataTips}}</span>
            </div>
            <div v-if="searchKeyWord==0">
                搜索结果为0
            </div>
        </div>
    </div>
    <div class="wrap" v-if="pageDataJson[7]">
        <div class="subfield">
            <i></i>
            界面相材料晶体结构：
        </div>
        <div style="overflow:hidden" >
            <div class="fl crystalImg">
                <img @click="iframeBig()" class="fangda" src="../../../assets/images/fangdafff.png" alt="">
                <iframe id="iframe" class="iframeStyle" :src='base.abbr+"?dataParam="+cifNameString'></iframe>
                <img class="xiazai" src="../../../assets/images/downicon.png" alt="" @click="downCif()">
            </div>
            <div class="fl crystalParameter">
                <div class="parameterTit">品格参数</div>
                <div class="tableBorer">
                    <el-row type="flex" class="row-bg">
                        <el-col :span="24">
                            <el-row>
                                <el-col :span="12" class="parameterBox bgColor">a(Å)</el-col>
                                <el-col :span="12" class="parameterBox">
                                    <div :title="pageDataJson[7][27].dataValue[0]">{{pageDataJson[7][27].dataValue[0]}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12" class="parameterBox bgColor">b(Å)</el-col>
                                <el-col :span="12" class="parameterBox">
                                    <div :title="pageDataJson[7][27].dataValue[1]">{{pageDataJson[7][27].dataValue[1]}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12" class="parameterBox bgColor">c(Å)</el-col>
                                <el-col :span="12" class="parameterBox">
                                    <div :title="pageDataJson[7][27].dataValue[2]">{{pageDataJson[7][27].dataValue[2]}}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="24">
                            <el-row>
                                <el-col :span="12" class="parameterBox bgColor">α (°)</el-col>
                                <el-col :span="12" class="parameterBox">
                                    <div :title="pageDataJson[7][28].dataValue[0]">{{pageDataJson[7][28].dataValue[0]}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12" class="parameterBox bgColor">β (°)</el-col>
                                <el-col :span="12" class="parameterBox">
                                    <div :title="pageDataJson[7][28].dataValue[1]">{{pageDataJson[7][28].dataValue[0]}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12" class="parameterBox bgColor">γ (°)</el-col>
                                <el-col :span="12" class="parameterBox">
                                    <div :title="pageDataJson[7][28].dataValue[2]">{{pageDataJson[7][28].dataValue[0]}}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <div class="atomSiteBox">
                    <div class="parameterTit">原子位置(分数坐标)</div>
                    <template v-for="(itm,index1) in cifTableList">
                        <div :key="index1+'e'" class="yuanzizuobiao">
                            <div @click="itm.downIcon=!itm.downIcon" class="downIcon">
                                <img :style="!itm.downIcon?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt="">
                            </div>
                            <div class="bgColor atomtit" :style="index1==0?'':'margin-top:30px'">{{itm.name}}</div>
                            <ul class="yuanziAddressUl" style="font-size:16px;font-weight:bold;color:#4D4D4D" :key="index1+'2e'">
                                <li><div>x</div></li>
                                <li><div>y</div></li>
                                <li><div>z</div></li>
                            </ul>
                            <template v-for="(item,index) in itm.value">
                                <template v-if="itm.downIcon?index<2:true">
                                    <ul class="yuanziAddressUl" :key="index+itm.name">
                                        <li><div>{{item.param_x}}</div></li>
                                        <li><div>{{item.param_y}}</div></li>
                                        <li><div>{{item.param_z}}</div></li>
                                    </ul>
                                </template>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
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
                        <img style="width:80%;height:90%" class="spareImg" :src="item.dataValue?base.sq+item.dataValue:'../../../assets/images/take.png'" alt="">
                    </div>
                    <!-- <div class="fl" style="width:50%">
                        <img class="fangda" src="../../../assets/images/fangda000.png" alt="">
                        <img src="../../../assets/images/nomore.png" alt="">
                    </div> -->
                </div>
            </div>
        </template>
    </template>


   
    <div class="wrap" v-if="pageDataJson[8]">
        <div class="subfield" style="margin-top:42px">
            <i></i>
            界面相材料物理性能：
        </div>
        <el-radio-group v-model="tabPosition" class="tabPosition" style="margin-bottom:20px;font-size:16px">
            <el-radio-button label="left">刚度矩阵C<sub>ij </sub>(GPa)</el-radio-button>
            <el-radio-button label="right">柔度矩阵S<sub>ij </sub>(1/GPa)</el-radio-button>
        </el-radio-group>
        <div class="clearFloat clearFloat">
            <div class="fl matrixBigBox">
                <div class="matrixMask"></div>
                <div class="matrixbox borderTL">
                    <template  v-if="tabPosition=='left'">
                        <div class="matrixRowBox" v-for="(item, index) in matrixData" :key="index">
                            <div v-for="(data, index2) in item" :key="index2">{{data}}</div>
                        </div>
                    </template>
                    <template  v-if="tabPosition=='right'">
                        <div class="matrixRowBox" v-for="(item, index) in matrixData2" :key="index">
                            <div v-for="(data, index2) in item" :key="index2">{{data}}</div>
                        </div>
                    </template>
                </div>
                <!-- <div class="matrixbox borderTL">
                    <div class="matrixRowBox" v-for="(item, index) in matrixData" :key="index">
                        <div v-for="(data, index2) in item" :key="index2">{{data}}</div>
                    </div>
                    <template v-for="item in data3.keyParentList">
                        <img v-if="tabPosition=='left'?item.dataKey==31:item.dataKey==32" :key="item.dataId+'l'" :src="item.dataValue" style="width:100%;height:100%" alt="">
                    </template>
                </div> -->
            </div>
            <div class="fl matrixDataBigBox borderTL" :style="pageDataJson[8].length>12?'overflow-y:auto;width: 800px;margin-left: 15px;':''">
                <div v-for="item in pageDataJson[8]" :key="item.id+'m'">
                    <div class="matrixRSmallBox fl" v-if="item.id!=31&&item.id!=32">
                        <div class="matrixBgBox" >
                            <span v-html="item.stKey">{{item.stKey}}</span>
                            <!-- <sub>{{item.sub}}</sub> -->
                            <!-- <span>{{item.bracket}}</span> -->
                        </div>
                        <div>{{item.value}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        

    <div class="wrap" v-if="pageDataJson[10]">
        <div class="subfield" style="margin-top:42px">
            <i></i>
            复合材料制备
        </div>
        <div class="hechengBigBox borderTL" :style="pageDataJson[10].length>10?'height: auto;':''">
            <div v-if="pageDataJson[10].length>3" @click="classId12=!classId12" class="downIcon"><img :style="!classId12?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
            <div v-for="(item, indexz) in pageDataJson[10]" :key="indexz+'y'">
                <div class="hechengRowBox" v-if="(classId12?indexz<3:true)&&item.id!=6">
                    <span>{{item.stKey}}</span>
                    <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.value}}</div>
                </div>
            </div>
        </div>
        <div class="borderTL imgDatailsList" style="height:auto">
            <div class="erpTit">
                <div class="fl parameterTit" style="border-right:1px solid #fff">界面相制备流程图</div>
                <div class="fl parameterTit">复合材料制备流程图</div>
            </div>
            <div class="erpBigBox" >
                <template v-for="(item, indexz) in pageDataJson[10]">
                    <div :key="indexz+'21wq'" v-if="item.id==103" class="fl" style="width:50%;border-right:1px solid #ddd">
                        <img @click="bigImgBox=true,nowImg=item.value" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                        <img class="nonePosition" :src="item.value!=null?base.sq+item.value:'../../../assets/images/nomore.png'" :style="item.value?'width:80%;':'width:25%;'" alt="">
                        <div class="imgTips">{{item.tips}}</div>
                    </div>
                </template>
                <template v-for="(item, indexz) in pageDataJson[10]">
                    <div :key="indexz+'21wq'" v-if="item.id==104" class="fl" style="width:50%;">
                        <img @click="bigImgBox=true,nowImg=item.value" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                        <img class="nonePosition" :src="item.value!=null?base.sq+item.value:'../../../assets/images/nomore.png'" :style="item.value?'width:80%;':'width:25%;'" alt="">
                        <div class="imgTips">{{item.tips}}</div>
                    </div>
                </template>
                <!-- <div class="fl" style="width:50%">
                    <img class="fangda" src="../../../assets/images/fangda000.png" alt="">
                    <img src="../../../assets/images/nomore.png" alt="">
                </div> -->
            </div>
        </div>
    </div>

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
                                <img class="spareImg" :src="base.sq+item.dataValue" alt="" style="max-with:90%;margin:0 auto;max-height:360px">
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
                                            <img class="spareImg" :src="itm!=null?base.sq+itm:'../../../assets/images/nomore.png'" style="max-width:80%;max-height:190px;margin:0 auto" alt="">
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

    
    <div class="wrap" v-if="pageDataJson[9]">
        <div class="subfield" style="margin-top:42px">
            <i></i>
            复合材料结构和成分:
        </div>
        <div class="hechengBigBox borderTL" :style="pageDataJson[9].length>10?'height: auto;':''">
            <div v-if="pageDataJson[9].length>3" @click="classId11=!classId11" class="downIcon"><img :style="!classId11?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
            <div v-for="(item, indexz) in pageDataJson[9]" :key="indexz+'y'">
                <div class="hechengRowBox" v-if="(classId11?indexz<3:true)&&item.id!=6&&item.isShow">
                    <span>{{item.stKey}}</span>
                    <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.value}}</div>
                </div>
            </div>
        </div>
        <div class="chengfenTable borderTL" style="margin-top:45px">
            <ul class="chengfenTitle clearFloat">
                <li>
                    <span style="right:4px;top:4px">成分</span>
                    <span style="left:4px;bottom:4px">表征方法</span>
                    <span class="hr"></span>
                </li>
                <template v-for="(item) in pageDataJson[9]">
                    <template v-if="item.id==7">
                        <li v-for="(itm,indexlol) in item.value" :key="indexlol+'poqmn'">{{itm}}</li>
                        <li v-for="(it) in 5-item.value.length" :key="it+'ja1sq'" :data-type="it">--</li>
                    </template>
                </template>
            </ul>
            <ul class="chengfenTrs clearFloat">
                <li>XPS</li>
                <template v-for="(item) in pageDataJson[9]">
                    <template v-if="item.id==90">
                        <li v-for="(itm,indexlol) in item.value" :key="indexlol+'posmn'">{{itm}}</li>
                        <li v-for="(it) in 5-item.value.length" :key="it+'jaasq'" :data-type="it">--</li>
                    </template>
                </template>
            </ul>
            <ul class="chengfenTrs clearFloat">
                <li>AES</li>
                <template v-for="(item) in pageDataJson[9]">
                    <template v-if="item.id==92">
                        <li v-for="(itm,indexlol) in item.value" :key="indexlol+'pom9n'">{{itm}}</li>
                        <li v-for="(it) in 5-item.value.length" :key="it+'j7asq'" :data-type="it">--</li>
                    </template>
                </template>
            </ul>
            <ul class="chengfenTrs clearFloat">
                <li>EELS</li>
                <template v-for="(item) in pageDataJson[9]">
                    <template v-if="item.id==94">
                        <li v-for="(itm,indexlol) in item.value" :key="indexlol+'po5mn'">{{itm}}</li>
                        <li v-for="(it) in 5-item.value.length" :key="it+'ja1sq'" :data-type="it">--</li>
                    </template>
                </template>
            </ul>
            <ul class="chengfenTrs clearFloat">
                <li>--</li>
                <li v-for="(it) in 5" :key="it+'ja2sq'" :data-type="it">--</li>
            </ul>
            <ul class="chengfenTrs clearFloat">
                <li>--</li>
                <li v-for="(it) in 5" :key="it+'jas2q'" :data-type="it">--</li>
            </ul>
        </div>
        <div>
            <template v-for="(item,index) in pageDataJson[9]">
                <div class="parameterTit" :key="index+'qqwsdf'" v-if="item.id==6" style="border-right:1px solid #fff;margin-top:60px">{{item.stKey}}</div>
            </template>
            <div class="borderTL imgDatailsList">
                <template v-for="(item,index) in pageDataJson[9]">
                    <ul :key="index+'12w'" class="clearFloat" v-if="item.id==6">
                        <li v-for="(itm, indexm) in item.value" :key="indexm+'fg'">
                            <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                            <img class="spareImg" :src="itm!=null?base.sq+itm:'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                            <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{item.tips}}</div>
                        </li>
                        <li v-for="(itm, indexr) in 5-item.value.length" :key="indexr+'wee'">
                            <img class="spareImg" :src="'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </div>

    <div class="wrap" v-if="pageDataJson[13]">
        <div class="subfield" style="margin-top:42px">
            <i></i>
            界面力学性能：
        </div>
        <div class="hechengBigBox borderTL" :style="pageDataJson[13].length>10?'height: auto;':''">
            <div v-if="pageDataJson[13].length>3" @click="classId13=!classId13" class="downIcon"><img :style="!classId13?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
            <div v-for="(item, indexz) in pageDataJson[13]" :key="indexz+'y'">
                <div class="hechengRowBox" v-if="item.id!==61&&item.id!==96&&(classId13?indexz<3:true)">
                    <span>{{item.stKey}}</span>
                    <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.value}}</div>
                </div>
            </div>
        </div>
        <div >
            <div class="borderTL imgDatailsList" style="height:auto">
                <div class="erpTit">
                    <div class="fl parameterTit" style="border-right:1px solid #fff">纤维顶出应力-应变曲线</div>
                    <div class="fl parameterTit">纤维推回应力-应变曲线</div>
                </div>
                <div class="erpBigBox" >
                    <template v-for="(item, indexz) in pageDataJson[13]">
                        <div :key="indexz+'21wq'" v-if="item.id==61" class="fl" style="width:50%;border-right:1px solid #ddd">
                            <img @click="bigImgBox=true,nowImg=item.value" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                            <img class="nonePosition" :src="item.value!=null?base.sq+item.value:'../../../assets/images/nomore.png'" :style="item.value?'width:80%;':'width:25%;'" alt="">
                            <div class="imgTips">{{item.tips}}</div>
                        </div>
                    </template>
                    <template v-for="(item, indexz) in pageDataJson[13]">
                        <div :key="indexz+'21wq'" v-if="item.id==96" class="fl" style="width:50%;">
                            <img @click="bigImgBox=true,nowImg=item.value" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                            <img class="nonePosition" :src="item.value!=null?base.sq+item.value:'../../../assets/images/nomore.png'" :style="item.value?'width:80%;':'width:25%;'" alt="">
                            <div class="imgTips">{{item.tips}}</div>
                        </div>
                    </template>
                    <!-- <div class="fl" style="width:50%">
                        <img class="fangda" src="../../../assets/images/fangda000.png" alt="">
                        <img src="../../../assets/images/nomore.png" alt="">
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="wrap" v-if="pageDataJson[14]">
        <div class="subfield" style="margin-top:42px">
            <i></i>
            复合材料力学性能：
        </div>
        
        <div class="hechengBigBox borderTL" :style="pageDataJson[14].length>10?'height: auto;':''">
            <div v-if="pageDataJson[14].length>3" @click="classId14=!classId14" class="downIcon"><img :style="!classId14?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
            <div v-for="(item, indexz) in pageDataJson[14]" :key="indexz+'y'">
                <div class="hechengRowBox" v-if="item.id!==23&&(classId14?indexz<3:true)">
                    <span>{{item.stKey}}</span>
                    <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.value}}</div>
                </div>
            </div>
        </div>

        <div>
            <template v-for="(item,index) in pageDataJson[14]">
                <div class="parameterTit" :key="index+'qqwsdf'" v-if="item.id==23" style="border-right:1px solid #fff;margin-top:60px">{{item.stKey}}</div>
            </template>
            <div class="borderTL imgDatailsList" style="margin-top:20px">
                <template v-for="(item,index) in pageDataJson[14]">
                    <ul :key="index+'12w'" class="clearFloat" v-if="item.id==23">
                        <li v-for="(itm, indexm) in item.value" :key="indexm+'fg'">
                            <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                            <img class="spareImg" :src="itm!=null?base.sq+itm:'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                            <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{item.tips}}</div>
                        </li>
                        <li v-for="(itm, indexr) in 5-item.value.length" :key="indexr+'wee'">
                            <img class="spareImg" :src="'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </div>

    <div class="wrap" v-if="pageDataJson[15]">
        <div class="subfield" style="margin-top:42px">
            <i></i>
            复合材料抗氧化性能：
        </div>
        
        <div class="hechengBigBox borderTL" :style="pageDataJson[15].length>10?'height: auto;':''">
            <div v-if="pageDataJson[15].length>3" @click="classId15=!classId15" class="downIcon"><img :style="!classId15?'transform: rotate(180deg);':''" src="../../../assets/images/downPull.png" alt=""></div>
            <div v-for="(item, indexz) in pageDataJson[15]" :key="indexz+'y'">
                <div class="hechengRowBox" v-if="item.id!==63&&(classId15?indexz<3:true)">
                    <span>{{item.stKey}}</span>
                    <div class="hechengRowBoxRow" style="width:1030px;overflow-y:scroll">{{item.value}}</div>
                </div>
            </div>
        </div>
        <div>
            <template v-for="(item,index) in pageDataJson[15]">
                <div class="parameterTit" :key="index+'qqwsdf'" v-if="item.id==63" style="border-right:1px solid #fff;margin-top:60px">{{item.stKey}}</div>
            </template>
            <div class="borderTL imgDatailsList" style="margin-top:20px">
                <template v-for="(item,index) in pageDataJson[15]">
                    <ul :key="index+'12w'" class="clearFloat" v-if="item.id==63">
                        <li v-for="(itm, indexm) in item.value" :key="indexm+'fg'">
                            <img @click="bigImgBox=true,nowImg=itm" class="fangda" src="../../../assets/images/fangda000.png" alt="">
                            <img class="spareImg" :src="itm!=null?base.sq+itm:'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                            <div style="text-align:left;padding:15px 10px 10px 10px;font-size:14px;color:#4d4d4d">{{item.tips}}</div>
                        </li>
                        <li v-for="(itm, indexr) in 5-item.value.length" :key="indexr+'wee'">
                            <img class="spareImg" :src="'../../../assets/images/nomore.png'" style="max-width:80%;margin:0 auto;max-height:190px;" alt="">
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </div>
        <el-dialog title="" :visible.sync="bigImgBox" :destroy-on-close='true' :show-close='false'>
            <div style="text-align:center">
                <img class="spareImg" :src="base.sq+nowImg" style="display:inline-block;width:90%;margin: 0 auto;height:auto;" alt="">
            </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="bigIframeBox" :destroy-on-close='true' :show-close='false'>
            <div style="height:700px;position:relative;overflow:hidden">
                <iframe class="iframeStyle2" id="iframe" :src='base.abbr+"?dataParam="+cifNameString'></iframe>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs'
import base from '../../../request/base'; // 导入接口域名列表
// import base from '../../../request/base'; // 导入接口域名列表
export default {
    name: 'searchResult',
    data() {
        return {
            base:base,
            bigImgBox:false,
            bigIframeBox:false,
            nowImg:'',
            nowIframe:'',
            classId0:true,
            classId10:true,
            classId11:true,
            classId12:true,
            classId14:true,
            classId15:true,
            classId13:true,
            pageData:{},
            pageDataJson:{},
            chenfenTable:[],
            tabPosition:'left',
            tableData:[
                {x:'1',y:'2',z:'3'},
                {x:'1',y:'2',z:'3'},
                {x:'1',y:'2',z:'3'},
            ],
            matrixRightData:[
               
            ],
            matrixData: [
                ['','','','','',''],
                ['','','','','',''],
                ['','','','','',''],
                ['','','','','',''],
                ['','','','','',''],
                ['','','','','',''],
            ],
            searchKeyWord:this.$route.query.id,
            dataPid:this.$route.query.dataPid,
            paramLenght:{dataChildList:[]},
            paramAngle:{dataChildList:[]},
            paramPositionBArr:[],
            paramPositionNArr:[],
            paramPositionBArrArr:[],
            paramPositionNArrArr:[],
            dataContail:this.$route.query.id,
            dataTips:this.$route.query.dataTips,
            dataValue:this.$route.query.dataValue,
            content:'',
            element:'',
            dataSourceObj:localStorage.getItem('dataSourceObj')||{},
            threrDObj:{},
            threrDArr:[],
            threrDArrString:'',
            chenfenTableXPS:[],
            chenfenTableAES:[],
            wulixingenng:[ // 刚柔矩阵
               {id:31,stKey:"刚度矩阵",value:'',tips:''},
               {id:32,stKey:"柔度矩阵",value:'',tips:''},
               {id:33,stKey:"体模量B<sub>v</sub>(GPa)",value:'',tips:''},
               {id:34,stKey:"体模量B<sub>R</sub>(GPa)",value:'',tips:''},
               {id:35,stKey:"体模量B<sub>H</sub>(GPa)",value:'',tips:''},
               {id:36,stKey:"剪切模量G<sub>v</sub>(GPa)",value:'',tips:''},
               {id:37,stKey:"剪切模量G<sub>R</sub>(GPa)",value:'',tips:''},
               {id:38,stKey:"剪切模量G<sub>H</sub>(GPa)",value:'',tips:''},
               {id:39,stKey:"杨氏模量E<sub>v</sub>(GPa)",value:'',tips:''},
               {id:40,stKey:"杨氏模量E<sub>R</sub>(GPa)",value:'',tips:''},
               {id:41,stKey:"杨氏模量E<sub>H</sub>(GPa)",value:'',tips:''},
               {id:42,stKey:"泊松比V<sub>v</sub>",value:'',tips:''},
               {id:43,stKey:"泊松比V<sub>R</sub>",value:'',tips:''},
               {id:44,stKey:"泊松比V<sub>v</sub>",value:'',tips:''},
               {id:45,stKey:"各向异性A<sub>u</sub>",value:'',tips:''},
               {id:46,stKey:"各向异性A<sub>b</sub>",value:'',tips:''},
               {id:47,stKey:"各向异性A<sub>g</sub>",value:'',tips:''},
               {id:74,stKey:"热膨胀系数(10<sup>-6</sup>K<sup>-1</sup>)",value:'',tips:''},
               {id:85,stKey:"热导率(Wm<sup>-1</sup>K<sup>-1</sup>)",value:'',tips:''},
               {id:86,stKey:"德拜温度(K)",value:''}
            ],
            fuhecailiao:[ // 复合材料
                {isShow:true,id: 4, stKey: "界面相厚度（μm）", value:''},
                {isShow:true,id: 5, stKey: "界面相形貌", value:'',tips:''},
                {isShow:true,id: 6, stKey: "界面相形貌图", value:'',tips:''},
                {isShow:true,id: 7, stKey: "界面相成分-元素", value:'',tips:''},
                {isShow:true,id: 8, stKey: "界面相成分-含量", value:'',tips:''},
                {isShow:true,id: 12, stKey: "复合材料类型", value:'',tips:''},
                {isShow:true,id: 13, stKey: "基体成分", value:'',tips:''},
                {isShow:true,id: 14, stKey: "纤维成分", value:'',tips:''},
                {isShow:true,id: 15, stKey: "纤维型号", value:'',tips:''},
                {isShow:true,id: 59, stKey: "复合材料致密度(%)", value:'',tips:''},
                {isShow:true,id: 60, stKey: "复合材料孔隙率(%)", value:'',tips:''},
                {isShow:true,id: 80, stKey: "界面相类型", value:'',tips:''},
                {isShow:true,id: 88, stKey: "复合材料密度（g/cm3）", value:'',tips:''},
                {isShow:true,id: 89, stKey: "界面相成分-元素-xps", value:'',tips:''},
                {isShow:true,id: 90, stKey: "界面相成分-含量-xps", value:'',tips:''},
                {isShow:true,id: 91, stKey: "界面相成分-元素-AES", value:'',tips:''},
                {isShow:true,id: 92, stKey: "界面相成分-含量-AES", value:'',tips:''},
                {isShow:true,id: 93, stKey: "界面相成分-元素-EELS",  value:'',tips:''},
                {isShow:true,id: 94, stKey: "界面相成分-含量-EELS",  value:'',tips:''}
            ],
            jiemianlixue:[ // 界面力学
                {id: 18, stKey: "界面剪切应力(MPa)", value:'',tips:''},
                {id: 61, stKey: "纤维顶出应力-应变曲线", value:'',tips:''},
                {id: 95, stKey: "纤维顶出最大加载应力（N）", value:'',tips:''},
                {id: 96, stKey: "纤维推回应力-应变曲线", value:'',tips:''},
                {id: 97, stKey: "界面剪切强度（MPa）", value:'',tips:''},
                {id: 98, stKey: "界面摩擦应力（MPa）", value:'',tips:''},
            ],
            fuhecailiaolixuexingneng:[ // 复合材料力学性能
                {id: 19,stKey: "拉伸失效应变 (%)", value:'',tips:''},
                {id: 20,stKey: "拉伸失效力（N）", value:'',tips:''},
                {id: 21,stKey: "线性极限(%)", value:'',tips:''},
                {id: 22,stKey: "线性极限力（N）", value:'',tips:''},
                {id: 23,stKey: "应力应变曲线", value:'',tips:''},
                {id: 82,stKey: "纤维拉伸强度(MPa)", value:'',tips:''},
                {id: 99,stKey: "弯曲强度（MPa）", value:'',tips:''},
                {id: 100,stKey: "拉伸强度（MPa）", value:'',tips:''},
                {id: 101,stKey: "剪切强度（MPa）", value:'',tips:''},
                {id: 102,stKey: "断裂韧性（MPam1/2）", value:'',tips:''},
            ],
            yanghua:[
                {id: 24,stKey: "氧化处理温度（K）",value: ''},
                {id: 25,stKey: "氧化处理时间（min）",value: ''},
                {id: 26,stKey: "氧化后残余弯曲强度（MPa）",value:''},
                {id: 49,stKey: "氧化处理气氛",value:''},
                {id: 63,stKey: "氧化增重变化曲线",value:''},
            ],
            fuhecailaiozhibei:[
                {id: 9,stKey: "界面相合成方法",value: ''},
                {id: 10,stKey: "界面相合成热处理温度（K）",value: ''},
                {id: 11,stKey: "界面相合成原料",value:''},
                {id: 53,stKey: "界面相沉积时间（h）",value:''},
                {id: 54,stKey: "界面相沉积压强（KPa）",value:''},
                {id: 79,stKey: "复合材料合成方法",value:''},
                {id: 87,stKey: "复合材料合成温度（K）",value:''},
                {id: 103,stKey: "界面相制备流程图",value:''},
                {id: 104,stKey: "复合材料制备流程图",value:''},
            ],
            cifFile:'',
            cifTableList:[],
            gangroujuzhen:{},
           cifNameString:'',
           tableChengfen:'',
     }
    },
    created() {
        this.init()
    },
    methods: {
        iframeBig(){
            this.bigIframeBox = true
            
        },
        downCif(){
            window.location.href = this.cifFile; 
        },
        reS(data){
            return data.split("").reverse().join("")
        },
        matrixAlgorithm(gangdu){
            let _gangdu = {}
            let matrixData = []
            if(gangdu.length){
                let guangduArr = gangdu[0].dataValue.split(',')
                for(let i=0;i<guangduArr.length;i++){
                    let ArrKye = 'c'+(11+i)
                    if(i>5){ // 16
                        ArrKye = 'c'+(16+i)
                    }
                    if(i>10){
                        ArrKye = 'c'+(22+i)
                    }
                    if(i>14){
                        ArrKye = 'c'+(29+i)
                    }
                    if(i>17){
                        ArrKye = 'c'+(37+i)
                    }
                    if(i==20){
                        ArrKye = 'c66'
                    }
                    Object.assign(_gangdu,{
                        [ArrKye]:guangduArr[i]
                    })
                    // _gangdu.push({})
                }
                let _gangduValue = gangdu[0].dataValue.split(',')
                // console.log(_gangduValue)
                /*
                c11,c12,c13,c14,c15,c16
                c21,c22,c23,c24,c25,c26
                c31,c32,c33,c34,c35,c36
                c41,c42,c43,c44,c45,c46
                c51,c52,c53,c54,c55,c56
                c61,c62,c63,c64,c65,c66
                */
                console.log(_gangdu)
                matrixData[0] = _gangduValue.splice(0,6)

                matrixData[1] = [this.reS(_gangdu.c12)]
                matrixData[1] = matrixData[1].concat(_gangduValue.splice(0,5))

                matrixData[2] = [this.reS(_gangdu.c13),this.reS(_gangdu.c23)]
                matrixData[2] = matrixData[2].concat(_gangduValue.splice(0,4))

                matrixData[3] = [this.reS(_gangdu.c14),this.reS(_gangdu.c24),this.reS(_gangdu.c34)]
                matrixData[3] = matrixData[3].concat(_gangduValue.splice(0,3))

                matrixData[4] = [this.reS(_gangdu.c15),this.reS(_gangdu.c25),this.reS(_gangdu.c35),this.reS(_gangdu.c45)]
                matrixData[4] = matrixData[4].concat(_gangduValue.splice(0,2))

                matrixData[5] = [this.reS(_gangdu.c16),this.reS(_gangdu.c26),this.reS(_gangdu.c36),this.reS(_gangdu.c46),this.reS(_gangdu.c56)]
                matrixData[5] = matrixData[5].concat(_gangduValue.splice(0,1))
                return matrixData
                // console.log('this.matrixData------',this.matrixData)
            }
        },
        init(){
            this.$api.getDataSource().then(res=>{ // 数据来源
                var _dataSourceObj = {}
                res.data.data.map(x=>{
                    Object.assign(_dataSourceObj,{[x.id]: x.paramValue})
                })
                this.dataSourceObj = _dataSourceObj
            })
            this.$api.searchResult({dataContail:this.searchKeyWord,dataPid:this.dataPid}).then(res=>{
                let resData = res.data.data
                let _pageData = {}
                resData.map(x=>{
                    let _pageDataObj = {}   
                    x.keyParentList.map(v=>{
                        _pageDataObj[v.dataKey]=v
                    })
                    Object.assign(_pageData,{[x.classId]:_pageDataObj})
                })
                if(_pageData[7]){
                    if(_pageData[7][27]){ // 长度
                        _pageData[7][27].dataValue = _pageData[7][27].dataValue.split(',')
                    }
                    if(_pageData[7][28]){ // 角度
                        _pageData[7][28].dataValue = _pageData[7][28].dataValue.split(',')
                    }
                    if(_pageData[7][29]){
                        this.cifFile = _pageData[7][29].dataValue
                        let name = _pageData[7][29].dataValue.split('/')
                        let nameString = name[name.length-1]
                        this.cifNameString = nameString
                        this.$api.atomSeat(qs.stringify({cifName:nameString})).then(res=>{
                            console.log(res)
                            let resData = res.data.data
                            // resData.map
                            let _name = Object.keys(resData)
                            let _value = Object.values(resData)
                            let changeResData = []
                            for(let i=0;i<_name.length;i++){
                                changeResData = [
                                    ...changeResData,
                                    {
                                        name:_name[i],
                                        value:_value[i],
                                        downIcon:true
                                    }
                                ]
                            }
                            this.cifTableList = changeResData
                        })
                    }
                }
                if(_pageData[8]){ // 刚柔矩阵
                    let pageData8 = Object.values(_pageData[8])
                    for(let i=0;i<this.wulixingenng.length;i++){
                        this.wulixingenng[i].value = pageData8.filter(x=>x.dataKey==this.wulixingenng[i].id)[0].dataValue
                    }
                        let gangdu =  pageData8.filter(x=>x.dataKey==31)
                        let roudu =  pageData8.filter(x=>x.dataKey==32)
                        this.matrixData = this.matrixAlgorithm(gangdu)
                        this.matrixData2 = this.matrixAlgorithm(roudu)
                        
                    _pageData[8] = this.wulixingenng
                }
                // 
                if(_pageData[9]){ // 复合材料结构成分
                    let pageData9 = Object.values(_pageData[9])
                    for(let i=0;i<this.fuhecailiao.length;i++){
                        let _value = pageData9.filter(x=>x.dataKey==this.fuhecailiao[i].id)
                        let _tips = pageData9.filter(x=>x.dataKey==this.fuhecailiao[i].id)
                        if(_value.length){
                            this.fuhecailiao[i].value = _value[0].dataValue
                            if(this.fuhecailiao[i].id==6){
                                this.fuhecailiao[i].value = pageData9.filter(x=>x.dataKey==this.fuhecailiao[i].id)[0].dataValue.split(',')
                            }
                        }
                        if(_tips.length){
                            this.fuhecailiao[i].tips = _tips[0].dataTips
                        }
                        if(this.fuhecailiao[i].id==89||this.fuhecailiao[i].id==90
                            ||this.fuhecailiao[i].id==91||this.fuhecailiao[i].id==92
                            ||this.fuhecailiao[i].id==93||this.fuhecailiao[i].id==94
                            ||this.fuhecailiao[i].id==7||this.fuhecailiao[i].id==8){
                            this.fuhecailiao[i].isShow = false
                            if(this.fuhecailiao[i].value.indexOf(':')>0){
                                this.fuhecailiao[i].value = this.fuhecailiao[i].value.split(':')
                            }else{
                                this.fuhecailiao[i].value = this.fuhecailiao[i].value.split(',')
                            }
                        }
                    }
                    // 89 90 91 92 93 94 
                    _pageData[9] = this.fuhecailiao
                    console.log(this.fuhecailiao)
                }
                if(_pageData[10]){ // 复合材料结构成分
                    let pageData9 = Object.values(_pageData[10])
                    for(let i=0;i<this.fuhecailaiozhibei.length;i++){
                        let _value = pageData9.filter(x=>x.dataKey==this.fuhecailaiozhibei[i].id)
                        let _tips = pageData9.filter(x=>x.dataKey==this.fuhecailaiozhibei[i].id)
                        if(_value.length){
                            this.fuhecailaiozhibei[i].value = _value[0].dataValue
                        }
                        if(_tips.length){
                            this.fuhecailaiozhibei[i].tips = _tips[0].dataTips
                        }
                    }
                    _pageData[10] = this.fuhecailaiozhibei
                }
                if(_pageData[13]){ // 界面力学性能
                    let pageData13 = Object.values(_pageData[13])
                    for(let i=0;i<this.jiemianlixue.length;i++){
                        this.jiemianlixue[i].value = pageData13.filter(x=>x.dataKey==this.jiemianlixue[i].id)[0].dataValue
                        this.jiemianlixue[i].tips = pageData13.filter(x=>x.dataKey==this.jiemianlixue[i].id)[0].dataTips
                        // if(this.jiemianlixue[i].id==61||this.jiemianlixue[i].id==96){
                        //     this.jiemianlixue[i].value = pageData13.filter(x=>x.dataKey==this.jiemianlixue[i].id)[0].dataValue.split(',')
                        // }
                    }
                    _pageData[13] = this.jiemianlixue
                }
                if(_pageData[14]){
                    let pageData14 = Object.values(_pageData[14])
                    for(let i=0;i<this.fuhecailiaolixuexingneng.length;i++){
                        let _value = pageData14.filter(x=>x.dataKey==this.fuhecailiaolixuexingneng[i].id)
                        let _tips = pageData14.filter(x=>x.dataKey==this.fuhecailiaolixuexingneng[i].id)
                        if(_value.length){
                            this.fuhecailiaolixuexingneng[i].value =_value[0].dataValue
                            if(this.fuhecailiaolixuexingneng[i].id==23){
                                this.fuhecailiaolixuexingneng[i].value = pageData14.filter(x=>x.dataKey==this.fuhecailiaolixuexingneng[i].id)[0].dataValue.split(',')
                            }
                        }
                        if(_tips.length){
                            this.fuhecailiaolixuexingneng[i].tips =_value[0]._tips
                        }
                    }
                    _pageData[14] = this.fuhecailiaolixuexingneng
                }
                if(_pageData[15]){
                    let pageData15 = Object.values(_pageData[15])
                    for(let i=0;i<this.yanghua.length;i++){
                        let _value = pageData15.filter(x=>x.dataKey==this.yanghua[i].id)
                        let _tips = pageData15.filter(x=>x.dataKey==this.yanghua[i].id)
                        if(_value.length){
                            this.yanghua[i].value = _value[0].dataValue
                            if(this.yanghua[i].id==63){
                                this.yanghua[i].value = pageData15.filter(x=>x.dataKey==this.yanghua[i].id)[0].dataValue.split(',')
                            }
                        }
                        if(_tips.length){
                            this.yanghua[i].tips = _tips[0].dataTips  
                        }
                    }
                    _pageData[15] = this.yanghua
                }
                
                this.pageDataJson = _pageData
                console.log(_pageData)
                console.log(this.pageDataJson)
            })
        },
        // processingData(data){
        //     for(let i=0;i<data.length;i++){
        //         if(data[i].classId==7){
        //             for(let m=0;m<data[i].keyParentList.length;m++){
        //                 if(data[i].keyParentList[m].dataKey=='29'){
        //                     // this.processingData2(data[i].keyParentList[m])
        //                 }
        //             }
        //         }else{
        //             return
        //         }
        //     }
        // },
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
    .atomSiteBox{
        height: 450px;
        overflow-y: auto;
    }
    .yuanzizuobiao{
        position: relative;
        margin-bottom: 50px;
    }
    .yuanzizuobiao .downIcon{
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translate(-50%,0);
        margin: 0;
    }
    .iframeStyle{
        height: 673px;
        width: 665px;
        position: absolute;
        left: -44px;
        top: -36px;
    }
    .iframeStyle2{
        position: absolute;
        height: 150%;
        width: 150%;
        left: -50px;
        top: -150px;
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
        border-bottom: none;
        /* max-height:400px; */
    }
    .hechengBigBox .hechengRowBox{
        min-height: 40px;
        border-bottom: 1px solid #ddd;
        /* border-right: 1px solid #ddd; */
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
        text-align: center;
        line-height: 60px;
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
        max-height: 525px;
        border: 1px solid #ddd;
        border-top: none;
    }
    .erpBigBox .nonePosition{
        margin-top: 60px;
        position:unset;
    }
    .nonePosition::after{
        content: url('../../../assets/images/nomore.png');
    }
    .erpBigBox .imgTips{
        text-align:left!important;
        padding: 20px;
        height: auto!important;
    } 
    .erpBigBox div{
        height: 100%;
        text-align: center;
        overflow: hidden;
        position: relative;
    }
    .erpBigBox img{
        position: absolute;
        /* top: 50%;
        left: 50%;
        transform: translate(-50%,-50%); */
        
        max-width: 100%;
        height: auto;
    }
    .erpBigBox .fangda{
        transform:translate(0,0)!important;
        right: 10px!important;
        top: 15px!important;
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