<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>部门台账</el-breadcrumb-item>
		</el-breadcrumb>
		<el-container style="margin-top:20px;">
			<el-tree width="50%" :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
			</el-tree>
			<el-main>
				<div style="display: flex;">
					<el-input @input="searchKeywords" style="width: 250px" v-model="searcAm" placeholder="请输入内容"></el-input>
					<div style="margin: 0 30px">
						<span>计划状态</span>
						<el-select clearable @clear="clearPlanEvent" @change="selectplanEvent" v-model="selectPlan" placeholder="请选择">
							<el-option v-for="item in planDataList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<div>
						<span>时间选择</span>
						<el-date-picker @change="chooseEvent" v-model="chooseTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
				</div>
				<el-table :data="planTableData" style="width: 100%; margin-top: 20px;">
					<el-table-column prop="title" label="计划名称">
					</el-table-column>
					<el-table-column prop="updateUser" label="申请人">
					</el-table-column>
					<el-table-column prop="applyDate" label="申请时间">
					</el-table-column>
					<el-table-column prop="applyState" label="计划状态">
					</el-table-column>
					<el-table-column prop="applyDate" label="审核时间">
					</el-table-column>
					<el-table-column prop="applyresult" label="审核结果">
					</el-table-column>
					<el-table-column prop="address" label="操作">
						<template slot-scope="scope">
							<el-button type="text">
								<router-link :to="{path: 'contractChangeLc', query: {id: scope.row.id}}">查看</router-link>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPlanList" />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Navbar from '@/views/layout/components/Navbar'
	import { getAjax } from '@/utils/ajaxRequest'
	import Pagination from '@/components/Pagination'
	export default {
		components: {
			Navbar,
			Pagination
		},
		data() {
			return {
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'formName'
				},
				total: 0,
				listQuery: {
					page: 1,
					limit: 10,
				},
				// 搜索关键字
				searcAm: '',
				planTableData: [],
				// 计划状态
				planDataList: [{
						label: '草稿',
						value: '1'
					},
					{
						label: '审核中',
						value: '2'
					},
					{
						label: '已完成',
						value: '3'
					}
				],
				// 计划分类
				planClass: '年度计划',
				// 计划具体类别
				planDetailClass: '',
				// 选中的计划状态
				selectPlan: '',
				// 选择的时间
				chooseTime: '',

			}
		},
		created() {
			this.getPlanList()
			this.getMenuList()
		},
		methods: {
			chooseEvent(e) {
				console.log(e)
				if(e === null) {
					this.chooseTime = ''
				}
 				this.getPlanList()
			},
			selectplanEvent() {
				this.getPlanList()
			},
			clearPlanEvent() {
				this.getPlanList()
			},
			searchKeywords() {
				this.getPlanList()
			},
			// 获取左侧侧边栏数据
			getMenuList() {
				getAjax("/api/planmanagementService/PlanProjectSelect/findPlanTypeList").then(res => {
					var arr = []
					arr.push({
						formName: '年度计划',
						id: '1',
						children: []
					}, {
						formName: '实施计划',
						id: '2',
						children: []
					}, )
					arr[0].children = res.data.yearplan
					arr[1].children = res.data.implementplan
					this.treeData = arr
				});
			},
			// 表格数据
			getPlanList() {
				getAjax(`/api/planmanagementService/PlanProjectSelect/findPlanProjectList?applyState=${this.selectPlan}&beginTime=${this.chooseTime}&endTime=${this.chooseTime}&orgId=&pageNumber=${this.listQuery.page}&pageSize=${this.listQuery.limit}&planClass=${this.planClass}&planType=&title=${this.searcAm}&formId=${this.planDetailClass}`).then(res => {
					// this.biaodanArray = res.data;
					console.log(res)
					this.planTableData = res.data.content
					this.planTableData.forEach(item => {
						item.applyDate = item.applyDate.split('T')[0]
						if(item.applyState === '1') {
							item.applyState = '草稿'
						} else if(item.applyState === '2') {
							item.applyState = '审核中'
						} else {
							item.applyState = '已完成'
						}
					})
					this.total = res.data.totalElements
				});
			},
			handleOpen() {

			},
			handleClose() {

			},
			handleNodeClick(e) {
				if(e.formType === undefined) {
					return
				}
				this.planClass = e.formType
				this.planDetailClass = e.id
				this.getPlanList()
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
		.el-main {
			padding: 0;
		}
	}
	
	.el-tree {
		width: 20%;
	}
	
	.is-focusable {
		margin: 20px 20px !important;
	}
</style>