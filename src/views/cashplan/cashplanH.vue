<template>
  <div>
    <navbar/>
        <div class="route">
            <span><router-link to="/index">首页</router-link></span>&nbsp;&nbsp; &gt;<span>汇总计划</span>
        </div>
        <div class="content">
            <div style="padding:0 15%;">
                <el-steps :active="active" finish-status="finish" align-center>
                    <el-step title="选择计划"></el-step>
                    <el-step title="计划汇总单"></el-step>
                    <el-step title="预览"></el-step>
                </el-steps>
            </div>
            <div>
                <div class="ztable">
                    <el-tabs v-model="active" style="">
                        <el-tab-pane name="0">
                            <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                                v-model="input1" style="width:20%; padding:10px 0">
                            </el-input>
                            <div>    
                                <el-table
                                    :data="tableDatas"
                                    ref="tableDatas"
                                    tooltip-effect="dark"
                                    border
                                    stripe
                                    style="width: 90%"  
                                    
                                    >
                                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                                    <el-table-column prop="name" label="计划名称" >
                                    </el-table-column>
                                    <el-table-column label="提报人">
                                    </el-table-column>
                                    <el-table-column label="提报部门">
                                    </el-table-column>
                                    <el-table-column label="提报时间">
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="zxfcommodity=true">查看</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table> 
                            </div> 
                            <div class="bottom">
                                <el-button style="margin-top: 12px;width: 13%;" @click="states">取消</el-button>
                                <el-button style="margin-top: 12px;width: 13%;background-color: rgb(183, 65, 65);color: white;" @click="next">下一步</el-button>  
                            </div>        
                        </el-tab-pane>
                        <el-tab-pane name="1">
                            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-ruleForm" style="margin-top:20px;">
                            <el-form-item
                                prop="email"
                                label="汇总单名称"
                                :rules="[
                                { required: true, message: '请输入汇总单名称', trigger: 'blur' },
                                ]"
                                        >
                                <el-input v-model="dynamicValidateForm.usename" style="width:30%"></el-input>
                            </el-form-item>
                            </el-form>
                            <p style="height: 35px;line-height: 35px;padding: 0 16px;">项目信息</p>
                            <div>
                                <el-tabs v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane 
                                    v-for="(item, index) in editableTabs"
                                    :key="item.name"
                                    :label="item.title"
                                    :name="item.name"
                                    >    
                                        <el-table
                                            :data="tableDatas"
                                            ref="tableDatas"
                                            tooltip-effect="dark"
                                            border
                                            stripe
                                            style="width: 95%"  
                                            
                                            >
                                            <el-table-column type="selection" width="45" align="center"></el-table-column>
                                            <el-table-column prop="name" label="项目类别" width="100">
                                            </el-table-column>
                                            <el-table-column label="项目名称" width="100">
                                            </el-table-column>
                                            <el-table-column label="项目预估金额">
                                            </el-table-column>
                                            <el-table-column label="开始时间">
                                            </el-table-column>
                                            <el-table-column label="结束时间">
                                            </el-table-column>
                                            <el-table-column label="负责人">
                                            </el-table-column>
                                            <el-table-column label="项目简介">
                                            </el-table-column>
                                            <el-table-column label="附件">
                                            </el-table-column>
                                            <el-table-column label="操作">
                                                <template slot-scope="scope">
                                                    <el-button type="text" size="small" @click="zxfbjsp=true">编辑商品</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table> 
                                        <p style="margin-top: 12px">年度科研计划总金额:<span>24,845,494</span></p>
                                    </el-tab-pane>
                                </el-tabs>
                            </div> 
                            <div class="bottom">
                                <el-button style="margin-top: 12px;width: 13%;" @click="last">上一步</el-button>
                                <el-button style="margin-top: 12px;width: 13%;background-color: rgb(183, 65, 65);color: white;" @click="nexts">下一步</el-button>  
                            </div>        
                        </el-tab-pane>
                        <el-tab-pane name="2">
                            <div class="content">
                                <h3>2020年度专项资金计划</h3>
                                <div class="essential_top">
                                    <p>基本信息</p>
                                    <ul>
                                        <li>申请人:<span class="usname">{{userane}}</span><i class="iconfont icon-user-3"></i></li>
                                        <li>申请部门:<span class="usname">维修中心</span><i class="iconfont icon-bumen"></i></li>
                                        <li>资金类别:<span>年度计划</span></li>
                                        <li>申请时间:<span>2019-11-12</span></li>
                                    </ul>
                                </div>
                                <div class="essential_top">
                                    <p>项目信息</p>
                                    <el-tabs v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane 
                                    v-for="(item, index) in editableTabs"
                                    :key="item.name"
                                    :label="item.title"
                                    :name="item.name"
                                    >    
                                        <el-table
                                            :data="tableDatas"
                                            ref="tableDatas"
                                            tooltip-effect="dark"
                                            border
                                            stripe
                                            style="width: 95%"  
                                            
                                            >
                                            <el-table-column type="selection" width="45" align="center"></el-table-column>
                                            <el-table-column prop="name" label="项目类别" width="100">
                                            </el-table-column>
                                            <el-table-column label="项目名称" width="100">
                                            </el-table-column>
                                            <el-table-column label="项目预估金额">
                                            </el-table-column>
                                            <el-table-column label="开始时间">
                                            </el-table-column>
                                            <el-table-column label="结束时间">
                                            </el-table-column>
                                            <el-table-column label="负责人">
                                            </el-table-column>
                                            <el-table-column label="项目简介">
                                            </el-table-column>
                                            <el-table-column label="附件">
                                            </el-table-column>
                                            <el-table-column label="操作">
                                                <template slot-scope="scope">
                                                    <el-button type="text" size="small" @click="zxfcksptk=true">查看商品</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table> 
                                    </el-tab-pane>
                                </el-tabs>
                                </div>
                            </div>
                            <div class="bottom">
                                <el-button style="margin-top: 12px;width: 13%;" @click="yulan">上一步</el-button>
                                <el-button style="margin-top: 12px;width: 13%;" >存入草稿</el-button>
                                <el-button style="margin-top: 12px;width: 13%;background-color: rgb(183, 65, 65);color: white;" >提交审核</el-button>  
                            </div>        
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <!-- 流程图遮罩层 -->
        <div class="mask" v-if="showModal" @click="showModal=false"></div>
        <!-- 流程图遮罩内容 -->
        <div class="pop" v-if="showModal">
            <img src="../../../static/img/tu.jpg">
        </div>
         <!-- 选择计划查看内容外层弹框 -->
         <el-dialog 
            title="查看" 
            :visible.sync="zxfcommodity"
            width="95%"
            >
          <!-- 选择计划查看遮罩内容查看商品里层弹框 -->
            <el-dialog 
            title="商品明细" 
            :visible.sync="dialogTableVisible" 
            width="95%" 
            append-to-body>
            <Table :tableDatas="sptable" style="width:100%"></Table>
            </el-dialog>
            <div class="ztable">
                <el-table
                    :data="tableDatass"
                    ref="table"
                    tooltip-effect="dark"
                    border
                    stripe
                    style="width: 95%"  
                   >
                    <el-table-column label="项目类别" align="center">
                    </el-table-column>
                    <el-table-column  label="项目名称" align="center">
                    </el-table-column>
                    <el-table-column label="项目预估金额" class="zxfsh">
                    </el-table-column>
                    <el-table-column label="开始时间">
                    </el-table-column>
                    <el-table-column prop="name" label="结束时间">
                    </el-table-column>
                    <el-table-column label="负责人">
                    </el-table-column>
                    <el-table-column label="项目简介">
                    </el-table-column>
                    <el-table-column label="附件">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="dialogTableVisible = true">查看商品</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!-- 计划汇总单编辑商品弹框 -->
        <el-dialog 
            title="商品明细" 
            :visible.sync="zxfbjsp"
            width="100%"
            >
            <div class="operating" style="padding:0 30px;">
                <el-button size="small" type="primary" plain @click.prevent="addRow()">增加行</el-button>
                <el-button size="small" type="primary" plain>复制行</el-button>
                <el-button size="small" type="primary" plain @click.prevent="delData()">删除行</el-button>
                <el-button size="small" type="primary" plain>导入数据</el-button>
                <el-button size="small" type="primary" plain>全部删除</el-button>
                <el-input v-model="zxfsearch" style="display: inline-block;width: 30%;borderRight:none;margin-left: 33%;" 
                placeholder="请输入搜索内容" prefix-icon="el-icon-search">
                </el-input>
            </div>
            <div class="ztable" style="margin-top: 2%;">
                <el-table 
                    :data="tableDatasss"
                    ref="table"
                    tooltip-effect="dark"
                    border
                    stripe
                    style="width: 100%"
                    @selection-change='selectRows'  
                   >
                    <el-table-column type="selection" width="45" align="center"></el-table-column>
                    <el-table-column label="分类" width="80" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.coding" class='inputss'></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column  label="编码" align="center" width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.encoding" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="商品/服务名称" width="120" class="zxfsh">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.goodsName" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="规则型号/描述" width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.describe" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column prop="name" label="单位" width="60">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.monad" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="数量" width="60">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.quantity" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="预估单价">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.estimate" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="预估总价">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.prices" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="类型" width="100">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.typevalue">
                            <el-option
                            v-for="item in optionss"
                                :key="item.value"
                                :label="item.label"
                                :value="item.typevalue">
                            </el-option>
                        </el-select>
                    </template>
                    </el-table-column>
                    <el-table-column label="计划实施时间" width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.implementation" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="计划交付时间" width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.delivery" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="主机厂家">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.manufacturers" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="技术要求">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.requirements" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="备注">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="preserve ">
                <el-button plain @click="zxfbjsp=false">取消</el-button>
                <el-button type="primary" plain @click="save()">确定</el-button>
            </div>
       </el-dialog>
       <!-- 计划预览查看商品弹框 -->
       <el-dialog 
            title="商品明细" 
            :visible.sync="zxfcksptk"
            width="95%"
            >
            <el-table
                :data="zxfcksp"
                ref="zxfcksp"
                tooltip-effect="dark"
                border
                stripe
                >
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
  </div>
</template>

<script>
import  Navbar from '@/views/layout/components/Navbar'
import  Table from '@/views/summary/components/table'
export default{
    components:{
        Navbar,
        Table
    },
    data() {
        return {
            input1:'',//选择计划搜索框
            active:"0",//步骤条
            dynamicValidateForm: {
                usename:'',//汇总单名称
            },
            showModal: false,//流程图
            activeName: '1',//标签切换页
            zxfcommodity: false,//选择计划查看弹框
            dialogTableVisible:false,//查看商品
            zxfbjsp:false,//计划汇总编辑商品弹框
            zxfcksptk:false,//预览查看商品弹框
            tableDatas:[//计划名称表格
                {
                    id:1,
                    name:''
                },
                
            ],
            tableDatass:[//查看表格
                {
                    id:1,
                    // usname:'',
                }
            ],
            sptable:[//查看商品表格
                {
                    name:''
                }
            ],
            optionss:[//计划汇总单编辑商品选择下拉
                {
                    typevalue:'物资'
                },
                {
                    typevalue:'设备'
                },
                {
                    typevalue:'工程'
                }
            ],
            typevalue:'物资',//默认商品选择下拉
            editableTabsValue:'1',
            editableTabs: [//动态标签页
                {
                title: '',
                name: '1',
                content: 'Tab 1 content'
                }, {
                title: '',
                name: '2',
                content: 'Tab 2 content'
            }],
            tableDatasss:[//计划汇总编辑商品弹框表格
                {
                    
                }
            ],
            selectlistRow: [],//编辑商品存放表格数据
            zxfsearch:'',//计划汇总模糊搜索
            zxfcksp:[//预览步骤查看商品
                {

                }
            ]
        }
    },
    methods: {
        handleClick(tab, event) {
        // console.log(tab, event);
      },
      //提交审核
      audit(){
          this.$router.push("/summarys/")
        //   console.log(121)
      },
      //计划汇总步骤下一步
      next() {
        this.active = '1';
        // this.active++
          console.log(this.active)
      },
      nexts(){
        this.active = '2';
      },
      //计划汇总步骤上一步
      last() {
        this.active = '0';
        // this.active++
        //   console.log(this.active)
      },
      //预览步骤上一步
      yulan(){
        this.active = '1';
      },
      // 获取表格选中时的数据
        selectRows (val) {
            this.selectlistRow = val
        },
         // 添加商品增加行
        addRow () {
        var list = {
            rowNum: '',
            coding: this.coding,//编码
            name: this.name,//名称
            monad: this.monad,//单位
            quantity: this.quantity,//数量
            estimate: this.estimate,//预估单价
            prices: this.prices,//预估总价
            describe: this.describe,//描述
          }
        this.tableDatasss.unshift(list)
      },
    // 删除商品增加行
       delData () {
           console.log("aasasa")
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.tableDatasss.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.tableDatasss.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        this.$refs.tableDatasss.clearSelection()
      },
    },
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
}
.route>span{
    font-size: 13px;
}
 .content{
     width: 90%;
     margin: 10px auto;
     /* background-color: antiquewhite; */
     min-height: 500px;
 }
.essential_top>p{
    height: 45px;
    line-height: 45px;
    padding: 0 22px;
    background-color: rgba(243, 243, 243, 0.829);
    font-size: 15px;
}
.essential_top>ul{
    display: flex;
    justify-content: space-between;
    height: 75px;
    line-height: 75px;
    padding: 0 28px;
}
.essential_top>ul>li{
    font-size: 14px;
}
 /* 遮罩层样式 */
 .mask {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1
}
.pop {
  background-color: #fff;
  position: fixed;
  top: 100px;
  left: 300px;
  width: calc(100% - 600px);
  height:calc(100% - 200px);
  z-index: 2
}
.Merchandise {
  background-color: #fff;
  position: fixed;
  top: 100px;
  width: 100%;
  min-height: 300px;
  z-index: 2
}
.Merchandises{
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
}
.zxfaggregate{
    margin-top: 20px;
    font-size: 14px;
}
/* 提交审核 */
.bottom{
    display: flex;
    justify-content: flex-end;
}
.preserve{
    margin-top: 2%;
    display: flex;
    justify-content: center;
}
 .content{
     width: 90%;
     margin: 10px auto;
 }
 .content>h3{
     text-align: center;
     margin: 30px 0;
     color: #505050;
 }
 .essential_top>p{
    height: 45px;
    line-height: 45px;
    padding: 0 22px;
    background-color: rgba(243, 243, 243, 0.829);
    font-size: 15px;
}
.essential_top>ul{
    display: flex;
    justify-content: space-between;
    height: 75px;
    line-height: 75px;
    padding: 0 28px;
}
.essential_top>ul>li{
    font-size: 14px;
}
</style>
