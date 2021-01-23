<template>
	<view class="page">
		<custom-cover></custom-cover>
		<scroll-view scroll-y style="height: 100vh;">
			<view class="header-Title">
				<!-- <view class="bgColor"></view> -->
				<view class="nav">
					<view class="navContent">
						<view class="leftInfo" @tap="toMe()">
							<view class="iconfont">&#xe728;</view>
							<view class="text">返回</view>
						</view>
						<view class="title">積分明細</view>
						<view class="navRight" @tap="toIntegrateDetails()">
							<view class="text">
								積分規則 
							</view>
						</view>
					</view>
					<view class="titleIntegralInfo">
						<view class="integralNumber">當前積分</view>
						<view class="integralContent">
							<view>{{integralNumber}}</view>
							<view @click="toIntegralShop">積分商城</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 88upx;"></view>
			<view  style="position: relative;top: 356upx;" :style="{height: (swiperheight)  + 'px',overflow:'hidden' }">	
				<load-refresh v-show="interaList.length != 0" ref="loadRefresh" :pageNo="collectPage" :totalPageNo="totalPage"
				 :isRefresh="true" :refreshTime="800" @loadMore="loadMore()" @refresh="refresh"  :integrate="parentMsg">
				 <view slot="content-list" >
						<view class="list">
							<view class="list-item" v-for="(item,index) in interaList" :key="index">
								<view class="">
									<view class="list-item-name">{{item.uitIntType}}</view>
									<view class="listTime">
										{{item.uitDate}}
									</view>
								</view>
								<view class="list-item-content" >
									<view class="numbers">{{item.uitIntegral}}</view>
									<view class="iconfont">&#xe633;</view>
								</view>
							</view>
						</view>
				 </view>
				</load-refresh>
			</view>
			<view class="copyrightSymbol" v-show='interaList.length > 0'>©澳門頭條:&nbsp;macauheadline.com</view>
			<u-empty img-width='170' margin-top='120' :show='interaList.length == 0' text="您暫時沒有獲取任何積分" mode="list"></u-empty>
		</scroll-view>
	</view>
</template>

<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	export default{
		components:{
			loadRefresh
		},
		data(){
			return{
				parentMsg: 'father',
				totalPage:999,
				collectPage:1,
				integralNumber:'',
				interaList:[],
				swiperheight:0
			}
		},
		onLoad() {
			this.getData()
		},
		methods:{
			loadMore(){
				this.collectPage = this.collectPage + 1;
				this.getData()
			},
			refresh(){
				this.getData("refresh")
			},
			toIntegralShop(){
				uni.navigateTo({
					url:'../shoppingNumbers/shoppingNumbers'
				})
			},
			toIntegrateDetails(){
				uni.navigateTo({
					url:'./../integrateDetaile/integrateDetaile'
				})
			},
			toMe(){
				uni.navigateBack()
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(230);
						this.swiperheight = height;
					}
				});
			},
			getData(value){
				let userId =  uni.getStorageSync('data').usrId;
				var serverUrl = this.serverUrl;
				uni.request({
					url: serverUrl,
					data: {
						"action": "getintegraldetail",
						"usrId": userId,
						"page":this.collectPage
					},
					dataType: 'json',
					success: (res) => {
						if(res.data.result == 'suc'){
							if(value == 'refresh'){
								this.interaList = [];
								this.collectPage = 1;
							}
							this.interaList = this.interaList.concat(res.data.data);
							this.integralNumber = res.data.sumIntegral;
						}else {
							if(res.data.msg == '没有找到积分信息'){
								this.totalPage = this.collectPage-1
								this.$refs.loadRefresh.loadOver()
								return;
							}
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
						}
					},
					fail: (error) => {
						this.integralNumber = 0;
						console.log(error, '登录报错');
					}
				});
			}
		},
		onShow() {
			// this.getAllNumber();
			this.getPageHeight();
		}
	}
</script>

<style scoped>
/* 修改积分明细 start	 */
.titleIntegralInfo{
	padding: 0 20upx;
	box-sizing: border-box;
	width: 100%;
	color: #FFF2F9;
}
.integralNumber{
	color: #F1F1F1;
	letter-spacing: 2upx;
}
.integralContent{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	color: #FFFFFF;
}
.integralContent uni-view:nth-of-type(1){
	font-weight: bold;
	font-size: 100upx;
}
.integralContent uni-view:nth-of-type(2){
	width: 150upx;
	text-align: center;
	height: 60upx;
	line-height: 60upx;
	color: #DC143C;
	font-weight: bold;
	font-size: 30upx;
	border-radius: 30upx;
	background-color: #FFFFFF;
}
/* 修改积分明细 end	 */
	
	
	
	
.page{
	width: 100%;
	height: 100%;
	background-color: #f2f6f9;
}
.header-Title{
	position: fixed;
	top:0;
	width: 100%;
	z-index: 99;
}
.bgColor{
	width: 100%;
	height: 60upx;
}
.nav{
	width: 100%;
	height: 464upx;
	padding-top: 60upx;
	line-height: 80upx;
	background: url('../../../static/me/jifenBg.jpg') center -10px no-repeat;
	background-size: 100% 100%;
}
.navContent{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 100upx;
	line-height: 100upx;
	padding: 0 20upx;
	box-sizing: border-box;
}

.leftInfo{
	display: flex;
	align-items: center;
}
.leftInfo .iconfont{
	display: inline-block;
	color: #fff;
	font-size: 46upx;
	margin-left: -4upx;
}
.leftInfo .text{
	display: inline-block;
	color: #fff;
	line-height: 40upx;
	font-size: 30upx;
}
.navContent .title{
	text-align: center;
	color: #fff;
	font-size: 30upx;
}

.navRight .text{
	display: inline-block;
	color: #fff;
	font-size: 30upx;
}

.list{
	display: flex;
	width: 100%;
	padding: 0 20upx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	box-sizing:border-box;
}
.list-item{
	display: flex;
	width: 100%;
	padding: 30upx 0;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	box-sizing:border-box;
	border-bottom: 1px solid #CCCCCC;
}
.list-item:last-child{
	border: none;
}
.list-item-name{
	width: 120%;
	font-size: 30upx;
}
.listTime{
	color:#ababab;
	font-size: 24upx;
	margin-top: 10upx;
}
.list-item-content{
	display: flex;
	width: 20%;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}
.list-item-content>.iconfont{
	font-size: 40upx;
}


.copyrightSymbol{
	width: 100%;
	margin-top: 40upx;
	height: 50upx;
	margin-bottom: 40upx;
	text-align: center;
	font-size: 32upx;
}
</style>
