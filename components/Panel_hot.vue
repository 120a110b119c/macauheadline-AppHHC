<template>
	<view class="Panel">
		<view class="Panel-title">
			<view class="first-line"></view>
			<view class="content">{{title}}</view>
			<view class="last-line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["title"],
		data() {
			return {}
		}
	}
</script>

<style>
	.Panel {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.Panel-title {
		width: 100%;
		height: 80upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.first-line {
		margin-top: 15upx;
		height: 2px;
		width: 5%;
		background-color: #f0f0f0;
	}

	.Panel-title>.content {
		width: 30%;
		text-align: left;
		font-weight: bold;
		text-align: center;
	}

	.last-line {
		margin-top: 15upx;
		height: 2px;
		width: 65%;
		background-color: #f0f0f0;
	}
	
	
	
	
</style>
