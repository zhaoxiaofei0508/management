<template>
  <div>
   <!-- <Navbar></Navbar> -->
   <div class="route" style="margin-top: 0;">
      <span><router-link to="/index">首页</router-link></span
      >&nbsp;&nbsp; &gt;
      <span>创建计划</span>
    </div>
    <h3>年度科研项目计划实施</h3>
    <div class="content">
      <div class="content_top">
        <p>
          标题:
          <input
            type="text"
            v-model="biaoti"
            placeholder="年度科研项目计划实施"
          />
        </p>
        <p>
          流程:
          <span @click="showModal = true" class="btn">查看流程图</span>
        </p>
      </div>
      <h3>{{ formName }}</h3>
      <div class="essential_top">
        <p>基本信息</p>
        <ul>
          <li>
            申请人:
            <span class="usname">{{ userName }}</span>
            <i class="iconfont icon-user-3"></i>
          </li>
          <li>
            申请部门:
            <span class="usname">{{ orgName }}</span>
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
        <el-button
          plain
          @click="selectProject()"
          style="margin-top: 2%;"
          >选择项目</el-button
        >
        <div v-show="boller" style="display: flex;margin-top: 2%;">
          <span style="font-size: 14px;margin: 0 10px;">项目信息</span>
          <el-table :data="gridData" width="100%">
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
              prop="projectDesc"
              width="180px"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="table">
        <span>附件</span>
        <el-table
          :data="tableData"
          slot="empty"
          border
          style="width: 62%"
          @selection-change="selectRow"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50px"
          >
          </el-table-column>
          <el-table-column label="附件名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fileName" placeholder="请输入内容"></el-input>
          </template>
          </el-table-column>
          <el-table-column prop="city" label="上传" align="center">
            <template slot-scope="scope">
              <el-upload
                class="upload-demo"
                ref="upload"
                name="articleImage"
                :on-success="handleSuccess"
                action="http://61.134.63.231:9090/organizationService/image/uploadImg"
              >
                <el-button size="medium" type="primary">点击上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="编辑" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editCurrent(scope.row)">在线编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click.prevent="accessoryaddRow()"
                type="text"
                size="small"
                >增加</el-button
              >
              <el-button
                type="text"
                size="small"
                @click.prevent="removeDomain(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom">
        <span>取消</span>
        <span @click="saveDraft()">保存草稿</span>
        <span @click="saveApply()">提交审核</span>
      </div>
    </div>
    <!-- 选择项目弹框 -->
    <el-dialog
      title="项目选择"
      :visible.sync="dialogTableVisible"
      :before-close="handleClose"
    >
      <el-row :gutter="20">
        <el-col :span="15">
          <div class="materialMsg">
            <el-table
              border
              :data="materialTableData"
              style="width: 100%;margin:20px 0;"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" align="center" width="55">
              </el-table-column>
              <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" style="">
        <el-button @click="dialogTableVisible= false">取 消</el-button>
        <el-button type="primary" @click="comfigselectVisibles">确定</el-button>
      </span>
    </el-dialog>

    <!-- 在线编辑 -->
    <el-dialog title="在线编辑" :visible.sync="editing" width="90%">
      <div>
        <tinymce :id="tinyId" :height="200" v-model="content" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postAjaxJson, getAjax } from "@/utils/ajaxRequest";
import Tinymce from "@/components/Tinymce";
import Navbar from "@/views/layout/components/Navbar";
import { parseTime } from "@/utils"
export default {
  components: {
    Navbar,
    Tinymce
  },
  data() {
    return {
      tinyId: '',
      content: '',
      editing: false,
      zxfsearch: "",
      formName: "",
      userName: "王二",
      orgName: "掘进中心",
      applyDate: "2020-04-27",
      vars: {
        dept: sessionStorage.orgType
      },
      planProjectParamVo: {
        planApply: {
          applyDate: "",
          applyRecord: "",
          applyState: "",
          applyType: "",
          applyUsername: "",
          applyresult: "",
          createDate: "",
          createUser: "",
          deleteDate: "",
          deleteUser: "",
          flowId: "",
          formId: "bc9d129d1a7f47229b65728a5412136f",
          id: "",
          orgId: "",
          orgName: "",
          orgType: "",
          planClass: "",
          raskMark: "",
          remarks: "",
          title: "年度科研项目实施",
          updateDate: "",
          updateUser: "",
          useable: ""
        },
        planCollect: {
          applyDate: "",
          applyId: "",
          belongMonth: "",
          belongYear: "",
          collectType: "",
          createDate: "",
          createUser: "",
          deleteDate: "",
          deleteUser: "",
          endDate: "",
          formClass: "",
          formId: "bc9d129d1a7f47229b65728a5412136f",
          handleDate: "",
          handleOrgId: "",
          handleOrgName: "",
          handleOrgType: "",
          id: "",
          orgId: "",
          orgName: "",
          orgType: "",
          planDesc: "",
          planType: "",
          remarks: "",
          replyId: "",
          sendDate: "",
          sendUserid: "",
          sendUsername: "",
          startData: "",
          summaryName: "",
          title: "",
          updateDate: "",
          updateUser: "",
          useable: ""
        },
        planCollectplanList: [
          {
            collectId: "",
            collectType: "",
            createDate: "",
            createUser: "",
            deleteDate: "",
            deleteUser: "",
            id: "",
            planClass: "",
            planId: "",
            updateDate: "",
            updateUser: "",
            useable: ""
          }
        ],
        planImplement: {
          applyDate: "",
          applyId: "",
          beforeId: "",
          belongMonth: "",
          belongYear: "",
          chargeDesc: "",
          createDate: "",
          createUser: "",
          deleteDate: "",
          deleteUser: "",
          endDate: "",
          formClass: "",
          formId: "bc9d129d1a7f47229b65728a5412136f",
          fundsType: "",
          handleDate: "",
          handleOrgId: "",
          handleOrgName: "",
          handleOrgType: "",
          id: "",
          orgId: "",
          orgName: "",
          orgType: "",
          planDesc: '',
          planType: "",
          remarks: "",
          startData: "",
          title: "",
          updateDate: "",
          updateUser: "",
          useable: ""
        },
        planImplementprojectVoList: [
          {
            planAnnexfileList: [
              {
                annexChinaName: "",
                annexFileType: "",
                createDate: "",
                createUser: "",
                deleteDate: "",
                deleteUser: "",
                fileName: "",
                filePath: "",
                id: "",
                mainTableId: "",
                ordernum: 0,
                updateDate: "",
                updateUser: "",
                useable: ""
              }
            ],
            planGoodsSourceList: [
              {
                createDate: "",
                createUser: "",
                deleteDate: "",
                deleteUser: "",
                goodsId: "",
                goodsMark: "",
                id: "",
                lockMark: "",
                remark: "",
                sourceOrder: "",
                stockBoxCode: "",
                stockGoodsCode: "",
                stockGoodsId: "",
                stockLocationCode: "",
                stockNumber: "0",
                stockProject: "",
                stockShelvesCode: "",
                stockcode: "",
                updateDate: "",
                updateUser: "",
                useGoodsNumber: "",
                useable: ""
              }
            ],
            planImplementGoodsList: [
              {goodsTotal:""}
            ],
            planImplementproject: {},
          }
        ],
        startWorkflowParameterVo: {
          assigneeExpressionText: "",
          departId: "",
          deploymentKey: "",
          id: "",
          name: "",
          userId: ""
        }
      },
      businessForm: "",
      biaoti: "", //标题
      value1: "", //日期筛选框
      dialogTableVisible: false, //选择项目弹框
      dialogTableVisibles: false, //编辑商品弹框
      textarea: "", //文本域
      dynamicValidateForm: {
        name: ""
      },
      //虚拟表格
      gridData: [],
      boller: false, //表格显示隐藏
      // 选择物资按钮弹框表格
      materialTableData: [
      ],
      selectlistRow: [],
      control: [],
      //附件表格
      tableData: [
        {
          fileName: '',
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      selectProjectList: []
    };
  },
  methods: {
    // 点击删除按钮
    removeDomain(e) {
      this.tableData.splice(e, 1)
    },
    // 点击增加按钮
    accessoryaddRow() {
      this.tableData.push({
        fileName: ''
      })
    },
    selectProject(){
      this.dialogTableVisible=true
      getAjax(
        "/api/planmanagementService/annualResearchProjectImplementeFlow/getNoImplementeProject"
      ).then(res => {
        this.materialTableData = res.data.planBudgetprojectList;
        this.tableData = res.data.planAnnexFileList;
        console.log(res);
      });
    },
    // 点击选择项目
    comfigselectVisibles(){
       this.boller = true;
       this.gridData = []
       this.tableData = []
       var projectId = [];
        this.selectProjectList.forEach((val, index) => {
            projectId.push(val.id)
        });
        getAjax(
          "/api/planmanagementService/annualResearchProjectImplementeFlow/findProjectAnnexfiles?projectIds="+projectId
        ).then(res => {
          console.log(res)
          res.data.forEach((val, index) => {
            console.log(val)
             var planBudgetProject = val.planBudgetProject;
             this.gridData.push(planBudgetProject)
             this.tableData.push(val.planAnnexFileList)
          });
          this.dialogTableVisible = false
        })
    },
    // 点击在线编辑
    editCurrent() {
      this.editing = true
    },
    handleSuccess(res) {
      console.log(res);
    },
    // 表格点击当前索引事件
    handleSelectionChange(row) {
      this.selectProjectList = row
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 点击编辑商品
    compile() {
      this.dialogTableVisibles = true;
    },
    // 编辑商品保存按钮
    save() {
      this.dialogTableVisibles = false;
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val;
    },
    saveDraft() {
      this.gridData.forEach((val, index) => {
        this.planProjectParamVo.planImplementprojectVoList[index].planImplementproject = val
      });
      postAjaxJson(
        "/api/PlanProjectSelect/addPlanProjectApply",
        this.planProjectParamVo
      ).then(res => {
        console.log(res);
      });
    },
    handleClose() {},
    handleChange() {},
    saveApply() {
      if(this.gridData.length === 0) {
        return this.$message('请选择项目')
      }
      this.gridData.forEach((val, index) => {
        this.planProjectParamVo.planImplementprojectVoList[index].planImplementproject = val
      });
      this.planType
      this.planProjectParamVo.planImplementprojectVoList[0].planImplementproject.projectMoney = "500000000"
      postAjaxJson(
        "/api/planmanagementService/activeStartSubmitCon/researchProSaveExmine",
        this.planProjectParamVo
      ).then(res => {
        if (res.code == 0) {
            this.$router.push('/home')
            this.$message(res.message)
        }
      });
    }
  },
  created() {
    this.planProjectParamVo.planImplement.planType = this.$route.query.formName
    this.planProjectParamVo.planApply.formId = this.$route.query.id
    this.orgName = sessionStorage.orgName
    this.userName = sessionStorage.userName
    this.applyDate =  parseTime(new Date(), "{y}-{m}-{d}");
    this.planProjectParamVo.planApply.orgId = sessionStorage.orgId
    this.planProjectParamVo.planApply.orgName = sessionStorage.orgName
    this.planProjectParamVo.planApply.applyDate =  parseTime(new Date(), "{y}-{m}-{d}");
    this.planProjectParamVo.planApply.applyUsername = sessionStorage.userName
    postAjaxJson(
      "/api/planmanagementService/active/userTask/getFirstExaminePerson/kyxmss",
      this.vars
    ).then(res => {
      (this.planProjectParamVo.startWorkflowParameterVo.assigneeExpressionText =
        res.data[0].assigneeExpressionText),
        (this.planProjectParamVo.startWorkflowParameterVo.departId =
          res.data[0].departId),
        (this.planProjectParamVo.startWorkflowParameterVo.deploymentKey =
          "kyxmss"),
        (this.planProjectParamVo.startWorkflowParameterVo.id = res.data[0].id),
        (this.planProjectParamVo.startWorkflowParameterVo.name =
          res.data[0].name),
        (this.planProjectParamVo.startWorkflowParameterVo.userId =
          res.data[0].id);
    });
  }
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
.cgsm {
  margin-top: 5%;
  line-height: 46px;
  font-size: 14px;
}
.el-textarea {
  width: 60%;
  margin-left: 1%;
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
.selectContract {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  input {
    margin: 15px;
  }
}
.materialMsg  {
  border: 1px solid #ccc;
  height: 400px;
  .el-input  {
    margin: 20px 10px;
  }
}
.block {
  text-align: center;
}
.el-date-editor {
  width: 35%;
}
.el-tree {
  margin-top: 20px;
  padding-left: 35%;
}
.preserve {
  margin-top: 2%;
  display: flex;
  justify-content: center;
}
.el-form {
  margin-top: 5%;
}
.table {
  display: flex;
  margin-top: 20px;
  width: 77.3%;
}
.table > span {
  margin-left: 7%;
  padding-top: 14px;
  margin-right: 1%;
}
.buttons {
  background-color: darkgray;
  border: none;
}
.editing {
  color: #409eff;
}
// .el-dialog__footer{

// }
</style>
