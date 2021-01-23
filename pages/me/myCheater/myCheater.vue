<template>
	<view class="pages">
		<!-- <headerTitle :title='"我的優惠券"' :backText="'我的'" :iconfont="'&#xe728;'" @toBack='toMe'></headerTitle> -->
		<view class="container">
			<view class="container-item" v-for="(item,index) in couponList" :key="index" >
				<view class="couponImg" style="margin-top: 12upx;">
					<image class="couponImg" :src="item.UcpCpnImage" mode="aspectFill"></image>
				</view>
				<view class="title">{{item.UcpCpnName}}</view>
				<view class="couponBtn" @tap="goUseCoupon(index)">立即使用</view>
				<!-- E64340 -->
				<view class="data">
					<view class="dataTitle">有效期至:</view>
					<view class="dataNumber">{{item.UcpCpnDueDate}}</view>
				</view>
			</view>
		</view>
		<u-empty img-width='170' style="background-color: white;padding-top: 120upx;" :show='couponList.length == 0' text="您暫時沒有可用的優惠券!" mode="list"></u-empty>
	</view>
</template>

<script>
	// import headerTitle from '../../../components/header-title/index.vue'
	export default{
		data(){
			return{
				CpnId:'',
				couponList:[],
				userId:''
			}
		},
		// components:{
		// 	headerTitle
		// },
		onLoad(options) {
			this.userId = options.userId;
			this.getCouponList();//获取优惠卷详情
		},
		methods:{
			
			toMe(){
				uni.switchTab({
					url:'../me'
				})
			},
			//去使用优惠券
			goUseCoupon(index){
				let couponId = this.couponList[index].UcpId
				uni.navigateTo({
					url: '../useCoupon/index?couponId=' + couponId
				})
			},
			//获取优惠券信息
			getCouponList(){
				uni.showLoading()
				var serverUrl = this.serverUrl;
				uni.request({
					url: serverUrl,
					data: {
						"action": "getusercoupon",
						"userId": this.userId
					},
					dataType: 'json',
					success: (res) => {
						uni.hideLoading()
						console.log(res,'data123');
						if(res.data.result == 'suc'){
							this.couponList = res.data.data
						}else{
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
						}
					},
					fail: (error) => {
						console.log(error, '登录报错');
					}
				});
			}
		}
	}
</script>

<style scoped>
uni-page-wrapper{
	background-color: #ebebeb!important;
}
.pages{
	position: relative;
	width: 100%;
	height: 100%;
	background-color: #ebebeb;
}

.container{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
}
.container-item{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20upx;
	height: 500upx;
	background-color: #fff;
	width: 48%;
	margin: 20upx 1%;
	padding: 0 10upx;
	box-sizing: border-box;
	border: #DBDBDB 1px solid;
}
.container-item .title{
	text-align: center;
	line-height: 60upx;
	height: 120upx;
	font-size: 34upx;
	font-family: '微軟正黑體';
	font-weight: bold;
	margin-top: 10upx;
	
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	 word-break: break-all;
	 -webkit-box-orient: vertical;
	 -webkit-line-clamp:2;
}
.couponImg{
	width: 100%;
	height: 200upx;
	border-radius: 10upx;
}
.couponBtn{
	background-color: #e64340;
	font-size: 32upx;
	padding: 10upx 28upx;
	border-radius: 10upx;
	color: white;
	font-family: '微軟正黑體';
	font-weight: bold;
	margin-top: 15upx;
}
.container-item .data{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.container-item .data{
	margin-top: 25upx;
	width: 100%;
	font-size: 26upx;
	color: #948b8c;
}
/* 
 .nav{
 	display: flex;
 	flex-direction: row;
 	justify-content: flex-start;
 	align-items: center;
 	height: 80upx;
 	line-height: 80upx;
 	background-color: #dc543e;
 }
 .nav>.iconfont{
 	text-align: center;
 	width: 15%;
 	color: #fff;
 	font-size: 60upx;
 }
 .nav>.text{
 	width: 85%;
 	text-align: center;
 	color: #fff;
 }*/
</style>
