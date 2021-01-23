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
					<view class="title">核銷記錄</view>
				</view>
			</view>
		</view>
		<view class="ContText">
			<view class="item" v-for="(item,index) in arr" :key="index">
				<!-- <view class="userImage">
					<image src="../../../../../static/verificationPage/bottomImage1.jpg" mode="aspectFill"></image>
				</view> -->
				<view class="userInfo">
					<view class="items">
						<view>用戶名</view>
						<view>{{item.UcpCpnDueDate}}</view>
					</view>
					<view class="items">
						<view>優惠卷單號</view>
						<view>{{item.UcpNo}}</view>
					</view>
					<view class="items">
						<view>優惠類型</view>
						<view>{{typeData(item.UcpCpnType)}}</view>
					</view>
					<view class="items">
						<view>優惠劵內容</view>
						<view>{{item.UcpCpnContent}}</view>
					</view>
					<view class="items">
						<view>聯繫方式</view>
						<view>{{item.UcpUsrTel}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;" v-show="showLoading">
			<u-loading mode="circle" color="#2979ff" :size="40"></u-loading>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;color:#999;"  v-show="arr.length !== 0">已經到底拉!</view>
		<u-empty img-width='170' margin-top='100%' :show='arr.length == 0' text="您暫時沒有核銷記錄的數據" mode="list"></u-empty>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userInfoUsrId: null, //用戶id
				arr:[],
				showLoading:false,
				collectPage: 1
			}
		},
		onPullDownRefresh() {
			this.collectPage = 1;
			this.arr = [];
			this.getDeatil()
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.showLoading = true;
			this.getDeatil()
		},
		onShow() {
			this.getUserId(); //獲取用戶id
			this.getDeatil();
		},
		methods:{
			typeData(n){
				if( n == '1'){
					return "现金劵"
				}else if(n == '2'){
					return "满减卷"
				}else{
					return "折扣劵"
				}
			},
			// 用戶id
			getUserId() {
				let userData = uni.getStorageSync('data');
				if (userData) {
					this.userInfoUsrId = userData.usrId;
				}
			},
			toHome(){
				uni.navigateTo({
					url:'../index'
				})
			},
			getDeatil(){
				this.requestPost({
					"action":"bizwritelist",
					"bizId":this.userInfoUsrId,
					"page": this.collectPage
				}).then(response =>{
					if (response.data.result != "suc") {
						if (response.data.msg == '没有更多数据') {
							this.showLoading = false
							this.noMoreData = true;
							uni.showToast({
								icon: "none",
								title: response.data.msg
							})
							return;
						}
					}
					this.collectPage++;
					this.arr = this.arr.concat(response.data.data);
					console.log('this.arr',this.arr)
				})
			}
		}
	}
</script>

<style scoped>
	.page{
		width: 100%;
		height: 100%;
	}
	.headerTitle {
		height: 120upx;
		position: fixed;
		width: 100%;
		z-index: 9;
		top: 0;
		left: 0;
		letter-spacing: 2upx;
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
	/* 內容 */
	.ContText{
		width: 100%;
		margin: 40upx 0;
		padding: 0 20upx;
		box-sizing: border-box;
	}
	.ContText > .item{
		width: 100%;
		display: flex;
		flex-direction: row;
		box-shadow: 0px 0px 13upx #CCCCCC;
		border-radius: 20upx;
	}
	.ContText > .item:nth-of-type(n+2){
		margin-top: 40upx;
	}
	.ContText > .item > .userImage{
		width: 120upx;
		height: 120upx;
		margin: 30upx;
		border-radius: 50%;
	}
	 .item > .userImage > uni-image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.userInfo{
		width: 100%;
		box-sizing: border-box;
		margin: 10upx 20upx;
	}
	.userInfo > .items{
		width: 100%;
		border-bottom: 2upx solid #d3cbcb;
		display: flex;
		height: 80upx;
		line-height: 80upx;
		flex-direction: row;
		justify-content: space-between;
		box-sizing: border-box;
		font-family: "MicrosoftYaHei";
	}
	.userInfo > .items:nth-of-type(1) > uni-view:nth-of-type(1){
		color: #333333;
	}
	.userInfo > .items:nth-of-type(1) > uni-view:nth-of-type(2){
		color: #888888;
	}
	.userInfo > .items:nth-of-type(n+2) > uni-view:nth-of-type(1){
		color: #888888;
	}
	.userInfo > .items:last-of-type{
		border-bottom: none;
	}
</style>
