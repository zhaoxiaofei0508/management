<template>
    <div style="padding:20px;">
       <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>审核</el-breadcrumb-item>
		</el-breadcrumb>
        <div class="zxfplan">
            <h3>{{planBudget.title}}</h3>
			<span>{{planBudget.orgName}}</span>
			<span>{{planBudget.createUserName}}</span>
			<span>{{planBudget.createDate}}</span>
            <strong>查看流程图</strong>
            <div class="zxftable">
                <template>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- 计划表 -->
                        <el-tab-pane label="计划单" name="first">
                            <div class="zxfschedule">
                                <h4>{{planBudget.title}}</h4>
                            </div>
                            <div class="ztable">
                                <p>计划信息</p>
                                <div class="jhbg">
                                    <el-table
                                        :data="zxftableData"
                                        ref="table"
                                        border
                                        stripe
                                        >
                                        <el-table-column label="项目类别" width="120" prop="projectType">
                                        </el-table-column>
                                        <el-table-column label="项目名称" width="120" prop="projectName">
                                        </el-table-column>
                                        <el-table-column label="项目预估金额" prop="projectMoney">
                                        </el-table-column>
                                        <el-table-column label="开始时间" prop="startDate" width='100'>
                                        </el-table-column>
                                        <el-table-column label="结束时间" prop="endDate" width='100'>
                                        </el-table-column>
                                        <el-table-column label="负责人" width="120" prop="chargePerson">
                                        </el-table-column>
                                        <el-table-column label="项目等级" width="120" prop="projectGrade">
                                        </el-table-column>
                                        <el-table-column label="项目简介" width="120" prop="projectDesc">
                                        </el-table-column>
                                        <el-table-column label="提报部门" width="120" prop="orgName">
                                        </el-table-column>
                                        <el-table-column label="附件" prop="accessory">
                                        </el-table-column>
                                        <el-table-column label="操作" width="120" align='center'>
                                            <template slot-scope="scope">
                                                <el-button type="text" size="small" @click="chakanfj(scope.row)">查看附件</el-button>      
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-tab-pane>
               
                        <el-tab-pane label="审核历史" name="second">
                            <div class="zxfblock">
                                <el-timeline>
                                    <el-timeline-item
                                    v-for="(activity, index) in activities"
                                    :key="index"
                                    :icon="activity.icon"
                                    :type="activity.type"
                                    :color="activity.color"
                                    :size="activity.size"
                                    :timestamp="activity.timestamp">
                                    {{activity.content}}
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                            <div class="zxftime">
                                <span>提交审核</span>
                                <p>同意</p>
                                <p>审核说明:<span>无</span></p>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </template>
            </div>      
        </div>   
        <!-- 查看附件弹框 -->
        <el-dialog
            title="项目文件"
            :visible.sync="dialogVisible"
            width="80%"
            >
            <div>
                <el-button plain v-for="(item,i) in tabsArray" :key="i" @click="tabs(item.id)">{{item.title}}</el-button>

            </div>           
        </el-dialog>
    </div>
</template>
<script>
import  Navbar from '@/views/layout/components/Navbar'//导航
import  Results from '@/views/result/components/results/results'
import { getAjax, postAjax, postAjaxJson,postAjaxx } from '@/utils/ajaxRequest'
export default {
    name:'Result',
    components:{
        Navbar,
        Results
    },
    data() {
      return {
        planBudget: {},
        planMoney:0,
        zxfsearch:'',//计划内查看商品搜索框
        textarea:'',//审核说明
        message:"",
        activeName: 'first',//标签页切换
         value: '',//审核结果
        valuename: '',//审核人
        optionsname:[],
        options:[{
            value:"同意",
            label:"同意"
        },{
            value:"不同意",
            label:"不同意"
        },],
        //查看附件
        tabsArray:[
            {
                title: '立项申请书',
                id: '1',
                content: 'Tab 1 content'
            },
            {
                title: '立项建议表',
                id: '2',
                content: 'Tab 2 content'
            },
            {
                title: '项目备案表',
                id: '3',
                content: 'Tab 3 content'
            }
        ],
        dialogVisible:false,//查看附件弹框
        //计划信息表格
        zxftableData:[
            {
                // projectType:'',
                // category:"",
                // projectName:'',
                // // projectMoney:'23',
                // startDate:'',
                // endDate:'',
                // projectDesc:'',
                // filePath:'',
            },
        ],
        // 时间线
        activities: [{
          content: '维修中心 李华',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          icon: 'el-icon-more'
        }, {
          content: '维修中心 李华 ',
          timestamp: '2018-04-03 20:46',
          
        }, {
          content: '维修中心 李华',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87',
          size: 'large'
        }],
       // 审核人
        valuename:'',//初始为空
        // 审核结果
        value:'',
        resultArr: [{
					label: "同意",
					value: "同意"
				}, {
					label: "不同意",
					value: "不同意"
				}],
				peopleArr: [],
				ruleForm: {
					people: "",
					suggest: "",
					result: "",
				},
                formObj: {},
                taskName:"",
				rules: {
					result: [{
						required: true,
						message: '请选择审核结果',
						trigger: 'change'
					}],
					suggest: [{
						required: true,
						message: '请输入审核说明',
						trigger: 'change'
					}],
					people: [{
						required: true,
						message: '请选择审核人',
						trigger: 'change'
					}],
					
				},
      };
    },
    mounted() {
        // console.log(this.textarea);
    },
    methods: {
       // 审核结果下拉事件
        selectGet(val){
            this.value=val//赋值给value
            // console.log(val, '审核结果');
        },
        // 选择审核人下拉事件
        selectGetname(val){
            this.valuename=val
            // console.log(val, '66');
        },
        // 文本域
        inputChangedMer: function (e) {
            this.textarea = e.target.value   
        },
        // 计划单切换
        handleClick(tab, event) {
        // console.log(tab, event);
        },
        //tab查看附件切换点击事件
        tabs(id){
            console.log(id)
        },
       
        //表格查看商品
        check(row){
          this.dialogTableVisible=true
        },
        //表格查看附件
        chakanfj(row){
            this.dialogVisible=true
            getAjax(`/api/planmanagementService/technologyPlanReport/getPlanReportAnnexfileInfo?mainTableId=${data.id}`).then(res => {
                this.attachArr = res.data;
                this.attachActive=res.data[0].id;
			});
        },
        
        cancel() {
            this.$router.push("/home/index")
        },
    },
    created(){
        var param = {
            applyId: this.$route.query.id 
        }
        console.log(param)
        getAjax("/api/planmanagementService/annualResearchPlan/getTechnologyPlan", param).then(res => {
            console.log(res)
            this.zxftableData = res.data.planBudgetproject;
            this.planBudget = res.data.planBudget;
            this.planBudget.createUserName = res.data.planBudget ? res.data.planBudget.createUser.split("--")[1] : "";
        });
    }
}
</script>

<style scoped>
 .route{
    margin-top: 60px;
    height: 50px;
    line-height: 50px;
    background-color: rgb(216, 216, 216);
    padding: 0 20px;
    cursor: pointer;
    font-size: 15px;
}
.zxfplan{
    width: 90%;
    margin: 10px auto;
    /* background-color: rgb(255, 164, 210); */
    min-height: 500px;
}
.zxfplan>h3{
    margin-top: 3%;
}
.zxfplan>span{
    width: 85px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    display: inline-block;
}
.zxfplan>strong{
    width: 105px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: inline-block;
    margin-left: 69%;
    border: 1px solid rgb(224, 224, 224);
    font-size: 15px;
}
.zxfschedule>h4{
    text-align: center;
    height: 80px;
    line-height: 80px;
}
.zxfblock{
    padding: 10px 10px;
    position: relative;
}
.zxftime{
    position: absolute;
    top: 20px;
    left: 20%;
    width: 60%;
    height: 200px;
    line-height: 32px;
}
.zxftime>span:nth-child(2){
    margin-left: 2%;
}
.zxftime>span{
    font-size: 14px;
    color: rgb(107, 107, 107);
}
.zxftime>p{
    font-size: 14px;
    color: rgb(107, 107, 107);
    margin: 20px 0;
    /* padding-left: 10%; */
}
.zxfbutton{
  height: 100px;
}
.zxfbutton>span{
  display: inline-block;
  width: 180px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border: 1px solid rgb(112, 112, 112);
  margin-top: 3%;
  cursor: pointer;
}
.zxfbutton>span:nth-child(1){
  margin-left: 50%;
  margin-right: 8%;
}
.zxfbutton>span:nth-child(2){
  background-color: rgb(252, 72, 72);
  color: white;
  border: none;
}
.ztable>p{
    height: 45px;
    line-height: 45px;
    padding: 0 22px;
    background-color: rgba(243, 243, 243, 0.829);
    font-size: 15px;
    margin-bottom: 20px;
}
.jhbg>ul>li{
    width: 30%;
    font-size: 14px;
}
</style>
