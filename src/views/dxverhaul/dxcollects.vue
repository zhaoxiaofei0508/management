<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>审批</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card" shadow="never" style="margin-top:20px;">
			<div slot="header" class="clearfix">
				<div style="font-size:18px;line-height:40px;">年度大修资金计划</div>
				<div style="color:#999;">
					<span>{{formObj.orgname}}</span>
					<span>{{formObj.createuser}}</span>
					<span>{{formObj.createdate}}</span>
				</div>
			</div>
			<div class="text item">
				<el-tabs v-model="activeName">
					<el-tab-pane label="计划单" name="first">
						<div style="width:100%;text-align: center;line-height:40px;font-size:16px;">{{formObj.summaryName}}</div>
						<!--<el-tabs v-model="activeName1">-->
						<!--<el-tab-pane v-for="(item, index) in editableTabs" :key="item.orgName" :label="item.orgName" :name="item.orgName">-->
						<el-table :data="editableTabs" ref="tableDatas" tooltip-effect="dark" border stripe style="width: 100%">
							<el-table-column prop="projectType" label="项目编码" />
							<el-table-column prop="projectType" label="项目类别" width="100" />
							<el-table-column prop="projectName" label="项目名称" width="100" />
							<el-table-column prop="projectMoney" label="项目预估金额" />
							<el-table-column prop="startDate" label="开始时间" />
							<el-table-column prop="endDate" label="结束时间" />
							<el-table-column prop="chargePerson" label="负责人" />
							<el-table-column prop="projectDesc" label="项目简介" />
							<el-table-column prop="isFile" label="附件" />
							<el-table-column prop="approval" label="是否核准制" />
							<el-table-column prop="orgName" label="提报部门" />
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="viewGoods(scope.row)">查看商品</el-button>
								</template>
							</el-table-column>
						</el-table>
						<p style="margin-top: 12px">计划总金额:<span>{{planMoney}}</span></p>
						<!--</el-tab-pane>-->
						<!-- 计划预览查看商品弹框 -->
						<el-dialog title="查看物资" :visible.sync="goodsVisible" width="95%">
							<el-table :data="goodsData" tooltip-effect="dark" border stripe>
								<el-table-column label="分类" width="80" prop="goodsClass" align="center" />
								<el-table-column label="编码" align="center" prop="goodsCode" width="80" />
								<el-table-column label="商品/服务名称" width="120" prop="goodsName" class="zxfsh" />
								<el-table-column label="规则型号/描述" width="120" prop="goodsModel" />
								<el-table-column label="单位" width="60" prop="goodsunit" />
								<el-table-column label="数量" width="60" prop="goodsNumber" />
								<el-table-column label="预估单价" prop="goodsPrice" />
								<el-table-column label="预估总价" prop="goodsTotal" />
								<el-table-column label="类型" width="100" prop="goodsType" />
								<el-table-column label="计划实施时间" width="120" prop="startDate" />
								<el-table-column label="计划交付时间" width="120" prop="endDate" />
								<el-table-column label="主机厂家" prop="factoryName" />
								<el-table-column label="技术要求" prop="technologyDesc" />
								<el-table-column label="备注" prop="remarks" />
							</el-table>
						</el-dialog>
						<!--</el-tabs>-->
					</el-tab-pane>
					<el-tab-pane label="审核历史" name="second">
						<timeline-item :processInstanceId="processInstanceId"></timeline-item>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-card>
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
					<el-form-item v-if="peopleArr.length>0" label="选择审核人" prop="people">
						<el-select v-model="ruleForm.people" style="width:400px;" placeholder="请选择选择审核人">
							<el-option v-for="m in peopleArr" :key="m.id" :label="m.name" :value="m.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审核说明" prop="suggest">
						<el-input v-model="ruleForm.suggest" type="textarea" style="width:400px;" placeholder="请输入审核说明"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
						<el-button @click="cancel()">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<!-- 大修汇总查看商品 -->
		<el-dialog title="商品明细" :visible.sync="zxfcksptk" width="95%">
			<el-table :data="zxfcksp" ref="zxfcksp" tooltip-effect="dark" border stripe>
				<el-table-column prop="name" label="分类" width="50">
				</el-table-column>
				<el-table-column label="编码" width="50" prop="bian">
				</el-table-column>
				<el-table-column label="商品/服务名称" width="120">
				</el-table-column>
				<el-table-column label="规则型号/描述" width="120">
				</el-table-column>
				<el-table-column label="单位">
				</el-table-column>
				<el-table-column label="数量">
				</el-table-column>
				<el-table-column label="预估单价">
				</el-table-column>
				<el-table-column label="预估总价">
				</el-table-column>
				<el-table-column label="类型">
				</el-table-column>
				<el-table-column label="计划实施时间" width="120">
				</el-table-column>
				<el-table-column label="计划交付时间" width="120">
				</el-table-column>
				<el-table-column label="主机厂家">
				</el-table-column>
				<el-table-column label="技术要求">
				</el-table-column>
				<el-table-column label="备注">
				</el-table-column>
			</el-table>
			<div class="preserve ">
				<el-button plain @click="zxfcksptk=false">取消</el-button>
				<el-button type="primary" plain @click="save()">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Navbar from '@/views/layout/components/Navbar'
	// import Table from '@/views/summary/components/table'
	import Results from '@/views/result/components/results/results'
	import TimelineItem from "@/components/TimelineItem"
	import { getAjax, postAjax, postAjaxJson } from '@/utils/ajaxRequest'
	export default {
		components: {
			TimelineItem
		},
		data() {
			return {
				summaryName: "",
				processInstanceId:"",
				formObj: {},
				resultArr: [{
					label: "同意",
					value: "同意"
				}, {
					label: "不同意",
					value: "不同意"
				}],
				peopleArr: [],
				ruleForm: {
					people: "",
					suggest: "",
					result: "",
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
				editableTabs: [], //动态标签页
				planMoney: 0,
				activeName1: 0,
				goodsVisible: false,
				activeName: 'first',
				zxfcksptk: false, //查看商品
				maintaintableData: [ //项目类别区分表格
					{
						id: 1,
						// name:'类别一'
					},
				],
				zxfcksp: [ //查看物资弹框
					{
						name: ''
					}
				],
				editableTabsValue: '1', //切换标签页
				// 时间线
				activities: [{
					content: '维修中心 李华',
					timestamp: '2018-04-12 20:46',
					size: 'large',
					//   type: 'primary',
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
				textarea: '', //审核结果文本域
				valuename: '', //初始为空
				optionsname: [{ // 选择审核人
					valuename: '王华',
					label: ''
				}, {
					valuename: '刘翔',
					label: ''
				}],
				goodsData:[],
				// 审核结果
				value: '',
				options: [{
					value: '同意',
					label: ''
				}, {
					value: '不同意',
					label: ''
				}],
			}
		},
		created() {
			this.processInstanceId=this.$route.query.processInstanceId;
			getAjax("/api/planmanagementService/overhaulSummary/findOverhaulSummaryInfo?planCollectId=" + this.$route.query.businessKey).then(res => {
				if(res.code == 0) {
					this.summaryName = res.data.summaryName;
					this.editableTabs = res.data.planBudgetProjectList;

					this.planMoney = 0;
					_.forEach(this.editableTabs, val => {
						this.planMoney += Number(val.projectMoney);
					});
				}
			});
			postAjaxJson(`/api/process-service/userTask/getFirstExaminePerson/nddxjhhzlc`).then(res => {
				if(res.code == 0) {
					this.peopleArr = res.data;
				}
			});
		},
		methods: {
			viewGoods(row) {
				this.goodsVisible = true;
				var param = {
					projectId: row.id
				}
				getAjax("/api/planmanagementService/annualSpecialFundPlan/findProjectGoodsByProjectId", param).then(data => {
					if(data.code == 0) {
						this.goodsData = data.data;

					}
				});
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var param = {
							nextAssigneeUserId: this.ruleForm.people,
							planCollectId: this.$route.query.businessKey,
							result: this.ruleForm.result,
							taskId: this.$route.query.taskId,
							message: this.ruleForm.suggest,
						}
						postAjax("/api/planmanagementService/annualPlanFlow/complete/planCharge/" + this.$route.query.taskId, param).then(res => {
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
	/* 遮罩层样式 */
	
	.mask {
		background-color: #000;
		opacity: 0.3;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1
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
	
	.zxfplans>p {
		height: 80px;
		line-height: 80px;
		text-align: center;
		font-size: 20px;
		font-weight: 600;
	}
	
	.zxfschedule>h4 {
		text-align: center;
		height: 80px;
		line-height: 80px;
	}
	
	.preserve {
		margin-top: 2%;
		display: flex;
		justify-content: center;
	}
</style>