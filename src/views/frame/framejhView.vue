<template>
  <div style="padding:20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>审核</el-breadcrumb-item>
		</el-breadcrumb>
    <div class="zxfplan">
        <h3>框架协议计划</h3>
        <span>维修中心</span>
        <span>王华</span>
        <span>2019-11-12</span>
        <strong>查看流程图</strong>
        <div class="zxftable">
            <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <!-- 计划表 -->
                    <el-tab-pane label="计划表" name="first">
                        <div class="zxfschedule">
                            <h4>框架协议计划单</h4>
                        </div>
                        <div class="ztable">
                            <el-table 
                                :data="tableDataEnd"
                                ref="table"
                                tooltip-effect="dark"
                                border
                                stripe
                                style="width: 100%"  
                                :header-cell-style="{fontSize:'12px'}">
                                <el-table-column label="分类" width="80" align="center" prop='goodsClass'>

                                </el-table-column>
                                <el-table-column  label="编码" align="center" width="80" prop='goodsCode'>

                                </el-table-column>
                                <el-table-column label="商品/服务名称" width="110" class="zxfsh" prop='goodsName'>

                                </el-table-column>
                                <el-table-column label="规则型号/描述" width="110" prop='goodsModel'>

                                </el-table-column>
                                <el-table-column prop="goodsunit" label="单位" width="50">

                                </el-table-column>
                                <el-table-column label="数量" width="50" prop='goodsNumber'>

                                </el-table-column>
                                <el-table-column label="预估单价" prop='goodsPrice'>

                                </el-table-column>
                                <el-table-column label="预估总价" prop='goodsTotal'>

                                </el-table-column>
                                <el-table-column label="类型" prop='goodsType'>
                                
                                </el-table-column>
                                <el-table-column label="计划实施时间" width="110" prop='startDate'>
                                </el-table-column>
                                <el-table-column label="计划交付时间" width="110" prop='endDate'>
                                </el-table-column>
                                <el-table-column label="主机厂家" prop='factoryName'>
                                </el-table-column>
                                <el-table-column label="技术要求" prop='technologyDesc'>
                                </el-table-column>
                                <el-table-column label="备注" width="60" prop='remarks'>
                                </el-table-column>
                            </el-table>
                            <div class="fenye">
                                <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="planList" />
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
        <div style="margin-top:2%">
            <el-button @click="cancel()">取消</el-button>
        </div>
       
    </div>
  </div>
</template>
<script>
import  Navbar from '@/views/layout/components/Navbar'
import  Results from '@/views/result/components/results/results'
import Pagination from '@/components/Pagination'
import { getAjax, postAjax, postAjaxJson,postAjaxx } from '@/utils/ajaxRequest'
export default{
    components:{
        Navbar,
        Results,
        Pagination
    },
    data() {
        return {
            tableDataEnd: [],
            listQuery: {
                page: 1,
                limit: 10,
            },
            currentPage: 1,//当前页
            pageSize: 4,//显示条数
            total: 0,//总数
            activeName: 'first',//标签页切换
            tableDataBegin:[//计划表格
                {
                    
                }
            ],
            typevalue:'',//类型
            optionss:[
                {
                    // typevalue:''
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
       
        textarea:'',//审核结果文本域
        valuename:'',//初始为空
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
        }
    },
    created() {
        this.getListCreate()
    },
    methods: {
        getListCreate(){
            var param = {
            pageNumber: this.listQuery.page - 1,
            pageSize: this.listQuery.limit,
            applyId:this.$route.query.id
        }
         
        console.log(param)
        getAjax(`/api/planmanagementService/goods/selectPlanList/{applyId}` ,param).then(res =>  {
                console.log(res)
                if(res.code == 0) {
                    res.data.planImplementGoodsList.content.forEach((val, key) => {
                        val.key = (this.listQuery.page - 1) * this.listQuery.limit + key + 1
                    });
                    this.tableDataEnd = res.data.planImplementGoodsList.content;
                    this.total = res.data.planImplementGoodsList.totalElements;
                }
            });
        },
        cancel(){
            this.$router.push({
                path:'/home/index'
            })
        },
        // 文本域
        inputChangedMer: function (e) {
            this.textarea = e.target.value
            
        }, 
    }
}
</script>
<style  scoped>
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
