<template>
	<view class="page">
		<view>
			<view style="height: 120upx;">
				<view class="headerTitle">
					<view class="bgColor"></view>
					<view class="nav">
						<view class="myIcon" @tap="toLeft()">
							<view class="icon icon-zuojiantou iconfont"></view>
							<!-- <view class="text">商家端首頁</view> -->
						</view>
						<view class="title">积分商城</view>
						<!-- <view class="myIconRight" @tap="toRight()">
							<view class="icon icon-sousuokuang iconfont"></view>
						</view> -->
					</view>
				</view>
			</view>
			<view class="headBgBlack"></view>
			<view class="headBgImage">
				<image src="./image/headBgImage.png" mode="widthFix"></image>
			</view>
			<view class="curve"></view>
			<view class="headBox">
				<view class="headList" @tap="toMyIntegrate()">
					<view class="headImage">
						<image src="./image/money.png" mode="widthFix"></image>
					</view>
					<view class="headText">我的積分</view>
				</view>
				<view class="headList" @tap="toMyCollect()">
					<view class="headImage">
						<image src="./image/heart.png" mode="widthFix"></image>
					</view>
					<view class="headText">我的收藏</view>
				</view>
				<view class="headList" @tap="toMyCheater()">
					<view class="headImage">
						<image src="./image/moneyRed.png" mode="widthFix"></image>
					</view>
					<view class="headText">我的優惠卷</view>
				</view>
				<view class="headList" @click="toExchangeOld">
					<view class="headImage">
						<image src="./image/pages.png" mode="widthFix"></image>
					</view>
					<view class="headText">兌換記錄</view>
				</view>
			</view>
			<view class="contentBox">
				<view class="contentTitle">
					<view>活動專題</view>
					<view>
						<span style="color: #f6402a">更多</span>
					</view>
				</view>
				<view class="contentList" v-for="(item,i) in topArray" :key="i">
					<view class="contentListImage">
						<view style="width: 250upx;height: 240upx;margin-top: 50upx;" v-if="item.CpnImage ==''">
							<coupon-page v-if="item.CpnType === '1'" homeShow="1" textOne="￥" :textTwo="item.CpnAmount"
							 :cpnName="item.CpnName"></coupon-page>
							 <coupon-page v-else-if="item.CpnType === '2'" homeShow="1" textOne="￥" :textTwo="item.CpnMinCharge"
							  :cpnName="item.CpnName"></coupon-page>
							<coupon-page v-else homeShow="6" :textOne="item.CpnDiscount" textTwo="折" cpnName="折扣劵"></coupon-page>
						</view>
						<view v-else style="width: 260upx;height: 200upx;">
							<coupon-page  style="width: 260upx;height: 200upx;" :image="item.CpnImage" homeShow="4" :textOne="''" textTwo="" cpnName=""></coupon-page>
						</view>
					</view>
					<view class="textList">
						<view>{{item.CpnName}}</view>
						<view>限量{{item.CpnStock}}份</view>
						<view style="color: #cccccc;font-size: 20upx;">{{item.CpnCount}}人已領</view>
						<view>
							<span style="color: #f6402a">{{item.CpnIntegral}}</span>積分
						</view>
					</view>
				</view>
				<view class="contentTitle">
					<view v-if="bottomArray.length !=0">猜你喜歡</view>
					<view  v-if="bottomArray.length !=0">
						<span style="color: #f6402a">更多</span>
					</view>
				</view>
				<view class="machineList">
					<view class="machineBox" v-for="(item,i) in bottomArray" :key="i">
						<view class="machineImage">
							<image :src="item.CpnImage" mode="widthFix"></image>
						</view>
						<view class="machineDescribe">
							{{item.CpnName}}
						</view>
						<view class="machineGrade">
							<span>{{item.CpnIntegral}}</span>積分
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;" v-show="showLoading">
			<u-loading mode="circle" color="#2979ff" :size="40"></u-loading>
		</view>
		<u-toast ref="msgToast" />
		<view style="width: 100%;display: flex;justify-content: center;color:#999;" v-show="noMoreData">已經到底啦!</view>
	</view>
</template>

<script>
	import couponPage from "../../storePage/page/childComponent/content/couponPage.vue" //優惠卷組件
	export default {
		data() {
			return {
				userInfoUsrId: null,
				collectPage: 1,
				showLoading: false,
				noMoreData: false,
				topArray: [],
				bottomArray: []
			}
		},
		onShow() {
			this.getData();
		},
		components:{
			couponPage
		},
		methods: {
			toDeatil(value){
				let objValue = JSON.stringify(value);
				uni.navigateTo({
					url:"./shoppingNumDetail/index?objValue="+objValue
				})
			},
			toMyIntegrate(){
				uni.navigateTo({
					url:"../integrate/integrate"
				})
			},
			toMyCollect(){
				this.$refs.msgToast.show({
					title: '該功能正在開發中喲!敬請期待',
					type: 'primary',
					icon: false
				})
				// uni.navigateTo({
				// 	url:"../collect/collect"
				// })
			},
			toMyCheater(){
				uni.navigateTo({
					url:"../myCheater/index"
				})
			},
			getData() {
				this.$Httpps
					.sttp({
						"action": "getintegralshop",
						"page": this.collectPage
					})
					.then(res => {
						if (res.data.result != "suc") {
							if (res.data.msg == '没有更多数据') {
								this.showLoading = false
								this.noMoreData = true;
								return;
							}
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
						this.collectPage++;
						let array = res.data.data;
						let top = array.splice(0, 2);
						this.topArray = top;
						this.bottomArray = array;
					}).catch(err => {
						console.log(err);
					});
			},
			toExchangeOld() {
				uni.navigateTo({
					url: "../../storePage/page/exchangeRecords/index"
				})
			},
			toLeft() {
				uni.switchTab({
					url: "../me"
				})
			},
			toRight() {
				console.log('Right')
			}
		},
		onReachBottom() {
			this.showLoading = true;
			this.getData()
		},
		onPullDownRefresh() {
			this.currPage = 1;
			this.getData();
			uni.stopPullDownRefresh();
		}
	}
</script>

<style scoped>
	.page {
		width: 100%;
		height: 100%;
		background-color: rgb(250, 250, 250);
	}

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
		background-color: rgb(48, 48, 48);
	}

	.nav {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		background-color: rgb(48, 48, 48);
		width: 100%;
	}

	.myIcon {
		position: absolute;
		left: 24upx;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
	}

	.myIconRight {
		position: absolute;
		right: 40upx;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
	}

	.myIconRight>.icon-sousuokuang {
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

	.headBgBlack {
		position: relative;
		width: 100%;
		height: 250upx;
		background-color: rgb(48, 48, 48);
	}

	.headBgImage {
		position: absolute;
		top: 160upx;
		left: 50%;
		margin-left: -335upx;
		width: 670upx;
		z-index: 2;
	}

	.headBgImage>uni-image {
		border-radius: 20upx;
	}

	.headBgImage image {
		display: block;
		width: 100%;
		height: 1005;
	}

	.curve {
		width: 100%;
		background-color: #FFFFFF;
		position: relative;
	}

	.curve::after {
		content: '';
		width: 120%;
		height: 122upx;
		position: absolute;
		left: -10%;
		top: -60upx;
		z-index: 1;
		border-radius: 60% 60% 0 0;
		background-color: #FFFFFF;
	}

	.headBox {
		display: flex;
		justify-content: space-around;
		width: 100%;
		margin-top: 60upx;
		padding-top: 60upx;
		margin-bottom: 30upx;
		background-color: #FFFFFF;
	}

	.headList {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;

	}

	.headImage {
		width: 80upx;
	}

	.headImage image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.headText {
		margin: 20upx 0;
	}




	.contentBox {
		padding: 0 40upx;
		height: 100%;
		background-color: #FFFFFF;
		margin-bottom: 20upx;
	}

	.contentTitle {
		padding: 40upx 0;
		padding-bottom: 20upx;
		display: flex;
		justify-content: space-between;
	}

	.contentList {
		position: relative;
		display: flex;
		flex-direction: row;
		margin-top: 20upx;
	}

	.contentListImage {
		width: 250upx;
		height: 240upx;
	}

	.contentListImage image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.textList {
		margin-left: 40upx;
	}

	.textList>uni-view:nth-of-type(1) {
		margin-top: 40upx;
		color: #414141;
		font-weight: bold;
		font-size: 30upx;
		letter-spacing: 2upx;
	}

	.textList>uni-view:nth-of-type(2) {
		border: 2upx solid #f6402a;
		padding: 2upx 6upx;
		border-radius: 10upx;
		color: #f6402a;
		font-weight: bold;
		font-size: 30upx;
		letter-spacing: 2upx;
		margin: 10upx 0;
		text-align: center;
		width: 180upx;
	}

	/* .textList>uni-view:nth-of-type(3) {
		margin-top: 35upx;
	} */

	.textList>uni-view:nth-of-type(4) {
		margin-top: 5upx;
		font-size: 30upx;
	}

	.textList>uni-view:nth-of-type(4) span {
		font-size: 40upx;
	}

	.atOnceExchange {
		position: absolute;
		right: 0;
		bottom: 20upx;
		background-color: rgb(255, 236, 232);
		padding: 10upx 20upx;
		color: #f6402a;
		font-weight: bold;
		border-radius: 30upx;
	}



	.machineList {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 20upx;
	}

	.machineList>.machineBox:nth-child(2n) {
		margin-left: 10%;
	}

	.machineBox {
		width: 45%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 20upx;
	}

	.machineImage {
		width: 300upx;
	}

	.machineImage image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.machineBox>.machineDescribe {
		margin: 20upx 0 10upx 0;
		color: #414141;
		font-weight: bold;
	}

	.machineBox>.machineGrade {
		color: rgb(246, 64, 42);
		letter-spacing: 2upx;
	}
</style>
