<template>
  <div class="container_table">
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <div class="tontainer_table_body">
        <div class="table_top">
          <el-input
            placeholder="请输入搜索内容"
            v-model="searchAM"
            clearable
            
          >
          </el-input>
          <span>选择部门</span>
          <el-select v-model="postsaleState" filterable placeholder="全部">
            <el-option
              v-for="item in deducTionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span>采购状态</span>
          <el-select v-model="Purchasing" filterable placeholder="全部">
            <el-option
              v-for="item in Purchasingstatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span>时间选择</span>
            <el-date-picker
                v-model="chooseTime"
                type="date"
                placeholder="选择日期"         
                >
            </el-date-picker>
        </div>
        <el-table 
            :data="am_tableData" 
            border 
            style="width: 100%"
            >
          <el-table-column
            prop="postsaleName"
            label="计划名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createUser"
            align="center"
            label="申请人"
          ></el-table-column>
          <el-table-column
            prop="createDate"
            align="center"
            label="提交时间"
          ></el-table-column>
          <el-table-column
            prop="createDate"
            align="center"
            label="提报部门"
          ></el-table-column>
          <el-table-column
            prop="State"
            align="center"
            label="采购状态"
          ></el-table-column>
          <el-table-column
            class="operation"
            width="200px"
            align="center"
            prop="operation"
            label="操作"
          >
            <template slot-scope="scope">
                <p v-if="scope.row.State === '已下发'">
                    <el-button
                    @click="afterListVisi(scope.row)"
                    type="text"
                    size="small">
                    查看
                    </el-button>
                </p>
                <p v-if="scope.row.State === '未下发'">
                    <el-button
                        @click="afterListVisi(scope.row)"
                        type="text"
                        size="small">
                        查看
                    </el-button>
                    <el-button
                        @click="procurement(scope.row)"
                        type="text"
                        size="small">
                        下发采购
                    </el-button>
                </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 年度专项资金计划状态已完成查看弹框 -->
    <el-dialog
      title="详情"
      :visible.sync="afterListVisible"
      width="80%"
      :before-close="handleClose">
        <div class="jihua">
            <span>计划名称:{{tankang[0].postsaleName}}</span>
            <span>申请部门:{{tankang[0].department}}</span>
            <span>申请人:{{tankang[0].createUser}}</span>
            <span>申请时间:{{tankang[0].createDate}}</span>
        </div>
        <span style="display: inline-block;
      margin: 10px 0;">商品信息</span>
      <el-table
        border
        :data="afterDetailsTableData"
        style="width: 100%">
        <el-table-column
          prop="index"
          align="center"
          label="项目类别">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="项目名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="项目预估金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="开始时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="结束时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="负责人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="项目简介">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="附件">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <span style="color: blue; cursor: pointer;" @click="afterList(scope.row)">查看商品</span>
          </template>
        </el-table-column>
      </el-table>
      <p style="margin-bottom: 20px;">计划总金额:<span>24,845,494</span></p>
      <div class="shijianxian" style="padding: 20px 0;border-top: 20px solid #c1c1c1;position: relative;">
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
              <span>发起审核申请</span>
              <p>同意<span>审核意见：所有的进度都按计划进行</span></p>
              <p>同意<span>审核意见：所有的进度都按计划进行</span></p>
              <p>等待审核</p>
              
          </div>
      </div>
      <!-- 状态已完成点击查看类别里面的查看商品明细弹框 -->
      <el-dialog
          title="商品明细"
          :visible.sync="afterListcksp"
          width="97%"
          :before-close="handleClose"
          append-to-body>
          <el-table
            :data="afterListDetails"
            ref="table"
            tooltip-effect="dark"
            border
            stripe
            @selection-change='selectRow'>
            <el-table-column prop="name" label="分类" width="50">
            </el-table-column>
            <el-table-column label="编码" width="50" prop="bian">
            </el-table-column>
            <el-table-column label="商品/服务名称" width="120">
            </el-table-column>
            <el-table-column label="规则型号/描述" width="120">
            </el-table-column>
            <el-table-column label="单位">
            </el-table-column>
            <el-table-column label="数量">
            </el-table-column>
            <el-table-column label="预估单价">
            </el-table-column>
            <el-table-column label="预估总价">
            </el-table-column>
            <el-table-column label="类型">
            </el-table-column>
            <el-table-column label="计划实施时间" width="120">
            </el-table-column>
            <el-table-column label="计划交付时间" width="120">
            </el-table-column>
            <el-table-column label="主机厂家">
            </el-table-column>
            <el-table-column label="技术要求">
            </el-table-column>
            <el-table-column label="备注">
            </el-table-column>
        </el-table>
      </el-dialog>
    </el-dialog>
    <el-dialog
      title="下发采购"
      :visible.sync="procurements"
      width="50%"
      >
      <div style="padding-left: 25%;">
            <span>实施部门</span>
            <el-select v-model="purchase" clearable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.purchase"
                >
                </el-option>
            </el-select>
        </div>
        <el-row style="text-align: center;height: 45px;line-height: 45px;background-color: #f7f7f7;margin-top: 5%;">
            <el-button @click="procurements=false">取消</el-button>
            <el-button type="primary" @click="GoodsForme">确定</el-button>
        </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
        tankang:[//弹框已完成状态
            {
                postsaleName:'我',
                department:'我',
                createUser:'我',
                createDate:'我'
            }
        ],
        // 时间线
        activities: [{
        content: '维修中心成员 李华',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        icon: 'el-icon-more'
        }, {
        content: '维修中心主任 赵莉莉 ',
        timestamp: '2018-04-03 20:46',
        
        }, {
        content: '维修中心主任 赵莉莉',
        timestamp: '2018-04-03 20:46',
        color: '',
        size: 'large'
        }, {
        content: ' 王华华',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87',
        size: 'large'
        }
        ],
        //选择部门下拉框
      deducTionOptions: [
        {
          value: '1',
          label: '搬家中心'
        }, {
          value: '2',
          label: '维修中心'
        }, {
          value: '3',
          label: '环保中心'
      }],
      //采购状态下拉框
      Purchasingstatus: [
        {
          value: '1',
          label: '未下发'
        }, {
          value: '2',
          label: '已下发'
        }],
      // 选择部门
      postsaleState: '',
      // 采购状态
      Purchasing:'',
      // 分页组件-默认显示第一页数据
      currentPage4: 1,
      // 当前页签显示条数
      pageSize: 10,
        // 当前表格中有total条数据
      total: 0,
      // 请输入搜索内容关键字
      searchAM: "",
      // 选择的时间搜索
      chooseTime: '',
      procurements:false,//下发采购弹框
      am_tableData: [// 年度计划表格
        {
          State: '未下发'
        },
        {
          State: '已下发'
        }
      ],
      //状态已完成查看商品
      afterListcksp:false,
      //状态已完成查看商品明细表格
      afterListDetails:[
        {
          name:''
        }
      ],

      // 状态已完成,点击查看按钮,显示弹窗
      afterListVisible: false,
      // 点击查看里的表格
      afterDetailsTableData: [{
        index: 1
      }],
      // 下发采购弹框里的实施部门下拉选择
    options:[
        {
            purchase:'计划经济部'
        },
        {
            purchase:'神煤科技服务事业部'
        }
    ],
    purchase:'计划经济部'

    };
  },
  created() {
    
  },
  methods: {
    // 点击查看商品弹框
    afterList(row){
      this.afterListcksp=true
    },
    // 采购状态已下发
    afterListVisi(row){
      this.afterListVisible=true
    },
    procurement(row){
        this.procurements=true
    },
    //下发采购确认按钮提交
    GoodsForme(){
        this.procurements=false
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container_table {
  height: 100%;
  .el-card__header {
    .clearfix {
      line-height: 30px;
      span {
        font-size: 20px;
      }
      .el-icon-more {
        font-size: 26px;
        color: #000;
      }
    }
  }
  .tontainer_table_body {
    margin: 15px 10px 15px 0;
    .table_top {
      margin-bottom: 10px;
      .el-input {
        width: 17%;
      }
      span {
       margin: 0 5px 0 10px;
        font-size: 14px;
      }
    }
    .el-table {
      a,
      a:focus,
      a:hover {
        color: #5584ff;
      }
    }
  }
  .el-pagination {
    margin-top: 30px;
    float: right;
    padding-right: 15px;
  }
}
.jjk {
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 18px;
  padding-left: 20px;
  background-color: #ccc;
}
.afterBaseContent {
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 16px;
  padding-left: 15px;
}
h3 {
  text-align: center;
}
.afterElRow {
  margin: 0 15px;
  .el-col {
    margin-top: 15px;
  }
  .el-image {
    margin-right: 15px;
  }
}
.jihua>span{
    display: inline-block;
    margin: 22px 40px;
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
    margin: 14% 0;    
}
.zxftime>p>span{
  display: inline-block;
  margin-left: 25%;
}
.el-timeline-item{
  padding-bottom: 6%;
}
</style>
