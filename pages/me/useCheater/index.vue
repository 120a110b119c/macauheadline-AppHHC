<template>
	<view class="page">
		<view style="height: 140upx;">
			<view class="headerTitle">
				<view class="bgColor"></view>
				<view class="nav">
					<view class="myIcon" @tap="toHome()">
						<view class="icon icon-zuojiantou iconfont"></view>
						<view class="text">返回</view>
					</view>
					<view class="title">優惠券使用</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="containerBox" :style="{height: (swiperheight)  + 'px',overflow:'hidden' }">
				<view class="title">{{onjs.UcpCpnName}}</view>
				<view class="topImage"  v-if="onjs.UcpCpnImage ==''">
					<coupon-page  style="width: 260upx;height: 200upx;" v-if="onjs.CpnType === '1'" homeShow="1" textOne="￥" :textTwo="onjs.CpnAmount"
					 :cpnName="onjs.CpnName"></coupon-page>
					 <coupon-page  style="width: 260upx;height: 200upx;" v-else-if="onjs.CpnType === '2'" homeShow="1" textOne="￥" :textTwo="onjs.CpnMinCharge"
					  :cpnName="onjs.CpnContent"></coupon-page>
					<coupon-page  style="width: 260upx;height: 200upx;" v-else homeShow="6" :textOne="onjs.UcpCpnDiscount" textTwo="折" cpnName="折扣劵"></coupon-page>
				</view>
				<view v-else  class="topImage">
					<coupon-page  style="width: 260upx;height: 200upx;" :image="onjs.CpnImage" homeShow="4" :textOne="''" textTwo="" cpnName=""></coupon-page>
					<!-- :image="onjs.UcpCpnImage" -->
				</view>
				<view class="line"></view>
				<view class="textCenter">
					<view>請在餐廳收銀員指導下出示二維碼</view>
					<view>掃碼使用員工登錄</view>
				</view>
				<view class="animated fadeIn faster userID-model">
					<view class="UserID-box">
						<view style="margin:auto 0;" class="qrCode">
							<tki-barcode
								ref='qrCodeBar'
							    :val="onjs.UcpNo"
							    :opations="qrCodeOpations"
							    @result="barresult"
								:loadMake='true'
								:onval='true'
								class="qrCodeDiv"/>
						</view>
						<view style="color: #adadad;letter-spacing: 3upx;font-size: 30upx;">兌換日期:{{onjs.UcpGetDate}}</view>
					</view>
				</view>
				<view class="line" style="margin: 20upx 0;"></view>
				<view class="expoundBox">
					<view class="title">詳細說明</view>
					<view class="content">1.優惠卷僅限中國大陸的郵樂註冊用戶領取,每個郵樂用戶名每次活動只能領取一次優惠卷。</view>
					<view class="content">2.優惠卷只能用于購買活動中指定的商品,且同一訂單只能使用一張優惠卷</view>
				</view>
			</view>
			<!-- <view style="width: 250upx;" v-if="item.CpnImage ==''">
				<coupon-page v-if="item.CpnType === '1'|| item.CpnType === '2'" homeShow="1" textOne="￥" :textTwo="item.CpnIntegral"
				 :cpnName="item.CpnName"></coupon-page>
				<coupon-page v-else homeShow="3" :textOne="item.CpnDiscount" textTwo="折" cpnName="折扣劵"></coupon-page>
			</view>
			<view v-else>
				<coupon-page :image="item.CpnImage" homeShow="4" :textOne="''" textTwo="" cpnName=""></coupon-page>
			</view> -->
			<view class="line"></view>
		</view>
	</view>
</template>

<script>
	import couponPage from "../../storePage/page/childComponent/content/couponPage.vue" //優惠卷組件
	import tkiBarcode from '@/components/tki-barcode/tki-barcode.vue'
	export default{
		data(){
			return{
				qrCodeVal:'',
				qrCodeOpations:{
					'fontSize':32,
					'marginTop':20,
					'height':150,
					'width':5
				},
				swiperheight:0,
				onjs:{}
			}
		},
		onShow() {
			this.getPageHeight();
		},
		onLoad() {
			this.onjs = uni.getStorageSync('useCheaterData')
			console.log('this.onjs',this.onjs)
		},
		components:{
			couponPage,
			tkiBarcode
		},
		methods:{
			toHome(){
				uni.navigateTo({
					url:"../myCheater/index"
				})
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(180);
						this.swiperheight = height;
					}
				});
			},
			barresult(valUrl){
				uni.hideLoading()
			}
		}
	}
</script>

<style scoped>
	.topImage{
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 20upx 0;
	}
	.qrCode{
		height: 240upx;
	}
	.qrCodeDiv{
		display: flex;
		justify-content: center;
	}
	.page{
		width: 100%;
		height: 100%;
	}
	/* 標題樣式 start */
	.headerTitle {
		height: 120upx;
		position: fixed;
		width: 100%;
		z-index: 9;
		top: 0;
		left: 0;
	}
	
	.bgColor {
		width: 100%;
		height: 60upx;
		background-color: #dc0000;
	}
	
	.nav {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		background-color: #dc0000;
		width: 100%;
	}
	
	.myIcon {
		position: absolute;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
	}
	
	.myIconRight {
		position: absolute;
		right: 10upx;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
	}
	
	.myIconRight>.icon-jiahao {
		font-size: 40upx;
	}
	
	.iconfont {
		color: #fff;
		font-size: 54upx;
	}
	
	.text {
		color: #fff;
		font-size: 30upx;
	}
	
	.title {
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: 36upx;
	}
	
	/* 標題樣式 end */
	
	
	.container{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #dc0000;
		padding: 40upx;
		padding-top: 0;
	}
	.containerBox{
		width: 100%;
		border-radius: 20upx;
		background-color: #FFFFFF;
		padding: 0 20upx;
		box-sizing: border-box;
	}
	.containerBox>.title{
		text-align: center;
		color: #ff5a01;
		/* font-weight: bold; */
		line-height: 120upx;
		font-size: 50upx;
		letter-spacing: 6upx;
	}
	.containerBox>.line{
		width: 100%;
		height: 2upx;
		border-bottom: 2upx dotted #666;
	}
	.containerBox>.textCenter{
		width: 100%;
		text-align: center;
		margin: 20upx;
	}
	
	
	.containerBox>.userID-model,.UserID-box{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	
	
	.expoundBox{
		width: 100%;
	}
	.expoundBox>.title{
		margin: 40upx 0;
		color: #010101;
		text-align: left;
		letter-spacing: 3upx;
		font-size: 32upx;
	}
	.expoundBox>.content{
		line-height: 50upx;
		color: #b5b5b5;
	}
</style>
