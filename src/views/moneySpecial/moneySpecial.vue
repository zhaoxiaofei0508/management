<template>
  <div style="padding:20px;">
     <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>创建计划</el-breadcrumb-item>
		</el-breadcrumb>
    <div class="content">
        <div class="content_top">
            <p>
            标题:
            <input type="text" v-model="biaoti" placeholder="月度专项资金计划" />
            </p>
            <p>
            流程:
            <span @click="showModal=true" class="btn">查看流程图</span>
            </p>
        </div>
        <h3>{{formName}}</h3>
        <div class="essential_top">
            <p>基本信息</p>
            <ul>
            <li>
                申请人:
                <span class="usname">{{userName}}</span>
                <i class="iconfont icon-user-3"></i>
            </li>
            <li>
                申请部门:
                <span class="usname">{{orgName}}</span>
                <i class="iconfont icon-bumen"></i>
            </li>
            <li>
                申请时间:
                <span>{{applyDate}}</span>
            </li>
            </ul>
        </div>
        <div class="essential_top">
            <p>计划信息</p>
        </div>
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item
                    label="基本信息"
                    prop="region"
                    >
                    <el-select
                        v-model="ruleForm.region"
                        placeholder="请选择计划年度"
                        @change="function1"
                        >
                        <el-option
                            v-for="item in options1"
                            :key="item.id"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                    <el-select v-model="ruleForm.type" placeholder="请选择计划类别" @change="function2">
                        <el-option
                            v-for="item in options2"
                            :key="item.id"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                    <el-select v-model="ruleForm.plan" placeholder="请选择是否核准制" @change="fun1">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                    <el-button type="primary" style="margin-left: 15%;" @click="selectProject()" >选择项目</el-button>
                </el-form-item>
                <div v-if="tabs" style="display: flex;margin-top: 2%;">
                    <el-table
                        :data="NewTables"
                        width='100%'
                        >
                        <el-table-column property="projectNo" label="项目编码"  align="center"></el-table-column>
                        <el-table-column property="projectType" label="项目类别"  align="center"></el-table-column>
                        <el-table-column property="projectName" label="项目名称"  align="center"></el-table-column>
                        <el-table-column property="projectMoney" label="项目预估金额"  align="center"></el-table-column>
                        <el-table-column property="startDate" label="开始时间"  align="center"></el-table-column>
                        <el-table-column property="endDate" label="结束时间"  align="center"></el-table-column>
                        <el-table-column property="chargePerson" label="负责人"  align="center"></el-table-column>
                        <el-table-column property="projectDesc" label="项目简介" align="center" ></el-table-column>
                        <el-table-column property="filePath" label="附件" align="center" ></el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="compile(scope.row)">查看商品</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class='essential_top'>
                    <el-form-item
                        label="立项说明"
                        prop="lxsm"
                        >
                        <textarea v-model="ruleForm.lxsm"  size='medium' class="inputs"></textarea>
                    </el-form-item>
                    <el-form-item
                        label="费用说明"
                        prop="fysm"
                        >
                        <textarea v-model="ruleForm.fysm"  size='medium' class="inputf"></textarea>
                    </el-form-item>
                    <div class="table">
                        <span>附件</span>
                        <el-table
                            :data="tableData"
                            slot="empty"
                            border
                            style="width: 62%"
                            >
                            <el-table-column
                            type="index"
                            label="序号"
                            width="150"
                            align='center'
                            >
                            </el-table-column>
                            <el-table-column
                            prop="usname"
                            label="附件名称"
                            width="150"
                            align='center'>
                                <template slot-scope="scope">
                                    <span v-if="xmjys">项目建议书</span>
                                    <span v-if="bxjswd">编写技术文档</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="city"
                            label="上传"
                            width="200"
                            align='center'>
                            <template slot-scope="scope">
                                <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-change="handleChange">
                                    <el-button size="small" type="primary" class="buttons">点击上传</el-button>
                                </el-upload>
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="编辑"
                                width="150"
                                align='center'>
                                <template slot-scope="scope">
                                    <el-button type="text">在线编辑</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            width="150"
                            align='center'>
                            <template slot-scope="scope">
                                <el-button @click.prevent="accessoryaddRow()" type="text" size="small">增加</el-button>
                                <el-button type="text" size="small" @click.prevent="removeDomain()">删除</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="bottom">
            <span>取消</span>
            <span @click="bccg">保存草稿</span>
            <span @click="audit">提交审核</span>
        </div>
    </div>
    <!-- 查看物资 -->
    <el-dialog
        title="物资明细"
        :visible.sync="dialogTableVisibles"
        width=98%>
        <el-input v-model="search" style="display: inline-block;width: 36%;borderRight:none;" placeholder="请输入搜索内容" icon="el-icon-search">
        </el-input>
        <div class="ztable">
            <el-table
                :data="cktableData"
                ref="table"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%"
                >
                <el-table-column label="分类" width="80" align="center" prop='goodsClass'>
                </el-table-column>
                <el-table-column  label="编码" align="center" width="80" prop='goodsCode'>

                </el-table-column>
                <el-table-column label="商品/服务名称" width="120" class="zxfsh" prop='goodsName'>
                </el-table-column>
                <el-table-column label="规则型号/描述" width="120"  prop='goodsModel'>
                </el-table-column>
                <el-table-column prop="goodsunit" label="单位" width="60">

                </el-table-column>
                <el-table-column label="数量" width="60" prop="goodsNumber">

                </el-table-column>
                <el-table-column label="预估单价" prop="goodsPrice">

                </el-table-column>
                <el-table-column label="预估总价" prop="goodsTotal">

                </el-table-column>
                <el-table-column label="类型" prop="goodsType">

                </el-table-column>
                <el-table-column label="计划实施时间" width="120" prop="startDate">

                </el-table-column>
                <el-table-column label="计划交付时间" width="120" prop="endDate">

                </el-table-column>
                <el-table-column label="主机厂家" prop="factoryName">

                </el-table-column>
                <el-table-column label="技术要求" prop="technologyDesc">

                </el-table-column>
                <el-table-column label="备注" prop="remarks">

                </el-table-column>
            </el-table>
        </div>
    </el-dialog>
    <!-- 选择项目 -->
    <el-dialog
      title="项目选择"
      :visible.sync="ydzxjhtk"
      width="90%"
      :before-close="handleClose"
      >
      <el-row :gutter="20">
        <el-col :span="5">
          <div style="margin-bottom: 10px;">项目选择(单选)</div>
          <div class="selectContract">
            <el-tree
                :data="treeData"
                show-checkbox
                :props="defaultProps"
                node-key="id"
                ref="treeForm"
                check-strictly
                @node-click="getGoods"
                @check-change="handleNodeClick"
                >
            </el-tree>
          </div>
        </el-col>
        <el-col :span="4">
          <i class="el-icon-plus iconOrderSelect"></i>
        </el-col>
        <el-col :span="15">
          <div style="margin-bottom: 10px;">物资名称（可多选）</div>
          <el-input v-model="search" style="display: inline-block;width: 36%;borderRight:none;margin-bottom: 5px;" placeholder="请输入搜索内容" icon="el-icon-search"></el-input>
          <div class="materialMsg">
            <el-table
              border
              :data="materialTableData"
              style="width: 100%;margin:20px 0;"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" align="center" width="55">
              </el-table-column>
              <el-table-column align="center" prop="goodsName" label="物资名称"></el-table-column>
              <el-table-column align="center" prop="goodsModel" label="规格型号"></el-table-column>
              <el-table-column align="center" prop="goodsPrice" label="预估单价"></el-table-column>
              <el-table-column align="center" prop="goodsNumber" label="数量"></el-table-column>
              <el-table-column align="center" prop="goodsTotal" label="预估总价"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div style="text-align: center;margin-top: 3%;">
        <el-button @click="ydzxjhtk= false">取 消</el-button>
        <el-button type="primary" @click="comfigselectVisible">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { postAjaxJson ,postAjax, getAjax} from '@/utils/ajaxRequest'
import Navbar from "@/views/layout/components/Navbar";
import { parseTime } from "@/utils"
export default {
  components: {
    Navbar
  },
  data() {
    return {
        formName:'',
        biaoti:'',//标题
        userName:'申请人',
        orgName:'掘进中心',
        applyDate:"2020-04-27",
        search:"",
        //fysm:"",
        //lxsm:"",
        vars:{
          "dept":"中心"
        },
        // 验证表单
        ruleForm: {
          region: '',//计划年度
          type:'',//资金类型
          category:'',//项目类别
          plan:'',//计划类型
          lxsm:"",
          fysm:""
        },
        "planProjectParamVo":{
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
        		"formId": "3417924c63914857849157bf0c665e6c",
        		"id": "",
        		"orgId": "",
        		"orgName": "",
        		"orgType": "",
        		"planClass": "",
        		"raskMark": "",
        		"remarks": "",
        		"title": "月度专项资金实施计划",
        		"updateDate": "",
        		"updateUser": "",
        		"useable": ""
        	},
        	"planCollect": {
        		"formId": "3417924c63914857849157bf0c665e6c",
        	},
        	"planCollectplanList": [
        	],
        	"planImplement": {
        		"formId": "3417924c63914857849157bf0c665e6c",
            "planDesc":"",
            "chargeDesc":"",
            "fundsType":""
        	},
        	"planImplementprojectVoList": [
        		{
        			"planAnnexfileList": [
        				{
        					"annexChinaName": "",
        					"annexFileType": "",
        					"createDate": "",
        					"createUser": "",
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
        			],
        			"planImplementGoodsList": [
        			],
        			"planImplementproject": {
        			}
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
        },
        // Namebgsm:'',//立项说明
        ydzxjhtk:false,//选择项目弹框
        region:'',//计划时间下拉初始值
        type:'',//计划资金类型下拉初始值
        category:'',//计划项目类别下拉初始值
        plan:'',//计划类型下拉初始值
        booler:false,//计划内选择项目按钮的隐藏显示
        projectNane:false,//计划外项目新增的隐藏显示
        tabs:false,//计划内选择项目确认按钮隐藏显示表格
        dialogTableVisibles: false, //查看物资虚拟表格
        // 项目选择树形结构
        checkedId: '',
        treeData: [{
          id: 1,
          label: '煤矿安全避险“六大系统”',
          children: [{
            id: 4,
            label: '二级 1-1',

          }]
        }, {
          id: 2,
          label: '配备和更新现场作业人员安全防护用品',
          children: [{
            id: 5,
            label: '设备维修项目'
          }, {
            id: 6,
            label: '安全项目'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

        // 计划时间选择下拉框
        options1: [],
        // 计划资金类型选择下拉框
        options2: [],
        //选择项目弹框表格
        materialTableData:[

        ],
        // 验证下拉框
        rules: {
          // region: [
          //   { required: true, message: '请选择计划时间', trigger: 'change' }
          // ],
          // type: [
          //   { required: true, message: '请选择计划类型', trigger: 'change' }
          // ],
          // category: [
          //   { required: true, message: '请选择项目类别', trigger: 'change' }
          // ],
          lxsm: [
            { required: true, message: '请选择立项说明', trigger: 'change' }
          ],
          
          fysm: [
            { required: true, message: '请输入费用说明', trigger: 'change' }
          ],
        },

        //计划内选择项目的表格
        gridData: [
            {

            },
            {

            }
        ],
        //选择项目虚拟表格
        NewTables:[
        ],
        //附件表格数据
        tableData:[
            {
                fileName:''
            }
        ],
        xmjys:false,//附件名称显示隐藏
        bxjswd:false,//附件名称显示隐藏
        //选择项目查看商品表格数据
        cktableData:[
        ]
    };
  },
  methods: {
    handleClose(){},
    //某某年资金计划下拉框
    function1(val){
        console.log(val)
    },
    //计划资金类型下拉框
    function2(val){
        console.log(val)
    },
    //计划类型下拉框
    fun1(val){
        if(val === '1'){
            this.xmjys=true
            this.bxjswd=false
        }else if(val === '2'){
            this.bxjswd=true
            this.xmjys=false
        }
        console.log(val)
    },
    // 选择项目表格确认按钮
    comfigselectVisible(row){
        this.ydzxjhtk=false
        this.tabs=true
    },
    // 选择项目虚拟表格查看商品弹框
    compile(row){
      this.dialogTableVisibles=true
    },
    // 选择项目单选
    handleNodeClick(data, checked, node) {
      getAjax("/api/planmanagementService/approval/findProjectById/"+ data.id).then(res => {
        var project = {}
          project.projectNo = res.data.projectNumber
          project.projectType = res.data.projectType
          project.projectName = res.data.projectName
          project.projectMoney = res.data.projectMoney
          project.startDate = res.data.startDate
          project.endDate = res.data.endDate
          project.chargePerson = res.data.chargePerson
          project.projectDesc = res.data.projectDesc
          project.filePath = res.data.filePath
          this.NewTables.push(project)
          this.planProjectParamVo.planImplementprojectVoList[0].planImplementproject = project;
      });
      if(checked === true) {
          this.checkedId = data.id;
          this.$refs.treeForm.setCheckedKeys([data.id]);
          console.log(this.checkedId)
      } else {
          if (this.checkedId == data.id) {
              this.$refs.treeForm.setCheckedKeys([data.id]);
          }
      }
    },
    //选择项目对应物资表格点击当前索引事件
    handleSelectionChange(row){
      this.planProjectParamVo.planImplementprojectVoList[0].planImplementGoodsList = [];
      row.forEach(item => {
        this.cktableData.push(item)
        this.planProjectParamVo.planImplementprojectVoList[0].planImplementGoodsList.push(item);
      });
    },
    // 获取表格选中时的数据
    selectRow (val) {
      this.selectlistRow = val
    },
    //上传文件
    handleChange(file, fileList) {//点击上传
        this.fileList = fileList.slice(-3);
    },
    //附件的增加行
    accessoryaddRow(){
      var list = {
        rowNum: '',
        fileName: this.fileName,
        // loveer: this.loveer
        }
        this.tableData.unshift(list)
    },
    // 附件的删除行
    removeDomain() {
      var index = this.tableData.indexOf()
      this.tableData.splice(index)
    },
    //保存草稿提交按钮
    bccg(ruleForm){
        console.log(this.planProjectParamVo)
        this.planProjectParamVo.planImplement.planDesc = this.ruleForm.lxsm;
        this.planProjectParamVo.planImplement.chargeDesc = this.ruleForm.fysm;
        postAjaxJson("/api/planmanagementService/PlanProjectSelect/addPlanProjectApply",this.planProjectParamVo).then(res => {
          console.log(res)
            if(res.code == 0){
              this.$router.push('/home')
              this.$message(res.message)
            }
        });
    },
    // 提交审核按钮
    audit(ruleForm){
      this.$refs['ruleForm'].validate((valid) => {
        if(valid) {
          if(this.NewTables.length == 0){
            return this.$message('请选择项目')
          }
        this.planProjectParamVo.planImplement.planDesc = this.ruleForm.lxsm;
        this.planProjectParamVo.planImplement.chargeDesc = this.ruleForm.fysm;
        this.planProjectParamVo.planImplement.fundsType = this.ruleForm.type
        
       postAjaxJson("/api/planmanagementService/activeStartSubmitCon/monthSpeSaveExmine",this.planProjectParamVo).then(res => {
          console.log(res)
            if(res.code == 0){
              this.$router.push('/home')
              this.$message(res.message)
            }
        });
        }
      })
    },
    selectProject(){
      if(this.ruleForm.region == ''){
        this.$message("请选择计划年度")
      }else if(this.ruleForm.type == ''){
        this.$message("请选择计划类别")
      }else{
        this.ydzxjhtk = true;
        var data = {"belongYear":this.ruleForm.region,"planType":this.ruleForm.type};
          postAjax("/api/planmanagementService/approval/findGoodsByPlanAndType",data).then(res => {
            console.log(res)
            this.treeData = res.data
          });
      }
    },
    getGoods(row){
      getAjax("/api/planmanagementService/approval/findGoodsByProjectId/"+ row.id).then(res => {
        this.materialTableData = []
        planImplementGoodsList = []
        var row = res.data
        var planImplementGoodsList = this.planProjectParamVo.planImplementprojectVoList;
        row.forEach((val, key) => {
          this.materialTableData.push(val)
        });
        planImplementGoodsList = this.materialTableData
        console.log(res)
      });
    }
  },
  created() {
    this.planProjectParamVo.planImplement.planType = this.$route.query.formName
    this.orgName = sessionStorage.orgName
    this.userName = sessionStorage.userName
    this.applyDate =  parseTime(new Date(), "{y}-{m}-{d}");
    this.planProjectParamVo.planApply.orgId = sessionStorage.orgId
    this.planProjectParamVo.planApply.orgName = sessionStorage.orgName
    this.planProjectParamVo.planApply.applyDate =  parseTime(new Date(), "{y}-{m}-{d}");
    this.planProjectParamVo.planApply.applyUsername = sessionStorage.userName
    let xqName=this.$route.query.formName
        this.formName=xqName
        let xqid=this.$route.query.id
          postAjaxJson("/api/planmanagementService/active/userTask/getFirstExaminePerson/ydzxzjtb",this.vars).then(res => {
            console.log(res)
              this.planProjectParamVo.startWorkflowParameterVo.assigneeExpressionText = res.data[0].assigneeExpressionText,
              this.planProjectParamVo.startWorkflowParameterVo.departId = res.data[0].departId,
              this.planProjectParamVo.startWorkflowParameterVo.deploymentKey = "ydzxzjtb",
              this.planProjectParamVo.startWorkflowParameterVo.id = res.data[0].id,
              this.planProjectParamVo.startWorkflowParameterVo.name = res.data[0].name,
              this.planProjectParamVo.startWorkflowParameterVo.userId = res.data[0].id
          });

          var orgId = sessionStorage.orgId;
          orgId = "402881f56b87527d016b875468440008"
          var data = {"orgId":orgId};
          postAjax("/api/planmanagementService/approval/findPlanAndType",data).then(res => {
            var planTypeList = res.data.planTypeList;
            var belongYearList = res.data.belongYearList;
           planTypeList.forEach((val, key) => {
              var option = {
                "value":"",
                "label":""
              };
                option.label = val
                option.value = key
                this.options2.push(option)
            });
           belongYearList.forEach((val, key) => {
              var option = {
                "value":"",
                "label":""
              };
                option.label = val
                option.value = key
                this.options1.push(option)
            });
          });
  },
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.content {
  width: 90%;
  margin: 10px auto;
  /* background-color: antiquewhite; */
  min-height: 500px;
}
.content > h3 {
  text-align: center;
  margin: 10px 0;
}
.content_top > p {
  line-height: 55px;
  font-size: 14px;
}
.content_top > p > span {
  display: inline-block;
  cursor: pointer;
  color: rgb(89, 156, 255);
  margin-left: 1%;
}
.content_top > p > input {
  width: 82%;
  margin-left: 1%;
  height: 32px;
  padding: 0 10px;
}
.essential_top {
  margin-top: 2%;
}
.essential_top > p {
  height: 45px;
  line-height: 45px;
  padding: 0 22px;
  background-color: rgba(243, 243, 243, 0.829);
  font-size: 15px;
}
.essential_top > ul {
  display: flex;
  justify-content: space-between;
  height: 75px;
  line-height: 75px;
  padding: 0 28px;
}
.essential_top > ul > li {
  font-size: 14px;
}
.essential_top > p {
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
.bottom > span:nth-child(1) {
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
.bottom > span:nth-child(2) {
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
.bottom > span:nth-child(3) {
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
.el-form{
    margin-top: 5%;
}
.el-select>.el-input{
    width: 120%;
}
.el-select{
    margin-left: 5%;
}
.buttons{
    text-align: center;
    margin-top: 3%;
}
.el-form-item__error{
    left: 5%;
}
.preserve{
    margin-top: 2%;
    display: flex;
    justify-content: center;
}
.information{
    min-height: 300px;
    border: 1px solid rgb(156, 156, 156);
    border-top: none;
    /* border-bottom: none; */
}
.information>p{
    height: 40px;
    background-color: rgb(250, 250, 250);
    line-height: 40px;
    padding: 0 44px;
    font-size: 14px;
    position: relative;
}
.information>p>span{
    display: inline-block;
    margin-left: 80%;
    color: aqua;
    cursor: pointer;
}
.information>p>i{
    font-style:normal;
    color: aqua;
    cursor: pointer;
    display: inline-block;
    margin-left: 2%;
    position: absolute;
    /* display: none; */
}
.information>ul{
    display: flex;
    height: 202px;
    line-height: 55px;
    padding: 38px 36px 0 36px;
    flex-wrap: wrap;
    flex-direction: row;
    /* line-height: 40px; */
}
.information>ul>li{
    font-size: 14px;
    width: 33%;
    /* height: 80px;
    line-height: 80px; */
}
.information>ul>li:nth-child(3){
    padding-left: 20px;
}
.information>ul>li:nth-child(4){
    padding-left: 16px;
}
.information>ul>li>input{
    margin-left: 24px;
    width: 62%;
    height: 30px;
    font-size: 13px;
    padding: 0 5px;
    /* border-color: rgb(252, 252, 252); */
}
.brief{
    padding: 0 38px;
    font-size: 14px;
}
.brief>input{
    width: 86.5%;
    height: 48px;
    margin-left: 26px;
    padding: 0 5px;
}
.table{
    display: flex;
    margin-top: 20px;
    width: 77.3%;
}
.table>span{
    margin-left: 10%;
    padding-top: 14px;
    margin-right: 1%;
}
.getbutton{
    padding: 20px 0;
    padding-left: 10%;
}
.el-date-editor{
    margin-left: 24px;
    width: 76%;
    height: 30px;
    font-size: 13px;
}
.el-date-editor>input{
    border-color: dimgrey;
    border-radius: none;
}
.upload-demo{
    display: flex;
}
.buttonsn{
    background-color: darkgray;
    border: none;
    width: 74px;
}
.el-table .cell{
    display: flex;
}
.inputs{
    width: 98%;
    height: 60px;
    padding: 10px;
}
.inputf{
    width: 98%;
    height: 45px;
    padding: 10px;
}
.table > span {
    margin-left: 6%;
    padding-top: 14px;
    margin-right: 1%;
    font-size: 15px;
}
</style>
