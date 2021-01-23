<template>
	<view>
		<Coupon v-if="homeShow === '1'" style="width: 100%;" >
			<view  slot="content" class="coupon">
				<view class="couponTitle">
					<view>{{textOne}}</view>
					<view>{{parseInt(textTwo)}}</view>
				</view>
				<view>{{cpnName}}</view>
			</view>
		</Coupon>
		<coupon-top v-if="homeShow === '3'" style="width: 100%;" >
			<view  slot="content" class="couponTop">
				<view>
					<view>{{textOne/10}}</view>
					<view>{{textTwo}}</view>
				</view>
				<view>{{cpnName}}</view>
			</view>
		</coupon-top>
		<Coupon v-if="homeShow === '6'" style="width: 100%;" >
			<view  slot="content" class="couponZ">
				<view>
					<view>{{textOne/10}}</view>
					<view>{{textTwo}}</view>
				</view>
				<view>{{cpnName}}</view>
			</view>
		</Coupon>
		<view  v-if="homeShow === '4'" class="imageBox">
			<image :src="image" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	import Coupon from "../common/Coupon/index.vue"
	import CouponTop from "../common/CouponTop/index.vue"
	export default{
		components:{
			Coupon,
			CouponTop
		},
		props:{
			homeShow:{
				type:String,
				default:'1'
			},
			textOne:{
				type:String,
				default:''
			},
			textTwo:{
				type:String,
				default:''
			},
			cpnName:{
				type:String,
				default:''
			},
			image:{
				type:String,
				default:''
			}
		}
	}
</script>

<style scoped>
	.coupon > .couponTitle{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding-top: 10upx;
	}
	.coupon > .couponTitle >  uni-view:nth-of-type(1){
		font-size: 30upx;
		color: #FFFFFF;
		margin-top: 40upx;
	}
	.coupon > .couponTitle >  uni-view:nth-of-type(2){
		font-size: 80upx;
		color: #FFFFFF;
	}
	.coupon > uni-view:nth-of-type(2){
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		font-size: 30upx;
		color: #FFFFFF;
		letter-spacing: 2upx;
	}
	
	
	.couponTop > uni-view:nth-of-type(1),
	.couponZ > uni-view:nth-of-type(1){
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		padding-top: 10upx;
	}
	.couponTop > uni-view:nth-of-type(1) >  uni-view:nth-of-type(2),
	.couponZ > uni-view:nth-of-type(1) >  uni-view:nth-of-type(2){
		font-size: 30upx;
		color: #FFFFFF;
		margin-top: 50upx;
	}
	.couponTop > uni-view:nth-of-type(1) >  uni-view:nth-of-type(1),
	.couponZ > uni-view:nth-of-type(1) >  uni-view:nth-of-type(1){
		font-size: 80upx;
		color: #FFFFFF;
	}
	.couponTop > uni-view:nth-of-type(2),
	.couponZ > uni-view:nth-of-type(2){
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		font-size: 30upx;
		color: #FFFFFF;
		letter-spacing: 2upx;
	}
	
	
	.imageBox{
		width: 100%;
		height: 100%;
	}
	.imageBox >image{
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
