<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>查看汇总</el-breadcrumb-item>
		</el-breadcrumb>
		<summary-detail :planCollectId="businessKey"  :processInstanceId="processInstanceId"></summary-detail>
	</div>
</template>

<script>
	import SummaryDetail from "./components/SummaryDetail"
	export default {
		components: {
			SummaryDetail
		},
		data() {
			return {
				businessKey:"",
				processInstanceId:"",
			}
		},
		created() {
			this.businessKey = this.$route.query.businessKey;
			this.processInstanceId = this.$route.query.processInstanceId;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>