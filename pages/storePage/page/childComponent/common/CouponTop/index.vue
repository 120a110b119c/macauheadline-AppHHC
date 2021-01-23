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
		height: 190upx;
		background: linear-gradient(#f97028, #f42e3b);
		overflow: hidden;
	}
	.CouponBox:before,
	.CouponBox:after {
	  content: '';
	  display: block;
	  width: 100%;
	  height: 30upx;
	  background-size: 30upx 30upx; /* 一个repeat的大小 */
	  background-repeat: repeat-x;
	  background-image: radial-gradient(#fff 5px, transparent 4px);
	  position: absolute;
	}
	.CouponBox:before {
	  top: -18upx; 
	} 
	.CouponBox:after {
	  bottom: -18upx; 
	}
</style>
