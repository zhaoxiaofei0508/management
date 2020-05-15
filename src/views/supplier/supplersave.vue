<template>
  <div style="padding:20px;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>审核</el-breadcrumb-item>
		</el-breadcrumb>
    <div class="zxfplan">
      <h3>供应商推荐</h3>
      <span>维修中心</span>
      <span>王华</span>
      <span>2019-11-12</span>
      <strong>查看流程图</strong>
      <div class="zxftable">
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 计划表 -->
            <el-tab-pane label="计划单" name="first">
              <div class="zxfschedule">
                <h4>供应商推荐</h4>
              </div>
              <div class="ztable">
                <p>计划信息</p>
                <span
                  >计划年度：{{
                    globalSupplierDatas.planImplement.belongYear
                  }}</span
                >
                <span style="margin: 0 40px;"
                  >计划类型：{{
                    globalSupplierDatas.planImplement.planType
                  }}</span
                >
                <span
                  >项目类别：{{
                    globalSupplierDatas.planImplementprojectList[0].projectType
                  }}</span
                >
                <el-table
                  :data="globalSupplierDatas.planImplementprojectList"
                  ref="table"
                  slot="empty"
                  border
                  stripe
                  show-summary
                  :summary-method="getSum"
                >
                  <!-- <el-table-column
                    label="项目编码"
                    align="center"
                    width="100"
                    prop="id"
                  > -->
                  </el-table-column>
                  <el-table-column
                    label="项目类别"
                    width="100"
                    class="zxfsh"
                    align="center"
                    prop="projectType"
                  >
                  </el-table-column>
                  <el-table-column
                    label="项目名称"
                    align="center"
                    prop="projectName"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="projectMoney"
                    label="项目预估金额"
                    width="120"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    label="开始时间"
                    width="100"
                    align="center"
                    prop="startDate"
                  >
                  </el-table-column>
                  <el-table-column
                    label="结束时间"
                    align="center"
                    prop="endDate"
                  >
                  </el-table-column>
                  <el-table-column
                    label="负责人"
                    align="center"
                    prop="chargePerson"
                  >
                  </el-table-column>
                  <el-table-column
                    label="项目简介"
                    align="center"
                    prop="projectDesc"
                    width="180px"
                  >
                  </el-table-column>
                  <el-table-column label="附件" align="center" prop="filePath">
                  </el-table-column>
                  <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="afterList(scope.row.id)"
                        >查看商品</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div class="suppliertable">
                <span>供应商推荐:</span>
                <el-table
                  :data="globalSupplierDatas.supplierList"
                  ref="multi2pleRef"
                  tooltip-effect="dark"
                  border
                  stripe
                  style="width: 100%;margin-bottom: 15px;"
                >
                  <el-table-column
                    type="index"
                    width="80"
                    align="center"
                    label="序号"
                  ></el-table-column>
                  <el-table-column label="供应商类别" prop="supplierType">
                  </el-table-column>
                  <el-table-column label="供应商名称">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.supplierSelectType === '直接选择'"
                        @click="directSelection(scope.row.supplierKey)"
                        >{{ scope.row.supplierName }}</span
                      >
                      <span v-else @click="newlyAdded(scope.row.supplierKey)">{{
                        scope.row.supplierName
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="选择方式" prop="supplierSelectType">
                  </el-table-column>
                </el-table>
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
                    :timestamp="activity.timestamp"
                  >
                    {{ activity.content }}
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
        <!-- 状态已完成点击查看类别里面的查看商品明细弹框 -->
        <el-dialog
          title="商品明细"
          :visible.sync="dialogTableVisible"
          width="97%"
          append-to-body
        >
          <el-table
            :data="afterListDetails"
            ref="table"
            tooltip-effect="dark"
            border
            stripe
            @selection-change="selectRow"
          >
            <el-table-column prop="goodsClass" label="分类" width="50">
            </el-table-column>
            <el-table-column label="编码" width="50" prop="goodsCode">
            </el-table-column>
            <el-table-column prop="goodsName" label="商品/服务名称" width="120">
            </el-table-column>
            <el-table-column
              prop="goodsmodel"
              label="规则型号/描述"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="goodsunit" label="单位"> </el-table-column>
            <el-table-column prop="goodsNumber" label="数量"> </el-table-column>
            <el-table-column prop="goodsPrice" label="预估单价">
            </el-table-column>
            <el-table-column prop="goodsTotal" label="预估总价">
            </el-table-column>
            <el-table-column prop="goodsType" label="类型"> </el-table-column>
            <el-table-column prop="startDate" label="计划实施时间" width="120">
            </el-table-column>
            <el-table-column prop="endDate" label="计划交付时间" width="120">
            </el-table-column>
            <el-table-column prop="factoryName" label="主机厂家">
            </el-table-column>
            <el-table-column prop="technologyDesc" label="技术要求">
            </el-table-column>
            <el-table-column prop="remarks" label="备注"> </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        :rules="Formrules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="审核结果:" prop="result">
          <el-select
            @change="selectResult"
            style="width: 100%"
            v-model="ruleForm.result"
            placeholder="请选择"
          >
            <el-option
              v-for="item in confirmation"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核说明:" prop="explain">
          <el-input
            type="textarea"
            resize="none"
            v-model="ruleForm.explain"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择审核人:" prop="reviewedBy">
          <el-select
            style="width: 100%"
            v-model="ruleForm.reviewedBy"
            placeholder="请选择"
          >
            <el-option
              v-for="item in nextActiveUsers"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="zxfbutton">
        <span>取消</span>
        <span @click="zxfsummary()">确定</span>
      </div>
    </div>
    <!-- 新增供应商详情弹框 -->
    <el-dialog title="提示" :visible.sync="isShow" width="97%">
      <SupplierDetail :supplierId="supplierId"></SupplierDetail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="isShow = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 直接使用供应商明细表 -->
    <el-dialog title="供应商信息表1231" :visible.sync="popgysmc" width="97%">
      <h3 style="font-size: 28px;text-align: center;">供应商信息表</h3>
      <p
        style="height: 35px;line-height: 35px;background-color:#e8e8e8;padding: 0 10px;"
      >
        基本信息
      </p>
      <div class="dialog-footer" style="width: 100%">
        <el-row :gutter="24">
          <el-col :span="6">
            <ul style="line-height: 50px;">
              <li>
                企业名称:<span>{{
                  globalSupplierData.createSupplier.cnname
                }}</span>
              </li>
              <li>
                注册资本:<span>{{
                  globalSupplierData.createSupplier.capital
                }}</span>
              </li>
              <li>
                联系人:<span>{{
                  globalSupplierData.createSupplier.contactName
                }}</span>
              </li>
              <li>营业执照:<el-button type="text">名称</el-button></li>
            </ul>
          </el-col>
          <el-col :span="6">
            <ul style="line-height: 50px;">
              <li>
                企业性质:<span>{{
                  globalSupplierData.createSupplier.nature
                }}</span>
              </li>
              <li>
                法定代表人姓名:<span>{{
                  globalSupplierData.createSupplier.contactName
                }}</span>
              </li>
              <li>
                联系电话:<span>{{
                  globalSupplierData.createSupplier.contactPhone
                }}</span>
              </li>
              <li>
                主营业务:<span>{{
                  globalSupplierData.createSupplier.enterpriseDesc
                }}</span>
              </li>
            </ul>
          </el-col>
          <el-col :span="6">
            <ul style="line-height: 50px;">
              <li>
                所属行业:<span>{{
                  globalSupplierData.createSupplier.industry
                }}</span>
              </li>
              <li>
                法定代表人身份证:<span>{{
                  globalSupplierData.createSupplier.deputyCode
                }}</span>
              </li>
              <li>
                企业所在地:<span
                  >{{ globalSupplierData.createSupplier.enterpriseCountry }}/{{
                    globalSupplierData.createSupplier.enterpriseProvince
                  }}/{{ globalSupplierData.createSupplier.enterpriseCity }}/{{
                    globalSupplierData.createSupplier.enterpriseArea
                  }}</span
                >
              </li>
            </ul>
          </el-col>
          <el-col :span="6">
            <ul style="line-height: 50px;">
              <li>
                统一社会代码:<span>{{
                  globalSupplierData.createSupplier.enterpriseCode
                }}</span>
              </li>
              <li>法人身份证附件:<el-button type="text">身份证</el-button></li>
              <li>
                详细地址:<span>{{
                  globalSupplierData.createSupplier.address
                }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
      <p
        style="height: 35px;line-height: 35px;background-color:#e8e8e8;padding: 0 10px;"
      >
        资质信息
      </p>
      <div class="dialog-footer" style="width: 60%;margin-top: 2%;">
        <span>资质类型：</span>
        <el-table
          :data="globalSupplierData.supplierQualifyList"
          ref="table"
          tooltip-effect="dark"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column label="资质类型" prop="qualifyType">
          </el-table-column>
          <el-table-column label="资质有效期" prop="qualifyDate">
          </el-table-column>
          <el-table-column label="资质" prop="zzy"> </el-table-column>
        </el-table>
      </div>
      <p
        style="height: 35px;line-height: 35px;background-color:#e8e8e8;padding: 0 10px;margin-top: 2%;"
      >
        供货类别
      </p>
      <div class="dialog-footer" style="width: 100%;margin-top: 2%;">
        <p style="width: 100%;padding: 0 20px;">
          供应商类型:<span>{{
            globalSupplierData.createSupplier.supplierType
          }}</span>
        </p>
        <div v-for="item in globalSupplierData.supplierTypeList">
          <span>{{ item.supplyCommodity }}</span>
        </div>
      </div>
      <p
        style="height: 35px;line-height: 35px;background-color:#e8e8e8;padding: 0 10px;margin-top: 2%;"
      >
        账户信息
      </p>
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
          <el-table-column label="开户行名称" prop="openBankName">
          </el-table-column>

          <el-table-column label="开户行账号" prop="openBankCode">
          </el-table-column>

          <el-table-column label="银行账号" prop="bankCode"> </el-table-column>
          <el-table-column label="支持承兑" prop="isAcceptance">
          </el-table-column>
          <el-table-column label="设为默认" prop="isDefault"> </el-table-column>
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
          <el-table-column label="开户行名称" prop="openBankName">
          </el-table-column>

          <el-table-column label="开户行账号" prop="openBankCode">
          </el-table-column>

          <el-table-column label="银行账号" prop="bankCode"> </el-table-column>
          <el-table-column label="支持承兑" prop="isAcceptance">
          </el-table-column>
          <el-table-column label="设为默认" prop="isDefault"> </el-table-column>
        </el-table>
      </div>
      <p
        style="height: 35px;line-height: 35px;background-color:#e8e8e8;padding: 0 10px;margin-top: 3%;"
      >
        邮箱信息
      </p>
      <div class="dialog-footer" style="width: 70%">
        <el-table
          :data="globalSupplierData.supplierPostbox"
          ref="table"
          tooltip-effect="dark"
          border
          stripe
          style="width: 100%;margin-top: 2%;margin-left: 3%;"
        >
          <el-table-column label="邮箱账号" prop="emailAccount">
          </el-table-column>
          <el-table-column label="邮箱联系人" prop="emailContract">
          </el-table-column>

          <el-table-column label="联系电话" prop="telephone"> </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Navbar from "@/views/layout/components/Navbar"; //导航
import Results from "@/views/result/components/results/results";
import SupplierDetail from "@/components/SupplierDetail/index"; // 新增供应商
import { getAjax, postAjaxx, postAjaxJson } from "@/utils/ajaxRequest";
export default {
  name: "Result",
  components: {
    Navbar,
    Results,
    SupplierDetail
  },
  data() {
    return {
      confirmation: [],
      nextActiveUsers: [],
      isShow: false,
      getSum: [],
      textarea: "", //审核说明
      activeName: "first", //标签页切换
      TabBar: "last", //项目文件切换
      gridData: [
        {
          //查看商品数据
        }
      ],
      zxfoptionss: [
        //添加商品的类型
        {
          id: "1",
          typevalue: "物资"
        },
        {
          id: "2",
          typevalue: "工程"
        },
        {
          id: "3",
          typevalue: "设备"
        }
      ],
      dialogTableVisible: false, //查看商品
      zxftableData: [
        //分包计划单表格
        {
          category: "",
          projectName: "",
          // projectMoney:'23',
          startDate: "",
          endDate: "",
          projectDesc: "",
          filePath: ""
        }
      ],
      ruleForm: {
        result: "",
        explain: "",
        reviewedBy: ""
      },
      Formrules: {
        result: [
          { required: true, message: '请选择审核结果', trigger: 'change' }
        ],
        explain: [
          { required: true, message: '请输入审核说明', trigger: 'change' }
        ],
        reviewedBy: [
          { required: true, message: '请选择审核人', trigger: 'change' }
        ],
      },
      // 时间线
      activities: [
        {
          content: "维修中心 李华",
          timestamp: "2018-04-12 20:46",
          size: "large",
          icon: "el-icon-more"
        },
        {
          content: "维修中心 李华 ",
          timestamp: "2018-04-03 20:46"
        },
        {
          content: "维修中心 李华",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
          size: "large"
        }
      ],
      // 审核人
      valuename: "", //初始为空
      optionsname: [
        {
          valuename: "王华",
          label: ""
        },
        {
          valuename: "刘翔",
          label: ""
        }
      ],
      // 审核结果
      value: "",
      globalSupplierDatas: {
        planApply: {},
        planImplement: {
          belongYear: '',
        },
        supplierList: []
      },
      supplierId: "",
      globalSupplierData: {
        createSupplier: {},
        supplierQualifyList: [],
        supplierTypeList: [],
        supplierPostbox: [],
        supplierAccount: []
      },
      afterListDetails: [],
      popgysmc: false,
      taskName: "",
      taskArray: []
    };
  },
  mounted() {
    // console.log(this.textarea);
  },
  created() {
    this.getSupplierList();
    this.getResult();
  },
  methods: {
    selectResult(e) {
      this.confirmation.forEach(item => {
        if(item.name === '不同意') {
            this.ruleForm.reviewedBy = ''
        }
        if (item.name === e) {
          this.nextActiveUsers = item.nextActiveUsers;
        }
      });
    },
    // 获取审核人信息
    getResult() {
      postAjaxJson(
        `/api/processService/userTask/getNewTaskPathAndExaminePerson/${
          this.$route.query.taskId
        }`
      ).then(res => {
        console.log(res);

        if (res.code == "0") {
          this.confirmation = res.data;
        }
      });
    },
    // 新增选择
    directSelection(id) {
      this.isShow = true;
      this.supplierId = id;
    },
    // 直接使用
    newlyAdded(id) {
      getAjax(
        `/api/planmanagementService/SupplierRecommendation/SupplierSelectedList?supplierIds=${id}`
      ).then(res => {
        console.log(res);
        this.globalSupplierData = res.data;
        this.popgysmc = true;
      });
    },
    // 点击查看商品弹框
    afterList(id) {
      this.dialogTableVisible = true;
      getAjax(
        `/api/planmanagementService/PlanProjectSelect/findProjectGoodsdetailsById?applyId=${
          this.xqid
        }&projectId=${id}`
      ).then(res => {
        console.log(res);
        this.afterListDetails = res.data.goods;
      });
    },
    getSupplierList() {
      getAjax(
        `/api/planmanagementService/SupplierRecommendation/findSupplierApply?supplierApplyId=${
          this.$route.query.businessKey
        }`
      ).then(res => {
        console.log(res);
        this.globalSupplierDatas = res.data;
      });
    },
    // 审核结果下拉事件
    selectGet(val) {
      this.value = val; //赋值给value
      // console.log(val, '审核结果');
    },
    // 选择审核人下拉事件
    selectGetname(val) {
      this.valuename = val;
      // console.log(val, '66');
    },
    // 文本域
    inputChangedMer: function(e) {
      this.textarea = e.target.value;
    },
    // 计划单切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    XmwjClick(tab, event) {
      console.log(tab, event);
    },
    //确认提交按钮
    zxfsummary() {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
            return this.$message('请输入必填字段')
        }
         var obj = {
            "applyId": this.$route.query.businessKey,
            "deploymentKey": this.$route.query.processDefinitionId.split(':')[0],
            "formId": '99ab50e0751441fe828fcfcb4911b048',
            "fromKey": '',
            "userid": '',
            "manger": "",
            "message": this.ruleForm.explain,
            "needCompanyExamine": '',
            "needTechnologyExamine": "",
            "result": this.ruleForm.result,
            "taskId": '',
            "taskName": ''
        }
        this.nextActiveUsers.forEach(item => {
            if(item.id === this.ruleForm.reviewedBy) {
                obj.userid = item.id
            }
        })
        getAjax(`/api/processService/userTask/taskListByProcessDefinitionKey?pageNumber=0&pageSize=6&processDefinitionKey=${this.$route.query.processDefinitionId.split(':')[0]}`).then(res => {
            console.log(res)
            var taskId = ''
            var taskName = ''
            res.data.content.forEach(item => {
                 if(this.$route.query.businessKey === item.businessKey)  {
                     console.log(this.$route.query.businessKey)
                     console.log(item.businessKey)
                     taskId = item.taskId
                     taskName = item.taskName
                 }   

            })
            obj.taskId = taskId
            obj.taskName = taskName
            console.log(obj)
            postAjaxx(`/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep`, JSON.stringify(obj)).then(res => {
                if(res.code == '0') {
                  this.$message(res.message)
                  this.$router.push('/home')
                }
            })
        })
        console.log(obj)
      })
    },
    //查看附件事件
    check(row) {
      this.dialogTableVisible = true;
    }
    // 计算列的和
  },
  computed: {
    columnTotal() {
      // tableData - 表格数据
      // calcCol - 要计算的那一列
      // map函数 - 将表格的二维数据转换为一维的数组
      return zxftableData
        .map(row => row.projectMoney)
        .reduce((acc, cur) => cur + acc, 0);
    }
  }
};
</script>

<style scoped>
.route {
  margin-top: 60px;
  height: 50px;
  line-height: 50px;
  background-color: rgb(216, 216, 216);
  padding: 0 20px;
  cursor: pointer;
  font-size: 15px;
}
.el-form {
  width: 500px;
}
.zxfplan {
  width: 90%;
  margin: 10px auto;
  /* background-color: rgb(255, 164, 210); */
  min-height: 500px;
}
.zxfplan > h3 {
  margin-top: 3%;
}
.zxfplan > span {
  width: 85px;
  height: 40px;
  line-height: 40px;
  text-align: left;
  display: inline-block;
}
.zxfplan > strong {
  width: 105px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  margin-left: 69%;
  border: 1px solid rgb(224, 224, 224);
  font-size: 15px;
}
.zxfschedule > h4 {
  text-align: center;
  height: 80px;
  line-height: 80px;
}
.zxfblock {
  padding: 10px 10px;
  position: relative;
}
.zxftime {
  position: absolute;
  top: 20px;
  left: 20%;
  width: 60%;
  height: 200px;
  line-height: 32px;
}
.zxftime > span:nth-child(2) {
  margin-left: 2%;
}
.zxftime > span {
  font-size: 14px;
  color: rgb(107, 107, 107);
}
.zxftime > p {
  font-size: 14px;
  color: rgb(107, 107, 107);
  margin: 20px 0;
  /* padding-left: 10%; */
}
.zxfbutton {
  height: 100px;
}
.zxfbutton > span {
  display: inline-block;
  width: 180px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border: 1px solid rgb(112, 112, 112);
  margin-top: 3%;
  cursor: pointer;
}
.zxfbutton > span:nth-child(1) {
  margin-left: 50%;
  margin-right: 8%;
}
.zxfbutton > span:nth-child(2) {
  background-color: rgb(252, 72, 72);
  color: white;
  border: none;
}
.ztable > p {
  height: 45px;
  line-height: 45px;
  padding: 0 22px;
  background-color: rgba(243, 243, 243, 0.829);
  font-size: 15px;
  margin-bottom: 20px;
}
.suppliertable > span {
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  margin-bottom: 20px;
}
.ztable > span {
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  margin-bottom: 20px;
}
</style>
