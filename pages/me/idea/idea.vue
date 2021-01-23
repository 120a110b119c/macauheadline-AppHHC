<template>
	<view class="page">
		<header-title :title='"意見反饋"' @toBack='toMe()' :backText="'我的'" :iconfont='"&#xe728;"'></header-title>
		<scroll-view scroll-y>
			<view class="userWrap">
				<view class="userInfor">
					<view class="userInfor_item">
						<input type="text" value="" placeholder="* 您的姓名" v-model="userInfo.userName" />
					</view>
					<view class="userInfor_item">
						<input type="number"   maxlength="11" value="" placeholder="* 聯繫方式" @blur='phoneNumBlur' v-model="userInfo.photoName"   />
					</view>
				</view>
			</view>
			<view class="textarea-wrap">
					<textarea style="height: 350upx;" maxlength="140" placeholder="* 意見建議" v-model="userInfo.suggest"/>
			</view>
			<view class="sureButton">
				<view class="iconfont"></view>
				<view @tap="sureButton()">確定</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import  headerTitle  from '../../../components/header-title/index.vue'
	import { appendUserIntegral } from '@/utils/index.js'
	export default{
		data(){
			return{
				userInfo:{
					userName:"",
					photoName:"",
					suggest:"",
					chooesRange:'+853',
					rangeList:["+86","+852","+853"],
					rangeIndex:'2'
				},
			}
		},
		components:{
			headerTitle
		},
		methods:{
			toMe(){
				uni.switchTab({
					url:'../me'
				})
			},
			phoneNumBlur(){
				console.log(this.userInfo.photoName)
			},
			sureButton(){
				var userName = this.userInfo.userName;
				var photoName = this.userInfo.photoName;
				// if( photoName!="" ){
				// 	if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(photoName))){ 
				// 		uni.showToast({
				// 			title:"手机号码有误",
				// 			icon:'none'
				// 		})
				// 		return 
				// 	} 
				// } 
				var suggest = this.userInfo.suggest;
				var serverUrl = this.serverUrl;
				uni.request({
					url: serverUrl,
					data: {
						"action": "savesuggest",
						 "SugName": userName,     
						 "SugTel": photoName,     
						 "SugContent": suggest 
					},
					dataType: 'json',
					success: (res) => {
						console.log(res);
						if(res.data.result == 'suc'){
							uni.showToast({
								title:'意見反饋成功',
								icon:'none'
							})
							let params = {
								userId: uni.getStorageSync("data").usrId,
								integral:'feedback'
							}
							setTimeout(()=>{
								appendUserIntegral(params)
							},500)
							
							setTimeout(()=>{
								uni.switchTab({
									url:'../me'
								})
							},1000)
						}
					},
					fail: (error) => {
						console.log(error, '登录报错');
					}
				});
			}
		}
	}
</script>

<style scoped>
.page{
	/* display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center; */
	width: 100%;
	height: 100vh;
	background-color: #f4f5f7!important;
}
.bgColor{
	width: 100%;
	height: 40upx;
	background-color: #dc5340;
}
.nav{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	background-color: #dc5340;
}
.navContent{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
	
}
.navContent>.iconfont{
	color: #fff;
	font-size: 46upx;
}
.navContent>.text{
	color: #fff;
	font-size: 30upx;
}
.navContent>.title{
	width: 86%;
	text-align: center;
	color: #fff;
	font-size: 36upx;
}


.userWrap{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}
.userInfor{
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 40upx 40upx;
	padding-bottom: 0;
	box-sizing: border-box;
}
.userInfor_item{
	width: 100%;
	height: 120upx;
	line-height: 80upx;
	padding: 30upx 30upx;
	border-bottom: 1px solid #f4f5f7;
	background-color: #fff;
	box-sizing: border-box;
	border-radius: 20upx;
	margin-top: 10upx;
}

.textarea-wrap{
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 350upx;
	margin-top: 10upx;
}
uni-textarea{
	width: 90%;
	padding: 20upx;
	background-color: #fff;
	border-radius: 20upx;
	box-sizing: border-box;
}
.sureButton{
	margin-left: 5%;
	margin-bottom: 20upx;
	width: 90%;
	height: 40px;
	margin-top: 20px;
	line-height: 40px;
	text-align: center;
	background-color: #f85a59;
	border-radius: 20px;
	color: #FFFFFF;
}


.copyrightSymbol{
	width: 100%;
	margin-top: 40upx;
	margin-bottom: 40upx;
	text-align: center;
	font-size: 32upx;
}
.errorTip{
	color: #DC143C;
	font-size: 24upx;
	line-height: 24upx;
}
</style>
