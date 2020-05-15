<template>
  <div class="container_table">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <div class="message">计划信息</div>
        <div class="jihua">
          <span>计划名称:{{ globalData.apply.title }}</span>
          <span>申请部门:{{ globalData.apply.orgname  }}</span>
          <span>申请人:{{ globalData.apply.applyusername  }}</span>
          <span>申请时间:{{ globalData.apply.applydate }}</span>
        </div>
        <div class="message">项目信息</div>
        <el-table border :data="globalData.project" style="width: 100%;margin-top: 15px;">
          <el-table-column prop="projectType" align="center" label="项目类别">
          </el-table-column>
          <el-table-column align="center" prop="projectName" label="项目名称">
          </el-table-column>
          <el-table-column align="center" prop="projectMoney" label="项目预估金额">
          </el-table-column>
          <el-table-column align="center" prop="startDate" label="开始时间">
          </el-table-column>
          <el-table-column align="center" prop="endDate" label="结束时间">
          </el-table-column>
          <el-table-column align="center" prop="chargePerson" label="负责人">
          </el-table-column>
          <el-table-column align="center" prop="projectDesc" label="项目简介">
          </el-table-column>
          <el-table-column align="center" prop="filePath" label="附件">
            <template slot-scope="scope">
              <!-- <router-link v-for="item in scope.row.filePath" to="item.filePath">附件</router-link> -->
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span
                style="color: blue; cursor: pointer;"
                @click="afterList(scope.row.id)"
                >查看商品</span
              >
            </template>
          </el-table-column>
        </el-table>
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
      </el-tab-pane>
    </el-tabs>

      <!-- 状态已完成点击查看类别里面的查看商品明细弹框 -->
      <el-dialog
        title="商品明细"
        :visible.sync="afterListcksp"
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
  </div>
</template>

<script>
import { getAjax } from '@/utils/ajaxRequest'
import Pagination from '@/components/Pagination'
export default {
  data() {
    return {
      activeName: 'first',
      tankang: [
        //弹框已完成状态
        {
          postsaleName: "我",
          department: "我",
          createUser: "我",
          createDate: "我"
        }
      ],
      // 时间线
      activities: [
        {
          content: "维修中心成员 李华",
          timestamp: "2018-04-12 20:46",
          size: "large",
          icon: "el-icon-more"
        },
        {
          content: "维修中心主任 赵莉莉 ",
          timestamp: "2018-04-03 20:46"
        },
        {
          content: "维修中心主任 赵莉莉",
          timestamp: "2018-04-03 20:46",
          color: "",
          size: "large"
        },
        {
          content: " 王华华",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
          size: "large"
        }
      ],
      deducTionOptions: [
        //计划状态
        {
          value: "1",
          label: "待审核"
        },
        {
          value: "2",
          label: "审核中"
        },
        {
          value: "3",
          label: "已完成"
        }
      ],
      // 计划状态下拉框
      postsaleState: "",
      // 分页组件-默认显示第一页数据
      currentPage4: 1,
      // 当前页签显示条数
      pageSize: 10,
      // 请输入搜索内容关键字
      searchAM: "",
      // 选择的时间搜索
      chooseTime: "",
      am_tableData: [
        // 年度计划表格
        {
          State: "审核中"
        },
        {
          State: "已完成"
        }
      ],
      //状态已完成查看商品
      afterListcksp: false,
      //状态已完成查看商品明细表格
      afterListDetails: [
        {
          name: ""
        }
      ],
      // 当前表单中有total条数据
      total: 0,
      // 状态已完成,点击查看按钮,显示弹窗
      afterListVisible: false,
      // 点击查看里的表格
      afterDetailsTableData: [
        {
          index: 1
        }
      ],
      postsalegoods: [],
      supplier: {},
      postsaleservice: {},
      // 售后记录单表格数据
      goodsMsgData: [
        {
          goodsName: 213213,
          nagoodsNameme: "煤机1",
          goodsUnit: "万元",
          goodsPrice: 130,
          goodsNum: 10,
          goodsTotal: 1300,
          validateGoodsNum: 5,
          validateGoodsDate: "2020-03-12"
        }
      ],
      xqid: '',
      globalData: {
        apply: {}
      }
    };
  },
  created() {
    this.xqid = this.$route.query.id;
    this.getPlanProjectSelect()
  },
  methods: {
    selectRow() {},
    handleClick() {},
    getPlanProjectSelect() {
      getAjax(`/api/planmanagementService/PlanProjectSelect/findPlandetailsById?applyId=${this.xqid}`).then(res => {
        this.globalData = res.data
      })
    },
    // 点击查看商品弹框
    afterList(id) {
      this.afterListcksp = true;
      getAjax(`/api/planmanagementService/PlanProjectSelect/findProjectGoodsdetailsById?applyId=${this.xqid}&projectId=${id}`).then(res => {
        console.log(res)
        this.afterListDetails = res.data.goods
      })
    },
    afterListVisi(row) {
      this.afterListVisible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container_table {
  height: 100%;
  padding: 20px;
  .message {
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;
    padding-left: 15px;
  }
  .el-card__header {
    .clearfix {
      line-height: 30px;
      span {
        font-size: 20px;
      }
      .el-icon-more {
        font-size: 26px;
        color: #000;
      }
    }
  }
  .tontainer_table_body {
    margin: 15px 10px 15px 0;
    .table_top {
      margin-bottom: 10px;
      .el-input {
        width: 25%;
      }
      span {
        margin: 0 15px 0 40px;
        font-size: 14px;
      }
    }
    .el-table {
      a,
      a:focus,
      a:hover {
        color: #5584ff;
      }
    }
  }
  .el-pagination {
    margin-top: 30px;
    float: right;
    padding-right: 15px;
  }
}
.jjk {
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 18px;
  padding-left: 20px;
  background-color: #ccc;
}
.afterBaseContent {
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 16px;
  padding-left: 15px;
}
h3 {
  text-align: center;
}
.afterElRow {
  margin: 0 15px;
  .el-col {
    margin-top: 15px;
  }
  .el-image {
    margin-right: 15px;
  }
}
.jihua > span {
  display: inline-block;
  margin: 22px 40px;
  font-size: 14px;
}
.zxftime {
  position: absolute;
  top: 20px;
  left: 20%;
  width: 60%;
  height: 200px;
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
  margin: 14% 0;
}
.zxftime > p > span {
  display: inline-block;
  margin-left: 25%;
}
.el-timeline-item {
  padding-bottom: 6%;
}
</style>
