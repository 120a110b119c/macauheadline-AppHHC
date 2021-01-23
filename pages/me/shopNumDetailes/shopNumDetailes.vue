<template>
	<view class="pages">
		<header-title :title='"兑换券详情"' @toBack='goBack' :iconfont='"&#xe735;"'></header-title>
		<view class="container" >
			<view class="container-top">
				<view class="imgData">
					<view class="topImg">
						<image class="topImg" :src="couponObj.CpnImage" alt="">
					</view>
					<view class="data">
						有效期至:&nbsp;&nbsp;&nbsp;{{couponObj.CpnDueDate}}
					</view>
				</view>
				
				<view class="title">{{couponObj.CpnName}}</view>
				<view class="topTitle">
					<view class="topTitleIcon">
						<view class="iconfont">&#xe633;</view>
						<view>{{couponObj.CpnIntegral}}</view>
					</view>
					<view class="btn" @tap="goGetUserCoupon">立即兌換</view>
				</view>
				<view class="line"></view>
				<view class="text">
					<view class="text-tit">兌換券詳情</view>
					<view class="contentTxt">{{couponObj.CpnContent}}</view>
				</view>
			</view>
			<view></view>
		</view>
	</view>
</template>

<script>
	import  headerTitle  from '../../../components/header-title/index.vue'
	import { isNeedLogin , goLogin } from "@/utils/index.js"
	export default{
		data(){
			return{
				CpnId:'',
				couponObj:{},
				swiperheight:0,
				userData:{}
			}
		},
		components:{headerTitle},
		onLoad(options) {
			this.CpnId = options.CpnId;
			this.getList();//获取优惠卷详情
			this.getPageHeight();
			this.userData = uni.getStorageSync('data');
		},
		methods:{
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(120)
						this.swiperheight = height;
					}
				});
			},
			
			goBack(){
				uni.navigateBack({
				    delta: 1,
				    animationType: 'slide-out-right',
				    animationDuration: 300
				});
			},
			getList(){
				uni.showLoading()
				var serverUrl = this.serverUrl;
				var cpnId = this.CpnId;
				uni.request({
					url: serverUrl,
					data: {
						"action": "getcoupondetail",
						"cpnId": cpnId
					},
					dataType: 'json',
					success: (res) => {
						uni.hideLoading()
						if(res.data.result == 'suc'){
							this.couponObj = res.data
						}else{
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
						}
					},
					fail: (error) => {
						console.log(error, '登录报错');
					}
				});
			},
			goGetUserCoupon(){
				if(isNeedLogin()){
					goLogin("../register/register")
				}
				uni.showModal({
					title:'提示',
					content:'確認花費'+this.couponObj.CpnIntegral + '積分兌換當前優惠券嗎?',
					success:(response)=>{
						if(response.confirm){
							this.getUserCoupon()
						}
					}
				})
			},
			//兑换优惠券
			getUserCoupon(){
				var couponId = this.CpnId
				var usrId = this.userData.usrId
				uni.showLoading()
				 uni.request({
				 	url: this.serverUrl,
				 	data: {
				 		"action": "exchangecoupon",
				 		"cpnId": couponId,
						"userId": usrId
				 	},
				 	dataType: 'json',
				 	success: (res) => {
						uni.hideLoading()
						console.log(res)
				 		if(res.data.result == 'suc'){
							uni.showToast({
								title:'兌換優惠券成功!',
								icon:'none',
							})
						}else{
							uni.showToast({
								icon:"none",
								duration:2000,
								title:res.data.msg
							})
						}
				 	},
				 	fail: (error) => {
				 		console.log(error, '登录报错');
				 	}
				 });
			},
		}
	}
</script>

<style scoped>
uni-page-wrapper{
	background-color: #ebebeb!important;
}
.pages{
	position: relative;
	width: 100%;
	height: 100%;
	background-color: #ebebeb;
}
.headerTitle{
	height: 120upx;
	position: fixed;
	width: 100%;
	z-index: 9;
}
.bgColor {
		width: 100%;
		height: 40upx;
		background-color: #dc5340;
	}
.nav{
	display: flex;
	height: 80upx;
	line-height: 80upx;
	background-color: #dc543e;
	width: 100%;
}
.nav>.iconfont{
	text-align: center;
	width: 15%;
	color: #fff;
	font-size: 60upx;
	position: absolute;
}
.nav>.text{
	width: 100%;
	text-align: center;
	color: #fff;
	
}

.container{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.container-top{
	display: flex;
	flex-direction: column;
	width: 90%;
	height: 100%;
}
.btn {
		width: 180upx;
		height: 70upx;
		font-family: "monospace";
		line-height: 70upx;
		text-align: center;
		color: #F0FEFC;
		font-size: 30upx;
		border-radius: 20upx;
		background-color: #DA3136;
		margin-left: 25upx;
	}
.imgData{
	display: flex;
	flex-direction: column;
	width: 100%;
	background: #FFFFFF;
	margin-top: 15upx;
}
.imgData .topImg{
	width: 100%;
	height: 400upx;
}
.imgData .data{
	padding-left: 20upx;
	font-size: 28upx;
	color: #948b8c;
	margin-top: 10upx;
}

.title{
	color: #000000;
	font-size: 34upx;
	font-weight: bold;
	text-align: left;
	line-height: 60upx;
	height: 120upx;
	min-height: 120upx;
	width: 100%;
	margin-top: 20upx;
	text-overflow: ellipsis; 
	overflow: hidden;
	display: -webkit-box;
	 word-break: break-all;
	 -webkit-box-orient: vertical;
	 -webkit-line-clamp:2;
}
.topTitle{
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	margin-top: 20upx;
}
.topTitleIcon {
	display: flex;
}
.topTitleIcon>.iconfont{
	font-size: 48upx;
}
.line{
	width: 100%;
	height: 6upx;
	margin-top: 20upx;
	background-color: #d1d1d1;
}

.text{
	width: 100%;
}
.text-tit{
	font-size: 36upx;
	color: #948b8c;
	width: 100%;
	height: 100upx;
	line-height: 100upx;
}
.text>.contentTxt{
	width: 100%;
	height: 100%;
	font-size: 30upx;
	color: #948b8c;
	line-height: 50upx;
	text-align:justify;
	padding-bottom: 30upx;
}
</style>
