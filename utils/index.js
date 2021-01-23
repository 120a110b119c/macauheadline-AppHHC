import { serverUrl } from './pathSetting/constPath.js'

export const mobAppKey = "3029f42f5467b";
export const mobSecret = '2fc76d392f2e4816178586f3b8ca0fb1';
export function isNeedLogin() {
	let userData = uni.getStorageSync('data');
	return userData.usrId == '' || userData.usrId == null || userData.usrId == undefined;
}
export function goLogin(url) {
	setTimeout(()=>{
		uni.showToast({
			icon:"none",
			title:"您當前尚未登入,請登入"
		})
	},1)
	uni.navigateTo({
		url: url
	})
}
export function testPhoneNum(phoneNum){
	if(!(/^1[3456789]\d{9}$/.test(phoneNum))){ 
		return false
	} 
	return true
}

export function appendUserIntegral(params){
	uni.request({
		url: serverUrl,
		data:{
			'action':'appenduserintegral',
			'userId':params.userId,
			"integral":params.integral
		},
		dataType: 'json',
		success: (res) => {
			if(res.data.result == 'suc'){
				if(res.data.appendIntegral > 0){
					uni.showToast({
						title:'積分 + '+res.data.appendIntegral,
						icon:'none',
						position:"bottom"
					})
				}
			}
		},
		fail: (error) => {
			console.log(error);
		}
	});
}