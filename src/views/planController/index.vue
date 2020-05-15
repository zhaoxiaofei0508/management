<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo"
        unique-opened
        text-color="#fff"
        background-color="#000918">
        <el-menu-item index="/home">
          <span slot="title">首页</span>
        </el-menu-item>
        <template v-for="item in globalSupplierData">
          <el-submenu :index="item.id+ ''">
            <template slot="title">
              <span>{{ item.formName }}</span>
            </template>
            <template v-for="items in item.children">
              <el-submenu :index="items.id+ ''">
                <template slot="title">
                  <span>{{items.formName}}</span>
                </template>
                <template v-for="value in items.children">
                  <el-menu-item :index="'/plan/planSearch?id='+ value.id+'&planClass='+items.formName">{{value.formName}}</el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-submenu>
        </template>
        <el-submenu index="456">
          <template slot="title">
            <span>设置</span>
          </template>
          <el-menu-item index="/plan/planSend">计划下发</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <div style="float: right;">
            <span>王华</span>
            <span>退出</span>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getAjax, postAjaxx, postAjaxJson } from '@/utils/ajaxRequest'
export default {
  data() {
    return {
      globalSupplierData: []
    };
  },
  created() {
    // 左侧菜单数据
    getAjax("/api/planmanagementService/PlanProjectSelect/findPlanPageTypeList").then(res => {
      console.log(res);
      var arr = []
      arr.push(
        {
          formName: '年度汇总计划',
          id: 1,
          children: []
        },
        {
          formName: '月度实施计划汇总',
          id: 2,
          children: []
        },
        {
          formName: '月度实施计划提报',
          id: 3,
          children: []
        },
        {
          formName: '年度预算计划',
          id: 4,
          children: []
        },
      )
      arr[0].children = res.data.Budgetcollectplan
      arr[1].children = res.data.Implementcollectplan
      arr[2].children = res.data.implementplan
      arr[3].children = res.data.yearplan
      this.globalSupplierData.push(
        {
          formName: '计划查询',
          id: 444,
          children: []
        }
      )
      this.globalSupplierData[0].children =  arr
      console.log(this.globalSupplierData)
    });
  },
  methods: {}
};
</script>

<style>
.el-header {
  background-color: #000;
  color: #fff;
  line-height: 60px;
  div {
    font-size: 16px;
  }
}
.el-menu {
  height: 100%;
}
.el-aside {
  color: #333;
}
</style>
