<template>
  <div style="padding:20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item >审核</el-breadcrumb-item>
		</el-breadcrumb>
        <div class="zxfplan">
            <h3>{{forName}}</h3>
            <span>{{orgName}}</span>
            <span>{{applyusername}}</span>
            <span>{{applyDate}}</span>
            <div class="zxftable">
                <template>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- 计划表 -->
                        <el-tab-pane label="计划表" name="first">
                            <div class="zxfschedule">
                                <h4>月度生产物资计划</h4>
                            </div>
                            <div class="ztable">
                                <el-table
                                    :data="zxftableData"
                                    ref="table"
                                    tooltip-effect="dark"
                                    border
                                    stripe
                                    @selection-change='selectRow'>
                                    <el-table-column label="项目编码" width="100" prop="projectNo">
                                    </el-table-column>
                                    <el-table-column label="项目类别" width="120" prop="projectType">
                                    </el-table-column>
                                    <el-table-column label="项目名称" width="120" prop="projectName">
                                    </el-table-column>
                                    <el-table-column label="项目预估金额" prop="projectMoney">
                                    </el-table-column>
                                    <el-table-column label="开始时间" prop="startDate">
                                    </el-table-column>
                                    <el-table-column label="结束时间" prop="endDate">
                                    </el-table-column>
                                    <el-table-column label="负责人" width="120" prop="chargePerson">
                                    </el-table-column>
                                    <el-table-column label="项目简介" width="120" prop="projectDesc">
                                    </el-table-column>
                                    <el-table-column label="附件" prop="filePath">
                                    </el-table-column>
                                    <el-table-column label="提报部门" prop="orgName">
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="check(scope.row.id)">查看商品</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div style="margin-top: 20px;">
                                计划总金额:<span>{{totalMoney}}</span>
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
                <el-dialog width="98%" title="商品明细" :visible.sync="dialogTableVisible" >
                    <el-table
                        :data="tableDatas"
                        ref="table"
                        tooltip-effect="dark"
                        border
                        stripe
                        @selection-change='selectRow'>
                        <el-table-column prop="goodsClass" label="分类" width="50">
                        </el-table-column>
                        <el-table-column label="编码" width="50" prop="goodsCode">
                        </el-table-column>
                        <el-table-column label="商品/服务名称" width="120" prop="goodsName">
                        </el-table-column>
                        <el-table-column label="规则型号/描述" width="120" prop="goodsModel">
                        </el-table-column>
                        <el-table-column label="单位" prop="goodsunit">
                        </el-table-column>
                        <el-table-column label="数量" prop="goodsNumber">
                        </el-table-column>
                        <el-table-column label="预估单价" prop="goodsPrice">
                        </el-table-column>
                        <el-table-column label="预估总价" prop="goodsTotal">
                        </el-table-column>
                        <el-table-column label="类型" prop="goodsType">
                        </el-table-column>
                        <el-table-column label="计划实施时间" width="120" prop="startDate">
                        </el-table-column>
                        <el-table-column label="计划交付时间" width="120" prop="endDate">
                        </el-table-column>
                        <el-table-column label="主机厂家" prop="factoryName">
                        </el-table-column>
                        <el-table-column label="技术要求" prop="technologyDesc">
                        </el-table-column>
                        <el-table-column label="备注" prop="remarks">
                        </el-table-column>
                    </el-table>
                </el-dialog>
            </div>
        </div>
        <el-button @click="cancel()">取消</el-button>
    </div>
</template>
<script>
  import { parseTime } from '@/utils'
import  Navbar from '@/views/layout/components/Navbar'//导航
import { getAjaxA, getAjax, postAjax, postAjaxJson } from '@/utils/ajaxRequest'
export default {
    name:'Result',
    components:{
        Navbar
    },
    data() {
      return {
        textarea:'',//审核说明
        activeName: 'first',//标签页切换
        gridData:[{//查看商品数据

            goodsClass:"",
            goodsCode:"",
            goodsName:"",
            goodsModel:"",
            goodsunit:"",
            goodsNumber:"",
            goodsPrice:"",
            goodsTotal:"",
            goodsType:"",
            startDate:"",
            endDate:"",
            factoryName:"",
            technologyDesc:"",
            remarks:""
          }
         ],
        zxfoptionss: [//添加商品的类型
                {
                id: '1',
                typevalue: '物资'
                },
                {
                id: '2',
                typevalue: '工程'
                },
                {
                id: '3',
                typevalue: '设备'
                }
        ],
        dialogTableVisible:false,//查看商品
        zxftableData:[ //表格
            {
                category:"",
                projectName:'',
                projectMoney:'',
                startDate:'',
                endDate:'',
                projectDesc:'',
                filePath:''
            }
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
        optionsname: [],
         // 审核结果
        value:'',
        	peopleArr: [],
        options:[{
                value: '同意',
                label: ''
              }, {
                value: '不同意',
                label: ''
        }],
        resultArr: [{
        	label: "同意",
        	value: "同意"
        }, {
        	label: "不同意",
        	value: "不同意"
        }],
        	nextPer: [],
          ruleForm: {
          	people: "",
          	suggest: "",
          	result: ""
          },
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
          orgName:'',
          applyusername:'',
          forName:'',
          totalMoney:'',
          tableDatas:[]

      };
    },
    mounted() {
        // console.log(this.textarea);
    },
    created(){
      this.applyDate = parseTime(new Date(), "{y}-{m}-{d}");
      this.applyusername = sessionStorage.userName;
      this.orgName = sessionStorage.orgName;
      this.forName= this.$route.query.formName;
      this.formId = this.$route.query.id;
      this.applyId = this.$route.query.businessKey;
      this.init();
      var param = {
            applyId: this.$route.query.id
        }
        getAjax(`/api/planmanagementService/outsourUploadMeetCont/findOutInfo`,param).then(res => {
            var resData = res.data;
            if(resData.code==0){
              this.zxftableData=resData.data;
             	_.forEach(this.zxftableData, value => {
                  console.info("====="+JSON.stringify(value))
                  this.totalMoney+=value.projectMoney;
              });
            }
        });
      },
    methods: {

      init(){
        var paramVars = {
          "manger":"yes"
          }
            postAjaxJson(`/api/processService/userTask/getNextExaminePersonByVars/` + this.$route.query.taskId,paramVars).then(res => {
              if(res.code == 0) {
                console.info("------" + JSON.stringify(res));
                this.peopleArr = res.data;
                console.info("------" + JSON.stringify(this.peopleArr));
                //获取下一步审批人
                for(var i = 0; i < this.peopleArr.length; i++) {
                  this.isEnd = this.peopleArr[i].nextActiveName;
                  console.info(this.isEnd)
                  if(this.peopleArr[i].name == '同意') {
                    this.nextPer = this.peopleArr[i].nextActiveUsers;
                  }
                }
              }
            });
            this.findData(this.applyId,"");
        },
      findData(apId,formId){
        
      },

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
        // 切换
        handleClick(tab, event) {
        // console.log(tab, event);
      },
      zxfsummary(){
        console.log(this.valuename)
        console.log(this.value)
        console.log(this.textarea)
          this.$router.push("/summary/")
      },

      submitForm() {
      	var param = {
      		"applyId": this.$route.query.businessKey,
      		"deploymentKey": "ydscwzjh",
      		"formId": "",
      		"fromKey": "",
      		"manger": "",
      		"message": this.ruleForm.suggest,
      		"needCompanyExamine": "",
      		"needTechnologyExamine": "",
      		"result": this.ruleForm.result,
      		"taskId": this.$route.query.taskId,
      		"taskName": this.taskName,
      		"userid": this.ruleForm.people
      	}
      	postAjaxJson("/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep", param).then(res => {
      		if(res.code == 0) {
      			this.$message("成功");
      			this.$router.push("/home/index");
      		} else {
      			this.$message(res.message);
      		}
      	});
      },
      check(pid){
        this.dialogTableVisible=true
        var param = {
            "pid":pid
        }
        getAjax(`/api/planmanagementService/outsourUploadMeetCont/findInfo`,param).then(res => {
              if(res.code==0){
                console.info("----"+JSON.stringify(res))
                this.tableDatas=res.data;
              }
        });
      },
    },
    computed: {

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
</style>
