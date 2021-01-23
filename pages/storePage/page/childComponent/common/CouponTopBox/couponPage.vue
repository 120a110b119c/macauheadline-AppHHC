<template>
	<view>
		<coupon-top>
			<view  slot="content" class="box">
				<view>
					<view>9</view>
					<view>折</view>
				</view>
				<view>折扣劵</view>
			</view>
		</coupon-top>
	</view>
</template>

<script>
	import CouponTop from "../CouponTop/index.vue"
	export default{
		components:{
			CouponTop
		}
	}
</script>

<style scoped>
	.box > uni-view:nth-of-type(1){
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		padding-top: 20upx;
	}
	.box > uni-view:nth-of-type(1) >  uni-view:nth-of-type(2){
		font-size: 30upx;
		color: #FFFFFF;
		margin-top: 50upx;
	}
	.box > uni-view:nth-of-type(1) >  uni-view:nth-of-type(1){
		font-size: 80upx;
		color: #FFFFFF;
	}
	.box > uni-view:nth-of-type(2){
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		font-size: 30upx;
		color: #FFFFFF;
		letter-spacing: 2upx;
	}
</style>
