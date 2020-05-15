<template>
	<div>
		<div class="supplierTitle">
			<div class="review_title">基本信息</div>
			<div style="clear:both;"></div>
			<div class="review_content">
				<el-form ref="form" :model="sizeForm" label-width="140px" size="mini">
					<el-col :span="6">
						<el-form-item label="企业名称：">
							{{globalData.cnname}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="企业性质：">
							{{globalData.memberkind}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所属行业：">
							{{globalData.busbigtype}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="统一社会代码：">
							{{globalData.orgcode}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="注册资本：">
							{{globalData.regmoney}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="法定代表人姓名：">
							{{globalData.legalperson}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="法定代表人身份证：">
							{{globalData.legalpersoncode}}
						</el-form-item>
					</el-col>

					<el-col :span="6">
						<el-form-item label="联系人：">
							{{globalData.linkman}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="联系电话：">
							{{globalData.phone}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="企业所在地：">
							{{globalData.province}}-{{globalData.city}}-{{globalData.region}}
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="详细地址：">
							{{globalData.regaddress}}
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="营业执照：">
							<a style="color:#39f;cursor:pointer;" :href="sizeForm.orgfile" :download="sizeForm.orgfile" target="_blank">
								{{sizeForm.orgfile}}
							</a>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="法人身份证附件：">
							<a style="color:#39f;cursor:pointer;" :href="sizeForm.legalpersonfile" :download="sizeForm.legalpersonfile" target="_blank">
								{{sizeForm.legalpersonfile}}
							</a>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="主营业务：">
							{{globalData.bussmalltype}}
						</el-form-item>
					</el-col>

				</el-form>
			</div>
			<div style="clear:both;"></div>
			<div class="review_title">资质信息</div>
			<div style="clear:both;"></div>
			<div class="review_content">
				<el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
					<el-form-item label="资质类型：">
						<el-table :data="MemberCompQuals" border style="width: 100%;margin-top:20px;">
							<el-table-column prop="compqual.name" label="资质类型">
							</el-table-column>
							<el-table-column prop="validatedate" label="资质有效期">
							</el-table-column>
							<el-table-column label="资质">
								<template slot-scope="scope">
									<a style="color:#409eff;cursor: pointer;" class="look" target="_blank" :href="scope.row.file">查看</a>
								</template>
							</el-table-column>
						</el-table>
					</el-form-item>

				</el-form>
			</div>
			<div style="clear:both;"></div>
			<div class="review_title">供货类别</div>
			<div style="clear:both;"></div>
			<div class="review_content">
				<el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
					<el-form-item label="供应商类型：">
						{{memberTypesMap[sizeForm.membertype]}}
					</el-form-item>
					<div class="super-list" style="padding-left: 0">
						<!--<div class="list-bg" v-for="(item,index) in suppliercategories" :key="item.id">{{(index+1)+item.category.name}}</div>-->
						<el-alert style="margin-bottom:10px;" :closable="false" v-for="(item,index) in suppliercategories" :key="item.id" :title="item.title" type="info">
						</el-alert>
					</div>
				</el-form>
			</div>
			</el-form>
		</div>
		<div style="clear:both;"></div>
		<div class="review_title">账户信息</div>
		<div style="clear:both;"></div>
		<div class="review_content">
			<el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
				<el-form-item label="基本账户：">
					<el-table :data="baseAccounts" border style="width: 100%;margin-top:20px;">
						<el-table-column prop="bankname" label="开户行名称"></el-table-column>
						<el-table-column prop="openbankaccountno" label="开户行账号"></el-table-column>

						<el-table-column prop="bankaccountno" label="银行账号"></el-table-column>

						<el-table-column label="支持承兑">
							<template slot-scope="scope">{{boolMap[scope.row.isexchange]}}</template>
						</el-table-column>

						<el-table-column label="是否默认">
							<template slot-scope="scope">{{boolMap[scope.row.isdefault]}}</template>
						</el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item label="一般账户：">
					<el-table :data="normalAccounts" border style="width: 100%;margin-top:20px;">
						<el-table-column prop="bankname" label="开户行名称"></el-table-column>
						<el-table-column prop="openbankaccountno" label="开户行账号"></el-table-column>

						<el-table-column prop="bankaccountno" label="银行账号"></el-table-column>

						<el-table-column label="支持承兑">
							<template slot-scope="scope">{{boolMap[scope.row.isexchange]}}</template>
						</el-table-column>

						<el-table-column label="是否默认">
							<template slot-scope="scope">{{boolMap[scope.row.isdefault]}}</template>
						</el-table-column>
					</el-table>
				</el-form-item>

			</el-form>
		</div>
		<div style="clear:both;"></div>
		<div class="review_title">邮箱信息</div>
		<div style="clear:both;"></div>
		<el-table :data="memberemailinfos" border style="width: 100%;margin-top:20px;">
			<el-table-column prop="emailno" label="邮箱账号"></el-table-column>
			<el-table-column prop="emaillinkman" label="邮箱联系人"></el-table-column>
			<el-table-column prop="bankaccountno" label="联系电话"></el-table-column>
		</el-table>
	</div>
	</div>
</template>

<script>
	import { getAjax } from '@/utils/ajaxRequest'
	export default {
		props: ['supplierId'],
		data() {
			return {
				sizeForm: {},
				tableData: [],
				//资质信息
				MemberCompQuals: [],
				//供货类别
				memberTypesMap: {
					0: "代理商",
					1: "经销商",
					2: "生产商",
					3: "修理商"
				},
				suppliercategories: [],
				//基本账户
				baseAccounts: [],
				normalAccounts: [],
				boolMap: {
					0: "否",
					1: "是"
				},
				//邮箱信息
				memberemailinfos: [],
				globalData: {}
			}
		},
		created() {
			console.log(this.supplierId)
			// this.getDetail();
			getAjax(`/api/SupplierRecommendation/SupplierSelectedList?supplierIds=${this.supplierId}`).then(res => {
				this.globalData = res.data.data
				console.log(res)
				console.log(this.globalData)
      })
		},
		methods: {
			getDetail() {
				var param = {
					id: this.supplierId
				}
				getAjax("/api/enterprisemanagerService/supplier/getOne", param).then(res => {
					if(res.code == 0) {
						this.sizeForm = res.data;
					}
				});
				//资质信息
				getAjax("/api/enterprisemanagerService/membercompqual/list", param).then(res => {
					if(res.code == "0") {
						this.MemberCompQuals = res.data;
					}
				});
				//供货类别
				getAjax("/api/enterprisemanagerService/suppliercategory/list", {
					search_eq_supplierid: this.supplierId
				}).then(res => {
					if(res.code == "0") {
						_.forEach(res.data,(val,key)=>{
							val.title=key+1+"."+val.category.name;
						});
						this.suppliercategories = res.data;
					}
				});
				//基本账户
				getAjax("/api/enterprisemanagerService/memberbaseaccount/list", {
					search_eq_supplierid: this.supplierId
				}).then(res => {
					if(res.code == "0") {
						res.data.forEach(item => {
							if(item.bankaccounttype == 1) {
								this.baseAccounts.push(item);
							} else {
								this.normalAccounts.push(item);
							}
						});
					}
				});
				//邮箱信息
				getAjax("/api/enterprisemanagerService/memberemailinfo/list", {
					search_eq_supplierid: this.supplierId
				}).then(res => {
					if(res.code == "0") {
						this.memberemailinfos = res.data;
					}
				});
			},
		}
	}
</script>

<style scoped>
	.review_title {
		line-height: 40px;
		width: 100%;
		height: 40px;
		background: #efefef;
		text-indent: 30px;
	}
</style>