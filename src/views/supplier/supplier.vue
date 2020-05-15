<template>
<div style="padding:20px;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>供应商推荐</el-breadcrumb-item>
	</el-breadcrumb>
    <div class="content">
        <div class="content_top">
            <p>标题:<input type="text" v-model="recommend"></p>
            <p>流程:<span @click="showModal=true" class="btn">查看流程图</span></p>
        </div>
        <h3>供应商推荐</h3>
        <div class="essential_top">
            <p>基本信息</p>
            <ul>
                <li>申请人:<span class="usname">王华</span><i class="iconfont icon-user-3"></i></li>
                <li>申请部门:<span class="usname">维修中心</span><i class="iconfont icon-bumen"></i></li>
                <li>申请时间:<span>2019-11-12</span></li>
            </ul>
        </div>
      <div class="main essential_top">
        <p>计划信息</p>
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item 
                    label="基本信息"
                    >
                    <el-date-picker
                        v-model="chooseYear"
                        type="year"
                        placeholder="选择年"
                        value-format="yyyy">
                    </el-date-picker>
                    <el-select clearable @clear="clearFunction" v-model="ruleForm.typelb" placeholder="请选择计划类别" @change="function2">
                        <el-option
                            v-for="item in options2"
                            :key="item.id"
                            :label="item.formName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" style="margin-left: 15%;" @click="getPlanDataList">选择计划</el-button>
                </el-form-item>
                <div v-if="tabs" style="display: flex;margin-top: 2%;">
                    <el-table 
                        :data="NewTables"
                        width='100%'
                        >  
                        <el-table-column prop="title" label="计划名称"  align="center"></el-table-column>
                        <el-table-column property="applyUsername" label="申请人"  align="center"></el-table-column>
                        <el-table-column property="applyDate" label="申请时间"  align="center"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="compile(scope.row.id)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div> 
                <div class="supplier">
                    <el-form-item 
                    label="推荐供应商" 
                    >
                    <el-button  type="primary" @click="getSupplierList">选择供应商</el-button> 
                    </el-form-item> 
                </div>
                <div v-if="xzgys">
                    <el-table 
                        :data="xzgysbg"
                        ref="multi2pleRef"
                        tooltip-effect="dark"
                        border
                        stripe
                        style="width: 100%;margin-bottom: 15px;"  
                        @selection-change='seleectRowChange'>
                        <el-table-column type="index" width="80" align="center" label="序号"></el-table-column>
                        <el-table-column label="供应商类别" prop='membertype'>
                        </el-table-column>
                        <el-table-column label="供应商名称" prop='cnname'>
                            <template slot-scope="scope">
                                <span v-if="scope.row.selectType === '直接选择'" @click="directSelection(scope.row.id)">{{scope.row.cnname}}</span>
                                <span v-else @click="newlyAdded(scope.row.id)">{{scope.row.cnname}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="选择方式" prop='selectType'>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, xzgysbg)"
                                type="text"
                                size="small">
                                删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <div style="padding-left: 1%;">
                    <el-form-item 
                    label="新增供应商" 
                    prop="region"
                    >
                    <el-button  type="primary" @click="supplierSave=true">新增供应商</el-button> 
                    </el-form-item>  
                </div>  -->
                <el-form-item label="下一步审核人" prop="userId" ref="userId" style="margin-top:2%">
                    <el-select @change="selectExamineUser" style="width:40%;" filterable v-model="ruleForm.userId" placeholder="请选择审核人">
                    <el-option v-for="m in userArr" :label="m.name" :value="m.id" :key="m.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>    
            <div style="float: right;">
                    <el-button plain>取消</el-button>
                    <el-button plain @click="onSubmit('1')">保存草稿</el-button>
                    <el-button plain type="danger" @click="onSubmit('2')">提交审核</el-button>
                </div>  
        </div>      
      </div>
    
    <!-- 选择计划 -->
    <el-dialog 
        title="计划选择" 
        :visible.sync="ydzxjhtk" 
        width=60%>
        <div class="operating" >
            <el-input v-model="search" style="display: inline-block;width: 100%;borderRight:none;margin-bottom: 9px" 
            placeholder="请输入计划名称" icon="el-icon-search">
            </el-input>
        </div>
        <div class="ztable">
            <el-table 
                :data="tableData"
                ref="multipleTable"
                tooltip-effect="dark"
                border
                stripe
                @select="select" 
                @select-all="selectAll"
                style="width: 100%"  
                @selection-change='selectRow'>
                <el-table-column type="selection" width="45" align="center"></el-table-column>
                <el-table-column label="计划名称" prop='title'></el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPlanDataList" />
        </div>
        <div style="text-align: center;padding: 20px;">
            <el-button plain @click="ydzxjhtk=false">取消</el-button>
            <el-button type="primary" plain @click="save()">确定</el-button>
        </div>
    </el-dialog>
    <!-- 虚拟表格查看详情弹框 -->
    <el-dialog 
        title="详情" 
        :visible.sync="ckxq" 
        width=98%>
        <div style="display: flex;justify-content: space-evenly;">
            <li>计划名称:<span>{{globalData.apply.title}}</span></li>
            <li>申请人:<span>{{globalData.apply.applyUsername}}</span></li>
            <li>申请时间:<span>{{globalData.apply.applyDate}}</span></li>
        </div>
        <div>
            <el-table 
                :data="globalData.project"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%" 
                show-summary
                :summary-method="getSummaries" 
                >
                <el-table-column  label="项目编码" align="center" width="100" prop='id'>
                
                </el-table-column>
                <el-table-column label="项目类别" width="120" class="zxfsh" prop='projectType'>
                </el-table-column>
                <el-table-column label="项目名称" width="120"  prop='projectName'>
                </el-table-column>
                <el-table-column label="项目预估金额" prop="projectMoney">

                </el-table-column>
                <el-table-column label="开始时间" prop="startDate">

                </el-table-column>
                <el-table-column label="结束时间" prop="endDate">

                </el-table-column>
                <el-table-column label="负责人" width="120" prop="chargePerson">

                </el-table-column>
                <el-table-column label="项目简介" width="120" prop="projectDesc">

                </el-table-column>
                <el-table-column label="附件" prop="manufacturers">

                </el-table-column>
                <el-table-column label="提报部门" prop="orgName">

                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="cksp(scope.row)">查看商品</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="商品明细"
            width="96%"
            :visible.sync="suppliercksp"
            append-to-body>
            <el-input v-model="ckmxsearch" style="display: inline-block;width: 36%;borderRight:none;" placeholder="请输入物资名称/规格型号" icon="el-icon-search">
            </el-input>
            <el-table 
                :data="globalGoodsData"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%"  
                >
                <el-table-column prop="goodsClass" label="分类" width="50">
                </el-table-column>
                <el-table-column label="编码" width="50" prop="goodsCode">
                </el-table-column>
                <el-table-column prop="goodsName" label="商品/服务名称" width="120"> </el-table-column>
                <el-table-column prop="goodsmodel" label="规则型号/描述" width="120"> </el-table-column>
                <el-table-column prop="goodsunit" label="单位"> </el-table-column>
                <el-table-column prop="goodsNumber" label="数量"> </el-table-column>
                <el-table-column prop="goodsPrice" label="预估单价"> </el-table-column>
                <el-table-column prop="goodsTotal" label="预估总价"> </el-table-column>
                <el-table-column prop="goodsType" label="类型"> </el-table-column>
                <el-table-column prop="startDate" label="计划实施时间" width="120"> </el-table-column>
                <el-table-column prop="endDate" label="计划交付时间" width="120"> </el-table-column>
                <el-table-column prop="factoryName" label="主机厂家"> </el-table-column>
                <el-table-column prop="technologyDesc" label="技术要求"> </el-table-column>
                <el-table-column prop="remarks" label="备注"> </el-table-column>
            </el-table>
        </el-dialog>
    </el-dialog>
    <!-- 供应商选择 -->
    <el-dialog 
        title="供应商选择" 
        :visible.sync="supplierlist" 
        width=70%>
        <div style="margin-left: 80%;">
            <el-button  type="primary" @click="supplierSave=true">新增供应商</el-button>      
        </div>    
        <div calss="suppliertype" style="margin:4px;"> 
            <span>*供应商类型</span>
            <el-select 
                v-model="gyslex" 
                placeholder="--请选择类型--"
                @change="functionSupplierType()"
                clearable
                @clear='clearDeductionStatus'
                >
                <el-option
                v-for="item in gyslxoptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div style="margin: 20px 0 0 0;">
            <el-input v-model="gysmc" style="display: inline-block;width: 90%;borderRight:none;margin-bottom: 9px" 
            placeholder="请输入供应商名称" @input="searchsupplierName" clearable @clear="clearSearchData" icon="el-icon-search">
            </el-input>
        </div>
        <div class="ztable">
            <el-table 
                :data="tableDatas"
                ref="multipleRef"
                tooltip-effect="dark"
                border
                stripe
                @select="selectTable"
                @select-all="selectAllTable"
                style="width: 100%"  
                @selection-change='selectRows'>
                <el-table-column type="selection" width="80" align="center"></el-table-column>
                <el-table-column label="星级" prop='level'>
                
                </el-table-column>

                <el-table-column label="分值" prop='grade'>
               
                </el-table-column>

                <el-table-column label="供应商名称" prop='cnname'>
                
                </el-table-column>
            </el-table>
            <pagination v-show="suppliertotal>0" :total="suppliertotal" :page.sync="supplierlistQuery.page" :limit.sync="supplierlistQuery.limit" @pagination="supplierPageList" />
        </div>
        <div class="preserve" style="text-align: center;padding: 20px 0;">
            <el-button plain @click="supplierlist=false">取消</el-button>
            <el-button type="primary" plain @click="xzgysqr()">确定</el-button>
        </div>

    </el-dialog>
    <!-- 直接使用供应商明细表 -->
    <el-dialog 
        title="供应商信息表1231" 
        :visible.sync="popgysmc" 
        width=97%>
        <h3 style="font-size: 28px;text-align: center;">供应商信息表</h3>
        <p style="height: 35px;line-height: 35px;background-color:#e8e8e8;padding: 0 10px;">基本信息</p>
        <div class="dialog-footer"  style="width: 100%">      
            <el-row :gutter="24">
                <el-col :span="6">
                    <ul style="line-height: 50px;">
                        <li>企业名称:<span>{{globalSupplierData.createSupplier.cnname}}</span></li>
                        <li>注册资本:<span>{{globalSupplierData.createSupplier.capital}}</span></li>
                        <li>联系人:<span>{{globalSupplierData.createSupplier.contactName}}</span></li>
                        <li>营业执照:<el-button type="text">名称</el-button></li>
                    </ul>
                </el-col>
                <el-col :span="6">
                    <ul style="line-height: 50px;">
                        <li>企业性质:<span>{{globalSupplierData.createSupplier.nature}}</span></li>
                        <li>法定代表人姓名:<span>{{globalSupplierData.createSupplier.contactName}}</span></li>
                        <li>联系电话:<span>{{globalSupplierData.createSupplier.contactPhone}}</span></li>
                        <li>主营业务:<span>{{globalSupplierData.createSupplier.enterpriseDesc}}</span></li>
                    </ul>
                </el-col>
                <el-col :span="6">
                    <ul style="line-height: 50px;">
                        <li>所属行业:<span>{{globalSupplierData.createSupplier.industry}}</span></li>
                        <li>法定代表人身份证:<span>{{globalSupplierData.createSupplier.deputyCode}}</span></li>
                        <li>企业所在地:<span>{{globalSupplierData.createSupplier.enterpriseCountry}}/{{globalSupplierData.createSupplier.enterpriseProvince}}/{{globalSupplierData.createSupplier.enterpriseCity}}/{{globalSupplierData.createSupplier.enterpriseArea}}</span></li>
                    </ul>
                </el-col>
                <el-col :span="6">
                    <ul style="line-height: 50px;">
                        <li>统一社会代码:<span>{{globalSupplierData.createSupplier.enterpriseCode}}</span></li>
                        <li>法人身份证附件:<el-button type="text">身份证</el-button></li>
                        <li>详细地址:<span>{{globalSupplierData.createSupplier.address}}</span></li>
                    </ul>
                </el-col>
            </el-row>
        </div>
        <p style="height: 35px;line-height: 35px;background-color:#e8e8e8;padding: 0 10px;">资质信息</p>
        <div class="dialog-footer"  style="width: 60%;margin-top: 2%;">
            <span>资质类型：</span>   
                <el-table 
                    :data="globalSupplierData.supplierQualifyList"
                    ref="table"
                    tooltip-effect="dark"
                    border
                    stripe
                    style="width: 100%"  
                    >
                    <el-table-column label="资质类型" prop='qualifyType'>
                        
                    </el-table-column>
                    <el-table-column label="资质有效期" prop='qualifyDate'>
                        
                    </el-table-column>
                    <el-table-column label="资质" prop='zzy'>
                        
                    </el-table-column>
                    
                </el-table>

        </div>
        <p style="height: 35px;line-height: 35px;background-color:#e8e8e8;padding: 0 10px;margin-top: 2%;">供货类别</p>
        <div class="dialog-footer"  style="width: 100%;margin-top: 2%;"> 
            <p style="width: 100%;padding: 0 20px;">供应商类型:<span>{{globalSupplierData.createSupplier.supplierType}}</span></p>    
            <div v-for="item in globalSupplierData.supplierTypeList">
                <span>{{item.supplyCommodity}}</span>       
            </div>
        </div>
        <p style="height: 35px;line-height: 35px;background-color:#e8e8e8;padding: 0 10px;margin-top: 2%;">账户信息</p>
        <div class="dialog-footer" style="width: 70%;margin-top: 2%;">
            <span>基本账户</span>
                <el-table 
                :data="globalSupplierData.supplierAccount"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%;margin-left: 3%;"  
                >
                <el-table-column label="开户行名称" prop='openBankName'>
                    
                </el-table-column>

                <el-table-column label="开户行账号" prop='openBankCode'>
                    
                </el-table-column>

                <el-table-column label="银行账号" prop='bankCode'>
                    
                </el-table-column>
                <el-table-column label="支持承兑" prop='isAcceptance'>

                </el-table-column>
                <el-table-column label="设为默认" prop='isDefault'>
                    
                </el-table-column>
                </el-table>        
        </div>
        <div class="dialog-footer" style="margin-top: 2%;width: 70%;">
            <span>一般账户</span>
            <el-table 
                :data="globalSupplierData.supplierAccount"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%;margin-left: 3%;"  
                >
                <el-table-column label="开户行名称" prop='openBankName'>
                    
                </el-table-column>

                <el-table-column label="开户行账号" prop='openBankCode'>
                    
                </el-table-column>

                <el-table-column label="银行账号" prop='bankCode'>
                    
                </el-table-column>
                <el-table-column label="支持承兑" prop='isAcceptance'>
                    
                </el-table-column>
                <el-table-column label="设为默认" prop='isDefault'>
                    
                </el-table-column>
            </el-table>

        </div>
        <p style="height: 35px;line-height: 35px;background-color:#e8e8e8;padding: 0 10px;margin-top: 3%;">邮箱信息</p>
        <div class="dialog-footer"  style="width: 70%"> 
            <el-table 
            :data="globalSupplierData.supplierPostbox"
            ref="table"
            tooltip-effect="dark"
            border
            stripe
            style="width: 100%;margin-top: 2%;margin-left: 3%;"  
            >  
            <el-table-column label="邮箱账号" prop='emailAccount'>
                
            </el-table-column>    
            <el-table-column label="邮箱联系人" prop='emailContract'>
                
            </el-table-column>

            <el-table-column label="联系电话" prop='telephone'>
                
            </el-table-column>
            
            </el-table>
        
        </div>
    </el-dialog>
    <!-- 新增供应商 -->
    <el-dialog 
        title="新增供应商" 
        :visible.sync="supplierSave" 
        width="98%">
            <SupplierAdd></SupplierAdd>
            <div style="text-align: center;">
                <el-button @click="supplierSaveOrUpdate = false">取消</el-button>
                <el-button type="primary" @click="suppliers">提交审核</el-button>
            </div>
    </el-dialog>

    <!-- 新增供应商详情弹框 -->
    <el-dialog
        title="提示"
        :visible.sync="isShow"
        width="97%">
    <SupplierDetail :supplierId="supplierId"></SupplierDetail>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="isShow = false">确 定</el-button>
        </span>
    </el-dialog>
    </div>
    
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import  Navbar from '@/views/layout/components/Navbar'//导航
import  SupplierAdd from '@/components/supplierAdd/index'// 新增供应商
import  SupplierDetail from '@/components/SupplierDetail/index'// 新增供应商
import VDistpicker from 'v-distpicker'
import { getAjax, postAjaxx, postAjaxJson } from '@/utils/ajaxRequest'
export default {
    name: 'HomeHeader',
    components:{
        Pagination,
        Navbar,
        VDistpicker,
        SupplierAdd,
        SupplierDetail
    },
    data() {
      return {
          listQuery: {
              page: 1,
              limit: 10
          },
          supplierlistQuery:{
              page: 1,
              limit: 10
          },
          total: 0,
          suppliertotal:0,
          elForm: {},
          temp: {
              userId: ''
          },
          userArr: [],
          isShow: false,
          recommend: '供应商推荐',
          search: '',
          ckmxsearch: '',
          gyslex: '',
          gyslxoptions: [],
          gysmc: '',
          globalData: {
              apply: {},
          },
        //  选择年份
          chooseYear: '',
          //定义data数据
          placeholders: {
              province: '--- 省 ---',
              city: '--- 市 ---',
              area: '--- 区 ---',
          },
        // 虚拟表格查看详情弹框计划名称字段
        Project:{
            jhmc:'4月生产物资计划',
            sqr:'王华',
            sqsj:'2020-12-12'
        },
        // 选择年度
        options1: [{
          id: '1',
          label: '2020'
        }, {
          id: '2',
          label: '2019'
        }],
        // 选择年度计划类型
        options2: [],
        value2: [],
        ydzxjhtk: false, //添加商品
        supplierlist:  false,
        supplierSave:  false,
        supplierSaveOrUpdate: false,
        tabs:false,//虚拟表格
        ckxq:false,//查看详情
        suppliercksp:false,//查看详情里面商品
        xzgys:false,//选择供应商确认按钮
        open:false,//供货类别弹框
        popgysmc:false,//供应商名称弹框
        booler:false,//供货类别隐藏显示
        a:[],
        // 下拉框验证
        ruleForm: {
            region:'',
            typelb:''
        },
        // 验证下拉框
        rules: {
            userId: [
                { required: true, message: '请选择下一步审核人', trigger: 'change' }
            ]
        },
        
        //选择计划表格
        tableData:[
            {
                prices:''
            }
        ],
        // 虚拟表格
        NewTables:[],
        //虚拟表格查看详情表格
        cktableData:[
            {
                addggxh:'2'
            },
            {
                addggxh:'3'
            }
        ],
        //虚拟表格查看详情查看商品明细表格
        sucktableData:[
            {

            }
        ],
        // 选择供应商虚拟表格
        xzgysbg:[],
        //供应商选择表格
        tableDatas:[],

        items:[
            {

            }
        ],

        items:[
            {

            }
        ],
        // 新增供应商表单
        ruleFormxzgys:{
            qyName:'',//企业名称
            region:'',
            business:'',
            zzlx:'',//资质类型
            gyslx:'',//供应商类型
            xztype:'',//选择供货类别
            xztype1:'',//选择供货类别商品
            xztype2:'',//选择供货类别进口
            xztype3:'',//选择供货类别结构
            zccd:'',//基本账户
            Ybzhzccd:'',//支持承兑
            jbresource:'',//基本账户默认
            Ybzhresource:'',//一般账户设为默认
            email:'',//邮箱信息
            bioage:{

            },
            //新增供应商资质类型表格
            qualification:[
                {
                    zzyxq:'',
                    validity:''
                },
            
            ],      
            //选择供货类别表格
            categoryTable:[ 
                {
                    jtlb:'艾柯夫采煤机及配件'
                },
                {
                    jtlb:'煤矿进口配件'
                },
                {
                    jtlb:'久益综连采设备零星配件'
                }
            ],
            // 基本账户表格
            zhxxTable:[
                {
                    backName:'',//开户行名称
                    khhAccout:'',//开户行账号
                    yhzh:'',//银行账号
                }
            ],
            // 一般账户表格
            ybzhTable:[
                {
                    ybzhName:'',
                    ybzhAccout:'',
                    Ybzhyhzh:'',
                },
                {
                    ybzhName:'',
                    ybzhAccout:'',
                    Ybzhyhzh:'',
                }
            ],
            // 邮箱信息表格
            MailTable:[
                {
                    email:''
                }
            ]
            
        },
        // 供应商明细表资质信息表格
        gysxxbcation:[
            {
                priceszzlx:''
            }
        ],
        // 供应商明细表账户信息基本账户表格
        zhxxTables:[
            {

            }
        ],
        // 供应商明细表账户信息一般账户表格
        ybzhTables:[
            {

            }
        ],
        // 供应商明细表邮箱信息表格
        MailTables:[
            {

            }
        ],
        // 资质类型下拉框
        options:[
            {   id:'1',
                label:'1'
            }
        ],
        // 供应商类型下拉框
        optionsgys:[
            {   id:'1',
                label:'代理商'
            },
            {   id:'2',
                label:'经销商'
            },
            {   id:'3',
                label:'生产商'
            }
        ],
        // 企业性质下拉选择
        xzqyxz:[
            {
                id:'1',
                label:'1'
            },
            {
                id:'2',
                label:'2'
            }
        ],
        // 所属行业下拉选择
        sshy:[
            {
                id:'1',
                label:'1'
            },
            {
                id:'2',
                label:'2'
            }
        ],
        // 选择供货类别设备下拉
        optionslb:[
            {
                id:'1',
                label:'车辆设备'
            },
            {
                id:'2',
                label:'木材'
            }
        ],
        // 选择供货类别设备物资下拉  
        optionslb1:[
            {
                id:'1',
                label:'九益、艾科夫采煤机、连采机、梭车'
            },
            {
                id:'2',
                label:'国产连采机、锚杆机、破碎机、掘进机'
            }
        ],
        // 选择供货类别设备物资下拉  
        optionslb2:[
            {
                id:'1',
                label:'进口部分'
            },
            {
                id:'2',
                label:'国产化部分'
            }
        ],
        // 选择供货类别设备物资下拉  
        optionslb3:[
            {
                id:'1',
                label:'结构件'
            },
            {
                id:'2',
                label:'电器件'
            }
        ],
        globalGoodsData: [],
        createUser: '',
        orgId: '',
        orgName: '',
        supplierId: '',
        globalSupplierData: {
            createSupplier: {},
            supplierQualifyList: [],
            supplierTypeList: [],
            supplierPostbox: [],
            supplierAccount: []
        },
        examineUserMsg: {},
        applyUser: ''
      }
    },
    created() {
        postAjaxJson(`http://61.134.63.231:9090/process-service/userTask/getFirstExaminePerson/gysshlc`).then(res => {
            if(res.code == 0) {
            this.userArr = res.data;
            console.log(this.userArr)
            }
        });
        this.createUser = window.sessionStorage.getItem('userId')
        this.applyUser = window.sessionStorage.getItem('userId')
        this.orgId = window.sessionStorage.getItem('orgId')
        this.orgName = window.sessionStorage.getItem('orgName')
        // 获取计划列表数据
        // this.getPlanDataList()
        // 获取计划类别数据
        this.getPlanTypeList()
        // 查询供应商列表数据
        // this.getSupplierList()
    },
    methods: {
        // 选择审核人信息
        selectExamineUser(e) {
            this.userArr.forEach(item => {
                if(item.id === e) {
                    item.userId = e
                    item.deploymentKey = 'gysshlc'
                    this.examineUserMsg = item
                }
            })
        },
        clearFunction() {
            this.getPlanTypeList()
        },
        //查询供应商类型
        findsupplierTypeList(){
            getAjax(`/api/planmanagementService/SupplierRecommendation/findSupplierTypeList`).then(res => {
                this.gyslxoptions = res.data
            })
        },
        supplierPageList(){
            var param = {
					pageNumber: this.supplierlistQuery.page - 1,
					pageSize: this.supplierlistQuery.limit,
					name: this.gysmc,
					membertype: this.gyslex,
            };
            getAjax(`/api/planmanagementService/SupplierRecommendation/findSupplierList`,param).then(res => {
                console.log(res)
                this.tableDatas = res.data.data.content
                this.suppliertotal = res.data.data.totalElements;
            })
        },
        //根据供应商名称查询供应商
        searchsupplierName(){
            var param = {
					pageNumber: this.supplierlistQuery.page - 1,
					pageSize: this.supplierlistQuery.limit,
					name: this.gysmc,
					membertype: this.gyslex,
			};
            getAjax(`/api/planmanagementService/SupplierRecommendation/findSupplierList`,param).then(res => {
                console.log(res)
                this.tableDatas = res.data.data.content
                this.suppliertotal = res.data.data.totalElements;
            })
        },
        // 新增选择
        directSelection(id) {
            this.isShow = true
            this.supplierId = id
        },
        // 直接使用
        newlyAdded(id) {
            getAjax(`/api/planmanagementService/SupplierRecommendation/SupplierSelectedList?supplierIds=${id}`).then(res => {
                console.log(res)
                this.globalSupplierData = res.data
                this.popgysmc = true
            })
        },
        seleectRowChange() {},
        selectTable(selection, row) {
            console.log('当用户手动勾选数据行的 Checkbox 时触发的事件', selection, row)
            // 选择项大于2时
            if (selection.length > 3) {
                let del_row = selection.shift();
                // console.log('把数组的第一个元素从其中删除后e799bee5baa6e997aee7ad94e58685e5aeb931333433616137', selection);
                this.$refs.multipleRef.toggleRowSelection(del_row, false);
            }
        },
        selectAllTable(selection) {
            console.log('当用户手动勾选全选 Checkbox 时触发的事件', selection)
            // 选择项大于2时
            if (selection.length > 3) {
                selection.length = 3;
            }
        },
        select(selection, row) {
            console.log('当用户手动勾选数据行的 Checkbox 时触发的事件', selection, row)
            // 选择项大于2时
            if (selection.length > 1) {
                let del_row = selection.shift();
                // console.log('把数组的第一个元素从其中删除后e799bee5baa6e997aee7ad94e58685e5aeb931333433616137', selection);
                this.$refs.multipleTable.toggleRowSelection(del_row, false);
            }
        },
        selectAll(selection) {
            console.log('当用户手动勾选全选 Checkbox 时触发的事件', selection)
            // 选择项大于2时
            if (selection.length > 1) {
                selection.length = 1;
            }
        },
        onSubmit(data) {
            this.$refs['ruleForm'].validate((valid) => {
                if (!valid) {
                    return this.$message('请输入必填字段')
                }
                if(this.NewTables.length == 0) {
                    return this.$message('请选择计划')
                }
                if(this.xzgysbg.length == 0) {
                    return this.$message('请选择供应商')
                }
                var obj = {
                    "planApply": {
                        "applyDate": "",
                        "applyRecord": "",
                        "applyState": "",
                        "applyType": "",
                        "applyUsername": "",
                        "applyresult": "",
                        "createDate": "",
                        "createUser": "",
                        "deleteDate": "",
                        "deleteUser": "",
                        "flowId": "",
                        "formId": "",
                        "id": "",
                        "orgId": "",
                        "orgName": "",
                        "orgType": "",
                        "planClass": "",
                        "raskMark": "",
                        "remarks": "",
                        "title": "",
                        "updateDate": "",
                        "updateUser": "",
                        "useable": ""
                    },
                    "supplierList": [
                        {
                            "applyId": "",
                            "createDate": "",
                            "createUser": "",
                            "deleteDate": "",
                            "deleteUser": "",
                            "id": "",
                            "implementId": "",
                            "remarks": "",
                            "serialnumber": "",
                            "supplierKey": "",
                            "supplierName": "",
                            "supplierSelectType": "",
                            "supplierType": "",
                            "updateDate": "",
                            "updateUser": "",
                            "useable": ""
                        }
                    ],
                    "startWorkflowParameterVo": {
                        "assigneeExpressionText": "",
                        "departId": "",
                        "deploymentKey": "",
                        "id": "",
                        "name": "",
                        "userId": ""
                    }
                }
                if(data === '1') {
                    obj.planApply.applyState = '1'
                }else if(data === '2') {
                    obj.planApply.applyState = '2'
                }
                obj.startWorkflowParameterVo = this.examineUserMsg

                obj.planApply.applyType = '初始'
                obj.planApply.applyUsername = this.applyUser
                obj.planApply.createUser = this.createUser
                obj.planApply.planClass = '实施计划'
                obj.planApply.updateUser = this.createUser
                obj.planApply.orgName = this.orgName
                obj.planApply.orgId = this.orgId
                obj.planApply.updateUser = this.createUser
                obj.planApply.formName = '供应商推荐'
                obj.planApply.formId = '123'
                obj.planApply.raskMark = '123'
                obj.planApply.title = this.recommend

                this.xzgysbg.forEach(item => {
                    item.createUser = this.createUser
                    item.updateUser = this.createUser
                    item.implementId = this.NewTables[0].projectid
                    item.supplierKey = item.id
                    item.supplierName = item.cnname
                    item.supplierSelectType = item.selectType
                    item.supplierType = item.membertype
                })
                obj.supplierList = this.xzgysbg
                console.log(obj)
                postAjaxx("/api/planmanagementService/SupplierRecommendation/addSupplierApply", JSON.stringify(obj)).then(res => {
                    if (res.code == '0') {
                        console.log(res)
                        this.$message(res.message)
                        this.$router.push('/home')
                        this.$emit('submit', "123");
                    } else {
                        this.$message(res.message);
                    }
                });
            })
        },
        getSupplierList() {
            this.xzgys = false
            this.supplierlist = true
            this.findsupplierTypeList()
            var param = {
					pageNumber: this.supplierlistQuery.page - 1,
					pageSize: this.supplierlistQuery.limit,
					name: this.gysmc,
					membertype: this.gyslex,
            };
            getAjax(`/api/planmanagementService/SupplierRecommendation/findSupplierList`,param).then(res => {
                console.log(res)
                this.tableDatas = res.data.data.content
                this.suppliertotal = res.data.data.totalElements;
            })
            // getAjax(`/api/planmanagementService/SupplierRecommendation/findSupplierList?name=&pageNumber=1&pageSize=10`).then(res => {
            //     console.log(res)
            //     this.tableDatas = res.data.data.content
            // })
        },
        getPlanTypeList() {
            getAjax(`/api/planmanagementService/planFrom/listNotClass`).then(res => {
                console.log(res)
                this.options2 = res.data
            })
        },
        getPlanDataList() {
            this.tabs = false
            getAjax(`/api/planmanagementService/SupplierRecommendation/findSupplierSelectPlanList?title=&formId=${this.ruleForm.typelb}&pageNumber=${this.listQuery.page - 1}&pageSize=${this.listQuery.limit}&planType=&year=${this.chooseYear}`).then(res => {
                console.log(res)
                this.tableData = res.data.content
                this.total = res.data.totalElements
                this.ydzxjhtk = true
            })
        },
        // 选择计划确认按钮
        save(){
            this.tabs=true
            this.ydzxjhtk=false
        },
        //虚拟表格查看详情
        compile(row){
            this.ckxq=true
            getAjax(`/api/planmanagementService/PlanProjectSelect/findPlandetailsById?applyId=${row}`).then(res => {
                console.log(res)
                this.globalData = res.data
                this.globalData.project.forEach(item => {
                    item.orgName = this.globalData.apply.orgName
                })

            })
            console.log(row)
        },
        //虚拟表格查看详情查看商品
        cksp(row){
            this.suppliercksp=true
            getAjax(`/api/planmanagementService/PlanProjectSelect/findProjectGoodsdetailsById?applyId=${this.globalData.apply.id}&projectId=${row.id}`).then(res => {
                this.globalGoodsData = res.data.goods
            })
        },
        // 选择年度下拉框
        function1(id){
            console.log(id)
        },
        // 选择年度计划下拉框
        function2(id){
            console.log(id)
        },
        //供应商类型下拉框
        functionSupplierType(id){
            var param = {
					pageNumber: this.supplierlistQuery.page - 1,
					pageSize: this.supplierlistQuery.limit,
					name: this.gysmc,
					membertype: this.gyslex,
			};
            getAjax(`/api/planmanagementService/SupplierRecommendation/findSupplierList`,param).then(res => {
                console.log(res)
                this.tableDatas = res.data.data.content
                this.suppliertotal = res.data.data.totalElements;
            })
        },
        clearDeductionStatus(id){
            var param = {
					pageNumber: this.supplierlistQuery.page - 1,
					pageSize: this.supplierlistQuery.limit,
					name: this.gysmc,
					membertype: this.gyslex,
			};
            getAjax(`/api/planmanagementService/SupplierRecommendation/findSupplierList`,param).then(res => {
                console.log(res)
                this.tableDatas = res.data.data.content
                this.suppliertotal = res.data.data.totalElements;
            })
        },
        // 选择供应商虚拟表格删除行
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        // 点击弹出三级联动
        toAddress(){
          console.log(111)
          this.mask = true;
          this.addInp = true;
        },
        //新增供应商提交
        suppliers(){
            this.supplierSave=false
            this.xzgys=true 
            console.log(item.gysmc)
            
        },
        // 选择计划表格单选
        selectRow(row){ 
            this.NewTables = row
        },
        // 选择供应商表格单选
        selectRows(row){
            this.xzgysbg = row
        },
        //选择供应商确认按钮
        xzgysqr(){  
            this.xzgys=true
            this.supplierlist=false
            // this.xzgysbg[i].gysmc
            // this.xzgysbg.forEach(element => {
            //     element.gysmc=this.a
            //     console.log(element.gysmc)
            // })
        },
        //选择供货类别确认按钮
        xzgyslb(){
            this.open=false
            this.booler=true
            console.log(this.ruleFormxzgys) 
        }, 
        // 选择供货类别表格可以多选
        selectRowsxzghlb(item){
            this.ruleFormxzgys.bioage=item
            // console.log(this.ruleFormxzgys.bioage)
        },
        // 选择计划表格单选
        // selectRow(row){ 
        //     console.log(row)
        // },

        //选择供货类别确认按钮
        xzgyslb(){
            this.open=false
            this.booler=true
            console.log(this.ruleFormxzgys) 
        }, 
        // 选择供货类别表格可以多选
        selectRowsxzghlb(item){
            this.ruleFormxzgys.bioage=item
            // console.log(this.ruleFormxzgys.bioage)
        },
        // 省市区三级联动
        selected: function(data) {
          this.citydata = data.province.value+',' + data.city.value +','+data.area.value;
          console.log(this.citydata);
        },
        //附件的增加行
        accessoryaddRow(){
            var list = {
                rowNum: '',
                zzlx:this.zzlx,
                validity:this.validity,
                }
                this.ruleFormxzgys.qualification.unshift(list)
        },
        //附件的删除行
        removeDomain() {
            var index = this.ruleFormxzgys.qualification.indexOf()
            this.ruleFormxzgys.qualification.splice(index)
        },
        //一般账户附件的增加行
        YbzhaccessoryaddRow(){
            var list = {
                rowNum: '',
                zzlx:this.zzlx,
                validity:this.validity,
                }
                this.ruleFormxzgys.ybzhTable.unshift(list)
        },
        //一般账户附件的删除行
        YbzhremoveDomain() {
            var index = this.ruleFormxzgys.ybzhTable.indexOf()
            this.ruleFormxzgys.ybzhTable.splice(index)
        },
        //邮箱的增加行
        EmainaccessoryaddRow(){
            var list = {
                rowNum: '',
                zzlx:this.zzlx,
                validity:this.validity,
                }
                this.ruleFormxzgys.MailTable.unshift(list)
        },
        //邮箱的删除行
        EmainremoveDomain() {
            var index = this.ruleFormxzgys.MailTable.indexOf()
            this.ruleFormxzgys.MailTable.splice(index)
        },
        // 表格计算求和
        getSummaries (param) {
            const { columns, data } = param
            const sums = []
            columns.forEach((column, index) => {
                if (index === 0) {
                sums[index] = '计划总金额'
                } else if (index === 3) {
                const values = data.map(item => Number(item[column.property]))
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr)
                    if (!isNaN(value)) {
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
    },
    
}
</script>
<style scoped>
    .main>span  {
      padding: 0 30px;
    }
    .content{
     width: 90%;
     margin: 10px auto;
     min-height: 500px;
 }
 .content>h3{
     text-align: center;
     margin: 40px 0;
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
.content .main{
    margin-top: 0px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    }
.main>.el-button {

    margin-left: 1000px;
    margin-top: -43px;
    display: flex;
    justify-content: flex-end;
}
.supplier{
    padding-left: 1%; 
}
.supplier>span {
padding: 0 143px; 
}
.supplier>.el-button {
    margin-left: -112px;
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
 .dialog-footer{
    display: flex;
    justify-content: space-around;
 }
 .el-form-item{
    margin-top: 3%;
 }
 .el-form{
    width: 100%;
 }
 .upload-demo{
    display: flex;
 }
.el-row{
    width: 100%;
 }
</style>