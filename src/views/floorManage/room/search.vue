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
					<el-form-item label="房间号" style="margin-bottom: 0;">
						<el-select v-model="name" filterable placeholder="请选择楼层号" style="width:100%;">
							<el-option v-for="item in floorArr" :key="item.key" :label="item.name" :value="item.key">
							</el-option>
						</el-select>
					</el-form-item>
					<button type="button" @click="searchClick()" class="el-button filter-item el-button--primary el-button--medium">
						<i class="el-icon-search"></i>
						<span>搜索</span>
					</button>
					<!--<el-button type="text" style="margin-left: 10px;float: right;color:#606266" @click="handleCreate">
						<i class="el-icon-plus"></i>
						<span>添加</span>
					</el-button>-->
				</el-form>
			</div>

		</div>
		<el-table v-loading="listLoading" :data="list" fit highlight-current-row class="tableWidth">
			<el-table-column label="序号" prop="key" align="center">
			</el-table-column>
			<el-table-column label="卡类型" prop="name" align="center">
			</el-table-column>
			<el-table-column label="楼栋号" prop="name" align="center">
			</el-table-column>
			<el-table-column label="楼层" prop="level" align="center">
			</el-table-column>
			<el-table-column label="房间号" prop="room" align="center">
			</el-table-column>
			<el-table-column label="人员姓名" prop="name" align="center">
			</el-table-column>
			<el-table-column label="所在单位/部门" prop="name" align="center" width="140">
			</el-table-column>
			<el-table-column label="卡状态" prop="name" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<span @click="handleUpdate(scope.row)" class="pointer">
			          		<el-tag>查看</el-tag>
			          </span>
				</template>

			</el-table-column>
		</el-table>

		<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
				<el-form-item label="楼栋号" prop="name">
					<el-select v-model="temp.name" filterable placeholder="请选择楼栋号" style="width:100%;">
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
				<el-form-item label="房间号" prop="room">
					<el-input v-model="temp.room" placeholder="请输入房间号" />
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
	export default {
		components: {
			Pagination
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
				name: "",
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
				for(var i = 0; i < 10; i++) {
					this.listLoading = false;
					this.list.push({
						key: i + 1 + this.listQuery.limit * (this.listQuery.page - 1),
						name: '楼' + (i + 1) + this.listQuery.limit * (this.listQuery.page - 1),
						level:'楼层' + (i + 1) + this.listQuery.limit * (this.listQuery.page - 1),
						room: i + 1 + this.listQuery.limit * (this.listQuery.page - 1),
					});
				}
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
			handleUpdate(row) {
				this.$router.push({
					path: '/floorManage/room/view'
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