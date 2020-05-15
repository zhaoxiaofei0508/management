<template>
  <div class="contracin_j">
    <!-- <Navbar></Navbar> -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <div class="message">计划信息</div>
        <div class="jihua">
          <span>计划名称:{{ globalData.apply.title }}</span>
          <span>申请部门:{{ globalData.apply.orgname  }}</span>
          <span>申请人:{{ globalData.apply.applyusername  }}</span>
          <span>申请时间:{{ globalData.apply.applydate }}</span>
        </div>
        <div class="message">商品信息</div>
        <el-table
          :data="globalData.Goods"
          ref="table"
          tooltip-effect="dark"
          border
          stripe
          style="margin-top: 20px"
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
        <div>备注: </div>
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
  </div>
</template>

<script>
import { getAjax } from '@/utils/ajaxRequest'
export default {
  data() {
    return {
      activeName: 'first',
      afterListDetails: [],
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
      globalData: {
        apply: {},
        Goods: []
      },
      xqid: ''
    }
  },
  created() {
    this.xqid = this.$route.query.id;
    this.getPlanProjectSelect()
  },
  methods: {
    getPlanProjectSelect() {
      getAjax(`/api/planmanagementService/PlanProjectSelect/findPlandetailsById?applyId=${this.xqid}`).then(res => {
        this.globalData = res.data
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.contracin_j {
  padding: 15px;
  .message {
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;
    padding-left: 15px;
  }
  .jihua > span {
    display: inline-block;
    margin: 22px 40px;
    font-size: 14px;
  }
}
</style>
