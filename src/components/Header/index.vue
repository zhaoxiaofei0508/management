<template>
	<div>
		<el-menu class="el-menu-demo" mode="horizontal" background-color="#000000" text-color="#fff">
			<el-menu-item style="font-size:24px;">计划系统</el-menu-item>

			<el-menu-item v-if="userName!='undefined'" style="float:right;" @click="logout">
				退出
			</el-menu-item>
			<el-menu-item v-if="userName!='undefined'" style="float:right;">
				{{userName}}
			</el-menu-item>
			<el-menu-item v-if="userName=='undefined'" style="float:right;" @click="logout">
				请登录
			</el-menu-item>

			<el-menu-item @click="enterManage" style="float:right;">
				管理台
			</el-menu-item>
		</el-menu>
		<div class="app_main">
			<transition name="fade-transform" mode="out-in">
				<keep-alive :include="cachedViews">
					<router-view :key="key" />
				</keep-alive>
			</transition>
		</div>
	</div>
</template>

<script>
  import { getUserMenu } from '@/utils/ajaxRequest'
	export default {
		name: 'personHeader',
		data() {
			return {
				userName: ""
			}
		},
		computed: {
			cachedViews() {
				return this.$store.state.tagsView.cachedViews
			},
			key() {
				return this.$route.fullPath
			}
		},
		created() {

      getUserMenu("http://61.134.63.231:9090/organizationService/role/findByUserInfoAndService").then(res => {
        if(res.code == 0) {
          this.userName = res.data.userMap.userName;
          console.log(res.data.userMap.organizationName=="搬家中心");
           var orgName=res.data.userMap.organizationName;
           var orgNameArr=["掘进中⼼","搬家中⼼","机电设备维修中⼼","机电设备管理中⼼","培训中⼼","救护中⼼","质监中⼼"];
          sessionStorage.orgType=res.data.userMap.organizationName=="搬家中心"?"中心":"部门";
        
          sessionStorage.userName =this.userName ;
          sessionStorage.orgName=res.data.userMap.organizationName;
         
        }else{
          this.userName="undefined";
        }
      });
		},
		methods: {
			enterManage() {
				this.$router.push({
					path: "/plan/planSearch"
				});
			},
			logout() {
				
				this.$store.dispatch('LogOut').then(() => {
						delete sessionStorage.orgType;
					delete sessionStorage.orgName;
					delete sessionStorage.userName;
					delete sessionStorage.companyId;
					delete sessionStorage.userId;
					delete sessionStorage.orgId;
					
					location.reload() // In order to re-instantiate the vue-router object to avoid bugs
				})
			}
		}
	}
</script>

<style>
	.app_main {
		overflow: hidden;
	}
</style>
