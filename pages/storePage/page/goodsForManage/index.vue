<template>
	<view class="page">
		<view style="height: 140upx;">
			<view class="headerTitle">
				<view class="bgColor"></view>
				<view class="nav">
					<view class="myIcon" @tap="toHome()">
						<view class="icon icon-zuojiantou iconfont"></view>
						<view class="text">商家端首頁</view>
					</view>
					<view class="title">優惠券管理</view>
					<view class="myIconRight" @tap="toRelease()">
						<view class="icon icon-jiahao iconfont"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="navBox">
				<view class="navbar">
					<view v-for="(item, index) in navList" :key="index" class="nav-item" @click="tabClick(index)">
						<view>{{ item.text }}</view>
						<view :class="{ current: tabCurrentIndex === index }" class="line"></view>
					</view>
				</view>
			</view>
			<view class="goodsList">
				<view v-for="(item, i) in navList" :key="i" style="margin-top: 40upx;">
					<view class="goodsManage">
						<view class="goods-tit">
							<view class="goodsNumberBox">
								<view class="goodsNumberImage">
									<image src="./image/goodsNumberImage.png" mode="widthFix"></image>
								</view>
								<view class="goodsNumber">訂單號:{{goodsNumber}}</view>
							</view>
							<view class="goodsState">
								{{goodsState}}
							</view>
						</view>
						<view class="goods-context" @tap.stop="toCouponDetail()">
							<view style="width: 240upx;">
								<coupon-page :textOne="'￥'" :textTwo="'100'" :cpnName="'滿30減40'"></coupon-page>
							</view>
							<view class="goodsInfo">
								<view class="goodsName">商品名稱 : {{goodsInfo.goodsName}}</view>
								<view class="goodsPayFor">支付方式 : {{goodsInfo.goodsPayFor}}</view>
								<view class="goodsCode">價格 :<span style="color:#fe0000;margin-left: 10upx;">{{goodsInfo.goodsCode}}</span>
								</view>
							</view>
							<view class="goodsNums">x{{goodsInfo.goodsNums}}</view>
						</view>
						<view class="goods-timer" @tap="toOrderDetail()">
							<view>下單時間 : {{goodsTimer}}</view>
							<view class="btns">查看詳情</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;">
			<u-loading mode="circle" color="#2979ff" :size="40"></u-loading>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;color:#999;">已經到底啦!</view>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import couponPage from "../childComponent/content/couponPage.vue"
	export default {
		data() {
			return {
				collectPage: 1,
				totalPage: 99,
				goodsInfo: {
					goodsName: "購物劵",
					goodsPayFor: "積分兌換",
					goodsCode: "1560",
					goodsNums: 1
				},
				goodsNumber: "2019040515698",
				goodsState: "交易完成",
				goodsTimer: "2020-09-05 16:15:10",
				navList: [{
						state: 0,
						text: '全部',
						orderList: []
					},
					{
						state: 1,
						text: '已使用',
						orderList: []
					},
					{
						state: 2,
						text: '未使用',
						orderList: []
					},
					{
						state: 3,
						text: '已過期',
						orderList: []
					}
				],
				tabCurrentIndex: 0,
				swiperheight: 0
			}
		},
		components: {
			headerTitle,
			loadRefresh,
			couponPage
		},
		onShow() {
			this.getPageHeight()
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			console.log('222222');
		},
		methods: {
			// 跳转优惠卷详情
			toCouponDetail() {
				uni.navigateTo({
					url: "../couponDetailPage/index"
				})
			},
			toOrderDetail() {
				uni.navigateTo({
					url: "../orderDetails/index"
				})
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(220);
						this.swiperheight = height;
					}
				});
			},
			toHome() {
				uni.navigateTo({
					url: "../../index"
				})
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			}
		}
	}
</script>

<style scoped>
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
		background-color: #dc5340;
	}
	
	.nav {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		background-color: #dc543e;
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
	
	.page {
		width: 100%;
		height: 100%;
		background-color: rgb(250, 250, 250);
	}

	.container {
		margin: 0 20upx;
	}

	.navBox {
		position: fixed;
		top: 140upx;
		left: 0;
		width: 100%;
		height: 80upx;
		z-index: 100;
		background-color: rgb(250, 250, 250);
	}

	.navbar {
		position: fixed;
		top: 140upx;
		display: flex;
		width: 100%;
		line-height: 78upx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		border: 2upx solid #EEEEEE;
		background-color: #fff;
		z-index: 9999;
		overflow: hidden;
	}

	.nav-item {
		position: relative;
		width: 25%;
	}

	.nav-item>.line {
		position: absolute;
		top: 74upx;
		left: 50%;
		margin-left: -20upx;
		width: 40upx;
	}

	.current {
		border-bottom: 4upx solid red;
	}

	.goodsList {
		margin-top: 140upx;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.goodsManage {
		background-color: #fff;
	}

	/*订单管理标题 start*/

	.goodsManage>.goods-tit {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		height: 80upx;
		padding: 20upx;
		border-bottom: 4upx solid #e4e4e4;
	}

	.goods-tit>.goodsNumberBox {
		flex: 2;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.goodsNumberBox>.goodsNumberImage {
		width: 30upx;
	}

	.goodsNumberImage>image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.goodsNumberBox>.goodsNumber {
		margin-left: 10upx;
	}

	.goods-tit>.goodsState {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}

	/*订单管理标题 end*/


	/*订单管理内容 start*/

	.goods-context {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 100%;
		padding: 20upx;
		border-bottom: 4upx solid #e4e4e4;
	}

	.goods-context>.goodNameImage {
		display: flex;
		flex: 2;
		justify-content: flex-start;
		width: 250upx;
	}

	.goods-context>.goodNameImage>image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.goods-context>.goodsInfo {
		flex: 2;
		margin-left: 20upx;
		/* position: relative; */
	}

	.goodsInfo>uni-view {
		display: flex;
		align-items: flex-start;
		width: 100%;
		height: 33.3%;
		font-size: 28upx;
	}
	.goodsInfo>uni-view:nth-of-type(n+2){
		color: #b3b3b3;
	}
	.goodsInfo>.goodsPayFor {
		position: relative;
		margin-top: 10px;
		top: 10px;
	}

	.goods-context>.goodsNums {
		flex: 1;
		display: flex;
		align-items: flex-end;
		padding-bottom: 24upx;
		padding-right: 20upx;
		justify-content: flex-end;
		box-sizing: border-box;
	}

	/*订单管理内容 end*/


	/*订单管理下边内容 start*/

	.goodsManage>.goods-timer {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx;
	}

	.goods-timer>.btns {
		background-color: #fe3000;
		border-radius: 80upx;
		padding: 10upx 20upx;
		color: #fff;
	}
</style>
