<template>
	<view class="pages">
		<headerTitle :title='"兌換券詳情"' :iconfont='"&#xe735;"' @toBack='goBack'></headerTitle>
		<view class="content">
			<view class="qrCode">
				<tki-barcode
					ref='qrCodeBar'
				    :val="qrCodeVal"
				    :opations="qrCodeOpations"
				    @result="barresult"
					:loadMake='true'
					:onval='true'
					class="qrCodeDiv"/>
			</view>
			<view class="couponDetail">
				<view class="couponImg">
					<image  :src="couponObj.UcpCpnImage" class="couponImage"></image>
				</view>
				<view class="couponInfo">
					<view class="couponName">
						{{couponObj.UcpCpnName}}
					</view>
					<view class="couponData">
						有效期至: {{couponObj.UcpCpnDueDate}}
					</view>
				</view>
			</view>
			<view class="couponTold">
				<view class="couponToldtitle">
					兌換券詳情
				</view>
				<view class="couponContent">
					{{couponObj.UcpCpnContent}}
				</view>
			</view>
		</view>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	import tkiBarcode from '../../../components/tki-barcode/tki-barcode.vue'
	export default{
		data(){
			return{
				qrCodeVal:'',
				qrCodeOpations:{
					'fontSize':32,
					'marginTop':20,
					'height':150,
					'width':5
				},
				couponId:'',
				couponObj:{}
			}
		},
		components:{
			headerTitle,
			tkiBarcode
		},
		onLoad(options) {
			this.couponId = options.couponId
			this.getCouponDetail()
		},
		methods:{
			//获取优惠券信息
			getCouponDetail(){
				uni.showLoading()
				uni.request({
					url: this.serverUrl,
					data: {
						"action": "getusercoupondetail",
						"ucpId": this.couponId
					},
					dataType: 'json',
					success: (res) => {
						
						console.log(res,'data123');
						if(res.data.result == 'suc'){
							this.couponObj = res.data
							this.qrCodeVal = this.couponObj.UcpNo
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
			},
			goBack(){
				uni.navigateBack({
				    delta: 1,
				    animationType: 'slide-out-right',
				    animationDuration: 300
				});
			},
			barresult(valUrl){
				console.log('圖片完成',valUrl)
				uni.hideLoading()
			},
		}
	}
</script>

<style scoped>
	.content{
		height: 100vh;
		background: #ededed;
		padding: 0 30upx;
	}
	.qrCode{
		height: 240upx;
	}
	.qrCodeDiv{
		display: flex;
		justify-content: center;
	}
	.couponDetail{
		width: 100%;
		display: flex;
		padding: 16upx 0;
		background-color: white;
	}
	.couponImg{
		width: 46%;
		height: 220upx;
		margin: 0 1%;
		border-radius: 10upx;
	}
	.couponImage{
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
	.couponInfo{
		width: 50%;
		margin: 0 1%;
	}
	.couponInfo .couponName{
		font-size: 36upx;
		font-weight: bold;
/* 		height: 120upx; */
		line-height: 60upx;
	}
	.couponInfo .couponData{
		font-size: 24upx;
		line-height: 80upx;
		height: 80upx;
		color: #c8c8c8;
	}
	.couponTold{
		border-top:#d1d1d1 4upx solid ;
		color: #8f8888;
		margin-top: 40upx;
	}
	.couponTold .couponToldtitle{
		font-size: 34upx;
		height: 90upx;
		line-height: 90upx;
	}
	.couponTold .couponContent{
		font-size: 30upx;
		letter-spacing: 1upx;
		padding-bottom: 30upx;
	}
</style>
