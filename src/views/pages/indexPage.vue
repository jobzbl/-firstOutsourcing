<template>
  <div class="wrap">
		<div class="sqlBox">
			<div class="sqlTit">
				<img src="../../assets/images/sql.png" alt=""><span>数据库介绍</span>
			</div>
			<div class="sqlText">
				SiCf/SiC陶瓷基复合材料典型界面相数据库，学术期刊设计所需的高达1000种材料的晶体结构、电子结构、X-射线衍射谱/拉曼/红外、弹性性能、合成方法、力学性能、复合材料类型、复合材料性能、数据等。
			</div>
		</div>
		<div>
			<el-row :gutter="20">
				<el-col :span="12">231</el-col>
				<el-col :span="6" :offset="6">123</el-col>
			</el-row>
		</div>
		<div class="searchBigBox">
			<div class="searchTit">检索结果列表：</div>
			<div class="searchConBigBox">
				<div class="searchConTit">搜索到相关数据共<span style="color:#ef992a">{{dataAmount}}</span>条</div>
				<div class="searchConBox">
					<div class="searchConBoxOver">
						<div v-for="(item, index) in searchValue" :key="index">{{item}}</div>
					</div>
				</div>
				<div class="paginationDiv">
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
		</div>
		<div class="flootBigBox wrap">
			<el-row :gutter="20">
				<el-col :span="8">
					<div class="flootBoxTit">
						<img src="../../assets/images/sql.png" alt="">
						<span>数据库描述</span>
					</div>
					<div class="flootTextBox">
						SiCf/SiC陶瓷基复合材料典型界面相数据库，学术期刊设计所需的高达1000种材料的晶体结构、电子结构、X-射线衍射谱/拉曼/红外、弹性性能、合成方法、力学性能、复合材料类型、复合材料性能、数据等。
					</div>
				</el-col>
				<el-col :span="8">
					<div class="flootBoxTit">
						<img src="../../assets/images/laiyuan.png" alt="">
						<span>项目来源</span>
					</div>
					<div class="flootTextBox">
						SiCf/SiC陶瓷基复合材料典型界面相数据库来源于学术期刊设计所需的高达1000种材料的晶体结构、电子结构、X-射线衍射谱/拉曼/红外、弹性性能、合成方法、力学性能、复合材料类型、复合材料性能、数据等学术交流网。
					</div>
				</el-col>
				<el-col :span="8">
					<div class="flootBoxTit">
						<img src="../../assets/images/user.png" alt="">
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
		dataAmount:0,
		currentPage: 1,
		searchValue: ['asdasd','asd','dsret','sdfert','sdfg','asdasd','asd','dsret','sdfert',
		'sdfg','asdasd','asd','dsret','sdfert','sdfg','asdasd','asd','dsret','sdfert','sdfg',
		'asdasd','asd','dsret','sdfert','sdfg','asdasd','asd','dsret','sdfert','sdfg']
    }
  },
  created() {
  },
  methods: {
		handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
		max-height: 397px;
		overflow: hidden;
		border-top: 1px solid rgba(221,221,221,1);
		border-left: 1px solid rgba(221,221,221,1);
	}
	.searchConTit{
		font-size: 12px;
		color: #4D4D4D;

	}
	.searchBigBox{
		margin-top: 16px
	}
	.searchTit{
		font-weight: bold;
		color: #4D4D4D;
		font-size: 16px;;
		margin-bottom: 16px;
	}
	.searchConBigBox{
		height:538px;
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