<template>
	<view class="page">
		<view class="container">
			<view style="height: 120upx;">
				<view class="headerTitle">
					<view class="bgColor"></view>
					<view class="nav">
						<view class="myIcon" @click="toHome()">
							<view class="icon icon-zuojiantou iconfont"></view>
							<view class="text"></view>
						</view>
						<view class="title">我的優惠卷</view>
					</view>
				</view>
			</view>
			<view class="navBox">
				<view class="navbar">
					<view v-for="(item, index) in navList" :key="index" class="nav-item" @click="tabClick(index)">
						<view :class="{ current: tabCurrentIndex === index }">{{ item.text }}</view>
					</view>
				</view>
			</view>
			<view class="goodsList">
				<view v-for="(item, i) in DiscountList" :key="i" 
				style="position: relative; background-color: #FFFFFF;mapadding-bottom: 1px;margin-top: 20upx;"
				@tap="toDetails(item,i)">
					<view class="circleTop"></view>
					<view class="shoppingInfo">
						<view style="width: 250upx;" v-if="item.CpnImage ==''">
							<coupon-page v-if="item.CpnType === '1'" homeShow="1" textOne="￥" :textTwo="item.CpnAmount"
							 :cpnName="item.CpnName"></coupon-page>
							 <coupon-page v-else-if="item.CpnType === '2'" homeShow="1" textOne="￥" :textTwo="item.CpnMinCharge"
							  :cpnName="item.CpnContent"></coupon-page>
							<coupon-page v-else homeShow="6" :textOne="item.CpnDiscount" textTwo="折" cpnName="折扣劵"></coupon-page>
						</view>
						<view v-else style="width: 260upx;height: 200upx;">
							<coupon-page  style="width: 260upx;height: 200upx;" :image="item.CpnImage" homeShow="4" :textOne="''" textTwo="" cpnName=""></coupon-page>
						</view>
						<view class="shoppingInfoList">
							<view>優惠卷名稱</view>
							<view>{{item.UcpCpnName}}</view>
							<view>有效期:{{item.UcpCpnDueDate.split(" ")[0]}}</view>
						</view>
						<view class="useImage">
							<image v-show="useImageS" src="./img/useImage.png" mode="aspectFill"></image>
							<image v-show="expireS" src="./img/expire.png" mode="aspectFill"></image>
						</view>
						<view class="immediatelyUse" :class="active?'bgColor':''">
							立即使用
						</view>
					</view>
					<view class="circleBottom"></view>
				</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;" v-show="showLoading">
			<u-loading mode="circle" color="#2979ff" :size="40"></u-loading>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;color:#999;"  v-show="DiscountList.length !== 0">已經到底拉!</view>
		<u-empty img-width='170' margin-top='100%' :show='DiscountList.length == 0' text="您暫時沒有優惠卷的數據" mode="list"></u-empty>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import couponPage from "../../storePage/page/childComponent/content/couponPage.vue" //優惠卷組件
	export default {
		data() {
			return {
				useImageS:false,
				expireS:false,
				active:false,
				showLoading:false,
				noMoreData:false,
				CpnId: '', //優惠卷id
				userInfoUsrId: null, //用戶id
				indexItem: null, //優惠卷下標
				collectPage: 1,
				totalPage: 99,
				goodsInfo: {
					goodsName: "购物劵",
					goodsPayFor: "积分兑换",
					goodsCode: "1560",
					goodsNums: 1
				},
				goodsNumber: "2019040515698",
				goodsState: "交易完成",
				goodsTimer: "2020-09-05 16:15:10",
				navList: [{
						state: 0,
						text: '未使用',
						orderList: []
					},
					{
						state: 1,
						text: '已使用',
						orderList: []
					},
					{
						state: 2,
						text: '已過期',
						orderList: []
					}
				],
				tabCurrentIndex: 0,
				swiperheight: 0,
				DiscountList: []
			}
		},
		//优惠卷发布界面
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.navigateTo({
					url: "../discountRelease/index"
				})
			} else {
				uni.navigateTo({
					url: "../../index"
				})
			}
		},
		components: {
			headerTitle,
			loadRefresh,
			couponPage
		},
		onShow() {
			this.getUserId(); //獲取用戶id
			this.getPageHeight();
			this.getAllData('0'); //獲取全部優惠卷列表
		},
		onPullDownRefresh() {
			let i = this.tabCurrentIndex;
			switch (i) {
				case 0:
					this.collectPage = 1;
					this.DiscountList = [];
					this.getAllData('0');
					break;
				case 1:
					this.collectPage = 1;
					this.DiscountList = [];
					this.getAllData('1')
					break;
				default:
					this.collectPage = 1;
					this.DiscountList = [];
					this.getAllData('2')
			}
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.showLoading = true
			let i = this.tabCurrentIndex;
			switch (i) {
				case 0:
					this.getAllData('0');
					break;
				case 1:
					this.getAllData('1')
					break;
				default:
					this.getAllData('2')
			}
		},
		methods: {
			toDetails(obj,i){
				if(this.tabCurrentIndex !== 0) return;
				uni.setStorageSync('useCheaterData', obj);
				uni.navigateTo({
					url:"../useCheater/index"
				})
			},
			getUserId() {
				let userData = uni.getStorageSync('data');
				if (userData) {
					this.userInfoUsrId = userData.usrId;
				}
			},
			//獲取全部優惠卷列表數據
			getAllData(statu) {
				this.$Httpps
					.sttp({
						"action": "getusrcpnlist",
						"usrId": '27373',
						"page": this.collectPage,
						"statu":statu
					})
					.then(res => {
						if (res.data.result != "suc") {
							if (res.data.msg == '没有更多数据') {
								this.showLoading = false
								this.noMoreData = true;
								uni.showToast({
									icon: "none",
									title: res.data.msg
								})
								return;
							}
						}
						this.showLoading = false;
						this.collectPage++;
						this.DiscountList = this.DiscountList.concat(res.data.data);
					}).catch(err => {
						console.log(err);
					});
			},
			toHome() {
				uni.switchTab({
					url:"../me"
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
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				switch (index) {
					case 0:
						this.active = false;
						this.collectPage = 1;
						this.DiscountList = [];
						this.useImageS = false;
						this.expireS = false;
						this.getAllData('0');
						break;
					case 1:
						this.active = true;
						this.collectPage = 1;
						this.DiscountList = [];
						this.useImageS = true;
						this.expireS = false;
						this.getAllData('1')
						break;
					default:
						this.active = true;
						this.useImageS = false;
						this.expireS = true;
						this.collectPage = 1;
						this.DiscountList = [];
						this.getAllData('2')
				}
			}
		}
	}
</script>

<style scoped>
	.bgColor{
		color: #CCCCCC;
	}
	.useImage{
		position: absolute;
		top: 24upx;
		right: 60upx;
		width: 150upx;
		height: 150upx;
		z-index: 10;
	}
	.useImage image{
		display: block;
		width: 100%;
		height: 100%;
	}
	.circleTop{
		position: absolute;
		top: -30upx;
		left: 220upx;
		width: 50upx;
		height: 50upx;
		background-color: rgb(243, 243, 243);
		z-index: 10;
		border-radius: 20upx;
	}
	.circleBottom{
		position: absolute;
		bottom: -30upx;
		left: 220upx;
		width: 50upx;
		height: 50upx;
		background-color: rgb(243, 243, 243);
		z-index: 10;
		border-radius: 20upx;
	}
	.headerTitle {
		position: fixed;
		width: 100%;
		z-index: 11;
		top: 0;
		left: 0;
	}

	.bgColor {
		width: 100%;
		height: 60upx;
		background-color: #FFFFFF;
	}

	.nav {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		background-color: #fff;
		width: 100%;
		border-bottom: 2upx solid #CCCCCC;
	}

	.myIcon {
		position: absolute;
		display: flex;
		flex-direction: row;
		color: #010101;
		z-index: 5;
	}

	.iconfont {
		color: #010101;
		font-size: 54upx;
	}

	.text {
		color: #fff;
		font-size: 30upx;
	}

	.title {
		width: 100%;
		text-align: center;
		color: #010101;
		font-size: 36upx;
	}



	.page {
		width: 100%;
		height: 100%;
		background-color: rgb(243, 243, 243);
	}

	.container {
		margin: 0 10upx;
		padding-top: 120upx;
	}

	.navBox {
		position: fixed;
		left: 0;
		top: 140upx;
		width: 100%;
		z-index: 100;
		background-color: #FFFFFF;
	}

	.navbar {
		position: fixed;
		top: 140upx;
		left: 0;
		display: flex;
		width: 100%;
		line-height: 78upx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
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
		color: red;
	}

	.goodsList {
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgb(250, 250, 250);
	}

	.shoppingInfo {
		position: relative;
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: #FFFFFF;
	}
	
	.shoppingInfo>.shoppingImage {
		position: relative;
		width: 250upx;
		height: 200upx;
		background: linear-gradient(#f97028, #f42e3b);
		/* 标准语法*/
	}

	.shoppingInfo>.shoppingImage:after {
		color: #ddd;
		font-size: 5px;
		content: '';
		position: absolute;
		width: 10px;
		height: 200upx;
		z-index: 1000;
		left: 0%;
		background: #fff;
		background-size: 2rem .66rem;
		/*transform:  rotate(-90deg);*/
		background-image: linear-gradient(45deg, #f42e3b 25%, transparent 25%, transparent), linear-gradient(45deg, #f42e3b 25%, transparent 25%, transparent), linear-gradient(135deg, transparent 75%, #f42e3b 75%), linear-gradient(-45deg, transparent 75%, #f42e3b 75%);
	}

	.shoppingInfo>.shoppingImage::before {
		color: #ddd;
		font-size: 5px;
		content: '';
		position: absolute;
		width: 10px;
		height: 200upx;
		z-index: 1000;
		right: 0%;
		background: #fff;
		background-size: 2rem .66rem;
		/*transform:  rotate(-90deg);*/
		background-image: linear-gradient(-45deg, #f42e3b 25%, transparent 25%, transparent), linear-gradient(-135deg, #f42e3b 25%, transparent 25%, transparent), linear-gradient(-45deg, transparent 75%, #f42e3b 75%), linear-gradient(-135deg, transparent 75%, #f42e3b 75%);
	}
	.shoppingInfo>.immediatelyUse{
		position: absolute;
		display: flex;
		align-items: center;
		right: 0upx;
		top: 0;
		width: 	90upx;
		height: 100%;
		padding: 0 25upx;
		text-align: center;
		border-left: 4upx dotted #e6e6e6;
	}



	.shoppingImage>image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.shoppingInfoList {
		padding-top: 30upx;
		line-height: 50upx;
		margin-left: 20upx;
		box-sizing: border-box;
	}
	.shoppingInfoList>uni-view:nth-of-type(1){
		font-size: 36upx;
	}
	.shoppingInfoList>uni-view:nth-of-type(n+2){
		margin-top: 10upx;
		color: #CCCCCC;
	}
	.shoppingInfoList>view {
		display: flex;
		width: 100%;
		justify-content: flex-start;
		align-items: center;
		height: 25%;
	}

</style>
