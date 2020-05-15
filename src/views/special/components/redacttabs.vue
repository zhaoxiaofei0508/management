<template>
    <div>
        <div class="Merchandise"> 
            <div class="Merchandises">
                <span>商品明细</span>
                <i class="el-icon-close" @click="Merchandise=false"></i>
            </div>
            <div class="operating" style="padding:20px 30px;">
                <el-button size="small" type="primary" plain @click.prevent="addRow()">增加行</el-button>
                <el-button size="small" type="primary" plain>复制行</el-button>
                <el-button size="small" type="primary" plain @click.prevent="delData()">删除行</el-button>
                <el-button size="small" type="primary" plain>导入数据</el-button>
                <el-button size="small" type="primary" plain>全部删除</el-button>
                <el-input v-model="search" style="display: inline-block;width: 30%;borderRight:none;margin-left: 36%;" 
                placeholder="请输入搜索内容" icon="el-icon-search">
                </el-input>
            </div>
            <div class="ztable">
                <el-table 
                    :data="zxfRefome"
                    ref="table"
                    tooltip-effect="dark"
                    border
                    stripe
                    style="width: 100%"  
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="45" align="center"></el-table-column>
                    <el-table-column label="分类"  width="80" align="center" prop='name'>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.coding" class='inputss'></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column  label="编码" align="center" width="80" prop=''>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.endcoding" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="商品/服务名称" width="120" class="zxfsh" prop=''>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.goodsName" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="规则型号/描述" width="120">
                    <template slot-scope="scope" prop=''>
                        <el-input v-model="scope.row.describe" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column prop="" label="单位" width="60">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.monad" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="数量" width="60" prop=''>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.quantity" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="预估单价" prop=''>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.estimate" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="预估总价" prop=''>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.prices" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="类型" prop=''>
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
                    <el-table-column label="计划实施时间" width="120" prop=''>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.implementation" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="计划交付时间" width="120" prop=''>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.delivery" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="主机厂家" prop=''>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.manufacturers" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="技术要求" prop=''>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.requirements" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="备注" prop=''>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark" class='inputss'></el-input>
                    </template>
                    </el-table-column>
                    <el-table-column label="操作" >
                        <template slot-scope="scope">
                            <el-button type="type" size="small" @click="Merchandise=true">编辑商品</el-button>
                        </template> 
                    </el-table-column>
                </el-table>
            </div>
            <div class="preserve">
                <el-button plain>取消</el-button>
                <el-button type="primary" plain>确定</el-button>
            </div>
        </div>
  </div>
</template>

<script>
export default{
    props:[ "zxfRefome"],
    data() {
        return {
            Merchandise:false,//弹出框
            // zxfRefome:[
            //     {

            //     }
            // ],
            multipleSelection: []
        }
    },
    methods: {
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
       // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val
        },
      // 删除商品增加行
       delData () {
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
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
       //选择复选框数据
        // handleSelectionChange(val) {
        //     this.multipleSelection = val;
        // },
          //上移
    //     moveUp(index,row){
    //     var that = this;
    //     console.log('上移',index,row);
    //     console.log(that.URLModles[index]);
    //     if (index > 0) {
    //       let upDate = that.URLModles[index - 1];
    //       that.URLModles.splice(index - 1, 1);
    //       that.URLModles.splice(index,0, upDate);
    //     } else {
    //       alert('已经是第一条，不可上移');
    //     }
    //   },
    },
}
</script>
<style scoped>
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
/* 弹框取消确定 */
.preserve{
    display: flex;
    justify-content: center;
    height: 50px;
    margin-top: 2%;
}
.preserve>button{
    width: 7%;
    height: 36px;
}
</style>
