<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>审核</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="zxfplan">
			<h3>{{planBudget.title}}</h3>
			<span>{{planBudget.orgName}}</span>
			<span>{{planBudget.createUserName}}</span>
			<span>{{planBudget.createDate}}</span>
			<strong>查看流程图</strong>
			<div class="zxftable">
				<template>
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<!-- 计划表 -->
						<el-tab-pane label="计划单" name="first">
							<div class="zxfschedule">
								<h4>{{planBudget.title}}</h4>
							</div>
							<div class="ztable">
								<p>计划信息</p>
								<div class="jhbg">
									<div style="padding:20px 0;">
										<el-button size="small" type="primary" plain @click.prevent="delData()">删除行</el-button>
										<el-button size="small" type="primary" plain @click.prevent="remover()">全部删除</el-button>
									</div>
									<el-table
                                    :data="zxftableData"
                                    ref="table"
                                    slot="empty"
                                    border stripe
                                    @selection-change="selectRow"
                                    >
                                    <el-table-column
                                        type="selection"
                                        width="55">
                                    </el-table-column>
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
									<el-table-column label="附件" align="center" prop="filePath">
									</el-table-column>
									<el-table-column label="操作" width="120" align='center'>
										<template slot-scope="scope">
											<el-button type="text" size="small" @click="check(scope.row)">查看附件</el-button>
										</template>
									</el-table-column>
								</el-table>
								</div>
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
			</div>
			<div class="send">
				<p>下发信息</p>
				<div class="sends">
					<span>批复文件</span>
					<el-upload class="upload-demo"
                    action="http://61.134.63.231:9090/organizationService/image/uploadImg"
                    :on-success="handleSuccess"
                    :file-list="fileList" name="articleImage" :headers="handleHeader"
                    :on-exceed="handleExceed">
						<el-button size="small" type="primary">选择文件</el-button>
					</el-upload>
				</div>
				<div class="ssue">
					<span>下发人员</span>
					<el-button type="text" @click="dialogTableVisible = true">选择人员</el-button>
				</div>
			</div>
		</div>
		<div>
			<el-card class="box-card" shadow="never" style="margin-top:20px;">
				<div slot="header" class="clearfix">
					<div style="font-size:18px;line-height:40px;">审核结果</div>
				</div>
				<div class="text item">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="审核结果" prop="result">
							<el-select v-model="ruleForm.result" @change="getResult" style="width:400px;" placeholder="请选择审核结果">
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
		<!-- 查看附件弹框 -->
		<el-dialog title="项目文件" :visible.sync="dialogVisible" width="80%">
			<div>
				<el-button plain v-for="(item,i) in tabsArray" :key="i" @click="tabs(item.id)">{{item.title}}</el-button>

			</div>
		</el-dialog>
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
			<div class="butts">
				<el-button plain @click="dialogTableVisible=false">取消</el-button>
				<el-button type="primary" plain @click="dialogTableVisible=false">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import Navbar from '@/views/layout/components/Navbar' //导航
	import Results from '@/views/result/components/results/results'
	import treeTransfer from 'el-tree-transfer'
    import { getAjax, postAjax, postAjaxJson,postAjaxx } from '@/utils/ajaxRequest'
	import { parseTime } from '@/utils'
	import { covert } from '@/utils/treeTable'
	export default {
		name: 'Result',
		components: {
			Navbar,
			Results,
			treeTransfer
		},
		data() {
			return {
				defaultPropsUser: {
					children: 'children',
					label: 'organizationName'
                },
                personnel:{
                },
				isIndeterminate: true,
				isIndeterminate1: true,
				checkAllUser: false,
				checkAllRoles: false,
				relatedData: [],
				checkedUser: [],
				checkedRoles: [],
				relateUserVal:[],
				relateUserId:[],
				tableData: [],
				zxfsearch: '', //计划内查看商品搜索框
				textarea: '', //审核说明
				activeName: 'first', //标签页切换
				dialogTableVisible: false, //选择人员下发

				//查看附件
				tabsArray: [{
						title: '立项申请书',
						id: '1',
						content: 'Tab 1 content'
					},
					{
						title: '立项建议表',
						id: '2',
						content: 'Tab 2 content'
					},
					{
						title: '项目备案表',
						id: '3',
						content: 'Tab 3 content'
					}
                ],
                ruleForm: {
					people: "",
					suggest: "",
					result: ""
                },
                planBudget:{},
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
                peopleArr: [],
				dialogVisible: false, //查看附件弹框
				//计划信息表格
				zxftableData: [


				],
				//商品存放表格数据
				selectlistRow: [],
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

				// 审核结果
				resultArr: [{
					label: "同意",
					value: "同意"
				}, {
					label: "不同意",
					value: "不同意"
                }],
        currentIndex: {},
				mode: "transfer",
        selectID: [],
				fromData: [{
						id: "1",
						pid: 0,
						label: "部门一",
						children: [{
							id: "1-1",
							pid: "1",
							label: "张三",
							children: []
						}, {
							id: "1-2",
							pid: "1",
							label: "李四",
							children: []
						}, ]
					},
					{
						id: "2",
						pid: 1,
						label: "部门二",
						children: [{
							id: "2-2",
							pid: "2",
							label: "我问问",
							children: []
						}, {
							id: "2-3",
							pid: "2",
							label: "对对对",
							children: []
						}, ]
					},
				],

			};
		},
		methods: {
            getResult(value) {
				postAjaxJson(`/api/processService/userTask/getNewTaskPathAndExaminePerson/` + this.$route.query.taskId).then(res => {
					if(res.code == 0) {
						//获取下一步审批人
						for(var i = 0; i < res.data.length; i++) {
							if(res.data[i].name == this.ruleForm.result) {
								this.peopleArr = res.data[i].nextActiveUsers;
								this.isEnd = res.data[i].nextActiveName;
							}
						}
					}
				});
			},
			//部门查询用户
			handleNodeClick(data) {
				var organizationParam = {
					organizationId: data.id
				}
				getAjax("/api/organizationService/role/findByOrganizationAllUser", organizationParam)
					.then(data => {
                        console.log(data)
						if(data.code == "0") {
							this.checkedUserId = [];
							this.tableData = [];
							_.forEach(data.data, val => {
                                val.key=val.id+"--"+val.userName;
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
                console.log(this.relateUserId);
                this.personnel=this.relateUserId
				var roleParam = {
					userIds: String(this.relateUserId)
                }
         var planSendreplyuserList= []
        this.personnel.forEach(value=>{
            console.log()
            planSendreplyuserList.push(
              {
              	"createDate": "",
              	"createUser": sessionStorage.userId,
              	"createUserName": sessionStorage.userName,
              	"deleteDate": "",
              	"deleteUser": "",
              	"id": "",
              	"replyId": "",
              	"sendDate": parseTime(new Date(), "{y}-{m}-{d}"),
              	"sendUserid": value.split('--')[0],
              	"sendUsername": value.split('--')[1],
              	"updateDate": "",
              	"updateUser": "",
              	"useable": ""
              }
            )
        })
        var uploadApprovalAnnexfileVo={
            	"applyId": this.$route.query.businessKey,
            	"createId": sessionStorage.userId,
            	"planAnnexFile": {
            		"annexChinaName": "",
            		"annexFileType": "",
            		"createDate": "",
            		"createUser": sessionStorage.userId,
            		"createUserName": sessionStorage.userName,
            		"deleteDate": "",
            		"deleteUser": "",
            		"fileName": this.currentIndex.fileName,
            		"filePath": this.currentIndex.filePath,
            		"id": "",
            		"mainTableId": "",
            		"ordernum": 0,
            		"updateDate": "",
            		"updateUser": "",
            		"useable": ""
            	},
            	"projectIds": this.selectID.join(','),
              "planSendreplyuserList": []
		}
		if(uploadApprovalAnnexfileVo.planAnnexFile.filePath == undefined) {
				return this.$message('请上传文件')
		}
		if(uploadApprovalAnnexfileVo.planSendreplyuserList == '') {
			return this.$message('请选择下发人员')
		}
        uploadApprovalAnnexfileVo.planSendreplyuserList = planSendreplyuserList
        // console.log(uploadApprovalAnnexfileVo)
          postAjaxJson("/api/planmanagementService/annualResearchPlan/startUploadMetting",uploadApprovalAnnexfileVo).then(res => {
            if(res.code == 0) {
                this.$message("成功");
            } else {
                this.$message(res.message);
            }
          });
            },
			// 审核结果下拉事件
			selectGet(val) {
				this.value = val //赋值给value
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
			// 计划单切换
			handleClick(tab, event) {
				// console.log(tab, event);
			},
			//tab查看附件切换点击事件
			tabs(id) {
				console.log(id)
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid,!this.relatedDataBtn()) {
						var param = {
							"applyId": this.$route.query.businessKey,
							"deploymentKey": "ndkjzjxmhz",
							"formId": "",
							"fromKey": "",
							"manger": "",
							"message": this.ruleForm.suggest,
							"needCompanyExamine": "",
							"needTechnologyExamine": "",
							"result": this.ruleForm.result,
							"taskId": this.$route.query.taskId,
							"taskName": this.taskName,
							"userid": this.ruleForm.people
						}
						postAjaxJson("/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep", param).then(res => {
							if(res.code == 0) {
								this.$message("成功");
								this.$router.push("/home/index");
							}else {
								this.$message(res.message);
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//表格查看商品
			check(row) {
				this.dialogTableVisible = true
			},
			//表格查看附件
			chakanfj(row) {
				this.dialogVisible = true
			},
			// 表格计算求和
			getSummaries(param) {
				const {
					columns,
					data
				} = param
				const sums = []
				columns.forEach((column, index) => {
					if(index === 1) {
						sums[index] = '年度科研计划总金额'
					} else if(index === 4) {
						const values = data.map(item => Number(item[column.property]))
						if(!values.every(value => isNaN(value))) {
							sums[index] = values.reduce((prev, curr) => {
								const value = Number(curr)
								if(!isNaN(value)) {
									return prev + curr
								} else {
									return prev
								}
							}, 0)
						} else {
							sums[index] = 'N/A'
						}
					} else {
						sums[index] = ''
					}
				})
				return sums
			},

			// 获取表格选中时的数据
			selectRow(val) {
        console.log(val)
				this.selectlistRow = val
			},
			// 删除商品行
			delData() {
        this.selectlistRow.forEach(item => {
          this.selectID.push(item.id)
        })
				_.forEach(this.selectlistRow, val => {
					this.zxftableData = _.without(this.zxftableData, val);
				});
				// 删除完数据之后清除勾选框
				this.$refs.zxftableData.clearSelection()
			},
            handleSuccess(file,res) {
				if(file.code == 0) {
					this.fileupdate = true;
                    this.currentIndex.filePath = file.data;
                    this.currentIndex.fileName = res.name;
                     console.log(this.currentIndex.filePath)
					this.$message('上传成功')
				} else {
					this.fileupdate = false;
					this.$message(file.message)
				}
			},
			// 全部删除
			remover() {
				this.delData()
			},
			// 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
			changeMode() {
				if(this.mode == "transfer") {
					this.mode = "addressList";
				} else {
					this.mode = "transfer";
				}
			},
		},

		created() {
            var param = {
				applyId: this.$route.query.businessKey
			}
			getAjax("/api/planmanagementService/technologyPlan/getPlanBudgetprojectInfo", param).then(res => {
				this.zxftableData = res.data.planBudgetprojects;
				this.planBudget = res.data.planApply;
				this.planBudget.createUserName = res.data.planApply.createUserName;
				this.planBudget.title= res.data.planApply.title?res.data.planApply.title:"年度科技资金汇总下发";
			});
			console.log("123");
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
		}
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

	.jhbg>ul>li {
		width: 30%;
		font-size: 14px;
	}

	.send {
		margin-top: 3%;
	}

	.send>p {
		height: 45px;
		line-height: 45px;
		padding: 0 22px;
		background-color: rgba(243, 243, 243, 0.829);
		font-size: 15px;
		font-size: 14px;
	}

	.sends {
		display: flex;
		height: 35px;
		line-height: 35px;
		margin-top: 2%;
	}

	.sends>span {
		display: inline-block;
		margin-right: 2%;
		font-size: 14px;
	}

	.ssue {
		font-size: 14px;
		margin-top: 20px;
	}

	.butts {
		display: flex;
		justify-content: center;
		height: 90px;
	}

	.butts>button {
		height: 35px;
		margin: auto 10px;
	}

	.relatedUser>div {
		width: 800px;
	}

	.relatedUser>div>.el-dialog__body {
		padding: 10px 20px;
	}

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
