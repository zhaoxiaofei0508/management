<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>审批</el-breadcrumb-item>
		</el-breadcrumb>
<el-card class="box-card" shadow="never" style="margin-top:20px;">
			<div slot="header" class="clearfix">
				<div style="font-size:18px;line-height:40px;">计划子系统-年度专项折旧非生产设备资金汇总计划</div>
				<div style="color:#999;">
					<span>{{formObj.orgname}}</span>
					<span>{{formObj.createuser}}</span>
					<span>{{formObj.createdate}}</span>
				</div>
			</div>
			<div class="text item">
				<el-tabs v-model="activeName">
					<el-tab-pane label="计划单" name="first">
						<div style="width:100%;text-align: center;line-height:40px;font-size:16px;">2020年年度各中心安全专项/折旧生产设备计划</div>
						<el-tabs v-model="activeName1">
							<el-tab-pane v-for="(item, index) in editableTabs" :key="item.orgName" :label="item.orgName" :name="item.orgName">
								<el-table :data="item.planBudgetProjectList"  ref="tableDatas" tooltip-effect="dark" border stripe style="width: 100%">
									<el-table-column prop="projectType" label="项目类别" width="100" />
									<el-table-column prop="projectName" label="项目名称" width="100" />
									<el-table-column prop="projectMoney" label="项目预估金额" />
									<el-table-column prop="startDate" label="开始时间" />
									<el-table-column prop="endDate" label="结束时间" />
									<el-table-column prop="chargePerson" label="负责人" />
									<el-table-column prop="projectDesc" label="项目简介" />
									<el-table-column prop="filePath" label="附件" />
									<el-table-column label="操作">
										<template slot-scope="scope">
											<el-button type="text" size="small" @click="viewGoods(scope.row)">查看物资</el-button>
										</template>
									</el-table-column>
								</el-table>
								<p style="margin-top: 12px">计划总金额:<span>{{planMoney}}</span></p>
							</el-tab-pane>
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
						</el-tabs>
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
	</div>
</template>

<script>
	import TimelineItem from "@/components/TimelineItem"
	import { getAjax, postAjax, postAjaxJson } from '@/utils/ajaxRequest'
	export default {
		components: {
			TimelineItem
		},
		data() {
			return {
				activeName: "first",
				goodsVisible: false,
				goodsData: [],
				activeName1:"",
				editableTabs: [], //动态标签页
				businessKey: "",
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
				planMoney:0,
				formObj: {},
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
				processInstanceId: "",
			}
		},
		created() {
			this.businessKey = this.$route.query.businessKey;
			this.processInstanceId = this.$route.query.processInstanceId;
			getAjax("/api/planmanagementService/annualPlanFlow/planCollectProjectsByPlanCollectId?planCollectId=" + this.businessKey).then(res => {
				if(res.code == 0) {
					this.editableTabs = res.data.planBudgetProjectLVoList;
					this.formObj=res.data.planCollect;
					this.activeName1 = this.editableTabs[0].orgName;
					this.planMoney = 0;
					_.forEach(this.editableTabs[0].planBudgetProjectList, val => {
						this.planMoney += Number(val.projectMoney);
					});
				}
			});
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
							var param = {
							planCollectId: this.$route.query.businessKey,
							result: this.ruleForm.result,
							taskId: this.$route.query.taskId,
							message: this.ruleForm.suggest,
						}
						postAjax("/api/planmanagementService/annualPlanFlow/complete/planLeader/" + this.$route.query.taskId, param).then(res => {
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
			viewGoods(row){
				this.goodsVisible=true;
				var param = {
					projectId: row.id
				}
				getAjax("/api/planmanagementService/annualSpecialFundPlan/findProjectGoodsByProjectId", param).then(data => {
					if(data.code == 0) {
						this.goodsData=data.data;
                       
					}
				});
			},
			cancel() {
				this.$router.push("/home/index")
			},
		}
	}
</script>

<style>

</style>