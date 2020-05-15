<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
        </el-tree>
      </el-aside>
      <el-main>
        <div style="display: flex; font-size: 14px;">
          <el-input @input="searchKeyWord" style="width: 250px" v-model="searcAm" placeholder="请输入内容"></el-input>
          <div style="margin: 0 15px;">
            <span>选择部门</span>
            <el-select clearable @clear=clearDepartment @change="selectDepartEvent" v-model="selectDepartment" placeholder="请选择">
              <el-option
                v-for="item in departmentList"
                :key="item.id"
                :label="item.organizationName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div style="margin-right: 15px;">
            <span>采购状态</span>
            <el-select clearable @clear=clearPlan @change="selectPlanEvent" v-model="selectPlan" placeholder="请选择">
              <el-option
                v-for="item in planDataList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <span>时间选择</span>
            <el-date-picker
              @change="chooseTimeEvent"
              v-model="chooseTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </div>
        <el-table
          :data="planTableData"
          style="width: 100%; margin-top: 20px;">
          <el-table-column
            prop="title"
            label="计划名称">
          </el-table-column>
          <el-table-column
            prop="applyUsername"
            label="申请人">
          </el-table-column>
          <el-table-column
            prop="applyDate"
            label="提交事件">
          </el-table-column>
          <el-table-column
            prop="orgName"
            label="提报部门">
          </el-table-column>
          <el-table-column
            prop="applyStatus"
            label="采购状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.planClass === '汇总计划'" type="text"><router-link :to="{path: 'goodsDetailer', query: {id: scope.row.id}}">查看</router-link></el-button>
              <el-button v-else type="text"><router-link :to="{path: 'contractChangeLc', query: {id: scope.row.id}}">查看</router-link></el-button>
              <el-button type="text" @click="issuePurchase">下发采购</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPlanList" />
      </el-main>
    </el-container>
    <el-dialog
      title="提示"
      :visible.sync="planDialogVisible"
      width="30%"
      close-on-click-modal
      :before-close="planHandleClose">
      <span>实施部门</span>
      <el-select v-model="planDepartment" placeholder="请选择">
        <el-option
          v-for="item in ImplementationPlan"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="planDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="planDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import  Navbar from '@/views/layout/components/Navbar'
import { getAjax } from '@/utils/ajaxRequest'
  import Pagination from '@/components/Pagination'
export default {
components: {
    Navbar,
    Pagination
},
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      planDialogVisible: false,
      ImplementationPlan: [
        {
          label: '计划经济部',
          value: '402881f56b87527d016b8753db740004',
        },
        {
          label: '神煤科技服务事业部',
          value: '402881f56b87527d016b8755abba0011',
        }
      ],
      planDepartment: '',
      // 搜索关键字
      searcAm: '',
      // 选择时间
      chooseTime: '',
      // 采购状态
      selectPlan: '',
      departmentList: [],
      selectDepartment: '',
      planDataList: [
        {
          label: '未下发',
          value: '0'
        },
        {
          label: '已下发',
          value: '1'
        },
      ],
       treeData: [],
      defaultProps: {
          children: 'children',
          label: 'formName'
        },
      // 设置二级表单激活高亮
      activePath: "",
      // 计划类别
      planClass: '实施计划',
      // 计划具体类别
      planDetailClass: '',
      planTableData: []
    }
  },
  created() {
    // this.activePath = window.sessionStorage.getItem('activePath')
    // 获取左侧侧边栏数据
    this.getMenuList()
    this.getPlanList()
    this.getDepartmentList()
  },
  methods: {
    chooseTimeEvent(e) {
      if(e === null) {
        this.chooseTime = ''
      }
      this.getPlanList()
    },
    planHandleClose() {
      this.planDialogVisible = false
    },
    selectPlanEvent() {
      this.getPlanList()
    },
    selectDepartEvent() {
      this.getPlanList()
    },
    // 点击下发采购触发该事件
    issuePurchase() {
      this.planDialogVisible = true
    },
    searchKeyWord(e) {
      this.searcAm = e
      this.getPlanList()
    },
    handleNodeClick(e) {
      if(e.formType === undefined) {
        return
      }
      this.planClass = e.formType
      this.planDetailClass = e.id
      this.getPlanList()
    },
    getList() {
      // this.listQuery.page - 1,this.listQuery.limit,
    },
    // 查询部门列表
    getDepartmentList() {
      getAjax(`/api/planmanagementService/PlanProjectSelect/findOrganizationList`).then(res => {
        console.log(res)
        this.departmentList = res.data
      })
    },
    getMenuList() {
      getAjax("/api/planmanagementService/PlanProjectSelect/findPlanTypeList").then(res => {
        console.log(res)
        var arr = []
        arr.push(
          {
            formName: '实施计划',
            id: '1',
            children: []
          },
          {
            formName: '汇总计划',
            id: '2',
            children: []
          },
        )
        arr[0].children = res.data.implementplan
        arr[1].children = res.data.collectplan
        console.log(arr)
        this.treeData = arr
		  });
    },
    clearDepartment() {
      this.getPlanList()
    },
    clearPlan() {
      this.getPlanList()
    },
    // 表格数据
    getPlanList() {
			getAjax(`/api/planmanagementService/PlanProjectSelect/findPlanProjectList?applyState=&beginTime=${this.chooseTime}&endTime=${this.chooseTime}&orgId=${this.selectDepartment}&pageNumber=${this.listQuery.page - 1}&pageSize=${this.listQuery.limit}&planClass=${this.planClass}&planType=&title=${this.searcAm}&formId=${this.planDetailClass}`).then(res => {
        console.log(res)
        this.planTableData = res.data.content
        this.total = res.data.totalElements
        this.planTableData.forEach(item => {
          item.applyDate = item.applyDate || item.applyDate.split('T')[0]
        })
			});
    },
    handleOpen() {
        
    },
    handleClose() {
        
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container_j {
  height: 100%;
  .header_j {
    height: 70px;
    width: 100%;
    // background-color: #000;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    line-height: 70px;
    .left {
      font-size: 20px;
      font-weight: 700;
    }
    .right {
      span {
        margin: 0 10px;
      }
      span:nth-child(1) {
        border-right: 1px solid #fff;
        padding: 10px;
        margin-right: 0;
      }
    }
  }
  .el-container {
    // height: 100%;
    .el-aside {
    //   background-color: #000;
      width: 100%;
      // height: 565px;
      // height: 100%;
      .el-menu {
        border-right-width: 0;
        height: 100%;
      }
    }
  }
  // .creeat{
  //   line-height: 20px;
  // }
  .el-main {
    padding: 0;
  }
}
</style>
