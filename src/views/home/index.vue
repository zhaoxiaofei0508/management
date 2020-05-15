<template>
	<div class="box">
		<el-row :gutter="20" style="margin-bottom:20px;">
			<el-col :span="20">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span class="Plan">计划占比</span>
						<el-button style="float: right; padding: 3px 0" type="text">
							<el-button type="text" @click="monthClick" style="height: 100%;">本月</el-button>
							<el-button type="text" @click="yearClick">全年</el-button>
							<el-date-picker @change="daterChangeEvent" value-format="yyyy-MM-dd" v-model="dater" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" style="margin-left: 20px;width: 66%;">
							</el-date-picker>
						</el-button>
					</div>
					<div class="text item" style="min-height:160px;">
						<el-col :span="4">
							<pie-chart v-if="researchBool" :data1="product1" :data2="productTotal" />
						</el-col>
						<el-col :span="4">
							<pie-chart v-if="researchBool" :data1="noProduct1" :data2="productTotal" />
						</el-col>
						<el-col :span="4">
							<pie-chart v-if="researchBool" :data1="Service1" :data2="productTotal" />
						</el-col>
						<el-col :span="4">
							<pie-chart v-if="researchBool" :data1="research1" :data2="productTotal" />
						</el-col>
						<el-col :span="6">
							<pie-Circle  v-if="researchBool1" style="float:right;"  :data1="plan1" :data2="plan2" :data3="plan3" />
						</el-col>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4">
				<div @click="enterDepart" style="background-color: white;padding-top:70px;">
					<img src="@/assets/images/1.svg" style="width: 140px;display: block;margin:0 auto;padding:10px;">
					<p style="height: 70px;text-align: center;">
						<router-link to="/parameter">部门/中心台账</router-link>
					</p>
				</div>
			</el-col>
		</el-row>
		<div class="form">
			<el-card class="box-card" shadow="never">
				<div slot="header" class="clearfix">
					<span>常用表单</span>
					<el-button style="float: right; padding: 3px 0" type="text">
						<router-link to='/forme'><i class="el-icon-more"></i></router-link>
					</el-button>
				</div>
				<div class="text item">
					<div style="margin: 0 30px;">
						<el-row v-if="biaodanArray.length>0" :gutter="20">
							<el-col :span="6" v-for="(item, index) in biaodanArray" :key="index.id">
								<div @click="fun1(item.formName,item.id)">
									<img style="vertical-align: middle;" src='https://axure-file.lanhuhu.com/21a8b113-c334-4252-80ac-7514e60de361__02d60e17c0fa5e4757bcd47eb05cc32c.svg'>
									<router-link :to='item.id'>{{item.formName}}</router-link>
								</div>
							</el-col>
						</el-row>
						<el-row v-if="biaodanArray.length==0" style="text-align: center;line-height:30px;">
							<img src="@/assets/images/listNoData.png" style="width:230px;margin:0 auto;display: block;" alt="" />
							<span>无数据</span>
						</el-row>
					</div>
				</div>
			</el-card>
		</div>
		<div class="task" style="margin-top:20px;">
			<el-card class="box-card" shadow="always">
				<div slot="header" class="clearfix">
					<span>我的任务</span>
					<el-button style="float: right; padding: 3px 0" type="text">
						<i class="el-icon-more"></i>
					</el-button>
				</div>
				<div class="text item">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="待办" name="upComing">
							<el-table :data="tableDataEnd" style="width: 100%;margin: auto;">
								<el-table-column prop="key" label="序号" width="60" />
								<el-table-column prop="name" label="任务名称" />
								<el-table-column prop="createTime" label="创建时间" />
								<el-table-column prop="address" label="操作">
									<template slot-scope="scope">
										<el-button @click="deal(scope.row)" type="text" size="small">
											去办理
										</el-button>
									</template>
								</el-table-column>
							</el-table>
							<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
						</el-tab-pane>
						<el-tab-pane label="已办" name="done">
							<el-table :data="tableDataDone" style="width: 100%;margin: auto;">
								<el-table-column prop="key" label="序号" width="60" />
								<el-table-column prop="name" label="任务名称" />
								<el-table-column prop="createTime" label="创建时间" />
								<el-table-column prop="address" label="操作">
									<template slot-scope="scope">
										<el-button @click="viewDone(scope.row)" type="text" size="small">
											查看
										</el-button>
									</template>
								</el-table-column>
							</el-table>
							<pagination v-show="totalDone>0" :total="totalDone" :page.sync="listQueryDone.page" :limit.sync="listQueryDone.limit" @pagination="getListDone" />
						</el-tab-pane>
						<el-tab-pane label="我创建的" name="myCreate">
							<el-table :data="tableDatass" style="width: 100%;margin: auto;">
								<el-table-column prop="key" label="序号" width="60"/>
									<el-table-column prop="title" label="任务名称"/>
									<el-table-column prop="applyDate" label="创建时间" />
									<el-table-column prop="applyState" label="审核状态">
										<template slot-scope="scope">
											<p v-if="scope.row.applyState === '1'">
												草稿
											</p>
											<p v-if="scope.row.applyState === '2'">
												进行中
											</p>
											<p v-if="scope.row.applyState === '3'">
												已完成
											</p>
										</template>
								</el-table-column>
								<el-table-column prop="applyresult" label="审核结果">
								</el-table-column>
								<el-table-column prop="address" label="操作">
									<template slot-scope="scope">
										<p v-if="scope.row.applyState === '2'|| scope.row.applyState === '3'||		scope.row.applyresult === '通过'">
											<el-button @click="chakan(scope.row)" type="text" size="small">
												查看
											</el-button>
											<el-button  @click.native.prevent="deleteRow(scope.row)" type="text" size="small">
												删除
											</el-button>
										</p>
										<p v-if="scope.row.applyState === '3'&&scope.row.applyresult === '驳回'">
											<el-button @click="chakan(scope.row)" type="text" size="small">
												查看
											</el-button>
											<el-button @click.native.prevent="deleteRow(scope.row)"  type="text" size="small">
												删除
											</el-button>
											<el-button @click="update(scope.row)" type="text" size="small">
												重新提交
											</el-button>
										</p>
										<p v-if="scope.row.applyState === '1'">
											<el-button @click="chakan(scope.row)" type="text" size="small">
												查看
											</el-button>
											<el-button @click.native.prevent="deleteRow(scope.row)"  type="text" size="small">
												删除
											</el-button>
											<el-button @click="update(scope.row)" type="text" size="small">
												提交
											</el-button>
										</p>
									</template>
								</el-table-column>
							</el-table>
							<pagination v-show="totalCreate>0" :total="totalCreate" :page.sync="listQueryCreate.page" :limit.sync="listQueryCreate.limit" @pagination="getListCreate" />
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-card>
		</div>
	</div>
</template>
<script>
	import { getAjax } from '@/utils/ajaxRequest'
	let dataFilter = [{
			value: 0,
			name: "待提交计划",
		},
		{
			value: 10,
			name: "进行中计划",
		},
		{
			value: 40,
			name: "已完成计划",
		},
	];

	import Pagination from '@/components/Pagination'
	import PieChart from './components/PieChart'
	import PieCircle from './components/pieCircle'
	import { parseTime } from '@/utils'
	export default {
		name: 'Home',
		components: {
			Pagination,
			PieChart,
			PieCircle
		},
		data() {
			return {
				width: "100%",
				height: "150px",
				totalDone: 0,
				listQueryDone: {
					page: 1,
					limit: 10,
				},
				totalCreate: 0,
				listQueryCreate: {
					page: 1,
					limit: 10,
				},
				activeName: "upComing",
				listQuery: {
					page: 1,
					limit: 10,
				},
				product1: {
					value: 0,
					name: "生产类",
					color: "#40a1ff",
				},
				researchBool: false,
				researchBool1:false,
				productTotal: {
					value: 0,
					name: "",
					color: "#f0f2f5",
				},
				noProduct1: {
					value: 0,
					name: "非生产类",
					color: "#6dd38a",
				},
				Service1: {
					value: 0,
					name: "服务类",
					color: "#fcdb64",
				},
				research1: {
					value: 0,
					name: "科研类",
					color: "#c561fc",
				},
				plan1: {
					value: 0,
					name: "待提交计划",
				},
				plan2: {
					value: 0,
					name: "进行中计划",
				},
				plan3: {
					value: 0,
					name: "已完成计划",
				},
				total: 0,
				Timeout: '1', //超时
				refuse: '', //驳回
				wait: '', //等待
				charts: '', //charts,
				dater: ['', ''],
				tableDataEnd: [], //代办表格	
				tableDataDone: [],
				tableDataBegin: [],
				tableDatas: [], //已办表格
				tableDatass: [], //我创建的表格
				biaodanArray: [] //首页表单列表

			}
		},
		created() {
			var months = Number(parseTime(new Date(), "{m}")) + 1;
			this.dater = [parseTime(new Date(), "{y}-{m}") + "-01", parseTime(new Date(), "{y}") + "-" + months + "-01"];
			this.funa()
			this.userane = sessionStorage.userName;
			this.userNameid = sessionStorage.userId;
			//首页表单
			getAjax("/api/planmanagementService/planFrom/commonformsList").then(res => {
				this.biaodanArray = res.data;
			});
			//任务提醒
			getAjax("/api/planmanagementService/PersonalInterface/findPersonalTask?userid=" + sessionStorage.userId).then(res => {
				this.refuse = res.data.PlanDismissed;
				this.wait = res.data.ToSubmitPlan;
			});
			//部门任务统计
			getAjax("/api/planmanagementService/PersonalInterface/findDepartmentalPlan?orgid=" + sessionStorage.orgId).then(res => {
				this.researchBool1=true;
				this.plan1={
					value: res.data.a,
					name: "待提交计划",
				};
				this.plan2={
					value: res.data.b,
					name: "进行中计划",
				};
				this.plan3={
					value: res.data.c,
					name: "已完成计划",
				};
			});

			this.getList();
		},
		mounted() {

		},
		methods: {
			enterDepart() {
				var userName=sessionStorage.userName
				var orgType=sessionStorage.orgType
				if(orgType === '部门'){
					this.$router.push({
						path: "/parameter"
					});
				}else if(orgType === '中心'){
					this.$router.push({
						path: "/Planningjhb"
					});
				}
				
			},
			handleClick(tab) {
				if(tab.index == 1) {
					this.getListDone();
				} else if(tab.index == 2) {
					this.getListCreate();
				} else {
					this.getList()
				}
			},
			getList() {
				var param = {
					pageNumber: this.listQuery.page - 1,
					pageSize: this.listQuery.limit,
					serverId: 13
				};
				// 待办
				getAjax("/api/processService/userTask/taskListByCategory", param).then(data => {
					if(data.code == 0) {
						data.data.content.forEach((val, key) => {
							val.key = (this.listQuery.page - 1) * this.listQuery.limit + key + 1
						});
						this.tableDataEnd = data.data.content;
						this.total = data.data.totalElements;
					}
				});
			},
			getListDone() {
				var param = {
					pageNumber: this.listQueryDone.page - 1,
					pageSize: this.listQueryDone.limit,
				}
				//已办
				getAjax("/api/process-service/userTask/myParticipation", param).then(res => {
					if(res.code == 0) {
						res.data.content.forEach((val, key) => {
							val.key = (this.listQueryDone.page - 1) * this.listQueryDone.limit + key + 1
						});
						this.tableDataDone = res.data.content;
						this.totalDone = res.data.totalElements;
					}
				});
			},
			getListCreate() {
				var param = {
					pageNumber: this.listQueryCreate.page - 1,
					pageSize: this.listQueryCreate.limit,
				}
				getAjax("/api/planmanagementService/PersonalInterface/findMyCreatelist", param).then(res => {
					console.log(res)
					if(res.code == 0) {
						res.data.content.forEach((val, key) => {
							val.key = (this.listQueryCreate.page - 1) * this.listQueryCreate.limit + key + 1
						});
						this.tableDatass = res.data.content;
						this.totalCreate = res.data.totalElements;
					}
				});
			},
			deal(row) {
				this.$router.push({
					path: row.businessForm
				});
			},
			viewDone(row){
				this.$router.push({
					path: row.businessForm
				});
			},
			chakan(row) {
				var id=row.id;
				var formName=row.formName;
				if(formName === '年度专项安全资金计划' || formName === '年度专项折旧生产设备/工程资金计划' || formName === '年度专项折旧非生产设备资金计划' || formName === '年度大修资金计划') {
					this.$router.push({
						path: '/establishView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科技资金汇总计划') {
					this.$router.push({
						path: '/yearTotalPlanView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科技资金补报') {
					this.$router.push({
						path: '/supplementOView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度专项资金变更') {
					this.$router.push({
						path: '/MoneyChangView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科研项目计划') {
					this.$router.push({
						path: '/YearSientificView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科技资金计划') {
					this.$router.push({
						path: '/yearMoneyPlanView',
						query: {
							id: id,
							formName: formName
						}
					})
				}
				if(formName === '年度专项安全资金汇总计划' || formName === '年度专项折旧生产设备/工程资金汇总划' || formName === '年度专项折旧非生产设备资金汇总计划') {
					this.$router.push({
						path: '/summaryView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度大修资金汇总计划') {
					this.$router.push({
						path: '/dxcollectView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科研项目汇总计划') {
					this.$router.push({
						path: '/YearSientificollectView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度专项资金汇总计划') {
					this.$router.push({
						path: '/specialView',
						query: {
							id: id,
							formName: formName
						}
					})
				}
				if(formName === '月度科研项目实施计划') {
					this.$router.push({
						path: '/scientificOView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '低值易耗月度采购计划' || formName === '低值易耗零星采购计划') {
					this.$router.push({
						path: '/pricedView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度生产物资计划') {
					this.$router.push({
						path: '/monthlyjhView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科研项目计划') {
					this.$router.push({
						path: '/YearSientificView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '咨询及其他服务计划') {
					this.$router.push({
						path: '/consulstView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度专项资金计划') {
					this.$router.push({
						path: '/moneySpecialView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '分包项目计划') {
					this.$router.push({
						path: '/subpackageView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '外委计划') {
					this.$router.push({
						path: '/perpheralView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '供应商推荐') {
					this.$router.push({
						path: '/supplierView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度大修月度实施计划') {
					this.$router.push({
						path: '/YearRepairView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '框架协议计划') {
					this.$router.push({
						path: '/framejhView',
						query: {
							id: id,
							formName: formName
						}
					})
				}
				if(formName === '低值易耗月度采购汇总计划' || formName === '低值易耗零星采购汇总计划') {
					this.$router.push({
						path: '/collectView',
						query: {
							id: id,
							formName: formName
						}
					})
				}else if(formName === '月度生产物资汇总计划') {
					this.$router.push({
						path: '/stateView',
						query: {
							id: id,
							formName: formName
						}
					})
				}
			},
			update(row) {
				var id=row.id;
				var formName=row.formName;
				if(formName === '年度专项安全资金计划' || formName === '年度专项折旧生产设备/工程资金计划' || formName === '年度专项折旧非生产设备资金计划' || formName === '年度大修资金计划') {
					this.$router.push({
						path: '/establishUpdate',
						query: {
							id: id,
							formName: formName
						}
					})
				}else if(formName === '年度科技资金汇总计划') {
					this.$router.push({
						path: '/yearTotalPlanUpdate',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科技资金补报') {
					this.$router.push({
						path: '/supplementOUpdate',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度专项资金变更') {
					this.$router.push({
						path: '/MoneyChangUpdate',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科研项目计划') {
					this.$router.push({
						path: '/YearSientificUpdate',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科技资金计划') {
					this.$router.push({
						path: '/yearMoneyPlanUpdate',
						query: {
							id: id,
							formName: formName
						}
					})
				}
				if(formName === '年度专项安全资金汇总计划' || formName === '年度专项折旧生产设备/工程资金汇总划' || formName === '年度专项折旧非生产设备资金汇总计划') {
					this.$router.push({
						path: '/summaryUpdate',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度大修资金汇总计划') {
					this.$router.push({
						path: '/dxcollectUpdate',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科研项目汇总计划') {
					this.$router.push({
						path: '/YearSientificollectUpdate',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度专项资金汇总计划') {
					this.$router.push({
						path: '/specialUpdate',
						query: {
							id: id,
							formName: formName
						}
					})
				}
				if(formName === '月度科研项目实施计划') {
					this.$router.push({
						path: '/scientificOView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '低值易耗月度采购计划' || formName === '低值易耗零星采购计划') {
					this.$router.push({
						path: '/pricedView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度生产物资计划') {
					this.$router.push({
						path: '/monthlyjhView',
						query: {
							id: id,
							formName: formName
						}
					})
				}else if(formName === '咨询及其他服务计划') {
					this.$router.push({
						path: '/consultView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度专项资金计划') {
					this.$router.push({
						path: '/moneySpecialView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '分包项目计划') {
					this.$router.push({
						path: '/subpackageView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '外委计划') {
					this.$router.push({
						path: '/perpheralView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '供应商推荐') {
					this.$router.push({
						path: '/supplierView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度大修月度实施计划') {
					this.$router.push({
						path: '/YearRepairView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '框架协议计划') {
					this.$router.push({
						path: '/framejh',
						query: {
							id: id,
							formName: formName
						}
					})
				}
				if(formName === '低值易耗月度采购汇总计划' || formName === '低值易耗零星采购汇总计划') {
					this.$router.push({
						path: '/collectView',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度生产物资汇总计划') {
					this.$router.push({
						path: '/stateView',
						query: {
							id: id,
							formName: formName
						}
					})
				}
			},
			// 删除
			deleteRow(row) {
				var applyId=row.id
				// applyId.substring(1,applyId.length-1)
				console.log(applyId.substring(1,applyId.length-1))
				getAjax(`/api/planmanagementService/PlanProjectSelect/taskApplyIdDel`,applyId).then(res =>  {
					console.log(res)  
					if(res.code == 0) {
						
				} 
            });

			},
			// 重新提交
			cxtj() {

			},
			fun1(formName, id) {
				if(formName === '年度专项安全资金计划' || formName === '年度专项折旧生产设备/工程资金计划' || formName === '年度专项折旧非生产设备资金计划' || formName === '年度大修资金计划') {
					this.$router.push({
						path: '/establish',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科技资金汇总计划') {
					this.$router.push({
						path: '/yearTotalPlan',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科技资金补报') {
					this.$router.push({
						path: '/supplementO',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度专项资金变更') {
					this.$router.push({
						path: '/MoneyChang',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科研项目计划') {
					this.$router.push({
						path: '/YearSientific',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科技资金计划') {
					this.$router.push({
						path: '/yearMoneyPlan',
						query: {
							id: id,
							formName: formName
						}
					})
				}
				if(formName === '年度专项安全资金汇总计划' || formName === '年度专项折旧生产设备/工程资金汇总划' || formName === '年度专项折旧非生产设备资金汇总计划') {
					this.$router.push({
						path: '/summary',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度大修资金汇总计划') {
					this.$router.push({
						path: '/dxcollect',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科研项目汇总计划') {
					this.$router.push({
						path: '/YearSientificollect',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度专项资金汇总计划') {
					this.$router.push({
						path: '/special',
						query: {
							id: id,
							formName: formName
						}
					})
				}
				if(formName === '月度科研项目实施计划') {
					this.$router.push({
						path: '/scientificO',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '低值易耗月度采购计划' || formName === '低值易耗零星采购计划') {
					this.$router.push({
						path: '/priced',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度生产物资计划') {
					this.$router.push({
						path: '/monthlyjh',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科研项目计划') {
					this.$router.push({
						path: '/YearSientific',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '咨询及其他服务计划') {
					this.$router.push({
						path: '/consult',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度专项资金计划') {
					this.$router.push({
						path: '/moneySpecial',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '分包项目计划') {
					this.$router.push({
						path: '/subpackage',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '外委计划') {
					this.$router.push({
						path: '/perpheral',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '供应商推荐') {
					this.$router.push({
						path: '/supplier',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度大修月度实施计划') {
					this.$router.push({
						path: '/YearRepair',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '框架协议计划') {
					this.$router.push({
						path: '/framejh',
						query: {
							id: id,
							formName: formName
						}
					})
				}
				if(formName === '低值易耗月度采购汇总计划' || formName === '低值易耗零星采购汇总计划') {
					this.$router.push({
						path: '/collect',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度生产物资汇总计划') {
					this.$router.push({
						path: '/state',
						query: {
							id: id,
							formName: formName
						}
					})
				}
			},
			daterChangeEvent() {
				this.funa()
			},
			monthClick() {
				this.researchBool=false;
				var months = Number(parseTime(new Date(), "{m}")) + 1;
				this.dater = [parseTime(new Date(), "{y}-{m}") + "-01", parseTime(new Date(), "{y}") + "-" + months + "-01"];
				this.funa();
			},
			yearClick(){
				this.researchBool=false;
				var months = Number(parseTime(new Date(), "{y}")) + 1;
				this.dater = [parseTime(new Date(), "{y}")+"01" + "-01", parseTime(new Date(), "{y}") + "-01-01"];
				this.funa();
			},
			funa() {
				var param = {
					beginTime: this.dater[0],
					endtime: this.dater[1],
					orgid: sessionStorage.orgId,
					type: "",
					userid: sessionStorage.userId
				}
				getAjax("/api/planmanagementService/PersonalInterface/findPlannedProportion", param).then(res => {
					if(res.code == 0) {
						this.researchBool = true;
						this.productTotal = {
							value: res.data.totalNum,
							name: "",
							color: "#f0f2f5",
						};
						this.product1 = {
							value: res.data.production,
							name: "生产类",
							color: "#40a1ff",
						};
						this.noProduct1 = {
							value: res.data.nonproductive,
							name: "非生产类",
							color: "#6dd38a",
						};
						this.Service1 = {
							value: res.data.service,
							name: "服务类",
							color: "#fcdb64",
						};
						this.research1 = {
							value: res.data.scientific,
							name: "科研类",
							color: "#c561fc",
						};
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background: #fcfcfc;
	}
	
	.taskReminder ul,
	.taskReminder ul li {
		width: 100%;
	}
	
	.taskReminder ul li {
		margin-bottom: 10px;
		border-bottom: 1px dashed #ccc;
		padding-bottom: 8px;
	}
	
	.taskReminder ul li img {
		display: inline-block;
		width: 70px;
		height: 70px;
		vertical-align: top;
	}
	
	.taskReminder ul li>div {
		display: inline-block;
		width: 60%;
	}
	
	.taskReminder ul li>div>p:first-child {
		font-size: 14px;
		font-weight: 500;
		color: #333;
		margin-bottom: 20px;
		margin-top: 10px;
	}
	
	.taskReminder ul li>div>p:last-child {
		font-size: 12px;
		font-weight: 500;
		color: #999;
		margin-top: 10px;
	}
</style>