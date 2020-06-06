<template>
    <div class="wrap">
        <div style="margin-top:12px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="elsePage" :to="{ path: '/' }"> <i style="color:#33B0B5" class="iconfont iconiconfontzhizuobiaozhun023101"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item class="nowPage">{{id=='0'?'复合材料/界面相制备方法页':'力学性能参数说明页'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="subfield">
            <i></i>
            {{id=='0'?'复合材料/界面相制备方法':'力学性能参数说明'}}
        </div>
        <div style="width:1014px" v-if="id==1">
            <div class="h3">刚度矩阵（Cij）和柔度矩阵（Sij）：</div>
            <div class="plainText">材料的刚度(C)和柔度(S)描述材料的弹性响应,反映了弹性应力(σ)-应变(ε)关系,即σ=Cε,ε=Sσ。刚度的二阶张量形式为：</div>
            <div class="imgBox"><img height="250px" src="../../../assets/images/1.png" alt=""></div>

            <div class="h3">模量的Voigt-Reuss-Hill近似模型：</div>
            <div class="plainText">Voigt近似模型（等应力模型）假设多晶材料体系晶粒边界应变连续,将体模量和剪切模量可以表示为：</div>
            <div class="imgBox"><img height="110px" src="../../../assets/images/2.png" alt=""></div>

            <div class="plainText">Reuss近似模型（等应变模型）假设多晶材料体系晶粒边界应力连续,将体模量和剪切模量可以表示为：</div>
            <div class="imgBox"><img height="120px" src="../../../assets/images/3.png" alt=""></div>

            <div class="plainText">Hill证明得到,Voigt近似和Reuss近似结果分别代表弹性模量的上下限,因此可以取二者的算术平均值代表多晶材料真实的弹性模量数值：</div>
            <div class="imgBox"><img height="110px" src="../../../assets/images/4.png" alt=""></div>

            <div class="plainText">杨氏模量（E）和泊松比（ν）均可通过体模量和剪切模量获得：</div>
            <div class="imgBox"><img height="150px" src="../../../assets/images/5.png" alt=""></div>

            <div class="h3">弹性性能各向异性参数：</div>
            <div class="plainText">Voigt和Reuss近似下体模量和剪切模量的偏差（A<sub>B</sub>,A<sub>G</sub>）可以度量弹性各向异性的大小,0%,表示理想的各向同性,100%是各向异性的极限值：</div>
            <div class="imgBox"><img height="65px" src="../../../assets/images/6.png" alt=""></div>

            <div class="plainText">另外一个全局性的各向异性指数A<sub>U</sub>,值为0时表示各向同性,值越大各向异性越强。</div>
            <div class="imgBox"><img height="65px" src="../../../assets/images/7.png" alt=""></div>
        </div>
        <div v-if="id==0">
            <div style="font-size:18px">目前陶瓷基复合材料相关的制备工艺按照原料可以分为三大类：</div>
            <div style="font-size:18px;font-weight:bold;margin:7px 0;">1）气相反应方法</div>
            <div style="font-size:18px">复合材料的界面相、基体和外部涂层均可使用气相前驱体在一定温度下沉积的方法进行制备。普通的化学气相沉积（Chemical Vapor Deposition,CVD）一般只用来制备涂层。基于CVD方法的化学气相渗透工艺(Chemical Vapor Infiltration,CVI),综合了沉积和致密化的过程,可用于在多孔的纤维预制体上沉积界面相和基体。按照CVI过程的具体条件,还有更细分的I-CVI (I, Isothermal/Isobaric, 等温/等压), PG-CVI (PG, Pressure Gradient, 压力梯度), TG-CVI (TG, Temperature Gradient, 温度梯度), F-CVI (Forced, 温度梯度和压力梯度相结合), P-CVI (P, Pressure pulsed, 脉冲压力)。</div>
            <div style="font-size:18px;font-weight:bold;margin:7px 0;">2）液相反应方法</div>
            <div style="font-size:18px">液相反应主要用于复合材料的制备,根据前驱体的不同,主要有三类。以含Si-C的聚合物为前驱体的方法称为聚合物浸渍裂解工艺(Polymer Infiltration and Pyrolysis, PIP)。以液态的硅或者硅化物为前驱体的方法为液硅渗透工艺(Liquid Silicon Infiltration, LSI),也可以称为熔渗工艺(Melt Infiltration, MI)或者反应熔渗工艺(Reaction Melt Infiltration, RMI)。以含基体粉末的浆料为前驱体的方法为浆料浸渍热压(Slurry Impregnation and Hot Pressing, SIHP),</div>
            <div style="font-size:18px;font-weight:bold;margin:7px 0;">3）固相反应方法</div>
            <div style="font-size:18px">固相反应方法主要用于短纤维增强的陶瓷基复合材料。和以粉末为原料的陶瓷烧结工艺类似,主要有热压烧结(Hot Pressing, HP)和热等静压烧结(Hot Isostatic Pressing)。</div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                id:this.$route.query.id,
            }
        },
        created(){
        },
        methods:{
            
        }

    }
</script>    


<style scoped>
    .imgBox{
        text-align: center;
    }
    .imgBox img{
        width: auto;
    }
    .h3{
        font-size: 20px;
        font-weight: 500;
        color: #000;
    }
    .plainText{
        font-size: 20px;
        color: #454545;
    }
    .subfield{
        border-bottom: 1px dashed rgba(204,204,204,1);
        padding: 2px 12px 12px 12px;
        font-size: 18px;
        color: #4d4d4d;
        position: relative;
        margin-bottom: 20px;
        margin-top: 32px
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
