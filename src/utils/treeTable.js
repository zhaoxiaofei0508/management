function convertChild(arr,pitem,pid){
		pitem.children=pitem.children?pitem.children:[];
		arr.forEach(item=>{
			if(item.organizationId==pid){
			//if(item.pId==pid){
				pitem.children.push(item);
				convertChild(arr,item,item.id);
			//}
			}
		})
		return pitem.children;
}
export function covert(data,pid){
	let converData=[];
	data.forEach((item,index)=>{
		if(item.organizationId==pid){
		//if(item.pId==pid){
			converData.push(item);
			convertChild(data,item,item.id);
		//}
		}
	});
	return converData;
}
//栏目
function covertChildCol(arr,pitem,pid){
		pitem.children=pitem.children?pitem.children:[];
		arr.forEach(item=>{
			if(item.pid == pid){
				pitem.children.push(item);
				covertChildCol(arr,item,item.id);
			}
		})
		return pitem.children;
}
export function covertCol(data,pid){
	let converData=[];
	data.forEach((item,index)=>{
		if(item.pid == pid ){
			converData.push(item);
			covertChildCol(data,item,item.id);
		}		
	});
	return converData;
}



function convertChildC(arr,pitem,pid){
		arr.forEach(item=>{
			if(item.organizationId==pid){
				pitem.children=pitem.children?pitem.children:[];
				item.label=item.organizationName;
			    item.value=item.id;			    
				pitem.children.push(item);
				
				convertChildP(arr,item,item.id);
			}
		})
		return pitem.children;
}
function convertChildP(arr,pitem,pid){
		arr.forEach(item=>{
			if(item.organizationId==pid){
				pitem.children=pitem.children?pitem.children:[];
				item.label=item.organizationName;
			    item.value=item.id;			    
				pitem.children.push(item);
				
				convertChildP(arr,item,item.id);
			}
		})
		return pitem.children;
}
export function covertP(data,pid){
	let converData=[];
	data.forEach((item,index)=>{
		if(item.organizationId==pid){
			item.label=item.organizationName;
			item.value=item.id;
			converData.push(item);
			convertChildP(data,item,item.id);
		}
	});
	return converData;
}

function convertChildBranch(arr,pitem,pid){
		arr.forEach(item=>{
			if(item.organizationId==pid){
				pitem.children=pitem.children?pitem.children:[];
				item.label=item.organizationName;
			    item.value=item.id;			    
				pitem.children.push(item);
				
				convertChildBranch(arr,item,item.id);
			}
		})
		return pitem.children;
}
export function covertBranch(data,pid){
	let converData=[];
	data.forEach((item,index)=>{
		if(item.organizationId==pid){
			item.label=item.organizationName;
			item.value=item.id;
			converData.push(item);
			convertChildBranch(data,item,item.id);
		}
	});
	return converData;
}

function convertChildJob(arr,pitem,pid){
		pitem.children=pitem.children?pitem.children:[];
		arr.forEach(item=>{
			if(item.orgParentId==pid){
				pitem.children.push(item);
				convertChildJob(arr,item,item.orgId);
			}
		});
		pitem.children=_.uniq(pitem.children,"number");
		return pitem.children;
}
export function covertJob(data,pid){
	let converData=[];
	data.forEach((item,index)=>{
		if(item.orgParentId==pid){
			converData.push(item);
			convertChildJob(data,item,item.orgId);
		}
	});
	return converData;
}
function convertChilds(arr,pitem,pid){
		arr.forEach(item=>{
			if(item.pid==pid){
				pitem.children=pitem.children?pitem.children:[];			 		    
				pitem.children.push(item);				
				convertChilds(arr,item,item.id);
			}
		})
		return pitem.children;
}
export function coverts(data,pid){
	let converData=[];
	data.forEach((item,index)=>{
		if(item.pid==pid){
			item.label=item.organizationName;
			item.value=item.id;
			converData.push(item);
			convertChilds(data,item,item.id);
		}
	});
	return converData;
}
