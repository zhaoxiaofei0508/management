<template>
  <div>
    <!-- <navbar /> -->
    <div class="route">
      <span><router-link to="/index">首页</router-link></span
      >&nbsp;&nbsp; &gt;<span>审核</span>
    </div>
    <div class="zxfplan">
      <h3>年度大修月度实施计划</h3>
      <span>{{orgName}}</span>
      <span>{{userName}}</span>
      <span>{{applyDate}}</span>
      <strong>查看流程图</strong>
      <div class="zxftable">
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 计划表 -->
            <el-tab-pane label="计划单" name="first">
              <!-- <div class="zxfschedule">
                                <h4>外委计划</h4>
                            </div> -->
              <div class="ztable">
                <p>计划信息</p>
                <span
                  style="font-size: 14px;display: inline-block;margin: 12px 0;"
                  >项目信息</span
                >
                <el-table
                  :data="zxftableData"
                  ref="table"
                  tooltip-effect="dark"
                  border
                  stripe
                  @selection-change="selectRow"
                >
                  <el-table-column
                    label="项目编码"
                    align="center"
                    width="100"
                    prop="projectNo"
                  >
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
                  <el-table-column
                    label="附件"
                    align="center"
                    prop="annexChinaName"
                  >
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="check(scope.row.id)"
                        >查看商品</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <p style="font-size: 14px;padding: 20px;line-height: 25px;">
                <span>外委说明:</span/>
                {{planDesc}}
              </p>
              <div style="display: flex;justify-content: space-around;">
                <p style="font-size: 14px;">
                  附件:技术规范书:<img
                    src="https://axure-file.lanhuhu.com/21a8b113-c334-4252-80ac-7514e60de361__205d41261be2727693b042a6dcd9165e.svg"
                    style="height: 35px;vertical-align: middle;"
                  /><el-button type="text" @click="dialogVisible = true"
                    >预览</el-button
                  >
                </p>
                <p style="font-size: 14px;">
                  检测表:<img
                    src="https://axure-file.lanhuhu.com/21a8b113-c334-4252-80ac-7514e60de361__205d41261be2727693b042a6dcd9165e.svg"
                    style="height: 35px;vertical-align: middle;"
                  /><el-button type="text" @click="creatinine = true"
                    >预览</el-button
                  >
                </p>
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
        <el-dialog
          width="98%"
          title="项目文件"
          :visible.sync="dialogTableVisible"
        >
          <el-table
            :data="tableDatas"
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
            <el-table-column prop="goodsModel" label="规则型号/描述" width="120">
            </el-table-column>
            <el-table-column prop="goodsunit" label="单位"> </el-table-column>
            <el-table-column prop="goodsNumber" label="数量"> </el-table-column>
            <el-table-column prop="goodsPrice" label="预估单价"> </el-table-column>
            <el-table-column prop="goodsTotal" label="预估总价"> </el-table-column>
            <el-table-column prop="goodsType" label="类型"> </el-table-column>
            <el-table-column prop="startDate" label="计划实施时间" width="120">
            </el-table-column>
            <el-table-column prop="endDate" label="计划交付时间" width="120">
            </el-table-column>
            <el-table-column prop="factoryName" label="主机厂家"> </el-table-column>
            <el-table-column prop="technologyDesc" label="技术要求"> </el-table-column>
            <el-table-column prop="remarks" label="备注"> </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
    <div style="margin-top: 12%;">
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
      </el-form>
      <div class="zxfbutton">
        <span>取消</span>
        <span @click="zxfsummary()">确定</span>
      </div>
    </div>
    <!-- 技术规范书弹框 -->
    <el-dialog title="技术规范书" :visible.sync="dialogVisible" width="80%">
    </el-dialog>
    <!-- 检测表弹框 -->
    <el-dialog title="检测表" :visible.sync="creatinine" width="80%">
    </el-dialog>
  </div>
</template>
<script>
import { postAjaxJson, getAjax } from "@/utils/ajaxRequest";

import Navbar from "@/views/layout/components/Navbar"; //导航
import Results from "@/views/result/components/results/results";
export default {
  name: "Result",
  components: {
    Navbar,
    Results
  },
  data() {
    return {
      Formrules: {
        result: [
          { required: true, message: '请选择审核结果', trigger: 'change' },
        ],
        explain: [
          { required: true, message: '请输入审核说明', trigger: 'blur' },
        ],
      },
      confirmation: [],
      orgName:"中心部门",
      userName:"王二",
      applyDate:"2020-4-27",
      planDesc:"",//大修说明
      textarea: "", //审核说明
      activeName: "first", //标签页切换
      TabBar: "last", //项目文件切换
      dialogVisible: false, //技术规范书预览弹框
      creatinine: false, //检测表预览弹框
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
      zxftableData: [],
      /* 流程审批*/
      ruleForm: {
        result: "",
        explain: "",
        reviewedBy: ""
      },

      apply: {
        applyId: "",
        deploymentKey: "nddxydssjh",
        userid: "",
        formId: "",
        fromKey: "",
        manger: "",
        message: "",
        needCompanyExamine: "",
        needTechnologyExamine: "",
        result: "",
        taskId: "",
        taskName: ""
      },
      // 计划单表格查看商品弹框
      tableDatas: [],
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
      options: [
        {
          value: "同意",
          label: ""
        },
        {
          value: "不同意",
          label: ""
        }
      ],
      nextActiveUsers: []
    };
  },
  mounted() {
    // console.log(this.textarea);
  },
  methods: {
    selectRow() {},
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
    selectResult(e) {
      this.confirmation.forEach(item => {
        console.log(item)
        if (item.name === e) {
          this.nextActiveUsers = item.nextActiveUsers;
        }
      });
    },
    //确认提交按钮
    zxfsummary() {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          return this.$message('请输入必填信息')
        }
        if(this.ruleForm.result == null && this.ruleForm.result == ""){
          this.$message("请选择审批结果")
        }else{
          this.apply.result = this.ruleForm.result;
          this.apply.userid = this.ruleForm.reviewedBy;
          this.apply.message = this.ruleForm.explain;
          console.log(this.apply);
          postAjaxJson(
            "/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep",
            this.apply
          ).then(res => {
            console.log(res);
            if(res.code === '0') {
              this.$router.push('/home')
              this.$message(res.message)
            }
          });
        }
      })
    },

    //查看商品事件
    check(row) {
      this.dialogTableVisible = true;
      getAjax(
        `/api/planmanagementService/overhaul/findGoods/${row}`
      ).then(res => {
        this.tableDatas = res.data
        console.log(res);
        console.log("商品信息");
      });
    }

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
  },
  created() {
    this.apply.taskId = this.$route.query.taskId;
    this.apply.applyId = this.$route.query.businessKey;
    postAjaxJson(
      `/api/processService/userTask/getNewTaskPathAndExaminePerson/${
        this.$route.query.taskId
      }`
    ).then(res => {
      console.log(res);
      this.confirmation = res.data;
      var result = {
        id:"",
        name:"同意",
        nextActiveName:"",
        nextActiveUsers:"",
        taskDefinitionKey:"",
      }
      var name = "true";
      res.data.forEach(item => {
        if(item.name == "同意"){
          name = "false"
        }
        console.log(item.name)
      });
      if(name != "false"){
        this.confirmation.push(result)
      }
    });
    getAjax(
      `/api/processService/userTask/taskListByProcessDefinitionKey?pageNumber=0&pageSize=6&processDefinitionKey=${
        this.$route.query.processDefinitionId.split(":")[0]
      }`
    ).then(res => {
      console.log(res);
      var taskId = "";
      var taskName = "";
      res.data.content.forEach(item => {
        if (this.$route.query.businessKey === item.businessKey) {
          taskId = item.taskId;
          taskName = item.taskName;
        }
      });
      this.apply.taskId = taskId;
      this.apply.taskName = taskName;
      console.log(taskId);
      console.log(taskName);
    });
      getAjax(
        `/api/planmanagementService/overhaul/${this.$route.query.businessKey}`
      ).then(res => {
        this.zxftableData = res.data;
        this.planDesc = res.data[0].planDesc
        this.orgName = res.data[0].orgName
        this.userName = res.data[0].applyUsername
        this.applyDate = res.data[0].applyDate
        console.log(res);
        console.log("回填数据");
      });
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
</style>
