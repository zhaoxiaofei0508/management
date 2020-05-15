<template>
	<div style="margin-bottom:40px;">
		<light-timeline :items='detailObj'>
			<template slot='tag' slot-scope='{ item }'>
				{{item.startTime}}
			</template>
			<template slot='content' slot-scope='{ item }'>
				<span style="display: inline-block;width:260px;">{{item.userNameStart}}</span>
				<span style="display: inline-block;">{{item.message}}</span>
			</template>
		</light-timeline>
		<light-timeline :items='items' id='lineTime'>
			<template slot='tag' slot-scope='{ item }'>
				{{item.endTime}}
			</template>
			<template slot='content' slot-scope='{ item }'>
				<span style="display: inline-block;width:260px;">{{item.userNameNow}}</span>
				<span style="display: inline-block;">{{item.taskName}}</span>
				<p>{{item.comments}}</p>
			</template>
		</light-timeline>
		<p v-if="this.itemsBack.length>2" style="margin-left: 100px;color: #39f;cursor: pointer;" @click="collapseClick">{{moreText}}</p>
	</div>

</template>
<script>
	import { getAjax } from '@/utils/ajaxRequest'
	import $ from "jquery"
	export default {
		props: {
			processInstanceId: ""
		},
		data() {
			return {
				detailObj: [],
				items: [],
				itemsBack: [],
				collapseBool: false,
				moreText:"更多",
			}
		},
		mounted() {
			this.initList();
		},
		methods: {
			collapseClick() {
				this.collapseBool = !this.collapseBool;
				this.moreText=this.collapseBool?"隐藏":"更多";
				this.items=[];
				_.forEach(this.itemsBack,(val,key)=>{
					if(this.collapseBool){
						this.items.push(val);
					}else{
						if(key<2){
							this.items.push(val);
						}
					}
				});
				
			},
			initList() {
				getAjax("/api/processService/monitoring/taskHistory/" + this.processInstanceId).then(res => {
					if(res.code == "0" && res.data.historyList.length > 0) {
						this.items=[];
						this.itemsBack=[];
						_.forEach(res.data.historyList, (val,key) => {
							val.color = "#ffc8c8";
							val.comments = val.comments == "null" ? "" : val.comments;
							val.comments = val.comments && val.comments.replace(/null/g, "");
							if(key<2){
								this.items.push(val);
							}
							this.itemsBack.push(val);
						});
						res.data.historyList[res.data.historyList.length - 1].color = "red";
						this.detailObj = [];
						this.detailObj.push(res.data);
						//						$("#lineTime .line-item:last-child .item-circle").css("cssText","border:2px solid #39f !important");
					}
				});
			}
		}
	}
</script>

<style>
	.line-container .item-tag {
		width: 99px !important;
	}
	
	.line-container .item-circle {
		border: 2px solid #e4e7ed !important;
	}
	
	.line-container::after {
		height: 150% !important;
		background-color: #e4e7ed !important;
	}
</style>