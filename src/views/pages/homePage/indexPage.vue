<template>
  <div class="wrap">
		<div class="sqlBox">
			<div class="sqlTit">
				<img src="../../../assets/images/sql.png" alt=""><span>数据库介绍</span>
			</div>
			<div class="sqlText">
				SiCf/SiC陶瓷基复合材料典型界面相数据库，学术期刊设计所需的高达1000种材料的晶体结构、电子结构、X-射线衍射谱/拉曼/红外、弹性性能、合成方法、力学性能、复合材料类型、复合材料性能、数据等。
			</div>
		</div>
		<div style="margin-top:40px;">
			<el-row :gutter="20">
				<el-col :span="22">
					<div class="selectContentBox" @click="selectTitCli()"><!--  下拉框选中值box -->
						<span>BN基界面相-掺杂元素</span>
						<i class="iconfont iconxiala"></i>
					</div>
					<div class="selectItemBigBox" :class="animationSwitch?'unfold':'close'">
						<div class="fl stairItem itemBox">
							<div v-for="(item, index) in stairListArr"
							:key="index" @click="stairItemCli(item.id)"
							:style="selectList.stairItemIsCli==item.id?'color:#33B0B5':'color:#4D4D4D'"
							:data-type="item.id">{{item.content}}</div>
						</div>
						<div class="fl itemBox secondLevelBox" v-if="secondListArr&&secondListArr.length>0">
							<div v-for="(item, index) in secondListArr" :key='index'
								@click="selectItemCli(item.id)"
								:style="selectList.isElementList==item.id?'color:#33B0B5':'color:#4D4D4D'"
								>{{item.content}}</div>
						</div>
						<div class="fl listElements">
							<div class="ul">
								<div style="overflow:hidden">
									<span
										@click="threeLeveCli(item.id,item.centent)"
										:style="[{'font-size':(item.content.length>1?'20px':'24px')},
										{'backgroundColor':(selectList.nowElement==item.id?'#EF992A':'#33B0B5')}]"
										v-for="(item,index) in threeLeveArr" :key="index"
										:data-id="item.id">{{item.content}}</span>
								</div>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="2">
					<div @click="search()" style="width:40px;height:36px;background:#33B0B5;border-radius:4px;text-align:center;line-height:36px;">
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
						<div v-for="(item, index) in searchData.list" :key="index">
							<router-link :to="{path:'/result',query:{id:item.dataContail}}">{{item.dataContail}}</router-link>
						</div>
					</div>
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
		<div class="flootBigBox wrap">
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
		</div>
  </div>
</template>
<script>
export default {
  name: 'layOut',
  data() {
    return {
		animationSwitch:false,
		selectList:{
			stairItemIsCli:'1', // 下拉框第一级点击
			isElementList:'', // 下拉二级菜单点击
			nowElement:'',
			threeContent:''
		},
		currentPage: 1,
		searchValue: ['asdasd','asd','dsret','sdfert','sdfg','asdasd','asd','dsret','sdfert',
		'sdfg','asdasd','asd','dsret','sdfert','sdfg','asdasd','asd','dsret','sdfert','sdfg',
		'asdasd','asd','dsret','sdfert','sdfg','asdasd','asd','dsret','sdfert','sdfg'],
		// 一级菜单
		stairListArr:[],
		// 二级菜单
		secondListArr:[],
		// 三级菜单
		threeLeveArr:[],
		// 分类查询结果
		searchData:{
			totalCount:0,
			pageSize:100,
			totalPage:0,
			currPage:1,
			list:[]
		},
		
    }
  },
  created() {
	this.getSelect()
  },
  methods: {
	getSelect(){
		this.$api.stairList().then( res => {
			this.stairListArr = res.data.data
			this.getSecondList(res.data.data[0].id)
        })
	},
	// 获取一级列表数据
	stairItemCli(e){
		this.secondListArr = []
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
	selectItemCli(id){ // 获取三级列表
		this.selectList.nowElement = ''  // 每次选择先清空三级列表的选项
		this.selectList.isElementList = id
		this.$api.threeLeve(id).then( res => {
			this.threeLeveArr = res.data.data
        })
	},
	threeLeveCli(id,value){
		this.selectList.nowElement = id
		this.selectList.threeLeveArr = value
		this.$api.getSysDataList({page:this.searchData.currPage,limit:this.searchData.pageSize,dataContail:value}).then( res => {
			console.log(res.data.page)
			this.searchData = res.data.page
        })
		
	},
	search() { // 单机搜索
		console.log(this.selectList)
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
	this.threeLeveCli(this.selectList.nowElement,this.selectList.threeLeveArr)
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
	.searchConBoxOver a{
		text-decoration: none;
		color: inherit;
	}
	.searchConBoxOver div{
		cursor: pointer;
		height: 40px;
		border: 1px solid rgba(221,221,221,1);
		width: 190px;
		text-align: center;
		line-height: 40px;
		color: #33B0B5;
		font-size: 14px;
		text-decoration: underline;
		float: left;
		margin-left: -1px;
		margin-top: -1px;
	}
	.searchConBoxOver{
		overflow: hidden;
	}
	.searchConBox{
		width: 1135px;
		margin-top: 21px;
		/* max-height: 397px; */
		overflow: hidden;
		border-top: 1px solid rgba(221,221,221,1);
		border-left: 1px solid rgba(221,221,221,1);
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
	.sqlText{
		color: #333333;
		font-size: 14px;
		padding-top: 20px;
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
		height:137px;
		background:rgba(243,251,251,1);
		border:1px solid rgba(169,223,220,1);
		border-radius:10px;
		margin-top: 40px;
		padding: 24px 20px;
	}
</style>