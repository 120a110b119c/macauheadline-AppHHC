<template>
	<view class="page">
		<header-title :title='"兌換詳情"' @toBack='toHome()' :backText="'返回'" :iconfont='"&#xe735;"'></header-title>
		<view class="content">
			<view class="contentTitle">
				<view>
					<view>訂單編號:</view>
					<view>{{obj.UcpNo}}</view>
				</view>
				<view>
					<view>兌換時間:</view>
					<view>{{obj.UcpCpnDueDate}}</view>
				</view>
				<view>
					<view>交易狀態:</view>
					<view>{{obj.UcpStatus}}</view>
				</view>
			</view>
			<view class="shoppingItem">
				<view class="shoppingItemTitle">商品信息</view>
			</view>
			<view class="shoppingItemContent">
				<view>商品信息</view>
				<view class="goods-context">
					<view style="width: 250upx;" v-if="obj.UcpCpnImage ==''">
						<coupon-page v-if="obj.UcpCpnType === '1'" homeShow="1" textOne="￥" :textTwo="obj.UcpCpnAmount"
						 :cpnName="obj.UcpCpnName"></coupon-page>
						 <coupon-page v-else-if="obj.UcpCpnType === '2'" homeShow="1" textOne="￥" :textTwo="obj.UcpCpnMinCharge"
						  :cpnName="obj.UcpCpnContent"></coupon-page>
						<coupon-page v-else homeShow="6" :textOne="obj.UcpCpnDiscount" textTwo="折" cpnName="折扣劵"></coupon-page>
					</view>
					<view v-else style="width: 260upx;height: 200upx;">
						<coupon-page  style="width: 260upx;height: 200upx;" :image="obj.UcpCpnImage" homeShow="4" :textOne="''" textTwo="" cpnName=""></coupon-page>
					</view>
					<view class="goodsInfo">
						<view class="goodsName">{{obj.UcpCpnName}}</view>
						<view class="listInfo">
							<view>價格:{{obj.UcpCpnIntegral}}積分</view>
							<view>x1</view>
						</view>
					</view>
				</view>
			</view>
			<view class="shoppingItem">
				<view class="shoppingItemTitle">支付信息</view>
			</view>
			<view class="payForContent">
				<view>
					<view>商品總額:</view>
					<view>{{obj.UcpCpnIntegral}}</view>
				</view>
				<view>
					<view>使用方式:</view>
					<view v-if="obj.UcpCpnType ==1">滿減劵</view>
					<view v-if="obj.UcpCpnType ==2">現金劵</view>
					<view v-if="obj.UcpCpnType ==3">折扣劵</view>
				</view>
			</view>
			<view class="money">
				<view>實付金額:{{obj.UcpCpnIntegral}}</view>
				<view>積分</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	import couponPage from "../childComponent/content/couponPage.vue" //優惠卷組件
	export default{
		components:{
			headerTitle,
			couponPage
		},
		data(){
			return{
				obj:null
			}
		},
		onShow() {
			this.obj = uni.getStorageSync('exchangeRecordData');
			console.log('this.obj',this.obj)
		},
		methods:{
			toHome(){
				uni.navigateTo({
					url:"../exchangeRecords/index"
				})
			}
		}
	}
</script>

<style scoped>
	.page{
		width: 100%;
		height: 100%;
		background-color: rgb(240,240,240);
	}
	.goodsInfo{
		width: 70%;
		margin-left: 20upx;
	}
	.goodsInfo > .goodsName{
		margin-bottom: 20upx;
	}
	.listInfo{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		color: #bcb9b9;
	}
	.content{
		margin-top: 20upx;
		width: 100%;
	}
	.contentTitle{
		display: flex;
		width: 100%;
		flex-direction: column;
		padding: 30upx;
		box-sizing: border-box;
		background-color: #fff;
	}
	.contentTitle > uni-view{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		line-height: 60upx;
	}
	
	
	.shoppingItem{
		width: 100%;
		padding: 20upx;
		background-color: #fff;
		box-sizing: border-box;
		margin-top: 20upx;
	}
	.shoppingItem > .shoppingItemTitle{
		padding: 20upx 0;
		box-sizing: border-box;
	}
	.shoppingItemContent{
		width: 100%;
		height: 100%;
		margin-top: 4upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.goods-context {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 100%;
		padding: 20upx;
		padding-bottom: 0;
	}
	.shoppingItem > .line{
		width: 100%;
		height: 4upx;
		background-color: #e4e4e4;
	}
	.payForContent{
		width: 100%;
		margin-top: 20upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-bottom: 2upx solid #e4e4e4;
		color: #bcb9b9;
	}
	.payForContent > uni-view{
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-top: 20upx;
		justify-content: flex-start;
	}
	.money{
		color: #fe4241;
		font-size: 34upx;
		background-color: #FFFFFF;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding: 30upx 0;
		padding-right: 30upx;
		font-weight: bold;
	}
</style>
