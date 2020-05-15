<template>
	<div>
		<div class="ztable">
			<el-table :data="tableDatas" ref="table" tooltip-effect="dark" border stripe @selection-change='selectRow'>
				<el-table-column prop="goodsClass" label="分类" width="50">
				</el-table-column>
				<el-table-column label="编码" width="50" prop="goodsCode">
				</el-table-column>
				<el-table-column prop="goodsName" label="商品/服务名称" width="120">
				</el-table-column>
				<el-table-column prop="goodsModel" label="规则型号/描述" width="120">
				</el-table-column>
				<el-table-column prop="goodsunit" label="单位">
				</el-table-column>
				<el-table-column prop="goodsNumber" label="数量">
				</el-table-column>
				<el-table-column prop="goodsPrice" label="预估单价">
				</el-table-column>
				<el-table-column prop="goodsTotal" label="预估总价">
				</el-table-column>
				<el-table-column prop="goodsType" label="类型">
				</el-table-column>
				<el-table-column prop="startDate" label="计划实施时间" width="120">
				</el-table-column>
				<el-table-column prop="endDate" label="计划交付时间" width="120">
				</el-table-column>
				<el-table-column prop="factoryName" label="主机厂家">
				</el-table-column>
				<el-table-column prop="technologyDesc" label="技术要求">
				</el-table-column>
				<el-table-column prop="remarks" label="备注">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["tableDatas"],
		data() {
			return {}
		},
		methods: {
			selectRow() {}
		}
	}
</script>
<style scoped>
	.ztable {
		background-color: #fff;
		/* position: fixed; */
		/* top: 100px; */
		/* left: 4%; */
		/* width: 92%; */
		z-index: 2
	}
</style>