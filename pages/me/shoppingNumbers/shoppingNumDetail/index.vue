<template>
	<view>
		<header-title :title='"优惠劵详情"' :backText="''" @toBack='toHome' :iconfont="'&#xe735;'"></header-title>
		<view class="titleBg"></view>
		<view class="titleContent">
			<view class="ContTextTop">
				<view class="number" v-if="exchange">
					<view style="width: 250upx;" v-if="data.cpnImage ==''">
						<coupon-page v-if="data.cpnType === '1'" homeShow="1" textOne="￥" :textTwo="data.cpnAmount"
						 :cpnName="data.cpnName"></coupon-page>
						 <coupon-page v-else-if="data.cpnType === '2'" homeShow="1" textOne="￥" :textTwo="data.cpnMinCharge"
						  :cpnName="data.cpnContent"></coupon-page>
						<coupon-page v-else homeShow="6" :textOne="data.cpnDiscount" textTwo="折" cpnName="折扣劵"></coupon-page>
					</view>
					<view v-else style="width: 250upx;height: 250upx;">
						<coupon-page style="width: 250upx;height: 250upx;" :image="data.cpnImage" homeShow="4" :textOne="''" textTwo="" cpnName=""></coupon-page>
					</view>
				</view>
				<view v-else class="number">
					<view>{{usrIntegral}}</view>
				</view>
				<!-- <view class="ContTextBottom"> -->
					<!-- <view>
						<image src="../../../../static/storePage/couponDetailPage/coffee.jpg" mode="widthFix"></image>
					</view> -->
					<!-- <view>{{data.cpnName}}</view>
				</view> -->
			</view>
			<view class="timer">
				<view class="btn">
					<u-button type="error" @click="getData()">{{btnValue}}</u-button>
				</view>
				<view class="timerNumber">有效期:{{data.cpnDueDate}}</view>
			</view>
		</view>
		<view class="content">
			<view class="TopImage">
				<view class="imperialCrown">
					<image src="../../../../static/storePage/couponDetailPage/imperialCrown.jpg" mode="widthFix"></image>
				</view>
			</view>
			<view class="TopContent">
				<view class="left">
					<view class="line"></view>
					<view class="image">
						<image src="../../../../static/storePage/couponDetailPage/box.jpg" mode="widthFix"></image>
					</view>
				</view>
				<view class="text">使用条件</view>
				<view class="right">
					<view class="image">
						<image src="../../../../static/storePage/couponDetailPage/box.jpg" mode="widthFix"></image>
					</view>
					<view class="line"></view>
				</view>
			</view>
			<view class="explain">
				<view v-html="data.cpnContent"></view>
			</view>	
		</view>
		<!-- <view class="shoppingSale">
			<view class="titleImage">商品熱銷</view>
			<view v-if="data.cpnImage!=''" class="boxShopping">
				<view class="titleImage">
					<image src="../goodsForManage/image/goodNameImage.png" mode="widthFix"></image>
				</view>
				<coupon-detail-page :cpnObject="data"></coupon-detail-page>
			</view>
			<view v-else  class="boxShopping">
				<coupon-one></coupon-one>
				<coupon-detail-page :cpnObject="data"></coupon-detail-page>
			</view>
		</view> -->
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	
	import couponDetailPage from "../../../storePage/page/childComponent/content/couponDetailPage.vue"
	import CouponOne from "../../../storePage/page/childComponent/common/CouponOne.vue"
	import couponPage from "../../../storePage/page/childComponent/content/couponPage.vue" //優惠卷組件
	export default {
		components: {
			headerTitle,
			couponDetailPage,
			CouponOne,
			couponPage
		},
		data(){
			return{
				data:null,
				userInfoUsrId:null,//用户id
				usrIntegral:null,//用户积分
				exchange:true,
				btnValue:'立即兑换'
			}
		},
		onShow() {
			this.getUserId(); //獲取用戶id
		},
		onLoad() {
			this.data = uni.getStorageSync('shopDetailsDatas');
			console.log('this.data',this.data)
		},
		methods:{
			toHome(){
				uni.navigateBack()
			},
			getUserId() {
				let userData = uni.getStorageSync('data');
				if (userData) {
					this.userInfoUsrId = userData.usrId;
				}
			},
			getData(){
				let userObj = {
					"action": "newexchangecoupon",
					"usrId":this.userInfoUsrId,
					"cpnId":this.data.cpnId
				}
				this.$Httpps
					.sttp(userObj)
					.then(res => {
						if (res.data.result != "suc") {
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
							return;
						}
						this.btnValue = '兑换成功'
						this.usrIntegral = res.data.usrIntegral
						uni.showToast({
							icon: "none",
							title: '兑换成功'
						})
					}).catch(err => {
						console.log(err);
				});
			}
		}
	}
</script>

<style scoped>
	/* 商品熱銷 */
	.shoppingSale{
		position: relative;
		top: -350upx;
		width: 100%;
		padding: 30upx;
	}
	.shoppingSale > .titleImage{
		margin: 20upx 0;
	}
	.shoppingSale > .boxShopping{
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-bottom: 20upx;
	}
	.shoppingSale > .boxShopping > .titleImage{
		width: 300upx;
	}
	
	
	
	.titleBg{
		position: relative;
		width: 100%; 
		height: 250px; 
		text-align: center; 
		line-height: 50px; 
	}
	.titleBg:after { 
		width: 140%; 
		height: 200px; 
		position: absolute; 
		left: -20%; 
		top: 0; 
		z-index: -1; 
		content: ''; 
		border-radius: 0 0 50% 50%; 
		background: linear-gradient(#dc5340, #dc5340); 
	}
	
	.titleContent{
		position: relative;
		top: -500upx;
		width: 100%;
		height: 640upx;
		background-image: url(../../../../static/storePage/couponDetailPage/bg.png);
		background-size: cover;
	}
	.titleContent>.ContTextTop{
		width: 100%;
		padding-top: 30upx;
	}
	.titleContent>.ContTextTop>.number{
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		padding-top: 50upx;
		color: #f32f3b;
	}
	.titleContent>.ContTextTop>.number>uni-view:nth-of-type(1){
		font-size: 150upx;
	}
	.titleContent>.ContTextTop>.number>uni-view:nth-of-type(2){
		padding-top: 90upx;
		font-size: 60upx;
	}
	.titleContent>.ContTextTop>.ContTextBottom{
		position: relative;
		top: -20upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.titleContent>.ContTextTop>.ContTextBottom>uni-view:nth-of-type(1){
		width: 70upx;
		margin-right: 10upx;
	}
	.titleContent>.ContTextTop>.ContTextBottom>uni-view:nth-of-type(2){
		font-size: 36upx;
		color: #010101;
		font-weight: bold;
	}
	
	.titleContent>.timer{
		position: absolute;
		bottom: 140upx;
		width: 100%;
	}
	.titleContent>.timer>.btn{
		width: 70%;
		margin-left: 15%;
	}
	.titleContent>.timer>.timerNumber{
		margin-top: 20upx;
		text-align: center;
		font-size: 30upx;
	}
	
	.content{
		position: relative;
		top: -500upx;
		width: 100%;
	}
	
	uni-image{
		width: 100%;
		height: 100%;
	}
	.TopImage{
		display: flex;
		width: 100%;
		margin-top: 80upx;
		justify-content: center;
	}
	.imperialCrown{
		display: inline-block;
		width: 6%;
	}
	.TopContent{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 10upx;
	}
	.TopContent>.text{
		margin: 0 40upx;
		color: #343434;
		font-weight: bold;
		font-size: 34upx;
		letter-spacing: 2upx;
	}
	.TopContent>.left,
	.TopContent>.right{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.TopContent>.left>.line,
	.TopContent>.right>.line{
		height: 4upx;
		width: 200upx;
		background-color: #f0f0f0;
	}
	.TopContent>.left>.line{
		margin-right: 20upx;
	}
	.TopContent>.right>.line{
		margin-left: 20upx;
	}
	.TopContent>.left>.image,
	.TopContent>.right>.image{
		width: 15%;
	}
	
	.explain{
		width: 90%;
		margin-left: 5%;
		margin-top: 60upx;
		color: #a5a5a5;
	}
	.explain > uni-view{
		line-height: 50upx;
		font-size: 30upx;
	}
</style>
