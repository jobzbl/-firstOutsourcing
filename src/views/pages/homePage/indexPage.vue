<template>
  <div class="wrap">
		<div class="sqlBox">
			<div class="sqlTit">
				<img src="../../../assets/images/sql.png" alt=""><span>数据库介绍</span>
			</div>
			<div class="sqlText">
				<p>
					本数据库主要涵盖SiC<sub>f</sub>/SiC陶瓷基复合材料中BN基、PyC基典型界面相和新型稀土硅酸盐抗氧化界面相材料晶体结构、<router-link :to="{path:'/explain',query:{'id':'1'}}">力学性能</router-link>、热学性能数据及其相关<router-link :to="{path:'/explain',query:{'id':'0'}}">复合材料制备方法</router-link>、力学性能和抗氧化腐蚀性能等。数据库总结了国内外SiC<sub>f</sub>/SiC陶瓷基复合材料的制备、组织结构和宏观性能等研究成果，重点突出界面相的成分、微观结构和性能对复合材料的重要影响，涵盖典型界面相和新型抗氧化界面相的基础物性和显微结构等信息，可用于指导陶瓷基复合材料界面的组分与结构优化并实现高效调控，是基于材料基因工程方法加速陶瓷基复合材料研发周期的重要数据基础和支撑平台。
				</p>
				<p>
					本数据库项目属于国家重点研发计划“陶瓷基复合材料的高通量模拟计算、制备研发及示范应用”(2017YFB0703200)项目中“陶瓷基复合材料界面设计与高通量计算” (2017YFB0703201)课题的成果。项目由工业和信息化部资助、中国科学院上海硅酸盐研究所牵头，课题由中国科学院金属研究所、沈阳材料科学国家研究中心的陶瓷及复合材料研究部承担。
				</p>
				
			</div>
		</div>
		<div style="margin-top:40px;">
			<el-row :gutter="20">
				<el-col :span="22">
					<div class="selectContentBox" @click="selectTitCli()"><!--  下拉框选中值box -->
						<span style="color:#bbb" v-if="!selectDataKey.first">请在下拉中选择</span>
						<span v-if="selectDataKey.first">{{selectDataKey.first}}{{selectDataKey.second?'-':''}}{{selectDataKey.second}}</span>
						<i class="iconfont iconxiala"></i>
					</div>
					<div class="selectItemBigBox" :class="animationSwitch?'unfold':'close'">
						<div class="fl stairItem itemBox">
							<div v-for="(item, index) in stairListArr"
							:key="index" @click="stairItemCli(item.id,item.pid)"
							:style="selectList.stairItemIsCli==item.id?'color:#33B0B5':'color:#4D4D4D'"
							:data-type="item.id">{{item.content}}</div>
						</div>
						<div class="fl itemBox secondLevelBox" v-if="secondListArr&&secondListArr.length>0">
							<div v-for="(item, index) in secondListArr" :key='index'
								@click="selectItemCli(item.id,item.pid)"
								:style="selectList.isElementList==item.id?'color:#33B0B5':'color:#4D4D4D'"
								>{{item.content}}</div>
						</div>
						<div class="fl listElements">
							<div class="ul">
								<div style="overflow:hidden;width:582px">
									<span
										v-for="(item2,index) in threeLeveArr" :key="index+'asd'"
										@click="threeLeveCli(item2.id,item2.content,item2,index,item2.id,item2.pid)"
										:style="[{'font-size':(item2.content.length>1?'20px':'24px')},
										{'backgroundColor':(spanIndex.indexOf(item2.content)>-1?'#EF992A':'#33B0B5')}]"
										:data-id="item2.id">{{item2.content}}</span>
								</div>
							</div>
						</div>
					</div>
				</el-col>
					<!-- v-if="selectList.dataId!=1&&selectList.dataId!=2&&selectList.dataId!=3&&selectList.dataId!=5&&selectList.dataId!=7&&selectList.dataId!=9" -->
				<el-col :span="2" style="position:relative">
					<div @click="search()"
					style="position:absolute;top:0;z-index:99;cursor: pointer;width:40px;height:36px;background:#33B0B5;border-radius:4px;text-align:center;line-height:36px;">
						<i class="iconfont iconsousuo" style="font-size:20px;color:#fff;"></i>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="searchBigBox">
			<div class="searchTit">检索结果列表：</div>
			<div class="searchConBigBox">
				<div class="searchConTit">搜索到相关数据共<span style="color:#ef992a">{{searchData.totalCount}}</span>条</div>
				<div class="searchConBox">
					<div class="searchConBoxOver">
						<div v-for="(data, index) in searchData.list" :key="index">
							<router-link :to="{path:'/result',query:{'id':data.dataContail,'dataTips':data.dataDescription,'dataPid':data.dataPid,'dataValue':data.param2,'dataMain':data.dataMain}}">
							{{data.dataContail}}-{{data.param106}}-{{data.param107}}-{{data.param108}}
							</router-link>
						</div>
					</div>
					<img v-if="searchData.list.length<1" src="../../../assets/images/nomore.png" alt="">
				</div>
				<div class="paginationDiv">
					<el-pagination 
					@current-change="handleCurrentChange"
						:current-page.sync="searchData.currPage"
						:page-size="searchData.pageSize"
						layout="prev, pager, next, jumper"
						:total="searchData.totalCount">
					</el-pagination>
				</div>
			</div>
		</div>
		<div class="sqlBox">
			<div class="sqlTit">
				<img src="../../../assets/images/user.png" alt=""><span>联系我们</span>
			</div>
			<div class="sqlText" style="text-align:center;margin-top:28px">
				<p>
				管理员邮箱：jieminwang@imr.ac.cn
				</p>
				<p>
				中国科学院金属研究所-沈阳材料科学国家研究中心-陶瓷及复合材料研究部 版权所有 xxxxx号
				</p>
			</div>
		</div>
		<!-- <div class="flootBigBox wrap">
			<el-row :gutter="20">
				<el-col :span="8">
					<div class="flootBoxTit">
						<img src="../../../assets/images/sql.png" alt="">
						<span>数据库描述</span>
					</div>
					<div class="flootTextBox">
						SiCf/SiC陶瓷基复合材料典型界面相数据库，学术期刊设计所需的高达1000种材料的晶体结构、电子结构、X-射线衍射谱/拉曼/红外、弹性性能、合成方法、力学性能、复合材料类型、复合材料性能、数据等。
					</div>
				</el-col>
				<el-col :span="8">
					<div class="flootBoxTit">
						<img src="../../../assets/images/laiyuan.png" alt="">
						<span>项目来源</span>
					</div>
					<div class="flootTextBox">
						SiCf/SiC陶瓷基复合材料典型界面相数据库来源于学术期刊设计所需的高达1000种材料的晶体结构、电子结构、X-射线衍射谱/拉曼/红外、弹性性能、合成方法、力学性能、复合材料类型、复合材料性能、数据等学术交流网。
					</div>
				</el-col>
				<el-col :span="8">
					<div class="flootBoxTit">
						<img src="../../../assets/images/user.png" alt="">
						<span>参与人员</span>
					</div>
					<div class="flootTextBox">
						王强、曾博文、付致敬、刘波、陈琳、常雅静、黄新宇、刘美鑫、陈翔、刘文文、张静、李华。
					</div>
				</el-col>
			</el-row>
		</div> -->
  </div>
</template>
<script>
export default {
  name: 'layOut',
  data() {
    return {
		beiyongid:'',
		beiyongpid:'',
		animationSwitch:false,
		selectList:{
			stairItemIsCli:'1', // 下拉框第一级点击
			isElementList:'', // 下拉二级菜单点击
			nowElement:'',
			threeContent:'',
			dataId:1,
			dataPid:0
		},
		currentPage: 1,
		// 一级菜单
		stairListArr:[],
		// 二级菜单
		secondListArr:[],
		// 三级菜单
		threeLeveArr:[],
		// 分类查询结果
		searchData:{
			totalCount:0,
			pageSize:1,
			totalPage:0,
			currPage:60,
			list:[]
		},
		selectDataKey:{
			first:'',
			second:'',
		},
		spanIndex:[]
    }
  },
  created() {
	this.getSelect()
  },
  methods: {
	getSelect(){
		this.$api.stairList().then( res => {
			this.stairListArr = res.data.data
			this.selectList.dataId = this.stairListArr[0].id
			this.selectList.dataPid = this.stairListArr[0].pid
			this.spanIndex = []
			this.getSecondList(res.data.data[0].id)
		})
		this.$api.getDataSource().then(res=>{ // 数据来源
            var _dataSourceObj = {}
            res.data.data.map(x=>{
                Object.assign(_dataSourceObj,{[x.id]: x.paramValue})
			})
			localStorage.setItem('dataSourceObj', JSON.stringify( _dataSourceObj ))
			this.dataSourceObj = _dataSourceObj;
        })
	},
	// 获取一级列表数据
	stairItemCli(e,dataPid){
		let newData = this.stairListArr.filter(x=>x.id == e)
		this.selectDataKey.first = newData[0].content
		this.secondListArr = []
		this.selectList.dataId = e
		this.spanIndex = []
		this.selectList.dataPid = dataPid
		this.getSecondList(e)
		this.selectList.stairItemIsCli = e;
	},
	getSecondList(id) { // 获取二级列表
		this.threeLeveArr = [] // 每次选择先清空三级列表
		this.selectList.isElementList = '' // 每次选择先清空二级列表的选项
		this.$api.secondList(id).then( res => {
			this.secondListArr = res.data.data
        })
	},
	selectItemCli(id,dataPid){ // 获取三级列表
		let newData = this.secondListArr.filter(x=>x.id == id)
		this.selectDataKey.second = newData[0].content
		this.selectList.nowElement = ''  // 每次选择先清空三级列表的选项
		this.selectList.isElementList = id
		this.selectList.dataId = id
		this.spanIndex = []
		this.selectList.dataPid = dataPid
		this.beiyongid = id
		this.beiyongpid = dataPid
		this.$api.threeLeve(id).then( res => {
			this.threeLeveArr = res.data.data
			for(let i=0;i<this.threeLeveArr.length;i++){
				this.threeLeveArr[i].status=1
			}
			
        })
	},
	search() { // 单机搜索
		var params = {
			page:this.searchData.pageSize,
			limit:this.searchData.currPage,
			dataContail:this.spanIndex.toString()||'',
			dataId:this.selectList.dataId,
			dataPid:this.selectList.dataPid
		}
		if(params.dataId == 5){
			if(params.dataContail==''){
				params.dataPid = 5
				params.dataId = 34
				params.dataContail='C,O,Si'
			}
		} else if(params.dataId == 7){
			if(params.dataContail==''){
				params.dataPid = 7
				params.dataId = 54
				params.dataContail='B,N,O,Si'
			}
		} else if(params.dataContail==''){
			delete params.dataContail
		}
		// if(params.dataId == 9){
		// 	if(params.dataContail==''){
		// 		params.dataContail=='B,N,O,Si'
		// 	}
		// }
		// if(params.dataContail==''){
        //   delete params.dataContail
		// }
		console.log(params)
		this.$api.getSysDataList(params).then( res => {
			console.log(res)
			if(res.data.code==500){
				this.searchData.list=[]
				this.searchData={
					totalCount:0,
					pageSize:1,
					totalPage:0,
					currPage:60,
					list:[]
				}
			}else{
				this.searchData = res.data.page
			}
        })
	},
	threeLeveCli(id,value,data,index,dataId,dataPid){
		console.log(dataId)
		console.log(dataPid)
		console.log(data)
		let arrIndex = this.spanIndex.indexOf(value);
        if(arrIndex>-1){
            this.spanIndex.splice(arrIndex,1);
        }else{
            this.spanIndex.push(value);
		}
		this.selectList.dataId = dataId
		this.selectList.dataPid = dataPid
		if(this.spanIndex.length==0){
			this.selectList.dataId = this.beiyongid
			this.selectList.dataPid = this.beiyongpid
		}
		this.selectList.nowElement = id
		this.selectList.threeLeveArr = value
	},
	
	
	selectTitCli() { // 点击下拉框
		if(this.animationSwitch){
			this.getSelect()
			this.threeLeveArr = []
			this.selectList = {
				stairItemIsCli:'1', // 下拉框第一级点击
				isElementList:'', // 下拉二级菜单点击
				nowElement:'',
				threeContent:''
			}
		}
		this.animationSwitch = !this.animationSwitch
	},
    handleCurrentChange(val) {
	console.log(`当前页: ${val}`)
	console.log(this.searchData)
	// this.threeLeveCli(this.selectList.nowElement,this.selectList.threeLeveArr,this.selectList)
	this.search()
    },
    init() {
    }
  }
}
</script>
<style lang="less">
	.paginationDiv{
		text-align: center;
		.el-pagination{
			width: 50%;
			margin: 20px auto;
			/* display: inline-block; */
		}
		.btn-prev{
			height: 35px;
			width: 37px;
			border:1px solid rgba(51,176,181,1);
			text-align: center;
			line-height: 35px;
			padding: 0!important;
			border-radius: 3px;
		}
		.number, .btn-next, .el-pager li.btn-quicknext,.el-pagination__editor{
			color: #33B0B5;
			height: 35px;
			width: 37px;
			border:1px solid rgba(51,176,181,1)!important;
			text-align: center;
			line-height: 35px;
			padding: 0!important;
			border-radius: 3px;
			margin:0 3px;
		}
		.active{
			background: #33B0B5;
			color: #fff!important;
		}
		.el-pagination__jump{
			height: 35px!important;
			color: #33B0B5;
			line-height: 35px!important;
		}
		.btn-next {
			margin-left: 5px!important;
		}
		.el-pagination__editor{
			width: 53px!important;
		}
		.el-pagination__editor .el-input__inner{
			outline:none!important;
			border: none!important;
			color: #33B0B5!important;
		}
		.el-icon{
			color: #33B0B5
		}
		.el-pager li.btn-quicknext{
		}
	}

</style>
<style scoped>
	.unfold{
		height: auto;
	}
	.close{
		height: 0;
	}
	.listElements{
		margin-left: 16px;
	}
	.listElements .ul{
		overflow: hidden;
	}
	.listElements span{
		cursor: pointer;
		float: left;
		margin-left: 2px;
		margin-bottom: 2px;
		width:34px;
		height:34px;
		background:rgba(51,176,181,1);
		border-radius:2px;
		font-size: 24px;
		color: #fff;
		line-height: 34px;
		text-align: center;
	}
	.secondLevelBox{
		height:144px;
		border:1px solid rgba(204,204,204,1);
		border-radius:0px 0px 4px 4px;
		border-left: none;
		height: 174px;
		width: 100px;
	}
	.itemBox div{
		font-size: 14px;
		color: #4D4D4D;
		padding: 12px;
		cursor: pointer;
	}
	.itemBox div:hover{
		color: #33B0B5
	}
	.selectItemBigBox{
		overflow: hidden;
		/* 清除浮动 */
		transition:all 2s ease;
		-moz-transition:all 2s ease; /* Firefox 4 */
		-webkit-transition:all 2s ease; /* Safari and Chrome */
		-o-transition:all 2s ease; /* Opera */
	}
	.stairItem{
		width: 240px;
		border:1px solid rgba(204,204,204,1);
		border-radius:0px 0px 4px 4px;
		border-top: none;
		height: 174px;
	}
	.fl{
		float: left;
	}
	.selectContentBox{
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		padding: 11px 12px;
		color: #4D4D4D;
		width: 240px;
		border: 1px solid rgba(204,204,204,1);
		border-radius:4px 4px 0px 0px;
	}
	.flootBoxTit img{
		display: inline-block;
		width: 15px;
		height: 15px;
		margin-right: 6px;
	}
	.flootBoxTit{
		text-align:center;
		font-size: 16px;
		font-weight: bold;
		color: #4D4D4D;
		margin-bottom: 25px;
	}
	.flootTextBox{
		width: 287px;
		margin:0 auto;
		font-size: 14px;
		color: #333333;
	}
	.flootBigBox{
		height:248px;
		background:rgba(243,251,251,1);
		border:1px solid rgba(169,223,220,1);
		border-radius:10px;
		margin: 40px 0 136px;
		padding: 43px 48px;
	}
	.searchConBox img{
		position:absolute;
		width: 148px;
		height: auto;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%)
	}
	.searchConBoxOver a{
		text-decoration: underline;
		color: inherit;
	}
	.searchConBoxOver{
		width: 1150px
	}
	.searchConBoxOver div{
		cursor: pointer;
		height: 40px;
		border: 1px solid rgba(221,221,221,1);
		width: 228px;
		text-align: center;
		line-height: 40px;
		color: #33B0B5;
		font-size: 14px;
		/* text-decoration: underline; */
		float: left;
		margin-left: -1px;
		margin-top: -1px;
	}
	.searchConBoxOver{
		overflow: hidden;
	}
	.searchConBox{
		position: relative;
		width: 1135px;
		margin-top: 21px;
		min-height: 508px;
		overflow: hidden;
		border: 1px solid rgba(221,221,221,1);
	}
	.searchConTit{
		font-size: 12px;
		color: #4D4D4D;
	}
	.searchBigBox{
		margin-top: 24px
	}
	.searchTit{
		font-weight: bold;
		color: #4D4D4D;
		font-size: 16px;;
		margin-bottom: 16px;
	}
	.searchConBigBox{
		background:rgba(255,255,255,1);
		border:2px solid rgba(243,243,243,1);
		border-radius:10px;
		padding: 20px 25px
	}
	.sqlText p{
		color: #333333;
		font-size: 14px;
		padding-top: 20px;
		text-indent: 2em;
		line-height: 24px;
		padding: 0;
	}
	.sqlText a{
		color: #33B0B5;
		text-decoration: underline;
		cursor: pointer;
	}
	.sqlTit img{
		margin-right: 6px;
		width: 15px;
		height: auto;
	}
	.sqlTit{
		font-size: 16px;
		color: #4D4D4D;
		font-weight: bold;
		height: 20px;
		display: table-cell;
		vertical-align: middle;
		width: 1120px;
		border-bottom:1px dashed rgba(169,223,220,1);
		padding-bottom: 10px;
	}
	.sqlBox{
		background:rgba(243,251,251,1);
		border:1px solid rgba(169,223,220,1);
		border-radius:10px;
		margin-top: 40px;
		padding: 24px 20px 15px;
	}
</style>