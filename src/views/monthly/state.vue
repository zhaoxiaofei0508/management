<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/forme' }">选择计划</el-breadcrumb-item>
			<el-breadcrumb-item>{{formName}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content">
			<div style="padding:0 15%;">
				<el-steps :active="active" align-center>
					<el-step title="选择计划"></el-step>
					<el-step title="计划汇总"></el-step>
					<el-step title="商品立库"></el-step>
					<el-step title="预览"></el-step>
				</el-steps>
			</div>
			<div>
				<div class="ztable">
					<el-tabs v-model="activeStr" style="">
						<el-tab-pane name="0">
							<el-input placeholder="请输入计划名称" prefix-icon="el-icon-search" v-model.lazy="planInp" @blur="planList" style="width:20%; padding:10px 0">
							</el-input>
							<div>
								<el-table :data="findAllPlanApplyList" ref="findAllPlanApplyList" @select="selectMemoryFn" @select-all="selectAll" @selection-change="handleSelectionChange" tooltip-effect="dark" border stripe style="width: 100%">
									<el-table-column type="selection" width="50" align="center"></el-table-column>
									<el-table-column label="计划名称" prop="title"/>
									<el-table-column label="提报人" prop="applyUsername" />
									<el-table-column label="提报部门" prop="orgName" />
									<el-table-column label="提报时间" prop="applyDate" />
									<el-table-column label="操作">
										<template slot-scope="scope">
											<el-button type="text" size="small" @click="viewPlan(scope.row)">查看</el-button>
										</template>
									</el-table-column>
								</el-table>
								<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="planList" />
							</div>
							<div class="bottom" style="margin-top:30px;">
								<el-button @click="cancel">取消</el-button>
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
								<!--</el-form>-->
								<p style="height: 35px;line-height: 35px;padding: 0 16px;">项目信息</p>
								<!--<div>-->
								<el-table :data="editableTabs" style="font-size: 10px">
									<el-table-column width="45" prop="goodsClass" align="center" label="分类" />
									<el-table-column prop="goodsCode" label="编码" width="60" />
									<el-table-column prop="goodsName" label="商品/服务名称" />
									<el-table-column prop="goodsModel" label="规则型号/描述" />
									<el-table-column property="goodsunit" label="单位" width="50" align="center">
										<template slot-scope="scope">
											<el-input v-model="scope.row.goodsunit" class='inputss'></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="goodsNumber" label="提报数量" />
									<el-table-column prop="purchaseNumber" label="采购数量" />
									<el-table-column prop="stockNumber" label="库存数量" />
									<el-table-column prop="goodsPrice" label="预估单价" width="60" />
									<el-table-column prop="goodsTotal" label="预估总价" width="60" />
									<el-table-column property="goodsType" label="类型" align="center" width="100">
										<template slot-scope="scope">
											<el-select v-model="scope.row.goodsType">
												<el-option v-for="item in optionss" :key="item.typevalue" :label="item.typevalue" :value="item.typevalue">
												</el-option>
											</el-select>
										</template>
									</el-table-column>
									<el-table-column prop="startDate" label="计划实施时间" />
									<el-table-column prop="endDate" label="计划交付时间" />
									<el-table-column prop="" label="提报单位" />
									<el-table-column property="address" label="是否自购" align="center" width="80">
										<template slot-scope="scope">
											<el-select v-model="scope.row.typevalue">
												<el-option v-for="item in boolArr" :key="item.label" :label="item.label" :value="item.label">
												</el-option>
											</el-select>
										</template>
									</el-table-column>
									<el-table-column prop="factoryName" label="主机厂家" />
									<el-table-column prop="technologyDesc" label="技术要求" />
									<el-table-column prop="remarks" label="备注" width="50" />
									<el-table-column label="操作" align="center" width="100">
										<template slot-scope="scope">
											<el-button v-if="scope.$index!=0" type="text" @click="orderByNumber(scope.$index,0)">
												上移
											</el-button>
											<el-button v-if="scope.$index!=editableTabs.length-1" type="text" @click="orderByNumber(scope.$index,1)">
												下移
											</el-button>
										</template>
									</el-table-column>
								</el-table>

								<el-form-item prop="remark" label="备注" style="margin-top:20px;">
									<el-input v-model="dynamicValidateForm.remark" style="width:30%"></el-input>
								</el-form-item>
							</el-form>
							<div class="bottom" style="margin-top:30px;">
								<el-button @click="last">上一步</el-button>
								<el-button type="primary" @click="nexts">下一步</el-button>
							</div>
						</el-tab-pane>
						<el-tab-pane name="2">
							<div class="essential_top">
								<el-table :data="editableTabs" ref="tableDatas" tooltip-effect="dark" border stripe style="fontSize:12px">
									<el-table-column type="index" width="45" align="center" label="序号" />
									<el-table-column prop="goodsCode" label="商品编码" width="80" />
									<el-table-column label="商品名称" width="80" prop="goodsName" />
									<el-table-column label="规格型号" prop="goodsModel" />
									<el-table-column label="计量单位" prop="goodsunit" width="60" />
									<el-table-column label="单价" prop="goodsPrice" />
									<el-table-column prop="goodsNumber" label="计划需求数量" />
									<el-table-column label="未锁定数量">
										<template slot-scope="scope">
											<span @click="quantitys(scope.row)" class="wsdsl">{{scope.row.nolockStoreNumber}}</span>
										</template>
									</el-table-column>
									<el-table-column label="已锁定数量">
										<template slot-scope="scope">
											<span @click="Loquantity(scope.row)" class="wsdsl">{{scope.row.lockStoreNumber}}</span>
										</template>
									</el-table-column>
									<el-table-column label="未锁定立库数量" prop="nolockNumber" />
									<el-table-column label="已锁定立库数量" width="90">
										<template slot-scope="scope">
											<el-input v-model="scope.row.goodslksl" class='inputss'></el-input>
										</template>
									</el-table-column>
									<el-table-column label="采购数量" width="90" prop="purchaseNumber" />
									<el-table-column label="期货数量" width="60" prop="" />
									<el-table-column label="验收未入库数量" prop="" />
									<el-table-column label="安全库存" prop="" />
									<el-table-column label="年消耗数量" prop="" />

								</el-table>
							</div>
							<div class="bottom" style="margin-top:30px;">
								<el-button @click="splksyb">上一步</el-button>
								<el-button type="primary" @click="splk">下一步</el-button>
							</div>

						</el-tab-pane>
						<el-tab-pane name="3">
							<div class="content">
								<h3>2020年度大修计划</h3>
								<div class="essential_top">
									<p>基本信息</p>
									<ul>
										<li>申请人:<span class="usname">{{userane}}</span><i class="iconfont icon-user-3"></i></li>
										<li>申请部门:<span class="usname">{{orgName}}</span><i class="iconfont icon-bumen"></i></li>
										<li>资金类别:<span>安全/大修/折旧</span></li>
										<li>申请时间:<span>{{applyDate}}</span></li>
									</ul>
								</div>

								<div class="essential_top">
									<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
										<p style="margin-bottom: 26px;">项目信息</p>
										<!--<div>
											<label>标题</label>
											<el-form-item label="审核结果" prop="titleStr">
												<el-input v-model="titleStr" style="display: inline-block;width: 30%;borderRight:none;" placeholder="请输入标题" prefix-icon="el-icon-search"></el-input>
											</el-form-item>
										</div>-->
										<el-table :data="editableTabs" ref="tableDatas" tooltip-effect="dark" border stripe style="fontSize:12px">
											<el-table-column width="45" prop="goodsClass" align="center" label="分类" />
											<el-table-column prop="goodsCode" label="编码" width="60" />
											<el-table-column prop="goodsName" label="商品/服务名称" />
											<el-table-column prop="goodsModel" label="规则型号/描述" />
											<el-table-column prop="goodsunit" label="单位" width="60" />
											<el-table-column prop="goodsNumber" label="提报数量" />
											<el-table-column prop="purchaseNumber" label="采购数量" />
											<el-table-column prop="stockNumber" label="库存数量" />
											<el-table-column prop="goodsPrice" label="预估单价" width="60" />
											<el-table-column prop="goodsTotal" label="预估总价" width="60" />
											<el-table-column prop="goodsType" label="类型" width="60" />
											<el-table-column prop="startDate" label="计划实施时间" />
											<el-table-column prop="endDate" label="计划交付时间" />
											<el-table-column prop="orgName" label="提报单位" />
											<el-table-column prop="selfPurchase" label="是否自购">
												<template slot-scope="scope">
													{{scope.row.selfPurchase==0?"不自购":scope.row.selfPurchase==0?"自购":scope.row.selfPurchase}}
												</template>
											</el-table-column>
											<el-table-column prop="factoryName" label="主机厂家" />
											<el-table-column prop="technologyDesc" label="技术要求" />
											<el-table-column prop="remarks" label="备注" width="50" />
										</el-table>

										<el-form-item label="备注">
											{{dynamicValidateForm.remark}}
										</el-form-item>
										<el-form-item label="选择审核人" prop="userId">
											<el-select style="width:40%;" @change="getUserId" filterable v-model="ruleForm.userId" placeholder="请选择审核人">
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
		<el-dialog title="查看" :visible.sync="zxfcommodity" width="95%">
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
		<!-- 资金汇总单编辑商品弹框 -->
		<el-dialog title="商品明细" :visible.sync="zxfbjsp" width="100%">
			<div class="operating" style="padding:0 30px;">
				<el-button size="small" type="primary" plain @click.prevent="addRow()">增加行</el-button>
				<el-button size="small" type="primary" plain>复制行</el-button>
				<el-button size="small" type="primary" plain @click.prevent="delData()">删除行</el-button>
				<el-button size="small" type="primary" plain>导入数据</el-button>
				<el-button size="small" type="primary" plain>全部删除</el-button>
				<el-input v-model="zxfsearch" style="display: inline-block;width: 30%;borderRight:none;margin-left: 33%;" placeholder="请输入搜索内容" prefix-icon="el-icon-search">
				</el-input>
			</div>
			<div class="ztable" style="margin-top: 2%;">
				<el-table :data="tablebjsp" ref="table" tooltip-effect="dark" border stripe style="width: 100%" @selection-change='selectRows'>
					<el-table-column type="selection" width="45" align="center"></el-table-column>
					<el-table-column label="分类" width="80" align="center">
						<template slot-scope="scope">
							<el-input v-model="scope.row.coding" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="编码" align="center" width="80">
						<template slot-scope="scope">
							<el-input v-model="scope.row.encoding" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="商品/服务名称" width="120" class="zxfsh">
						<template slot-scope="scope">
							<el-input v-model="scope.row.goodsName" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="规则型号/描述" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.describe" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="单位" width="60">
						<template slot-scope="scope">
							<el-input v-model="scope.row.monad" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="数量" width="60">
						<template slot-scope="scope">
							<el-input v-model="scope.row.quantity" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="预估单价">
						<template slot-scope="scope">
							<el-input v-model="scope.row.estimate" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="预估总价">
						<template slot-scope="scope">
							<el-input v-model="scope.row.prices" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="类型" width="100">
						<template slot-scope="scope">
							<el-select v-model="scope.row.typevalue">
								<el-option v-for="item in optionss" :key="item.value" :label="item.label" :value="item.typevalue">
								</el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="计划实施时间" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.implementation" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="计划交付时间" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.delivery" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="主机厂家">
						<template slot-scope="scope">
							<el-input v-model="scope.row.manufacturers" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="技术要求">
						<template slot-scope="scope">
							<el-input v-model="scope.row.requirements" class='inputss'></el-input>
						</template>
					</el-table-column>
					<el-table-column label="备注">
						<template slot-scope="scope">
							<el-input v-model="scope.row.remark" class='inputss'></el-input>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="preserve ">
				<el-button plain @click="zxfbjsp=false">取消</el-button>
				<el-button type="primary" plain @click="save()">确定</el-button>
			</div>
		</el-dialog>
		<!-- 商品立库的未锁定数量弹框 -->
		<el-dialog title="未锁定数量" :visible.sync="UnlockedQuantity" width='60%'>
			<el-table :data="unlocked" border lazy>
				<el-table-column type="index" label="序号">

				</el-table-column>
				<el-table-column label="采购数量" width="90">
					<template slot-scope="scope">
						<el-input v-model="scope.row.goodslksl" class='inputss'></el-input>
					</template>
				</el-table-column>
				<el-table-column label="期货数量" width="60">
				</el-table-column>
				<el-table-column label="验收未入库数量">
				</el-table-column>
				<el-table-column label="安全库存">
				</el-table-column>
				<el-table-column label="年消耗数量">
				</el-table-column>
			</el-table>
			<div style="margin-top: 50px;display: flex;justify-content:center">
				<el-button size="small" @click="UnlockedQuantity=false">取消</el-button>
				<el-button size="small" type="primary" @click="NotConfirm">确定</el-button>
			</div>
		</el-dialog>
		<!-- 商品立库的已锁定数量弹框 -->
		<el-dialog title="已锁定数量" :visible.sync="LockedQuantity" width='60%'>
			<el-table :data="unlockedStop" border lazy>
				<el-table-column property="date" label="序号">

				</el-table-column>
				<el-table-column property="projectName" label="项目名称">

				</el-table-column>
				<el-table-column property="quantity" label="数量">

				</el-table-column>
				<el-table-column property="warehouse" label="仓库">

				</el-table-column>
				<el-table-column property="shelf " label="货架">

				</el-table-column>
				<el-table-column property="allocation" label="货位">

				</el-table-column>
				<el-table-column property="substation" label="箱号">

				</el-table-column>
				<el-table-column label="立库数量">
					<template slot-scope="scope">
						<el-input v-model="scope.row.StateQuantity" class='inputss'></el-input>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 50px;display: flex;justify-content:center">
				<el-button size="small" @click="LockedQuantity=false">取消</el-button>
				<el-button size="small" type="primary">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { parseTime } from "@/utils"
	import { getAjaxA,getAjax, postAjax, postAjaxJson, postAjaxx } from '@/utils/ajaxRequest'
	import Table from '@/views/summary/components/table'
	import Pagination from '@/components/Pagination'
	export default {
		components: {
			Pagination,
			Table
		},
		data() {
			return {
				findAllPlanApplyList: [],
				multipleSelection: [],
				multipleSelection1: [],
				multipleSelection2: [],
				multipleSelection3: [],
				planBudget: {},
				projectList: [],
				planInp: "",
				total: 0,
				listQuery: {
					page: 1,
					limit: 10
				},
				boolArr: [{
						label: "不自购",
						value: "0"
					},
					{
						label: "自购",
						value: "1"
					},
				],
				userane: '', //当前申请人
				input1: '', //选择计划搜索框
				active: 0, //步骤条
				dynamicValidateForm: {
					usename: '', //汇总单名称
				},
				userane: "",
				orgName: "",
				applyDate: "",
				showModal: false, //流程图
				activeName: '1', //标签切换页
				zxfcommodity: false, //选择计划查看弹框
				dialogTableVisible: false, //查看商品
				zxfbjsp: false, //计划汇总编辑商品弹框
				zxfcksptk: false, //预览查看商品弹框
				zxftypevalue: '', //是否核制
				jihuahuizong: '', //计划汇总备注input
				goodslksl: '', //计划汇总已锁定立库数量
				UnlockedQuantity: false, //商品立库未锁定数量弹框
				LockedQuantity: false, //商品立库已锁定数量弹框
				xztableData: [], //选择计划表格
				yltableData: [], //预览表格
				tableDatas: [], //计划名称表格
				tableDatass: [], //查看表格
				sptable: [], //查看商品表格
				optionss: [ //资金汇总单编辑商品选择下拉
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
				options: [ //是否核准制下拉框
					{
						zxftypevalue: "是"
					},
					{
						zxftypevalue: "否"
					}
				],
				typevalue: '物资', //默认商品选择下拉
				editableTabsValue: '1',
				editableTabs: [], //动态标签页

				tablebjsp: [],//资金汇总编辑商品弹框表格
				selectlistRow: [], //编辑商品存放表格数据
				zxfsearch: '', //计划汇总模糊搜索
				zxfcksp: [], //资金预览步骤查看商品
				rules: {
					titleStr: [{
						required: true,
						message: '请输入标题',
						trigger: 'change'
					}],
					userId: [{
						required: true,
						message: '请选择审核人',
						trigger: 'change'
					}],

				},
				// 未锁定数量弹框表格数据
				unlocked: [{
					quantity: '2',
					warehouse: '1号仓库',
					shelf: '1号货架',
					allocation: '1号货位',
					substation: '1号箱',
					StateQuantity: '' //立库数量
				}],
				unlockeds: {},
				// 已锁定数量弹框表格数据
				unlockedStop: [{

				}],
				titleStr: '',
				activeStr: '',
				assigneeExpressionText: "",
				userArr: [],
				ruleForm: {
					title: "",
					userId: "",
					searchValue: ""
				},
				name: "",

			}
		},
		created() {
			this.formName = this.$route.query.formName;
			this.userane = sessionStorage.userName;
			this.orgName = sessionStorage.orgName;
			this.applyDate=parseTime(new Date(),"{y}-{m}-{d} {h}:{i}:{s}");
			postAjaxJson(`/api/processService/userTask/getFirstExaminePerson/ydscwzhzjh`).then(res => {
				if(res.code == 0) {
					this.userArr = res.data;
				}
			});
			this.planList();
		},
		watch: {
			findAllPlanApplyList(oldVal, newVal) { // 监听数据变化，然后执行分页记忆自动选中回调
				this.$nextTick(() => {
					this.selectMemoriedDataFn()
				})
			}
		},
		methods: {
			//预览步骤上一步
			yulan() {
				this.active = 2;
				this.activeStr = '2';
			},
			//项目排序
			orderByNumber(index, m) {
				var num;
				if(m == 0) {
					num = this.editableTabs[index - 1].orderNumber;
					this.editableTabs[index - 1].orderNumber = this.editableTabs[index].orderNumber;
				} else {
					num = this.editableTabs[index + 1].orderNumber;
					this.editableTabs[index + 1].orderNumber = this.editableTabs[index].orderNumber;
				}

				this.editableTabs[index].orderNumber = num;
				this.editableTabs = _.sortBy(this.editableTabs, "orderNumber");
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
			//取消
			cancel() {
				this.$router.push("/home/index")
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
			planList() {
				var param = {
					pageNumber: this.listQuery.page - 1,
					pageSize: this.listQuery.limit,
					title: this.planInp,
					formId:this.$route.query.id,
				};
				console.log(param)
				getAjax("/api/planmanagementService/lowValueMonthCon/findImplementData", param).then(data => {
					console.log(data)
					if(data.code == 0) {
						this.findAllPlanApplyList = data.data.content;
            			// console.info(JSON.stringify(this.findAllPlanApplyList))
						this.total = data.data.totalElements;
					}
				});
			},
			viewPlan(row) {
				this.zxfcommodity = true;
				var param = {
					applyId: row.id
				}
				getAjax("/api/planmanagementService/PlanImplementproject/monthPlan/{applyId}", param).then(data => {
					if(data.code == 0) {
						this.planBudget = data.data.planApply ? data.data.planApply : {};
						this.projectList = data.data.planImplementprojectList ? data.data.planImplementprojectList : [];
					}
				});
			},
			viewGoods(row) {
				this.dialogTableVisible = true;
				var param = {
					PlanImplementprojectById: row.id
				}
				getAjax("/api/planmanagementService/PlanImplementproject/{month}/{PlanImplementprojectById}", param).then(data => {
					if(data.code == 0) {
						this.sptable = data.data;
					}
				});
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

			handleClick(tab, event) {
				// console.log(tab, event);
			},
			//商品立库未锁定数量弹框
			quantitys(row) {
				this.UnlockedQuantity = true
			},
			//商品立库已锁定数量弹框
			Loquantity(row) {
				this.LockedQuantity = true
			},
			//未锁定数量确定保存数据
			NotConfirm() {
				this.UnlockedQuantity = false
				this.unlockeds = this.unlocked
			},
			//提交审核
			submit(isType) {
				var param = {
					"planApply": {
						"applyDate": parseTime(new Date(), "{y}-{m}-{d}"),
						"applyRecord": "",
						"applyState": isType,
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
						"title": this.titleStr,
						"updateDate": "",
						"updateUser": "",
						"useable": "1"
					},
					"planCollect": {
						"applyDate": "",
						"applyId": "",
						"belongMonth": "",
						"belongYear": "",
						"collectType": "1",
						"createDate":  parseTime(new Date(), "{y}-{m}-{d}"),
						"createUser": sessionStorage.userId,
						"deleteDate": "",
						"deleteUser": "",
						"endDate": "",
						"formClass": "1",
						"formId": "1",
						"handleDate": "1",
						"handleOrgId": "1",
						"handleOrgName": "",
						"handleOrgType": "",
						"orgId": sessionStorage.orgId,
						"orgName": sessionStorage.orgName,
						"orgType": sessionStorage.orgType,
						"planDesc": "1",
						"planType": "1",
						"remarks": "1",
						"replyId": "1",
						"sendDate": "1",
						"sendUserid": "1",
						"sendUsername": "1",
						"startData": "1",
						"summaryName": "",
						"title": this.titleStr,
						"updateDate": "",
						"updateUser": "",
						"useable": ""
					},
					"planCollectGoodsList":this.editableTabs ,
					"planGoodssourceList": [{
						"goodsId": "",
						"goodsMark": "",
						"lockMark": "锁定",
						"remark": "333",
						"sourceOrder": "3",
						"stockBoxCode": "3",
						"stockGoodsCode": "3",
						"stockGoodsId": "3",
						"stockLocationCode": "3",
						"stockNumber": 0,
						"stockProject": "3",
						"stockShelvesCode": "3",
						"stockcode": "3",
						"useGoodsNumber": "",
						"useable": "1"
					}],
					"planImplementList": [{
						"applyDate": "",
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
						"formId": "",
						"fundsType": "",
						"handleDate": "",
						"handleOrgId": "",
						"handleOrgName": "",
						"handleOrgType": "",
						"orgId": "",
						"orgName": "",
						"orgType": "",
						"planDesc": "",
						"planType": "",
						"remarks": "",
						"startData": "",
						"title": this.titleStr,
						"useable": "1"
					}],
					"startWorkflowParameterVo": {
						"assigneeExpressionText": this.assigneeExpressionText,
						"departId": this.departId,
						"deploymentKey": "ydscwzhzjh",
						"id": this.ruleForm.userId,
						"name": this.name,
						"userId": sessionStorage.userId
					},
					"submitType": isType
				}
				postAjaxx("/api/planmanagementService/planMonthly/monthCollectStartFlow", JSON.stringify(param)).then(res => {
					if(res.code == 0) {
						this.$message("成功");
						this.$router.push({
							path: "/home/index"
						});
					} else {
						this.$message(res.message);
					}
				});

			},
			//计划汇总步骤下一步
			next() {
				this.active = 1;
				this.activeStr = "1";
				var param = {
					applyGoodsIds: String(this.multipleSelection.map(val => {
						return val.id
					}))
				}
				getAjax("/api/planmanagementService/goods/applyGoodsIds", param).then(data => {
					if(data.code == 0) {
						_.forEach(data.data, (val, key) => {
							val.orderNumber = key + 1;
						});
						this.editableTabs = data.data;
						this.editableTabs = _.sortBy(this.editableTabs, "orderNumber");
					}
				});
			},

			//计划汇总步骤上一步
			last() {
				this.active = 0;
				this.activeStr = "0";
			},
			//计划汇总下一步
			nexts() {
				this.$refs['dynamicValidateForm'].validate((valid) => {
					if(valid) {
						this.active = 2;
						this.activeStr = "2";
					}
				});
			},
			//商品立库上一步
			splksyb() {
				this.active = 1;
				this.activeStr = "1";
			},
			//商品立库下一步
			splk() {
				this.active = 3;
				this.activeStr = "3";
			},
			//预览步骤上一步
			nextyulan() {
				this.active = 2;
				this.activeStr = "2";
			},

			// 获取表格选中时的数据
			selectRows(val) {
				this.selectlistRow = val
			},
			handleClick(tab, event) {
				// console.log(tab, event);
			},
			// 添加商品增加行
			addRow() {
				var list = {
					rowNum: '',
					coding: this.coding, //编码
					name: this.name, //名称
					monad: this.monad, //单位
					quantity: this.quantity, //数量
					estimate: this.estimate, //预估单价
					prices: this.prices, //预估总价
					describe: this.describe, //描述
				}
				this.tableDatasss.unshift(list)
			},
			// 删除商品增加行
			delData() {
				for(let i = 0; i < this.selectlistRow.length; i++) {
					let val = this.selectlistRow
					// 获取选中行的索引的方法
					// 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
					// rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
					val.forEach((val, index) => {
						this.tableDatasss.forEach((v, i) => {
							if(val.rowNum === v.rowNum) {
								// i 为选中的索引
								this.tableDatasss.splice(i, 1)
							}
						})
					})
				}
				// 删除完数据之后清除勾选框
				this.$refs.tableDatasss.clearSelection()
			},
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
		width: 98%;
		/* margin: 10px auto; */
		/* background-color: antiquewhite; */
		min-height: 500px;
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

	.content {
		width: 98%;
		margin: 10px auto;
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

	.wsdsl {
		cursor: pointer;
		color: #0058ff;
	}
</style>
