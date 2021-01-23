<template>
	<view class="uicon-home">
		<view class="uicon-item">
			<slot name="top" />
		</view>
		<view class="uicon-item">
			<slot name="bottom" />
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.uicon-home{
		width: 100%;
		padding: 20upx;
	}
	.uicon-home > .uicon-item:nth-of-type(2){
		margin-top: 20upx;
	}
</style>
