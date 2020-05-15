<template>
	<div>
		<el-card class="box-card" shadow="never" style="margin-top:20px;">
			<div slot="header" class="clearfix">
				<div style="font-size:18px;line-height:40px;">年度专项安全/折旧生产设备、工程/折旧非生产设备汇总计划</div>
				<div style="color:#999;">
					<span>{{formObj.orgname}}</span>
					<span>{{formObj.createuser}}</span>
					<span>{{formObj.createdate}}</span>
				</div>
			</div>
			<div class="text item">
				<el-tabs v-model="activeName">
					<el-tab-pane label="计划单" name="first">
						<div style="width:100%;text-align: center;line-height:40px;font-size:16px;">2020年年度各中心安全专项/折旧生产设备计划</div>
						<el-tabs v-model="activeName1">
							<el-tab-pane v-for="(item, index) in editableTabs" :key="item.orgName" :label="item.orgName" :name="item.orgName">
								<el-table :data="item.planBudgetProjectList" :span-method="arraySpanMethod" ref="tableDatas" tooltip-effect="dark" border stripe style="width: 100%">
									<el-table-column prop="projectType" label="项目类别" width="100" />
									<el-table-column prop="projectName" label="项目名称" width="100" />
									<el-table-column prop="projectMoney" label="项目预估金额" />
									<el-table-column prop="startDate" label="开始时间" />
									<el-table-column prop="endDate" label="结束时间" />
									<el-table-column prop="chargePerson" label="负责人" />
									<el-table-column prop="projectDesc" label="项目简介" />
									<el-table-column prop="filePath" label="附件" />
									<el-table-column label="操作">
										<template slot-scope="scope">
											<el-button type="text" size="small" @click="viewGoods(scope.row)">查看物资</el-button>
										</template>
									</el-table-column>
								</el-table>
								<p style="margin-top: 12px">计划总金额:<span>{{planMoney}}</span></p>
							</el-tab-pane>
							<!-- 计划预览查看商品弹框 -->
							<el-dialog title="查看物资" :visible.sync="goodsVisible" width="95%">
								<el-table :data="goodsData" tooltip-effect="dark" border stripe>
									<el-table-column label="分类" width="80" prop="goodsClass" align="center" />
									<el-table-column label="编码" align="center" prop="goodsCode" width="80" />
									<el-table-column label="商品/服务名称" width="120" prop="goodsName" class="zxfsh" />
									<el-table-column label="规则型号/描述" width="120" prop="goodsModel" />
									<el-table-column label="单位" width="60" prop="goodsunit" />
									<el-table-column label="数量" width="60" prop="goodsNumber" />
									<el-table-column label="预估单价" prop="goodsPrice" />
									<el-table-column label="预估总价" prop="goodsTotal" />
									<el-table-column label="类型" width="100" prop="goodsType" />
									<el-table-column label="计划实施时间" width="120" prop="startDate" />
									<el-table-column label="计划交付时间" width="120" prop="endDate" />
									<el-table-column label="主机厂家" prop="factoryName" />
									<el-table-column label="技术要求" prop="technologyDesc" />
									<el-table-column label="备注" prop="remarks" />
								</el-table>
							</el-dialog>
						</el-tabs>
					</el-tab-pane>
					<el-tab-pane label="审核历史" name="second">
						<timeline-item :processInstanceId="processInstanceId"></timeline-item>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-card>
	</div>
</template>

<script>
	import TimelineItem from "@/components/TimelineItem"
	import { getAjax, postAjax, postAjaxJson } from '@/utils/ajaxRequest'
	export default {
		props:{
			planCollectId:"",
			processInstanceId:"",
		},
		components: {
			TimelineItem
		},
		data() {
			return {
				activeName: "first",
				activeName1:"",
				businessKey: "",
				peopleArr: [],
				editableTabs: [], //动态标签页
				goodsVisible: false,
				goodsData: [],
				planMoney: 0,
				formObj:{},
				spanArr: [],
				formObj:{},
			}
		},
		created() {
//			this.businessKey = this.$route.query.businessKey;
			getAjax("/api/planmanagementService/annualPlanFlow/planCollectProjectsByPlanCollectId?planCollectId=" + this.planCollectId).then(res => {
				if(res.code == 0) {
					this.editableTabs = res.data.planBudgetProjectLVoList;
					this.formObj=res.data.planCollect;
					this.getSpanArr(this.editableTabs[0].planBudgetProjectList);
					this.activeName1 = this.editableTabs[0].orgName;
					this.planMoney = 0;
					_.forEach(this.editableTabs[0].planBudgetProjectList, val => {
						this.planMoney += Number(val.projectMoney);
					});
				}
			});
		},
		methods: {
			getSpanArr(data) {
				this.spanArr = [];　
				for(var i = 0; i < data.length; i++) {    
					if(i === 0) {        
						this.spanArr.push(1);        
						this.pos = 0    
					} else {     // 判断当前元素与上一个元素是否相同
						if(data[i].projectType === data[i - 1].projectType) {        
							this.spanArr[this.pos] += 1;        
							this.spanArr.push(0);        
						} else {        
							this.spanArr.push(1);        
							this.pos = i;        
						}    
					} 
				}
			},
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {    
				if(columnIndex == 1) {       
					const _row = this.spanArr[rowIndex];        
					const _col = _row > 0 ? 1 : 0;      
					return {            
						rowspan: _row,
						 colspan: _col        
					}    
				}
			},
			viewGoods(row){
				this.goodsVisible=true;
				var param = {
					projectId: row.id
				}
				getAjax("/api/planmanagementService/annualSpecialFundPlan/findProjectGoodsByProjectId", param).then(data => {
					if(data.code == 0) {
						this.goodsData=data.data;
                       
					}
				});
			}
		}
	}
</script>

<style>

</style>