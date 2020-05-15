<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/forme' }">选择计划</el-breadcrumb-item>
			<el-breadcrumb-item>{{formName}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content" style="margin-top:20px;">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
				<div class="content_top">
					<el-form-item label="标题" prop="title">
						<el-input v-model="ruleForm.title" placeholder="年度科研项目计划"></el-input>
					</el-form-item>
					<el-form-item label="流程">
						<span @click="showModal=true" class="btn">查看流程图</span>
					</el-form-item>
				</div>
				<h3 style="text-align: center;line-height:40px;">{{formName}}</h3>
				<div class="essential_top">
					<p>基本信息</p>
					<ul>
						<li>申请人:<span class="usname">{{applyusername}}</span><i class="iconfont icon-user-3"></i></li>
						<li>申请部门:<span class="usname">{{orgName}}</span><i class="iconfont icon-bumen"></i></li>
						<li>申请时间:<span>{{applyDate}}</span></li>
					</ul>
				</div>
				<div class="essential_top">
					<p>计划信息</p>
				</div>
				<div v-for="(item, index) in ProjetAeeay" :key='index'>
					<el-form-item label="类型选择" style="margin-top:20px;margin-bottom:10px;">
						<el-date-picker style="width: 230px"  v-model="item.planTime" type="year" @change="changeTime(item.planTime)" placeholder="请选择计划时间" value-format="yyyy">
						</el-date-picker>
						<el-select v-model="item.moneyType" placeholder="请选择资金类型" @change="function2(item.moneyType)">
							<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.label">
							</el-option>
						</el-select>
						<el-select v-model="item.itemClassify" placeholder="请选择项目类别" @change="function3(item.itemClassify)">
							<el-option v-for="item in options3" :key="item.dictLabel" :label="item.dictLabel" :value="item.dictLabel">
							</el-option>
						</el-select>
						<el-select v-model="item.planType" placeholder="请选择计划类型" ref="isuser" v-bind:disabled="isAble"  @change="fun1(item.planType)">
							<el-option label="计划内" value="1"></el-option>
							<el-option label="计划外" value="2"></el-option>
						</el-select>
						<el-button type="primary" v-if="index==ProjetAeeay.length-1" @click="addTypeChoice">添加类型选择</el-button>
						<el-button type="primary" v-if="index!=0" @click="deleteTypeChoice(item)">删除类型选择</el-button>
					</el-form-item>
					<el-form-item v-if="item.planType==1">
						<el-button type="primary" @click="selectProject(index)">选择项目 </el-button>
					</el-form-item>
					<div v-show="item.planType==1&&item.choiceDomain.length>0" style="display: flex;margin-top: 2%;">
						<el-table :data="item.choiceDomain" width="100%">
							<el-table-column property="projectNumber" label="项目编码" align="center"></el-table-column>
							<el-table-column property="projectType" label="项目类别" align="center"></el-table-column>
							<el-table-column property="projectName" label="项目名称" align="center"></el-table-column>
							<el-table-column property="projectMoney" label="项目预估金额" align="center"></el-table-column>
							<el-table-column property="startDate" label="开始时间" align="center"></el-table-column>
							<el-table-column property="endDate" label="结束时间" align="center"></el-table-column>
							<el-table-column property="chargePerson" label="负责人" align="center"></el-table-column>
							<el-table-column property="projectDesc" label="项目简介" align="center"></el-table-column>
							<el-table-column property="fileNum" label="附件" align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.fileNum === 0">无</span>
									<span v-else></span>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="80">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="compile(scope.row.id)">编辑商品</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div>
						<div v-if="item.planType==2" class="information" v-for="(item1, index1) in item.domain" :key="index">
							<p>
								项目:{{ index + 1 }}
								<el-button v-if="index1!=0" @click="removes(item,item1)" type="text" style="float:right;">删除项目</el-button>
								<el-button v-if="index1==item.domain.length-1" @click="addRule(item,item1)" type="text" style="float:right;">添加项目</el-button>
							</p>
							<el-col :span="8">
								<el-form-item label="项目编码">
									<el-input v-model="item1.ProjectNumber" placeholder="请输入项目编码"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="项目名称">
									<el-input v-model="item1.projectName" placeholder="请输入项目名称"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="预估金额">
									<el-input v-model="item1.projectMoney" placeholder="请输入预估金额" @change="changeEvent(item1)"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="开始时间">
									<el-date-picker v-model="item1.startDate" type="date" placeholder="开始时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="结束时间">
									<el-date-picker v-model="item1.endDate" type="date" placeholder="结束时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="负责人">
									<el-input v-model="item1.chargePerson" placeholder="请输入负责人"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="项目简介" prop="projectDesc">
									<el-input v-model="item1.projectDesc"></el-input>
								</el-form-item>
							</el-col>
							<div style="clear: both;"></div>
							<div class="table">
								<span>附件</span>
								<el-table :data="item1.tableData" slot="empty" border style="width: 62%">
									<el-table-column type="index" label="序号" align='center' width='100'>
									</el-table-column>
									<el-table-column prop="fileName" label="附件名称" align='center'>
										<template slot-scope="scope">
											<el-input v-model="scope.row.fileName" placeholder="附件名称"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="city" label="上传" align='center'>
										<template slot-scope="scope">
											<div @click="getM(scope.$index,index1,index)">
												<el-upload id="autoExamUpload" ref="upload" :file-list="fileList" name="articleImage" :headers="handleHeader" :on-exceed="handleExceed" :on-success="handleSuccess" style="display: inline-block;" action="http://61.134.63.231:9090/organizationService/image/uploadImg">
													<el-input slot="trigger" :limit="1" />
												</el-upload>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="address" label="编辑" align='center'>
										<template slot-scope="scope">
											<el-button type="text" @click="editings(scope.row)">在线编辑</el-button>
										</template>
									</el-table-column>
									<el-table-column label="操作" align='center'>
										<template slot-scope="scope">
											<el-button @click.prevent="accessoryaddRow(item,item1)" type="text" size="small">增加</el-button>
											<el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, ProjetAeeay[0].domain[0].tableData)">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
							<div class="getbutton">
								<el-button type="primary" @click="Merchandise=true">添加商品</el-button>
								<el-button type="primary" @click="Merchandiseckwz = true">查看物资</el-button>
							</div>
							<!-- 添加商品遮罩内容 -->
							<el-dialog title="添加物资" :visible.sync="Merchandise" width=98%>
								<div class="operating" style="padding:0 30px;">
									<el-button size="small" type="primary" plain @click.prevent="addRow(item1)">增加行</el-button>
									<el-button size="small" type="primary" plain @click="addRows()">复制行</el-button>
									<el-button size="small" type="primary" plain @click.prevent="delData(item1)">删除行</el-button>
									<el-button size="small" type="primary" @click="importData=true" plain>导入数据</el-button>
									<el-button size="small" type="primary" plain @click="removedel(item1)">全部删除</el-button>
									<el-button plain style="margin-left: 6%" @click="Donlowerd">下载模板</el-button>
									<el-input v-model="zxfsearch" style="display: inline-block;width: 17%;borderRight:none;margin-left: 10%;" placeholder="请输入搜索内容" icon="el-icon-search">
									</el-input>
								</div>
								<div class="ztable">
									<el-table :data="item1.tableDatas" ref="tableDatas" tooltip-effect="dark" border stripe style="width: 100%" @selection-change='selectRow'>
										<el-table-column type="selection" width="45" align="center"></el-table-column>
										<el-table-column label="分类" width="80" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.goodsClass" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="编码" align="center" width="80">
											<template slot-scope="scope">
												<el-input v-model="scope.row.goodsCode" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="商品/服务名称" width="120" class="zxfsh">
											<template slot-scope="scope">
												<el-input v-model="scope.row.goodsName" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="规则型号/描述" width="120">
											<template slot-scope="scope">
												<el-input v-model="scope.row.goodsModel" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column prop="name" label="单位" width="60">
											<template slot-scope="scope">
												<el-input v-model="scope.row.goodsunit" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="数量" width="60">
											<template slot-scope="scope">
												<el-input v-model="scope.row.goodsNumber" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="预估单价">
											<template slot-scope="scope">
												<el-input v-model="scope.row.goodsPrice" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="预估总价">
											<template slot-scope="scope">
												<el-input v-model="scope.row.goodsTotal" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="类型">
											<template slot-scope="scope">
												<el-select v-model="scope.row.goodsType" placeholder="请选择">
													<el-option v-for="item in optionss" :key="item.value" :label="item.label" :value="item.typevalue">
													</el-option>
												</el-select>
											</template>
										</el-table-column>
										<el-table-column label="计划实施时间" width="200">
											<template slot-scope="scope">
												<el-date-picker v-model="scope.row.startDate" type="date" placeholder="计划交付时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
												</el-date-picker>
											</template>
										</el-table-column>
										<el-table-column label="计划交付时间" width="200">
											<template slot-scope="scope">
												<el-date-picker v-model="scope.row.endDate" type="date" placeholder="计划交付时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
												</el-date-picker>
											</template>
										</el-table-column>
										<el-table-column label="主机厂家">
											<template slot-scope="scope">
												<el-input v-model="scope.row.factoryName" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="技术要求">
											<template slot-scope="scope">
												<el-input v-model="scope.row.technologyDesc" class='inputss'></el-input>
											</template>
										</el-table-column>
										<el-table-column label="备注">
											<template slot-scope="scope">
												<el-input v-model="scope.row.remarks" class='inputss'></el-input>
											</template>
										</el-table-column>
									</el-table>
								</div>
								<div class="preserve ">
									<el-button plain @click="Merchandise=false">取消</el-button>
									<el-button type="primary" plain @click="spsave(item,item1)">确定</el-button>
								</div>
							</el-dialog>
							<!-- 查看物资 -->
							<el-dialog title="物资明细" :visible.sync="dialogTableVisible" width=98%>
								<el-input v-model="item1.search" style="display: inline-block;width: 17%;borderRight:none;margin-left: 10%;" placeholder="请输入搜索内容" icon="el-icon-search">
								</el-input>
								<div class="ztable">
									<el-table :data="item1.cktableData" ref="table" tooltip-effect="dark" border stripe style="width: 100%">
										<el-table-column type="selection" width="45" align="center"></el-table-column>
										<el-table-column label="分类" width="80" align="center" prop='goodsClass' />
										<el-table-column label="编码" align="center" width="80" prop='goodsCode' />
										<el-table-column label="商品/服务名称" width="120" class="zxfsh" prop='goodsName' />
										<el-table-column label="规则型号/描述" width="120" prop='goodsModel' />
										<el-table-column prop="goodsunit" label="单位" width="60" />
										<el-table-column label="数量" width="60" prop='goodsNumber' />
										<el-table-column label="预估单价" prop='goodsPrice' />
										<el-table-column label="预估总价" prop='goodsTotal' />
										<el-table-column label="类型" prop='goodsType' />
										<el-table-column label="计划实施时间" width="120" prop='startDate' />
										<el-table-column label="计划交付时间" width="120" prop='endDate' />
										<el-table-column label="主机厂家" prop='factoryName' />
										<el-table-column label="技术要求" prop='technologyDesc' />
										<el-table-column label="备注" prop='remarks' />
									</el-table>
								</div>
							</el-dialog>
						</div>
					</div>

				</div>
				<el-form-item label="变更原因" prop="reason" style="margin-top:2%">
					<el-input style="width:40%;" v-model="ruleForm.reason" placeholder="请输入变更原因" icon="el-icon-search">
					</el-input>
				</el-form-item>
				<el-form-item label="下一步审核人" prop="userId" ref="userId" style="margin-top:2%">
					<el-select style="width:40%;" @change="getUserId" filterable v-model="ruleForm.userId" placeholder="请选择审核人">
						<el-option v-for="m in userArr" :label="m.name" :value="m.id" :key="m.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="cancel()">取消</el-button>
					<el-button type="primary" @click="audit(1)">保存草稿</el-button>
					<el-button type="primary" @click="audit(2)">提交审核</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 计划内选择项目弹框 -->
		<el-dialog title="项目选择" :visible.sync="dialogTableVisible12" width="50%">
			<el-table :data="gridData" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"> </el-table-column>
				<el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
			</el-table>
			<div class="buttons">
				<el-button @click="dialogTableVisible12 = false">取 消</el-button>
				<el-button type="primary" @click="comfigselectVisible">确定</el-button>
			</div>
		</el-dialog>
		<!-- 编辑商品弹框 -->
		<el-dialog title="编辑商品" :visible.sync="dialogTableVisibles" width="98%" :before-close="handleClose">
			<div class="operating" style="padding:0 30px;">
				<el-input v-model="zxfsearch" style="display: inline-block;width: 28%;borderRight:none;" placeholder="请输入物资名称/规格型号" icon="el-icon-search">
				</el-input>
			</div>
			<div class="ztable">
				<el-table :data="tableDatas" ref="table" tooltip-effect="dark" border stripe style="width: 100%" @selection-change="selectRow">
					<el-table-column label="分类" width="80" align="center">
						<template slot-scope="scope">
							<el-input v-model="scope.row.goodsClass" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="编码" align="center" width="80">
						<template slot-scope="scope">
							<el-input v-model="scope.row.goodsCode" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="商品/服务名称" width="120" class="zxfsh">
						<template slot-scope="scope">
							<el-input v-model="scope.row.goodsName" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="规则型号/描述" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.goodsModel" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="单位" width="60">
						<template slot-scope="scope">
							<el-input v-model="scope.row.goodsunit" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="数量" width="60">
						<template slot-scope="scope">
							<el-input v-model="scope.row.goodsNumber" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="预估单价">
						<template slot-scope="scope">
							<el-input v-model="scope.row.goodsPrice" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="预估总价">
						<template slot-scope="scope">
							<el-input v-model="scope.row.goodsTotal" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="类型" width="120">
						<template slot-scope="scope">
							<el-select v-model="scope.row.goodsType" placeholder="请选择">
								<el-option v-for="item in optionss" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="计划实施时间" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.startDate" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="计划交付时间" width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.endDate" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="主机厂家">
						<template slot-scope="scope">
							<el-input v-model="scope.row.factoryName" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="技术要求">
						<template slot-scope="scope">
							<el-input v-model="scope.row.technologyDesc" class="inputss"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="备注">
						<template slot-scope="scope">
							<el-input v-model="scope.row.remarks" class="inputss"></el-input>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="preserve ">
				<el-button plain @click="dialogTableVisibles = false">取消</el-button>
				<el-button type="primary" plain @click="save()">确定</el-button>
			</div>
		</el-dialog>
		<!-- 查看物资 -->
		<el-dialog title="物资明细" :visible.sync="Merchandiseckwz" width="98%">
			<el-input v-model="search" style="display: inline-block;width: 17%;borderRight:none;margin-left: 10%;" placeholder="请输入搜索内容" icon="el-icon-search">
			</el-input>
			<div class="ztable">
				<el-table :data="cktableData" ref="table" tooltip-effect="dark" border stripe style="width: 100%" @selection-change="selectRow">
					<el-table-column type="selection" width="45" align="center"></el-table-column>
					<el-table-column label="分类" width="80" align="center" prop="goodsClass">
					</el-table-column>
					<el-table-column label="编码" align="center" width="80" prop="goodsCode">
					</el-table-column>
					<el-table-column label="商品/服务名称" width="120" class="zxfsh" prop="goodsName">
					</el-table-column>
					<el-table-column label="规则型号/描述" width="120" prop="goodsModel">
					</el-table-column>
					<el-table-column prop="goodsunit" label="单位" width="60">
					</el-table-column>
					<el-table-column label="数量" width="60" prop="goodsNumber">
					</el-table-column>
					<el-table-column label="预估单价" prop="goodsPrice">
					</el-table-column>
					<el-table-column label="预估总价" prop="goodsTotal">
					</el-table-column>
					<el-table-column label="类型" prop="goodsType"> </el-table-column>
					<el-table-column label="计划实施时间" width="120" prop="startDate">
					</el-table-column>
					<el-table-column label="计划交付时间" width="120" prop="endDate">
					</el-table-column>
					<el-table-column label="主机厂家" prop="factoryName">
					</el-table-column>
					<el-table-column label="技术要求" prop="technologyDesc">
					</el-table-column>
					<el-table-column label="备注" prop="remarks"> </el-table-column>
				</el-table>
			</div>
		</el-dialog>
		<!-- 在线编辑 -->
		<el-dialog title="在线编辑" :visible.sync="editing" width=90%>
			<div>
				<tinymce :id="tinyId" :height="200" v-model="content" />
			</div>
		</el-dialog>
		<!-- 导入数据 -->
		<el-dialog title='导入数据' :visible.sync="importData" width="60%">
			<el-form ref="form" :model="choiceForm" :rules="choiceForm" label-width="140px" size="mini">
				<el-form-item label="导入数据">
				<el-upload id="autoExamUpload" ref="upload" name="importFile" :headers="handleHeader" :on-exceed="handleExceed" :on-success="handleSuccess" style="display: inline-block;" action="http://61.134.63.231:9090/planmanagementService/goods/goodsExcelImport">
					<el-input slot="trigger" :limit="1" style="width:400px;" />
				</el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="importData = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import Navbar from "@/views/layout/components/Navbar";
	import { getAjax, postAjaxx, postAjaxJson } from "@/utils/ajaxRequest";
	import { getToken } from '@/utils/auth'
	import { parseTime } from '@/utils'
	export default {
		components: {
			Navbar
		},
		data() {
			return {
				importData:false,
				dialogTableVisible12: false,
				fileList: [],
				handleHeader: {
					token: getToken()
				},
				ruleForm: {
					title: "",
					userId: "",
					searchValue: "",
				},
				isAble:false,
				applyDate: "",
				applyusername: "",
				orgName: "",
				assigneeExpressionText: "",
				departId: "",
				name: "",
				//				rules: {
				//
				//				},
				temp: {
					userId: "",
				},
				ProjetAeeay: [{
					planTime: "",
					moneyType: "",
					itemClassify: "",
					planType: "",
					choiceDomain: [],
					domain: [{
						ProjectNumber: '', //编码
						projectName: '', //项目名称
						projectMoney: '', //预估金额
						chargePerson: '', //负责人
						projectGrade: '', //项目等级
						projectDesc: '', //项目简介
						startDate: '', //开始时间
						endDate: '', //结束时间
						tableData: [ //附件表格
							{
								annexChinaName: '',
								fileName: "",
								filePath: "",

							},
						],
						//添加商品物资
						tableDatas: [{
							goodsClass: "",
							goodsCode: "",
							goodsName: "",
							goodsModel: "",
							goodsunit: "",
							goodsNumber: "",
							goodsPrice: "",
							goodsTotal: "",
							goodsType: "",
							startDate: "",
							endDate: "",
							factoryName: "",
							technologyDesc: "",
							remarks: ""
					}],
					//查看物资
					cktableData: [],
					}]
				}

			],
				userArr: [], //审核人
				tinyId: '',
				userArr: [],
				zxfsearch: "",
				search: "",
				formName: "",
				
				biaoti: "年度专项资金变更", //标题
				userane: "申请人",
				// 验证表单
				ruleForm: {
					userId: "",
					projectNumber: "",
					projectName: "",
					projectMoney: "",
					startDate: "",
					endDate: "",
					reason:"",
					chargePerson: "",
					projectDesc: ""
				},
				currentIndex: {},
				region: "", //计划时间下拉初始值
				projectType: "", //计划资金类型下拉初始值
				category: "", //计划项目类别下拉初始值
				plan: "", //计划类型下拉初始值
				booler: false, //计划内选择项目按钮的隐藏显示
				projectNane: false, //计划外项目新增的隐藏显示
				tabs: false, //计划内选择项目确认按钮隐藏显示表格
				multipleSelection: [], //计划内选择项目表格单选数据存放
				dialogTableVisible: false, //计划内选择项目弹框
				dialogTableVisibles: false, //计划内虚拟表格可编辑商品弹框
				Merchandise: false, //添加商品弹框
				Merchandiseckwz: false, //查看商品弹框
				// 计划时间选择下拉框
				options1: [{
						value: "1",
						label: "2020年年度资金计划"
					},
					{
						value: "2",
						label: "2019年年度资金计划"
					}
				],
				// 计划资金类型选择下拉框
				options3: [],
				// 计划项目类别选择下拉框
				options2: [{
						value: "1",
						label: "安全    "
					},
					{
						value: "2",
						label: "折旧"
					}
				],
				// 计划项目类别选择下拉框
				options4: [{
						value: "1",
						label: "类别1"
					},
					{
						value: "2",
						label: "类别2"
					},
					{
						value: "3",
						label: "类别3"
					}
				],
				// 验证下拉框
				rules: {
					userId: [{
						required: true,
						message: '请选择下一步审核人',
						trigger: 'blur'
					}],
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}],
					region: [{
						required: true,
						message: "请选择计划时间",
						trigger: "change"
					}],
					type: [{
						required: true,
						message: "请选择计划类型",
						trigger: "change"
					}],
					category: [{
						required: true,
						message: "请选择项目类别",
						trigger: "change"
					}],
					reason: [{
						required: true,
						message: "请输入变更原因",
						trigger: "blur"
					}]					
				},

				// 计划内选择项目的表格
				gridData: [{
						goodsClass: "",
						goodsCode: "",
						goodsName: "",
						goodsModel: "",
						goodsunit: "",
						goodsNumber: "",
						goodsPrice: "",
						goodsTotal: "",
						goodsType: "",
						startDate: "",
						endDate: "",
						factoryName: "",
						technologyDesc: "",
						remarks: ""
					},
					{
						ProjtName: "项目2"
					}
				],
				//选择项目虚拟表格
				NewTables: [],
				//计划内编辑商品的表格
				tableDatas: [],
				//计划内编辑商品的表格类型选择初始值
				typevalue: "",
				//计划内编辑商品的表格类型选择
				optionss: [{
						label: "设备",
						value: "1"
					},
					{
						label: "物资",
						value: "2"
					},

					{
						label: "工程",
						value: "3"
					}
				],
				// stats:1,//计划外项目初始个数
				add: true, //计划外添加项目循环
				remove: false, //计划外删除项目循环
				cktableData:"",
				//计划外表单数据
				ruleForm: {
					domain: [{
						bianma: "", //项目编码
						projectName: "", //项目名称
						projectMoney: "", //预估金额
						chargePerson: "", //负责人
						projectDesc: "", //项目简介
						startDate: "", //开始时间
						endDate: "", //结束时间
						fileName: "", //附件名称
						// 计划外查看商品表格数据
						cktableData: [{
							goodsClass: "",
							goodsCode: "",
							goodsName: "",
							goodsModel: "",
							goodsunit: "",
							goodsNumber: "",
							goodsPrice: "",
							goodsTotal: "",
							goodsType: "",
							startDate: "",
							endDate: "",
							factoryName: "",
							technologyDesc: "",
							remarks: ""
						}],
						tableDatas: [{
							goodsClass: "",
							goodsCode: "",
							goodsName: "",
							goodsModel: "",
							goodsunit: "",
							goodsNumber: "",
							goodsPrice: "",
							goodsTotal: "",
							goodsType: "",
							startDate: "",
							endDate: "",
							factoryName: "",
							technologyDesc: "",
							remarks: ""
						}]
					}]
				},
				// 计划外附件表格数据
				tableData: [{
					fileName: ""
				}],
				// 计划外添加商品表格数据
				gettable: [],

				editing: false,
				content: '',
				obj: {
					planApply: {
						applyDate: "",
						applyRecord: "",
						applyState: "",
						applyType: "",
						applyUsername: "",
						applyresult: "",
						createDate: "",
						createUser: "",
						deleteDate: "",
						deleteUser: "",
						flowId: "",
						formId: "",
						id: "",
						orgId: "",
						orgName: "",
						orgType: "",
						planClass: "",
						raskMark: "",
						remarks: "",
						title: "",
						updateDate: "",
						updateUser: "",
						useable: ""
					},
					planBudget: {
						applyDate: "",
						applyId: "",
						beforeId: "",
						belongMonth: "",
						belongYear: "",
						createDate: "",
						createUser: "",
						deleteDate: "",
						deleteUser: "",
						endDate: "",
						formClass: "",
						formId: "",
						fundsType: "",
						handleDate: "",
						handleOrgId: "",
						handleOrgName: "",
						handleOrgType: "",
						id: "",
						orgId: "",
						orgName: "",
						orgType: "",
						planDesc: "",
						planType: "",
						projectTotal: 0,
						remarks: "",
						startData: "",
						title: "",
						updateDate: "",
						updateUser: "",
						useable: ""
					},
					planBudgetProjectVoList: [],
					startWorkflowParameterVo: {
						assigneeExpressionText: "",
						businessForm: "",
						departId: "",
						deploymentKey: "",
						id: "",
						name: "",
						processName: "",
						userId: ""
					},

					submitType: ""
				}
			};
      			index:""
		},
		created() {
			this.applyDate = parseTime(new Date(), "{y}-{m}-{d}");
			this.applyusername = sessionStorage.userName;
			this.orgName = sessionStorage.orgName;
			this.formName = this.$route.query.formName;
			// 选择下一步审核人
			var param = {
				dept: sessionStorage.orgType
			};
			postAjaxJson(
				`http://61.134.63.231:9090/process-service/userTask/getFirstExaminePerson/ndzxzjbglc`,
				param
			).then(res => {
				if(res.code == 0) {
					this.userArr = res.data;
				}
			});

			// 项目类别
			getAjax("/api/planmanagementService/PlanProjectSelect/findDictProType", ).then(res => {
				this.options3 = res.data;
			});
		},
		methods: {
			Donlowerd(){
				window.location.href="http://61.134.63.231:9090//planmanagementService/goods/goondsExcelDownload"
			},
			changeTime(data){
				this.ProjetAeeay.forEach((val,i) =>{
					this.ProjetAeeay[i].planTime = data
				})	
			},
			addGoodsList() {
				this.Merchandise = true

			},
	  		handleExceed(){},
			addTypeChoice() {
				
				if(this.ProjetAeeay.length < 2){
					if(this.ProjetAeeay[0].planType == "" || this.ProjetAeeay[0].planType == null || this.ProjetAeeay[0].planType == undefined){
						return this.$message('请选择计划类型')
					}else if(this.ProjetAeeay[0].planTime == "" || this.ProjetAeeay[0].planTime == null || this.ProjetAeeay[0].planTime == undefined){
						return this.$message('请选择计划时间')
					}else if(this.ProjetAeeay[0].moneyType == "" || this.ProjetAeeay[0].moneyType == null || this.ProjetAeeay[0].moneyType == undefined){
						return this.$message('请选择资金类型')
					}else if(this.ProjetAeeay[0].itemClassify == "" || this.ProjetAeeay[0].itemClassify == null || this.ProjetAeeay[0].itemClassify == undefined){
						return this.$message('请选择项目类别')
					}
				console.log(this.ProjetAeeay[0].planType)
				this.ProjetAeeay.push({
					planTime: this.ProjetAeeay[0].planTime,
					moneyType: this.ProjetAeeay[0].moneyType,
					itemClassify: this.ProjetAeeay[0].itemClassify,
					planType: this.ProjetAeeay[0].planType == '1' ? "2":"1",
					choiceDomain: [],
					domain: [{
						bianma: "", //项目编码
						projectName: "", //项目名称
						projectMoney: "", //预估金额
						chargePerson: "", //负责人
						projectDesc: "", //项目简介
						startDate: "", //开始时间
						endDate: "", //结束时间
						fileName: "", //附件名称
						// 计划外查看商品表格数据
						cktableData: [{
							goodsClass: "",
							goodsCode: "",
							goodsName: "",
							goodsModel: "",
							goodsunit: "",
							goodsNumber: "",
							goodsPrice: "",
							goodsTotal: "",
							goodsType: "",
							startDate: "",
							endDate: "",
							factoryName: "",
							technologyDesc: "",
							remarks: ""
						}],
						tableDatas: [{
							goodsClass: "",
							goodsCode: "",
							goodsName: "",
							goodsModel: "",
							goodsunit: "",
							goodsNumber: "",
							goodsPrice: "",
							goodsTotal: "",
							goodsType: "",
							startDate: "",
							endDate: "",
							factoryName: "",
							technologyDesc: "",
							remarks: ""
						}]
					}]
				});
				this.isAble = true
				}	
			},
			deleteTypeChoice(item) {
				this.ProjetAeeay = _.without(this.ProjetAeeay, item);
				this.isAble = false
			},
			// 在线编辑
			editings(row) {
				this.editing = true
			},
			handleSuccess(file) {
				console.log(file)
				if(file.code == 0) {
					this.fileupdate = true;
					this.currentIndex.filePath = file.data;
					this.ProjetAeeay[0].domain[0].tableDatas=file.data
					this.$message('上传成功')
				} else {
					this.fileupdate = false;
					this.$message(file.message)
				}
			},
			audit(data) {
				this.$refs['ruleForm'].validate((valid) => {
					if(valid) {
						if(data == 1) {
							this.obj.planApply.applyType = "1";
							this.obj.submitType = "1";
						} else if(data == 2) {
							this.obj.planApply.applyType = "2";
							this.obj.submitType = "2";
						}
						this.obj.planApply.applyUsername = sessionStorage.userName;
						this.obj.planApply.createUser = sessionStorage.userId;
						this.obj.planApply.formId = this.$route.query.id;
						this.obj.planApply.orgId = sessionStorage.orgId;
						this.obj.planApply.orgName = sessionStorage.orgName;
						this.obj.planApply.orgType = sessionStorage.orgType;
						this.obj.planApply.planClass = "年度计划";
						this.obj.planApply.title = "年度专项资金变更";
						this.obj.planApply.updateUser = sessionStorage.userName;
						this.obj.planBudget.createUser = sessionStorage.userId;
						this.obj.planBudget.formId = this.$route.query.id;
						this.obj.planBudget.title = this.biaoti;
						this.obj.planBudget.remarks = this.reason
						// this.obj.planBudget.createUser =  sessionStorage.userName
            console.log(this.ProjetAeeay)
              var a ;
              this.ProjetAeeay.forEach((val,i) =>{
                if(val.planType == "1"){
                    val.choiceDomain.forEach(proecjtVal =>{
                      a = {
                          planAnnexfileList: [],
                          planBudgetGoodsList: [],
                          planBudgetproject: {}
                      }
                      a.planBudgetproject = proecjtVal
                      if(val.domain[0].tableDatas.length > 0){
                        if(val.domain[0].tableDatas[0].budgetProject_id == proecjtVal.id){
                          a.planBudgetGoodsList = val.domain[0].tableDatas
                        }
                      }
                      this.obj.planBudgetProjectVoList.push(a)
                    })
                  }
                  if(val.planType == "2"){
                      val.domain.forEach(proecjtVal =>{
                        a = {
                            planAnnexfileList: [],
                            planBudgetGoodsList: [],
                            planBudgetproject: {}
                        }
                        var project = {};
                        project.ProjectNumber = proecjtVal.ProjectNumber, //编码
                        project.projectName = proecjtVal.projectName, //项目名称
                        project.projectMoney = proecjtVal.projectMoney, //预估金额
                        project.chargePerson = proecjtVal.chargePerson, //负责人
                        project.projectGrade = proecjtVal.projectGrade, //项目等级
                        project.projectDesc = proecjtVal.projectDesc, //项目简介
                        project.startDate = proecjtVal.startDate, //开始时间
                        project.endDate = proecjtVal.endDate, //结束时间
                        project.createUser = sessionStorage.userId,
                        a.planBudgetproject = project
                        this.obj.planBudgetProjectVoList.push(a)
                      })
                    }
			  })
			  if(this.obj.planBudgetProjectVoList.length == 0){
				  return this.$message('请选择项目')
			  }
						console.log(this.obj);
 						// postAjaxx(
						// 	"/api/planmanagementService/PlanYearSpecialFundsChange/saveTechnologyPlan",
						// 	JSON.stringify(this.obj)
						// ).then(res => {
						// 	if(res.code == 0) {
						// 		this.$message("添加成功");
						// 		this.$router.push({
						// 			path: "/home/index"
						// 		});
						// 	} else {
						// 		this.$message(res.message);
						// 	}
						// });
					}
				});
			},
			getUserId(e) {
				this.userArr.forEach(item => {
					if(e === item.id) {
						item.processName = this.biaoti;
						item.userId = item.id;
						item.deploymentKey = "ndzxzjbglc";
						this.obj.startWorkflowParameterVo = item;
					}
				});
			},
			selectProject(i) {
        this.index = i
        if(this.ProjetAeeay[i].itemClassify == '' || this.ProjetAeeay[i].planTime == '' || this.ProjetAeeay[i].moneyType == ''){
         this.$message("请选择项目类型");
        }else{
          getAjax(
          	`/api/planmanagementService/PlanBudget/findAnnualFundChangeProjectList?fundsType=${
            this.ProjetAeeay[i].moneyType
          }&pageNumber=0&pageSize=6&projectType=${this.ProjetAeeay[i].itemClassify}&year=${
            this.ProjetAeeay[i].planTime
          }`
          ).then(res => {
          	this.gridData = res.data.content;
          });
          this.dialogTableVisible12 = true;
        }
			},
			handleClose() {},
			//某某年资金计划时间下拉框
			function1(val) {
				console.log(val);
			},
			//计划资金类型下拉框
			function2(data) {
				this.ProjetAeeay.forEach((val,i) =>{
					this.ProjetAeeay[i].moneyType = data
				})
			},
			//计划项目类别下拉框
			function3(data) {
				this.ProjetAeeay.forEach((val,i) =>{
					this.ProjetAeeay[i].itemClassify = data
				})
			},
			//计划类型下拉框
			fun1(val) {
				if(val === "1") {
					this.booler = true;
					this.projectNane = false;
				} else if(val === "2") {
					this.projectNane = true;
					this.booler = false;
					this.tabs = false;
				}
				console.log(val)
			},
			// 计划内选择项目表格确认按钮
			comfigselectVisible() {
        var i = this.index;
        this.dialogTableVisible12 = false;
        this.ProjetAeeay[i].choiceDomain = this.multipleSelection;
        this.ProjetAeeay[i].choiceDomain.forEach(val =>{
          getAjax(
                `/api/planmanagementService/PlanProjectSelect/findBudgetGoods?budgetProjectId=`+val.id
              ).then(res => {
                console.log("开始")
                console.log(res);
                console.log("结束")
                if(res.data.length > 0){
                  res.data.forEach((goodsVal,s) =>{
                    this.ProjetAeeay[i].domain[0].tableDatas.push(goodsVal);
                  })
                }
          });
        })
        this.tabs = true;
			},
			// 计划内虚拟表格点击编辑商品
			compile(row) {
				this.dialogTableVisibles = true;
				getAjax(
					`/api/planmanagementService/PlanProjectSelect/findBudgetGoods?budgetProjectId=${row}`
				).then(res => {
					this.tableDatas = res.data;
				});
			},
			//计划内选择表格单选当前数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
				// console.log(this.multipleSelection)
			},
			//计划外点击添加项目
			//添加项目
			addRule(item, item1) {
				this.add = true
				this.remove = true
				item.domain.push({
					ProjectNumber:'',//编码
					projectName: '', //项目名称
					projectMoney: '', //预估金额
					chargePerson: '', //负责人
					projectGrade:'',//项目等级
					projectDesc: '', //项目简介
					startDate: '', //开始时间
					endDate: '', //结束时间
					fileName: '', //附件名称
					tableData: [ //附件表格
						{
							annexChinaName: '',
							fileName: "",
							filePath: "",

						},
					],
					// 添加商品表格
					tableDatas: [{
						coding: '', //分类
						money: '', //预估金额
						principal: '', //负责人
						brief: '', //项目简介
						value1: '', //开始时间
						value2: '', //结束时间

					}]
				});
			},
			//删除项目
			removes(item) {
				item.domain = _.without(item.domain, item1);
				this.changeEvent()
			},
			// handleNodeClick(data) {
			//     console.log(data);
			// },

			// 添加商品保存按钮
			save() {
				this.Merchandise = false;
				//				this.cktableData = this.gettable;
			},
			// 获取表格选中时的数据
			selectRow(val) {
				this.selectlistRow = val;
			},
      // 保存商品
      spsave(item, item1) {
      	this.Merchandise = false
      	this.ProjetAeeay.forEach(item => {
      		item.domain.forEach(items => {
      			items.cktableData= items.tableDatas
      		})
          })
      	// item.tableDatas = item1.cktableData
      	console.log(item.tableDatas)
      },
			// 添加商品增加行
			// 添加商品增加行
			addRow(item1) {
				var list = {
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
				}
				item1.tableDatas.unshift(list)
			},
			//   删除商品增加行
			delData() {
				for(let i = 0; i < this.selectlistRow.length; i++) {
					let val = this.selectlistRow;
					// 获取选中行的索引的方法
					// 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
					// rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
					val.forEach((val, index) => {
						this.gettable.forEach((v, i) => {
							if(val.rowNum === v.rowNum) {
								// i 为选中的索引
								this.gettable.splice(i, 1);
							}
						});
					});
				}
				// 删除完数据之后清除勾选框
				this.$refs.gettable.clearSelection();
			},

			//附件的增加行
			accessoryaddRow() {
				var list = {
					rowNum: "",
					fileName: this.fileName
					// loveer: this.loveer
				};
				this.tableData.unshift(list);
			},
			// 附件的删除行
			removeDomain() {
				var index = this.tableData.indexOf();
				this.tableData.splice(index);
			}
		}
	};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
	.content {
		/*width: 90%;
		margin: 10px auto;*/
		/* background-color: antiquewhite; */
		min-height: 500px;
	}

	.content>h3 {
		text-align: center;
		margin: 10px 0;
	}

	.content_top>p {
		line-height: 55px;
		font-size: 14px;
	}

	.content_top>p>span {
		display: inline-block;
		cursor: pointer;
		color: rgb(89, 156, 255);
		margin-left: 1%;
	}

	.content_top>p>input {
		width: 82%;
		margin-left: 1%;
		height: 32px;
		padding: 0 10px;
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

	.essential_top>p {
		height: 45px;
		line-height: 45px;
		padding: 0 22px;
		background-color: rgba(243, 243, 243, 0.829);
		font-size: 15px;
	}
	/* 提交审核 */

	.bottom {
		display: flex;
		justify-content: flex-end;
		height: 100px;
		line-height: 100px;
	}

	.bottom>span:nth-child(1) {
		display: inline-block;
		width: 150px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border: 1px solid rgb(119, 119, 119);
		cursor: pointer;
		margin: auto 0;
		margin-right: 5%;
	}

	.bottom>span:nth-child(2) {
		display: inline-block;
		width: 150px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border: 1px solid rgb(119, 119, 119);
		cursor: pointer;
		margin: auto 0;
		margin-right: 5%;
	}

	.bottom>span:nth-child(3) {
		display: inline-block;
		width: 150px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-color: rgb(240, 6, 6);
		cursor: pointer;
		margin: auto 0;
		color: white;
		margin-right: 3%;
	}

	.buttons {
		text-align: center;
		margin-top: 3%;
	}

	.el-form-item__error {
		left: 5%;
	}

	.preserve {
		margin-top: 2%;
		display: flex;
		justify-content: center;
	}

	.el-button {
		width: 9%;
	}

	.information {
		min-height: 300px;
		border: 1px solid rgb(156, 156, 156);
		border-top: none;
		/* border-bottom: none; */
	}

	.information>p {
		height: 40px;
		background-color: rgb(250, 250, 250);
		line-height: 40px;
		padding: 0 44px;
		font-size: 14px;
		position: relative;
	}

	.information>p>span {
		display: inline-block;
		margin-left: 80%;
		color: aqua;
		cursor: pointer;
	}

	.information>p>i {
		font-style: normal;
		color: aqua;
		cursor: pointer;
		display: inline-block;
		margin-left: 2%;
		position: absolute;
		/* display: none; */
	}

	.information>ul {
		display: flex;
		height: 202px;
		line-height: 55px;
		padding: 38px 36px 0 36px;
		flex-wrap: wrap;
		flex-direction: row;
		/* line-height: 40px; */
	}

	.information>ul>li {
		font-size: 14px;
		width: 33%;
		/* height: 80px;
    line-height: 80px; */
	}

	.information>ul>li:nth-child(3) {
		padding-left: 20px;
	}

	.information>ul>li:nth-child(4) {
		padding-left: 16px;
	}

	.information>ul>li>input {
		margin-left: 24px;
		width: 62%;
		height: 30px;
		font-size: 13px;
		padding: 0 5px;
		/* border-color: rgb(252, 252, 252); */
	}

	.brief {
		padding: 0 38px;
		font-size: 14px;
	}

	.brief>input {
		width: 86.5%;
		height: 48px;
		margin-left: 26px;
		padding: 0 5px;
	}

	.table {
		display: flex;
		margin-top: 20px;
		width: 77.3%;
	}

	.table>span {
		margin-left: 10%;
		padding-top: 14px;
		margin-right: 1%;
	}

	.getbutton {
		padding: 20px 0;
		padding-left: 10%;
	}

	.el-date-editor {
		/*margin-left: 24px;*/
		width: 76%;
		height: 30px;
		font-size: 13px;
	}

	.el-date-editor>input {
		border-color: dimgrey;
		border-radius: none;
	}

	.upload-demo {
		display: flex;
	}

	.buttonsn {
		background-color: darkgray;
		border: none;
		width: 74px;
	}

	.el-table .cell {
		display: flex;
	}
</style>
