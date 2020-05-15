<template>
  <div>
    <!-- <navbar /> -->
    <div class="route" style="margin: 0;">
      <span><router-link to="/index">首页</router-link></span
      >&nbsp;&nbsp; &gt;<span>审核</span>
    </div>
    <div class="zxfplan">
      <h3>年度科研项目计划实施</h3>
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
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click.prevent="accessoryaddRow()"
                        type="text"
                        size="small"
                        >查看附件</el-button
                      >
                    </template>
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
          {
            required: true,
						message: '请选择审核结果',
						trigger: 'change'
          }
        ],
        explain: [
          {
            required: true,
						message: '请输入审核说明',
						trigger: 'blur'
          }
        ],
        reviewedBy: [
          {
            required: true,
						message: '请选择下一步审核人',
						trigger: 'change'
          }
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
        this.apply.result = "同意";
        this.apply.userid = "8c8d4fba943911e9891bd241ca34a499";
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
