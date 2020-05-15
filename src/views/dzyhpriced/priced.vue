<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/forme' }">选择计划</el-breadcrumb-item>
			<el-breadcrumb-item>{{formName}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content" style="margin-top:30px;">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
				<div class="content_top">
					<el-form-item label="标题" prop="title">
						<el-input v-model="ruleForm.title" placeholder="部门/中心年度专项安全/大修/折旧资金计划"></el-input>
					</el-form-item>
					<el-form-item label="流程">
						<span @click="showModal=true" class="btn">查看流程图</span>
					</el-form-item>
				</div>
				<h3 style="text-align: center;line-height:40px;">{{formName}}</h3>
				<div class="essential_top">
					<p>基本信息</p>
					<ul>
						<li>申请人:<span class="usname">{{applyusername}}</span><i class="iconfont icon-user-3"></i></li>
						<li>申请部门:<span class="usname">{{orgName}}</span><i class="iconfont icon-bumen"></i></li>
						<li>资金类别:
							<span v-if="formName=='低值易耗零星采购计划'" class="usname">零星采购</span>
							<span v-if="formName=='低值易耗月度采购计划'" class="usname">月度采购</span>
							<i class="iconfont icon-bumen"></i></li>
						<li>申请时间:<span>{{applyDate}}</span></li>
					</ul>
				</div>
				<div class="essential_top">
					<p>计划物资信息</p>
				</div>
				<div>
					<el-button plain @click="selectGoodsData" style="margin-top: 2%;">选择物资</el-button>
					<div v-if="booler">
						<el-table :data="gridData">
							<el-table-column property="category.name" label="分类" width="50" align="center"></el-table-column>
							<el-table-column prop="code" label="编码" width="50" align="center"></el-table-column>
							<el-table-column property="name" label="商品/服务名称" width="110" align="center"></el-table-column>
							<el-table-column property="spec" label="规则型号/描述" width="110" align="center"></el-table-column>
							<el-table-column property="unit" label="单位" width="50" align="center"></el-table-column>
							<el-table-column label="数量" align="center">
								<template slot-scope="scope">
									<el-input @input="inputNumber(scope.row)" v-model="scope.row.num"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="goodsPrice" label="预估单价" width="100" align="center">
								<template slot-scope="scope">
									<el-input @input="inputPrice(scope.row)" v-model="scope.row.price"></el-input>
								</template>
							</el-table-column>
							<el-table-column property="goodsTotal" label="预估总价" width="100" align="center">
								<template slot-scope="scope">
									<span>{{scope.row.priceTotal}}</span>
								</template>
							</el-table-column>
							<el-table-column property="goodsType" label="类型" align="center">
								<template slot-scope="scope">
									<el-select v-model="scope.row.goodsType" placeholder="类型">
										<el-option v-for="item in zxfoptionss" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column property="startDate" label="计划实施时间" align="center" width="110">
								<template slot-scope="scope">
									<el-date-picker
										v-model="scope.row.startTime"
										type="date"
										placeholder="选择日期"
										value-format="yyyy-MM-dd">
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column property="endDate" label="计划交付时间" align="center" width="110">
								<template slot-scope="scope">
									<el-date-picker
										v-model="scope.row.endTime"
										type="date"
										placeholder="选择日期"
										value-format="yyyy-MM-dd">
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column property="factoryName" label="主机厂家" align="center"></el-table-column>
							<el-table-column property="technologyDesc" label="技术要求" align="center"></el-table-column>
							<el-table-column property="remarks" label="备注" align="center"></el-table-column>
							<el-table-column label="操作" width="50">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="deleteGoodsEvent(scope.row.id)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
				<el-form-item label="下一步审核人" prop="userId" ref="userId">
					<el-select style="width:40%;" @change="getUserId" filterable v-model="ruleForm.userId" placeholder="请选择审核人">
						<el-option v-for="m in userArr" :label="m.name" :value="m.id" :key="m.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="采购说明" prop="textarea">
					<el-input style="width:40%;" type="textarea" :rows="2" placeholder="请输入采购说明" v-model="ruleForm.textarea"></el-input>
				</el-form-item>
				<el-form-item style="float:right;margin-top:20px;">
					<el-button @click="cancel()">取消</el-button>
					<el-button type="primary" @click="audit(1)">保存草稿</el-button>
					<el-button type="pr imary" @click="audit(2)">提交审核</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 选择订单弹框 -->
		<el-dialog title="变更订单选择" :visible.sync="dialogTableVisible" width="80%">
			<el-row :gutter="20">
				<el-col :span="5">
					<div style="margin-bottom: 10px;">商品种类(单选)</div>
					<div class="selectContract">
						<div v-for="item in globalData" :key="item.id">
							<input @click="handleOrderDialog(item.id)" type="radio" name="1" :value="item.name" />
							<span>{{item.name}}</span>
						</div>
					</div>
				</el-col>
				<el-col :span="4">
					<i class="el-icon-plus iconOrderSelect"></i>
				</el-col>
				<el-col :span="15">
					<div style="margin-bottom: 10px;">商品名称</div>
					<div class="materialMsg">
						<el-input style="width: 96%" v-model="input" placeholder="请输入商品名称"></el-input>
						<el-table border :data="materialTableData" style="width: 100%;margin:20px 0;" @selection-change="handleSelectionChange">
							<el-table-column type="selection" align="center" width="55"></el-table-column>
							<el-table-column align="center" prop="code" label="商品编码"></el-table-column>
							<el-table-column align="center" prop="name" label="商品名称"></el-table-column>
							<el-table-column align="center" prop="spec" label="规格型号（品牌）"></el-table-column>
						</el-table>
						<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" @pagination="handleOrderDialog" />
					</div>
				</el-col>
			</el-row>
			<span slot="footer" style="">
        <el-button @click="dialogTableVisible= false">取 消</el-button>
        <el-button type="primary" @click="comfigselectVisible">添加</el-button>
      </span>
		</el-dialog>
	</div>
</template>

<script>
	import { parseTime } from "@/utils"
	import Pagination from '@/components/Pagination'
	import { getAjax, postAjax,postAjaxJson, postAjaxx } from '@/utils/ajaxRequest'
	export default {
		components: {
			Pagination
		},
		data() {
			return {
				listQuery: {
					page: 1
				},
				total: 0,
				globalData: [],
				input: "",
				applyDate: "",
				applyusername: "",
				orgName: "",
				userArr: [],
				ruleForm: {
					title: "低值易耗",
					userId: "",
					searchValue: "",
				},
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'change'
					}],
					userId: [{
						required: true,
						message: '请选择下一步审核人',
						trigger: 'blur'
					}],
					searchValue: [{
						required: true,
						message: '请选择项目类别',
						trigger: 'blur'
					}],
				},
				zxfoptionss: [{
						value: "物资",
						label: "物资"
					},
					{
						value: "设备",
						label: "设备"
					},
					{
						value: "工程",
						label: "工程"
					},
					{
						value: "服务",
						label: "服务"
					},
				],
				formName: '',
				dialogTableVisible: false, //弹框
				textarea: "", //文本域
				booler: false, //
				//虚拟表格
				gridData: [],
				assigneeExpressionText: "",
				departId: "",
				name: "",
				// 选择物资按钮弹框表格
				materialTableData: [],
				selectGoodsList: [],
			};
		},
		created() {
			this.applyDate = parseTime(new Date(), "{y}-{m}-{d}");
			this.applyusername = sessionStorage.userName;
			this.orgName = sessionStorage.orgName;
			this.formName=this.$route.query.formName;
			postAjaxJson(`/api/processService/userTask/getFirstExaminePerson/dzyhydcgjh`).then(res => {
				if(res.code == 0) {
					this.userArr = res.data;
          console.info(JSON.stringify(this.userArr));
				}
			});
		},
		methods: {
			deleteGoodsEvent(id) {
				var index = this.gridData.findIndex(item => item.id === id)
				this.gridData.splice(index, 1)
			},
			inputPrice(e) {
				e.priceTotal = e.num * e.price
			},
			inputNumber(e) {
				e.priceTotal = e.num * e.price
			},
			handleOrderDialog(e) {
				console.log(e)
				getAjax(`/api/goodsService/goods/pageList?search_eq_categoryid=8aa5018271889153017188aadfc4000e&sort=desc_name&limit=5&page=${this.listQuery.page - 1}`).then(res => {
					console.log(res)
					res.data.content.forEach(item => {
						item.num = ''
						item.price = ''
						item.priceTotal = ''
						item.startTime = ''
						item.endTime = ''
					})
					this.materialTableData = res.data.content
					this.total = res.data.totalElements
				})
			},
			// 点击选择物资按钮触发该事件
			selectGoodsData() {
				this.materialTableData = []
				this.dialogTableVisible = true
				getAjax(`/api/goodsService/category/list`).then(res => {
          console.log(res)
					console.log('获取的物资列表')
					this.globalData = res.data
        })
			},
			cancel(){
				this.$router.push({
					path:"/forme"
				});
			},
			// 表格点击当前索引事件
			handleSelectionChange(row) {
				this.selectGoodsList = row
				// console.log(row)
				// row.forEach(item => {
				// 	this.gridData.goodName = element.item
				// 	// item.goodName =row.goodName
				// 	console.log(this.gridData.goodName)
				// 	// });
				// });
			},
			comfigselectVisible() {
				this.booler = true
				this.dialogTableVisible = false
				this.gridData = this.selectGoodsList
				console.log(this.gridData)
			},
			getUserId(value) {
				_.forEach(this.userArr, val => {
					if(this.ruleForm.userId == val.id) {
						this.assigneeExpressionText = val.assigneeExpressionText;
						this.departId = val.departId;
						this.name = val.name;
					}
				});
			},
			audit(m) {
				this.$refs['ruleForm'].validate((valid) => {
							if(valid) {
								this.gridData.forEach(item => {
									item.goodsClass = item.category.name
									item.goodsCode = item.code
									item.goodsName = item.name
									item.goodsModel = item.spec
									item.goodsunit = item.unit
									item.goodsNumber = item.num
									item.goodsPrice = item.price
									item.goodsTotal = item.priceTotal
									item.startDate = item.startTime
									item.endDate = item.endTime
								})

								var param = {
									"planApply": {
										"applyDate": parseTime(new Date(), "{y}-{m}-{d}"),
										"applyRecord": "",
										"applyState": m,
										"applyType": "",
										"applyUsername": sessionStorage.userName,
										"applyresult": "",
										"createDate": parseTime(new Date(), "{y}-{m}-{d}"),
										"createUser": sessionStorage.userId,
										"deleteDate": "",
										"deleteUser": "",
										"flowId": "",
										"formId": this.$route.query.id,
										"id": "",
										"orgId": sessionStorage.orgId,
										"orgName": sessionStorage.orgName,
										"orgType": sessionStorage.orgType,
										"planClass": "",
										"raskMark": "",
										"remarks": "",
										"title": this.ruleForm.title,
										"updateDate": "",
										"updateUser": "",
										"useable": "1"
									},
									"planImplement": {
										"applyDate": parseTime(new Date(), "{y}-{m}-{d}"),
										"applyId": "",
										"beforeId": "",
										"belongMonth": "",
										"belongYear": "",
										"chargeDesc": "",
										"createDate": "",
										"createUser": sessionStorage.userId,
										"deleteDate": "",
										"deleteUser": "",
										"endDate": "",
										"formClass": "",
										"formId": this.$route.query.id,
										"fundsType": "",
										"handleDate": "",
										"handleOrgId": "",
										"handleOrgName": "",
										"handleOrgType": "",
										"id": "",
										"orgId": sessionStorage.orgId,
										"orgName": sessionStorage.orgName,
										"orgType": sessionStorage.orgType,
										"planDesc": "",
										"planType": this.$route.query.formName,
										"remarks": "",
										"startData": parseTime(new Date(), "{y}-{m}-{d}"),
										"title": this.ruleForm.title,
										"updateDate": "",
										"updateUser": sessionStorage.userId,
										"useable": "1"
									},
									"planImplementgoods": this.gridData,
									"startWorkflowParameterVo": {
										"assigneeExpressionText": this.assigneeExpressionText,
										"departId": this.departId,
										"deploymentKey": "dzyhydcgjh",
										"id": this.ruleForm.userId,
										"name": this.name,
										"userId": sessionStorage.userId
									},
									"submitType": m
								}
								postAjaxx("/api/planmanagementService/lowValueMonthCon/saveLowValGoods", JSON.stringify(param)).then(res => {
										if(res.code == 0) {
											this.$message("成功");
											this.$router.push({
												path:"/home/index"
											});
										} else {
											this.$message(res.message);
										}
										 });
									}
								});
						}
					},
			};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
	.content {
		width: 90%;
		margin: 10px auto;
		/* background-color: antiquewhite; */
		min-height: 500px;
	}

	.content>h3 {
		text-align: center;
		margin: 10px 0;
	}

	.content_top>p {
		line-height: 55px;
		font-size: 14px;
	}

	.content_top>p>span {
		display: inline-block;
		cursor: pointer;
		color: rgb(89, 156, 255);
		margin-left: 1%;
	}

	.content_top>p>input {
		width: 82%;
		margin-left: 1%;
		height: 32px;
		padding: 0 10px;
	}

	.essential_top>p {
		height: 45px;
		line-height: 45px;
		padding: 0 22px;
		background-color: rgba(243, 243, 243, 0.829);
		font-size: 15px;
	}

	.essential_top>ul {
		display: flex;
		justify-content: space-between;
		height: 75px;
		line-height: 75px;
		padding: 0 28px;
	}

	.essential_top>ul>li {
		font-size: 14px;
	}

	.essential_top>p {
		height: 45px;
		line-height: 45px;
		padding: 0 22px;
		background-color: rgba(243, 243, 243, 0.829);
		font-size: 15px;
	}

	.cgsm {
		margin-top: 5%;
	}

	.cgsm>p {
		height: 45px;
		line-height: 45px;
		padding: 0 22px;
		background-color: rgba(243, 243, 243, 0.829);
		font-size: 15px;
	}
	/* 提交审核 */

	.bottom {
		display: flex;
		justify-content: flex-end;
		height: 100px;
		line-height: 100px;
		/* border-bottom: 1px solid black; */
	}

	.bottom>span:nth-child(1) {
		display: inline-block;
		width: 150px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border: 1px solid rgb(119, 119, 119);
		cursor: pointer;
		margin: auto 0;
		margin-right: 5%;
	}

	.bottom>span:nth-child(2) {
		display: inline-block;
		width: 150px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border: 1px solid rgb(119, 119, 119);
		cursor: pointer;
		margin: auto 0;
		margin-right: 5%;
	}

	.bottom>span:nth-child(3) {
		display: inline-block;
		width: 150px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-color: rgb(240, 6, 6);
		cursor: pointer;
		margin: auto 0;
		color: white;
		margin-right: 3%;
	}

	.selectContract {
		width: 100%;
		height: 400px;
		overflow: auto;
		border: 1px solid #ccc;
		input {
			margin: 15px;
		}
	}

	.materialMsg {
		border: 1px solid #ccc;
		height: 400px;
		.el-input {
			margin: 20px 10px;
		}
	}
</style>
