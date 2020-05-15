<template>
	<div class="app-container">
		<div class="filter-container">
			<div class="filter-item el-input el-input--medium" style="width: 200px;">
				<el-input type="text" v-model="search" autocomplete="off" placeholder="请输入搜索内容" clearable></el-input>
			</div>
			<button type="button" @click="searchClick()" class="el-button filter-item el-button--primary el-button--medium">
			<i class="el-icon-search"></i>
			<span>搜索</span>
		</button>
			<el-button type="text" style="margin-left: 10px;float: right;color:#606266" @click="handleCreate">	
			<i class="el-icon-plus"></i>
			<span>添加</span>
		</el-button>
		</div>
		<el-table v-loading="listLoading" :data="list" fit highlight-current-row class="tableWidth">
			<el-table-column label="序号" prop="key" align="center">
			</el-table-column>
			<el-table-column label="房间类型" prop="name" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<span @click="handleUpdate(scope.row)" class="pointer">
			          		<el-tag>编辑</el-tag>
			          	</span>
					<span @click="handleDelete(scope.row)" class="pointer">
			                <el-tag type="danger">删除</el-tag>
				       </span>
				</template>

			</el-table-column>
		</el-table>

		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
			
	   <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
				<el-form-item label="房间类型" prop="name">
					<el-input v-model="temp.name" placeholder="请输入楼栋号" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
			</div>
		</el-dialog>		
		<!-- 禁用提示框 -->
		<el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
			<span>确定要删除房间类型吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="forbiddenDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteBtn">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '@/components/Pagination'
	export default {
		components: {
			Pagination
		},
		data() {
			return {
				search: "",
				list:[],
				total:0,
				listQuery:{
					page:1,
					limit:10
				},
				textMap: {
					update: '修改房间类型',
					create: '添加房间类型'
				},
				dialogStatus:"",
				dialogFormVisible:false,
				deleteDialogVisible:false,
				 listLoading: true,
				 temp: {},
				 rules:{
				 	name: [{
						required: true,
						message: '房间类型是必填项',
						trigger: 'blur'
					}]
				 },
				 
			}
		},
		created(){
			this.getList();
		},
		methods: {
			searchClick() {

			},
			getList(){
				this.listLoading=false;
				this.list=[];
				for(var i=0;i<10;i++){
					this.listLoading=false;
					this.list.push({
						key:i+1+this.listQuery.limit*(this.listQuery.page-1),
						name:'3人间'+(i+1)+this.listQuery.limit*(this.listQuery.page-1),
					});
				}
				this.total=100;
			},
			handleCreate() {
                this.temp={};
				this.dialogStatus = 'create'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			createData(){
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {
						
					}
				});
			},
			handleUpdate(row){
				this.temp = Object.assign({}, row) // copy obj
				this.dialogStatus = 'update';
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			updateData(){
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {
						
					}
				});
			},
			handleDelete(row){
				this.deleteDialogVisible=true;
			},
			deleteBtn(){
				this.deleteDialogVisible=false;
			}
		}
	}
</script>

<style>

</style>