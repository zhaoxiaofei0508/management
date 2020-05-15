<template>
  <div style="padding:20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>审核</el-breadcrumb-item>
		</el-breadcrumb>
        <div class="zxfplan">
            <h3>{{forName}}</h3>
            <span>{{orgName}}</span>
            <span>{{applyusername}}</span>
            <span>{{applyDate}}</span>
            <strong>查看流程图</strong>
            <div class="zxftable">
                <template>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- 计划表 -->
                        <el-tab-pane label="计划单" name="first">
                            <div class="zxfschedule">
                                <h4>{{formName}}</h4>
                            </div>
                            <div class="ztable">
                                <p>计划信息</p>
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
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="check(scope.row.id)">查看商品</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <p style="font-size: 14px;padding: 20px;line-height: 25px;"><span>外委说明:</span>委托本单位以外的单位完成某项工作的意思。比如本单位是房屋建筑企业，但是本单位没有预应力施工能力，所以预应力结构部分施工就需要外委某某科技公司来做，这就是“因特殊情况需外委施工的...”典型情况</p>
                            <div style="display: flex;justify-content: space-around;">
                                <p>附件:技术规范书:<img src="https://axure-file.lanhuhu.com/21a8b113-c334-4252-80ac-7514e60de361__205d41261be2727693b042a6dcd9165e.svg" style="height: 35px;vertical-align: middle;"><el-button type="text" @click="dialogVisible=true">预览</el-button>
                                </p>
                                <p>检测表:<img src="https://axure-file.lanhuhu.com/21a8b113-c334-4252-80ac-7514e60de361__205d41261be2727693b042a6dcd9165e.svg" style="height: 35px;vertical-align: middle;"><el-button type="text" @click="creatinine=true">预览</el-button>
                                </p>
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
                <el-dialog width="98%" title="项目文件" :visible.sync="dialogTableVisible" >
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
        <div style="margin-top: 12%;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="审核结果" prop="result">
                    <el-select @change="getResult" v-model="ruleForm.result" style="width:400px;" placeholder="请选择审核结果">
                        <el-option v-for="m in resultArr" :key="m.label" :label="m.label" :value="m.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核说明" prop="suggest">
                    <el-input v-model="ruleForm.suggest" type="textarea" style="width:400px;" placeholder="请输入审核说明"></el-input>
                </el-form-item>
                <el-form-item v-if="ruleForm.result=='同意'&&peopleArr.length !== 0 " label="选择审核人" prop="people">
                    <el-select v-model="ruleForm.people" style="width:400px;" placeholder="请选择选择审核人">
                        <el-option v-for="m in peopleArr" :key="m.id" :label="m.name" :value="m.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="cancel()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 技术规范书弹框 -->
        <el-dialog
            title="技术规范书"
            :visible.sync="dialogVisible"
            width="80%"
            >

        </el-dialog>
        <!-- 检测表弹框 -->
        <el-dialog
            title="检测表"
            :visible.sync="creatinine"
            width="80%"
            >

        </el-dialog>
    </div>
</template>
<script>
import  Navbar from '@/views/layout/components/Navbar'//导航
import { getAjax, postAjax, postAjaxJson,postAjaxx } from '@/utils/ajaxRequest'
import { parseTime } from '@/utils'
export default {
    name:'Result',
    components:{
        Navbar,
    },
    data() {
      return {
        formName:'',
        applyDate: "",
        applyusername: "",
        orgName: "",
        forName:'',
        textarea:'',//审核说明
        activeName: 'first',//标签页切换
        TabBar:'last',//项目文件切换
        dialogVisible:false,//技术规范书预览弹框
        creatinine:false,//检测表预览弹框
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
        zxftableData:[ //外委计划单表格
            {
                projectNumber:'',
                projectType:'',
                projectName:'',
                projectMoney:'',
                startDate:'',
                endDate:'',
                chargePerson:'',
                projectDesc:'',
                filePath:'',
            },
        ],
        // 计划单表格查看商品弹框
        tableDatas:[
            {
              goodsClass:'',
              goodsCode:'',
              goodsName:'',
              goodsModel:'',
              goodsunit:'',
              goodsNumber:'',
              goodsPrice:'',
              goodsTotal:'',
              goodsType:'',
              startDate:'',
              endDate:'',
              factoryName:'',
              technologyDesc:'',
              remarks:'',
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
        ruleForm: {
            people: "",
            suggest: "",
            result: "",
        },
        peopleArr: [],
        taskName:'',
        resultArr: [{
                label: "同意",
                value: "同意"
            }, {
                label: "不同意",
                value: "不同意"
		}],
    applyId:''
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
          this.applyId = this.$route.query.businessKey;
          this.findData(this.applyId,"");
      },
    methods: {
      findData(apId,formId){
        var param = {
            "applyId":apId,
            "formId":formId
        }
        getAjax(`/api/planmanagementService/outsourUploadMeetCont/findOutInfo`,param).then(res => {
            console.log("-----"+JSON.stringify(res));
            var resData = res.data;
            if(resData.code==0){
              this.zxftableData=resData.data;
            }
        });
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
        // 计划单切换
        handleClick(tab, event) {
        // console.log(tab, event);
        },
        XmwjClick(tab, event){
            console.log(tab, event);
        },
      //查看附件事件
        check(pid){
          this.dialogTableVisible=true
          var param = {
              "pid":pid
          }
          getAjax(`/api/planmanagementService/outsourUploadMeetCont/findInfo`,param).then(res => {
                      console.log("-----"+JSON.stringify(res));
                      if(res.code==0){
                        this.tableDatas=res.data;
                      }
          });
        },
        getResult(){
            let parme={
                "manger":"yes",
            }
            postAjaxJson(`/api/processService/userTask/getNextExaminePersonByVars/${this.$route.query.taskId}`,parme).then(res => {
                console.log("-----"+JSON.stringify(res));
                if(res.code == 0) {
                    // this.peopleArr = res.data;
                    _.forEach(res.data,value=>{
                        if(value.name.includes(this.ruleForm.result) && value.name!='不同意'){
                          console.info("****"+this.ruleForm.result)
                          this.peopleArr=value.nextActiveUsers;
                          this.taskName=value.nextActiveName;
                           console.info(JSON.stringify(this.peopleArr)+"****"+this.taskName)
                        }
                    });
                }
            });
        },
        //确认提交按钮
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    var param={
                        "applyId": this.$route.query.businessKey,
                        "deploymentKey": "wwjhlc",
                        "formId": "",
                        "fromKey": "",
                        "manger": "",
                        "message": this.ruleForm.suggest,
                        "needCompanyExamine": "",
                        "needTechnologyExamine": "",
                        "result": this.ruleForm.result,
                        "taskId":this.$route.query.taskId,
                        "taskName": "",
                        "userid": this.ruleForm.people,
                    }
                    postAjaxx("/api/planmanagementService/FlowApproval/flowApprovalCurrencyStep",JSON.stringify(param)).then(res => {
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
        }
    },
computed: {
    columnTotal() {
        // tableData - 表格数据
        // calcCol - 要计算的那一列
        // map函数 - 将表格的二维数据转换为一维的数组
        return zxftableData.map(row => row.projectMoney).reduce((acc, cur) => (cur + acc), 0)
    }
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
</style>
