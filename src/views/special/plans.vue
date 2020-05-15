<template>
  <div>
    <Navbar></Navbar>
    <div class="route">
        <span><router-link to="/index">首页</router-link></span>&nbsp;&nbsp; &gt;<span>创建计划</span>
    </div>
    <div class="content">
        <div class="content_top">
            <p>标题:<input type="text" placeholder="关于下发年度专项资金计划通知"></p>
            <p>流程:<span @click="showModal=true" class="btn">查看流程图</span></p>
        </div>
        <h3>年度专项资金计划</h3>
        <div class="essential_top">
            <p>基本信息</p>
                <ul>
                <li>申请人:<span class="usname">王华</span><i class="iconfont icon-user-3"></i></li>
                <li>申请部门:<span class="usname">维修中心</span><i class="iconfont icon-bumen"></i></li>
                <li>资金类别:<span>安全/大修/折旧</span></li>
                <li>申请时间:<span>2019-11-12</span></li>
            </ul>
        </div>
        <div class="essential_top">
            <p>项目信息</p>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="安全资金计划" name="first" class="zxfplans">
                    <p>2019年安全资金计划</p>
                    <div class="zxfMerchandise">
                            <div class="ztable">
                                <el-table
                                    :data="tableDatas"
                                    ref="table"
                                    tooltip-effect="dark"
                                    border
                                    stripe
                                    style="width: 100%"  
                                    @selection-change='selectRow'>
                                    <el-table-column type="selection" width="45" align="center"></el-table-column>
                                    <el-table-column label="项目编码" width="100">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.delivery" class='inputss'></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="项目类别" width="100">
                                    </el-table-column>
                                    <el-table-column label="项目名称">
                                    </el-table-column>
                                    <el-table-column label="项目预估金额" width="120">
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
                                    <el-table-column label="是否核准制">
                                        <template slot-scope="scope">
                                            <el-select v-model="value">
                                                <el-option
                                                    v-for="item in optionss"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="提报部门">
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="Merchandise=true">编辑商品</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="zxfaggregate">
                                计划总金额:<span>231232</span>
                            </div>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="折旧资金计划" name="second" class="zxfplans">
                    <p>2019年折旧资金计划</p>
                    <div class="zxfMerchandise">
                            <div class="ztable">
                                <el-table
                                    :data="tableDatass"
                                    ref="table"
                                    tooltip-effect="dark"
                                    border
                                    stripe
                                    style="width: 100%"  
                                    >
                                    <el-table-column type="selection" width="45" align="center"></el-table-column>
                                    <el-table-column prop="name" label="项目编码" width="100">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.delivery" class='inputss'></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="项目类别" width="100">
                                    </el-table-column>
                                    <el-table-column label="项目名称">
                                    </el-table-column>
                                    <el-table-column label="项目预估金额" width="120">
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
                                    <el-table-column label="是否核准制">
                                        <template slot-scope="scope">
                                            <el-select v-model="value">
                                                <el-option
                                                    v-for="item in optionss"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="提报部门">
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="Merchandise=true">编辑商品</el-button>
                                        </template> 
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="zxfaggregate">
                                计划总金额:<span>1212</span>
                            </div>
                        </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="send">
            <p>下发信息</p>
            <div class="sends">
                <span>批复文件</span>
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">选择文件</el-button>
                </el-upload>
            </div>
            <div class="ssue">
                <span>下发人员</span>
                <el-button type="text" @click="dialogTableVisible = true">选择人员</el-button>
            </div>
        </div>
    </div>
    <div class="zxfbutton">
        <span>取消</span>
        <span @click="zxfsummary()">确定</span>
    </div>
    <!-- 选择人员弹框 -->
    <el-dialog title="下发人员选择" :visible.sync="dialogTableVisible">
        <div class="personnel">
            <span>公司人员</span>
            <span>下发人员</span>
        </div>
        <tree-transfer :title="title" :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @addBtn='add' :mode='mode' min-height='450px' filter>
        </tree-transfer>
        <div class="butts">
            <el-button plain>取消</el-button>
            <el-button type="primary" plain>确定</el-button>
        </div>
    </el-dialog>
    <!-- 编辑商品弹框 -->
    <div v-if="Merchandise">
        <Retables :zxfRefome="zxfplans"></Retables>
    </div>
    <!-- 添加商品遮罩层 -->
    <div class="mask" v-if="Merchandise" @click="Merchandise=false"></div>
  </div>
</template>

<script>
import  Navbar from '@/views/layout/components/Navbar'
import  Retables from '@/views/special/components/redacttabs'
import treeTransfer from 'el-tree-transfer'
export default{
    components:{
        Navbar,
        Retables,
        treeTransfer
    },
    data() {
        return {
            activeName:'first',
            dialogTableVisible: false,//选择人员弹框
            optionss:[//是否核准选择下拉
                {
                    value: '是'
                },
                {
                    value: '否'
                }
            ],
            value:'是',
            tableDatas:[//安全资金表格
                {

                }
            ],
            tableDatass:[//安全资金表格
                {

                }
            ],
            Merchandise:false,//编辑商品
            zxfplans:[//编辑商品弹框
                {
                    name:''
                }
            ],
            // 选择文件
            fileList: [
                // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
                ],
            mode: "transfer",
            fromData:[
                {
                    id: "1",
                    pid: 0,
                    label: "部门一",
                    children: [
                    {
                        id: "1-1",
                        pid: "1",
                        label: "张三",
                        children: []
                    },{
                        id: "1-2",
                        pid: "1",
                        label: "李四",
                        children: []
                    },
                    ]
                },
                {
                    id: "2",
                    pid: 1,
                    label: "部门二",
                    children: [
                    {
                        id: "2-2",
                        pid: "2",
                        label: "我问问",
                        children: []
                    },{
                        id: "2-3",
                        pid: "2",
                        label: "对对对",
                        children: []
                    },
                    ]
                },
            ],    
        }
    },
    methods: {
        handleClick(tab, event) {//标签页切换
            // console.log(tab, event);
        },
        submitUpload() {//上传到服务器
            this.$refs.upload.submit();
        },  
        handlePreview(file) {//点击文件列表中已上传的文件事件钩子
            console.log(file);
        },
        // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
      changeMode() {
        if (this.mode == "transfer") {
          this.mode = "addressList";
        } else {
          this.mode = "transfer";
        }
      },
      // 监听穿梭框组件添加
      add(fromData,toData,obj){
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        // console.log("fromData:", fromData);
        // console.log("toData:", toData);
        console.log("obj:", obj);
      },
      // 监听穿梭框组件移除
      remove(fromData,toData,obj){
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        // console.log("fromData:", fromData);
        // console.log("toData:", toData);
        // console.log("obj:", obj);
      }
    
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
    font-size: 15px;
}
 .content{
     width: 90%;
     margin: 10px auto;
     /* background-color: antiquewhite; */
     min-height: 500px;
 }
 .content>h3{
     text-align: center;
     margin: 10px 0;
 }
 .content_top>p{
     line-height: 55px;
     font-size: 14px;
 }
 .content_top>p>span{
     display: inline-block;
     cursor: pointer;
     color: rgb(89, 156, 255);
     margin-left: 1%;
     
 }
 .content_top>p>input{
     width: 82%;
     margin-left: 1%;
     height: 32px;
     padding: 0 10px;
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
.zxfplans>p{
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 19px;
    font-weight: 600;
}
.zxfaggregate{
    margin-top: 10px;
}
.send{
    margin-top: 3%;
}
.send>p{
    height: 45px;
    line-height: 45px;
    padding: 0 22px;
    background-color: rgba(243, 243, 243, 0.829);
    font-size: 15px;
    font-size: 14px;
}
.sends{
    display: flex;
    height: 35px;
    line-height: 35px;
    margin-top: 2%;
}
.sends>span{
    display: inline-block;
    margin-right: 2%;
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
.ssue{
    font-size: 14px;
    margin-top: 20px;
}
.personnel>span{
    display: inline-block;
    margin-bottom: 10px;
}
.personnel>span:nth-child(2){
    margin-left: 53%;
}
.butts{
    display: flex;
    justify-content: center;
    height: 90px;
    
}
.butts>button{
    height: 35px;
    margin: auto 10px;
}
</style>
