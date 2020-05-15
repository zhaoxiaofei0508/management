<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>审批</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card" shadow="never" style="margin-top:20px;">
			<div slot="header" class="clearfix">
				<div style="font-size:18px;line-height:40px;">年度专项资金汇总计划</div>
				<div style="color:#999;">
					<span>{{formObj.orgName}}</span>
					<span>{{formObj.userName}}</span>
					<span>{{formObj.createTime}}</span>
				</div>
			</div>
			<div class="text item">
				<el-tabs v-model="activeName">
					<el-tab-pane label="计划单" name="first">
						<div style="width:100%;text-align: center;line-height:40px;font-size:16px;">年度专项资金汇总计划</div>
						<el-tabs v-model="activeName1">
							<el-tab-pane v-for="(item, index) in formObj.planProjectList" :key="item.planType" :label="item.planType" :name="item.planType">
								<el-table :data="item.planBudgetprojectList" ref="tableDatas" tooltip-effect="dark" border stripe style="width: 100%">
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
		<!--<div class="send">
			<p>下发信息</p>
			<div class="sends">
				<span>批复文件</span>
				<el-upload class="upload-demo" action="http://61.134.63.231:9090/organizationService/image/uploadImg" :on-success="handleSuccess" :file-list="fileList" name="articleImage" :headers="handleHeader" :on-exceed="handleExceed">
					<el-button size="small" type="primary">选择文件</el-button>
				</el-upload>
			</div>
			<div class="ssue">
				<span>下发人员</span>
				<el-button type="text" @click="dialogTableVisible = true">选择人员</el-button>
			</div>
		</div>-->
		<el-card class="box-card" shadow="never" style="margin-top:20px;">
			<div slot="header" class="clearfix">
				<div style="font-size:18px;line-height:40px;">下发信息</div>
			</div>
			<div class="text item">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="批复文件">
						<el-upload class="upload-demo" action="http://61.134.63.231:9090/organizationService/image/uploadImg" :on-success="handleSuccess" :file-list="fileList" name="articleImage" :headers="handleHeader" :on-exceed="handleExceed">
							<el-button size="small" type="primary">选择文件</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="下发人员">
						<el-button type="text" @click="dialogTableVisible = true">选择人员</el-button>
					</el-form-item>
					<el-form-item label="审核结果" prop="result">
						<el-select v-model="ruleForm.result" style="width:400px;" placeholder="请选择审核结果">
							<el-option v-for="m in resultArr" :key="m.label" :label="m.label" :value="m.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审核说明" prop="suggest">
						<el-input v-model="ruleForm.suggest" type="textarea" style="width:400px;" placeholder="请输入审核说明"></el-input>
					</el-form-item>
					<!--<el-form-item label="选择审核人" prop="people">
						<el-select v-model="ruleForm.people" style="width:400px;" placeholder="请选择选择审核人">
							<el-option v-for="m in peopleArr" :key="m.id" :label="m.name" :value="m.id"></el-option>
						</el-select>
					</el-form-item>-->
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
						<el-button @click="cancel()">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<!-- 选择人员弹框 -->
		<el-dialog title="下发人员选择" :visible.sync="dialogTableVisible">
			<el-row>
				<el-col :span="8">
					<el-tree class="reletedTreeUser" :props="defaultPropsUser" :data="relatedData" node-key="id" @node-click="handleNodeClick">
					</el-tree>
				</el-col>
				<el-col :span="16">
					<el-col :span="10">
						<div class="transfer">

							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAllUser" @change="handleCheckAllChangeUser">用户列表</el-checkbox>
							<div class="content">
								<el-checkbox-group v-model="checkedUser" @change="handleCheckedCitiesChange">
									<el-checkbox v-for="city in tableData" :label="city.key" :key="city.key">{{city.userName}}</el-checkbox>
								</el-checkbox-group>
							</div>
						</div>
					</el-col>
					<el-col :span="4">
						<div class="transferLeft" @click="transferLeftClick()" :class="{active:checkedUser.length>0}"><i class="el-icon-d-arrow-right"></i></div>
						<div class="transferRight" @click="transferRightClick()" :class="{active:checkedRoles.length>0}"><i class="el-icon-d-arrow-left"></i></div>
					</el-col>
					<el-col :span="10">
						<div class="transfer">
							<el-checkbox :indeterminate="isIndeterminate1" v-model="checkAllRoles" @change="handleCheckAllChange">关联用户</el-checkbox>
							<div class="content">
								<el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
									<el-checkbox v-for="city in relateUserVal" :label="city.key" :key="city.key">{{city.userName}}</el-checkbox>
								</el-checkbox-group>
							</div>
						</div>
					</el-col>

				</el-col>
			</el-row>
			<div class="butts" style="text-align: center;margin-top:20px;">
				<el-button plain @click="dialogTableVisible=false">取消</el-button>
				<el-button type="primary" plain @click="relatedDataBtn">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import TimelineItem from "@/components/TimelineItem"
	import treeTransfer from 'el-tree-transfer'
	import { covert } from '@/utils/treeTable'
	import {
		getToken
	} from '@/utils/auth'
	import { getAjax, postAjax, postAjaxJson } from '@/utils/ajaxRequest'
	export default {
		components: {
			TimelineItem,
			treeTransfer
		},
		data() {
			return {
				handleHeader: {
					token: getToken()
				},
				defaultPropsUser: {
					children: 'children',
					label: 'organizationName'
				},
				fileList: [],
				personnel: {},
				isIndeterminate: true,
				isIndeterminate1: true,
				checkAllUser: false,
				checkAllRoles: false,
				relatedData: [],
				checkedUser: [],
				checkedRoles: [],
				relateUserVal: [],
				relateUserId: [],
				tableData: [],
				dialogTableVisible: false,
				editableTabs: [],
				planMoney: 0,
				activeName: "first",
				activeName1: "",
				goodsVisible: false,
				goodsData: [],
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
				fileName: "",
				filePath: "",
				startTime:"",
				sendUserVoList: [],
				processInstanceId: "",
			}
		},
		created() {
			this.businessKey = this.$route.query.businessKey;
			this.processInstanceId = this.$route.query.processInstanceId;
			this.startTime=(new Date()).getTime();
			//部门树
			var param = {
				type: '2',
				id: '0'
			}
			getAjax('/api/organizationService/organization/list', param).then(data => {
				if(data.code == '0') {
					this.relatedData = covert(data.data, data.data[0].pId);
				}
			});
			getAjax("/api/planmanagementService/annualSpecialFundSummaryPlan/findPlanShByPlanCollectId?planCollectId=" + this.$route.query.businessKey).then(res => {
				if(res.code == 0) {
					this.formObj = res.data;
					this.activeName1 = this.formObj.planProjectList[0].planType;
					this.planMoney = 0;
					_.forEach(this.formObj.planProjectList, val => {
						_.forEach(val.planBudgetprojectList, v => {
							this.planMoney += Number(v.projectMoney);
						});
					});
				}
			});
		},
		methods: {
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件`)
			},
			handleSuccess(file, res) {
				if(file.code == 0) {
					this.fileName = file.data;
					this.filePath = file.data;
					this.$message('上传成功')
				} else {
					this.$message(file.message)
				}
			},
			//部门查询用户
			handleNodeClick(data) {
				var organizationParam = {
					organizationId: data.id
				}
				getAjax("/api/organizationService/role/findByOrganizationAllUser", organizationParam)
					.then(data => {
						if(data.code == "0") {
							this.checkedUserId = [];
							this.tableData = [];
							_.forEach(data.data, val => {
								val.key = val.id + "--" + val.userName;
								this.checkedUserId.push(val.key);
							});
							this.checkedUserId = _.difference(this.checkedUserId, this.relateUserId);
							_.forEach(data.data, val => {
								_.forEach(this.checkedUserId, v => {
									if(val.key === v) {
										this.tableData.push(val);
									}
								});
							});
						}
					});
			},
			//角色关联用户 全部
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAllRoles = checkedCount === this.relateUserId.length;
				this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.relateUserId.length;
			},
			//用户列表 多选框
			handleCheckAllChangeUser(val) {
				this.checkedUser = val ? this.checkedUserId : [];
				this.isIndeterminate = false;
			},
			//角色关联用户  复选框
			handleCheckAllChange(val) {
				this.checkedRoles = val ? this.relateUserId : [];
				this.isIndeterminate1 = false;
			},
			//角色关联用户 全部
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAllRoles = checkedCount === this.relateUserId.length;
				this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.relateUserId.length;
			},
			//左边
			transferLeftClick() {
				var arr = _.difference(this.checkedUserId, this.checkedUser);
				this.checkedUserId = _.difference(arr, this.relateUserId);
				var tableArr = [];
				_.forEach(this.tableData, val => {
					_.forEach(this.checkedUserId, value => {
						if(val && value == val.key) {
							tableArr.push(val);
						}
					});
					_.forEach(this.checkedUser, v => {
						if(val && v == val.key) {
							this.relateUserVal.push(val);
							this.relateUserId.push(val.key);
						}
					});
				});
				this.relateUserVal = _.uniq(this.relateUserVal, "key");
				this.relateUserId = _.uniq(this.relateUserId);
				this.tableData = tableArr;
				this.checkedUser = [];

			},
			//右边
			transferRightClick() {
				var arr = _.difference(this.relateUserId, this.checkedRoles);
				var tableArr = [];
				_.forEach(this.relateUserVal, val => {
					_.forEach(arr, value => {
						if(val && value == val.key) {
							tableArr.push(val);
						}
					});
					_.forEach(this.checkedRoles, v => {
						if(val && v == val.key) {
							this.tableData.push(val);
						}
					});
				});
				this.relateUserVal = tableArr;
				this.checkedRoles = [];
				this.relateUserId = arr;
			},
			//关联用户确认
			relatedDataBtn() {
				this.relateUserId = _.uniq(this.relateUserId);
				this.sendUserVoList = [];
				_.forEach(this.relateUserId, val => {
					this.sendUserVoList.push({
						sendUserId: val.split("--")[0],
						sendUserName: val.split("--")[1]
					});
				});
				this.dialogTableVisible = false;
			},
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
						var stopTime=(new Date()).getTime()-this.startTime;
						var param = {
//							annualSpecialFundSummaryPlanReplyVo: {
								applyId: this.formObj.applyId,
								createUserId: sessionStorage.userId,
								createUserName: sessionStorage.userName,
								fileName: this.fileName,
								filePath: this.filePath,
								planCollectId: this.$route.query.businessKey,
								sendUserVoList: this.sendUserVoList,
//							},
//							message:this.ruleForm.suggest,
//							result:this.ruleForm.result,
//							stopTime:stopTime,
//							taskId:this.$route.query.taskId,
						}
						postAjaxJson("/api/planmanagementService/annualSpecialFundSummaryPlan/uploadAnnexComplete/" + this.$route.query.taskId+"?message="+this.ruleForm.suggest
						+"&result="+this.ruleForm.result+"&stopTime="+stopTime, param).then(res => {
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
	.transfer {
		width: 100%;
		border: 1px solid #d2d2d2;
		padding: 0px;
	}
	
	.reletedTreeUser {
		width: 80%;
		border: 1px solid #d2d2d2;
		padding: 0px;
		height: 340px;
		overflow: auto;
	}
	
	.transfer>.content {
		height: 300px;
		overflow: auto;
	}
	
	.transfer .el-checkbox {
		display: block;
		height: 30px;
		padding: 10px;
		margin: 0;
	}
	
	.transfer>label.el-checkbox {
		height: 40px;
		line-height: 40px;
		padding-left: 15px;
		box-sizing: border-box;
		color: rgb(0, 0, 0);
		background: rgb(245, 247, 250);
		margin: 0px;
		border-bottom: 1px solid rgb(235, 238, 245);
		padding: 0 10px;
	}
	
	.transferLeft,
	.transferRight {
		margin-top: 100px;
		margin-left: 25%;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		line-height: 40px;
		text-align: center;
		background-color: rgb(245, 247, 250);
		color: rgb(192, 196, 204);
		border-width: 1px;
		border-style: solid;
		border-color: rgb(220, 223, 230);
		border-image: initial;
	}
	
	.transferRight {
		margin-top: 20px;
	}
	
	.transferLeft.active,
	.transferRight.active {
		color: rgb(255, 255, 255);
		background-color: rgb(64, 158, 255);
	}
</style>