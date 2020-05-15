<template>
  <div id="">
    <el-form ref="form" :model="addForm" :rules="addRules" label-width="150px" size="mini">
      <el-col :span="24">
        <div class="add_file_title">供应商基本信息</div>
      </el-col>
      <el-col :span="11">
        <el-form-item label="企业名称：" prop="cnname">
          <el-input v-model="addForm.cnname" placeholder="请输入企业名称" />
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item label="注册资本(万元)：" prop="regmoney">
          <el-input v-model="addForm.regmoney" placeholder="请输入注册资本" />
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="企业性质：" prop="memberkind">
          <el-select style="width:100%;" filterable v-model="addForm.memberkind" placeholder="请选择企业性质">
            <el-option v-for="m in comppropses" :label="m.name" :value="m.name" :key="m.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item label="法定代表人姓名：" prop="legalperson">
          <el-input v-model="addForm.legalperson" placeholder="请输入法定代表人姓名" />
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="所属行业：" prop="busbigtype">
          <!--<el-input v-model="addForm.legalperson" placeholder="请输入所属行业" />-->
          <el-select style="width:100%;" filterable v-model="addForm.busbigtype" placeholder="请选择所属行业">
            <el-option v-for="m in compindustries" :label="m.name" :value="m.name" :key="m.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item label="法定代表人身份证：" prop="legalpersoncode">
          <el-input v-model="addForm.legalpersoncode" placeholder="请输入法定代表人身份证" />
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="统一社会信用代码：" prop="orgcode">
          <el-input v-model="addForm.orgcode" placeholder="请输入统一社会信用代码" />
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item label="法人身份证附件：" prop="legalpersonfile" ref="legalpersonfile">
          <el-upload class="autoExamUpload" ref="upload" :file-list="fileList" name="articleImage" :headers="handleHeader"
            :on-exceed="handleExceed" :on-success="handleSuccess" style="display: inline-block;" action="http://61.134.63.231:9090/organizationService/image/uploadImg">
            <el-input slot="trigger" :limit="1" style="width:300px;" />
          </el-upload>
        </el-form-item>
      </el-col>
      <div style="clear:both;"></div>
      <el-col :span="11">
        <el-form-item label="企业所在地：" prop="address">
          <el-cascader style="width:100%;" placeholder="请选择企业所在地" :props="props" :options="cityOptions" v-model="temp.address"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item label="联系人：" prop="linkman">
          <el-input v-model="addForm.linkman" placeholder="请输入联系人" />
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="详细地址：" prop="regaddress">
          <el-input v-model="addForm.regaddress" placeholder="请输入详细地址" />
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item label="联系电话：" prop="phone">
          <el-input v-model="addForm.phone" placeholder="请输入联系电话" />
        </el-form-item>
      </el-col>

      <el-col :span="11">
        <el-form-item label="营业执照：" prop="orgfile" ref="orgfile1">
          <el-upload class="autoExamUpload" ref="upload" :file-list="fileList" name="articleImage" :headers="handleHeader"
            :on-exceed="handleExceedFile" :on-success="handleSuccessFile" style="display: inline-block;" action="http://61.134.63.231:9090/organizationService/image/uploadImg">
            <el-input slot="trigger" :limit="1" style="width:300px;" />
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item label="主营业务：" prop="bussmalltype">
          <el-input type="textarea" v-model="addForm.bussmalltype" placeholder="请输入主营业务" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <div class="add_file_title">资质信息</div>
      </el-col>
      <el-col :span="24">
        <el-form-item label="资质类型：">
          <el-table :data="compqual" style="width: 100%">
            <el-table-column prop="compqualid" label="资质类型">
              <template slot-scope="scope">
                <el-select style="width:100%;" filterable v-model="scope.row.id" placeholder="请选择资质类型">
                  <el-option v-for="m in compqualArr" :label="m.name" :value="m.id" :key="m.id"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="validatedate" label="资质有效期">
              <template slot-scope="scope">
                <!--<el-input v-model="scope.row.validatedate" placeholder="请输入资质有效期" />-->
                <el-date-picker v-model="scope.row.validatedate" type="date" placeholder="选择日期" />
              </template>
            </el-table-column>
            <el-table-column prop="file" label="资质">
              <template slot-scope="scope">
                <el-upload class="autoExamUpload" ref="upload" :file-list="fileList" name="file" :headers="handleHeader"
                  :on-exceed="handleExceedZizhi" :on-success="handleSuccesszizhi" style="display: inline-block;" action="http://61.134.63.231:9090/purchasingmanagementService/upload/uploadFileToQiNiu">
                  <el-input slot="trigger" :limit="1" style="width:100%;" />
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <span v-if="scope.$index==compqual.length-1" style="color:#409EFF;" @click="addZizhi" class="el-icon-plus"></span>
                <span v-if="scope.$index!=0" style="color:#409EFF;" @click="minusZizhi(scope.row)" class="el-icon-minus"></span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <div class="add_file_title">供货类别</div>
      </el-col>
      <el-col :span="24">
        <el-form-item label="供应商类型" prop="membertype" label-width="100px">
          <el-select style="width:50%;" filterable v-model="addForm.membertype" placeholder="请选择供应商类型">
            <el-option v-for="m in memberTypeArr" :label="m.name" :value="m.name" :key="m.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供货类别" prop="person" label-width="100px">
          <el-button type="text" @click="choiceType()">请选择</el-button>
          <!--谈判文件-->
          <el-dialog title="供货类别" :visible.sync="fileDialogVisible" append-to-body width="60%">
            <!-- <el-tree ref="treeSelector" :data="treelist" show-checkbox @node-click="handleNodeClick" /> -->
            <span>类别</span> 
            <el-select v-model="equipment1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="equipment2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="equipment3" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="equipment4" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
              <el-button @click="fileDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="categorySelectConfirm()">确 定</el-button>
            </span>
          </el-dialog>
          <div class="super-list">
            <el-alert style="width:50%;margin-bottom:10px;" v-for="(tag,index) in suppliercategoriesArr" :key="tag.id"
              :title="tag.title" @close="delSupplierCategory(index)" type="info">
            </el-alert>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <div class="add_file_title">账户信息</div>
      </el-col>
      <el-col :span="24">
        <el-form-item label="基本账户：">
          <el-table :data="normalAccounts" style="width: 100%">
            <el-table-column prop="bankname" label="开户行名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.bankname" placeholder="请输入开户行名称" />
              </template>
            </el-table-column>
            <el-table-column prop="openbankaccountno" label="开户行账号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.openbankaccountno" placeholder="请输入开户行账号" />
              </template>
            </el-table-column>
            <el-table-column prop="bankaccountno" label="银行账号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.bankaccountno" placeholder="请输入银行账号" />
              </template>
            </el-table-column>
            <el-table-column prop="isexchange" label="支持承兑">
              <template slot-scope="scope">
                <el-select v-model="scope.row.isexchange" placeholder="请选择支持承兑">
                  <el-option v-for="m in isexchangeArr" :label="m.label" :value="m.value" :key="m.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="设为默认" prop="isdefault">
              <template slot-scope="scope">
                <el-radio v-model="scope.row.isdefault" label="1">默认</el-radio>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="一般账户：">
          <el-table :data="baseAccounts" style="width: 100%">
            <el-table-column prop="bankname" label="开户行名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.bankname" placeholder="请输入开户行名称" />
              </template>
            </el-table-column>
            <el-table-column prop="openbankaccountno" label="开户行账号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.openbankaccountno" placeholder="请输入开户行账号" />
              </template>
            </el-table-column>
            <el-table-column prop="bankaccountno" label="银行账号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.bankaccountno" placeholder="请输入银行账号" />
              </template>
            </el-table-column>
            <el-table-column prop="isexchange" label="支持承兑">
              <template slot-scope="scope">
                <el-select v-model="scope.row.isexchange" placeholder="请选择支持承兑">
                  <el-option v-for="m in isexchangeArr" :label="m.label" :value="m.value" :key="m.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="设为默认" prop="isdefault">
              <template slot-scope="scope">
                <el-radio v-model="scope.row.isdefault" @change="setDefault(scope.$index)" label="1">默认</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span v-if="scope.$index==baseAccounts.length-1" style="color:#409EFF;" @click="addBase" class="el-icon-plus"></span>
                <span v-if="scope.$index!=0" style="color:#409EFF;" @click="minusBase(scope.row)" class="el-icon-minus"></span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <div class="add_file_title">邮箱信息</div>
      </el-col>
      <el-col :span="24">
        <el-table :data="emails" style="width: 100%">
          <el-table-column prop="emailno" label="邮箱账号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.emailno" placeholder="请输入邮箱账号" />
            </template>
          </el-table-column>
          <el-table-column prop="emaillinkman" label="邮箱联系人">
            <template slot-scope="scope">
              <el-input v-model="scope.row.emaillinkman" placeholder="请输入邮箱联系人" />
            </template>
          </el-table-column>
          <el-table-column prop="bankaccountno" label="邮箱电话">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bankaccountno" placeholder="请输入邮箱电话" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span v-if="scope.$index==emails.length-1" style="color:#409EFF;" @click="addEmail" class="el-icon-plus"></span>
              <span v-if="scope.$index!=0" style="color:#409EFF;" @click="minusEmail(scope.row)" class="el-icon-minus"></span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-form>
    <div>
      <el-button style="float:right;margin-left:20px;margin-top:20px;" type="primary" @click="submit">提交审核</el-button>
      <!--<el-button style="float:right;" @click="cancel">取 消</el-button>-->
    </div>

  </div>
</template>

<script>
  import {
    getToken
  } from '@/utils/auth'
  import {
    getCityArea
  } from './city.js'
  import {
    getAjax,
    postAjax
  } from '@/utils/ajaxRequest'
  export default {
    data() {
      return {
        // 供货类别选择
        equipment1: '',
        equipment2: '',
        equipment3: '',
        equipment4: '',
        // 
        addForm: {},
        addRules: {
          cnname: [{
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          }],
          regmoney: [{
            required: true,
            message: "请输入注册资本",
            trigger: "blur"
          }],
          memberkind: [{
            required: true,
            message: "请选择企业性质",
            trigger: "change"
          }],
          legalperson: [{
            required: true,
            message: "请输入法定代表人姓名",
            trigger: "blur"
          }],
          busbigtype: [
            // 所属行业
            {
              required: true,
              message: "请选择所属行业",
              trigger: "change"
            }
          ],
          legalpersoncode: [
            // 法定代表人身份证
            {
              required: true,
              message: "请输入法定代表人身份证",
              trigger: "blur"
            }
          ],
          orgcode: [{
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur"
          }],
          legalpersonfile: [{
            required: true,
            message: "法人身份证附件",
            trigger: "blur"
          }],
          province: [{
            required: false,
            message: "这是必填字段",
            trigger: "change"
          }],
          city: [{
            required: false,
            message: "这是必填字段",
            trigger: "change"
          }],
          region: [{
            required: true,
            message: "这是必填字段",
            trigger: "change"
          }],
          areaid: [{
            required: true,
            message: "这是必填字段",
            trigger: "blur"
          }],
          linkman: [{
            required: true,
            message: "请输入联系人",
            trigger: "blur"
          }],
          regaddress: [{
            required: true,
            message: "请输入详细地址",
            trigger: "blur"
          }],
          phone: [{
            required: true,
            message: "请输入联系电话",
            trigger: "blur"
          }],
          orgfile: [{
            required: true,
            message: "请选择营业执照",
            trigger: "blur"
          }],
          performancefile: [{
            required: true,
            message: "这是必填字段",
            trigger: "blur"
          }],
          membertype: [{
            required: true,
            message: "请选择供应商类型",
            trigger: "change"
          }]
        },
        //企业性质
        comppropses: [],
        //所属行业
        compindustries: [],
        //资质  列表
        compqual: [],
        //资质类型  列表
        compqualArr: [],
        //供货类别
        suppliercategories: "",
        suppliercategoriesArr: [],
        memberTypeArr: [],
        //选择供货类别
        treelist: [],

        //谈判文件内容
        fileDialogVisible: false,
        //账户信息
        normalAccounts: [{
          bankname: "",
          openbankaccountno: "",
          bankaccountno: "",
          isexchange: "",
          isdefault: ""
        }],
        //一般账户
        baseAccounts: [{
          bankname: "",
          openbankaccountno: "",
          bankaccountno: "",
          isexchange: "",
          isdefault: ""
        }],
        //邮箱信息
        emails: [{
          emailno: "",
          emaillinkman: "",
          bankaccountno: "",
        }],
        //支持承兑
        isexchangeArr: [{
            value: "1",
            label: "是"
          },
          {
            value: "2",
            label: "否"
          },
        ],
        planArr: [],
        ziZhiTable: [],
        cityOptions: getCityArea(),
        props: {
          value: 'label',
        },
        fileList: [],
        temp: {},
        modeArr: [],
        handleHeader: {
          token: getToken()
        },
        createUser: ''
      }
    },
    created() {
      // 获取登录人信息
      this.createUser = window.sessionStorage.getItem('userName')
      console.log(this.createUser)
      //供应商  资质类型
      // getAjax("/api/planmanagementService/enterprisemanagerService/compqual/list").then(res => {
        // if (res.code == 0) {
        //   this.compqualArr = res.data;
        //   this.compqual = [{
        //     compqualid: res.data[0].id,
        //     validatedate: "",
        //     file: "",
        //   }];
        // }
      // });
      //获取企业性质
      getAjax("/api/planmanagementService/CreateSupplier/list").then(res => {
        if (res.code == "0") {
          console.log(res)
          // 企业性质
          this.comppropses = res.data.comppropsList.data;
          // 所属行业
          this.compindustries = res.data.compindustryList.data;
          // 供应商类型
          this.memberTypeArr = res.data.comptypeList.data;
           if (res.code == 0) {
            this.compqualArr = res.data.compqualList.data;
            this.compqual = [{
              compqualid: res.data.compqualList.data[0].id,
              validatedate: "",
              file: "",
            }];
          }
        }
      });
      //所属行业
      // getAjax("/api/enterprisemanagerService/compindustry/list").then(res => {
      //   if (res.code == "0") {
      //     // this.compindustries = res.data;
      //   }
      // });
      //供应商 供货类别
      // getAjax("/api/enterprisemanagerService/category/tree").then(res => {
      //   if (res.code == 0) {
      //     this.treelist = res.data;
      //   }
      // });
    },
    methods: {
      //一般账户  设为默认
      setDefault(index) {
        this.baseAccounts.forEach(item => {
          item.isdefault = "";
        });
        this.baseAccounts[index].isdefault = "1";
      },
      //获取供货类别
      handleNodeClick(data) {},
      //获取供货类别 确定
      categorySelectConfirm() {
        this.$refs.treeSelector.getCheckedNodes().forEach((item, index) => {
          this.suppliercategoriesArr.push({
            categoryid: item.id,
            name: item.label,
            title: index + 1 + "." + item.label,
          });
        });
        this.fileDialogVisible = false;
      },
      delSupplierCategory(index) {
        this.suppliercategoriesArr.splice(index, 1);
      },
      handleChange(value) {
        console.log(value);
        console.log(this.temp.address);
      },
      //法人身份证附件
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`)
      },
      //法人身份证附件
      handleSuccess(file) {
        if (file.code == 0) {
          this.addForm.legalpersonfile = file.data;
          this.$refs.legalpersonfile.clearValidate();
          this.$message('上传成功')
        } else {
          this.$message(file.message)
        }
      },
      //营业执照附件
      handleExceedFile(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`)
      },
      //营业执照附件
      handleSuccessFile(file) {
        if (file.code == 0) {
          this.addForm.orgfile = file.data;
          this.$refs.orgfile1.clearValidate();
          this.$message('上传成功')
        } else {
          this.$message(file.message)
        }
      },
      //资质附件
      handleExceedZizhi(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`)
      },
      //资质附件
      handleSuccesszizhi(file) {
        console.log(file);
        if (file.code == 0) {
          this.$message('上传成功')
        } else {
          this.$message(file.message)
        }
      },
      //新增资质
      addZizhi() {
        this.compqual.push({
          compqualid: this.compqualArr[0].id,
          validatedate: "",
          file: "",
        });
      },
      //删除
      minusZizhi(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.compqual = _.without(this.compqual, row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //谈判文件内容
      choiceType() {
        this.fileDialogVisible = true;
      },
      //新增邮箱
      addEmail() {
        this.emails.push({
          emailno: "",
          emaillinkman: "",
          bankaccountno: "",
        });
      },
      //删除邮箱
      minusEmail(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.emails = _.without(this.emails, row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //新增基本账户
      addBase() {
        this.baseAccounts.push({
          bankname: "",
          openbankaccountno: "",
          bankaccountno: "",
          isexchange: "",
          isdefault: ""
        });
      },
      //删除基本账户
      minusBase(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.baseAccounts = _.without(this.baseAccounts, row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      submit() {
        //				this.$emit('submit', "123");
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            var obj = {
              "createSupplier": {
                "address": "",
                "capital": "",
                "cnname": "",
                "contactName": "",
                "contactPhone": "",
                "createDate": "",
                "createUser": "",
                "deleteDate": "",
                "deleteUser": "",
                "deputyCode": "",
                "deputyName": "",
                "enterpriseArea": "",
                "enterpriseCity": "",
                "enterpriseCode": "",
                "enterpriseCountry": "",
                "enterpriseDesc": "",
                "enterpriseProvince": "",
                "id": "",
                "industry": "",
                "nature": "",
                "remarks": "",
                "supplierGoodsType": "",
                "supplierId": "",
                "supplierType": "",
                "updateDate": "",
                "updateUser": "",
                "useable": ""
              },
              "supplierAccount": [
                {
                  "accountType": "",
                  "bankCode": "",
                  "createDate": "",
                  "createUser": "",
                  "deleteDate": "",
                  "deleteUser": "",
                  "id": "",
                  "isAcceptance": "",
                  "isDefault": "",
                  "openBankCode": "",
                  "openBankName": "",
                  "supplierCreateId": "",
                  "supplierId": "",
                  "updateDate": "",
                  "updateUser": "",
                  "useable": ""
                }
              ],
              "supplierTypeList": [
                {
                  "applyId": "",
                  "implementId": "",
                  "remarks": "",
                  "serialnumber": "",
                  "supplierKey": "",
                  "supplierName": "",
                  "supplierSelectType": "",
                  "supplierType": "",
                  "useable": ""
                }
              ],
              "supplierPostbox": [
                {
                  "createDate": "",
                  "createUser": "",
                  "deleteDate": "",
                  "deleteUser": "",
                  "emailAccount": "",
                  "emailContract": "",
                  "id": "",
                  "supplierCreateId": "",
                  "supplierId": "",
                  "telephone": "",
                  "updateDate": "",
                  "updateUser": "",
                  "useable": ""
                }
              ],
              "supplierQualifyList": [
                {
                  "createDate": "",
                  "createUser": "",
                  "deleteDate": "",
                  "deleteUser": "",
                  "id": "",
                  "qualifyDate": "",
                  "qualifyType": "",
                  "supplierCreateId": "",
                  "supplierId": "",
                  "updateDate": "",
                  "updateUser": "",
                  "useable": ""
                }
              ]
            }
            obj.createSupplier.address = this.addForm.regaddress
            obj.createSupplier.capital = this.addForm.regmoney
            obj.createSupplier.cnname = this.addForm.cnname
            obj.createSupplier.contactName = this.addForm.linkman
            obj.createSupplier.contactPhone = this.addForm.phone
            obj.createSupplier.createUser = this.createUser
            obj.createSupplier.updateUser = this.createUser
            obj.createSupplier.deputyCode = this.addForm.legalpersoncode
            obj.createSupplier.deputyName = this.addForm.legalperson

            obj.createSupplier.enterpriseCountry = '中国'
            obj.createSupplier.enterpriseProvince = this.temp.address[0]
            obj.createSupplier.enterpriseCity = this.temp.address[1]
            obj.createSupplier.enterpriseArea = this.temp.address[2]

            obj.createSupplier.enterpriseCode = this.addForm.orgcode
            obj.createSupplier.enterpriseDesc = this.addForm.bussmalltype
            obj.createSupplier.industry = this.addForm.busbigtype
            obj.createSupplier.nature = this.addForm.memberkind
            obj.createSupplier.enterpriseDesc = this.addForm.bussmalltype

            // 基本账户
            this.normalAccounts.forEach(item => {
              item.accountType = '1'
              obj.supplierAccount.push(item)
            })
            // 一般账户
            this.baseAccounts.forEach(item => {
              item.accountType = '2'
              obj.supplierAccount.push(item)
            })
            obj.supplierAccount.forEach(item => {
              item.bankCode = item.bankaccountno
              item.createUser = this.createUser
              item.isAcceptance = item.isexchange
              item.isDefault = item.isdefault
              item.openBankCode = item.bankname
              item.openBankName = item.openbankaccountno
              item.updateUser = this.createUser
            })

            obj.supplierTypeList = [
              {
                supplierName: '供应商名称',
                supplierSelectType: '供应商类别',
                supplierType: this.addForm.membertype
              }
            ]

            this.emails.forEach(item => {
              item.createUser = this.createUser
              item.updateUser = this.createUser
              item.emailAccount = this.emailno
              item.emailContract = this.emaillinkman
              item.telephone = this.bankaccountno
            })
            obj.supplierPostbox = this.emails

            // 资质类型
            this.compqual.forEach(item => {
              item.createUser = this.createUser
              // item.qualifyDate = this.validatedate
              // item.qualifyType = this.compqualid
              item.qualifyDate = '2020-01-02'
              item.qualifyType = '1'
              item.updateUser = this.createUser
            })
            // obj.supplierQualifyList = this.compqual
            // 测试假数据
             var arr = [{
              qualifyDate: '2020-01-02',
              createUser: this.createUser,
              updateUser: this.createUser,
              qualifyType: '1',
              createUser: this.createUser,
              updateUser: this.createUser
            }]
            obj.supplierQualifyList = arr
            
            console.log(obj)
            postAjax("/api/planmanagementService/CreateSupplier/add", JSON.stringify(obj)).then(res => {
              console.log(res)
              if (res.code == 0) {
                this.$message("添加成功");
                this.$emit('submit', "123");
              } else {
                this.$message(res.message);
              }
            });
          }
        });
      },
      cancel() {
        this.$emit('submit', false);
      },
    }
  }
</script>

<style>
  .add_file_title {
    padding: 10px;
    background: #efefef;
    color: #000;
    margin-top: -10px;
    margin-bottom: 20px;
    height: 35px;
  }

  .autoExamUpload .el-upload-list {
    margin-top: -40px;
  }
</style>
