<template>
    <div style="padding:20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/forme' }">选择计划</el-breadcrumb-item>
			<el-breadcrumb-item>{{formName}}</el-breadcrumb-item>
		</el-breadcrumb>
        <div class="content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <div class="content_top">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="框架协议"></el-input>
				</el-form-item>
				<el-form-item label="流程">
                    <span @click="showModal=true" class="btn">查看流程图</span>
				</el-form-item>
            </div>
            <h3>{{formName}}</h3>
            <div class="essential_top">
                <p>基本信息</p>
                <ul>
                    <li>申请人:<span class="usname">{{userane}}</span><i class="iconfont icon-user-3"></i></li>
                    <li>申请部门:<span class="usname">{{orgName}}</span><i class="iconfont icon-bumen"></i></li>
                    <li>申请时间:<span>{{applyDate}}</span></li>
                </ul>
            </div>
            <div class="essential_top">
                <p>计划信息</p>
                <div class="operating" style="padding:20px 30px 0;">
                    <el-button size="small" type="primary" plain @click="addRow()">增加行</el-button>
                    <el-button size="small" type="primary" :disabled="selectlistRow.length==0" @click="addRows()" plain>复制行</el-button>
                    <el-button size="small" type="primary" :disabled="selectlistRow.length==0" plain @click="delData()">删除行</el-button>
                    <el-button size="small" type="primary" @click="importData=true" plain>导入数据</el-button>
                    <el-button size="small" type="primary" @click="delAll()" plain>全部删除</el-button>
                     <el-button size="small" type="primary" @click="Donlowerd">下载模板</el-button>
                    <el-input v-model.lazy="zxfsearch" @blur="getGoodsList" style="display: inline-block;width: 30%;borderRight:none;float:right;" placeholder="请输入搜索内容" prefix-icon="el-icon-search">
                    </el-input>
                   
			    </div>  
            </div>
            <div class="ztable">
                <el-table 
                    :data="tableDataEnd"
                    ref="table"
                    tooltip-effect="dark"
                    border
                    stripe
                    style="width: 100%"  
                    @selection-change='selectRow'
                    :header-cell-style="{fontSize:'12px'}">
                    <el-table-column type="selection" width="45" align="center" ></el-table-column>
                    <el-table-column label="分类" width="80" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.goodsClass" class='inputss' ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column  label="编码" align="center" width="80">
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
                    <el-table-column label="类型" width="150" align='center'>
                        <template slot-scope="scope">
                        <el-select v-model="scope.row.goodsType" placeholder="请选择">
                            <el-option
                            v-for="item in optionss"
                                :key="item.value"
                                :label="item.label"
                                :value="item.typevalue">
                            </el-option>
                        </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="计划实施时间" width="250" align='center'>
                    <template slot-scope="scope">
                        <el-date-picker
                            v-model="scope.row.startDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            >
                        </el-date-picker>
                    </template>
                    </el-table-column>
                    <el-table-column label="计划交付时间" width="250" align='center'>
                    <template slot-scope="scope">
                        <el-date-picker
                            v-model="scope.row.endDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </template>
                    </el-table-column>
                    <el-table-column label="主机厂家" width="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.factoryName" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="技术要求" width="100">
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
                <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />  
            </div>
            </el-form>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
            <el-form-item label="下一步审核人" prop="userId" ref="userId" style="margin-top:2%">
                <el-select style="width:40%;" filterable v-model="ruleForm.userId" placeholder="请选择审核人" @change="getUserId">
                    <el-option v-for="m in userArr" :label="m.name" :value="m.id" :key="m.id"></el-option>
                </el-select>
			</el-form-item>
            </el-form>
            </div>
            <div style="float:right;margin-top:20px;">
                <el-button @click="cancel()">取消</el-button>
                <el-button type="primary" @click="audit(1)">保存草稿</el-button>
                <el-button type="pr imary" @click="audit(2)">提交审核</el-button>
            </div>
            <el-dialog title='导入数据' :visible.sync="importData" width="60%">
                <el-form ref="form" :model="choiceForm" :rules="choiceRules" label-width="140px" size="mini">
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
import  Navbar from '@/views/layout/components/Navbar'
import { getAjax,postAjax,postAjaxJson,postAjaxx } from '@/utils/ajaxRequest'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'
import { getToken } from '@/utils/auth'
export default{
components:{
        Navbar,
        Pagination,
    },
    data() {
        return {
            handleHeader: {
                token: getToken()
            },
            choiceForm:{

            },
            importData:false,
            fileList: [],
            userane:'',
            orgName:'',
            applyDate:'',
            total: 0,
            listQuery: {
                page: 1,
                limit: 10,
			},
            caption:'',//标题
            useraName:'',//申请人
            zxfsearch:'',//模糊搜索
            rowNum:1,
            formName:'',
            tableDataName: "",
            // 计划信息表格
            tableDataEnd: [
                {
                    goodsClass:'',//分类
                    goodsCode:'',
                    goodsName:'',
                    goodsModel:'',
                    goodsunit:'',
                    goodsNumber:'',
                    goodsType:'',
                    goodsPrice:'',//预估金额
                    goodsTotal:'',
                    factoryName:'',
                    technologyDesc:'',
                    remarks:'',               
                    startDate:'',//开始时间
                    endDate:'',//结束时间
                },
            ],
            currentIndex: {},
            currentPage: 1,
            pageSize: 4,
            totalItems: 0,
            filterTableDataEnd:[],
            // tableDataBegin:[
            //     {
            //         fenlei:''
            //     },
            // ],
            
            optionss:[
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
            selectlistRow: [],//存放选中时的数据
            updateGoodsObj: {},
            userArr: [

            ],//审核人
            ruleForm: {
                title: "",
                userId: "",
                searchValue: "",
			},
            rules: {                                                                                                                               
                userId: [{
                    required: true,
                    message: '请选择下一步审核人',
                    trigger: 'blur'
                }]
            },
            assigneeExpressionText: "",
            departId: "",
            name: "",
            formId: ''
        }
    },
        
    created() {
        postAjaxJson(`/api/processService/userTask/getFirstExaminePerson/kjxylc`).then(res => {
            console.log(res)
            if(res.code == 0) {
                this.userArr = res.data;
                console.log(this.userArr)
            }
		});
        this.userane = sessionStorage.userName;
        this.orgName = sessionStorage.orgName;
        this.formName = this.$route.query.formName;
        this.ruleForm.title = this.$route.query.formName;
        this.applyDate=parseTime(new Date(),"{y}-{m}-{d}");
        this.formId = this.$route.query.id;
        this.getList();      
    },
    methods: {
        //分页
        getList() {
            var param = {
                pageNumber: this.listQuery.page - 1,
                pageSize: this.listQuery.limit,
                serverId:13
            };
        },

            kjxy(){
                
            },
          // 获取表格选中时的数据
            selectRow (val) {
                this.selectlistRow = val
            },
          // 增加行
            addRow() {
				this.tableDataEnd.push({
					id:"",
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
            // 复制行
            addRows() {
				_.forEach(this.selectlistRow, val => {
					this.tableDataEnd.push(val);
				});
			},
            // 删除商品增加行
			delData() {
				_.forEach(this.selectlistRow, val => {
					this.tableDataEnd = _.without(this.tableDataEnd, val);
				});
				// 删除完数据之后清除勾选框
				this.$refs.tableDataEnd.clearSelection()
            },
            delAll() {
			    this.tableDataEnd = [];
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
            getM(index1, index2, index3) {
				this.currentIndex = this.ProjetAeeay[index3].domain[index2].tableData[index1];
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件`)
			},
            handleSuccess(file) {
                console.log(file)
				if(file.code == 0) {
                    this.currentIndex.filePath = file.data;
                    this.tableDataEnd=file.data
					this.$message('上传成功')
				} else {
					this.$message(file.message)
				}
            },
            //下载模板
            Donlowerd(){
                window.location.href="http://61.134.63.231:9090//planmanagementService/goods/goondsExcelDownload"
            },
            doFilter() {
                if (this.tableDataName == "") {
                    this.$message.warning("查询条件不能为空！");
                    return;
                }
                this.tableDataEnd = []
                //每次手动将数据置空,因为会出现多次点击搜索情况
                this.filterTableDataEnd=[]
                this.tableDataBegin.forEach((value, index) => {
                    if(value.name){
                    if(value.name.indexOf(this.tableDataName)>=0){
                        this.filterTableDataEnd.push(value)
                }
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
            // 提交数据
            audit(w){
                var flag = true
                this.$refs['ruleForm'].validate((valid) => {
                    if (!valid) {
                        return this.$message('请输入必填信息')
                    }
                console.log(this.tableDataEnd)
                this.tableDataEnd.forEach(v => {
                    // if(!v.goodsClass || !v.goodsCode) {
                    //     alert('出发了')
                    // }
                    if(!v.goodsClass || !v.goodsCode || !v.goodsName || !v.goodsModel || !v.goodsunit || !v.goodsNumber || !v.goodsPrice || !v.goodsTotal || !v.goodsType || !v.startDate || !v.endDate || !v.factoryName || !v.technologyDesc || !v.remarks) {
                        flag = false
                    }
                })
                if(!flag) {
                    return this.$message('请输入必填信息')
                }
                var submitBool = true;
                var planImplementGoodsList=[]
                this.tableDataEnd.forEach(val=>{
                    planImplementGoodsList.push({
                        "createDate": "",
                        "createUser": "",
                        "createUserName": "",
                        "deleteDate": "",
                        "deleteUser": "",
                        "endDate": val.endDate,
                        "factoryName": val.factoryName,
                        "futuresNumber": 0,
                        "goodsClass": val.goodsClass,
                        "goodsCode":val.goodsCode,
                        "goodsMark": "",
                        "goodsModel": val.goodsModel,
                        "goodsName":val.goodsName,
                        "goodsNumber": val.goodsNumber,
                        "goodsPrice": val.goodsPrice,
                        "goodsTotal":val.goodsTotal,
                        "goodsType": val.goodsType,
                        "goodsunit": val.goodsunit,
                        "id": "",
                        "lockNumber": 0,
                        "lockStoreNumber": 0,
                        "nolockNumber": 0,
                        "nolockStoreNumber": 0,
                        "projectId": "",
                        "purchaseNumber": 0,
                        "remarks": val.remarks,
                        "securityStoreNumber": 0,
                        "startDate": val.startDate,
                        "stockNumber": 0,
                        "technologyDesc": val.technologyDesc,
                        "updateDate": "",
                        "updateUser": "",
                        "useable": "",
                        "waitStoreNumber": 0,
                        "yearNumber": 0
                    })     
                })    
                let yearCapitalSupplementVo = {
                    "planApply": {
                        "applyDate": parseTime(new Date(), "{y}-{m}-{d}"),
                        "applyRecord": "",
                        "applyState": w,
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
                        "title":  this.ruleForm.title,
                        "updateDate": "",
                        "updateUser": "",
                        "useable": "1"
                    },
                    "planCollect": {
                        "applyDate": parseTime(new Date(), "{y}-{m}-{d}"),
                        "applyRecord": "",
                        "applyState": w,
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
                        "title": this.$route.query.formName,
                        "updateDate": "",
                        "updateUser": "",
                        "useable": "1"
                    },
                    "planCollectplanList": [
                        {
                            "collectId": "",
                            "collectType": "",
                            "createDate": "",
                            "createUser": "",
                            "createUserName": "",
                            "deleteDate": "",
                            "deleteUser": "",
                            "id": "",
                            "planClass": "",
                            "planId": "",
                            "updateDate": "",
                            "updateUser": "",
                            "useable": ""
                        }
                    ],
                    "planImplement": {
                        "applyDate": parseTime(new Date(), "{y}-{m}-{d}"),
                        "applyRecord": "",
                        "applyState": w,
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
                        "title": this.$route.query.formName,
                        "updateDate": "",
                        "updateUser": "",
                        "useable": "1"
                    },
                    "planImplementprojectVoList": [
                        {
                            planImplementGoodsList:planImplementGoodsList,
                            "planAnnexfileList": [
                                {
                                    "annexChinaName": "",
                                    "annexFileType": "",
                                    "createDate": "",
                                    "createUser": "",
                                    "createUserName": "",
                                    "deleteDate": "",
                                    "deleteUser": "",
                                    "fileName": "",
                                    "filePath": "",
                                    "id": "",
                                    "mainTableId": "",
                                    "ordernum": 0,
                                    "updateDate": "",
                                    "updateUser": "",
                                    "useable": ""
                                }
                            ],
                            "planGoodsSourceList": [
                                {
                                    "createDate": "",
                                    "createUser": "",
                                    "createUserName": "",
                                    "deleteDate": "",
                                    "deleteUser": "",
                                    "goodsId": "",
                                    "goodsMark": "",
                                    "id": "",
                                    "lockMark": "",
                                    "remark": "",
                                    "sourceOrder": "",
                                    "stockBoxCode": "",
                                    "stockGoodsCode": "",
                                    "stockGoodsId": "",
                                    "stockLocationCode": "",
                                    "stockNumber": 0,
                                    "stockProject": "",
                                    "stockShelvesCode": "",
                                    "stockcode": "",
                                    "updateDate": "",
                                    "updateUser": "",
                                    "useGoodsNumber": "",
                                    "useable": ""
                                }
                            ], 
                            "planImplementproject": {
                                "approval": "",
                                "budgetProjectId": "",
                                "chargePerson": "",
                                "createDate": "",
                                "createUser": sessionStorage.userId,
                                "createUserName": "",
                                "deleteDate": "",
                                "deleteUser": "",
                                "endDate": "",
                                "fundsType": "",
                                "id": "",
                                "implementId": "",
                                "isPlan": "",
                                "planMonth": "",
                                "planYear": "",
                                "projectDesc": "",
                                "projectGrade": "",
                                "projectMoney": 0,
                                "projectName": "",
                                "projectType": "",
                                "remark": "",
                                "startDate": "",
                                "updateDate": "",
                                "updateUser": "",
                                "useable": ""
                            }
                        }
                    ],
                    "startWorkflowParameterVo": {
                        "assigneeExpressionText": this.assigneeExpressionText,
                        "businessForm": "/frame/framejhs",
                        "departId":  this.departId,
                        "deploymentKey": "kjxylc",
                        "id":  this.ruleForm.userId,
                        "name": this.name,
                        "processName": "框架协议流程",
                        "userId": sessionStorage.userId
                    }         
                }
                //    
                console.log(yearCapitalSupplementVo)
                postAjaxJson("/api/planmanagementService/planFrameAgreement/planFrameAgreementStartFlow",yearCapitalSupplementVo).then(res => {
                    if(res.code == 0) {
                        this.$message("成功");
                        this.$router.push({
                            path:"/home/index"
                        });
                    } else {
                        this.$message(res.message);
                    }
                });
                })
            }
            
    },
    }

</script>
<style  scoped>
.ztable{
    margin-top: 20px;
}
.content{
    width: 95%;
    margin: 10px auto;
    min-height: 500px;
 }
 .content>h3{
    text-align: center;
    margin: 10px 0;
 }
 .content_top>p{
     line-height: 55px;
     font-size: 14px;
 }
 .content_top>p>span{
     display: inline-block;
     cursor: pointer;
     color: rgb(89, 156, 255);
     margin-left: 1%;
     
 }
 .content_top>p>input{
     width: 82%;
     margin-left: 1%;
     height: 32px;
     padding: 0 10px;
 }
 .essential_top>p{
    height: 45px;
    line-height: 45px;
    padding: 0 22px;
    background-color: rgba(243, 243, 243, 0.829);
    font-size: 15px;
}
.essential_top>ul{
    display: flex;
    justify-content: space-between;
    height: 75px;
    line-height: 75px;
    padding: 0 28px;
}
.essential_top>ul>li{
    font-size: 14px;
}
.essential_top>p{
    height: 45px;
    line-height: 45px;
    padding: 0 22px;
    background-color: rgba(243, 243, 243, 0.829);
    font-size: 15px;
}
.fenye{
    padding: 30px 0;
}
</style>
