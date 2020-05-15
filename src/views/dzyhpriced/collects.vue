<template>
    <div>
        <div class="route">
            <span><router-link to="/index">首页</router-link></span>&nbsp;&nbsp; &gt;<span>审核</span>
        </div>
        <div class="zxfplan">
          <h3>低值易耗月度/零星采购计划汇总</h3>
          <span>维修中心</span>
          <span>王华</span>
          <span>2019-11-12</span>
          <strong>查看流程图</strong>
          <div class="zxfplans">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="计划表" name="first">
                  <div class="zxfschedule">
                    <h4>2020年4月低值易耗月度/零星采购计划</h4>
                  </div>
                  <div class="zxfMerchandise">
                      <div class="ztable">
                          <el-table :data="maintaintableData" style="font-size: 10px">
                            <el-table-column property="goodsClass" label="分类" width="50" align="center"></el-table-column>
                            <el-table-column property="goodsCode" label="编码" width="50" align="center"></el-table-column>
                            <el-table-column property="goodsName" label="商品/服务名称" width="120" align="center"></el-table-column>
                            <el-table-column property="goodsModel" label="规则型号/描述" width="120" align="center"></el-table-column>
                            <el-table-column property="goodsunit" label="单位" width="50" align="center"></el-table-column>
                            <el-table-column property="goodsNumber" label="提报数量" width="50" align="center"></el-table-column>
                            <el-table-column property="purchaseNumber" label="采购数量" width="80" align="center"></el-table-column>
                            <el-table-column property="stockNumber" label="库存数量" width="80" align="center"></el-table-column>
                            <el-table-column property="goodsPrice" label="预估单价" width="100" align="center"></el-table-column>
                            <el-table-column property="goodsTotal" label="预估总价" width="100" align="center"></el-table-column>
                            <el-table-column property="goodsType" label="类型" align="center"></el-table-column>
                            <el-table-column property="startDate" label="计划实施时间" align="center"></el-table-column>
                            <el-table-column property="endDate" label="计划交付时间" align="center"></el-table-column>
                            <el-table-column property="orgName" label="提报单位" align="center" width="60"></el-table-column>
                            <el-table-column property="address" label="是否自购" align="center" width="60"></el-table-column>
                            <el-table-column property="factoryName" label="主机厂家" align="center"></el-table-column>
                            <el-table-column property="technologyDesc" label="技术要求" align="center"></el-table-column>
                            <el-table-column property="remarks" label="备注" align="center"></el-table-column>
                          </el-table>
                        </div>
                      <div class="zxfaggregate">
                          备注:<span>无</span>
                      </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="审核历史" name="third">
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
          </div>
      </div>
      <Results @inputChanged="inputChangedMer($event)" :optionsname="optionsname" @selectGet="selectGet" @selectGetname="selectGetname" :options='options'></Results>
      <div class="zxfbutton">
        <span>取消</span>
        <span @click="zxfsummary()">确定</span>
      </div>
  </div>
</template>
<script>
import  Navbar from '@/views/layout/components/Navbar'
import  Results from '@/views/result/components/results/results'//审核结果
export default{
components:{
    Navbar,
    Results
  },
  data() {
    return {
      activeName:'first',//标签页切换
      maintaintableData:[//计划表
        {
          goodsClass:'',
          goodsCode:'',
          goodsName:'',
          goodsModel:'',
          goodsunit:'',
          goodsNumber:'',
          purchaseNumber:'',
          stockNumber:'',
          goodsPrice:'',
          goodsTotal:'',
          goodsType:'',
          startDate:'',
          endDate:'',
          orgName:'',
          factoryName:'',
          technologyDesc:'',
          remarks:''
        }
      ],
     // 审核历史时间线
      activities: [{
      content: '维修中心 李华',
      timestamp: '2018-04-12 20:46',
      size: 'large',
      //   type: 'primary',
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
      textarea:'',//文本域
      valuename:'',//初始为空
      optionsname: [{// 选择审核人
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
    }
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
        //确认提交按钮
        zxfsummary(){
            console.log(this.valuename)
            console.log(this.value)
            console.log(this.textarea)
            this.valuename=''
            this.value=''
            this.textarea=''
            // this.$router.push("/ConsultsLeaders/")
        },
  },
}
</script>
<style scoped>
.zxfplan{
    width: 90%;
    margin: 10px auto;
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
.zxfplans{
    padding-top: 10px;
}
.zxfplans>p{
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
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
.zxfaggregate{
    margin-top: 20px;
    font-size: 14px;
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
