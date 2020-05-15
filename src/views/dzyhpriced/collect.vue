<template>
  <div style="padding:20px;">
   <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/forme' }">汇总计划</el-breadcrumb-item>
		</el-breadcrumb>
    <div class="content">
      <div style="padding:0 15%;">
        <el-steps :active="active" align-center>
          <el-step title="选择计划"></el-step>
          <el-step title="计划汇总"></el-step>
          <el-step title="商品立库"></el-step>
          <el-step title="预览"></el-step>
        </el-steps>
      </div>
      <div>
        <div class="ztable">
          <el-tabs v-model="activeModel" style="">
            <el-tab-pane name="0">
              <el-input
                @input="SearchKeyWord"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="input1"
                style="width:20%; padding:10px 0"
              >
              </el-input>
              <div>
                <el-table
                  :data="xztableData"
                  ref="tableDatas"
                  tooltip-effect="dark"
                  border
                  stripe
                  style="width: 90%"
                  @selection-change="selectPlanList"
                >
                  <el-table-column
                    type="selection"
                    width="50"
                    align="center"
                  ></el-table-column>
                  <el-table-column prop="title" label="计划名称">
                  </el-table-column>
                  <el-table-column prop="applyUsername" label="提报人">
                  </el-table-column>
                  <el-table-column prop="orgName" label="提报部门">
                  </el-table-column>
                  <el-table-column prop="applyDate" label="提报时间">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="planSelectList(scope.row.apply_id)"
                        >查看</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <pagination
                  v-show="total > 0"
                  :total="total"
                  :page.sync="listQuery.page"
                  :limit.sync="listQuery.limit"
                  @pagination="getList"
                />
              </div>
              <div class="bottom">
                <el-button
                  :disabled="nextDisabled"
                  style="margin-top: 12px;width: 13%;background-color: rgb(183, 65, 65);color: white;"
                  @click="next"
                  >下一步</el-button
                >
              </div>
            </el-tab-pane>
            <el-tab-pane name="1">
              <el-form
                :model="dynamicValidateForm"
                ref="dynamicValidateForm"
                label-width="100px"
                class="demo-ruleForm"
                style="margin-top:20px;"
              >
                <el-form-item
                  prop="usename"
                  label="汇总单名称"
                  :rules="[
                    {
                      required: true,
                      message: '请输入汇总单名称',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input
                    v-model="dynamicValidateForm.usename"
                    style="width:30%"
                  ></el-input>
                </el-form-item>
              </el-form>
              <p style="height: 35px;line-height: 35px;padding: 0 16px;">
                商品信息
              </p>
              <div>
                <el-table :data="jhhzdtableData" style="font-size: 10px">
                  <el-table-column
                    property="goodsClass"
                    label="分类"
                    width="50"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="goodsCode"
                    label="编码"
                    width="50"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="goodsName"
                    label="商品/服务名称"
                    width="120"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="goodsModel"
                    label="规则型号/描述"
                    width="120"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="goodsunit"
                    label="单位"
                    width="50"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="goodsNumber"
                    label="提报数量"
                    width="50"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="goodsPrice"
                    label="预估单价"
                    width="100"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="goodsTotal"
                    label="预估总价"
                    width="100"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="goodsType"
                    label="类型"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="startDate"
                    label="计划实施时间"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="endDate"
                    label="计划交付时间"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="orgType"
                    label="提报单位"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="purchased"
                    label="是否自购"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="factoryName"
                    label="主机厂家"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="technologyDesc"
                    label="技术要求"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="remarks"
                    label="备注"
                    align="center"
                  ></el-table-column>
                </el-table>
                <p style="margin-top: 25px;">
                  备注:<el-input
                    placeholder="请输入内容"
                    v-model="jihuahuizong"
                    clearable
                    style="width:40%"
                  ></el-input>
                </p>
              </div>
              <div class="bottom">
                <el-button style="margin-top: 12px;width: 13%;" @click="last"
                  >上一步</el-button
                >
                <el-button
                  style="margin-top: 12px;width: 13%;background-color: rgb(183, 65, 65);color: white;"
                  @click="nexts"
                  >下一步</el-button
                >
              </div>
            </el-tab-pane>
            <el-tab-pane name="2">
              <div class="essential_top">
                <el-table
                  :data="splktableData"
                  ref="tableDatas"
                  tooltip-effect="dark"
                  border
                  stripe
                  style="fontSize:12px"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column
                    type="index"
                    width="45"
                    align="center"
                    label="序号"
                  ></el-table-column>
                  <el-table-column prop="code" label="商品编码" width="80">
                  </el-table-column>
                  <el-table-column
                    label="商品名称"
                    width="80"
                    prop="name"
                  >
                  </el-table-column>
                  <el-table-column label="规格型号" prop="spec"> </el-table-column>
                  <el-table-column label="计量单位" width="60" prop="goodsunit">
                  </el-table-column>
                  <el-table-column label="单价" prop="goodsPrice"> </el-table-column>
                  <el-table-column prop="applynum" label="计划需求数量">
                  </el-table-column>
                  <el-table-column label="未锁定数量">
                    <template slot-scope="scope">
                      <span @click="quantitys(scope.row)" class="wsdsl">{{
                        scope.row.nolocknum
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="已锁定数量">
                    <template slot-scope="scope">
                      <span @click="Loquantity(scope.row.index,scope.row)"  class="wsdsl">{{
                        scope.row. availablenum
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="未锁定立库数量" prop="goodswei">
                  </el-table-column>
                  <el-table-column label="已锁定立库数量" width="90" prop="lockedlk">
                  </el-table-column>
                  <el-table-column label="采购数量" width="90">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.goodslksl"
                        class="inputss"
                        @change="purchase"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="期货数量" width="60" prop="qihuo">
                  </el-table-column>
                  <el-table-column label="验收未入库数量" prop="goodswei"> </el-table-column>
                  <el-table-column label="安全库存" prop="goodswei"> </el-table-column>
                  <el-table-column label="年消耗数量" prop="goodswei"> </el-table-column>
                </el-table>
              </div>
              <div class="bottom">
                <el-button style="margin-top: 12px;width: 13%;" @click="splksyb"
                  >上一步</el-button
                >
                <el-button
                  style="margin-top: 12px;width: 13%;background-color: rgb(183, 65, 65);color: white;"
                  @click="splk"
                  >下一步</el-button
                >
              </div>
            </el-tab-pane>
            <el-tab-pane name="3">
              <div class="content">
                <h3>2020年度大修计划</h3>
                <div class="essential_top">
                  <p>基本信息</p>
                  <ul>
                    <li>
                      申请人:<span class="usname">{{ userane }}</span
                      ><i class="iconfont icon-user-3"></i>
                    </li>
                    <li>
                      申请部门:<span class="usname">维修中心</span
                      ><i class="iconfont icon-bumen"></i>
                    </li>
                    <li>资金类别:<span>大修</span></li>
                    <li>申请时间:<span>2019-11-12</span></li>
                  </ul>
                </div>
                <div class="essential_top">
                  <p style="margin-bottom: 26px;">项目信息</p>
                  <el-table
                    :data="yltableData"
                    ref="tableDatas"
                    tooltip-effect="dark"
                    border
                    stripe
                    style="fontSize:12px"
                  >
                    <el-table-column
                      property="goodsClass"
                      label="分类"
                      width="50"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="goodsCode"
                      label="编码"
                      width="50"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="goodsName"
                      label="商品/服务名称"
                      width="120"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="goodsModel"
                      label="规则型号/描述"
                      width="120"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="goodsunit"
                      label="单位"
                      width="50"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="goodsNumber"
                      label="提报数量"
                      width="50"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="purchaseNumber"
                      label="采购数量"
                      width="80"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="stockNumber"
                      label="库存数量"
                      width="80"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="goodsPrice"
                      label="预估单价"
                      width="100"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="goodsTotal"
                      label="预估总价"
                      width="100"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="goodsType"
                      label="类型"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="startDate"
                      label="计划实施时间"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="endDate"
                      label="计划交付时间"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="orgName"
                      label="提报单位"
                      align="center"
                      width="60"
                    ></el-table-column>
                    <el-table-column
                      property="address"
                      label="是否自购"
                      align="center"
                      width="60"
                    ></el-table-column>
                    <el-table-column
                      property="factoryName"
                      label="主机厂家"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="technologyDesc"
                      label="技术要求"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      property="remarks"
                      label="备注"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div>
                    <p style="margin-top: 12px">备注:<span>无</span></p>
                  </div>
                </div>
                <el-select
                  style="width:40%;"
                  @change="getUserId"
                  filterable
                  v-model="ruleForm.userId"
                  placeholder="请选择审核人"
                >
                  <el-option
                    v-for="m in userArr"
                    :label="m.name"
                    :value="m.id"
                    :key="m.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="bottom">
                <el-button
                  style="margin-top: 12px;width: 13%;"
                  @click="nextyulan"
                  >上一步</el-button
                >
                <el-button
                  style="margin-top: 12px;width: 13%;"
                  @click="submit(1)"
                  >存入草稿</el-button
                >
                <el-button
                  @click="submit(2)"
                  style="margin-top: 12px;width: 13%;background-color: rgb(183, 65, 65);color: white;"
                  >提交审核</el-button
                >
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 流程图遮罩内容 -->
    <el-dialog title="查看" :visible.sync="showModal" width="95%">
      <img src="../../../static/img/tu.jpg" />
    </el-dialog>
    <!-- 选择计划查看内容外层弹框 -->
    <el-dialog title="查看" :visible.sync="zxfcommodity" width="95%">
      <!-- 选择计划查看遮罩内容查看商品里层弹框 -->
      <el-dialog
        title="商品明细"
        :visible.sync="dialogTableVisible"
        width="95%"
        append-to-body
      >
        <Table :tableDatas="sptable" style="width:100%"></Table>
      </el-dialog>
      <div class="ztable">
        <div class="message">计划信息</div>
        <el-row :gutter="20">
          <el-col :span="6">计划名称: {{ planApply.title }}</el-col>
          <el-col :span="6">申请部门: {{ planApply.orgName }}</el-col>
          <el-col :span="6">申请人: {{ planApply.applyUsername }}</el-col>
          <el-col :span="6">申请时间: {{ planApply.applyDate }}</el-col>
        </el-row>
        <el-table
          :data="tableDatass"
          ref="table"
          tooltip-effect="dark"
          border
          stripe
          style="width: 95%"
        >
          <el-table-column prop="projectType" label="项目类别" align="center">
          </el-table-column>
          <el-table-column prop="projectName" label="项目名称" align="center">
          </el-table-column>
          <el-table-column
            prop="projectMoney"
            label="项目预估金额"
            class="zxfsh"
          >
          </el-table-column>
          <el-table-column prop="startDate" label="开始时间"> </el-table-column>
          <el-table-column prop="endDate" label="结束时间"> </el-table-column>
          <el-table-column prop="chargePerson" label="负责人">
          </el-table-column>
          <el-table-column prop="projectDesc" label="项目简介">
          </el-table-column>
          <el-table-column prop="fileNum" label="附件"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="selectGoodsList(scope.row.id)"
                >查看商品</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 资金汇总单编辑商品弹框 -->
    <el-dialog title="商品明细" :visible.sync="zxfbjsp" width="100%">
      <div class="operating" style="padding:0 30px;">
        <el-button size="small" type="primary" plain @click.prevent="addRow()"
          >增加行</el-button
        >
        <el-button size="small" type="primary" plain>复制行</el-button>
        <el-button size="small" type="primary" plain @click.prevent="delData()"
          >删除行</el-button
        >
        <el-button size="small" type="primary" plain>导入数据</el-button>
        <el-button size="small" type="primary" plain>全部删除</el-button>
        <el-input
          v-model="zxfsearch"
          style="display: inline-block;width: 30%;borderRight:none;margin-left: 33%;"
          placeholder="请输入搜索内容"
          prefix-icon="el-icon-search"
        >
        </el-input>
      </div>
      <div class="ztable" style="margin-top: 2%;">
        <el-table
          :data="tablebjsp"
          ref="table"
          tooltip-effect="dark"
          border
          stripe
          style="width: 100%"
          @selection-change="selectRows"
        >
          <el-table-column
            type="selection"
            width="45"
            align="center"
          ></el-table-column>
          <el-table-column label="分类" width="80" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsClass"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="编码" align="center" width="80">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsCode"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="商品/服务名称" width="120" class="zxfsh">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsName"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="规则型号/描述" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsModel"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="单位" width="60">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsunit"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="60">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsNumber"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="预估单价">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsPrice"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="预估总价">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsTotal"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.goodsType" placeholder="请选择">
                <el-option
                  v-for="item in optionss"
                  :key="item.value"
                  :label="item.label"
                  :value="item.typevalue"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="计划实施时间" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.startDate"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="计划交付时间" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.endDate" class="inputss"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="主机厂家">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.factoryName"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="技术要求">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.technologyDesc"
                class="inputss"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remarks" class="inputss"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="preserve ">
        <el-button plain @click="zxfbjsp = false">取消</el-button>
        <el-button type="primary" plain @click="save()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 商品立库的未锁定数量弹框 -->
    <el-dialog title="未锁定数量" :visible.sync="UnlockedQuantity" width="60%">
      <el-table :data="unlocked" border lazy>
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column property="num" label="数量"> </el-table-column>
        <el-table-column property="warehouse" label="仓库"> </el-table-column>
        <el-table-column property="shelf" label="货架"> </el-table-column>
        <el-table-column property="allocation" label="货位"> </el-table-column>
        <el-table-column property="substation" label="箱号"> </el-table-column>
        <el-table-column label="立库数量">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.StateQuantity"
              class="inputss"
              @input="addressChange(scope.row.id)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 50px;display: flex;justify-content:center">
        <el-button size="small" @click="UnlockedQuantity = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="NotConfirm"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <!-- 商品立库的已锁定数量弹框 -->
    <el-dialog title="已锁定数量" :visible.sync="LockedQuantity" width="60%">
      <el-table :data="unlockedStop" border lazy>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column property="projectname" label="项目名称">
        </el-table-column>
        <el-table-column property="number" label="数量"> </el-table-column>
        <el-table-column property="warehouse" label="仓库"> </el-table-column>
        <el-table-column property="shelf" label="货架"> </el-table-column>
        <el-table-column property="pos" label="货位"> </el-table-column>
        <el-table-column property="box" label="箱号"> </el-table-column>
        <el-table-column label="立库数量">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.StateQuantity"
              class="inputss"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 50px;display: flex;justify-content:center">
        <el-button size="small" @click="LockedQuantity = false">取消</el-button>
        <el-button size="small" type="primary" @click="determine">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/utils";
import {
  getAjax,
  postAjax,
  postAjaxJson,
  postAjaxx
} from "@/utils/ajaxRequest";
import Navbar from "@/views/layout/components/Navbar";
import Pagination from "@/components/Pagination";
import Table from "@/views/summary/components/table";
export default {
  components: {
    Navbar,
    Table,
    Pagination
  },
  data() {
    return {
      userArr: [],
      nextDisabled: true,
      userane: "", //当前申请人
      input1: "", //选择计划搜索框
      active: 0, //步骤条
      activeModel: "",
      dynamicValidateForm: {
        usename: "" //汇总单名称
      },
      showModal: false, //流程图
      activeName: "1", //标签切换页
      zxfcommodity: false, //选择计划查看弹框
      dialogTableVisible: false, //查看商品
      zxfbjsp: false, //计划汇总编辑商品弹框
      zxfcksptk: false, //预览查看商品弹框
      zxftypevalue: "", //是否核制
      jihuahuizong: "", //计划汇总备注input
      goodslksl: "", //计划汇总已锁定立库数量
      UnlockedQuantity: false, //商品立库未锁定数量弹框
      LockedQuantity: false, //商品立库已锁定数量弹框
      xztableData: [],
      //计划汇总表格
      jhhzdtableData: [
        {
          goodsClass: "",
          goodsCode: "",
          goodsName: "",
          goodsModel: "",
          goodsunit: "",
          goodsNumber: "",
          goodsPrice: "",
          goodsTotal: "",
          goodsType: "",
          startDate: "",
          endDate: "",
          factoryName: "",
          technologyDesc: "",
          remarks: ""
        }
      ],
      //商品立库表格数据
      splkObj: {},
      splktableData: [
        {
          name: "111",
          goodswei: "", //未锁定立库数量
          Program: "6", //计划需求数量
          shopingName: "牙刷", //商品名称
          locknum: "7", //未锁定数量
          Loquantity: "", //已锁定数量

        },
        {
          name: "111",
          goodswei: "", //未锁定立库数量
          Program: "3", //计划需求数量
          shopingName: "牙刷",
          quantity: "7",
          Loquantity: "",
          arr: [
            {
              num: 2
            },
            {
              num: 3
            }
          ]
        },
        {
          name: "112",
          goodswei: "", //未锁定立库数量
          shopingName: "口罩", //商品名称
          quantity: "6",
          Loquantity: "",
          arr: [
            {
              num: 2
            },
            {
              num: 3
            }
          ]
        }
      ],
      yltableData: [
        //预览表格
        {
          goodsClass: "",
          goodsCode: "",
          goodsName: "",
          goodsModel: "",
          goodsunit: "",
          goodsNumber: "",
          purchaseNumber: "",
          stockNumber: "",
          goodsPrice: "",
          goodsTotal: "",
          goodsType: "",
          startDate: "",
          endDate: "",
          orgName: "",
          address: "",
          factoryName: "",
          technologyDesc: "",
          remarks: ""
        }
      ],
      tableDatas: [
        //计划名称表格
        {
          id: 1,
          name: ""
        }
      ],
      tableDatass: [
        //查看表格
        {
          id: 1
          // usname:'',
        }
      ],
      sptable: [],
      optionss: [
        //资金汇总单编辑商品选择下拉
        {
          typevalue: "物资"
        },
        {
          typevalue: "设备"
        },
        {
          typevalue: "工程"
        }
      ],
      options: [
        //是否核准制下拉框
        {
          zxftypevalue: "是"
        },
        {
          zxftypevalue: "否"
        }
      ],
      typevalue: "物资", //默认商品选择下拉
      editableTabsValue: "1",
      editableTabs: [
        //动态标签页
        {
          title: "安全资金计划",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "折旧资金计划",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tablebjsp: [
        //资金汇总编辑商品弹框表格
        {
          goodsClass: "",
          goodsCode: "",
          goodsName: "",
          goodsModel: "",
          goodsunit: "",
          goodsNumber: "",
          purchaseNumber: "",
          stockNumber: "",
          goodsPrice: "",
          goodsTotal: "",
          goodsType: "",
          startDate: "",
          endDate: "",
          orgName: "",
          address: "",
          factoryName: "",
          technologyDesc: "",
          remarks: ""
        }
      ],
      //标记点击的是哪一行
      rowindex:0,
      selectlistRow: [], //编辑商品存放表格数据
      zxfsearch: "", //计划汇总模糊搜索
      zxfcksp: [
        //资金预览步骤查看商品
        {}
      ],
      // 未锁定数量弹框表格数据
      unlocked: [
        {
          id: 1,
          quantity: "",
          warehouse: "1号仓库",
          shelf: "1号货架",
          allocation: "1号货位",
          substation: "1号箱",
          StateQuantity: "" //立库数量
        },
        {
          id: 2,
          quantity: "",
          warehouse: "1号仓库",
          shelf: "1号货架",
          allocation: "1号货位",
          substation: "1号箱",
          StateQuantity: "" //立库数量
        }
      ],
      // 已锁定数量弹框表格数据
      unlockedStop: [{}],
      // 默认初始的未锁定立库数量
      sum: 0,
      applyDate: "",
      applyusername: "",
      orgName: "",
      assigneeExpressionText: "",
      ruleForm: {
        title: "",
        userId: "",
        searchValue: ""
      },
      name: "",
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      planApply: {},
      selectPlanId: "",
      kckyl:''
    };
  },
  created() {
    this.getList();
    this.applyDate = parseTime(new Date(), "{y}-{m}-{d}");
    this.applyusername = sessionStorage.userName;
    this.orgName = sessionStorage.orgName;
    postAjaxJson(
      `/api/processService/userTask/getFirstExaminePerson/dzyhydcghzjh`
    ).then(res => {
      if (res.code == 0) {
        this.userArr = res.data;
        console.info(JSON.stringify(this.userArr));
      }
    });
  },
  methods: {
    selectPlanList(e) {
      if (e === []) {
        this.nextDisabled = true;
      }
      var arr = [];
      e.forEach(item => {
        arr.push(item.apply_id);
      });
      this.selectPlanId = arr.join(",");
      console.log(this.selectPlanId);
      this.nextDisabled = false;
    },
    tableRowClassName ({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
    selectGoodsList(id) {
      this.dialogTableVisible = true;
      // 获取商品信息
      getAjax(
        `/api/planmanagementService/PlanImplementproject/{month}/${id}`
      ).then(res => {
        console.log(res);
        this.sptable = res.data;
      });
    },
    planSelectList(id) {
      this.zxfcommodity = true;
      getAjax(
        `/api/planmanagementService/PlanImplementproject/monthPlan/{applyId}?applyId=${id}`
      ).then(res => {
        console.log(res);
        this.tableDatass = res.data.planImplementprojectList;
        this.planApply = res.data.planApply;
      });
    },
    SearchKeyWord() {
      this.getList();
    },
    getList() {
      getAjax(
        `/api/planmanagementService/lowValueMonthCon/findImplementData?pageNumber=${this
          .listQuery.page - 1}&pageSize=${
          this.listQuery.limit
        }&formId=${this.$route.query.id}&title=${this.input1}`
      ).then(res => {
        console.log(res);
        this.xztableData = res.data.content;
        this.total = res.data.totalElements;
        console.log("汇总计划单");
      });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //商品立库未锁定数量弹框
    quantitys(row) {
      this.UnlockedQuantity = true;
      this.splkObj = row;
      this.unlocked = row.arr;
      getAjax(
        `/api/goodsService/store/list?search_eq_goodscode=GD00006&projectid=no `
      ).then(res => {
        console.log(res);
        this.unlocked = res.data;
      });
      console.log(this.sum);

    },
    // 未锁定数量输入框监听
    addressChange(row, val) {
      console.log(row, val);
      var obj = this.unlocked;
    },
    //商品立库已锁定数量弹框
    Loquantity(index,row) {
      this.rowindex = index
      console.log(index)
      console.log(row)
      if(this.splktableData[index].lockedlk == null || this.splktableData[index].lockedlk == '' || this.splktableData[index].lockedlk == undefined){
        this.splktableData[index].lockedlk = row.availablenum
      }
      this.LockedQuantity = true;
      getAjax(
        `/api/goodsService/store/list?search_eq_goodscode=${row.code} `
      ).then(res => {
        console.log(res);
        this.unlockedStop = res.data;
      });
    },
    //未锁定数量确定保存数据
    NotConfirm() {
      this.UnlockedQuantity = false;
      console.log(this.unlocked);
      var total = 0;
      var arr1 = _.map(this.unlocked, val => {
        return val.num - val.StateQuantity;
      });
      total = _.reduce(
        arr1,
        function(memo, num) {
          return memo + num;
        },
        0
      );
      console.log(total);
      _.forEach(this.splktableData, val => {
        if (val.name == this.splkObj.name) {
          val.arr = this.unlocked;
          val.quantity = total;
        }
      });
    },
    determine(){
      this.LockedQuantity = false;
      var total = 0;
      this.unlockedStop.forEach(val=>{
        if(val.StateQuantity!=''){
            total+=Number(val.StateQuantity)
            // this.splktableData[0].goodswei=total
        }    
      })    
      console.log(total)
      this.splktableData[this.rowindex].lockedlk = total
    },
    // purchase(){
      
    // },
    getUserId(value) {
      _.forEach(this.userArr, val => {
        if (this.ruleForm.userId == val.id) {
          this.assigneeExpressionText = val.assigneeExpressionText;
          this.departId = val.departId;
          this.name = val.name;
        }
      });
    },
    //提交审核
    submit(isType) {
      var param = {
        planApply: {
          applyDate: parseTime(new Date(), "{y}-{m}-{d}"),
          applyRecord: "",
          applyState: isType,
          applyType: "",
          applyUsername: sessionStorage.userName,
          applyresult: "",
          createDate: parseTime(new Date(), "{y}-{m}-{d}"),
          createUser: sessionStorage.userId,
          deleteDate: "",
          deleteUser: "",
          flowId: "",
          formId: "",
          id: "",
          orgId: "",
          orgName: "",
          orgType: "",
          planClass: "",
          raskMark: "",
          remarks: "",
          title: "低值易耗汇总",
          updateDate: "",
          updateUser: "",
          useable: "1"
        },
        planCollect: {
          applyDate: "",
          applyId: "",
          belongMonth: "",
          belongYear: "",
          collectType: "1",
          createDate: "1",
          createUser: sessionStorage.userId,
          deleteDate: "1",
          deleteUser: "1",
          endDate: "1",
          formClass: "1",
          formId: "1",
          handleDate: "1",
          handleOrgId: "1",
          handleOrgName: "",
          handleOrgType: "",
          orgId: "",
          orgName: "1",
          orgType: "1",
          planDesc: "1",
          planType: "1",
          remarks: "1",
          replyId: "1",
          sendDate: "1",
          sendUserid: "1",
          sendUsername: "1",
          startData: "1",
          summaryName: "",
          title: "低值易耗汇总",
          updateDate: "",
          updateUser: "",
          useable: ""
        },
        planCollectGoodsList: [
          {
            beforeId: "",
            budgetProjectId: "",
            createUser: sessionStorage.userId,
            deleteDate: "",
            deleteUser: "",
            endDate: "",
            factoryName: "",
            goodsClass: "",
            goodsCode: "2",
            goodsModel: "2",
            goodsName: "测试123",
            goodsNumber: 0,
            goodsPrice: 0,
            goodsTotal: 0,
            goodsType: "",
            goodsunit: "2",
            purchaseNumber: 0,
            remarks: "22222",
            startDate: "22222",
            stockNumber: 0,
            technologyDesc: "222"
          }
        ],
        planGoodssourceList: [
          {
            goodsId: "",
            goodsMark: "",
            lockMark: "锁定",
            remark: "333",
            sourceOrder: "3",
            stockBoxCode: "3",
            stockGoodsCode: "3",
            stockGoodsId: "3",
            stockLocationCode: "3",
            stockNumber: 0,
            stockProject: "3",
            stockShelvesCode: "3",
            stockcode: "3",
            useGoodsNumber: "",
            useable: "1"
          }
        ],
        planImplementList: [
          {
            applyDate: "",
            applyId: "",
            beforeId: "",
            belongMonth: "",
            belongYear: "",
            chargeDesc: "",
            createDate: "",
            createUser: sessionStorage.userId,
            deleteDate: "",
            deleteUser: "",
            endDate: "",
            formClass: "",
            formId: "",
            fundsType: "",
            handleDate: "",
            handleOrgId: "",
            handleOrgName: "",
            handleOrgType: "",
            orgId: "",
            orgName: "",
            orgType: "",
            planDesc: "",
            planType: "",
            remarks: "",
            startData: "",
            title: "",
            useable: "1"
          }
        ],
        startWorkflowParameterVo: {
          assigneeExpressionText: this.assigneeExpressionText,
          departId: this.departId,
          deploymentKey: "dzyhydcghzjh",
          id: this.ruleForm.userId,
          name: this.name,
          userId: sessionStorage.userId
        },
        submitType: isType
      };
      console.info(JSON.stringify(param));
      postAjaxx(
        "/api/planmanagementService/lowValueMonthCon/saveLowValGoodsCollect",
        JSON.stringify(param)
      ).then(res => {
        if (res.code == 0) {
          this.$message("成功");
          this.$router.push({
            path: "/home/index"
          });
        } else {
          this.$message(res.message);
        }
      });
    },
    //计划汇总步骤下一步
    next() {
      this.active = 1;
      this.activeModel = this.active + "";
      getAjax(
        `/api/planmanagementService/goods/applyGoodsIds?applyGoodsIds=${
          this.selectPlanId
        }`
      ).then(res => {
        console.log(res);
        this.jhhzdtableData = res.data;
      });
    },

    //计划汇总步骤上一步
    last() {
      this.active = 0;
      this.activeModel = this.active + "";
    },
    //计划汇总下一步
    nexts() {
      this.$refs["dynamicValidateForm"].validate(valid => {
        if (!valid) {
          return this.$message("请输入汇总单名称");
        }
        this.active = 2;
        this.activeModel = this.active + "";
        var parmer={

        }
        getAjax(
          `/api/goodsService/vwstorestatistics/goodsSetUpStorePageList`,parmer
          ).then(res => {
          console.log(res.data);
          this.splktableData = res.data.content;
          
        });

      });
    },
    //商品立库上一步
    splksyb() {
      this.active = 1;
      this.activeModel = this.active + "";
    },
    //商品立库下一步
    splk() {
      this.active = 3;
      this.activeModel = this.active + "";
      getAjax(
        `/api/planmanagementService/goods/applyGoodsIds?applyGoodsIds=${
          this.selectPlanId
        }`
      ).then(res => {
        console.log(res);
        this.yltableData = res.data;
      });
    },
    //预览步骤上一步
    nextyulan() {
      this.active = 2;
      this.activeModel = this.active + "";
    },

    // 获取表格选中时的数据
    selectRows(val) {
      this.selectlistRow = val;
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 添加商品增加行
    addRow() {
      var list = {
        rowNum: "",
        coding: this.coding, //编码
        name: this.name, //名称
        monad: this.monad, //单位
        quantity: this.quantity, //数量
        estimate: this.estimate, //预估单价
        prices: this.prices, //预估总价
        describe: this.describe //描述
      };
      this.tableDatasss.unshift(list);
    },
    // 删除商品增加行
    delData() {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        let val = this.selectlistRow;
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.tableDatasss.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              // i 为选中的索引
              this.tableDatasss.splice(i, 1);
            }
          });
        });
      }
      // 删除完数据之后清除勾选框
      this.$refs.tableDatasss.clearSelection();
    }
  }
  // created() {
  //     // let xqName=this.$route.query.formName
  //     // this.formName=xqName
  //     let xqid=this.$route.query.id
  // },
};
</script>
<style scoped>
.route {
  margin-top: 60px;
  height: 50px;
  line-height: 50px;
  background-color: rgb(216, 216, 216);
  padding: 0 20px;
  cursor: pointer;
}
.route > span {
  font-size: 13px;
}
.content {
  width: 98%;
  /* margin: 10px auto; */
  /* background-color: antiquewhite; */
  min-height: 500px;
}
.message {
  background-color: #ccc;
  line-height: 35px;
  padding-left: 15px;
}
.el-row {
  margin: 20px;
}
.essential_top > p {
  height: 45px;
  line-height: 45px;
  padding: 0 22px;
  background-color: rgba(243, 243, 243, 0.829);
  font-size: 15px;
}
.essential_top > ul {
  display: flex;
  justify-content: space-between;
  height: 75px;
  line-height: 75px;
  padding: 0 28px;
}
.essential_top > ul > li {
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
  z-index: 1;
}
.pop {
  background-color: #fff;
  position: fixed;
  top: 100px;
  left: 300px;
  width: calc(100% - 600px);
  height: calc(100% - 200px);
  z-index: 2;
}
.Merchandise {
  background-color: #fff;
  position: fixed;
  top: 100px;
  width: 100%;
  min-height: 300px;
  z-index: 2;
}
.Merchandises {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
}
.zxfaggregate {
  margin-top: 20px;
  font-size: 14px;
}
/* 提交审核 */
.bottom {
  display: flex;
  justify-content: flex-end;
}
.preserve {
  margin-top: 2%;
  display: flex;
  justify-content: center;
}
.content {
  width: 98%;
  margin: 10px auto;
}
.content > h3 {
  text-align: center;
  margin: 30px 0;
  color: #505050;
}
.essential_top > p {
  height: 45px;
  line-height: 45px;
  padding: 0 22px;
  background-color: rgba(243, 243, 243, 0.829);
  font-size: 15px;
}
.essential_top > ul {
  display: flex;
  justify-content: space-between;
  height: 75px;
  line-height: 75px;
  padding: 0 28px;
}
.essential_top > ul > li {
  font-size: 14px;
}
.wsdsl {
  cursor: pointer;
  color: #0058ff;
}
</style>
