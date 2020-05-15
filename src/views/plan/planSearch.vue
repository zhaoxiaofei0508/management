<template>
	<div>
    <el-row :gutter="20">
        <el-col :span="8">
          <el-input @input="searchKeyWords" v-model="search" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="8">
          <span>部门选择</span>
          <el-select clearable @clear="clearDepartment" @change="selectDepartment" v-model="department" placeholder="请选择">
            <el-option
              v-for="item in globalSupplierData"
              :key="item.id"
              :label="item.organizationName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>计划状态</span>
          <el-select clearable @clear="clearPlan" @change="selectPlan" v-model="planStatus" placeholder="请选择">
            <el-option
              v-for="item in planList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
    </el-row>
    <el-row style="margin: 15px 0">
        <el-col :span="8">
          <span>采购状态</span>
          <el-select clearable @clear="clearPurchase" @change="selectPurchase" v-model="purchaseStatus" placeholder="请选择">
            <el-option
              v-for="item in purchaseList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>时间选择</span>
          <el-date-picker
            @change="selectTime"
            v-model="chooseTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-col>
    </el-row>
		<el-table :data="tableData">
    <el-table-column prop="title" label="计划名称" width="140">
    </el-table-column>
    <el-table-column prop="applyUsername" label="申请人" width="120"> </el-table-column>
    <el-table-column prop="applyDate" label="申请时间"> </el-table-column>
    <el-table-column prop="orgName" label="提报部门"> </el-table-column>
    <el-table-column prop="applyState" label="计划状态"></el-table-column>
    <el-table-column prop="sendState" label="采购状态">
      <template slot-scope="scope">
        <span>{{scope.row.sendState || '/'}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text"><router-link :to="{path: '/goodsDetailer', query: {id: scope.row.id}}">查看</router-link></el-button>
      </template>
    </el-table-column>
  </el-table>
  	<pagination v-show="totalCreate>0" :total="totalCreate" :page.sync="listQueryCreate.page" :limit.sync="listQueryCreate.limit" @pagination="getListCreate" />
	</div>
  
</template>

<script>
import { getAjax, postAjaxx, postAjaxJson } from '@/utils/ajaxRequest'
import Pagination from '@/components/Pagination'
export default {
  components: {
			Pagination,
		},
  data() {
    return {
      totalCreate: 0,
      listQueryCreate: {
        page: 1,
        limit: 10,
      },
			department: '',
			purchaseStatus: '',
			purchaseList: [
				{
					value:'1',
					label: '已下发'
				},
				{
					value:'0',
					label: '未下发'
				},
			],
			planList: [
				{
					value: '1',
					label: '草稿'
				},
				{
					value: '2',
					label: '审核中'
				},
				{
					value: '3',
					label: '已完成'
				},
			],
			planStatus: '',
      chooseTime: "",
      search: "",
			tableData: [],
      globalSupplierData: [],
      planClass: '',
      formId: '',
    };
	},
	created() {
    this.planClass = this.$route.query.planClass || '年度预算计划'
    this.formId = this.$route.query.id
    if(this.formId === undefined) {
      this.formId = ''
    }
		// 获取部门数据
    getAjax("/api/planmanagementService/PlanProjectSelect/findOrganizationList").then(res => {
      console.log(res);
			this.globalSupplierData = res.data;
			console.log(this.globalSupplierData)
      // this.popgysmc = true;
    });
    // 获取表格数据
    this.getListCreate()
    
	},
	methods: {
    clearPurchase() {
      this.getListCreate()
    },
    clearPlan() {
      this.getListCreate()
    },
    clearDepartment() {
      this.getListCreate()
    },
    getListCreate() {
      // 获取表格数据
      getAjax(`/api/planmanagementService/PlanProjectSelect/findPlanPageProjectList?applyState=${this.planStatus}&beginTime=${this.chooseTime}&endTime=${this.chooseTime}&formId=${this.formId}&orgId=${this.department}&pageNumber=${this.listQueryCreate.page - 1}&pageSize=${this.listQueryCreate.limit}&planClass=${this.planClass}&planType=&sendStatus=${this.purchaseStatus}&title=${this.search}`).then(res => {
        console.log(res);
        console.log('表格数据');
        this.tableData = res.data.content;
        this.tableData.forEach(item => {
          if(item.applyState === '1') {
            item.applyState = '草稿'
          }else if(item.applyState === '2') {
            item.applyState = '审核中'
          }else {
            item.applyState = '已完成'
          }
        })
        console.log(this.globalSupplierData)
      });
    },
    searchKeyWords(e) {
      console.log(e)
      this.getListCreate()
    },
    selectDepartment(e) {
      this.getListCreate()
    },
    selectPlan() {
      this.getListCreate()
    },
    selectPurchase() {
      this.getListCreate()
    },
    selectTime(e) {
      if(e === null) {
        this.chooseTime = ''
      }
      this.getListCreate()
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.header_T {
	display: flex;
	margin-top: 15px;
	div {
		font-size: 14px;
		flex: 1
	}
}
</style>
