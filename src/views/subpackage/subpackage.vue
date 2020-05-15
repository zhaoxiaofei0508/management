<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/forme' }">选择计划</el-breadcrumb-item>
			<el-breadcrumb-item>{{formName}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content" style="margin-top:30px;">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
				<div class="content_top">
					<el-form-item label="标题" prop="title">
						<el-input v-model="ruleForm.title" placeholder="年度科技资金计划补报"></el-input>
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
					<p>项目信息</p>
					<div v-for="(item, index) in ProjetAeeay" :key='index'>
						<div class="category" style="margin-top:20px;">
							<el-form-item label="项目类别" prop="projectType">
								<el-select v-model="item.projectType" style="width:400px;" placeholder="请选择项目类别" class="input">
									<el-option v-for="item in options" :key="item.dictValue" :label="item.dictLabel" :value='item.dictValue'>
									</el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="information" v-for="(item1, index1) in item.domain" :key='index1'>
							<p style="margin-bottom:10px;">项目:{{index1+1}}
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
									<el-input v-model="item1.projectMoney" placeholder="请输入预估金额" @input="changeEvent"></el-input>
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
							<div style="clear: both;"></div>
							<div class="brief">
								<el-form-item label="项目简介">
									<el-input v-model="item1.projectDesc" placeholder="请输入项目简介"></el-input>
								</el-form-item>
							</div>
							<div class="table">
								<span>附件</span>
								<el-table :data="item1.tableData" slot="empty" border style="width: 100%">
									<el-table-column type="index" label="序号" align='center' width='100'>
									</el-table-column>
									<el-table-column prop="annexChinaName" label="附件名称" align='center'>
										<template slot-scope="scope">
											<el-input v-model="scope.row.annexChinaName" placeholder="附件名称"></el-input>
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
							<div class="button">
								<el-button type="primary" @click="Merchandise=true">添加商品</el-button>
								<el-button type="primary" @click="dialogTableVisible = true">查看物资</el-button>
							</div>
							<!-- 添加商品遮罩内容 -->
							<el-dialog title="添加物资" :visible.sync="Merchandise" width=98%>
								<div class="operating" style="padding:0 30px;">
									<el-button size="small" type="primary" plain @click.prevent="addRow(item1)">增加行</el-button>
									<el-button size="small" type="primary" plain @click="addRows()">复制行</el-button>
									<el-button size="small" type="primary" plain @click.prevent="delData(item1)">删除行</el-button>
									<el-button size="small" type="primary" @click="importData=true" plain>导入数据</el-button>
									<el-button plain style="margin-left: 6%" @click="Donlowerd">下载模板</el-button>
									<el-button size="small" type="primary" plain @click="removedel(item1)">全部删除</el-button>
									<span>与此项目无关系的内容可不填</span>
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
										<el-table-column label="分类" width="80" align="center" prop='goodsClass'>

										</el-table-column>
										<el-table-column label="编码" align="center" width="80" prop='goodsCode'>

										</el-table-column>
										<el-table-column label="商品/服务名称" width="120" class="zxfsh" prop='goodsName'>

										</el-table-column>
										<el-table-column label="规则型号/描述" width="120" prop='goodsModel'>

										</el-table-column>
										<el-table-column prop="goodsunit" label="单位" width="60">

										</el-table-column>
										<el-table-column label="数量" width="60" prop='goodsNumber'>

										</el-table-column>
										<el-table-column label="预估单价" prop='goodsPrice'>

										</el-table-column>
										<el-table-column label="预估总价" prop='goodsTotal'>

										</el-table-column>
										<el-table-column label="类型" prop='goodsType'>

										</el-table-column>
										<el-table-column label="计划实施时间" width="120" prop='startDate'>

										</el-table-column>
										<el-table-column label="计划交付时间" width="120" prop='endDate'>

										</el-table-column>
										<el-table-column label="主机厂家" prop='factoryName'>

										</el-table-column>
										<el-table-column label="技术要求" prop='technologyDesc'>

										</el-table-column>
										<el-table-column label="备注" prop='remarks'>

										</el-table-column>
									</el-table>
								</div>
							</el-dialog>
						</div>
					</div>

					<div class="zxfcategory">
						<p @click="addRules">添加项目类别</p>
					</div>
					<div style="margin-top: 2%;padding-left: 20px;" id="box">
						<span>计划预估总额</span><i style="margin-left: 2%;">{{totalMoney}}</i>
					</div>
				</div>
				<el-form-item label="下一步审核人" prop="userId" ref="userId" style="margin-top:2%">
					<el-select style="width:40%;" @change="getUserId" filterable v-model="ruleForm.userId" placeholder="请选择审核人">
						<el-option v-for="m in userArr" :label="m.name" :value="m.id" :key="m.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="cancel()">取消</el-button>
					<el-button type="primary" @click="submitForm(1)">保存草稿</el-button>
					<el-button type="primary" @click="submitForm(2)">提交审核</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 流程图遮罩内容 -->
		<el-dialog title="流程图" :visible.sync="showModal" width=80%>
			<img src="../../../static/img/fbjh.png">
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
	import Navbar from '@/views/layout/components/Navbar'
	import Tinymce from '@/components/Tinymce'
	import { parseTime } from "@/utils"
	import {
		getToken
	} from '@/utils/auth'
	import { getAjax, postAjax, postAjaxJson, postAjaxx } from '@/utils/ajaxRequest'
	export default {
		name: 'Home',
		components: {
			Navbar,
			Tinymce
		},
		data() {
			return {
				fileList: [],
				handleHeader: {
					token: getToken()
				},
				ruleForm: {
					title: "",
					userId: "",
					searchValue: "",
				},
				applyDate: "",
				applyusername: "",
				orgName: "",
				assigneeExpressionText: "",
				departId: "",
				name: "",
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
				},
				temp: {
					userId: "",
				},
				userArr: [], //审核人
				formName: '',
				userane: '老王',
				rowNum: 1,
				ProjetAeeay: [{
						searchValue: '', //项目类别
						domain: [{
							ProjectNumber:'',//编码
							projectName: '', //项目名称
							projectMoney: '', //预估金额
							chargePerson: '', //负责人
							projectGrade:'',//项目等级
							projectDesc: '', //项目简介
                            startDate:'',//开始时间
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
								goodsClass: '', //分类
								goodsCode: '',
								goodsName: '',
								goodsModel: '',
								goodsunit: '',
								goodsNumber: '',
								goodsType: '',
								goodsPrice: '', //预估金额
								goodsTotal: '',
								factoryName: '',
								technologyDesc: '',
								remarks: '',
								startDate: '', //开始时间
								endDate: '', //结束时间

							}],
							//查看物资
							cktableData: [{
								goodsClass: '',
								goodsCode: '',
								goodsName: '',
								goodsModel: '',
								goodsunit: '',
								goodsNumber: '',
								goodsType: '',
								goodsPrice: '', //预估金额
								goodsTotal: '',
								factoryName: '',
								technologyDesc: '',
								remarks: '',
								startDate: '', //开始时间
								endDate: '', //结束时间
							}],
						}]
					}

				],
				editing: false,
				tinyId: "",
				content: "",
				encoding: '', //编码
				totalMoney: '', //计划预估总额
				dialogTableVisible: false, //查看物资
				zzzzzz: '', //标题
				showModal: false, //流程图
				Merchandise: false, //添加商品
				dialogVisible: false, //点这里
				textarea: '', //文本域
				zxfsearch: '', //模糊搜索

				typevalue: '', //添加商品类型
				stats: '', //添加项目类别
				// input: '',//附件名称
				add: true, //添加
				remove: false, //删除
				selectlistRow: [], //存放选中时的数据
				options: [ //项目类别
				],
				projectGrades:[
					{
						dictValue:'1',
						label:'集团级'
					},
					{
						dictValue:'2',
						label:'厂矿级'
					},
					{
						dictValue:'3',
						label:'公司级'
					}
				],
				optionss: [ //添加商品的类型
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
				currentIndex: {
					fileName:''
				},
				importData:false,
			}
		},

		methods: {
			Donlowerd(){
				window.location.href="http://61.134.63.231:9090//planmanagementService/goods/goondsExcelDownload"
			},
			getM(index1, index2, index3) {
				this.currentIndex = this.ProjetAeeay[index3].domain[index2].tableData[index1];
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件`)
			},
			handleSuccess(file) {
				console.log(file);
				if(file.code == 0) {
					this.fileupdate = true;
					this.currentIndex.filePath = file.data;
					this.ProjetAeeay[0].domain[0].tableDatas=file.data
					console.log(this.ProjetAeeay);
					this.$message('上传成功')
				} else {
					this.fileupdate = false;
					this.$message(file.message)
				}
			},
			changeEvent(value) {

			},
			//添加项目类别
			addRules() {
				this.ProjetAeeay.push({
					domain: [{
						ProjectNumber:'',//编码
						projectName: '', //项目名称
						projectMoney: '', //预估金额
						chargePerson: '', //负责人
						projectDesc: '', //项目简介
						startDate: '', //开始时间
						endDate: '', //结束时间
						fileName: '', //附件名称
						tableData: [ //附件表格
							{
								fileName: '',

							},
						],
						//添加商品物资
						tableDatas: [{
							coding: '', //分类
							money: '', //预估金额
							principal: '', //负责人
							brief: '', //项目简介
							value1: '', //开始时间
							value2: '', //结束时间

						}]
					}]
				});
			},
			handleChange(value) {

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
			removes(item, item1) {
				item.domain = _.without(item.domain, item1);
				this.changeEvent()
			},
			addRows() {
				_.forEach(this.selectlistRow, val => {
					this.tableDatas.push(val);
				});
			},
			// 删除商品行
			delData(item1) {
				_.forEach(this.selectlistRow, val => {
					this.tableDatas = _.without(this.tableDatas, val);
				});
				// 删除完数据之后清除勾选框
				this.$refs.tableDatas.clearSelection()
			},

			// 全部删除
			removedel(item1) {
				this.tableDatas = [];
			},
			// 获取表格选中时的数据
			selectRow(val) {
				this.selectlistRow = val
			},
			//附件的增加行
			accessoryaddRow(item, item1) {
				var list = {
					rowNum: '',
					fileNam: this.fileName,
					loveer: this.loveer
				}
				item1.tableData.unshift(list)
			},
			//附件的删除行
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},

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
			// 在线编辑
			editings(row) {
				this.editing = true
			},
      cancel(){
      	this.$router.push({
      		path: '/home/index',
      	})
      },
			// 保存数据
			submitForm(m) {
		var submitBool = true;
        var info = "";
        var date = parseTime(new Date(), "{y}-{m}-{d}");
		var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		console.log("-------------"+this.ProjetAeeay);
        		_.forEach(this.ProjetAeeay, value => {
					_.forEach(value.domain, val => {
            if(!val.ProjectNumber) {
              info = "项目编码不能为空";
            	submitBool = false;
            	return;
            }
						if(!val.projectName) {
              info = "项目名称不能为空";
							submitBool = false;
							return;
						}
						if(!val.projectMoney) {
              info = "预估金额不能为空并且只能为数字";
							submitBool = false;
							return;
						}
            if(!reg.test(val.projectMoney)){
              info = "预估金额只能为数字";
              submitBool = false;
              return;
            }
            if(!val.startDate){
              info = "开始时间不能为空";
              submitBool = false;
              return;
            }
            if(val.startDate < date){
              info = "开始时间小于当前时间";
              submitBool = false;
              return;
            }
            if(val.startDate > val.endDate){
              info = "开始时间不能大于结束时间";
              submitBool = false;
              return;
            }
						if(!val.chargePerson) {
              info = "负责人不能为空";
							submitBool = false;
							return;
						}
            if(!val.projectDesc){
              info = "项目简介不能为空";
              submitBool = false;
              return;
            }
						_.forEach(val.tableDatas, v => {
							if(!v.goodsCode || !v.goodsClass || !v.goodsName || !v.goodsModel || !v.goodsunit || !v.goodsNumber || !v.goodsPrice || !v.goodsTotal || !v.goodsType || !v.startDate || !v.endDate || !v.factoryName) {
								info = "商品信息未填写";
                submitBool = false;
								return;
							}
						});
					});
				});

			   if(!submitBool) {
					this.$message(info);

				} else {
					this.$refs['ruleForm'].validate((valid) => {
						if(valid) {


                var planMoney = 0;
				var planImplementprojectVoList = [];
				_.forEach(this.ProjetAeeay, value => {
					var planAnnexfileList = [];
					var planImplementGoodsList = [];
					_.forEach(value.domain, val => {
            planMoney = planMoney + parseFloat(val.projectMoney);
						_.forEach(val.tableData, v => {
							planAnnexfileList.push({
								"annexChinaName": v.annexChinaName,
								"annexFileType": "",
                "createDate": parseTime(new Date(), "{y}-{m}-{d}"),
                "createUser": sessionStorage.userId,
								"deleteDate": "",
								"deleteUser": "",
								"fileName": v.fileName,
								"filePath": v.filePath,
								"id": v.id,
								"mainTableId": "",
								"ordernum": 0,
                "updateDate": parseTime(new Date(), "{y}-{m}-{d}"),
                "updateUser": sessionStorage.userId,
								"useable": "1"
							});
						});
						_.forEach(val.tableDatas, v => {
							planImplementGoodsList.push({
                "createDate": parseTime(new Date(), "{y}-{m}-{d}"),
                "createUser": sessionStorage.userId,
                "createUserName": "",
                "deleteDate": "",
                "deleteUser": "",
                "endDate": "",
                "factoryName": v.factoryName,
                "futuresNumber": 0,
                "goodsClass": v.goodsClass,
                "goodsCode": v.goodsCode,
                "goodsMark": "",
                "goodsModel": v.goodsModel,
                "goodsName": v.goodsName,
                "goodsNumber": v.goodsNumber,
                "goodsPrice": v.goodsPrice,
                "goodsTotal": v.goodsTotal,
                "goodsType": v.goodsType,
                "goodsunit": v.goodsunit,
                "id": "",
                "lockNumber": 0,
                "lockStoreNumber": 0,
                "nolockNumber": 0,
                "nolockStoreNumber": 0,
                "projectId": "",
                "purchaseNumber": 0,
                "remarks": "",
                "securityStoreNumber": 0,
                "startDate": "",
                "stockNumber": 0,
                "technologyDesc": v.technologyDesc,
                "updateDate": parseTime(new Date(), "{y}-{m}-{d}"),
                "updateUser": sessionStorage.userId,
                "useable": "1",
                "waitStoreNumber": 0,
                "yearNumber": 0
							});
						});
						planImplementprojectVoList.push({
							planAnnexfileList: planAnnexfileList,
							planImplementGoodsList: planImplementGoodsList,
              planGoodsSourceList: [],
              planImplementproject: {
                "approval": "否",
                "budgetProjectId": "",
                "chargePerson": val.chargePerson,
                "createDate": parseTime(new Date(), "{y}-{m}-{d}"),
                "createUser": sessionStorage.userId,
                "createUserName": "",
                "deleteDate": "",
                "deleteUser": "",
								"endDate": val.endDate,
								"fundsType": value.projectType,
                "id": "",
                "implementId": "",
                "isPlan": "",
                "planMonth": "",
                "planYear": "",
								"projectDesc": val.projectDesc,
								"projectGrade": val.projectGrade,
								"projectMoney": val.projectMoney,
								"projectName": val.projectName,
                "projectType": "",
                "remark": "",
								"startDate": val.startDate,
                "updateDate": parseTime(new Date(), "{y}-{m}-{d}"),
                "updateUser": sessionStorage.userId,
                "useable": "1"
              }
						});
					});
				});
				var param = {
					"planApply": {
						"applyDate": parseTime(new Date(), "{y}-{m}-{d}"),
						"applyRecord": "",
						"applyState": m,
						"applyType": "",
						"applyUsername": sessionStorage.userName,
						"applyresult": "",
						"createDate": parseTime(new Date(), "{y}-{m}-{d}"),
						"createUser": sessionStorage.userId,
						"deleteDate": "",
						"deleteUser": "",
						"flowId": '',
						"formId": this.$route.query.id,
						"id": "",
						"orgId": sessionStorage.orgId,
						"orgName": sessionStorage.orgName,
						"orgType": sessionStorage.orgType,
						"planClass": "",
						"raskMark": "",
						"remarks": "",
						"title": this.ruleForm.title,
						"updateDate": parseTime(new Date(), "{y}-{m}-{d}"),
						"updateUser": sessionStorage.userId,
						"useable": "1"
					},
          "planCollect": {
              "applyDate": "",
              "applyId": "",
              "belongMonth": "",
              "belongYear": "",
              "collectIds": "",
              "collectType": "",
              "createDate": parseTime(new Date(), "{y}-{m}-{d}"),
              "createUser": sessionStorage.userId,
              "createUserName": "",
              "deleteDate": "",
              "deleteUser": "",
              "endDate": "",
              "formClass": "",
              "formId": "",
              "handleDate": "",
              "handleOrgId": "",
              "handleOrgName": "",
              "handleOrgType": "",
              "id": "",
              "orgId": "",
              "orgName": "",
              "orgType": "",
              "planDesc": "",
              "planType": "",
              "remarks": "",
              "replyId": "",
              "sendDate": "",
              "sendUserid": "",
              "sendUsername": "",
              "startData": "",
              "summaryName": "",
              "title": "",
              "updateDate": parseTime(new Date(), "{y}-{m}-{d}"),
              "updateUser": sessionStorage.userId,
              "useable": "1"
            },
            "planCollectplanList": [
              {
                "collectId": "",
                "collectType": "",
                "createDate": parseTime(new Date(), "{y}-{m}-{d}"),
                "createUser": sessionStorage.userId,
                "createUserName": "",
                "deleteDate": "",
                "deleteUser": "",
                "id": "",
                "planClass": "",
                "planId": "",
                "updateDate": parseTime(new Date(), "{y}-{m}-{d}"),
                "updateUser": sessionStorage.userId,
                "useable": "1"
              }
            ],
            "planImplement": {
              "applyDate": parseTime(new Date(), "{y}-{m}-{d}"),
              "applyId": "",
              "beforeId": "",
              "belongMonth": "",
              "belongYear": "",
              "chargeDesc": "",
              "createDate": parseTime(new Date(), "{y}-{m}-{d}"),
              "createUser": sessionStorage.userId,
              "createUserName": "",
              "deleteDate": "",
              "deleteUser": "",
              "endDate": "",
              "formClass": "",
              "formId": this.$route.query.id,
              "fundsType": "",
              "handleDate": "",
              "handleOrgId": "",
              "handleOrgName": "",
              "handleOrgType": "",
              "id": "",
              "orgId": sessionStorage.orgId,
              "orgName": sessionStorage.orgName,
              "orgType": sessionStorage.orgType,
              "planDesc": "",
              "planType": this.$route.query.formName,
              "projectTotal": planMoney,
              "remarks": "",
              "startData": "",
              "title": "1",
              "updateDate": parseTime(new Date(), "{y}-{m}-{d}"),
              "updateUser": sessionStorage.userId,
              "useable": "1"
            },
					planImplementprojectVoList: planImplementprojectVoList,
					startWorkflowParameterVo: {
						assigneeExpressionText: this.assigneeExpressionText,
						departId: this.departId,
						deploymentKey: "ndkyxmjh",
						id: this.ruleForm.userId,
						name: this.name,
						userId: sessionStorage.userId

					},
					submitType: m
				}
        this.totalMoney = planMoney
				console.log(param)
				postAjaxx("/api/planmanagementService/planSubpackage/planSubpackageStartFlow", JSON.stringify(param)).then(res => {
					if(res.code == 0) {
						this.$message("成功");
						this.$router.push({
							path: '/home/index',
						})
					} else {
						this.$message(res.message);
					}
				 });
				 }
				});
				}
			},
			// 下载模板
			xiazai(){
				console.log('dsad')
				window.location.href="http://61.134.63.231:9090//planmanagementService/goods/goondsExcelDownload"
			},
			// 导入数据
			Impotdrsj(){
				postAjaxx("/api/planmanagementService/planmanagementService/goods/goodsExcelImport", JSON.stringify(param)).then(res => {
					if(res.code == 0) {
						this.$message("成功");
						this.$router.push({
							path: '/home/index',
						})
					} else {
						this.$message(res.message);
					}
				});
			}
		},
		created() {
			this.applyDate = parseTime(new Date(), "{y}-{m}-{d}");
			this.applyusername = sessionStorage.userName;
			this.orgName = sessionStorage.orgName;
			this.formName = this.$route.query.formName;
			this.ruleForm.title = this.$route.query.formName;

			// 选择下一步审核人
			var param = {
				dept: sessionStorage.orgType
			}
			postAjaxJson(`/api/process-service/userTask/getFirstExaminePerson/fbjhlc`, param).then(res => {
				if(res.code == 0) {
					this.userArr = res.data;
				}
			});

			// 项目类别
			getAjax("/api/planmanagementService/PlanProjectSelect/findDictProType", ).then(res => {
				console.log(res)
				this.options = res.data;
			});
		}
	}
</script>
<style scoped>
	.content {
		width: 95%;
		margin: 10px auto;
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

	.icon-bumen {
		font-size: 14px;
	}

	.category {
		height: 85px;
		line-height: 85px;
	}

	.category>.input {
		width: 90%;
		height: 100%;
		margin-left: 2.6%;
	}

	.information {
		min-height: 300px;
		border: 1px solid rgb(200, 200, 200);
		border-top: none;
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

	.el-date-editor {
		margin-left: 24px;
		width: 76%;
		height: 30px;
		font-size: 13px;
	}

	.el-date-editor>input {
		border-color: dimgrey;
		border-radius: none;
	}

	.box1 {
		margin-left: 29px;
	}

	.box2 {
		margin-left: 19% !important;
	}
	/* .el-table{
    margin-left: 2%;
} */

	.el-table th>.cell {
		text-align: center;
		font-size: 12px;
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

	.upload-demo {
		display: flex;
	}

	.buttons {
		background-color: darkgray;
		border: none;
	}

	.el-upload-list {
		width: 20px;
	}

	.editing {
		color: #409EFF;
	}

	.button {
		padding: 20px 0;
		padding-left: 10%;
	}
	/* 添加物资弹框样式 */

	.Merchandise {
		background-color: #fff;
		position: fixed;
		top: 100px;
		/* left: 300px; */
		width: 100%;
		min-height: 300px;
		z-index: 2
	}

	.Merchandises {
		display: flex;
		justify-content: space-between;
		padding: 10px 10px;
	}

	.inputss>input {
		border: none;
	}

	.el-table--enable-row-hover .el-table__body tr:hover>td {
		background-color: white;
	}

	.operating>span {
		color: brown;
	}
	/* 提交审核 */

	.bottom {
		display: flex;
		justify-content: flex-end;
		height: 100px;
		line-height: 100px;
		/* border-bottom: 1px solid black; */
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

	.bottom>i>span {
		color: red;
		cursor: pointer;
	}

	.zxfcategory>p {
		width: 140px;
		height: 30px;
		text-align: center;
		font-size: 14px;
		line-height: 30px;
		border: 1px solid rgb(56, 142, 255);
		color: #409EFF;
		border-radius: 5px;
		margin-top: 20px;
		cursor: pointer;
	}

	.ztable {
		margin-top: 20px;
	}

	.preserve {
		margin-top: 2%;
		display: flex;
		justify-content: center;
	}

	.inputss>input {
		padding: 0;
	}
</style>
