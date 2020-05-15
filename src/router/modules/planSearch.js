import Layout from '@/views/layout/Layout'
import $ from 'jquery'

const planSearchRouter = {
  path: '/plan',
  component: Layout,
  redirect: '/plan/planSearch',
  name:'/plan',
  meta:{
    title:'计划查询',
    icon:'documentation'
  },
  alwaysShow:true,
  children: [
    {
      path: '/plan/planSearch',
      name:'planSearch',
      component: () => import('@/views/plan/planSearch'),
      meta: { title: '年度预算查询', noCache: true}
    },
    {
      path: '/plan/planSend',
      name:'planSend',
      component: () => import('@/views/plan/planSend'),
      meta: { title: '年度预算查询', noCache: true}
		},
  ]
}

	$.ajax({
	type: 'GET',
	url: "http://61.134.63.231:9090/planmanagementService/PlanProjectSelect/findPlanPageTypeList",
	success: function(data) {
		if (data.code == 0) {
			var Budgetcollectplan=[];
			var Implementcollectplan=[];
			var implementplan=[];
			var yearplan=[];
			_.forEach(data.data.Budgetcollectplan,(val,key)=>{
				Budgetcollectplan.push({
					path: '/plan/planSearch?id=' + val.id+"&planClass="+val.planClass,
					component: () => import('@/views/plan/planSearch'),
					id:val.id,
					name:'/plan/planSearch/' + val.id,
					meta:{
						title: val.formName,
						noCache: true
					}
				});
			});
			_.forEach(data.data.Implementcollectplan,(val,key)=>{
				Implementcollectplan.push({
					path: '/plan/planSearch?id=' + val.id+"&planClass="+val.planClass,
					component: () => import('@/views/plan/planSearch'),
					id:val.id,
					name:'/plan/planSearch/' + val.id,
					meta:{
						title: val.formName,
						noCache: true
					}
				});
			});
			_.forEach(data.data.implementplan,(val,key)=>{
				implementplan.push({
					path: '/plan/planSearch?id=' + val.id+"&planClass="+val.planClass,
					component: () => import('@/views/plan/planSearch'),
					id:val.id,
					name:'/plan/planSearch/' + val.id,
					meta:{
						title: val.formName,
						noCache: true
					}
				});
			});
			_.forEach(data.data.yearplan,(val,key)=>{
				yearplan.push({
					path: '/plan/planSearch?id=' + val.id+"&planClass="+val.planClass,
					component: () => import('@/views/plan/planSearch'),
					id:val.id,
					name:'/plan/planSearch/' + val.id,
					meta:{
						title: val.formName,
						noCache: true
					}
				});
			});
			var arr=[];
			arr=[
			    {
			    	   path: '/yearplan',
			    	   component: () => import('@/views/plan/planSearch'),
			    	   name:"yearplan",
			    	   meta:{
						title: "年度预算计划",
						noCache: true
					},
					children:yearplan
			    },
			    {
			    	   path: '/Budgetcollectplan',
			    	   component: () => import('@/views/plan/planSearch'),
			    	   name:"Budgetcollectplan",
			    	   meta:{
						title: "年度计划汇总",
						noCache: true
					},
					children:Budgetcollectplan
			    },
			     {
			    	   path: '/implementplan',
			    	   component: () => import('@/views/plan/planSearch'),
			    	   name:"implementplan",
			    	   meta:{
						title: "月度实施计划提报",
						noCache: true
					},
					children:implementplan
			    },
			    {
			    	   path: '/Implementcollectplan',
			    	   component: () => import('@/views/plan/planSearch'),
			    	   name:"Implementcollectplan",
			    	   meta:{
						title: "月度实施计划汇总",
						noCache: true
					},
					children:Implementcollectplan
			    },
			];
			planSearchRouter.children=arr;
//			_.forEach(data.data, (val, key) => {
//				var arr = [];
//				_.forEach(val.children, v => {
//					arr[0]={
//						path: '/videoManage/' + val.id,
//					component: () => import('@/views/videoManage/index'),
//					id: val.id,
//					name: 'videoManage' + key,
//					meta: {
//						title: val.columnName,
//						noCache: true
//					},
//					};
//					arr.push({
//						path: '/videoManage/' + v.id,
//						component: () => import('@/views/videoManage/index'),
//						childId: v.id,
//						name: 'list' + key,
//						meta: {
//							title: v.columnName,
//							noCache: true
//						},
//					});
//				});
//					videoRouter.children.push({
//					path: '/videoManage/' + val.id,
//					component: () => import('@/views/videoManage/index'),
//					id: val.id,
//					name: 'videoManage' + key,
//					 alwaysShow: arr.length>0,
//					meta: {
//						title: val.columnName,
//						noCache: true
//					},
//					children: arr
//				});
//				
//				
//			});

		}
	},
	error: function(err) {
	}
});

//}

export default planSearchRouter
