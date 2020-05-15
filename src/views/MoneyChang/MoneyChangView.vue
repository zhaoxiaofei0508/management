<template>
  <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item >审核</el-breadcrumb-item>
		</el-breadcrumb>
        <div class="zxfplan">
            <h3>年度专项资金变更</h3>
            <span>{{orgName}}</span>
            <span>{{userName}}</span>
            <span>{{applyDate}}</span>
            <strong>查看流程图</strong>
            <div class="zxftable">
                <template>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- 计划表 -->
                        <el-tab-pane label="计划单" name="first">
                            <div class="zxfschedule">
                                <h4>年度专项资金变更</h4>
                            </div>
                            <div class="ztable">
                                <p>计划信息</p>
                                <div class="jhbg">
                                    <p>计划内变更</p>
                                    <ul style="display: flex;height: 50px;align-items: center;">
                                        <li>
                                            资金类型:<span>{{zjlx}}</span>
                                        </li>
                                        <li>
                                            计划时间:<span>{{jhsj}}</span>
                                        </li>
                                        <li>
                                            项目类型:<span>{{xmlx}}</span>
                                        </li>
                                    </ul>
                                    <el-table
                                        :data="zxftableData"
                                        ref="table"
                                        tooltip-effect="dark"
                                        border
                                        stripe
                                        @selection-change='selectRow'>
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
                                        <el-table-column label="操作">
                                            <template slot-scope="scope">
                                                <el-button type="text" size="small" @click="jhwcheck(scope.row)">查看商品</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="jhbg" style="margin-top: 9%;">
                                    <p>计划外变更</p>
                                    <ul style="display: flex;height: 50px;align-items: center;">
                                        <li>
                                            资金类型:<span>{{Jhwtype}}</span>
                                        </li>
                                        <li>
                                            计划时间:<span>{{Jhwsj}}</span>
                                        </li>
                                        <li>
                                            项目类型:<span>{{Jhwlx}}</span>
                                        </li>
                                    </ul>
                                    <el-table
                                        :data="Jhwtable"
                                        ref="table"
                                        >
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
                                        <el-table-column label="操作">
                                            <template slot-scope="scope">
                                                <el-button type="text" size="small" @click="jhwcheck(scope.row)">查看商品</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="审核历史" name="second">
                            <div class="zxfblock">
                                <el-timeline>
                                    <el-timeline-item
                                    v-for="(activity, index) in activities"
                                    :key="index"
                                    :icon="activity.icon"
                                    :type="activity.type"
                                    :color="activity.color"
                                    :size="activity.size"
                                    :timestamp="activity.timestamp">
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
        </div>
      
        <div>
            <div class="zxfbutton">
                <span @click="quxiao">取消</span>
            </div>
        </div>
        <!-- 计划内变更查看商品弹框 -->
        <el-dialog width="98%"
            title="商品变更明细" :visible.sync="dialogTableVisible"
            >
            <div class="operating" style="padding:20px 30px;">
                <el-input v-model="zxfsearch" style="display: inline-block;width: 28%;borderRight:none;"
                placeholder="请输入物资名称/规格型号" icon="el-icon-search">
                </el-input>
            </div>
            <el-table
                :data="tableDatas"
                ref="table"
                border
                style="width: 100%"
                font-size='12px'
                >
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
        </el-dialog>
        <!-- 计划外变更查看商品弹框 -->
        <el-dialog
            title="商品明细"
            :visible.sync="dialogVisible"
            width="80%"
            >
            <div class="operating" style="padding:20px 30px;">
                <el-input v-model="zxfsearch" style="display: inline-block;width: 28%;borderRight:none;"
                placeholder="请输入物资名称/规格型号" icon="el-icon-search">
                </el-input>
            </div>
            <el-table
                :data="Jhwtables"
                ref="table"
                border
                style="width: 100%"
                font-size='12px'
                >
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
        </el-dialog>

    </div>
</template>
<script>
import  Navbar from '@/views/layout/components/Navbar'//导航
import { getAjax, postAjaxx, postAjaxJson } from "@/utils/ajaxRequest";
import  Results from '@/views/result/components/results/results'
import { parseTime } from "@/utils"
export default {
    name:'Result',
    components:{
        Navbar,
        Results
    },
    data() {
      return {
          confirmation: [],
          nextActiveUsers: [],
          ruleForm: {
              reviewedBy: '',
              explain: '',
              result: ''
          },
          Formrules: {
            result: [{
              required: true,
              message: '请选择审核结果',
              trigger: 'change'
            }],
            explain: [{
              required: true,
              message: '请输入审核说明',
              trigger: 'change'
            }],
            reviewedBy: [{
              required: true,
              message: '请选择审核人',
              trigger: 'change'
            }],

				},
        // 计划内变更
        orgName:"",
        userName:"",
        applyDate:"",
        zjlx:'类型',//资金类型
        jhsj:'时间',//计划时间
        xmlx:'项目类型',//项目类型
        // 计划外变更
        Jhwtype:'类型',//资金类型
        Jhwsj:'时间',//计划时间
        Jhwlx:'项目类型',//项目类型
        bgsm:'在实施过程中遇到问题，需要快速解决',
        zxfsearch:'',//计划内查看商品搜索框
        textarea:'',//审核说明
        activeName: 'first',//标签页切换
        dialogVisible:false,//计划外变更查看商品弹框
        zxfoptionss: [//添加商品的类型
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
        dialogTableVisible:false,//计划内查看商品
        zxftableData:[],
        // 计划内查看商品表格
        tableDatas:[],
        // 计划外表格
        Jhwtable:[],
        //计划外查看商品表格
        Jhwtables:[
            {

            }
        ],
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
       // 审核人
        valuename:'',//初始为空
        optionsname: [{
            valuename: '王华',
            label: ''
            }, {
            valuename: '刘翔',
            label: ''
        }],
        // 审核结果
        value:'',
        options:[{
                value: '同意',
                label: ''
              }, {
                value: '不同意',
                label: ''
        }],
      };
    },
    created() {
    //   postAjaxJson(
    //     `/api/processService/userTask/getNewTaskPathAndExaminePerson/${
    //       this.$route.query.taskId
    //     }`
    //   ).then(res => {
    //     console.log(res);

    //     if (res.code == "0") {
    //       this.confirmation = res.data;
    //     }
    //   });
      getAjax(
        `/api/planmanagementService/PlanYearSpecialFundsChange/getTechnologyPlan?applyId=`+this.$route.query.id
      ).then(res => {
        console.log(res);
        this.userName = res.data.planApply.applyUsername
        this.orgName = res.data.planApply.orgName
        this.applyDate = parseTime(res.data.planApply.createDate, "{y}-{m}-{d}");
        res.data.planBudgetproject.forEach(val=>{
          if(val.beforeId == null || val.beforeId == ''){
            this.Jhwtable.push(val)
            this.Jhwtype = val.fundsType
            this.Jhwsj = parseTime(val.startDate, "{y}-{m}-{d}");
            this.Jhwlx = val.projectType
          }else{
            this.zxftableData.push(val)
            this.zjlx = val.fundsType
            this.jhsj = parseTime(val.startDate, "{y}-{m}-{d}");
            this.xmlx = val.projectType
          }
        })
      });

    },
    methods: {
        selectResult(e) {
            this.confirmation.forEach(item => {
                if(item.name === e) {
                    this.nextActiveUsers = item.nextActiveUsers
                }
            })
        },
        selectRow() {},
       // 审核结果下拉事件
        selectGet(val){
            this.value=val//赋值给value
            // console.log(val, '审核结果');
        },
        // 选择审核人下拉事件
        selectGetname(val){
            this.valuename=val
            // console.log(val, '66');
        },

        // 文本域
        inputChangedMer: function (e) {
            this.textarea = e.target.value
        },
        // 计划单切换
        handleClick(tab, event) {
        // console.log(tab, event);
        },
        XmwjClick(tab, event){
            console.log(tab, event);
        },
        //确认提交按钮
        zxfsummary(){
          this.$refs['ruleForm'].validate((valid) => {
          if (!valid) {
              return this.$message('请输入必填字段')
          }
            var obj = {
                "applyId": this.$route.query.businessKey,
                "deploymentKey": "ndzxzjbglc",
                "formId": "",
                "fromKey": "",
                "needOrgExamine": '',
                "manger": '',
                "message": this.ruleForm.explain,
                "needCompanyExamine": '',
                "needTechnologyExamine": "",
                "result": this.ruleForm.result,
                "taskId": this.$route.query.taskId,
                "taskName": "",
                "userid": this.ruleForm.reviewedBy
            }
            postAjaxJson("/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep", obj).then(res => {
                console.log(res)
                if(res.code === '0') {
                    this.$message(res.message)
                    this.$router.push({
                        path:"/home/index"
                    });
                }
            })
          })
        },
        //计划内表格查看商品
        check(row){
          getAjax(
          	`/api/planmanagementService/PlanProjectSelect/findBudgetGoods?budgetProjectId=`+row.id
          ).then(res => {
            console.log(res)
          	this.tableDatas = res.data;
          });
          this.dialogTableVisible=true
        },
        quxiao(){
            this.$router.push({
                path:'/home/index'
            })
        },
        jhwcheck(row){
          getAjax(
          	`/api/planmanagementService/PlanProjectSelect/findBudgetGoods?budgetProjectId=`+row.id
          ).then(res => {
            console.log(res)
          	this.Jhwtables = res.data;
          });
          this.dialogVisible=true
        }
    },
    computed: {
        // columnTotal() {
        //     // tableData - 表格数据
        //     // calcCol - 要计算的那一列
        //     // map函数 - 将表格的二维数据转换为一维的数组
        //     return zxftableData.map(row => row.projectMoney).reduce((acc, cur) => (cur + acc), 0)
        // }
    }
}
</script>

<style scoped>
.zxfconsequence {
    margin-left:50px;
}
 .route{
    margin-top: 60px;
    height: 50px;
    line-height: 50px;
    background-color: rgb(216, 216, 216);
    padding: 0 20px;
    cursor: pointer;
    font-size: 15px;
}
.zxfplan{
    width: 90%;
    margin: 10px auto;
    /* background-color: rgb(255, 164, 210); */
    min-height: 500px;
}
.zxfplan>h3{
    margin-top: 3%;
}
.zxfplan>span{
    width: 85px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    display: inline-block;
}
.zxfplan>strong{
    width: 105px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: inline-block;
    margin-left: 69%;
    border: 1px solid rgb(224, 224, 224);
    font-size: 15px;
}
.zxfschedule>h4{
    text-align: center;
    height: 80px;
    line-height: 80px;
}
.zxfblock{
    padding: 10px 10px;
    position: relative;
}
.zxftime{
    position: absolute;
    top: 20px;
    left: 20%;
    width: 60%;
    height: 200px;
    line-height: 32px;
}
.zxftime>span:nth-child(2){
    margin-left: 2%;
}
.zxftime>span{
    font-size: 14px;
    color: rgb(107, 107, 107);
}
.zxftime>p{
    font-size: 14px;
    color: rgb(107, 107, 107);
    margin: 20px 0;
    /* padding-left: 10%; */
}
.zxfbutton{
  height: 100px;
}
.zxfbutton>span{
  display: inline-block;
  width: 180px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border: 1px solid rgb(112, 112, 112);
  margin-top: 3%;
  cursor: pointer;
}
.zxfbutton>span:nth-child(1){
  margin-left: 50%;
  margin-right: 8%;
}
.zxfbutton>span:nth-child(2){
  background-color: rgb(252, 72, 72);
  color: white;
  border: none;
}
.ztable>p{
    height: 45px;
    line-height: 45px;
    padding: 0 22px;
    background-color: rgba(243, 243, 243, 0.829);
    font-size: 15px;
    margin-bottom: 20px;
}
.jhbg>ul>li{
    width: 30%;
    font-size: 14px;
}
</style>
