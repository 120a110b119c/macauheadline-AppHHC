<template>
	<view class="CouponBox">
		<slot name="content" />
	</view>
</template>

<script>
</script>

<style scoped>
	.CouponBox{
		position: relative;
		width: 100%;
		padding: 0 12upx;
		padding-bottom: 20upx;
		/* height: 210upx; */
		background: linear-gradient(#f97028, #f42e3b);
		overflow: hidden;
		box-sizing: border-box;
	}
	.CouponBox:before,
	.CouponBox:after {
	  content: '';
	  display: block;
	  width: 30upx;
	  height: 100%;
	  background-size: 30upx 30upx;
	  background-repeat: repeat-y;
	  background-image: radial-gradient(#fff 4px, transparent 4px);
	  position: absolute;
	  top: 0;
	}
	.CouponBox:before {
	  left: -15upx;
	}
	.CouponBox:after {
	  right: -15upx; 
	} 
</style>
