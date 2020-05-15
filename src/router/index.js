import Vue from "vue";
import Router from "vue-router";

import Header from "@/components/Header";
import manageRouter from "./modules/manage";
import planSearchRouter from "./modules/planSearch";
import settings from "./modules/settings";
// import contractChangeLc from '@/views/home/contractChangeLc'/* 台账子页面*/
import Establish from '@/views/establish/establish' /* 年度中心申请单 */
import Result from '@/views/result/result' /* 年度中心申请审核 */
import Summary from '@/views/summary/summary' /* 年度汇总计划单 */
import Summarys from '@/views/summary/summarys' /* 年度汇总计划审核 */
import Special from '@/views/special/special' /* 年度资金计划汇总 */
import Specialsh from '@/views/special/specialsh' /* 年度资金计划审核 */
import Plans from '@/views/special/plans' /* 年度资金下发通知 */
import AuditParameter from '@/views/special/AuditParameter' /* 年度专项2类中心审核单(台账链接) */
import Dxverhaul from '@/views/dxverhaul/dxverhaul' /* 年度大修申请*/
import Dxverhauls from '@/views/dxverhaul/dxverhauls' /* 年度大修申请审核单 */
import Dxcollect from '@/views/dxverhaul/dxcollect' /* 年度大修资金汇总计划 */
import Dxcollects from '@/views/dxverhaul/dxcollects' /* 年度大修资金汇总计划审核单 */
import Framejh from '@/views/frame/framejh' /* 框架协议计划 */
import Framejhs from '@/views/frame/framejhs' /* 框架协议计划审核 */
import Priced from '@/views/dzyhpriced/priced' /* 低值易耗计划单 */
import Priceds from '@/views/dzyhpriced/priceds' /* 低值易耗计划审核单 */
import Collect from '@/views/dzyhpriced/collect' /* 低值易耗汇总计划单 */
import Collects from '@/views/dzyhpriced/collects' /* 低值易耗汇总计划单审核 */
import Collectss from '@/views/dzyhpriced/collectss' /* 低值易耗汇总计划单审核BOSS */
import Monthlyjh from '@/views/monthly/monthlyjh' /* 月度生产物资计划 */
import Monthlyjhs from '@/views/monthly/monthlyjhs' /* 月度生产物资计划审核 */
import State from '@/views/monthly/state' /* 月度生产物资立库 */
import MonCollect from '@/views/monthly/monCollect' /* 月度生产物资计划汇总审核单 */
import Subpackage from '@/views/subpackage/subpackage' /* 分包项目流程 */
import Subpackages from '@/views/subpackage/subpackages' /* 分包项目流程审核 */
import Subpackageminutes from '@/views/subpackage/subpackageminutes' /* 分包项目流程审核上传会议纪要 */
import Subpackageminutesyou from '@/views/subpackage/subpackageminutesyou' /* 分包项目流程审核上传会议纪要 */
import Consult from '@/views/consult/consult' /* 咨询及其他服务 */
import Consults from '@/views/consult/consults' /* 咨询及其他服务审核 */
import ConsultsLeaders from '@/views/consult/ConsultsLeaders' /* 咨询及其他服务分管领导审批 */
import ConsultsBusiness from '@/views/consult/ConsultsBusiness' /* 咨询及其他服务业务部门负责人 */
import ConsultsMeeting from '@/views/consult/ConsultsMeeting' /* 咨询及其他服务上传会议纪要 */
import ConsultsMeetingyou from '@/views/consult/ConsultsMeetingyou' /* 咨询及其他服务上传会议纪要有*/
import perpheral from '@/views/perpheral/perpheral' /* 外委计划申请*/
import perpherals from '@/views/perpheral/perpherals' /* 外委计划申请审核*/
import perpheralschyjy from '@/views/perpheral/perpheralschyjy' /* 外委计划上传会议纪要*/
import perpheralyouscwj from '@/views/perpheral/perpheralyouscwj' /* 外委计划上传会议纪要有*/
import YearRepair from '@/views/YearRepair/YearRepair' /* 年度大修月度实施计划*/
import MoneyChang from '@/views/MoneyChang/MoneyChang' /* 年度专项资金变更*/
import MoneySpecial from '@/views/moneySpecial/moneySpecial' /* 月度专项资金计划*/
import YearSientific from '@/views/YearSientific/YearSientific' /* 年度科研项目计划*/
import Supplier from '@/views/supplier/supplier' /* 供应商*/
import ScientificT from '@/views/implementation/scientificT' /* 年度科研项目实施*/
import ScientificO from '@/views/implementation/scientificO' /* 年度科研项目实施添加*/
import ScientificH from '@/views/implementation/scientificH' /* 年度科研项目实施会议*/
import ScientificF from '@/views/implementation/scientificF' /* 年度科研项目实施会议审核*/
import SupplementO from '@/views/supplement/supplementO' /* 年度科技资金补报申请单*/
import CashplanT from '@/views/cashplan/cashplanT'/* 年度科技资金计划审核页面*/
import CashplanH from '@/views/cashplan/cashplanH'/* 年度科技资金计划汇总页面*/
import CashplanF from '@/views/cashplan/cashplanF'/* 年度科技资金计划汇总页面审核*/
import CashplanW from '@/views/cashplan/cashplanW'/* 年度科技资金计划汇总页面下发*/
Vue.use(Router)

/* Layout */
// import Layout from '@/views/layout/Layout'

export const constantRouterMap = [{
		path: '/login',
		component: () =>
			import('@/views/login/index'),
		hidden: true
	},
	manageRouter,
	planSearchRouter,
	settings,
	// 计划系统首页
	{
		path: '/home',
		component: Header,
		redirect: '/home/index',
		hidden: true,
		children: [{
				path: '/home/index',
				component: () =>
					import('@/views/home/index'),
				name: '/home/index',
				meta: {
					title: '计划系统首页',
					noCache: true
				}
			},
			// 框架协议
			{
				path: '/framejh',
				// eslint-disable-next-line no-dupe-keys
				component: () =>
					import('@/views/frame/framejh'),
				meta: {
					title: '框架协议',
					noCache: true
				}
			},
			{
				path: '/framejhView',
				component: () =>
					import('@/views/frame/framejhView'),
				meta: {
					title: '框架协议',
					noCache: true
				}
			},
			// 年度科研项目计划汇总
            {
                path: '/YearSientificollect',
                component: () =>
                    import('@/views/YearSientific/YearSientificollect'),
                    meta: {
                    title: '年度科研项目计划汇总',
                    noCache: true
                }
            },
            {
                path: '/YearSientificollectUpdate',
                component: () =>
                    import('@/views/YearSientific/YearSientificollectUpdate'),
                    meta: {
                    title: '年度科研项目计划汇总',
                    noCache: true
                }
            },
			// 框架协议审核
			{
				path: '/frame/framejhs_acticate',
				component: () =>
					import('@/views/frame/framejhs'),
				meta: {
					title: '框架协议审核',
					noCache: true
				}
			},
			// 年度科研项目计划
			{
				path: '/YearSientific',
				// eslint-disable-next-line no-dupe-keys
				component: () =>
					import('@/views/YearSientific/YearSientific'),
				meta: {
					title: '年度科研项目计划',
					noCache: true
				}
			},
			{
				path: '/YearSientificView',
				component: () =>
					import('@/views/YearSientific/YearSientificView'),
				meta: {
					title: '年度科研项目计划',
					noCache: true
				}
			},
			{
				path: '/YearSientificUpdate',
				component: () =>
					import('@/views/YearSientific/YearSientificUpdate'),
				meta: {
					title: '年度科研项目计划',
					noCache: true
				}
			},

			// 计划系统首页表单页
			{
				path: '/forme',
				component: () =>
					import('@/views/home/forme'),
				meta: {
					title: '计划系统首页表单页',
					noCache: true
				}
			},
			{
				path: '/yearTotalPlan',
				component: () =>
					import('@/views/yearTotalPlan/index'),
				meta: {
					title: '年度科技资金汇总计划',
					noCache: true
				}
			},
			{
				path: '/yearTotalPlanview',
				component: () =>
					import('@/views/yearTotalPlan/yearTotalPlanview'),
				meta: {
					title: '年度科技资金汇总计划',
					noCache: true
				}
			},
			{
				path: '/yearTotalPlanUpdate',
				component: () =>
					import('@/views/yearTotalPlan/update'),
				meta: {
					title: '年度科技资金汇总计划',
					noCache: true
				}
			},
			// 计划系统首页任务列表
			{
				path: '/mission',
				component: () =>
					import('@/views/home/mission'),
				meta: {
					title: '计划系统首页任务列表',
					noCache: true
				}
			},
			// 计划系统首页中心部门台账
			{
				path: '/parameter',
				component: () =>
					import('@/views/home/parameter'),
				meta: {
					title: '计划系统首页中心部门台账',
					noCache: true
				}
			},
			{
				path: '/contractChangeLc',
				component: () =>
					import('@/views/home/contractChangeLc'),
				meta: {
					title: '计划系统首页中心部门台账',
					noCache: true
				}
			},
			{
				path: '/goodsDetailer',
				component: () =>
					import('@/views/home/goodsDetailer'),
				meta: {
					title: '计划系统首页中心部门台账',
					noCache: true
				}
			},
			// 计划系统首页计划部台账
			{
				path: '/Planningjhb',
				component: () =>
					import('@/views/home/Planningjhb'),
				meta: {
					title: '计划系统首页计划部台账',
					noCache: true
				}
			},
			{
				path: '/summardxzj',
				component: () =>
					import('@/views/home/componentsjhbtz/summardxzj'),
				meta: {
					title: '计划系统首页计划部台账',
					noCache: true
				}
			},
			//
			{
				path: '/summary',
				component: () =>
					import('@/views/summary/summary'),
				meta: {
					title: '年度专项资金汇总',
					noCache: true
				}
			},
			{
				path: '/summaryView',
				component: () =>
					import('@/views/summary/summaryView'),
				meta: {
					title: '年度专项资金汇总',
					noCache: true
				}
			},
			{
				path: '/summaryUpdate',
				component: () =>
					import('@/views/summary/updateSummary'),
				meta: {
					title: '年度专项资金汇总',
					noCache: true
				}
			},
      // 框架协议审核
      {
        path: "/framejhs",
        component: Framejhs,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/frame/framejhs")
      },
      // 低值易耗计划
      {
        path: "/priced",
        component: () => import("@/views/dzyhpriced/priced")
      },
       {
        path: "/pricedView",
        component: () => import("@/views/dzyhpriced/pricedView")
      },
      // 低值易耗计划审核
      {
        path: "/priceds",
        component: Priceds,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/dzyhpriced/priceds")
      },
      // 低值易耗汇总计划单
      {
        path: "/collect",
        component: () => import("@/views/dzyhpriced/collect")
      },
      {
        path: "/collectView",
        component: () => import("@/views/dzyhpriced/collectView")
      },
      // 低值易耗汇总审核单
      {
        path: "/collects",
        component: Collects,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/dzyhpriced/collects")
      },
      // 低值易耗汇总审核单BOSS
      {
        path: "/collectss",
        component: Collectss,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/dzyhpriced/collectss")
      },
      // 月度生产物资计划
      {
        path: "/monthlyjh",
        component: () => import("@/views/monthly/monthlyjh")
      },
      {
        path: "/monthlyjhView",
        component: () => import("@/views/monthly/monthlyjhView")
      },
      // 月度生产物资计划审核
      {
        path: "/monthly/monthlyjhs_acticate",
        component: Monthlyjhs,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/monthly/monthlyjhs")
      },
      // 月度生产物资立库
      {
        path: "/state",
        component: () => import("@/views/monthly/state")
      },
       {
        path: "/stateView",
        component: () => import("@/views/monthly/stateView")
      },
      // 月度生产物资计划汇总审核单
      {
        path: "/monCollect",
        component: MonCollect,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/monthly/monCollect")
      },
      // 分包项目流程
      {
        path: "/subpackage",
        component: Subpackage,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/subpackage/subpackage")
      },
      // 分包项目流程审核
      {
        path: "/subpackage/subpackagess_acticate",
        component: Subpackages,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/subpackage/subpackages")
			},
			// 分包项目流程审核
      {
        path: "/subpackage/subpackagesT_acticate",
        component: Subpackages,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/subpackage/subpackagesT")
      },
      // 分包项目流程审核上传会议纪要
      {
        path: "/subpackage/subpackageminutes_acticate",
        component: Subpackageminutes,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/subpackage/subpackageminutes")
      },
      // 分包项目流程审核上传会议纪要有会议纪要文件
      {
        path: "/subpackage/subpackageminutesyou_acticate",
        component: Subpackageminutesyou,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/subpackage/subpackageminutesyou")
      },
      // 咨询及其他服务
      {
        path: "/consult",
        component: () => import("@/views/consult/consult")
      },
       {
        path: "/consultView",
        component: () => import("@/views/consult/consultView")
      },
      // 咨询及其他服务审核
      {
        path: "/consults_acticate",
        component: Consults,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/consult/consults")
      },
      // 咨询及其他服务分管领导审批
      {
        path: "/consultsLeaders_acticate",
        component: ConsultsLeaders,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/consult/ConsultsLeaders")
			},
			// 科室负责人审批
			{
        path: "/commonlyconsult_acticate",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/consult/commonlyconsult")
      },
      // 咨询及其他服务业务部门负责人审批consultsBusiness_acticate
      {
        path: "/consultsBusiness_acticate",
        component: ConsultsBusiness,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/consult/ConsultsBusiness")
      },
      // 咨询及其他服务上传会议纪要
      {
        path: "/consultsMeeting_acticate",
        component: ConsultsMeeting,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/consult/ConsultsMeeting")
      },
      // 咨询及其他服务弹框有上传会议纪要文件
      {
        path: "/ConsultsMeetingyou",
        component: ConsultsMeetingyou,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/consult/ConsultsMeetingyou")
      },
      // 外委计划申请
      {
        path: "/perpheral",
        component: perpheral,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/perpheral/perpheral")
      },
      // 外委计划申请审核
      {
        path: "/perpheral/perpherals_acticate",
        component: perpherals,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/perpheral/perpherals")
      },
      // 外委计划会议纪要
      {
        path: "/perpheral/perpheralschyjy_acticate",
        component: perpheralschyjy,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/perpheral/perpheralschyjy")
      },
      // 外委计划有会议纪要
      {
        path: "/perpheral/perpheralyouscwj_acticate",
        component: perpheralyouscwj,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/perpheral/perpheralyouscwj")
      },
      // 年度大修月度实施计划
      {
        path: "/YearRepair",
        component: YearRepair,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/YearRepair/YearRepair")
      },
      // 年度大修月度实施计划上传会议纪要
      {
        path: "/YearRepairyscwj_acticate",
        component: () => import("@/views/YearRepair/YearRepairschyjy"),
        meta: {
          title: "年度大修月度实施计划上传会议纪要",
          noCache: true
        }
      },
      // 年度专项资金变更
      {
        path: "/MoneyChang",
        component: MoneyChang,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/MoneyChang/MoneyChang")
      },
      // 年度专项资金变更审核
      {
        path: "/moneyChangbg_acticate",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/MoneyChang/MoneyChangbg")
      },
      // 月度专项资金计划
      {
        path: "/moneySpecial",
        component: MoneySpecial,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/moneySpecial/moneySpecial")
      },
      {
        path: "/moneySpecialView",
        component: () => import("@/views/moneySpecial/moneySpecialView")
      },
      // 月度专项资金计划审核
      {
        path: "/moneySpecialsT_acticate",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/moneySpecial/moneySpecialsT")
			},
			// 月度专项资金计划审核
      {
        path: "/moneySpecials_acticate",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/moneySpecial/moneySpecials")
      },
      // 月度专项资金计划批复文件
      {
        path: "/moneySpecialpfwj_acticate",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/moneySpecial/moneySpecialpfwj")
	  },
	   // 年度科研项目计划汇总审核
      {
        path: "/YearSientificollects_acticate",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/YearSientific/YearSientificollects")
      },
      // // 年度科研项目计划汇总审核下发
      {
        path: "/YearSientificollectsend_acticate",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/YearSientific/YearSientificollectsend")
      },
      // 供应商
      {
        path: "/supplier",
        component: Supplier,
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/supplier/supplier")
      },
      {
        path: "/supplier_views",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/supplier/supplerViews")
			},
			// 供应商在已办中的查看路由
			{
        path: "/_views",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/supplier/supplerexamine")
      },
      {
        path: "/supplersave_acticate",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/supplier/supplersave")
      },
      // 年度科研项目实施
      {
        path: "/scientificO",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/implementation/scientificO")
      },
      // 科研项目实施审核
      {
        path: "/scientificTs_acticate",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/implementation/scientificTs")
      },
      // 年度科技资金补报申请单
      {
        path: "/supplementO",
        component: () => import("@/views/supplement/supplementO")
      },
       {
        path: "/supplementOUpdate",
        component: () => import("@/views/supplement/supplementOUpdate")
      },
       {
        path: "/supplementOView",
        component: () => import("@/views/supplement/supplementOView")
      },
      // 年度科技资金补报审核
      {
        path: "/supplementT",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/supplement/supplementT")
      },
      // 年度科技资金补报负责人审核
      {
        path: "/supplementH",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/supplement/supplementH")
      },
      // 年度科技资金补报总共审核
      {
        path: "/supplementF",
        // eslint-disable-next-line no-dupe-keys
        component: () => import("@/views/supplement/supplementF")
      },
		{
			path: '/summaryReview/planPersonReview_acticate',
			component: () =>
				import('@/views/summaryReview/planPersonReview'),
			meta: {
				title: '计划部专员接收',
				noCache: true
			}

		},
			{
				path: '/summaryReview/safetyChargeReview_acticate',
				component: () =>
					import('@/views/summaryReview/safetyChargeReview'),
				meta: {
					title: '安全生产环保部负责人审批',
					noCache: true
				}

			},
			// 年度中心申请
			{
				path: '/establish',
				component: () =>
					import('@/views/establish/establish'),
				meta: {
					title: '年度中心申请',
					noCache: true
				}
			},
			{
				path: '/establishView',
				component: () =>
					import('@/views/establish/establishView'),
				meta: {
					title: '年度中心申请',
					noCache: true
				}
			},
			{
				path: '/establishUpdate',
				component: () =>
					import('@/views/establish/establishUpdate'),
				meta: {
					title: '年度中心申请',
					noCache: true
				}
			},
			// 年度中心申请审核
			{
				path: '/result/result_acticate',
				component: () =>
					import('@/views/result/result'),
				meta: {
					title: '年度中心申请审核',
					noCache: true
				}
			},
			// 年度资金汇总单
			{
				path: '/summary',
				component: () =>
					import('@/views/summary/summary'),
				meta: {
					title: '年度资金汇总单',
					noCache: true
				}
			},
			// 年度汇总审核单
			{
				path: '/summary/summarys_acticate',
				component: () =>
					import('@/views/summary/summarys'),
				meta: {
					title: '年度汇总审核单',
					noCache: true
				}
			},
			{
				path: '/summary/summaryEnd_acticate',
				component: () =>
					import('@/views/summary/summaryEnd'),
				meta: {
					title: '年度汇总审核单',
					noCache: true
				}
			},
			// 年度资金计划
			{
				path: '/special',
				component: () =>
					import('@/views/special/special'),
				meta: {
					title: '年度资金计划',
					noCache: true
				}
			},
			{
				path: '/specialUpdate',
				component: () =>
					import('@/views/special/specialUpdate'),
				meta: {
					title: '年度资金计划',
					noCache: true
				}
			},
			{
				path: '/specialView',
				component: () =>
					import('@/views/special/specialView'),
				meta: {
					title: '年度资金计划',
					noCache: true
				}
			},
			{
				path: '/specialUpdate',
				component: () =>
					import('@/views/special/specialUpdate'),
				meta: {
					title: '年度资金计划',
					noCache: true
				}
			},
			// 年度资金计划审核
			{
				path: '/special/specialsh_acticate',
				component: () =>
					import('@/views/special/specialsh'),
				meta: {
					title: '年度资金计划审核',
					noCache: true
				}
			},
			{
				path: '/special/specialshEnd_acticate',
				component: () =>
					import('@/views/special/specialshEnd'),
				meta: {
					title: '上级单位批复结果录入及下发',
					noCache: true
				}
			},
			// 资金计划下发通知
			{
				path: '/plans',
				component: () =>
					import('@/views/special/plans'),
				meta: {
					title: '资金计划下发通知',
					noCache: true
				}
			},
			// 年度专项2类中心审核单(台账链接)
			{
				path: '/AuditParameter',
				component: () =>
					import('@/views/special/AuditParameter'),
				meta: {
					title: '年度专项2类中心审核单(台账链接)',
					noCache: true
				}
			},
			// 年度大修申请
			{
				path: '/dxverhaul',
				component: () =>
					import('@/views/dxverhaul/dxverhaul'),
				meta: {
					title: '年度大修申请',
					noCache: true
				}
			},
			// 年度大修申请审核单
			{
				path: '/dxverhauls',
				component: () =>
					import('@/views/dxverhaul/dxverhauls'),
				meta: {
					title: '年度大修申请审核单',
					noCache: true
				}
			},
			// 年度大修汇总计划
			{
				path: '/dxcollect',
				component: () =>
					import('@/views/dxverhaul/dxcollect'),
				meta: {
					title: '年度大修汇总计划',
					noCache: true
				}
			},
			{
				path: '/dxcollectUpdate',
				component: () =>
					import('@/views/dxverhaul/dxcollectUpdate'),
				meta: {
					title: '年度大修汇总计划',
					noCache: true
				}
			},
			{
				path: '/dxcollectView',
				component: () =>
					import('@/views/dxverhaul/dxcollectView'),
				meta: {
					title: '年度大修汇总计划',
					noCache: true
				}
			},
			// 年度大修汇总计划审核单
			{
				path: '/dxverhaul/dxcollects_acticate',
				component: () =>
					import('@/views/dxverhaul/dxcollects'),
				meta: {
					title: '年度大修汇总计划审核单',
					noCache: true
				}
			},
			{
				path: '/dxverhaul/dxcollectEnd_acticate',
				component: () =>
					import('@/views/dxverhaul/dxcollectEnd'),
				meta: {
					title: '年度大修汇总计划审核单',
					noCache: true
				}
			},


			// 低值易耗计划
			{
				path: '/priced',
				component: () =>
					import('@/views/dzyhpriced/priced'),
				meta: {
					title: '低值易耗计划',
					noCache: true
				}
			},
			// 低值易耗计划审核
			{
				path: '/dzyhpriced/priceds_acticate',
				component: () =>
					import('@/views/dzyhpriced/priceds'),
				meta: {
					title: '低值易耗计划审核',
					noCache: true
				}
			},
			{
				path: '/dzyhpriced/priceds_views',
				component: () =>
					import('@/views/dzyhpriced/pricedsViews'),
				meta: {
					title: '低值易耗计划审核',
					noCache: true
				}
			},
			// 低值易耗汇总计划单
			{
				path: '/collect',
				component: () =>
					import('@/views/dzyhpriced/collect'),
				meta: {
					title: '低值易耗汇总计划单',
					noCache: true
				}
			},
			// 低值易耗汇总审核单
			{
				path: '/collects',
				component: () =>
					import('@/views/dzyhpriced/collects'),
				meta: {
					title: '低值易耗汇总审核单',
					noCache: true
				}
			},
			// 低值易耗汇总审核单BOSS
			{
				path: '/dzyhpriced/collectss_acticate',
				component: () =>
					import('@/views/dzyhpriced/collectss'),
				meta: {
					title: '低值易耗汇总审核单BOSS',
					noCache: true
				}
			},
			// 月度生产物资计划
			{
				path: '/monthlyjh',
				component: () =>
					import('@/views/monthly/monthlyjh'),
				meta: {
					title: '月度生产物资计划',
					noCache: true
				}
			},
			{
				path: '/monthlyjhView',
				component: () =>
					import('@/views/monthly/monthlyjhView'),
				meta: {
					title: '月度生产物资计划',
					noCache: true
				}
			},
			// 月度生产物资计划审核
			{
				path: '/monthly/monthlyjhs_acticate',
				component: () =>
					import('@/views/monthly/monthlyjhs'),
				meta: {
					title: '月度生产物资计划审核',
					noCache: true
				}
			},
			// 月度生产物资立库
			{
				path: '/state',
				component: () =>
					import('@/views/monthly/state'),
				meta: {
					title: '月度生产物资立库',
					noCache: true
				}
			},
			//月度生产物资计划汇总审核单
			{
				path: '/monthly/monCollect_acticate',
				component: () =>
					import('@/views/monthly/monCollect'),
				meta: {
					title: '月度生产物资计划汇总审核单',
					noCache: true
				}
			},
			// 分包项目流程
			{
				path: '/subpackage',
				component: () =>
					import('@/views/subpackage/subpackage'),
				meta: {
					title: '分包项目流程',
					noCache: true
				}
			},
			{
				path: '/subpackageView',
				component: () =>
					import('@/views/subpackage/subpackageView'),
				meta: {
					title: '分包项目流程',
					noCache: true
				}
			},
			// 分包项目流程审核
			{
				path: '/subpackage/subpackages_acticate',
				component: () =>
					import('@/views/subpackage/subpackages'),
				meta: {
					title: '分包项目流程审核',
					noCache: true
				}
			},
			// 分包项目流程审核1
			{
				path: '/subpackage/subpackages_acticate',
				component: () =>
					import('@/views/subpackage/subpackages'),
				meta: {
					title: '分包项目流程审核',
					noCache: true
				}
			},
			// 分包项目流程审核上传会议纪要
			{
				path: '/subpackageminutes',
				component: () =>
					import('@/views/subpackage/subpackageminutes'),
				meta: {
					title: '分包项目流程审核上传会议纪要',
					noCache: true
				}
			},
			// 分包项目流程审核上传会议纪要有会议纪要文件
			{
				path: '/subpackageminutesyou',
				component: () =>
					import('@/views/subpackage/subpackageminutesyou'),
				meta: {
					title: '分包项目流程审核上传会议纪要有会议纪要文件',
					noCache: true
				}
			},
			// 咨询及其他服务
			{
				path: '/consult',
				component: () =>
					import('@/views/consult/consult'),
				meta: {
					title: '咨询及其他服务',
					noCache: true
				}
			},
			// 咨询及其他服务分管领导审批
			{
				path: '/ConsultsLeaders',
				component: () =>
					import('@/views/consult/ConsultsLeaders'),
					meta: {
					title: '咨询及其他服务分管领导审批',
					noCache: true
				}
			},
			// 咨询及其他服务业务部门负责人审批
			{
				path: '/ConsultsBusiness',
				component: () =>
					import('@/views/consult/ConsultsBusiness'),
					meta: {
					title: '咨询及其他服务业务部门负责人审批',
					noCache: true
				}
			},
			// 咨询及其他服务上传会议纪要
			{
				path: '/ConsultsMeeting',
				component: () =>
					import('@/views/consult/ConsultsMeeting'),
					meta: {
					title: '咨询及其他服务上传会议纪要',
					noCache: true
				}
			},
			// 咨询及其他服务弹框有上传会议纪要文件
			{
				path: '/ConsultsMeetingyou',
				component: () =>
					import('@/views/consult/ConsultsMeetingyou'),
					meta: {
					title: '咨询及其他服务弹框有上传会议纪要文件',
					noCache: true
				}
			},
			// 外委计划申请
			{
				path: '/perpheral',
				component: () =>
					import('@/views/perpheral/perpheral'),
					meta: {
					title: '外委计划申请',
					noCache: true
				}
			},
			{
				path: '/perpheralView',
				component: () =>
					import('@/views/perpheral/perpheralView'),
					meta: {
					title: '外委计划申请',
					noCache: true
				}
			},
			// 外委计划申请审核
			{
				path: '/perpherals',
				component: () =>
					import('@/views/perpheral/perpherals'),
					meta: {
					title: '外委计划申请审核',
					noCache: true
				}
			},
			// 外委计划会议纪要
			{
				path: '/perpheralschyjy',
				component: () =>
					import('@/views/perpheral/perpheralschyjy'),
					meta: {
					title: '外委计划会议纪要',
					noCache: true
				}
			},
			// 外委计划有会议纪要
			{
				path: '/perpheralyouscwj',
				component: () =>
					import('@/views/perpheral/perpheralyouscwj'),
					meta: {
					title: '外委计划有会议纪要',
					noCache: true
				}
			},
			// 年度大修月度实施计划
			{
				path: '/YearRepair',
				component: () =>
					import('@/views/YearRepair/YearRepair'),
						meta: {
					title: '年度大修月度实施计划',
					noCache: true
				}
			},
			{
				path: '/YearRepairView',
				component: () =>
					import('@/views/YearRepair/YearRepairView'),
						meta: {
					title: '年度大修月度实施计划',
					noCache: true
				}
			},
			//年度大修月度实施计划审核
			{
				path: '/YearRepairs_acticate',
				// eslint-disable-next-line no-dupe-keys
				component: () =>
					import('@/views/YearRepair/YearRepairs'),
					meta: {
					title: '年度大修月度实施计划审核',
					noCache: true
				}
			},
			// 年度大修月度实施
			{
				path: '/YearRepairsT_acticate',
				component: () =>
					import('@/views/YearRepair/YearRepairsT'),
					meta: {
					title: '年度大修月度实施有上传文件会议纪要',
					noCache: true
					}
      		},
			// 年度大修月度实施有上传文件会议纪要
			{
        path: "/YearRepairschyjy_acticate",
        component: () => import("@/views/YearRepair/YearRepairyscwj"),
        meta: {
          title: "年度大修月度实施有上传文件会议纪要",
          noCache: true
        }
      },
			// 年度专项资金变更
			{
				path: '/MoneyChang',
				component: () =>
					import('@/views/MoneyChang/MoneyChang'),
					meta: {
					title: '年度专项资金变更',
					noCache: true
				}
			},
			{
				path: '/MoneyChangUpdate',
				component: () =>
					import('@/views/MoneyChang/MoneyChangUpdate'),
					meta: {
					title: '年度专项资金变更',
					noCache: true
				}
			},
			{
				path: '/MoneyChangView',
				component: () =>
					import('@/views/MoneyChang/MoneyChangView'),
					meta: {
					title: '年度专项资金变更',
					noCache: true
				}
			},
			// 年度专项资金变更审核
			{
				path: '/MoneyChangbg',
				component: () =>
					import('@/views/MoneyChang/MoneyChangbg'),
					meta: {
					title: '年度专项资金变更审核',
					noCache: true
				}
			},
			// 月度专项资金计划
			{
				path: '/moneySpecial',
				component: () =>
					import('@/views/moneySpecial/moneySpecial'),
					meta: {
					title: '月度专项资金计划',
					noCache: true
				}
			},
			// 月度专项资金计划审核
			{
				path: '/moneySpecials',
				component: () =>
					import('@/views/moneySpecial/moneySpecials'),
					meta: {
					title: '月度专项资金计划审核',
					noCache: true
				}
			},
			// 月度专项资金计划批复文件
			{
				path: '/moneySpecialpfwj',
				component: () =>
					import('@/views/moneySpecial/moneySpecialpfwj'),
					meta: {
					title: '月度专项资金计划批复文件',
					noCache: true
				}
			},
				// 年度科研项目计划审核
			{
				path: '/YearSientific/YearSientifics_acticate',
				component: () =>
					import('@/views/YearSientific/YearSientifics'),
					meta: {
					title: '年度科研项目计划审核',
					noCache: true
				}
			},
		 // 年度科研项目计划汇总
			{
				path: '/YearSientificollectView',
				component: () =>
					import('@/views/YearSientific/YearSientificollectView'),
					meta: {
					title: '年度科研项目计划汇总',
					noCache: true
				}
			},
			// 供应商
			{
				path: '/supplierView',
				component: () =>
					import('@/views/supplier/supplierView'),
					meta: {
					title: '供应商',
					noCache: true
				}
			},
			{
				path: '/supplier_views',
				// eslint-disable-next-line no-dupe-keys
				component: () =>
					import('@/views/supplier/supplerViews')
			},
			{
				path: '/supplersave_acticate',
				component: () =>
					import('@/views/supplier/supplersave'),
					meta: {
					title: '供应商',
					noCache: true
				}
			},
			// 年度科研项目实施
			{
				path: '/scientificO',
				component: () =>
					import('@/views/implementation/scientificO'),
					meta: {
					title: '年度科研项目实施',
					noCache: true
				}
			},
			{
				path: '/scientificOView',
				component: () =>
					import('@/views/implementation/scientificOView'),
					meta: {
					title: '年度科研项目实施',
					noCache: true
				}
			},
			// 科研项目实施审核
			{
				path: '/scientificT_acticate',
				component: () =>
					import('@/views/implementation/scientificT'),
					meta: {
					title: '科研项目实施审核',
					noCache: true
				}
			},

			// 科研项目实施会议纪要
			{
				path: '/scientificH_acticate',
				component: () =>
					import('@/views/implementation/scientificH'),
					meta: {
					title: '科研项目实施会议纪要',
					noCache: true
				}
			},
			// 年度科研项目实施会议审核
			{
				path: '/scientificF_acticate',
				component: () =>
					import('@/views/implementation/scientificF'),
					meta: {
					title: '年度科研项目实施会议审核',
					noCache: true
				}
			},
			// 年度科技资金补报申请单
			{
				path: '/supplementO',
				component: () =>
					import('@/views/supplement/supplementO'),
					meta: {
					title: '年度科技资金补报申请单',
					noCache: true
				}
			},
			// 年度科技资金补报审核
			{
				path: '/supplement/supplementT_acticate',
				component: () =>
					import('@/views/supplement/supplementT'),
					meta: {
					title: '年度科技资金补报审核',
					noCache: true
				}
			},
			//是否需要部门负责人审核
			{
				path: '/supplement/supplementResponse_acticate',
				component: () =>
					import('@/views/supplement/supplementResponse'),
					meta: {
					title: '年度科技资金补报审核',
					noCache: true
				}
			},
			{
				path: '/supplement/supplementTotal_acticate',
				component: () =>
					import('@/views/supplement/supplementTotal'),
					meta: {
					title: '年度科技资金补报审核',
					noCache: true
				}
			},

			// 年度科技资金补报负责人审核
			{
				path: '/supplementH',
				// eslint-disable-next-line no-dupe-keys
				component: () =>
					import('@/views/supplement/supplementH'),
					meta: {
					title: '年度科技资金补报负责人审核',
					noCache: true
				}
			},
			// 年度科技资金补报总共审核
			{
				path: '/supplementF',
				// eslint-disable-next-line no-dupe-keys
				component: () =>
					import('@/views/supplement/supplementF')
			},
			//年度科技资金计划项目
			{
				path: '/yearMoneyPlan',
				// eslint-disable-next-line no-dupe-keys
				component: () =>
					import('@/views/yearMoneyPlan/index'),
				meta: {
					title: '年度科技资金计划',
					noCache: true
				}
			},
			{
				path: '/yearMoneyPlanView',
				// eslint-disable-next-line no-dupe-keys
				component: () =>
					import('@/views/yearMoneyPlan/view'),
				meta: {
					title: '年度科技资金计划',
					noCache: true
				}
			},
			{
				path: '/yearMoneyPlanUpdate',
				// eslint-disable-next-line no-dupe-keys
				component: () =>
					import('@/views/yearMoneyPlan/update'),
				meta: {
					title: '年度科技资金计划',
					noCache: true
				}
			},
			// 年度科技资金计划审核页面
			{
				path: '/cashplan/cashplanT_acticate',
				component: CashplanT,
				component: () => import('@/views/cashplan/cashplanT')
			},
			//年度科技资金计划汇总页面
			{
				path: '/cashplanH',
				component: CashplanH,
				component: () => import('@/views/cashplan/cashplanH')
			},
			//年度科技资金计划汇总审核页面
			{
				path: '/cashplanF_acticate',
				component: () => import('@/views/cashplan/cashplanF'),
				meta: {
					title: '年度科技资金计划汇总审核页面',
					noCache: true
				}
			},
			{
				path: '/cashplanF_views',
				component: () => import('@/views/cashplan/cashplanF_view'),
				meta: {
					title: '年度科技资金计划汇总审核页面',
					noCache: true
				}
			},
			// 年度科技资金计划汇总审核页面下发
			{
				path: '/cashplanW_acticate',
				component: CashplanW,
				component: () => import('@/views/cashplan/cashplanW'),/* import('@/views/cashplan/cashplanW') */
					meta: {
					title: '年度科技资金计划汇总审核页面下发',
					noCache: true
				}

			},
			// 年度科技资金补报总共审核
			{
				path: '/cashplanW',
				component: CashplanW,
				component: () => import('@/views/supplement/supplementF'),/* import('@/views/cashplan/cashplanW') */
					meta: {
					title: '年度科技资金补报总共审核',
					noCache: true
				}

			}
		]
	},

	// {
	//   path: '',
	//   component: Layout,
	//   redirect: 'home',
	//   children: [
	//     {
	//       path: 'home',
	//       component: () => import('@/views/home/index'),
	//       name: 'home',
	//       meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
	//     }
	//   ]
	// }

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [{
	path: '*',
	redirect: '/home',
	hidden: true
}]
