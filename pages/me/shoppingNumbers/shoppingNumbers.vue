<template>
	<view class="page" >
		<header-title :title="'積分商城'" :backText="'我的'" @toBack='toMe' :iconfont="'&#xe728;'"></header-title>
		<scroll-view scroll-y :style="'min-height:'+pageHeight+'px'">
			<view class="list" >
				<view class="list-item" v-for="(items,index) in shopList" :key="index" @tap="toShopNumDetailes(items)">
					<view class="list-item-img">
						<image class="couponImg" :src="items.CpnImage" alt="">
					</view>
					<view class="list-item-title">{{items.CpnName}}</view>
					<view class="listBottom">
						<view class="listBottom-left">
							<view class="iconfont">&#xe633;</view>
							<view class="numbers">{{items.CpnIntegral}}</view>
						</view>
						<view style="flex: 1;"></view>
						<view class="btn" >立即兌換</view>
					</view>
					<view class="listData">
						<view class="text">有效期至:</view>
						<view class="text">{{items.CpnDueDate}}</view>
					</view>
				</view>
			</view>
			<!-- <view class="dataNullImage" v-show="!imageShow">
				<image src="../../../static/index/null.png" mode="" :style="{height: swiperheight + 'px' }"></image>
			</view> -->
			<u-empty img-width='170' margin-top='120' :show='shopList.length == 0' text="暫時沒有可供兌換的積分商品" mode="list"></u-empty>
		</scroll-view>
	</view>
</template>

<script>
	import headerTitle from '../../../components/header-title/index.vue'
	export default {
		data() {
			return {
				shopList: [],
				swiperheight: 500, //高度
				imageShow: false,
				pageHeight:667
			}
		},
		components:{
			headerTitle
		},
		onLoad() {
			this.getcoupon();
			uni.getSystemInfo({
				success: (res) => {
					let height = res.screenHeight;
					this.pageHeight = height;
					console.log(height)
				}
			});
		},
		methods: {
			// 获取优惠券列表 
			getcoupon(){
				this.imageShow = true;
				uni.showLoading()
				this.$Httpps
					.sttp({
						"action": "getcoupon"
					})
					.then(res => {
						uni.hideLoading()
						if(res.data.result == 'suc'){
							this.shopList = res.data.data;
							if(this.shopList.length > 0){
								this.imageShow =true
							}else{
								this.imageShow = false
							}
						}else {
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
						}
					}).catch(err => {
						console.log(err);
				});
			},
			toShopNumDetailes(data) {
				var CpnId = data.CpnId;
				uni.navigateTo({
					url: '../shopNumDetailes/shopNumDetailes?CpnId=' + CpnId
				})
			},
			toMe() {
				uni.switchTab({
					url: '../me'
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		width: 100%;
		height: 100%;
	}

	.bgColor {
		width: 100%;
		height: 40upx;
		background-color: #dc5340;
	}

	.nav {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		background-color: #dc5340;
	}

	.navContent {
		display: flex;
		align-items: center;
		width: 100%;
		position: relative;
	}
	.navContent .myIcon{
		position: absolute;
		display: flex;
		flex-direction: row;
		color: white;
	}
	.navContent .iconfont {
		color: #fff;
		font-size: 46upx;
	}

	.navContent .text {
		color: #fff;
		font-size: 30upx;
	}
	.navContent .title {
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: 36upx;
	}

	.list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		
	}

	.list-item {
		display: flex;
		flex-direction: column;
		margin-top: 20upx;
		height: 500upx;
		background-color: #fff;
		width: 48%;
		margin: 20upx 1%;
		padding: 0 10upx;
		box-sizing: border-box;
		border: #DBDBDB 1px solid;
	}

	.list-item-img {
		display: block;
		width: 100%;
		height: 200upx;
		border-radius: 10upx;
		margin-top: 10upx;
	}

	.list-item-img>image {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}

	.list-item-title {
		width: 100%;
		line-height: 60upx;
		height: 120upx;
		color: #000000;
		text-align: center;
		font-weight: bold;
		font-size: 34upx;
		letter-spacing: 1upx;
		font-family: "monospace";
	}

	.listBottom {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20upx;
	}

	.listBottom-left {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.listBottom-left>.iconfont {
		font-size: 45upx;
	}

	.listBottom-left>.numbers {
		margin-left: -4upx;
		font-size: 30upx;
	}
	.listBottom .btn {
		width: 180upx;
		height: 70upx;
		font-family: "monospace";
		line-height: 70upx;
		text-align: center;
		color: #F0FEFC;
		font-size: 30upx;
		border-radius: 20upx;
		background-color: #DA3136;
	}

	.dataNullImage,
	uni-image {
		width: 100%;
		height: 100%;
	}




	.listData {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.listData>.text {
		font-size: 24upx;
		color: #ccc;
		line-height: 80upx;
	}
</style>
