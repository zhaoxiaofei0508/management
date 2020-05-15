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
		<tree-table v-loading="listLoading" :data="list" :columns="columns" :default-expand-all="defaultExpandAll">
			<template slot-scope="{scope}">
				<span>{{scope.row.name}}</span>
			</template>
			<template slot="operation" slot-scope="{scope}" v-if="!scope.row.key">
				<span @click="handleView(scope.row)" class="pointer">
			          		<el-tag>查看</el-tag>
			          	</span>
				<span @click="handleUpdate(scope.row)" class="pointer">
			          		<el-tag>编辑</el-tag>
			          	</span>
				<span @click="handleDelete(scope.row)" class="pointer">
			                <el-tag type="danger">删除</el-tag>
				      </span>
			</template>
		</tree-table>

		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
				<el-form-item label="楼栋号" prop="level">
					<el-select v-model="temp.level" filterable placeholder="请选择楼栋号" style="width:100%;">
						<el-option v-for="item in floorArr" :key="item.key" :label="item.name" :value="item.key">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="楼层" prop="name">
					<el-input v-model="temp.name" placeholder="请输入楼层" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" v-if="dialogStatus==='create'" @click="createDataClear()">确认并继续添加</el-button>
				<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
			</div>
		</el-dialog>
		<!-- 禁用提示框 -->
		<el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
			<span>确定要删除该楼栋吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="forbiddenDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteBtn">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '@/components/Pagination'
	import treeTable from '@/components/TreeTable'
	export default {
		components: {
			treeTable,
			Pagination
		},
		data() {
			return {
				search: "",
				list: [],
				floorArr: [],
				total: 0,
				listQuery: {
					page: 1,
					limit: 10
				},
				textMap: {
					update: '修改楼栋',
					create: '添加楼栋'
				},
				defaultExpandAll:false,
				columns: [{
						label: '楼层名称',
						key: 'name',
						expand: true,
						align: 'left'
					},
//					{
//						label: '在职人数',
//						key: 'Incumbency'
//					},
					{
						label: '操作',
						key: 'operation',
						align: 'left'
					}
				],
				dialogStatus: "",
				dialogFormVisible: false,
				deleteDialogVisible: false,
				listLoading: true,
				temp: {},
				rules: {
					name: [{
						required: true,
						message: '楼栋号是必填项',
						trigger: 'blur'
					}]
				},

			}
		},
		created() {
			this.initList();
			this.getList();
		},
		methods: {
			initList() {
				this.floorArr = [];
				for(var i = 0; i < 10; i++) {
					this.listLoading = false;
					this.floorArr.push({
						key: i + 1 + this.listQuery.limit * (this.listQuery.page - 1),
						name: '楼' + (i + 1) + this.listQuery.limit * (this.listQuery.page - 1),
					});
				}
			},
			searchClick() {

			},
			getList() {
				this.listLoading = false;
				this.list = [];
				this.list=[
				   {
				   	 key:1,
				   	  name:'1号公寓',
				   	  children:[
				   	     {
				   	     	name:'1层',
				   	     	level:'1号公寓'
				   	     },
				   	      {
				   	     	name:'2层',
				   	     	level:'1号公寓'
				   	     },
				   	      {
				   	     	name:'3层',
				   	     	level:'1号公寓'
				   	     },
				   	      {
				   	     	name:'4层',
				   	     	level:'1号公寓'
				   	     }
				   	  ]
				   },
				   {
				   	 key:2,
				   	  name:'2号公寓',
				   	  children:[
				   	     {
				   	     	name:'1层',
				   	     	level:'2号公寓'
				   	     },
				   	      {
				   	     	name:'2层',
				   	     	level:'2号公寓'
				   	     },
				   	      {
				   	     	name:'3层',
				   	     	level:'2号公寓'
				   	     },
				   	      {
				   	     	name:'4层',
				   	     	level:'2号公寓'
				   	     }
				   	  ]
				   },
				   {
				   	 key:3,
				   	  name:'3号公寓',
				   	  children:[
				   	     {
				   	     	name:'1层',
				   	     	level:'3号公寓'
				   	     },
				   	      {
				   	     	name:'2层',
				   	     	level:'3号公寓'
				   	     },
				   	      {
				   	     	name:'3层',
				   	     	level:'3号公寓'
				   	     },
				   	      {
				   	     	name:'4层',
				   	     	level:'3号公寓'
				   	     }
				   	  ]
				   },
				   {
				   	 key:4,
				   	  name:'办公楼',
				   	  children:[
				   	     {
				   	     	name:'1层',
				   	     	level:'办公楼'
				   	     },
				   	      {
				   	     	name:'2层',
				   	     	level:'办公楼'
				   	     },
				   	      {
				   	     	name:'3层',
				   	     	level:'办公楼'
				   	     },
				   	      {
				   	     	name:'4层',
				   	     	level:'办公楼'
				   	     }
				   	  ]
				   }
				];
//				for(var i = 0; i < 10; i++) {
//					this.listLoading = false;
//					this.list.push({
//						key: i + 1 + this.listQuery.limit * (this.listQuery.page - 1),
//						name: '楼' + (i + 1) + this.listQuery.limit * (this.listQuery.page - 1),
//						level: (i + 1) + this.listQuery.limit * (this.listQuery.page - 1),
//					});
//				}
				this.total = 4;
			},
			//查看
			handleView(row){
				this.$router.push({
					path: '/floorManage/room/view'
				})
			},
			handleCreate() {
				this.temp = {};
				this.dialogStatus = 'create'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			//确认并刷新
			createData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {

					}
				});
			},
			//确认并继续添加
			createDataClear() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {

					}
				});
			},
			handleUpdate(row) {
				this.temp = Object.assign({}, row) // copy obj
				this.dialogStatus = 'update';
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			updateData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {

					}
				});
			},
			handleDelete(row) {
				this.deleteDialogVisible = true;
			},
			deleteBtn() {
				this.deleteDialogVisible = false;
			}
		}
	}
</script>

<style>

</style>