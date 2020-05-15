<template>
  <div>
        <navbar/>
        <div class="route">
            <span><router-link to="/index">首页</router-link></span>&nbsp;&nbsp; &gt;<span>审核</span>
        </div>
        <div class="zxfplan">
            <h3>年度专项安全资金计划</h3>
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
                                <h4>2019年维修中心安全计划单</h4>
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
                                    <el-table-column  label="项目类别" align="center" width="100" prop="category">
                                    </el-table-column>
                                    <el-table-column label="项目名称" width="100" class="zxfsh" align="center" prop="projectName">
                                    </el-table-column>
                                    <el-table-column label="项目预估金额" align="center" prop="projectMoney">
                                    </el-table-column>
                                    <el-table-column prop="startDate" label="开始时间" width="120" align="center">
                                    </el-table-column>
                                    <el-table-column label="结束时间" width="120" align="center" prop="endDate">
                                    </el-table-column>
                                    <el-table-column label="负责人" align="center" prop="chargePerson">
                                    </el-table-column>
                                    <el-table-column label="项目简介" align="center" prop="projectDesc">
                                    </el-table-column>
                                    <el-table-column label="附件" align="center" prop="filePath">
                                    </el-table-column>
                                    <el-table-column
                                        label="操作"
                                        width="150"
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
                            <!-- <template slot-scope="scope">
                                <el-select v-model="scope.row.typevalue" placeholder="请选择">
                                    <el-option
                                    v-for="item in zxfoptionss"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.typevalue">
                                    </el-option>
                                </el-select>
                            </template> -->
                        </el-table-column>
                        <el-table-column property="address" label="计划实施时间" align="center"></el-table-column>
                        <el-table-column property="address" label="计划交付时间" align="center"></el-table-column>
                        <el-table-column property="address" label="主机厂家" align="center"></el-table-column>
                        <el-table-column property="address" label="技术要求" align="center"></el-table-column>
                        <el-table-column property="address" label="备注" align="center"></el-table-column>
                    </el-table>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import  Navbar from '@/views/layout/components/Navbar'//导航
export default {
    name:'Result',
    components:{
        Navbar,
    },
    data() {
      return {
        textarea:'',//审核说明
        activeName: 'first',//标签页切换
        gridData:[//查看商品数据
            {
        
            }
        ],
        // zxfoptionss: [//添加商品的类型
            //     {
            //     id: '1',
            //     typevalue: '物资'
            //     }, 
            //     {
            //     id: '2',
            //     typevalue: '工程'
            //     }, 
            //     {
            //     id: '3',
            //     typevalue: '设备'
            //     }
            // ],
        dialogTableVisible:false,//查看商品
        zxftableData:[ //表格
            {
                category:"类别一",
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
        optionsname: [{
            valuename: '王华',
            label: ''
            }, {
            valuename: '刘翔',
            label: ''
        }]
      };
    },
    mounted() {
        // console.log(this.textarea);
    },
    methods: {
        selectGet(val){
            console.log(val, '44');
        },
        selectGetname(val){
            console.log(val, '66');
        },
        funa(){
            this.$router.push("/index/")
        },
        // 切换
        handleClick(tab, event) {
        // console.log(tab, event);
      },
      zxfsummary(){
          this.$router.push("/summary/")
      }
    },
  computed: {
    
  },
  created(){
        // this.axios({
        //         url:"http://192.168.1.117:8080/plan/list",
        //         method:"get",
        //         // data:param
        //         }).then((ok)=>{
        //             console.log(ok)
        //             this.zxftableData=ok.data.data
        //         })
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
</style>
