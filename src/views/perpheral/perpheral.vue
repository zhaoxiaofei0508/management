<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/forme' }">选择计划</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content" style="margin-top:30px;">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
				<div class="content_top">
					<el-form-item label="标题" prop="title">
						<el-input v-model="ruleForm.title" placeholder="外委计划"></el-input>
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
						<div class="category">
							<el-form-item label="项目类别" prop="projectType" ref="chickvalue" style="margin-top:20px;">
								<el-select v-model="item.projectType" style="width:100%;" placeholder="请选择项目类别" class="input" @change="chickvalue">
									<el-option v-for="item in options" :key="item.dictValue" :label="item.dictLabel" :value='item.dictLabel'>
									</el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="information" v-for="(item1, index1) in item.domain" :key='index1'>
							<p style="margin-bottom:20px;">项目:{{index1+1}}
								<el-button style="float:right;" v-if="index1==item.domain.length-1" type="text" @click="addRule(item,item1)">添加项目</el-button>
								<i @click.prevent="removes(item,item1)" id="rome" v-if="remove">删除项目</i>
							</p>
                 <el-col :span="8">
									<el-form-item label="项目编码" :prop="'projectNo.'+index1">
										<el-input v-model="item1.projectNo" placeholder="请输入项目编码"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="项目名称" :prop="'projectName.'+index1">
										<el-input v-model="item1.projectName" placeholder="请输入项目名称"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="预估金额" :prop="'projectMoney.'+index1">
										<el-input v-model="item1.projectMoney" placeholder="请输入预估金额" @change="changeEvent"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="开始时间" :prop="'startDate.'+index1">
										<el-date-picker v-model="item1.startDate" type="date" placeholder="选择开始时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
									</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="结束时间" :prop="'endDate.'+index1">
										<el-date-picker v-model="item1.endDate" type="date" placeholder="选择结束时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
									</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="负责人" :prop="'chargePerson.'+index1">
										<el-input v-model="item1.chargePerson" placeholder="请输入负责人"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label="项目简介" :prop="'projectDesc.'+index1">
										<el-input v-model="item1.projectDesc" type="textarea" placeholder="请输入项目简介"></el-input>
									</el-form-item>
								</el-col>

							<div class="table">
								<span>附件</span>
								<el-table :data="item1.tableData" slot="empty" border style="width: 62%">
									<el-table-column type="index" label="序号" width="150" align='center'>
									</el-table-column>
									<el-table-column prop="usname" label="附件名称" width="150" align='center'>
										<template slot-scope="scope">
											<el-input v-model="scope.row.fileName" placeholder="请输入内容"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="city" label="上传" width="200" align='center'>
										<template slot-scope="scope">
                     <div @click="getM(scope.$index,index1,index)">
                     	<el-upload id="autoExamUpload" ref="upload" :file-list="fileList" name="articleImage" :headers="handleHeader" :on-exceed="handleExceed" :on-success="handleSuccess" style="display: inline-block;" action="http://61.134.63.231:9090/planmanagementService/upload/image/uploadImg">
                     		<el-button slot="trigger" :limit="1">点击上传</el-button>
                     	</el-upload>
                     </div>
										</template>
									</el-table-column>
									<el-table-column prop="address" label="编辑" width="150" align='center'>
										<template slot-scope="scope">
											<span class="editing">在线编辑</span>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="150" align='center'>
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
									<el-button size="small" type="primary" plain>复制行</el-button>
									<el-button size="small" type="primary" plain @click.prevent="delData(item1)">删除行</el-button>
									<el-button size="small" type="primary" @click="importData=true" plain>导入数据</el-button>
									<el-button plain style="margin-left: 6%" @click="Donlowerd">下载模板</el-button>
									<el-button size="small" type="primary" plain @click="removedel(item1)">全部删除</el-button>
									<span>与此项目无关系的内容可不填</span>
									<el-input v-model="zxfsearch" style="display: inline-block;width: 17%;borderRight:none;margin-left: 10%;" placeholder="请输入搜索内容" icon="el-icon-search">
									</el-input>
								</div>
								<div class="ztable">
									<el-table :data="item1.tableDatas" ref="table" tooltip-effect="dark" border stripe style="width: 100%" @selection-change='selectRow'>
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
                        <el-date-picker v-model="scope.row.startDate" type="date" placeholder="计划实施时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
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
									<el-button type="primary" plain @click="spsave()">确定</el-button>
								</div>
							</el-dialog>
							<!-- 查看物资 -->
							<el-dialog title="物资明细" :visible.sync="dialogTableVisible" width=98%>
								<el-input v-model="item1.search" style="display: inline-block;width: 17%;borderRight:none;margin-left: 10%;" placeholder="请输入搜索内容" icon="el-icon-search">
								</el-input>
								<div class="ztable">
									<el-table :data="item1.cktableData" ref="table" tooltip-effect="dark" border stripe style="width: 100%">
										<el-table-column type="selection" width="45" align="center"></el-table-column>
										<el-table-column label="分类" width="80" align="center">

										</el-table-column>
										<el-table-column label="编码" align="center" width="80">

										</el-table-column>
										<el-table-column label="商品/服务名称" width="120" class="zxfsh">

										</el-table-column>
										<el-table-column label="规则型号/描述" width="120">

										</el-table-column>
										<el-table-column prop="name" label="单位" width="60">

										</el-table-column>
										<el-table-column label="数量" width="60">

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
								</div>
							</el-dialog>
						</div>
					</div>
                    <el-form-item label="下一步审核人" prop="userId" ref="userId" style="margin-top:2%">
                        <el-select style="width:40%;" filterable v-model="ruleForm.userId" placeholder="请选择审核人" @change="getUserId">
                            <el-option v-for="m in userArr" :label="m.name" :value="m.id" :key="m.id"></el-option>
                        </el-select>
				    </el-form-item>
					<div class="zxfcategory">
						<p @click="addRules">添加项目类别</p>
					</div>
					<div style="margin-top: 2%;padding-left: 20px;" id="box">
						<span>计划预估总额</span><i style="margin-left: 2%;">{{totalMoney}}</i>
					</div>
				</div>
				<div style="float:right;margin-top:20px;">
                    <el-button @click="cancel()">取消</el-button>
                    <el-button type="primary" @click="saveOrFlow(1)">保存草稿</el-button>
                    <el-button type="pr imary" @click="saveOrFlow(2)">提交审核</el-button>
        </div>
			</el-form>
		</div>
		<!-- 流程图遮罩内容 -->
		<el-dialog title="流程图" :visible.sync="showModal" width=80%>
			<img src="../../../static/img/tu.jpg">
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
import { getAjax,postAjax,postAjaxJson,postAjaxx } from '@/utils/ajaxRequest'
import { parseTime } from '@/utils'
import { getToken	} from '@/utils/auth'
export default {
		components: {

		},
		data() {
			return {
				importData:false,
        handleHeader: {
        	token: getToken()
        },
				applyDate: "",
				applyusername: "",
				orgName: "",
				wxzx: "",
				ruleForm: {
					title: "",
					userId: "",
					projectType:"",
				},
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'change'
					}],
					userId: [{
						required: true,
						message: '请选择下一步审核人',
						trigger: 'blur'
					}],
					projectType: [{
						required: true,
						message: '请选择项目类别',
						trigger: 'blur'
					}],
				},
				temp: {
					userId: "",
                },
                assigneeExpressionText: "",
                departId: "",
                name: "",
				userArr: [], //审核人
				formName: '',
				userane: '老王',
				rowNum: 1,
				ProjetAeeay: [{
						projectType: '', //项目类别
						domain: [{
              projectNo:'',//项目编码
							projectName: '', //项目名称
							projectMoney: '', //预估金额
							chargePerson: '', //负责人
							projectDesc: '', //项目简介
							projectGrade: '', //
              startDate:'',//开始时间
							endDate: '', //结束时间
							tableData: [ //附件表格
								{
									fileName: '',
								},
							],
							//添加商品物资
							tableDatas: [{
								goodsClass:'',
								goodsCode:'',
								goodsModel:'',
								goodsunit:'',
								goodsNumber:'',
								goodsPrice:'',
								goodsTotal:'',
								goodsType:'',
								startDate:'',
								endDate:'',
								factoryName:'',
								technologyDesc:'',
								remarks:''
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
				encoding: '', //编码
				totalMoney: '', //计划预估总额
				dialogTableVisible: false, //查看物资
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
				options: [], //项目类别
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
        formId:'',
		fileList: [],
		currentIndex:{}
			}
		},
		created() {
			this.applyDate = parseTime(new Date(), "{y}-{m}-{d}");
			this.applyusername = sessionStorage.userName;
      this.orgName = sessionStorage.orgName;
      this.formId = this.$route.query.id;
      this.init();
      // getAjax("/api/planmanagementService/plan/list").then(res => {
      // });
			// let xqid = this.$route.query.id
		},
		methods: {
		Donlowerd(){
			window.location.href="http://61.134.63.231:9090//planmanagementService/goods/goondsExcelDownload"
		},
//  初始化
      init(){
        // 选择下一步审核人
        var param={
            dept:sessionStorage.orgType
        }
        postAjaxJson(`/api/processService/userTask/getFirstExaminePerson/wwjhlc`,param).then(res => {
          console.log(res)
        	if(res.code == 0) {
        		this.userArr = res.data;
        	}
        });
        // 项目类别
        getAjax("/api/planmanagementService/PlanProjectSelect/findDictProType", ).then(res => {
        	this.options=res.data;
        });
        this.formName = this.$route.query.formName;
      },

      getM(index1, index2, index3) {
      	this.currentIndex = this.ProjetAeeay[index3].domain[index2].tableData[index1];
      },
      handleExceed(files, fileList) {
      	this.$message.warning(`当前限制选择 1 个文件`)
      },
      handleSuccess(file) {
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
			chickvalue(value) {
        this.ruleForm.projectType=value;
        console.info(this.ruleForm.projectType);
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
			//添加项目类别
			addRules() {
				this.ProjetAeeay.push({
					domain: [{
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
                goodsClass:'',
                goodsCode:'',
                goodsModel:'',
                goodsunit:'',
                goodsNumber:'',
                goodsPrice:'',
                goodsTotal:'',
                goodsType:'',
                startDate:'',
                endDate:'',
                factoryName:'',
                technologyDesc:'',
                remarks:''

						}]
					}]
				});
			},
			changeEvent() {
				var arr = 0
				this.ProjetAeeay.forEach(item => {
					item.domain.forEach(items => {
						arr += (items.projectMoney - 0)
					})
				})
				this.totalMoney = arr
			},
			//添加项目
			addRule(item, item1) {
				this.add = true
				this.remove = true
				item.domain.push({
					projectName: '', //项目名称
					projectMoney: '', //预估金额
					chargePerson: '', //负责人
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
            goodsClass:'',
            goodsCode:'',
            goodsModel:'',
            goodsunit:'',
            goodsNumber:'',
            goodsPrice:'',
            goodsTotal:'',
            goodsType:'',
            startDate:'',
            endDate:'',
            factoryName:'',
            technologyDesc:'',
            remarks:''

					}]
				});
			},
			//删除项目
			removes(item, item1) {

				item.domain = _.without(item.domain, item1);
				this.changeEvent()
			},
			handleChange(file, fileList) { //点击上传
				this.fileList = fileList.slice(-3);
			},
			// 获取表格选中时的数据
			selectRow(val) {
				this.selectlistRow = val
			},
			//附件的增加行
			accessoryaddRow(item, item1) {
				var list = {
					rowNum: '',
					fileName: this.fileName,
					loveer: this.loveer
				}
				item1.tableData.unshift(list)
			},
			//附件的删除行
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			//添加物资保存
			spsave() {
				this.Merchandise = false
			},
			// 添加商品增加行
			addRow(item1) {
				var list = {
					rowNum: '',
					coding: this.coding, //编码
					name: this.name, //名称
					monad: this.monad, //单位
					quantity: this.quantity, //数量
					estimate: this.estimate, //预估单价
					goodsTotal: this.goodsTotal, //预估总价
					describe: this.describe, //描述
					type: this.type, //类型
				}
				item1.tableDatas.unshift(list)
			},
			// 删除商品行
			delData(item1) {
				for(let i = 0; i < this.selectlistRow.length; i++) {
					let val = this.selectlistRow
					val.forEach((val, index) => {
						item1.tableDatas.forEach((v, i) => {
							if(val.rowNum === v.rowNum) {
								console.log(val.rowNum)
								// i为选中的索引
								item1.tableDatas.splice(i, 1)
							}
						})
					})
				}
				// 删除完数据之后清除勾选框
				this.$refs.item1.tableDatas.clearSelection()
			},
			// 全部删除
			removedel(item1) {
				this.delData(item1)
			},

      saveOrFlow(isType){
        this.$refs['ruleForm'].validate((valid) => {
          var bo = true;
          if (valid) {
            var param ={};
            var planImplementprojectVoList=[];
            	_.forEach(this.ProjetAeeay, value => {
                  var planAnnexfileList = [];
									_.forEach(value.domain, val => {
                      if(val.chargePerson=='' || val.startDate=='' || val.endDate=='' || val.projectDesc=='' ||
                      val.projectMoney=='' || val.projectName=='' || val.projectNo==''){
                        console.info("-----"+JSON.stringify(val))
                           bo = false;
                      }
                    var planImplementproject={
                                "approval": "",
                         				"budgetProjectId": "",
                         				"chargePerson": val.chargePerson,
                         				"createDate": "",
                         				"createUser": "",
                         				"createUserName": "",
                         				"deleteDate": "",
                         				"deleteUser": "",
                         				"endDate": val.endDate,
                         				"fundsType": "",
                         				"id": "",
                         				"implementId": "",
                         				"isPlan": "",
                         				"planMonth": "",
                         				"planYear": "",
                         				"projectDesc": val.projectDesc,
                         				"projectGrade": '',
                         				"projectMoney": val.projectMoney,
                         				"projectName": val.projectName,
                         				"projectNo": val.projectNo,
                         				"projectType": value.projectType,
                         				"remark": "",
                         				"startDate":val.startDate,
                         				"updateDate": "",
                         				"updateUser": "",
                         				"useable": "1"
                    };

                    _.forEach(val.tableData, v => {
                    	planAnnexfileList.push({
                    		"annexChinaName": v.annexChinaName,
                    		"annexFileType": "",
                    		"createDate": "",
                    		"createUser": "",
                    		"deleteDate": "",
                    		"deleteUser": "",
                    		"fileName": v.fileName,
                    		"filePath": v.filePath,
                    		"id": v.id,
                    		"mainTableId": "",
                    		"ordernum": 0,
                    		"updateDate": "",
                    		"updateUser": "",
                    		"useable": "1"
                    	});
                    });
                      var planImplementGoodsList = [];

                      _.forEach(val.tableDatas, v => {
                          planImplementGoodsList.push({
                            "createDate":parseTime(new Date(), "{y}-{m}-{d}"),
                            "createUser": "",
                            "deleteDate": "",
                            "deleteUser": "",
                            "endDate": v.endDate,
                            "factoryName": v.factoryName,
                            "futuresNumber": 0,
                            "goodsClass": v.goodsClass,
                            "goodsCode": v.goodsCode,
                            "goodsMark": "",
                            "goodsModel": v.goodsModel,
                            "goodsName": "",
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
                            "remarks": v.remarks,
                            "securityStoreNumber": 0,
                            "startDate": v.startDate,
                            "stockNumber": 0,
                            "technologyDesc": v.technologyDesc,
                            "updateDate": "",
                            "updateUser": "",
                            "useable": "",
                            "waitStoreNumber": 0,
                            "yearNumber": 0
                    	});
                          planImplementprojectVoList.push({
                                planAnnexfileList:planAnnexfileList,
                                planImplementGoodsList:planImplementGoodsList,
                                planImplementproject:planImplementproject,
                                "planGoodsSourceList": [],
                          });
                    	});

                 });
              });
            param = {
                   "planApply": {
                   	"applyDate": parseTime(new Date(), "{y}-{m}-{d}"),
                   	"applyRecord": "",
                   	"applyState": isType,
                   	"applyType": "",
                   	"applyUsername": sessionStorage.userName,
                   	"applyresult": "",
                   	"createDate": parseTime(new Date(), "{y}-{m}-{d}"),
                   	"createUser": sessionStorage.userId,
                   	"createUserName": sessionStorage.userName,
                   	"deleteDate": "",
                   	"deleteUser": "",
                   	"flowId": "",
                   	"formId": this.formId,
                   	"id": "",
                   	"orgId": sessionStorage.orgId,
                   	"orgName": sessionStorage.orgName,
                   	"orgType": sessionStorage.orgType,
                   	"planClass": "",
                   	"raskMark": "",
                   	"remarks": "",
                   	"title": this.ruleForm.title,
                   	"updateDate": "",
                   	"updateUser": "",
                   	"useable": "1"
                   },
                    "planCollect": {},
                    "planCollectplanList": [],
                    "planImplement": {
                        "projectTotal": this.totalMoney ,
                    },
                    "planImplementprojectVoList":planImplementprojectVoList,
                    startWorkflowParameterVo: {
                        assigneeExpressionText: this.assigneeExpressionText,
                        departId: this.departId,
                        id: this.ruleForm.userId,
                        name: this.name,
                        userId:sessionStorage.userId
                    },
                }

                console.info(JSON.stringify(param));
                if(bo){
                  postAjaxx("/api/planmanagementService/outPlan/outPlanStartFlow", JSON.stringify(param)).then(res => {
                      if (res.code == 0) {
                          this.$message("添加成功");
                          this.$router.push({
                              path:"/home/index"
                          });
                      } else {
                          this.$message(res.message);
                      }
                  });
                }else{
                  this.$message.warning(`请完善信息`);
                }

          } else {
            return false;
          }

        });
      },
		},
        mounted() {

        },

	}
</script>
<style scoped>
	.content {
		width: 90%;
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

	.information>p>span{
		display: inline-block;
		float:right;
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
