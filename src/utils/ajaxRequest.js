import $ from "jquery"
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getTokenRefresh, setTokenRefresh, removeTokenRefresh } from '@/utils/auth'
import router from '@/router'
export function getAjax(url, datas = {}) {
	return new Promise((resolve, reject) => {
		url = url.replace("/api", "http://61.134.63.231:9090")
		// url = url.replace("/api", "http://192.168.1.116:9309")
		$.ajax({
			type: 'GET',
			url: url,
			data: datas,
			headers: {
				token: getToken(),
				userId: sessionStorage.userId,
				companyId:sessionStorage.companyId,
			},
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					router.push({
						path: '/500'
					});
				}
				reject(err);
			}
		});
	});
}


export function getAjaxA(url, datas = {}) {
	return new Promise((resolve, reject) => {
		// url = url.replace("/api", "http://61.134.63.231:9090")
		url = url.replace("/api", "http://192.168.1.117:9309")
		$.ajax({
			type: 'GET',
			url: url,
			data: datas,
			headers: {
				token: getToken(),
				userId: sessionStorage.userId,
				companyId:sessionStorage.companyId,
			},
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					router.push({
						path: '/500'
					});
				}
				reject(err);
			}
		});
	});
}

export function getUserIdAjax(url, datas = {}) {
	return new Promise((resolve, reject) => {
		url = url.replace("/api", "http://61.134.63.231:9090")
		$.ajax({
			type: 'GET',
			url: url,
			data: datas,
			headers: {
				token: getToken(),
				userId: datas.userId
			},
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					router.push({
						path: '/500'
					});
				}
				reject(err);
			}
		});
	});
}

export function loginByUsername(url, datas = {}) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: url,
			data: datas,
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					router.push({
						path: '/500'
					});
				}
				reject(err);
			}
		});
	});
}

export function getUserMenu(url, datas = {}) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'GET',
			url: url,
			data: datas,
			headers: {
				token: getToken(),
				userId: sessionStorage.userId,
				companyId:sessionStorage.companyId,
			},
			success: function(data) {
				if(data.code == "0") {
					resolve(data);
				}
			},
			error: function(err) {
				if(err.status == 401) {
					refreshToken();
				} else if(err.status == "500") {
					router.push({
						path: '/500'
					});
				}
				reject(err);
			}
		});
	});
}

export function logout(url, datas = {}) {
	return new Promise((resolve, reject) => {
		url = url.replace("/api", "http://61.134.63.231:9090")
		$.ajax({
			type: 'POST',
			url: url,
			headers: {
				userId: sessionStorage.userId,
				token: getToken(),
			},
			data: datas,
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					router.push({
						path: '/500'
					});
				}
				reject(err);
			}
		});
	});
}

export function postAjax(url, datas = {}) {
	return new Promise((resolve, reject) => {
		// url = url.replace("/api", "http://192.168.1.116:9309")
//		url = url.replace("/api", "http://192.168.1.111:9309")
		url = url.replace("/api", "http://61.134.63.231:9090")
		$.ajax({
			type: 'POST',
			url: url,
			data: datas,
			headers: {
				userId: sessionStorage.userId,
				companyId:sessionStorage.companyId,
				token: getToken(),
			},
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					// router.push({
					// 	path: '/500'
					// });
				}
				reject(err);
			}
		});
	});
}
export function postAjaxx(url, datas = {}) {
	return new Promise((resolve, reject) => {
		// url = url.replace("/api", "http://192.168.1.117:9309")
		 url = url.replace("/api", "http://61.134.63.231:9090")
		$.ajax({
			type: 'POST',
			url: url,
			data: datas,
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				userId: sessionStorage.userId,
				companyId:sessionStorage.companyId,
				token: getToken(),
			},
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					// router.push({
					// 	path: '/500'
					// });
				}
				reject(err);
			}
		});
	});
}

export function postAjaxJson(url, datas = {}) {
	return new Promise((resolve, reject) => {
//		 url = url.replace("/academyService", "");
//        url = url.replace("/organizationService", "");
		url = url.replace("/api", "http://61.134.63.231:9090")
		// url = url.replace("/api", "http://192.168.1.106:9309")

		$.ajax({
			type: 'POST',
			url: url,
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				userId: sessionStorage.userId,
				companyId:sessionStorage.companyId,
				token:getToken(),

			},
			contentType: "application/json",
			data: JSON.stringify(datas),
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					router.push({
						path: '/500'
					});
				}
				reject(err);
			}
		});
	});
}

export function putAjax(url, datas = {}) {
	return new Promise((resolve, reject) => {
		url = url.replace("/api", "http://61.134.63.231:9090")
		$.ajax({
			type: 'PUT',
			url: url,
			data: datas,
			headers: {
				token: getToken(),
				userId: sessionStorage.userId,
				companyId:sessionStorage.companyId,
			},
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					router.push({
						path: '/500'
					});
				}
				reject(err);
			}
		});
	});
}

export function putAjaxHead(url, datas = {}) {
	return new Promise((resolve, reject) => {
		url = url.replace("/api", "http://61.134.63.231:9090")
		$.ajax({
			type: 'PUT',
			url: url,
			data: datas,
			headers: {
				token: getToken(),
				userId: sessionStorage.userId,
				companyId:sessionStorage.companyId,
			},
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					router.push({
						path: '/500'
					});
				}
				reject(err);
			}
		});
	});
}

export function deleteAjax(url, datas = {}) {
	return new Promise((resolve, reject) => {
		url = url.replace("/api", "http://61.134.63.231:9090")
		$.ajax({
			type: 'DELETE',
			url: url,
			headers: {
				token: getToken(),
				userId: sessionStorage.userId,
				companyId:sessionStorage.companyId,
			},
			data: datas,
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				if(err.status == "401") {
					refreshToken();
				} else if(err.status == "500") {
					router.push({
						path: '/500'
					});
				}
				reject(err);
			}
		});
	});
}
//刷新token
export function refreshToken() {
	var param = {
		token: getTokenRefresh()
	};
	$.ajax({
		type: 'PUT',
		url: "http://61.134.63.231:9090/organizationService/userAccount/refresh",
		data: param,
		success: function(data) {
			if(data.code == "0") {
				setToken(data.data.token);
				setTokenRefresh(data.data.refreshToken);
				location.reload()

			} else {
				window.sessionStorage.removeItem('user')
				window.sessionStorage.removeItem('isLoadNodes')
				removeToken();
				removeTokenRefresh();
				router.push({
					path: '/login'
				});
			}
		},
		error: function(err) {
			removeToken();
			router.push({
				path: '/login'
			});
		}
	});
}
