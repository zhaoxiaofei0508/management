<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/forme' }">选择计划</el-breadcrumb-item>
			<el-breadcrumb-item>{{formName}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content">
			<div style="padding:0 15%;">
				<el-steps :active="stepActive" finish-status="finish" align-center>
					<el-step title="选择计划"></el-step>
					<el-step title="计划汇总单"></el-step>
					<el-step title="预览"></el-step>
				</el-steps>
			</div>
			<div>
				<div class="ztable">
					<el-tabs v-model="active" style="">
						<el-tab-pane name="0">
							<el-input placeholder="请输入计划名称" clearable prefix-icon="el-icon-search" v-model.lazy="planInp" @blur="planList" style="width:20%; padding:10px 0" />
							<el-table :data="findAllPlanApplyList" ref="findAllPlanApplyList" @select="selectMemoryFn" @select-all="selectAll" @selection-change="handleSelectionChange" tooltip-effect="dark" border stripe style="width: 100%">
								<el-table-column type="selection" width="50" align="center"></el-table-column>
								<el-table-column prop="title" label="计划名称" />
								<el-table-column label="提报人" prop="createUser" />
								<el-table-column label="提报部门" prop="orgName" />
								<el-table-column label="提报时间" prop="createDate" />
								<el-table-column label="操作">
									<template slot-scope="scope">
										<el-button type="text" size="small" @click="viewPlan(scope.row)">查看</el-button>
									</template>
								</el-table-column>
							</el-table>
							<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="planList" />
							<div class="bottom" style="margin-top:30px;">
								<el-button @click="states">取消</el-button>
								<el-button :disabled="multipleSelection.length==0" type="primary" @click="next">下一步</el-button>
							</div>
						</el-tab-pane>
						<el-tab-pane name="1">
							<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-ruleForm" style="margin-top:20px;">
								<el-form-item prop="usename" label="汇总单名称" :rules="[
                                { required: true, message: '请输入汇总单名称', trigger: 'blur' },
                                ]">
									<el-input v-model="dynamicValidateForm.usename" style="width:30%"></el-input>
								</el-form-item>
							</el-form>
							<p style="height: 35px;line-height: 35px;padding: 0 16px;">项目信息</p>
							<div>
								<!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
								<!--<el-tab-pane v-for="(item, index) in editableTabs" :key="item.orgName" :label="item.orgName" :name="item.orgName">-->
								<div class="operating" style="padding:0 30px 0;">
									<!--<el-button size="small" type="primary" plain @click="addRow()">增加行</el-button>-->
									<!--<el-button size="small" type="primary" :disabled="selectlistRow.length==0" @click="addRows()" plain>复制行</el-button>-->
									<el-button size="small" type="primary" :disabled="selectlistRow.length==0" plain @click="delData()">删除行</el-button>
									<!--<el-button size="small" type="primary" plain>导入数据</el-button>-->
									<el-button size="small" type="primary" @click="delAll()" plain>全部删除</el-button>
									<el-input v-model.lazy="zxfsearch" @blur="getEditAbles" style="display: inline-block;width: 30%;borderRight:none;float:right;" placeholder="请输入搜索内容" prefix-icon="el-icon-search">
									</el-input>
								</div>
								<div class="ztable" style="margin-top: 2%;">
									<el-table :data="editableTabs" ref="table" tooltip-effect="dark" border stripe style="width: 100%" @selection-change='selectRows'>
										<el-table-column type="selection" width="45" align="center"></el-table-column>

										<el-table-column label="项目编码" align="center" width="80">
											<template slot-scope="scope">
												<el-input v-model="scope.row.projectNumber" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="项目类别" width="80" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.projectType" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="项目名称" width="120" class="zxfsh">
											<template slot-scope="scope">
												<el-input v-model="scope.row.projectName" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="项目预估金额" width="120">
											<template slot-scope="scope">
												<el-input v-model="scope.row.projectMoney" @change="getProjectMoney(scope.row)" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="开始时间" width="150">
											<template slot-scope="scope">
												<el-date-picker v-model="scope.row.startDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class='inputss' type="date" placeholder="计划实施时间">
												</el-date-picker>
											</template>
										</el-table-column>
										<el-table-column label="结束时间" width="150">
											<template slot-scope="scope">
												<el-date-picker v-model="scope.row.endDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class='inputss' type="date" placeholder="计划实施时间">
												</el-date-picker>
											</template>
										</el-table-column>
										<el-table-column label="负责人">
											<template slot-scope="scope">
												<el-input v-model="scope.row.chargePerson" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="项目简介">
											<template slot-scope="scope">
												<el-input v-model="scope.row.projectDesc" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="提报部门">
											<template slot-scope="scope">
												<el-input v-model="scope.row.orgName" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="附件">
											<template slot-scope="scope">
												<span v-if="scope.row.filePath">是</span>
												<span v-else>否</span>
											</template>
										</el-table-column>
										<el-table-column label="操作">
											<template slot-scope="scope">
												<el-button v-if="scope.row.filePath" @click="viewAttach(scope.row)" type="text">查看附件</el-button>
												<el-button v-if="scope.row.goodsId" @click="viewGoods(scope.row)" type="text">查看商品</el-button>
											</template>
										</el-table-column>
									</el-table>
									<p style="margin-top: 12px">计划总金额（元）:<span>{{planMoney}}</span></p>
								</div>
								<!--</el-tab-pane>-->
								<!--</el-tabs>-->
							</div>
							<div class="bottom" style="margin-top:30px;">
								<el-button @click="last">上一步</el-button>
								<el-button :disabled="selectlistRow.length==0" type="primary" @click="nexts">下一步</el-button>
							</div>
						</el-tab-pane>
						<el-tab-pane name="2">
							<div class="content">
								<h3>2020年度专项安全/折旧生产设备、工程/折旧非生产设备资金计划</h3>
								<div class="essential_top">
									<p>基本信息</p>
									<ul>
										<li>申请人:<span class="usname">{{userane}}</span><i class="iconfont icon-user-3"></i></li>
										<li>申请部门:<span class="usname">{{orgName}}</span><i class="iconfont icon-bumen"></i></li>
										<!--<li>资金类别:<span>安全/大修/折旧</span></li>-->
										<li>申请时间:<span>{{applyDate}}</span></li>
									</ul>
								</div>
								<div class="essential_top">
									<p>项目信息</p>
									<!--<el-tabs v-model="activeName1">-->
									<!--<el-tab-pane v-for="(item, index) in endTable" :key="item.orgName" :label="item.orgName" :name="item.orgName">-->
									<el-table :data="selectlistRow" ref="table" tooltip-effect="dark" border stripe style="width: 100%">

										<el-table-column label="项目编码" align="center" prop="projectNumber" width="80" />
										<el-table-column label="项目类别" width="80" align="center" prop="projectType" />
										<el-table-column label="项目名称" width="120" class="zxfsh" prop="projectName" />
										<el-table-column label="项目预估金额" width="120" prop="projectMoney" />
										<el-table-column label="开始时间" width="150" prop="startDate" />
										<el-table-column label="结束时间" width="150" prop="endDate" />
										<el-table-column label="负责人" prop="chargePerson" />
										<el-table-column label="项目简介" prop="projectDesc" />
										<el-table-column label="提报部门" prop="orgName" />
										<el-table-column label="附件路径" prop="filePath" />
										<el-table-column label="操作">
											<template slot-scope="scope">
												<el-button v-if="scope.row.filePath" @click="viewAttach(scope.row)" type="text">查看附件</el-button>
												<el-button v-if="scope.row.goodsId" @click="viewGoods(scope.row)" type="text">查看商品</el-button>
											</template>
										</el-table-column>
									</el-table>
									<!--<p style="margin-top: 12px;margin-bottom:20px;">计划总金额:<span>{{planMoney}}</span></p>-->
									<el-form style="margin-top:20px;" ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px">
										<el-form-item label="计划总金额（元）：">
											{{planMoney}}
										</el-form-item>
										<el-form-item label="下一步审核人" prop="userId" ref="userId" style="margin-top:2%">
											<el-select style="width:40%;" @change="getUserId" filterable v-model="temp.userId" placeholder="请选择审核人">
												<el-option v-for="m in userArr" :label="m.name" :value="m.id" :key="m.id"></el-option>
											</el-select>
										</el-form-item>
									</el-form>
								</div>
							</div>
							<div class="bottom">
								<el-button @click="yulan">上一步</el-button>
								<el-button type="primary" @click="submit(1)">存入草稿</el-button>
								<el-button type="primary" @click="submit(2)">提交审核</el-button>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
		<!-- 流程图遮罩层 -->
		<div class="mask" v-if="showModal" @click="showModal=false"></div>
		<!-- 流程图遮罩内容 -->
		<div class="pop" v-if="showModal">
			<img src="../../../static/img/tu.jpg">
		</div>
		<!-- 选择计划查看内容外层弹框 -->
		<el-dialog title="详情" :visible.sync="zxfcommodity" width="95%">
			<div class="summaryTitle">计划信息</div>
			<el-form :model="planBudget" class="demo-form-inline">
				<el-col :span="6">
					<el-form-item label="计划名称">
						{{planBudget.title}}
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="申请部门">
						{{planBudget.orgName}}
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="申请人">
						{{planBudget.createUser}}
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="申请时间">
						{{planBudget.createDate}}
					</el-form-item>
				</el-col>

			</el-form>
			<div style="clear:both;"></div>
			<div class="summaryTitle">项目信息</div>
			<div class="ztable">
				<el-table :data="projectList" border stripe style="width: 95%">
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
							<el-button type="text" size="small" @click="viewGoods(scope.row)">查看商品</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>
		<!-- 选择计划查看遮罩内容查看商品里层弹框 -->
		<el-dialog title="商品明细" :visible.sync="dialogTableVisible" width="95%" append-to-body>
			<!--<Table :tableDatas="sptable" style="width:100%"></Table>-->
			<el-table :data="sptable" tooltip-effect="dark" border stripe>
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

		<!-- 计划预览查看商品弹框 -->
		<el-dialog title="商品明细" :visible.sync="zxfcksptk" width="95%">
			<el-table :data="zxfcksp" tooltip-effect="dark" border stripe>
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
		<el-dialog title="项目文件" :visible.sync="attachVisible" width="95%">
			<el-tabs v-model="attachActive" type="card">
				<el-tab-pane v-for="(m,index) in attachArr" :key="m.id" :name="m.id" :label="m.fileName">
					{{m.annexChinaName}}
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>

<script>
	import Table from '@/views/summary/components/table'
	import { getAjax, postAjaxJson, postAjaxx } from '@/utils/ajaxRequest'
	import Pagination from '@/components/Pagination'
	import { parseTime } from "@/utils"
	export default {
		components: {
			Pagination,
			Table
		},
		data() {
			return {
				rules: {
					userId: [{
						required: true,
						message: '请选择下一步审核人',
						trigger: 'blur'
					}]
				},
				formName:"",
				attachVisible: false,
				attachActive: 0,
				attachArr: [],
				userArr: [],
				temp: {
					userId: "",
				},
				stepActive: 0,
				findAllPlanApplyList: [],
				planInp: "",
				multipleSelection: [],
				multipleSelection1: [],
				multipleSelection2: [],
				multipleSelection3: [],
				total: 0,
				listQuery: {
					page: 1,
					limit: 10
				},
				assigneeExpressionText: "",
				departId: "",
				name: "",
				planForm: {},
				planBudget: {},
				projectList: [],
				planMoney: 0,
				userane: "",
				orgName: "",
				applyDate: "",
				// formName:'',
				input1: '', //选择计划搜索框
				active: "0", //步骤条
				dynamicValidateForm: {
					usename: '', //汇总单名称
				},
				endTable: [],
				showModal: false, //流程图
				activeName: '1', //标签切换页
				activeName1: "1",
				zxfcommodity: false, //选择计划查看弹框
				dialogTableVisible: false, //查看商品
				zxfbjsp: false, //计划汇总编辑商品弹框
				zxfcksptk: false, //预览查看商品弹框
				tableDatas: [], //计划名称表格
				tableDatass: [], //查看表格
				sptable: [], //查看商品表格
				optionss: [ //计划汇总单编辑商品选择下拉
					{
						typevalue: '物资'
					},
					{
						typevalue: '设备'
					},
					{
						typevalue: '工程'
					}
				],
				typevalue: '物资', //默认商品选择下拉
				editableTabsValue: '1',
				editableTabs: [], //动态标签页
				editableTabsBack: [],
				tableDatasss: [], //计划汇总编辑商品弹框表格
				selectlistRow: [], //编辑商品存放表格数据
				zxfsearch: '', //计划汇总模糊搜索
				zxfcksp: [], //预览步骤查看商品
				spanArr: [],
				pos: 0,
				updateGoodsObj: {},
			}
		},
		watch: {
			findAllPlanApplyList(oldVal, newVal) { // 监听数据变化，然后执行分页记忆自动选中回调
				this.$nextTick(() => {
					this.selectMemoriedDataFn()
				})
			}
		},
		methods: {
			viewAttach(row) {
				this.attachVisible = true;
				getAjax(`/api/planmanagementService/technologyPlanReport/getPlanReportAnnexfileInfo?mainTableId=${row.id}`).then(res => {
					this.attachArr = res.data;
					this.attachActive = res.data[0].id;
				});
			},
			getUserId(value) {
				_.forEach(this.userArr, val => {
					if(this.temp.userId == val.id) {
						this.assigneeExpressionText = val.assigneeExpressionText;
						this.departId = val.departId;
						this.name = val.name;
					}
				});
			},
			selectMemoriedDataFn() {
				let currentArr = this.multipleSelection1[this.listQuery.page - 1] // 当前分页对应被选中数据
				if(currentArr && currentArr.length) { // 存在则继续执行
					let tempRowsIDs = this.findAllPlanApplyList.map(L => L.id) // 当前分页被选中数据的id集合
					currentArr.forEach((item, index) => { // 遍历当前分页被选中数据
						if(tempRowsIDs.includes(item.id)) { // id匹配上，则选中
							this.$refs.findAllPlanApplyList.toggleRowSelection(this.findAllPlanApplyList[tempRowsIDs.indexOf(item.id)])
						}
					})
				}
			},
			selectMemoryFn(val, row) { // 设置分页记忆二位数组方法
				let currentArr = this.multipleSelection1[this.listQuery.page - 1] // 当前分页对应数组
				if(!currentArr) {
					this.multipleSelection1[this.listQuery.page - 1] = val // 不存在这个二维数组，则创建这个二位数组
				} else { // 存在
					if(val.includes(row)) { // 选中
						this.multipleSelection1[this.listQuery.page - 1] = val
					} else { // 取消
						delete currentArr[currentArr.indexOf(row)]
					}
				}
			},
			selectAll(selection) { // 全选切换方法
				if(selection.length) { // 全选
					this.multipleSelection1[this.listQuery.page - 1] = selection
					this.multipleSelection = selection;
					this.choiceMultiple = selection;
				} else { // 全不选
					this.multipleSelection1[this.listQuery.page - 1] = []
				}
			},
			handleSelectionChange(val) {
				this.$nextTick(() => {
					this.multipleSelection = [];
					_.forEach(this.multipleSelection1, value => {
						_.forEach(value, val => {
							this.multipleSelection.push(val);
						});
					});
				})
			},
			handleSelectionChange1(val) {
				this.multipleSelection2[this.activeName] = val;
				this.multipleSelection3 = [];
				_.forEach(this.editableTabs, value => {
					_.forEach(this.multipleSelection2[value.orgName], (v, key) => {
						this.multipleSelection3.push(v);
					});
				});
			},

			planList() {
				var param = {
					pageNumber: this.listQuery.page - 1,
					pageSize: this.listQuery.limit,
					title: this.planInp,
					formId: this.$route.query.id,
				};
				getAjax("/api/planmanagementService/annualSpecialFundPlan/findAllPlanApplyList", param).then(data => {
					if(data.code == 0) {
						this.findAllPlanApplyList = data.data.content;
						this.total = data.data.totalElements;
					}
				});
			},
			viewPlan(row) {
				this.zxfcommodity = true;
				var param = {
					planBudgetId: row.id
				}
				getAjax("/api/planmanagementService/annualSpecialFundPlan/findPlanDetailsByPlanBudgetId", param).then(data => {
					if(data.code == 0) {
						this.planBudget = data.data.planBudget;
						this.projectList = data.data.projectList;
					}
				});
			},
			viewGoods(row) {
				this.dialogTableVisible = true;
				var param = {
					projectId: row.id
				}
				getAjax("/api/planmanagementService/annualSpecialFundPlan/findProjectGoodsByProjectId", param).then(data => {
					if(data.code == 0) {
						this.sptable = data.data;
					}
				});
			},
			getSpanArr(data) {
				this.spanArr = [];　
				for(var i = 0; i < data.length; i++) {    
					if(i === 0) {        
						this.spanArr.push(1);        
						this.pos = 0    
					} else {     // 判断当前元素与上一个元素是否相同
						if(data[i].projectType === data[i - 1].projectType) {        
							this.spanArr[this.pos] += 1;        
							this.spanArr.push(0);        
						} else {        
							this.spanArr.push(1);        
							this.pos = i;        
						}    
					} 
				}
			},
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {    
				if(columnIndex == 1) {       
					const _row = this.spanArr[rowIndex];        
					const _col = _row > 0 ? 1 : 0;      
					return {            
						rowspan: _row,
						 colspan: _col        
					}    
				}
			},
			handleClick(tab, event) {

			},
			endViewGoods(row) {
				this.zxfcksptk = true;
				this.zxfcksp = row.goodsList;
			},
			//取消
			states() {
				this.$router.push("/home/index")
			},
			//计划汇总步骤下一步
			next() {
				this.active = '1';
				this.stepActive = 1;
				var param = {
					planBudgetIds: String(this.multipleSelection.map(val => {
						return val.id
					}))
				}
				getAjax("/api/planmanagementService/annualSpecialFundPlan/findDetailsByPlanBudgetIds", param).then(data => {
					if(data.code == 0) {
						this.editableTabs = [];
						_.forEach(data.data, value => {
							//							this.editableTabs = this.editableTabs.concat(value.planBudgetProjectList);
							_.forEach(value.planBudgetProjectList, val => {
								this.editableTabs.push({
									"approval": val.approval,
									"beforeId": "",
									"budgetId": val.budget_id,
									"chargePerson": val.chargePerson,
									"createDate":  val.createDate,
									"createUser": val.createUser,
									"createUserName": "",
									"deleteDate": "",
									"deleteUser": "",
									"endDate": val.endDate,
									"fundsType": val.fundsType,
									"id":  val.id,
									"isCollect": "",
									"isImplemente": "",
									"planMonth": "",
									"planYear": "",
									"projectDesc": val.projectDesc,
									"projectGrade": val.projectGrade,
									"projectMoney": val.projectMoney,
									"projectName": val.projectName,
									"projectNumber":  val.projectNumber,
									"projectType": val.projectType,
									"remark": "",
									"startDate":  val.startDate,
									"updateDate": val.updateDate,
									"updateUser": "",
									"useable":""
								});
							});
						});
						this.planMoney = 0;
						_.forEach(this.editableTabs, val => {
							val.createUser = val.createUser ? val.createUser : sessionStorage.userId;
							this.planMoney += Number(val.projectMoney);
						});
						this.editableTabsBack = this.editableTabs;

					}
				});
			},
			getEditAbles() {
				if(this.zxfsearch) {
					this.editableTabs = this.editableTabsBack.filter(data => !this.zxfsearch || data.projectName.toLowerCase().includes(this.zxfsearch.toLowerCase()));

				} else {
					this.editableTabs = this.editableTabsBack;
				}

			},
			updateGoods(row) {
				this.updateGoodsObj = row;
				this.zxfbjsp = true;
				this.getGoodsList();
			},
			getGoodsList() {
				var param = {
					projectId: this.updateGoodsObj.id
				}
				getAjax("/api/planmanagementService/annualSpecialFundPlan/findProjectGoodsByProjectId", param).then(data => {
					if(data.code == 0) {
						this.tableDatasss = data.data.filter(data => !this.zxfsearch || data.goodsClass.toLowerCase().includes(this.zxfsearch.toLowerCase()));
					}
				});
			},
			save() {
				_.forEach(this.tableDatasss, val => {
					val.budgetProjectId = this.updateGoodsObj.id;
				});
				this.updateGoodsObj.goodsList = this.tableDatasss;
				this.zxfbjsp = false;
			},
			nexts() {
				this.$refs['dynamicValidateForm'].validate((valid) => {
					if(valid) {
						this.active = '2';
						this.stepActive = 2;
						this.planMoney = 0;
						_.forEach(this.selectlistRow, val => {
							this.planMoney += Number(val.projectMoney);
						});
					}
				});
			},
			getProjectMoney(row) {
				this.planMoney = 0;
				_.forEach(this.selectlistRow, val => {
					this.planMoney += Number(val.projectMoney);
				});
			},
			//计划汇总步骤上一步
			last() {
				this.active = '0';
				this.stepActive = 0;
			},
			//预览步骤上一步
			yulan() {
				this.active = '1';
				this.stepActive = 1;
			},
			submit(m) {
				var param = {
                  	"planApply": {
                  		"applyDate": parseTime(new Date(), "{y}-{m}-{d}"),
                  		"applyRecord": "",
                  		"applyState": "",
                  		"applyType": "",
                  		"applyUsername": sessionStorage.userName,
                  		"applyresult": "",
                  		"createDate": "",
                  		"createUser": sessionStorage.userId,
                  		"createUserName": sessionStorage.userName,
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
                  		"title": this.dynamicValidateForm.usename,
                  		"updateDate": "",
                  		"updateUser": "",
                  		"useable": ""
                  	},
                  	"planBudgetProjectList": this.selectlistRow,
                  	"startWorkflowParameterVo": {
                  		assigneeExpressionText: this.assigneeExpressionText,
                  		businessForm: "/cashplanF",
                  		departId: this.departId,
                  		deploymentKey: "ndkjzjxmhz",
                  		id: this.temp.userId,
                  		name: this.name,
                  		processName: "年度科技资金项目汇总",
                  		userId: sessionStorage.userId
                  	},
                  	"submitType": m,
				}
				postAjaxJson("/api/planmanagementService/technologyPlan/summaryTechnologyPlan", param).then(res => {
					if(res.code == 0) {
						this.$message("成功");
						this.$router.push("/home/index");
					} else {
						this.$message(res.message);
					}
				});
			},
			// 获取表格选中时的数据
			selectRows(val) {
				this.selectlistRow = val;
			},
			// 添加商品增加行
			addRow() {
				this.tableDatasss.push({
					id: "",
					useable: "",
					goodsCode: "",
					goodsType: "",
					factoryName: "",
					goodsNumber: null,
					goodsModel: null,
					budgetProject_id: "",
					budgetProjectId: null,
					goodsName: "",
					technologyDesc: "",
					goodsTotal: null,
					remarks: "",
					endDate: "",
					startDate: "",
					goodsPrice: null,
					goodsClass: "",
					goodsunit: "",
				})
			},
			addRows() {
				_.forEach(this.selectlistRow, val => {
					this.tableDatasss.push(val);
				});
			},
			// 删除商品增加行
			delData() {
				_.forEach(this.selectlistRow, val => {
					this.editableTabs = _.without(this.editableTabs, val);
				});
				// 删除完数据之后清除勾选框
				this.$refs.table.clearSelection()
			},
			delAll() {
				this.editableTabs = [];
			},
		},

		created() {
			postAjaxJson(`/api/process-service/userTask/getFirstExaminePerson/ndkjzjxmhz`).then(res => {
				if(res.code == 0) {
					this.userArr = res.data;
				}
			});
			this.userane = sessionStorage.userName;
			this.orgName = sessionStorage.orgName;
			this.formName=this.$route.query.formName;
			this.applyDate = parseTime(new Date(), "{y}-{m}-{d}");
			this.planList();
		},
	}
</script>
<style scoped>
	.summaryTitle {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #eee;
		text-indent: 30px;
		margin-bottom: 20px;
	}

	.route {
		margin-top: 60px;
		height: 50px;
		line-height: 50px;
		background-color: rgb(216, 216, 216);
		padding: 0 20px;
		cursor: pointer;
	}

	.route>span {
		font-size: 13px;
	}

	.content {
		width: 100%;
		margin: 10px auto;
		background-color: #fff;
		min-height: 600px;
		padding: 20px;
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

	.pop {
		background-color: #fff;
		position: fixed;
		top: 100px;
		left: 300px;
		width: calc(100% - 600px);
		height: calc(100% - 200px);
		z-index: 2
	}

	.Merchandise {
		background-color: #fff;
		position: fixed;
		top: 100px;
		width: 100%;
		min-height: 300px;
		z-index: 2
	}

	.Merchandises {
		display: flex;
		justify-content: space-between;
		padding: 10px 10px;
	}

	.zxfaggregate {
		margin-top: 20px;
		font-size: 14px;
	}
	/* 提交审核 */

	.bottom {
		display: flex;
		justify-content: flex-end;
	}

	.preserve {
		margin-top: 2%;
		display: flex;
		justify-content: center;
	}

	.content>h3 {
		text-align: center;
		margin: 30px 0;
		color: #505050;
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
</style>
