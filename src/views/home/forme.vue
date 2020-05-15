<template>
	<div style="padding:20px;">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>选择计划</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="formexz" style="width:100%">
			<p style="border-left: 10px solid rgb(255, 182, 16);">年度预算计划</p>
			<el-row>
				<el-col :span="6" v-for="(item, index) in yearBugdet" :key="index">
					<div @click="fun(item.formName,item.id)">
						<img src="https://axure-file.lanhuhu.com/21a8b113-c334-4252-80ac-7514e60de361__02d60e17c0fa5e4757bcd47eb05cc32c.svg">
						<router-link to=''><span>{{item.formName}}</span></router-link>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="formexz" style="width:100%">
			<p style="border-left: 10px solid #f3e757;">年度计划汇总</p>
			<el-row>
				<el-col :span="6" v-for="(item, index) in yearBugdetCollect" :key='index'>
					<div @click="fun1(item.formName,item.id)">
						<img src="https://axure-file.lanhuhu.com/21a8b113-c334-4252-80ac-7514e60de361__02d60e17c0fa5e4757bcd47eb05cc32c.svg">
						<router-link to=''>{{item.formName}}</router-link>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="formexz" style="width:100%">
			<p style="border-left: 10px solid rgb(79, 241, 99);">月度实施计划提报</p>
			<el-row>
				<el-col :span="6" v-for="(item, index) in monthBugdet" :key="index.id">
					<div @click="fun2(item.formName,item.id)">
						<img src="https://axure-file.lanhuhu.com/21a8b113-c334-4252-80ac-7514e60de361__02d60e17c0fa5e4757bcd47eb05cc32c.svg">
						<router-link to=''>{{item.formName}}</router-link>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="formexz" style="width:100%">
			<p style="border-left: 10px solid rgb(35, 169, 199);">月度实施计划汇总</p>
			<el-row>
				<el-col :span="6" v-for="(item, index) in monthBugdetCollect" :key="index.id">
					<div @click="fun3(item.formName,item.id)">
						<img src="https://axure-file.lanhuhu.com/21a8b113-c334-4252-80ac-7514e60de361__02d60e17c0fa5e4757bcd47eb05cc32c.svg">
						<router-link to=''>{{item.formName}}</router-link>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import Navbar from '@/views/layout/components/Navbar'
	import Pagination from '@/components/Pagination'
	import { getAjax } from "@/utils/ajaxRequest"
	export default {
		components: {
			Navbar,
			Pagination,
		},
		data() {
			return {
				//年度预算计划
				yearBugdet: [],
				// 年度计划汇总
				yearBugdetCollect: [],
				//月度实施计划提报
				monthBugdet: [],
				// 月度实施计划汇总
				monthBugdetCollect: []
			}
		},
		methods: {
			fun(formName, id) {
				if(formName === '年度专项安全资金计划' || formName === '年度专项折旧生产设备/工程资金计划' || formName === '年度专项折旧非生产设备资金计划' || formName === '年度大修资金计划') {
					
					this.$router.push({
						path: '/establish',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科技资金补报') {
					this.$router.push({
						path: '/supplementO',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度专项资金变更') {
					this.$router.push({
						path: '/MoneyChang',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科研项目计划') {
					this.$router.push({
						path: '/YearSientific',
						query: {
							id: id,
							formName: formName
						}
					})
				}else if(formName === '年度科技资金计划'){
					this.$router.push({
						path: '/yearMoneyPlan',
						query: {
							id: id,
							formName: formName
						}
					})
				}
			},
			fun1(formName, id) {
				if(formName === '年度专项安全资金汇总计划' || formName === '年度专项折旧生产设备/工程资金汇总划' || formName === '年度专项折旧非生产设备资金汇总计划') {
					this.$router.push({
						path: '/summary',
						query: {
							id: id,
							 formName: formName
						}
					})
				} else if(formName === '年度大修资金汇总计划') {
					this.$router.push({
						path: '/dxcollect',
						query: {
							id: id,
							 formName: formName
						}
					})
				} else if(formName === '年度科研项目汇总计划') {
					this.$router.push({
						path: '/YearSientificollect',
						query: {
							id: id,
							 formName: formName
						}
					})
				} else if(formName === '年度专项资金汇总计划') {
					this.$router.push({
						path: '/special',
						query: {
							id: id,
							 formName: formName
						}
					})
				}else if(formName === '年度科技资金汇总计划'){
					this.$router.push({
						path: '/yearTotalPlan',
						query: {
							id: id,
							formName: formName
						}
					})
				}
			},
			fun2(formName, id) {
				if(formName === '月度科研项目实施计划') {
					this.$router.push({
						path: '/scientificO',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '低值易耗月度采购计划' || formName === '低值易耗零星采购计划') {
					this.$router.push({
						path: '/priced',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度生产物资计划') {
					this.$router.push({
						path: '/monthlyjh',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度科研项目计划') {
					this.$router.push({
						path: '/YearSientific',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '咨询及其他服务计划') {
					this.$router.push({
						path: '/consult',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度专项资金计划') {
					this.$router.push({
						path: '/moneySpecial',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '分包项目计划') {
					this.$router.push({
						path: '/subpackage',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '外委计划') {
					this.$router.push({
						path: '/perpheral',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '供应商推荐') {
					this.$router.push({
						path: '/supplier',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '年度大修月度实施计划') {
					this.$router.push({
						path: '/YearRepair',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '框架协议计划') {
					this.$router.push({
						path: '/framejh',
						query: {
							id: id,
							formName: formName
						}
					})
				}
			},
			fun3(formName, id) {
				if(formName === '低值易耗月度采购汇总计划' || formName === '低值易耗零星采购汇总计划') {
					this.$router.push({
						path: '/collect',
						query: {
							id: id,
							formName: formName
						}
					})
				} else if(formName === '月度生产物资汇总计划') {
					this.$router.push({
						path: '/state',
						query: {
							id: id,
							formName: formName
						}
					})
				}
			},
		},
		created() {
			getAjax("/api/planmanagementService/planFrom/list").then(res => {
				this.yearBugdet = res.data.yearBugdet;
				this.yearBugdetCollect=res.data.yearBugdetCollect;
				this.monthBugdet=res.data.monthBugdet;
				this.monthBugdetCollect=res.data.monthBugdetCollect;
			});
		},
	}
</script>
<style lang="scss" scoped>
	.el-col>div>img {
		width: 40px;
		height: 35px;
		vertical-align: middle;
	}
	
	.el-col>a {
		display: inline-block;
		height: 100%;
	}
	
	.el-col {
		text-align: left;
		// padding-left: 30px;
	}
	
	.formexz {
		margin: 20px 0;
	}
	
	.formexz>p {
		height: 42px;
		line-height: 42px;
		margin: 30px 0px;
		padding: 0 14px;
		font-size: 22px;
	}
	
	.el-row {
		text-align: center;
		line-height: 70px;
	}
</style>