<template>
	<div class="app-container">
		<el-table v-loading="listLoading" :data="list" fit highlight-current-row class="tableWidth">
			<el-table-column label="人员姓名" prop="name" align="left">
			</el-table-column>
			<el-table-column label="证件号码" prop="number" align="left" width="170">
			</el-table-column>
			<el-table-column label="联系电话" prop="phone" align="left">
			</el-table-column>
			<el-table-column label="所在单位/部门" prop="depart" align="left" width="160">
			</el-table-column>
			<el-table-column label="卡片类型" prop="type" align="left">
			</el-table-column>
			<el-table-column label="持卡状态" prop="status" align="left" width='150'>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					name: "",
				},
				listLoading:false,
				list:[],
				
			}
		},
		created() {
			
			this.list=[{
						key:1,
						name: '王华',
						number:'610123123412341234',
						phone:'19999999999',
						depart:'神南产业神煤科技',
						type:'内部',
						status:'已挂失'
					},{
						key:2,
						name: '李丽',
						number:'610123123412341234',
						phone:'19999999999',
						depart:'神南产业神煤科技',
						type:'内部',
						status:'使用中'
					},{
						key:3,
						name: '王志',
						number:'610123123412341234',
						phone:'19999999999',
						depart:'神南产业神煤科技',
						type:'内部',
						status:'已注销'
					}];
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.info-container{
		font-size:18px;
		color:#222;
		font-weight: 500;
		line-height:25px;
	}
.el-form-item{
	margin-bottom: 0;
}
.cursor{
	cursor: pointer;
}
.cursor:hover{
	color:#3399FF;
}
</style>