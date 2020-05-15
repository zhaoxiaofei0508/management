<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>安全生产环保部负责人审批</el-breadcrumb-item>
		</el-breadcrumb>
		<summary-detail :planCollectId="businessKey"  :processInstanceId="processInstanceId"></summary-detail>
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
	import SummaryDetail from "./components/SummaryDetail"
	import TimelineItem from "@/components/TimelineItem"
	import { getAjax, postAjax, postAjaxJson } from '@/utils/ajaxRequest'
	export default {
		components: {
			SummaryDetail
		},
		data() {
			return {
				activeName: "first",
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
				formObj:{},
				taskId:"",
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
			}
		},
		created() {
			this.businessKey = this.$route.query.businessKey;
			this.processInstanceId = this.$route.query.processInstanceId;
			getAjax("/api/planmanagementService/annualPlanFlow/planCollectProjectsByPlanCollectId?planCollectId=" + this.planCollectId).then(res => {
				if(res.code == 0) {
					this.formObj=res.data.planCollect;
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
			cancel() {
				this.$router.push("/home/index")
			},
		}
	}
</script>

<style>

</style>