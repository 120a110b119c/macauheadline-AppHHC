<template>
	<view class="discussWrap">
		<view class="discussLeft">
			<view class="discussLeftContent">
				<view>{{itemList.BBSCallCount}}</view>
				<view>赞同</view>
				<view class="icon iconfont icon-dianzan1" style="margin-top: 2upx;font-size: 38upx;"></view>
			</view>
			<view class="fare">
				<view>分享</view>
				<view class="icon iconfont icon-fenxiang_2" style="margin-top: 6upx;"></view>
			</view>
		</view>
		<view class="discussData" style="color: #9d9d9d;">{{itemList.BBSPDate}}</view>
	</view>
</template>

<script>
	export default{
		props: {
			itemList: {
				type: Object,
				default () {
					return {};
				}
			}
		}
	}
</script>

<style scoped>
	.discussWrap{
		width: 100%;
		margin-top: 60upx;
		display: flex;
		justify-content: space-between;
	}
	.discussLeft,.discussLeftContent,.fare{
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 28upx;
		color: #9d9d9d;
	}
	.discussLeftContent{
		margin-right:20upx;
	}
	.discussLeftContent uni-view,.fare uni-view{
		margin-right: 8upx;
	}
</style>
