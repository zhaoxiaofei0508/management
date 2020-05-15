<template>
  <div class="zxfresult">
    <p>审核结果</p>
    <div class="zxfconsequence">
      <span>审核结果</span>
      <el-select v-model="value" @change="selectGet">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
    </el-select>
    <div class="explain">
      <span style="display: inline-block;position: absolute;top:-3%;">审核说明</span>
      <textarea @input="inputChanged($event)" style="height: 80%;width:60%;margin-left: 8%;padding:5px 5px;"></textarea>
    </div>
    <div class="auditor">
      <span>选择审核人</span>
      <el-select v-model="valuename" @change="selectGetname">
        <el-option
          v-for="item in optionsname"
          :key="item.valuename"
          :label="item.label"
          :value="item.valuename">
        </el-option>
      </el-select>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // textarea:'',
        value: '',//审核结果
        valuename: '',//审核人
      }
  },
  props: {
    // textarea: {
    //   type: String,
    //   default: ''
    // },
    optionsname:{
      type: Array,
      default: () =>{
        return [];
      }
    },
    options:{
      type: Array,
      default: () =>{
        return [];
      }
    }

  },
  created(){
    
  },
  methods: {
    selectGet(vId){//这个vId也就是value值
      this.$emit('selectGet', vId);
      // console.log(this.value)
    },
    selectGetname(vId){//这个vId也就是valuename值
      this.$emit('selectGetname', vId);
      // console.log(this.valuename)
    },
    inputChanged: function($event) {
      this.$emit("inputChanged", $event); //将值放在自定义的事件函数中作为参数
    }
  },
  computed: {
    
  }
}
</script>

<style scoped>
.zxfresult{
  width: 90%;
  margin: 10px auto;
  /* min-height: 500px; */
}
.zxfresult>p{
  height: 66px;
  font-size: 20px;
  padding-top: 20px;
}
.el-select{
  width: 60%;
  margin-left: 2%;
}
.explain{
  height: 100px;
  line-height: 100px;
  position: relative;
  margin-top: 33px;
}
.auditor{
  margin-top: 10px;
}
</style>
