<template>
  <div>
        <Navbar></Navbar>
        <div class="route">
            <router-link to="/home">首页</router-link> &nbsp;&nbsp; &gt;
            <span>选择计划</span>
        </div>
        <div class="tabs">
        <ul>
          <li @click="num=0" :class="{active:num==0}">代办</li>
          <li @click="num=1" :class="{active:num==1}">已办</li>
          <li @click="num=2" :class="{active:num==2}">我创建的</li>
        </ul>
        <div class="tabss">
            <div v-show="num==0">
              <el-table
                :data="tableDataEnd"
                style="width: 90%;margin: auto;"
                >
                <el-table-column
                  prop="date"
                  label="名称"     
                  >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="申请/发起人"
                  >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="申请/发起时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="deal"
                      type="text"
                      size="small">
                      去办理
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="fenye">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3, 4, 5, 6]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalItems">
                </el-pagination>
              </div>
            </div>
            <div v-show="num==1">
                <div style="padding: 0 0 20px 7%;">
                    <span style="width: 60px;height: 30px;line-height: 30px;display: inline-block;text-align: center;border: 1px solid #c3c3c3;">通过{{pass}}</span>
                    <span style="width: 60px;height: 30px;line-height: 30px;display: inline-block;text-align: center;border: 1px solid #c3c3c3;">驳回{{reject}}</span>
                </div>  
              <el-table
                :data="tableDatas"
                style="width: 90%;margin: auto;"
                >
                <el-table-column
                  prop="date"
                  label="名称"     
                  >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="申请/发起人"
                  >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="申请/发起时间">
                </el-table-column>
                <el-table-column
                  prop="addresss"
                  label="办理时间">
                </el-table-column>
                <el-table-column
                  prop="shjg"
                  label="审核结果">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                       @click.native.prevent="deleteRow(scope.$index, tableDatas)"
                      type="text"
                      size="small">
                      删除
                    </el-button>
                    <el-button
                      @click="chakan"
                      type="text"
                      size="small">
                      查看
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-show="num==2">
                <div style="padding: 0 0 20px 7%;">
                    <span style="width: 80px;height: 30px;line-height: 30px;display: inline-block;text-align: center;border: 1px solid #c3c3c3;">待处理{{pending}}</span>
                    <span style="width: 80px;height: 30px;line-height: 30px;display: inline-block;text-align: center;border: 1px solid #c3c3c3;">进行中{{under}}</span>
                    <span style="width: 80px;height: 30px;line-height: 30px;display: inline-block;text-align: center;border: 1px solid #c3c3c3;">通过{{passs}}</span>
                    <span style="width: 80px;height: 30px;line-height: 30px;display: inline-block;text-align: center;border: 1px solid #c3c3c3;">驳回{{rejects}}</span>
                </div>
              <el-table
                :data="tableDatass"
                style="width: 90%;margin: auto;"
                >
                <el-table-column
                  prop="date"
                  label="名称"     
                  >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="申请/发起时间">
                </el-table-column>
                <el-table-column
                  prop="shzt"
                  label="审核状态">
                </el-table-column>
                <el-table-column
                  prop="shjg"
                  label="审核结果">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="操作">
                  <template slot-scope="scope">
                    <p v-if="scope.row.shjg === '通过'">
                        <el-button
                        @click="chakan"
                        type="text"
                        size="small">
                        查看
                      </el-button>
                      <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableDatass)"
                        type="text"
                        size="small">
                        删除
                      </el-button>
                    </p>
                    <p v-if="scope.row.shjg === '驳回'">
                      <el-button
                        @click="chakan"
                        type="text"
                        size="small">
                        查看
                      </el-button>
                      <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableDatass)"
                        type="text"
                        size="small">
                        删除
                      </el-button>
                      <el-button
                        @click="cxtj"
                        type="text"
                        size="small">
                        重新提交
                      </el-button>
                    </p>
                    <p v-if="scope.row.shjg === '暂无'">
                      <el-button
                        @click="chakan"
                        type="text"
                        size="small">
                        查看
                      </el-button>
                      <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableDatass)"
                        type="text"
                        size="small">
                        删除
                      </el-button>
                      <el-button
                        @click="tj"
                        type="text"
                        size="small">
                        提交
                      </el-button>
                    </p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import  Navbar from '@/views/layout/components/Navbar'
export default {
components: {
    Navbar,
  },
  data() {
    return {
        num:0,//tab切换默认
        pass:'4', //已办通过
        reject:'2',//已办驳回
        pending:'3',//我创建的待处理
        under:'5',//我创建的进行中
        passs:'6',//我创建的通过
        rejects:'8',//我创建的驳回
        tableDataEnd:[],//代办表格
        tableDataBegin:[
            {
            date:'我'
            },{
            date:'我'
            }
        ],
        tableDatas:[//已办表格
            {
            date:'是'
            },
        ],
        tableDatass:[//我创建的表格
            {
            date:'神',
            shjg:'暂无'
            },
            {
            date:'神',
            shjg:'通过'
            },
            {
            date:'神',
            shjg:'驳回'
            },
            {
            date:'神',
            shjg:'暂无'
            },
        ]
    }
  },
  created() {
    //页面初始化时让分页的总条数等于数据的总条数
        this.totalItems = this.tableDataBegin.length;
        //如果分页的页数等于当页要展示的条数
        if (this.totalItems > this.pageSize) {
          for (let index = 0; index < this.pageSize; index++) {
            //那么就将这几条push进展示表格中
            this.tableDataEnd.push(this.tableDataBegin[index]);
          }
        } else {
          //否则就展示首页
          this.tableDataEnd = this.tableDataBegin;
        }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(1);
  },
  handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //需要判断是否检索
        if (!this.flag) {
          this.currentChangePage(this.tableDataBegin);
          console.log(this.tableDataEnd);
        } else {
          this.currentChangePage(this.filterTableDataEnd);
          console.log(this.tableDataEnd);
        }
      },//组件自带监控当前页码
 
      //点击下一页
      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
              this.tableDataEnd.push(list[from]);
          }
        }
      },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tabs>ul{
    display: flex;
    background: white;
    margin: 0 20px;
    height: 60px;
    line-height: 60px;
    padding: 0 40px;
  }
.tabs>ul>li{
    width: 80px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
  }
.tabss{
    height: 300px;
    background-color: white;
    margin: 0 20px;
    padding-top: 20px;
  }
.active{
    color: #3e84c3;
    border-bottom: 1px solid #3e84c3;
  }
</style>
