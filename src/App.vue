<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App'
}
</script>
<style>
  h3{
    text-align: center;
    margin: 10px 0;
  }
   #app{
   	  height: 100%;
   }
    .app-container{
      margin:20px 15px !important;
      padding: 20px;
      background: #fff;
    	min-height: 490px;
    }
    .el-table th{
    	background:rgba(237,237,237,1);
    }
    ul,li{
      list-style: none;
    }
    *{
      padding: 0;
      margin: 0;
      box-sizing:border-box;
    }
    a{
    text-decoration: none;
  }
</style>
