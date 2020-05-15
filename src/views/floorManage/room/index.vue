<template>
	<div class="app-container">
		<div class="filter-container">
			<div class="filter-item el-input el-input--medium" style="margin-bottom: 0;">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="楼栋号" style="margin-bottom: 0;">
						<el-select v-model="name" filterable placeholder="请选择楼栋号" style="width:100%;">
							<el-option v-for="item in floorArr" :key="item.key" :label="item.name" :value="item.key">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="楼层号" style="margin-bottom: 0;">
						<el-select v-model="name" filterable placeholder="请选择楼层号" style="width:100%;">
							<el-option v-for="item in floorArr" :key="item.key" :label="item.name" :value="item.key">
							</el-option>
						</el-select>
					</el-form-item>
					<button type="button" @click="searchClick()" class="el-button filter-item el-button--primary el-button--medium">
						<i class="el-icon-search"></i>
						<span>搜索</span>
					</button>
					<el-button type="text" style="margin-left: 10px;float: right;color:#606266" @click="handleCreate">
						<i class="el-icon-plus"></i>
						<span>添加</span>
					</el-button>
				</el-form>
			</div>

		</div>
		<tree-table v-loading="listLoading" :data="list" :columns="columns" :default-expand-all="defaultExpandAll">
			<template slot-scope="{scope}">
				<span>{{scope.row.name}}</span>
			</template>
			<template slot="operation" slot-scope="{scope}" v-if="scope.row.type">
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
			<!--<el-table-column label="序号" prop="key" align="center">
			</el-table-column>
			<el-table-column label="楼栋号" prop="name" align="center">
			</el-table-column>
			<el-table-column label="楼层" prop="level" align="center">
			</el-table-column>
			<el-table-column label="房间号" prop="room" align="center">
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

			</el-table-column>-->
		</tree-table>

		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
				<el-form-item label="楼栋号" prop="num">
					<el-select v-model="temp.num" filterable placeholder="请选择楼栋号" style="width:100%;">
						<el-option v-for="item in floorArr" :key="item.key" :label="item.name" :value="item.key">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="楼层" prop="level">
					<el-select v-model="temp.level" filterable placeholder="请选择楼层" style="width:100%;">
						<el-option v-for="item in levelArr" :key="item.key" :label="item.name" :value="item.key">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="房间号" prop="name">
					<el-input v-model="temp.name" placeholder="请输入房间号" />
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
			Pagination,
			treeTable
		},
		data() {
			return {
				search: "",
				list: [],
				total: 0,
				listQuery: {
					page: 1,
					limit: 10
				},
				textMap: {
					update: '修改楼栋',
					create: '添加楼栋'
				},
				floorArr: [],
				levelArr:[],
				columns:[{
						label: '房间名称',
						key: 'name',
						expand: true,
						align: 'left'
					},
					{
						label: '房间类型',
						key: 'type'
					},
					{
						label: '操作',
						key: 'operation',
						align: 'left'
					}
				],
				name: "",
				dialogStatus: "",
				dialogFormVisible: false,
				deleteDialogVisible: false,
				listLoading: true,
				temp: {},
				defaultExpandAll:false,
				rules: {
					name: [{
						required: true,
						message: '楼栋号是必填项',
						trigger: 'blur'
					}],
					level:[{
						required: true,
						message: '楼层是必填项',
						trigger: 'blur'
					}],
					room:[{
						required: true,
						message: '房间号是必填项',
						trigger: 'blur'
					}],
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
				this.levelArr=[];
				for(var i = 0; i < 10; i++) {
					this.listLoading = false;
					this.floorArr.push({
						key: i + 1,
						name: '楼' + (i + 1),
					});
					this.levelArr.push({
						key: i + 1,
						name: '楼层' + (i + 1),
						level: (i + 1),
					});
				}
			},
			searchClick() {

			},
			getList() {
				this.listLoading = false;
				this.list = [];
				this.list=this.list=[
				   {
				   	 key:1,
				   	  name:'1号公寓',
				   	  children:[
				   	     {
				   	     	name:'1层',
				   	     	level:'1号公寓',
				   	     	children:[
				   	     	   {
				   	     	   	 name:'101',
				   	     	   	 num:'1层',
				   	     	   	 level:'1号公寓',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'102',
				   	     	   	 num:'1层',
				   	     	   	 level:'1号公寓',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'103',
				   	     	   	 num:'1层',
				   	     	   	 level:'1号公寓',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'104',
				   	     	   	 num:'1层',
				   	     	   	 level:'1号公寓',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'105',
				   	     	   	 num:'1层',
				   	     	   	 level:'1号公寓',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'106',
				   	     	   	 num:'1层',
				   	     	   	 level:'1号公寓',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'107',
				   	     	   	 num:'1层',
				   	     	   	 level:'1号公寓',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'108',
				   	     	   	 num:'1层',
				   	     	   	 level:'1号公寓',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'109',
				   	     	   	 num:'1层',
				   	     	   	 level:'1号公寓',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	]
				   	     },
				   	      {
				   	     	name:'2层',
				   	     	level:'2号公寓',
				   	     	children:[
				   	     	   {
				   	     	   	 name:'201',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'202',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'203',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'204',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'205',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'206',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'207',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'208',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'209',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	]
				   	     },
				   	      {
				   	     	name:'3层',
				   	     	level:'2号公寓',
				   	     	children:[
				   	     	   {
				   	     	   	 name:'301',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'302',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'303',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'304',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'305',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'306',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'307',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'308',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	    {
				   	     	   	 name:'309',
				   	     	   	 type:'3人公寓',
				   	     	   },
				   	     	]
				   	     },
				   	      {
				   	     	name:'4层',
				   	     	level:'2号公寓'
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
//						level:'楼层' + (i + 1) + this.listQuery.limit * (this.listQuery.page - 1),
//						room: i + 1 + this.listQuery.limit * (this.listQuery.page - 1),
//					});
//				}
				this.total = 100;
			},
			handleCreate() {
				this.temp = {};
				this.dialogStatus = 'create'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			createData() {
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {

					}
				});
			},
			//确认并继续添加
			createDataClear(){
				this.$refs['dataForm'].validate((valid) => {
					if(valid) {

					}
				});
			},
			//查看
			handleView(row){
				this.$router.push({
					path: '/floorManage/room/view'
				})
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