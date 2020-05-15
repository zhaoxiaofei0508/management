<template>
  <div>
    <div class="main_heander">
      <el-input
        @input="searchKeyWords"
        style="width: 350px"
        v-model="searchTitle"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="primary" @click="addPlanList">添加</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column width="55px" type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="formName" label="计划名称" align="center">
      </el-table-column>
      <el-table-column label="操作" width="55px">
        <template slot-scope="scope" align="center">
          <el-button type="text" @click="deletePlan(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="totalDone>0" :total="totalDone" :page.sync="listQueryDone.page" :limit.sync="listQueryDone.limit" @pagination="getTableList" />

    <el-dialog title="计划类型选择" :visible.sync="dialogVisible" width="50%">
      <el-table
        border
        :data="planTableData"
        @selection-change="selectPlanList"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          label="序号"
          align="center"
          width="55"
        >
        </el-table-column>
        <el-table-column align="center" prop="formName" label="计划名称">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfigDialogVisible">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAjax,
  postAjaxx,
  putAjax,
  deleteAjax,
  postAjaxJson
} from "@/utils/ajaxRequest";
	import Pagination from '@/components/Pagination'

export default {
  components: {
			Pagination,
		},
  data() {
    return {
      listQueryDone: {
        limit: 10,
        page: 1,
      },
      totalDone: 0,
      search: "",
      planTableData: [],
      dialogVisible: false,
      item: {
        xh: "1",
        jh: "研发部",
        cz: ""
      },
      tableData: [],
      selectPlanData: [],
      searchTitle: ""
    };
  },
  created() {
this.getTableList()
  },
  methods: {
    searchKeyWords(e) {
      this.searchTitle = e
      this.getTableList()
    },
    getTableList() {
      getAjax(
        `/api/planmanagementService/planSendimplement/pageList?formName=${
          this.searchTitle
        }&pageNumber=${this.listQueryDone.page - 1}&pageSize=${this.listQueryDone.limit}`
      ).then(res => {
        this.tableData = res.data.content;
        console.log(res);
        this.totalDone = res.data.totalElements
      });
    },
    comfigDialogVisible() {
      this.dialogVisible = false;
      var obj = [];
      this.selectPlanData.forEach(item => {
        obj.push(item.id);
      });
      obj = obj.join(",");
      console.log(obj);
      putAjax(
        `/api/planmanagementService/planSendimplement/updateAndById/${obj}`
      ).then(res => {
        this.getTableList()
        console.log(res);
      });
    },
    selectPlanList(e) {
      this.selectPlanData = e;
    },
    addPlanList() {
      getAjax(
        "/api/planmanagementService/planSendimplement/listNoStatus?formName=&pageNumber=0&pageSize=10"
      ).then(res => {
        this.planTableData = res.data.content;
        console.log(res);
        this.getTableList()
      });
      this.dialogVisible = true;
    },
    deletePlan(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteAjax(
            `/api/planmanagementService/planSendimplement/delete/${id}`
          ).then(res => {
            if (res.code === "0") {
              this.getTableList()
            }
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.main_heander {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
