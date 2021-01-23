<template>
	<view>
		<Coupon>
			<view  slot="content" class="box">
				<view>
					<view>¥</view>
					<view>{{number}}</view>
				</view>
				<view>{{content}}</view>
			</view>
		</Coupon>
	</view>
</template>

<script>
	import Coupon from "./Coupon/index.vue"
	export default{
		props:{
			number:{
				type:String,
				default:"100"
			},
			content:{
				type:String,
				default:"購物劵"
			}
		},
		components:{
			Coupon
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
	.box > uni-view:nth-of-type(1) >  uni-view:nth-of-type(1){
		font-size: 30upx;
		color: #FFFFFF;
		margin-top: 50upx;
	}
	.box > uni-view:nth-of-type(1) >  uni-view:nth-of-type(2){
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
