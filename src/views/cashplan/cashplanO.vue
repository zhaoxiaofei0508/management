<template>
    <div>
        <navbar/>
        <div class="route">
            <span><router-link to="/index">首页</router-link></span>&nbsp;&nbsp; &gt;<span>创建计划</span>
        </div>
        <div class="content">
            <div class="content_top">
                <p>标题:<input type="text" v-model="zzzzzz" placeholder="年度科技资金计划"></p>
                <p>流程:<span @click="showModal=true" class="btn">查看流程图</span></p>
            </div>
            <h3>年度科技资金计划</h3>
            <div class="essential_top">
                <p>基本信息</p>
                <ul>
                    <li>申请人:<span class="usname">{{userane}}</span><i class="iconfont icon-user-3"></i></li>
                    <li>申请部门:<span class="usname">{{维修中心}}</span><i class="iconfont icon-bumen"></i></li>
                    <li>申请时间:<span>2019-11-12</span></li>
                </ul>
            </div>
            <div class="essential_top">
                <p>项目信息</p>
               
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">  
                    <div v-for="(item, index2) in ruleForm.domain" :key='index2'>  
                        <div class="category">
                            *项目类别 
                            <el-select  v-model="item.searchValue"  placeholder="请选择" class="input" @change="chickvalue">
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.label"
                                :value='item.id'
                                >
                                </el-option>
                            </el-select>
                        </div>   
                        <div class="information" v-for="(item, index) in ruleForm.domain" :key='index'>
                            <p>项目:{{index+1}}<span @click="addRule" v-if="add">添加项目</span><i @click.prevent="removes(item)" id="rome" v-if="remove">删除项目</i></p>
                            <ul>
                                 <li>
                                <el-form-item 
                                label="项目编码" 
                                :prop="'domain.'+index+'.username'"
                                :rules="[
                                    { required: true, message: '请输入邮箱地址', trigger: 'blur' }
                                    ]" 
                                >
                                    <el-input v-model="item.username"></el-input>
                                    </el-form-item>
                                </li>

                                <li>
                                <el-form-item 
                                label="项目名称" 
                                :prop="'domain.'+index+'.username'"
                                :rules="[
                                    { required: true, message: '请输入邮箱地址', trigger: 'blur' }
                                    ]" 
                                >
                                    <el-input v-model="item.username"></el-input>
                                    </el-form-item>
                                </li>
                                <li>
                                <el-form-item label="预估金额" prop="money">
                                    <el-input v-model="item.money"></el-input>
                                </el-form-item>
                                </li>
                                <li>
                                    开始时间<el-date-picker
                                                v-model="item.value1"
                                                type="date"
                                                placeholder="选择日期"
                                                format="yyyy 年 MM 月 dd 日"
                                                value-format="yyyy-MM-dd">
                                            </el-date-picker>
                                </li>
                                <li>
                                    结束时间<el-date-picker
                                                v-model="item.value2"
                                                type="date"
                                                placeholder="选择日期"
                                                format="yyyy 年 MM 月 dd 日"
                                                value-format="yyyy-MM-dd"
                                                class="box1">
                                            </el-date-picker>
                                </li>
                                <li>
                                    <el-form-item label="负责人" prop="principal">
                                        <el-input v-model="item.principal"></el-input>
                                    </el-form-item>
                                </li>
                                
                            </ul>
                            <div class="brief">
                                <el-form-item label="项目简介" prop="brief">
                                    <el-input v-model="item.brief"></el-input>
                                </el-form-item>
                            </div>
                            <div class="table">
                                <span>附件</span>
                                <el-table
                                        :data="tableData"
                                        slot="empty"
                                        border
                                        style="width: 62%"
                                        >
                                        <el-table-column
                                        type="index"
                                        label="序号"
                                        width="150"
                                        align='center'
                                        >
                                        </el-table-column>
                                        <el-table-column
                                        prop="usname"
                                        label="附件名称"
                                        width="150"
                                        align='center'>
                                        <template slot-scope="scope">
                                            <el-input v-model="item.fileName" placeholder="请输入内容"></el-input>
                                        </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="city"
                                        label="上传"
                                        width="200"
                                        align='center'>
                                        <template slot-scope="scope">
                                            <el-upload
                                                class="upload-demo"
                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                :on-change="handleChange">
                                                <el-button size="small" type="primary" class="buttons">点击上传</el-button>
                                                </el-upload>
                                        </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="address"
                                        label="编辑"
                                        width="150"
                                        align='center'>
                                        <template slot-scope="scope">
                                            <span class="editing">在线编辑</span>
                                        </template>
                                        </el-table-column>
                                        <el-table-column
                                        label="操作"
                                        width="150"
                                        align='center'>
                                        <template slot-scope="scope">
                                            <el-button @click.prevent="accessoryaddRow()" type="text" size="small">增加</el-button>
                                            <el-button type="text" size="small" @click.prevent="removeDomain()">删除</el-button>
                                        </template>
                                        </el-table-column>
                                    </el-table>
                            </div>
                            <div class="button">
                                <el-button type="primary" @click="Merchandise=true">添加商品</el-button>
                                <el-button type="primary" @click="dialogTableVisible = true">查看物资</el-button>
                            </div>
                        </div>
                    </div>
               
                </el-form>
                <div class="zxfcategory">
                    <p>添加项目类别</p>
                </div>
                <div style="margin-top:25px; display: none;" id="box">
                    <span>计划预估总额</span><el-input v-model="principal" placeholder="计划预估总额" style="width:20%;margin-left: 2%;"></el-input>
                </div>
            </div>
            <div class="bottom">
                <span >取消</span>
                <span >保存草稿</span>
                <span @click="submitForm('ruleForm')">提交审核</span>
                <i>提交无计划审核展示<span  @click="dialogVisible = true">点这里</span></i>
            </div>
        </div>
        <!-- 点这里 -->
        <el-dialog
            title="无计划说明"
            :visible.sync="dialogVisible"
            width="50%"
            top="10%"
            >
            <div class="zxfunplanned" style="height: 170px;line-height: 170px;">
                <span style="display: inline-block;position: absolute;left: 5%;top:22%;">原因说明</span>
                <textarea v-model="textarea" style="height: 85%;width:80%;    margin-left: 13%;"></textarea>
            </div>    
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    <!-- 流程图遮罩内容 -->
        <el-dialog 
            title="流程图" 
            :visible.sync="showModal" 
            width=80%>
            <img src="../../../static/img/tu.jpg">
        </el-dialog>
    <!-- 添加商品遮罩内容 -->
        <el-dialog 
            title="添加物资" 
            :visible.sync="Merchandise" 
            width=98%>
            <div class="operating" style="padding:0 30px;">
                <el-button size="small" type="primary" plain @click.prevent="addRow()">增加行</el-button>
                <el-button size="small" type="primary" plain>复制行</el-button>
                <el-button size="small" type="primary" plain @click="delData()">删除行</el-button>
                <el-button size="small" type="primary" plain>导入数据</el-button>
                <el-button size="small" type="primary" plain>全部删除</el-button>
                <span>与此项目无关系的内容可不填</span>
                <el-input v-model="zxfsearch" style="display: inline-block;width: 17%;borderRight:none;margin-left: 10%;" 
                placeholder="请输入搜索内容" icon="el-icon-search">
                </el-input>
            </div>
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
                    <el-table-column label="类型">
                    <template slot-scope="scope">
                    <el-select v-model="scope.row.typevalue" placeholder="请选择">
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
                <el-button plain>取消</el-button>
                <el-button type="primary" plain @click="save()">确定</el-button>
            </div>
        </el-dialog>
    <!-- 查看物资 -->
        <el-dialog 
            title="物资明细" 
            :visible.sync="dialogTableVisible" 
            width=98%>
            <el-input v-model="search" style="display: inline-block;width: 17%;borderRight:none;margin-left: 10%;" 
                placeholder="请输入搜索内容" icon="el-icon-search">
            </el-input>
            <div class="ztable">
                <el-table 
                    :data="cktableData"
                    ref="table"
                    tooltip-effect="dark"
                    border
                    stripe
                    style="width: 100%"  
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
                    <el-table-column label="类型">
                    <template slot-scope="scope">
                    <el-select v-model="scope.row.typevalue" placeholder="请选择">
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
        </el-dialog>
    </div>
</template>
<script>
import  Navbar from '@/views/layout/components/Navbar'
export default {
    name:'Establish',
    components:{
        Navbar
    },
    data(){
        return{
            userane:'老王',
            ruleForm: {
                domain: [
                    { 
                        projectName:'',//项目名称
                        projectMoney:'',//预估金额
                        chargePerson:'',//负责人
                        projectDesc:'',//项目简介
                        startDate:'',//开始时间
                        endDate:'',//结束时间
                        fileName:'',//附件名称
                        
                        tableDatas:[
                            { 
                                coding:'',//分类
                                money:'',//预估金额
                                principal:'',//负责人
                                brief:'',//项目简介
                                value1:'',//开始时间
                                value2:'',//结束时间
                                
                            }
                        ]
                    }
                ]
            },
            cktableData:[//查看物资
                {

                }
            ],
            encoding:'',//编码
            principal:'',//计划预估总额
            dialogTableVisible: false,//查看物资
            zzzzzz:'',//标题
            showModal: false,//流程图
            Merchandise:false,//添加商品
            dialogVisible: false,//点这里
            textarea:'',//文本域
            zxfsearch:'',//模糊搜索
            searchValue:'',//项目类别
            typevalue:'',//添加商品类型
            stats:'',//添加项目类别
            // input: '',//附件名称
            add:true,//添加
            remove:false,//删除
            selectlistRow: [],
            options: [//项目类别
                    {
                    id: '1',
                    label: '类别一'
                    }, 
                    {
                    id: '2',
                    label: '类别二'
                    }, 
                    {
                    id: '3',
                    label: '类别三'
                    }
                ],
            optionss: [//添加商品的类型
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
            tableData:[//附件表格
                    {
                        fileName:'',

                    },
            ],
            tableDatas:[//添加商品表格
                {
                    coding:'',
                }
            ]
        }
    },
    methods: {
        // 点这里
        handleClose(done) {
            // this.$confirm('确认关闭？')
            //     .then(_ => {
            //         done();
            //     })
            //     .catch(_ => {});
        },

        funa(){
            this.$router.push("/index/")
        },
       chickvalue () {
            this.stats=this.searchValue
            
        },
        addRule() {//添加项目
        console.log(this.searchValue + '类别') 
        let xian=document.getElementById("box")
            xian.style="display:block"
            this.add=true
            this.remove=true
            this.ruleForm.domain.push({
                projectName:'',//项目名称
                projectMoney:'',//预估金额
                chargePerson:'',//负责人
                projectDesc:'',//项目简介
                startDate:'',//开始时间
                endDate:'',//结束时间
                fileName:'',//附件名称
            });
        },
        removes(item) {//删除项目
            var index = this.ruleForm.domain.indexOf(item)
            if (index !== -1) {
                this.ruleForm.domain.splice(index, 1)
            }
        },
        handleChange(file, fileList) {//点击上传
            this.fileList = fileList.slice(-3);
        },
        // 获取表格选中时的数据
        selectRow (val) {
        this.selectlistRow = val
        },
        //附件的增加行
        accessoryaddRow(){
            var list = {
                rowNum: '',
                fileName: this.fileName,
                loveer: this.loveer
                }
                this.tableData.unshift(list)
        },
        //附件的删除行
        removeDomain() {
            var index = this.tableData.indexOf()
            this.tableData.splice(index)
        },
        //添加物资保存
        save(){
            console.log('添加物资',this.ruleForm.domain)
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
            type:this.type,//类型
          }
        this.tableDatas.unshift(list)
      },
      // 删除商品行
       delData () {
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.tableDatas.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.tableDatas.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        this.$refs.tableDatas.clearSelection()
      },    
    //   提交数据
    submitForm(formName){
        // this.$router.push("/result/")
        let that = this
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //      this.$router.push("/result/")
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
        
        // let param = new URLSearchParams();
        // param.append("projectName",this.ruleForm.username)
        // console.log(this.ruleForm.username)
        console.log(this.ruleForm.domain,'类别');
        let  initdata = {

        "planApply": {
                // "title": "煤机采购售后",
                // "flow_id": "1",
                // "applyUsername": "王二小",
                // "orgId": "西安王二小有限公司",
                "useable":"1",
                // "planBudget": {
                //         "before_id": "112",
                //         "useable":"1",
                //         "fundstype": this.zzzzzz
                // },
                "planProject": [
                    this.ruleForm.domain
                    // {"projectName":this.ruleForm.domai[0],
                    // "projectMoney":this.ruleForm.domain.money,
                    // "startDate":this.ruleForm.domain.value1,
                    // "endDate":this.ruleForm.domain.value2,
                    // "chargePerson":this.ruleForm.domain.principal,
                    // "projectDesc":this.ruleForm.domain.brief,},
                //     ,{ 
                //         "filesurl": [],
                //         "useable":"1",
                //         "planImBudgetgoods": [{
                //                         "goodsClass": "55265",
                //                         "goodsCode": "煤矿采购",
                //                         "goodsName": "煤矿采购",
                //                         "goodsModel": "55265",
                //                         "goodsunit": "煤矿采购",
                //                         "goodsnumber": "55265",
                //                         "goodsPrice": "1212",
                //                         "goodsTotal": "55265",
                //                         "goodsType": "煤矿采购",
                //                         "startDate": "55265",
                //                         "endDate": "煤矿采购",
                //                         "factoryName": "55265",
                //                         "technologyDesc": "煤矿采购",
                //                         "useable":"1",
                //                         "remarks": "55265"
                //                 },
                //                 {
                //                         "goodsClass": "55265",
                //                         "goodsCode": "煤矿采购",                                        
                //                         "goodsName": "煤矿采购",
                //                         "goodsModel": "55265",
                //                         "goodsunit": "煤矿采购",
                //                         "goodsnumber": "55265",
                //                         "goodsPrice": "12121",
                //                         "goodsTotal": "55265",
                //                         "goodsType": "煤矿采购",
                //                         "startDate": "55265",
                //                         "endDate": "煤矿采购",
                //                         "factoryName": "55265",
                //                         "technologyDesc": "煤矿采购",
                //                         "useable":"1",
                //                         "remarks": "55265"
                //                 }
                //         ]
                // }, {
                //         "projectName": "项目名称2",
                //         "projectMoney": "项目预估金额",
                //         "startDate": "开始时间",
                //         "endDate": "结束时间",
                //         "chargePerson": "负责人",
                //         "projectDesc": "项目简介",
                //         "useable":"1",
                //         "filesurl": [],
                //         "planImBudgetgoods": []
                // }]
                ],
        }

        }
        // this.axios({
        //         url:"/apply/mapAdd",
        //         headers: {
        //             'Content-Type': "application/json;"
        //         },
        //         method:"POST",
        //         data:JSON.stringify(initdata)
        //         }).then((ok)=>{
        //             console.log(ok)
        //         })
    }
    },
    mounted() {
      
    },
    created(){
        // this.axios({
        //         url:"http://192.168.1.117:8080/plan/list",
        //         method:"get",
        //         // data:param
        //         }).then((ok)=>{
        //             console.log(ok.data)
        //             this.tableDatas=ok.data.data
        //     })
    }
}
</script>
<style  scoped>
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
.icon-bumen{
    font-size: 14px;
}

.category{
    height: 85px;
    line-height: 85px;
}
.category>.input{
    width: 90%;
    height: 100%;
    margin-left: 2.6%;
}
.information{
    min-height: 300px;
    border: 1px solid rgb(156, 156, 156);
    border-top: none;
    /* border-bottom: none; */
}
.information>p{
    height: 40px;
    background-color: rgb(250, 250, 250);
    line-height: 40px;
    padding: 0 44px;
    font-size: 14px;
    position: relative;
}
.information>p>span{
    display: inline-block;
    margin-left: 80%;
    color: aqua;
    cursor: pointer;
}
.information>p>i{
    font-style:normal;
    color: aqua;
    cursor: pointer;
    display: inline-block;
    margin-left: 2%;
    position: absolute;
    /* display: none; */
}
.information>ul{
    display: flex;
    height: 202px;
    line-height: 55px;
    padding: 38px 36px 0 36px;
    flex-wrap: wrap;
    flex-direction: row;
    /* line-height: 40px; */
}
.information>ul>li{
    font-size: 14px;
    width: 33%;
    /* height: 80px;
    line-height: 80px; */
}
.information>ul>li:nth-child(3){
    padding-left: 20px;
}
.information>ul>li:nth-child(4){
    padding-left: 16px;
}
.information>ul>li>input{
    margin-left: 24px;
    width: 62%;
    height: 30px;
    font-size: 13px;
    padding: 0 5px;
    /* border-color: rgb(252, 252, 252); */
}
.el-date-editor{
    margin-left: 24px;
    width: 76%;
    height: 30px;
    font-size: 13px;
}
.el-date-editor>input{
    border-color: dimgrey;
    border-radius: none;
}
.box1{
    margin-left: 29px;
}
.box2{
    margin-left: 19% !important;
}
/* .el-table{
    margin-left: 2%; 
} */
.el-table th>.cell {
    text-align: center;
    font-size: 12px;
}
.brief{
    padding: 0 38px;
    font-size: 14px;
}
.brief>input{
    width: 86.5%;
    height: 48px;
    margin-left: 26px;
    padding: 0 5px;
}
.table{
    display: flex;
    margin-top: 20px;
    width: 77.3%;
}
.table>span{
    margin-left: 10%;
    padding-top: 14px;
    margin-right: 1%;
}
.upload-demo{
    display: flex;
}
.buttons{
    background-color: darkgray;
    border: none;
}
.el-upload-list{
    width: 20px;
}
.editing{
    color: #409EFF;
}
.button{
    padding: 20px 0;
    padding-left: 10%;
}
/* 添加物资弹框样式 */
.Merchandise {
  background-color: #fff;
  position: fixed;
  top: 100px;
  /* left: 300px; */
  width: 100%;
  min-height: 300px;
  z-index: 2
}
.Merchandises{
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
}
.inputss>input{
    border: none;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: white;
}
.operating>span{
    color: brown;
}
/* 提交审核 */
.bottom{
    display: flex;
    justify-content: flex-end;
    height: 100px;
    line-height: 100px;
    /* border-bottom: 1px solid black; */
}
.bottom>span:nth-child(1){
    display: inline-block;
    width: 150px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid rgb(119, 119, 119);
    cursor: pointer;
    margin: auto 0;
    margin-right: 5%;
}
.bottom>span:nth-child(2){
    display: inline-block;
    width: 150px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid rgb(119, 119, 119);
    cursor: pointer;
    margin: auto 0;
    margin-right: 5%;
}
.bottom>span:nth-child(3){
    display: inline-block;
    width: 150px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: rgb(240, 6, 6);
    cursor: pointer;
    margin: auto 0;
    color: white;
    margin-right: 3%;
}
.bottom>i>span{
    color: red;
    cursor: pointer;
}
.zxfcategory>p{
    width: 140px;
    height: 30px;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    border: 1px solid rgb(56, 142, 255);
    color: #409EFF;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
}
.ztable{
    margin-top: 20px;
}
.preserve{
    margin-top: 2%;
    display: flex;
    justify-content: center;
}
.inputss>input{
    padding: 0;
}
</style>
    