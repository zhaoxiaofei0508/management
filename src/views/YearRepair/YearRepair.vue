<template>
  <div>
    <!-- ss -->
    <div class="route" style="margin-top: 0;">
      <span><router-link to="/index">首页</router-link></span
      >&nbsp;&nbsp; &gt;
      <span>创建计划</span>
    </div>
    <div class="content">
      <div class="content_top">
        <p>
          标题:
          <input
            type="text"
            v-model="biaoti"
            placeholder="年度大修月度实施计划"
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
          @click="selectProject"
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
            <el-table-column label="附件" align="center" prop="annexChinaName">
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="compile(scope.row)"
                  >编辑商品</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="name"
          label="大修说明"
          :rules="[
            { required: true, message: '请输入大修说明', trigger: 'blur' }
          ]"
        >
          <el-input
            type="textarea"
            placeholder="请输入大修说明"
            v-model="dynamicValidateForm.name"
            style="width:74%"
          ></el-input>
        </el-form-item>
      </el-form>
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
          <el-table-column prop="Probjusname" label="附件名称" align="center">
          </el-table-column>
          <el-table-column prop="city" label="上传" align="center">
            <template slot-scope="scope">
              <el-upload
                class="upload-demo"
                ref="upload"
                :file-list="fileList"
                name="articleImage"
                :headers="handleHeader"
                :on-exceed="handleExceed"
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
                @click.prevent="removeDomain()"
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
      width="60%"
      :before-close="handleClose"
    >
      <div class="block">
        <span class="demonstration">年度选择</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          width="35%"
        >
        </el-date-picker>
      </div>
      <el-tree
        :data="control"
        show-checkbox
        node-key="label"
        :props="defaultProps"
        @check-change="handleNodeClick"
      >
      </el-tree>
      <span slot="footer" class="button">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfigselectVisible">确定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑商品弹框 -->
    <el-dialog
      title="项目选择"
      :visible.sync="dialogTableVisibles"
      width="98%"
      :before-close="handleClose"
    >
      <div class="operating" style="padding:0 30px;">
        <el-button size="small" type="primary" plain @click.prevent="addRow()"
          >增加行</el-button
        >
        <el-button size="small" type="primary" plain>复制行</el-button>
        <el-button size="small" type="primary" plain @click.prevent="delData()"
          >删除行</el-button
        >
        <el-button size="small" type="primary" plain>导入数据</el-button>
        <el-button size="small" type="primary" plain>全部删除</el-button>
        <el-input
          v-model="zxfsearch"
          style="display: inline-block;width: 17%;borderRight:none;margin-left: 10%;"
          placeholder="请输入搜索内容"
          icon="el-icon-search"
        >
        </el-input>
      </div>
      <div class="ztable">
        <el-table
          :data="tableDatas"
          ref="table"
          tooltip-effect="dark"
          border
          stripe
          style="width: 100%"
          @selection-change="selectRow"
        >
          <el-table-column
            type="selection"
            width="45"
            align="center"
          ></el-table-column>
          <el-table-column label="分类" width="80" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsClass"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="编码" align="center" width="80">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsCode"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="商品/服务名称" width="120" class="zxfsh">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsName"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="规则型号/描述" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsModel"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="单位" width="60">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsunit"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="60">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsNumber"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="预估单价">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsPrice"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="预估总价">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsTotal"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.goodsType" placeholder="请选择">
                <el-option
                  v-for="item in optionss"
                  :key="item.value"
                  :label="item.label"
                  :value="item.goodsType"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="计划实施时间" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.startDate"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="计划交付时间" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.endDate" class="inputss"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="主机厂家">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.factoryName"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="技术要求">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.technologyDesc"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remarks" class="inputss"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="preserve ">
        <el-button plain @click="dialogTableVisibles = false">取消</el-button>
        <el-button type="primary" plain @click="save()">确定</el-button>
      </div>
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
          formId: "bd9347e5583f4726a86f1744ad25d438",
          id: "",
          orgId: "",
          orgName: "",
          orgType: "",
          planClass: "",
          raskMark: "",
          remarks: "",
          title: "年度大修实施计划",
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
          formId: "bd9347e5583f4726a86f1744ad25d438",
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
          formId: "bd9347e5583f4726a86f1744ad25d438",
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

            ],
            planImplementproject: {
              approval: "",
              budgetProjectId: "",
              chargePerson: "",
              createDate: "",
              createUser: "",
              deleteDate: "",
              deleteUser: "",
              endDate: "",
              fundsType: "",
              id: "",
              implementId: "",
              isPlan: "",
              planMonth: "",
              planYear: "",
              projectNo: "",
              projectDesc: "",
              projectGrade: "",
              projectMoney: "0",
              projectName: "",
              projectType: "",
              remark: "",
              startDate: "",
              updateDate: "",
              updateUser: "",
              useable: ""
            }
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
      // 点击编辑商品表格
      tableDatas: [
        {
          createDate: "",
          createUser: "",
          deleteDate: "",
          deleteUser: "",
          endDate: "",
          factoryName: "",
          futuresNumber: 0,
          goodsClass: "",
          goodsCode: "",
          goodsMark: "",
          goodsModel: "",
          goodsName: "",
          goodsNumber: 0,
          goodsPrice: 0,
          goodsTotal: 0,
          goodsType: "",
          goodsunit: "",
          id: "",
          lockNumber: 0,
          lockStoreNumber: 0,
          nolockNumber: 0,
          nolockStoreNumber: 0,
          projectId: "",
          purchaseNumber: 0,
          remarks: "",
          securityStoreNumber: 0,
          startDate: "",
          stockNumber: 0,
          technologyDesc: "",
          updateDate: "",
          updateUser: "",
          useable: "",
          waitStoreNumber: 0,
          yearNumber: 0
        }
      ],
      boller: false, //表格显示隐藏
      // 选择物资按钮弹框表格
      materialTableData: [
        {
          goodName: "223"
        },
        {
          goodName: "234"
        }
      ],
      selectlistRow: [],
      control: [],
      //附件表格
      tableData: [
        {
          Probjusname: "技术文档",
        },
        {
          Probjusname: "检测表",
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      projectId : [],
    };
  },
  methods: {
    selectProject() {
      this.dialogTableVisible=true
      getAjax(
        "/api/planmanagementService/PlanProjectSelect/findYearOverhaulProjectList?planType=大修类"
      ).then(res => {
        // this.biaodanArray = res.data;
        console.log(res);
        var arr = [];
        arr.push({
          label: "大修计划",
          id: 1234,
          children: []
        });
        res.data[0].id = 461321;
        arr[0].children = res.data;

        this.control = arr;
        console.log(arr);
      });
    },
    clickcDialogTableVisible() {

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
      // console.log(row)
    },
    handleNodeClick(data) {
      this.projectId.push(data.id)
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
    // 添加商品增加行
    addRow() {
      var list = {
        rowNum: "",
        coding: this.coding, //编码
        name: this.name, //名称
        monad: this.monad, //单位
        quantity: this.quantity, //数量
        estimate: this.estimate, //预估单价
        prices: this.prices, //预估总价
        describe: this.describe, //描述
        type: this.type //类型
      };
      this.tableDatas.unshift(list);
    },
    // 删除商品增加行
    delData() {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        let val = this.selectlistRow;
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.tableDatas.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              // i 为选中的索引
              this.tableDatas.splice(i, 1);
            }
          });
        });
      }
      // 删除完数据之后清除勾选框
      this.$refs.tableDatas.clearSelection();
    },
    // 确认选择项目的按钮
    comfigselectVisible() {
      console.log(this.projectId)
      this.gridData = []
      getAjax(
        "/api/planmanagementService/annualResearchProjectImplementeFlow/findProjectAnnexfiles?projectIds="+this.projectId
      ).then(res => {
        res.data.forEach((val, key) => {
          if(val.planBudgetProject != null){
            this.gridData.push(val.planBudgetProject)
          }
        });
        console.log(res);
      });
      this.boller = true;
      this.dialogTableVisible = false;
    },
    //附件的增加行
    accessoryaddRow() {
      var list = {
        rowNum: "",
        fileName: this.fileName,
        loveer: this.loveer
      };
      this.tableData.unshift(list);
    },
    //附件的删除行
    removeDomain() {
      var index = this.tableData.indexOf();
      this.tableData.splice(index);
    },
    saveDraft() {
      var list = this.planProjectParamVo.planImplementprojectVoList[0];
      this.gridData.forEach((val, key) => {
        var project = list.planImplementproject;
        project.projectNo = val.projectNo;
        project.projectName = val.projectName;
        project.startDate = val.startDate;
        project.endDate = val.endDate;
        project.chargePerson = val.chargePerson;
        project.projectDesc = val.projectDesc;
        project.projectMoney = val.projectMoney;
        project.projectType = val.projectType;
      });
      this.planProjectParamVo.planImplement.planDesc = this.dynamicValidateForm.name
      this.tableDatas.forEach((val, key) => {
        var goods = {}
        //var goods = list.planImplementGoodsList[key];
        goods.goodsClass = val.goodsClass;
        goods.goodsCode = val.goodsCode;
        goods.goodsName = val.goodsName;
        goods.goodsModel = val.goodsModel;
        goods.goodsunit = val.goodsunit;
        goods.goodsNumber = val.goodsNumber;
        goods.goodsPrice = val.goodsPrice;
        goods.goodsTotal = val.goodsTotal;
        goods.goodsType = val.goodsType;
        goods.startDate = val.startDate;
        goods.endDate = val.endDate;
        goods.factoryName = val.factoryName;
        goods.technologyDesc = val.technologyDesc;
        goods.remarks = val.remarks;
        list.planImplementGoodsList.push(goods)
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
      this.$refs['dynamicValidateForm'].validate((valid) => {
        if (!valid) {
          return this.$message('请输入大修说明')
        }
        if(this.gridData.length == 0) {
          return this.$message('请选择项目')
        }
        var list = this.planProjectParamVo.planImplementprojectVoList[0];
        this.gridData.forEach((val, key) => {
            var project = list.planImplementproject;
            console.log(val);
            console.log(list);
            project.projectNo = val.projectNo;
            project.projectName = val.projectName;
            project.startDate = val.startDate;
            project.endDate = val.endDate;
            project.chargePerson = val.chargePerson;
            project.projectDesc = val.projectDesc;
            project.projectMoney = '6000000';
            // project.projectMoney = val.projectMoney;
            project.projectType = val.projectType;
        });
        this.tableDatas.forEach((val, key) => {
            var goods = {}
            goods.goodsClass = val.goodsClass;
            goods.goodsCode = val.goodsCode;
            goods.goodsName = val.goodsName;
            goods.goodsModel = val.goodsModel;
            goods.goodsunit = val.goodsunit;
            goods.goodsNumber = val.goodsNumber;
            goods.goodsPrice = val.goodsPrice;
            // goods.goodsTotal = val.goodsTotal;
            goods.goodsTotal = '6000000';
            // goods.goodsTotal = val.projectMoney;
            goods.goodsType = val.goodsType;
            goods.startDate = val.startDate;
            goods.endDate = val.endDate;
            goods.factoryName = val.factoryName;
            goods.technologyDesc = val.technologyDesc;
            goods.remarks = val.remarks;
            list.planImplementGoodsList.push(goods)
        });
        postAjaxJson(
            "/api/planmanagementService/activeStartSubmitCon/annOverSaveExmine",
            this.planProjectParamVo
        ).then(res => {
            if (res.code == 0) {
                this.$router.push('/home')
                this.$message(res.message)

            }
        });
      })
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
    // getAjax(
    //   "/api/planmanagementService/PlanProjectSelect/findYearOverhaulProjectList?planType=大修类"
    // ).then(res => {
    //   // this.biaodanArray = res.data;
    //   console.log(res);
    //   var arr = [];
    //   arr.push({
    //     label: "大修计划",
    //     id: 1234,
    //     children: []
    //   });
    //   res.data[0].id = 461321;
    //   arr[0].children = res.data;

    //   this.control = arr;
    //   console.log(arr);
    // });
    let xqName = this.$route.query.formName;
    this.formName = xqName;
    let xqid = this.$route.query.id;
    postAjaxJson(
      "/api/planmanagementService/active/userTask/getFirstExaminePerson/nddxydssjh",
      this.vars
    ).then(res => {
      (this.planProjectParamVo.startWorkflowParameterVo.assigneeExpressionText =
        res.data[0].assigneeExpressionText),
        (this.planProjectParamVo.startWorkflowParameterVo.departId =
          res.data[0].departId),
        (this.planProjectParamVo.startWorkflowParameterVo.deploymentKey =
          "nddxydssjh"),
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
