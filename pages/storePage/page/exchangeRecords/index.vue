<template>
	<view class="page">
		<header-title :title='"兌換記錄"' @toBack='toHome()' :backText="'返回'" :iconfont='"&#xe735;"'></header-title>
		<view class="goodsList">
			<view v-for="(item, i) in navList" :key="i" style="margin-top: 40upx;">
				<view class="goodsManage">
					<view class="goods-context">
						<view style="width: 250upx;" v-if="item.UcpCpnImage ==''">
							<coupon-page @click.native="toDeatil(item)" v-if="item.UcpCpnType === '1'" homeShow="1" textOne="￥" :textTwo="item.UcpCpnAmount"
							 :cpnName="item.UcpCpnName"></coupon-page>
							 <coupon-page @click.native="toDeatil(item)" v-else-if="item.UcpCpnType === '2'" homeShow="1" textOne="￥" :textTwo="item.UcpCpnMinCharge"
							  :cpnName="item.UcpCpnContent"></coupon-page>
							<coupon-page @click.native="toDeatil(item)" v-else homeShow="6" :textOne="item.UcpCpnDiscount" textTwo="折" cpnName="折扣劵"></coupon-page>
						</view>
						<view v-else style="width: 260upx;height: 200upx;" @click.native="toDeatil(item)">
							<coupon-page  style="width: 260upx;height: 200upx;" :image="item.UcpCpnImage" homeShow="4" :textOne="''" textTwo="" cpnName=""></coupon-page>
						</view>
						
						<view class="goodsInfo">
							<view class="goodsName">{{item.UcpCpnName}}</view>
							<view class="listInfo">
								<view>x1</view>
								<view>{{item.UcpCpnIntegral}}積分</view>
							</view>
						</view>
					</view>
					<left-level :numberS="item.UcpId" :timerS="item.UcpGetDate"></left-level>
				</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;" v-show="showLoading">
			<u-loading mode="circle" color="#2979ff" :size="40"></u-loading>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;color:#999; background-color: rgb(250, 250, 250);"  v-show="noMoreData">已經到底拉!</view>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	import leftLevel from "../childComponent/content/exchangeRecords.vue"
	import couponPage from "../childComponent/content/couponPage.vue"
	export default{
		components:{
			headerTitle,
			leftLevel,
			couponPage
		},
		data(){
			return{
				showLoading:false,
				noMoreData:false,
				exchangePage:1,
				userInfoUsrId: null, //用戶id
				goodsInfo: {
					goodsCode: "1560"
				},
				goodsNumber: "2019040515698",
				goodsState: "交易完成",
				goodsTimer: "2020-09-05 16:15:10",
				navList: []
			}
		},
		onPullDownRefresh() {
			this.exchangePage = 1;
			this.getALLData();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.showLoading = true;
			this.getALLData();
		},
		onShow() {
			this.getUserId(); //獲取用戶id
			this.getALLData();
		},
		methods:{
			toDeatil(objValue){
				uni.setStorageSync('exchangeRecordData',objValue)
				uni.navigateTo({
					url:"../exchangeRecordDetail/index"
				})
			},
			toHome(){
				uni.navigateTo({
					url:"../../../me/shoppingNumbers/index"
				})
			},
			getALLData(){
				this.$Httpps
					.sttp({
						"action": "usrcpnrecords",
						"usrId": '27373',
						"page": this.exchangePage
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
						this.exchangePage++;
						this.navList = this.navList.concat(res.data.data);
						console.log('this.navList',this.navList)
					}).catch(err => {
						console.log(err);
				});
			},
			getUserId(){
				let userData = uni.getStorageSync('data');
				if (userData) {
					this.userInfoUsrId = userData.usrId;
				}
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
	.goodsList{
		width: 100%;
		background-color: rgb(250, 250, 250);
		z-index: 1;
	}
	.goodsList>uni-view{
		margin: 20upx;
	}
	.goodsManage {
		background-color: #fff;
	}
	
	
	/*订单管理内容 start*/
	
	.goods-context {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 100%;
		padding: 20upx;
		padding-bottom: 40upx;
		border-bottom: 2upx solid #e4e4e4;
	}
	
	.goods-context>.goodNameImage {
		display: flex;
		justify-content: flex-start;
		width:300upx;
	}
	
	.goods-context>.goodNameImage>image {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.goods-context>.goodsInfo {
		position: relative;
		flex: 2;
		margin-left: 20upx;
	}
	
	.goodsInfo>uni-view {
		display: flex;
		align-items: flex-start;
		width: 100%;
		height: 33.3%;
		font-size: 28upx;
	}
	.goodsInfo>.listInfo{
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
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
	.goods-timer > uni-view:nth-of-type(1){
		color: #b7b8bc;
	}
</style>
