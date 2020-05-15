<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>年度科技资金计划审核页面</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="zxfplan">
			<h3>年度科技资金计划</h3>
			<span>维修中心</span>
			<span>王华</span>
			<span>2019-11-12</span>
			<strong>查看流程图</strong>
			<div class="zxftable">
				<template>
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<!-- 计划表 -->
						<el-tab-pane label="计划单" name="first">
							<div class="zxfschedule">
								<h4>年度科技资金计划</h4>
							</div>
							<div class="ztable">
								<p>计划信息</p>
								<el-table :data="zxftableData" ref="table" slot="empty" border stripe show-summary>
									<el-table-column label="项目编码" align="center" width="100" prop="projectNumber">
									</el-table-column>
									<el-table-column label="项目类别" width="100" class="zxfsh" align="center" prop="projectType">
									</el-table-column>
									<el-table-column label="项目名称" align="center" prop="projectName">
									</el-table-column>
									<el-table-column prop="projectMoney" label="项目预估金额" width="120" align="center">
									</el-table-column>
									<el-table-column label="开始时间" width="100" align="center" prop="startDate">
									</el-table-column>
									<el-table-column label="结束时间" align="center" prop="endDate">
									</el-table-column>
									<el-table-column label="负责人" align="center" prop="chargePerson">
									</el-table-column>
									<el-table-column label="项目等级" align="center" prop="projectGrade">
									</el-table-column>
									<el-table-column label="项目简介" align="center" prop="projectDesc" width='180px'>
									</el-table-column>
									<el-table-column label="操作" width="120" align='center'>
										<template slot-scope="scope">
											<el-button type="text" size="small" @click="check(scope.row)">查看附件</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-tab-pane>

						<el-tab-pane label="审核历史" name="second">
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
				</template>
				<el-dialog width="98%" title="项目文件" :visible.sync="dialogTableVisible">
					<el-tabs v-model="TabBar" @tab-click="XmwjClick" type="border-card">
						<el-tab-pane label="技术规范书" name="last">
							技术规范书文档
						</el-tab-pane>
						<el-tab-pane label="项目明细表" name="second">
							项目明细表文档
						</el-tab-pane>
					</el-tabs>
				</el-dialog>
			</div>
		</div>
		<div>
			<!--<Results @inputChanged="inputChangedMer($event)" :optionsname="optionsname" @selectGet="selectGet" @selectGetname="selectGetname" :options='options'></Results>
            <div class="zxfbutton">
                <span>取消</span>
                <span @click="zxfsummary()">确定</span>
            </div>-->
			<el-card class="box-card" shadow="never" style="margin-top:20px;">
				<div slot="header" class="clearfix">
					<div style="font-size:18px;line-height:40px;">审核结果</div>
				</div>
				<div class="text item">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
						<el-form-item label="是否需要总工审核" prop="needCompanyExamine">
							<el-select v-model="ruleForm.needCompanyExamine" style="width:400px;" placeholder="是否需要总工审核">
								<el-option v-for="m in responseArr" :key="m.id" :label="m.name" :value="m.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="审核结果" prop="result">
							<el-select v-model="ruleForm.result" @change="getResult" style="width:400px;" placeholder="请选择审核结果">
								<el-option v-for="m in resultArr" :key="m.label" :label="m.label" :value="m.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="审核说明" prop="suggest">
							<el-input v-model="ruleForm.suggest" type="textarea" style="width:400px;" placeholder="请输入审核说明"></el-input>
						</el-form-item>
						<el-form-item v-if="ruleForm.result=='同意'&&peopleArr.length!=0" label="选择审核人" prop="people">
							<el-select v-model="ruleForm.people" style="width:400px;" placeholder="请选择选择审核人">
								<el-option v-for="m in peopleArr" :key="m.id" :label="m.name" :value="m.id"></el-option>
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
	</div>
</template>
<script>
	import Navbar from '@/views/layout/components/Navbar' //导航
	import Results from '@/views/result/components/results/results'
	import { getAjax, postAjax, postAjaxJson } from '@/utils/ajaxRequest'
	export default {
		name: 'Result',
		components: {
			Navbar,
			Results
		},
		data() {
			return {
				resultArr: [{
					label: "同意",
					value: "同意"
				}, {
					label: "不同意",
					value: "不同意"
				}],
				responseArr:[{
					id:"是",
					name:"是"
				},{
					id:"否",
					name:"否"
				},],
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
					needCompanyExamine:[{
						required: true,
						message: '是否需要总工审核',
						trigger: 'change'
					}],

				},
				textarea: '', //审核说明
				activeName: 'first', //标签页切换
				TabBar: 'last', //项目文件切换
				gridData: [{ //查看商品数据

				}],
				zxfoptionss: [ //添加商品的类型
					{
						id: '1',
						typevalue: '物资'
					},
					{
						id: '2',
						typevalue: '工程'
					},
					{
						id: '3',
						typevalue: '设备'
					}
				],
				dialogTableVisible: false, //查看商品
				zxftableData: [ //分包计划单表格
					{
						projectNumber:'',
						projectType:'',
						projectName:'',
						projectMoney:'',
						startDate:'',
						endDate:'',
						chargePerson:'',
						projectGrade:'',
						projectDesc:'',
					},
				],
				// 时间线
				activities: [{
					content: '维修中心 李华',
					timestamp: '2018-04-12 20:46',
					size: 'large',
					icon: 'el-icon-more'
				}, {
					content: '维修中心 李华 ',
					timestamp: '2018-04-03 20:46',

				}, {
					content: '维修中心 李华',
					timestamp: '2018-04-03 20:46',
					color: '#0bbd87',
					size: 'large'
				}],
				// 审核人
				valuename: '', //初始为空
				optionsname: [{
					valuename: '王华',
					label: ''
				}, {
					valuename: '刘翔',
					label: ''
				}],
				// 审核结果
				value: '',
				options: [{
					value: '同意',
					label: '同意'
				}, {
					value: '不同意',
					label: '不同意'
				}],
			};
		},
		created() {
			var param={
				budgetId:this.$route.query.businessKey
			}
			getAjax("/api/planmanagementService/technologyPlanReport/getTechnologyPlanReport",param).then(res=>{
        this.zxftableData = res.data.planBudgetproject
			});
		},
		methods: {
			getResult(value){
				var param={
					"needCompanyExamine":this.ruleForm.needCompanyExamine=="是"?"yes":"no"
				}
				postAjaxJson(`/api/processService/userTask/getNextExaminePersonByVars/` + this.$route.query.taskId,param).then(res => {
				if(res.code == 0) {
					//获取下一步审批人
					for(var i = 0; i < res.data.length; i++) {
						if(this.ruleForm.result=="不同意") {

						}else{
							this.peopleArr = res.data[i].nextActiveUsers;
							this.isEnd = res.data[i].nextActiveName;
						}
					}
				}
			});
			},
      check(data){
        getAjax(`/api/planmanagementService/technologyPlanReport/getPlanReportAnnexfileInfo?mainTableId=${data.id}`).then(res=>{

        });

      },

			// 计划单切换
			handleClick(tab, event) {
				// console.log(tab, event);
			},
			XmwjClick(tab, event) {
				console.log(tab, event);
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var param = {
							"applyId": this.$route.query.businessKey,
							"deploymentKey": "ndkjzjbblc",
							"formId": "",
							"fromKey": "",
							"manger": "",
							"message": this.ruleForm.suggest,
							"needCompanyExamine": this.ruleForm.needCompanyExamine,
							"needTechnologyExamine":"",
							"result": this.ruleForm.result,
							"taskId": this.$route.query.taskId,
							"taskName": this.taskName,
							"userid": this.ruleForm.people
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
			// 计算列的和
		},
		computed: {
			columnTotal() {
				// tableData - 表格数据
				// calcCol - 要计算的那一列
				// map函数 - 将表格的二维数据转换为一维的数组
				return zxftableData.map(row => row.projectMoney).reduce((acc, cur) => (cur + acc), 0)
			}
		},

	}
</script>

<style scoped>
	.route {
		margin-top: 60px;
		height: 50px;
		line-height: 50px;
		background-color: rgb(216, 216, 216);
		padding: 0 20px;
		cursor: pointer;
		font-size: 15px;
	}

	.zxfplan {
		width: 90%;
		margin: 10px auto;
		/* background-color: rgb(255, 164, 210); */
		min-height: 500px;
	}

	.zxfplan>h3 {
		margin-top: 3%;
	}

	.zxfplan>span {
		width: 85px;
		height: 40px;
		line-height: 40px;
		text-align: left;
		display: inline-block;
	}

	.zxfplan>strong {
		width: 105px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		display: inline-block;
		margin-left: 69%;
		border: 1px solid rgb(224, 224, 224);
		font-size: 15px;
	}

	.zxfschedule>h4 {
		text-align: center;
		height: 80px;
		line-height: 80px;
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
		line-height: 32px;
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

	.ztable>p {
		height: 45px;
		line-height: 45px;
		padding: 0 22px;
		background-color: rgba(243, 243, 243, 0.829);
		font-size: 15px;
		margin-bottom: 20px;
	}
</style>
