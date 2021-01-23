<template>
	<view class="page">
		<header-title :title='"訂單詳情"' @toBack='toHome()' :backText="''" :iconfont='"&#xe735;"'></header-title>
		<view class="orderDetailsList">
			<view>訂單編號 : 415257513567170998833</view>
			<view>下單時間 : 2018-05-08 11:49</view>
			<view>交易狀態 : 已使用</view>
		</view>
		<order-details :seat="'left'"></order-details>
		<view class="shoppingInfo">
			<view class="shoppingTitle">商品信息</view>
			<view class="shoppingContent">
				<view style="width: 340upx;">
					<coupon-page :textOne="'￥'" :textTwo="'100'" :cpnName="'滿30減40'"></coupon-page>
				</view>
				<view class="contentBox">
					<view class="ContTitle">商品名稱 ：購物劵</view>
					<view class="ContText">
						<view style="color: #868686;">規格  : 100元</view>
						<view>
							<view>價格  :<span style="margin-left: 10upx;color: #fd0000;">1560積分</span></view>
							<view>x1</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<order-details :seat="'center'"></order-details>
		<view class="nums">實付金額 ：1560積分</view>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	import couponPage from "../childComponent/content/couponPage.vue"
	import orderDetails from "../childComponent/content/orderDetails.vue"
	export default{
		components:{
			headerTitle,
			couponPage,
			orderDetails
		},
		methods:{
			toHome(){
				uni.navigateTo({
					url:"../goodsForManage/index"
				})
			}
		}
	}
</script>

<style scoped>
	uni-page-body{
		height: 100%;
	}
	.page {
		width: 100%;
		height: 100%;
		background-color: rgb(250, 250, 250);
	}
	.orderDetailsList{
		padding: 30upx;
		background-color: #FFFFFF;
		line-height: 70upx;
		color: rgb(134, 134, 134);
		letter-spacing: 1upx;
	}
	.shoppingInfo,
	.bottomInfo{
		margin-top: 20upx;
		line-height: 50upx;
		background-color: #FFFFFF;
	}
	.shoppingInfo > .shoppingTitle{
		height: 90upx;
		line-height: 90upx;
		border-bottom: 4upx solid  #e5e5e5;
		padding-left: 30upx;
	}
	
	.shoppingContent{
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 20upx;
	}
	.shoppingContent > .imageBox{
		width: 350upx;
	}
	.shoppingContent > .imageBox > image{
		display: block;
		width: 100%;
		height: 100%;
	}
	.contentBox{
		width: 100%;
		margin-left: 20upx;
	}
	.ContText{
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-top: 20upx;
	}
	.ContText > uni-view:nth-of-type(2){
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
	}
	
	.nums{
		border-top: 2px solid #e5e5e5;
		background-color: #FFFFFF;
		padding: 20upx;
		text-align: right;
		color: rgb(252,64,63);
		font-weight: bold;
		height: 160upx;
	}
</style>
