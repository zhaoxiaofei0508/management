<template>
  <div>
    <navbar />
    <div class="route">
      <span><router-link to="/index">首页</router-link></span
      >&nbsp;&nbsp; &gt;<span>审核</span>
    </div>
    <div class="zxfplan">
      <h3>分包/咨询及其他服务</h3>
      <span>{{ globalDataList.planApply.orgName }}</span>
      <span>{{ globalDataList.planApply.applyUsername }}</span>
      <span>{{ globalDataList.planApply.applyDate }}</span>
      <strong>查看流程图</strong>
      <div class="zxftable">
        <template>
          <el-table
            :data="globalDataList.planImplementprojectList"
            ref="table"
            slot="empty"
            border
            stripe
            show-summary
          >
            <el-table-column
              label="项目编码"
              align="center"
              width="100"
              prop="coding"
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
            <el-table-column label="项目名称" align="center" prop="projectName">
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
            <el-table-column label="结束时间" align="center" prop="endDate">
            </el-table-column>
            <el-table-column label="负责人" align="center" prop="chargePerson">
            </el-table-column>
            <el-table-column
              label="项目简介"
              align="center"
              prop="filePath"
              width="180px"
            >
            </el-table-column>
            <el-table-column label="附件" align="center" prop="fileNum">
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.fileNum === '有'"
                  type="text"
                  size="small"
                  @click="check(scope.row.id)"
                  >查看附件</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog
          width="98%"
          title="项目文件"
          :visible.sync="dialogTableVisible"
        >
          <el-tabs v-model="TabBar" @tab-click="XmwjClick" type="border-card">
            <el-tab-pane label="技术规范书" name="last">
              技术规范书文档
            </el-tab-pane>
            <el-tab-pane label="项目明细表" name="second">
              项目明细表文档
            </el-tab-pane>
          </el-tabs>
        </el-dialog>
      </div>
    </div>
    <div class="zxfresult">
      <p>审核结果</p>
      <div class="zxfconsequence">
        <el-form :model="ruleForm" :rules="rulesEx" ref="ruleForm" label-width="140px" class="demo-ruleForm">
            <el-form-item label="审核结果" prop="value">
                <el-select @change="selectRouter" v-model="ruleForm.value">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核说明" prop="textarea">
                <el-input type="textarea" resize="none" v-model="ruleForm.textarea"></el-input>
            </el-form-item>
            <el-form-item label="分管领导是否审批" prop="valuename">
                <el-select @change="getExEvent" v-model="ruleForm.valuename">
                    <el-option
                    v-for="item in optionsname"
                    :key="item.label"
                    :label="item.valuename"
                    :value="item.valuename">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择下一步审核人" prop="usernameEx">
                <el-select v-model="ruleForm.usernameEx">
                    <el-option
                    v-for="item in userList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="zxfbutton">
      <span>取消</span>
      <span @click="zxfsummary()">确定</span>
    </div>
  </div>
</template>
<script>
import {
  getAjax,
  postAjax,
  postAjaxx,
  postAjaxJson
} from "@/utils/ajaxRequest";
import Navbar from "@/views/layout/components/Navbar"; //导航
export default {
  name: "Result",
  components: {
    Navbar
  },
  data() {
    return {
      ruleForm: {
        value: '',
        textarea: '',
        valuename: '',
        usernameEx: '',
      },
      rulesEx: {
            value: [
                { required: true, message: '请选择审核结果', trigger: 'change' }
            ],
            textarea: [
                { required: true, message: '请输入审核说明', trigger: 'blur' }
            ],
            valuename: [
                { required: true, message: '请选择分管领导是否审批', trigger: 'change' }
            ],
            usernameEx: [
                { required: true, message: '请选择下一步审核人', trigger: 'change' }
            ]
      },
      userList: [],
      usernameEx: "",
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
          // coding:'21212',
          // category:'萨达是',
          // startDate:'2019-09-15'
        }
      ],
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
      // 分管领导是否审批
      valuename: "", //初始为空
      optionsname: [
        {
          valuename: "是",
          label: "yes"
        },
        {
          valuename: "否",
          label: "no"
        }
      ],
      // 审核结果
      value: "",
      options: [
        {
          value: "同意",
          label: "同意"
        },
        {
          value: "不同意",
          label: "不同意"
        }
      ],
      globalDataList: {
            planApply: {},
            planImplementprojectList: []
        }
    };
  },
  created() {
      getAjax(`/api/planmanagementService/PlanImplementproject/monthPlan/{applyId}?applyId=${this.$route.query.businessKey}`).then(res => {
                console.log(res)
                this.globalDataList = res.data
                this.globalDataList.planImplementprojectList.forEach(item => {
                    if(item.fileNum == 1) {
                        item.fileNum = '有'
                    }else {
                        item.fileNum = '无'
                    }
                })
	    });
  },
  methods: {
    getExEvent() {
      if (this.ruleForm.value === "") {
        return false;
      }
      var vars = {
        result: this.ruleForm.value,
        needOrgExamine: this.ruleForm.valuename
      };
      postAjaxJson(
        `/api/processService/userTask/getNextExaminePersonByVars/${
          this.$route.query.taskId
        }`,
        vars
      ).then(res => {
        console.log(res);
        this.userList = res.data[0].nextActiveUsers;
      });
    },
    // 审核结果下拉事件
    // selectGet(val){
    //     this.value=val//赋值给value
    //     // console.log(val, '审核结果');
    // },
    // 选择审核人下拉事件
    // selectGetname(val){
    //     this.valuename=val
    //     // console.log(val, '66');
    // },
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
          applyId: this.$route.query.businessKey,
          deploymentKey: "zxjqtfujhlc",
          formId: "",
          fromKey: "",
          manger: "",
          needOrgExamine: this.ruleForm.valuename,
          message: this.ruleForm.textarea,
          needCompanyExamine: this.ruleForm.valuename,
          needTechnologyExamine: "",
          result: this.ruleForm.value,
          taskId: this.$route.query.taskId,
          taskName: "",
          userid: this.ruleForm.usernameEx
        };
        postAjaxJson(
          "/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep",
          obj
        ).then(res => {
          console.log(res);
          if (res.code === "0") {
            this.$message("添加成功");
            this.$router.push({
              path: "/home/index"
            });
          }
        });
      })
    },
    //查看附件事件
        check(row){
            console.log(row)
          this.dialogTableVisible=true
          getAjax(`/api/planmanagementService/PlanImplementproject/${row}`).then(res => {
                console.log(res)
		    });
        },
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
.zxfconsequence {
  width: 90%
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
.zxfresult {
  width: 90%;
  margin: 10px auto;
}
.zxfresult > p {
  height: 66px;
  font-size: 20px;
  padding-top: 20px;
}
.el-select {
  width: 60%;
  margin-left: 2%;
}
.explain {
  height: 100px;
  line-height: 100px;
  position: relative;
  margin-top: 33px;
  padding-left: 5%;
}
.auditor {
  margin-top: 10px;
}
</style>
