<template>
  <div>
    <navbar />
    <div class="route">
      <span><router-link to="/index">首页</router-link></span
      >&nbsp;&nbsp; &gt;<span>审核</span>
    </div>
    <div class="zxfplan">
      <h3>咨询及其他服务123</h3>
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
                <h4>咨询及其他服务</h4>
              </div>
              <div class="ztable">
                <p>计划信息</p>
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
        </el-dialog>
      </div>
    </div>
    <div style="border-top: 23px solid #d4d6d5;">
      <div
        style="display: flex;height: 60px;align-items: center;padding-left: 5%;margin-top: 20px;"
      >
        <span style="display: inline-block;margin-right: 20px;">会议纪要</span>
        <el-upload
          id="autoExamUpload"
          ref="upload"
          name="articleImage"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
          action="http://61.134.63.231:9090/organizationService/image/uploadImg"
        >
          <el-input slot="trigger" :limit="1" />
        </el-upload>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="审核结果" prop="result">
            <el-select
              @change="getResult"
              v-model="ruleForm.result"
              style="width:400px;"
              placeholder="请选择审核结果"
            >
              <el-option
                v-for="m in resultArr"
                :key="m.label"
                :label="m.label"
                :value="m.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核说明" prop="suggest">
            <el-input
              v-model="ruleForm.suggest"
              type="textarea"
              style="width:400px;"
              placeholder="请输入审核说明"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="ruleForm.result == '同意' && peopleArr.length !== 0"
            label="选择审核人"
            prop="people"
          >
            <el-select
              v-model="ruleForm.people"
              style="width:400px;"
              placeholder="请选择选择审核人"
            >
              <el-option
                v-for="m in peopleArr"
                :key="m.id"
                :label="m.name"
                :value="m.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/views/layout/components/Navbar"; //导航
import {
  getAjax,
  postAjax,
  postAjaxJson,
  postAjaxx
} from "@/utils/ajaxRequest";
export default {
  name: "Result",
  components: {
    Navbar
  },
  data() {
    return {
      peopleArr: [],
      resultArr: [
        {
          label: "同意",
          value: "同意"
        },
        {
          label: "不同意",
          value: "不同意"
        }
      ],
      ruleForm: {
        result: "",
        suggest: "",
        people: ""
      },
      rules: {
        result: [
          { required: true, message: '请选择审核结果', trigger: 'change' }
        ],
        suggest: [
          { required: true, message: '请输入审核说明', trigger: 'blur' }
        ],
        people: [
          { required: true, message: '请选择下一步审核人', trigger: 'change' }
        ],
      },
      textarea: "", //审核说明
      activeName: "first", //标签页切换
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
      // 上传文件
      fileList: [{}],
      globalDataList: {
        planApply: {},
        planImplementprojectList: []
      },
      fileName: '',
      filePath: '',
      flag: false
    };
  },
  created() {
    getAjax(
      `/api/planmanagementService/PlanImplementproject/monthPlan/{applyId}?applyId=${
        this.$route.query.businessKey
      }`
    ).then(res => {
      console.log(res);
      this.globalDataList = res.data;
      this.globalDataList.planImplementprojectList.forEach(item => {
        if (item.fileNum == 1) {
          item.fileNum = "有";
        } else {
          item.fileNum = "无";
        }
      });
    });
  },
  methods: {
    handleSuccess(res,file) {
        console.log(res)
        this.flag = true
				if(res.code == 0) {
          this.fileName = file.name
          this.filePath = res.data
          this.$message('文件上传成功')
				} else {
					this.$message(file.message)
				}
			},
    submitForm(formName) {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if(!this.flag) {
            return this.$message('请上传会议纪要文件')
          }
          var obj = {
            "applyId": this.$route.query.businessKey,
            "planAnnexFile": {
              "annexChinaName": "",
              "annexFileType": "",
              "createDate": "",
              "createUser": sessionStorage.userId,
              "createUserName": sessionStorage.userId,
              "deleteDate": "",
              "deleteUser": "",
              "fileName": this.fileName,
              "filePath": this.filePath,
              "id": "",
              "mainTableId": "",
              "ordernum": 0,
              "updateDate": "",
              "updateUser": sessionStorage.userId,
              "useable": ""
            }
          }
          console.log(obj)
          postAjaxx(
            "/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep",
            JSON.stringify(obj)
          ).then(res => {
            console.log(res)
          })
          var param = {
            applyId: this.$route.query.businessKey,
            deploymentKey: "zxjqtfujhlc",
            formId: "",
            fromKey: "",
            manger: "",
            needOrgExamine: "",
            message: this.ruleForm.suggest,
            needCompanyExamine: this.ruleForm.valuename,
            needTechnologyExamine: "",
            result: this.ruleForm.result,
            taskId: this.$route.query.taskId,
            taskName: "",
            userid: this.ruleForm.people
          };
          console.log(param);
          postAjaxx(
            "/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep",
            JSON.stringify(param)
          ).then(res => {
            if (res.code == 0) {
              this.$message("成功");
              this.$router.push("/home/index");
            } else {
              this.$message(res.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getResult(e) {
      if(e === '不同意') {
        this.flag = true
      }
      console.log("触发了该项目");
      postAjaxJson(
        `/api/processService/userTask/getNewTaskPathAndExaminePerson/${
          this.$route.query.taskId
        }`
      ).then(res => {
        console.log(res);
        console.log("123456");
        if (res.code == 0) {
          _.forEach(res.data, value => {
            if (value.name == this.ruleForm.result) {
              this.peopleArr = value.nextActiveUsers;
              this.taskName = value.nextActiveName;
            }
          });
        }
      });
    },
    // 切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //确认提交按钮
    zxfsummary() {
      this.$router.push("/ConsultsMeetingyou/");
    },
    //查看附件事件
    check(row) {
      console.log(row);
      this.dialogTableVisible = true;
      getAjax(`/api/planmanagementService/PlanImplementproject/${row}`).then(
        res => {
          console.log(res);
        }
      );
    },
    // 上传文件函数
    handleChange(file, fileList) {
      // this.fileList = fileList.slice();
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
.upload-demo {
  display: flex;
}
</style>
