<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>审核</el-breadcrumb-item>
		</el-breadcrumb>
        <div class="zxfplan">
            <h3>月度生产物资汇总计划</h3>
            <span>维修中心</span>
            <span>王华</span>
            <span>2019-11-12</span>
            <strong>查看流程图</strong>
            <div class="zxftable">
                <template>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- 计划表 -->
                        <el-tab-pane label="计划单" name="first">
                            <div class="zxfschedule">
                                <h4>月度生产物资计划</h4>
                            </div>
                            <div class="ztable">
                                <el-table
                                    :data="zxftableData"
                                    ref="table"
                                    slot="empty"
                                    border
                                    stripe
                                    style="width: 95%"
                                    >
                                    <el-table-column  label="项目编码" align="center" width="100" prop="proiectNo">
                                    </el-table-column>
                                    <el-table-column label="项目类别" width="100" class="zxfsh" align="center" prop="projectName">
                                    </el-table-column>
                                    <el-table-column label="项目名称" align="center" prop="projectMoney">
                                    </el-table-column>
                                    <el-table-column prop="startDate" label="项目预估金额" width="120" align="center">
                                    </el-table-column>
                                    <el-table-column label="开始时间" width="100" align="center" prop="endDate">
                                    </el-table-column>
                                    <el-table-column label="结束时间" align="center" prop="chargePerson">
                                    </el-table-column>
                                    <el-table-column label="负责人" align="center" prop="projectDesc">
                                    </el-table-column>
                                    <el-table-column label="项目简介" align="center" prop="filePath">
                                    </el-table-column>
                                    <el-table-column label="附件" align="center" prop="filePath">
                                    </el-table-column>
                                    <el-table-column label="提报部门" align="center" prop="filePath">
                                    </el-table-column>
                                    <el-table-column
                                        label="操作"
                                        width="120"
                                        align='center'>
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="dialogTableVisible = true">查看商品</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div style="margin-top: 20px;">
                                计划总金额:<span>3454333</span>
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
                    <el-table :data="gridData">
                        <el-table-column property="date" label="分类" width="50" align="center"></el-table-column>
                        <el-table-column property="name" label="编码" width="50" align="center"></el-table-column>
                        <el-table-column property="name" label="商品/服务名称" width="120" align="center"></el-table-column>
                        <el-table-column property="address" label="规则型号/描述" width="120" align="center"></el-table-column>
                        <el-table-column property="address" label="单位" width="50" align="center"></el-table-column>
                        <el-table-column property="address" label="数量" width="50" align="center"></el-table-column>
                        <el-table-column property="address" label="预估单价" width="100" align="center"></el-table-column>
                        <el-table-column property="address" label="预估总价" width="100" align="center"></el-table-column>
                        <el-table-column property="address" label="类型" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.typevalue" placeholder="请选择">
                                    <el-option
                                    v-for="item in zxfoptionss"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.typevalue">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column property="address" label="计划实施时间" align="center"></el-table-column>
                        <el-table-column property="address" label="计划交付时间" align="center"></el-table-column>
                        <el-table-column property="address" label="主机厂家" align="center"></el-table-column>
                        <el-table-column property="address" label="技术要求" align="center"></el-table-column>
                        <el-table-column property="address" label="备注" align="center"></el-table-column>
                    </el-table>
                </el-dialog>
            </div>
<el-card class="box-card" shadow="never" style="margin-top:20px;">
           	<div slot="header" class="clearfix">
           		<div style="font-size:18px;line-height:40px;">审核结果</div>
           	</div>
           	<div class="text item">
           		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           			<el-form-item label="审核结果" prop="result">
           				<el-select v-model="ruleForm.result" style="width:400px;" placeholder="请选择审核结果">
           					<el-option v-for="m in resultArr" :key="m.label" :label="m.label" :value="m.value"></el-option>
           				</el-select>
           			</el-form-item>
           			<el-form-item label="审核说明" prop="suggest">
           				<el-input v-model="ruleForm.suggest" type="textarea" style="width:400px;" placeholder="请输入审核说明"></el-input>
           			</el-form-item>
           			<el-form-item v-if="ruleForm.result=='同意'&&peopleArr.length!=0&&isEnd!='结束'" label="选择审核人" prop="people">
           				<el-select v-model="ruleForm.people" style="width:400px;" placeholder="请选择选择审核人">
           					<el-option v-for="m in nextPer" :key="m.id" :label="m.name" :value="m.id"></el-option>
           				</el-select>
           			</el-form-item>
           			<el-form-item>
           				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
           				<el-button @click="cancel()">取消</el-button>
           			</el-form-item>
           		</el-form>
           	</div>
           </el-card>
        </div>
    </div>
</template>
<script>
  import { getAjax, postAjax, postAjaxJson } from '@/utils/ajaxRequest'
import  Navbar from '@/views/layout/components/Navbar'//导航
export default {
    name:'Result',
    components:{
        Navbar
        // Results
    },
    data() {
      return {
        textarea:'',//审核说明
        activeName: 'first',//标签页切换
        gridData:[{//查看商品数据

        }],
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
        resultArr: [{
        	label: "同意",
        	value: "同意"
        }, {
        	label: "不同意",
        	value: "不同意"
        }],
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
        optionsname: [{
            valuename: '王华',
            label: ''
            }, {
            valuename: '刘翔',
            label: ''
        }],
        // 审核结果
        value:'',
        options:[{
                value: '同意',
                label: ''
              }, {
                value: '不同意',
                label: ''
        }],
        ruleForm: {
        	people: "",
        	suggest: "",
        	result: ""
        },
        	isEnd: '',
          peopleArr:[],
          nextPer:[]
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
        // 切换
        handleClick(tab, event) {
        // console.log(tab, event);
      },
      zxfsummary(){
        console.log(this.valuename)
        console.log(this.value)
        console.log(this.textarea)
        this.$router.push("/summary/")
      }
    },
  computed: {

  },
  created(){
    var paramVars = {
          "manger":"yes"
      }
    postAjaxJson(`/api/processService/userTask/getNextExaminePersonByVars/` + this.$route.query.taskId,paramVars).then(res => {
    	if(res.code == 0) {
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
        // this.axios({
        //         url:"http://192.168.1.117:8080/plan/list",
        //         method:"get",
        //         // data:param
        //         }).then((ok)=>{
        //             console.log(ok)
        //             this.zxftableData=ok.data.data
        //         })
    },
    methods:{
      submitForm(formName) {
      	this.$refs[formName].validate((valid) => {
      		if(valid) {
      			var param = {
      				"applyId": this.$route.query.businessKey,
      				"deploymentKey": "ydscwzhzjh",
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
            console.info(JSON.stringify(param))
      			postAjaxJson("/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep", param).then(res => {
      				if(res.code == 0) {
      					this.$message("成功");
      					this.$router.push("/home/index");
      				} else {
      					this.$message(res.message);
      				}
      			});
      		} else {
      			console.log('error submit!!');
      			return false;
      		}
      	});
      },
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
