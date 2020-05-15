<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>低值易耗月度采购计划单</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="zxfplan">
			<h3>低值易耗月度采购计划单</h3>
			<span>维修中心</span>
			<span>王华</span>
			<span>2019-11-12</span>
			<strong>查看流程图</strong>
			<div class="zxfplans">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="计划表" name="first">
						<div class="zxfschedule">
							<h4>低值易耗月度采购计划单</h4>
						</div>
						<div class="zxfMerchandise">
							<div class="ztable">
								<el-table :data="maintaintableData">
									<el-table-column property="goodsClass" label="分类" width="50" align="center"></el-table-column>
									<el-table-column property="goodsCode" label="编码" width="50" align="center"></el-table-column>
									<el-table-column property="goodsName" label="商品/服务名称" width="110" align="center"></el-table-column>
									<el-table-column property="goodsModel" label="规则型号/描述" width="110" align="center"></el-table-column>
									<el-table-column property="goodsunit" label="单位" width="50" align="center"></el-table-column>
									<el-table-column property="goodsNumber" label="数量" width="50" align="center"></el-table-column>
									<el-table-column property="goodsPrice" label="预估单价" width="100" align="center"></el-table-column>
									<el-table-column property="goodsTotal" label="预估总价" width="100" align="center"></el-table-column>
									<el-table-column property="goodsType" label="类型" align="center"></el-table-column>
									<el-table-column property="startDate" label="计划实施时间" align="center" width="110"></el-table-column>
									<el-table-column property="endDate" label="计划交付时间" align="center" width="110"></el-table-column>
									<el-table-column property="factoryName" label="主机厂家" align="center"></el-table-column>
									<el-table-column property="technologyDesc" label="技术要求" align="center"></el-table-column>
									<el-table-column property="remarks" label="备注" align="center"></el-table-column>
								</el-table>
								<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
							</div>
							<div class="zxfaggregate">
								采购说明:<span>所有的都是日常需要</span>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="审核历史" name="third">
						<div class="zxfblock">
							<el-timeline>
								<el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
									{{activity.content}}
								</el-timeline-item>
							</el-timeline>
						</div>
						<div class="zxftime">
							<span>提交审核</span>
							<p>同意</p>
							<p>审核说明:<span>无</span></p>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<el-card class="box-card" shadow="never" style="margin-top:20px;">
			<div slot="header" class="clearfix">
				<div style="font-size:18px;line-height:40px;">审核结果</div>
			</div>
			<div class="text item">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="审核结果" prop="result">
						<el-select v-model="ruleForm.result" style="width:400px;" placeholder="请选择审核结果">
							<el-option v-for="m in resultArr" :key="m.label" :label="m.label" :value="m.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审核说明" prop="suggest">
						<el-input v-model="ruleForm.suggest" type="textarea" style="width:400px;" placeholder="请输入审核说明"></el-input>
					</el-form-item>
					<el-form-item v-if="ruleForm.result=='同意'&&peopleArr.length!=0&&isEnd!='结束'" label="选择审核人" prop="people">
						<el-select v-model="ruleForm.people" style="width:400px;" placeholder="请选择选择审核人">
							<el-option v-for="m in nextPer" :key="m.id" :label="m.name" :value="m.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
						<el-button @click="cancel()">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	import Navbar from '@/views/layout/components/Navbar'
	import Results from '../result/components/results/results' //审核结果
	import { getAjax, postAjax, postAjaxJson } from '@/utils/ajaxRequest'
	import Pagination from '@/components/Pagination'
	export default {
		components: {
			Pagination,
			Results
		},
		data() {
			return {
				isEnd: '',
				total: 0,
				listQuery: {
					page: 1,
					limit: 10,
				},
				resultArr: [{
					label: "同意",
					value: "同意"
				}, {
					label: "不同意",
					value: "不同意"
				}],
				peopleArr: [],
				isEnd: "",
				ruleForm: {
					people: "",
					suggest: "",
					result: ""
				},
				rules: {
					result: [{
						required: true,
						message: '请选择审核结果',
						trigger: 'change'
					}],
					suggest: [{
						required: true,
						message: '请输入审核说明',
						trigger: 'change'
					}],
					people: [{
						required: true,
						message: '请选择审核人',
						trigger: 'change'
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
				maintaintableData: [], //计划表格
				activeName: 'first', //标签页切换
				// 时间线
				activities: [],
				textarea: '', //审核结果文本域
				valuename: '', //初始为空
				// 审核结果
				value: '',
				nextPer: [],
			}
		},
		created() {
      var paramVars = {
          "manger":"yes"
      }
			postAjaxJson(`/api/processService/userTask/getNextExaminePersonByVars/` + this.$route.query.taskId,paramVars).then(res => {
				if(res.code == 0) {
					this.peopleArr = res.data;
					console.info("------" + JSON.stringify(this.peopleArr));
					//获取下一步审批人
					for(var i = 0; i < this.peopleArr.length; i++) {
						this.isEnd = this.peopleArr[i].nextActiveName;
						console.info(this.isEnd)
						if(this.peopleArr[i].name == '同意') {
							this.nextPer = this.peopleArr[i].nextActiveUsers;
						}
					}
				}
			});

			var param = {
				applyId: this.$route.query.businessKey,
				pageNumber: this.listQuery.page - 1,
				pageSize: this.listQuery.limit,
			}
			getAjax(`/api/planmanagementService/lowValueMonthCon/lowValMonData?applyId=${this.$route.query.businessKey}`).then(res => {
				console.log(res)
				this.maintaintableData = res.data.goodsInfo
			});

		},
		methods: {
			handleClick(tab) { //tab切换
				console.log(tab);
			},
			// 审核结果下拉事件
			selectGet(val) {
				this.value = val //赋值给value
				// console.log(val, '审核结果');
			},
			// 选择审核人下拉事件
			selectGetname(val) {
				this.valuename = val
				// console.log(val, '66');
			},
			// 文本域
			inputChangedMer: function(e) {
				this.textarea = e.target.value
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var param = {
							"applyId": this.$route.query.businessKey,
							"deploymentKey": "dzyhydcgjh",
							"formId": "",
							"fromKey": "",
							"manger": "",
							"message": this.ruleForm.suggest,
							"needCompanyExamine": "",
							"needTechnologyExamine": "",
							"result": this.ruleForm.result,
							"taskId": this.$route.query.taskId,
							"taskName": this.taskName,
							"userid": this.ruleForm.people,
							// "planType": this.$route.query.formName,
						}
						postAjaxJson("/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep", param).then(res => {
							if(res.code == 0) {
								this.$message("成功");
								this.$router.push("/home/index");
							} else {
								this.$message(res.message);
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			cancel() {
				this.$router.push("/home/index")
			},
		},
	}
</script>
<style scoped>
	.zxfplan {
		width: 90%;
		margin: 10px auto;
		min-height: 450px;
	}

	.zxfplan>h3 {
		margin-top: 3%;
		margin-left: 2%;
	}

	.zxfplan>span {
		width: 85px;
		height: 40px;
		line-height: 40px;
		text-align: left;
		display: inline-block;
		margin-left: 2%;
	}

	.zxfplan>strong {
		width: 105px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		display: inline-block;
		margin-left: 86%;
		border: 1px solid rgb(224, 224, 224);
		font-size: 15px;
	}

	.zxfaggregate {
		margin-top: 20px;
	}

	.zxfblock {
		padding: 10px 10px;
		position: relative;
	}

	.zxftime {
		position: absolute;
		top: 20px;
		left: 20%;
		width: 60%;
		height: 200px;
	}

	.zxftime>span:nth-child(2) {
		margin-left: 2%;
	}

	.zxftime>span {
		font-size: 14px;
		color: rgb(107, 107, 107);
	}

	.zxftime>p {
		font-size: 14px;
		color: rgb(107, 107, 107);
		margin: 20px 0;
		/* padding-left: 10%; */
	}

	.zxfbutton {
		height: 100px;
	}

	.zxfbutton>span {
		display: inline-block;
		width: 180px;
		text-align: center;
		height: 30px;
		line-height: 30px;
		border: 1px solid rgb(112, 112, 112);
		margin-top: 3%;
		cursor: pointer;
	}

	.zxfbutton>span:nth-child(1) {
		margin-left: 50%;
		margin-right: 8%;
	}

	.zxfbutton>span:nth-child(2) {
		background-color: rgb(252, 72, 72);
		color: white;
		border: none;
	}

	.zxfplans {
		padding-top: 10px;
	}

	.zxfschedule>h4 {
		text-align: center;
		height: 80px;
		line-height: 80px;
	}
</style>
