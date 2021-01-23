<template>
	<view>
		<template v-if="listOne">
			<view class="userWrap">
				<image :src="itemList.BBSUserPic" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 50%;"></image>
				<view style="margin-left: 10upx;font-size: 30upx;letter-spacing: 1upx;">{{itemList.BBSUserName}}</view>
			</view>
			<view class="contentText" style="margin-top: 30upx;" v-html="itemList.BBSContent"></view>
		</template>
		<template v-else>
			<view class="bothSides">
				<view class="bothSides-content">
					<view class="userWrap">
						<image src="../../lift/image/noData.png" mode="aspectFill" style="width: 80upx;height: 80upx;border-radius: 50%;"></image>
						<view style="margin-left: 10upx;font-size: 30upx;letter-spacing: 1upx;">问吧服务生</view>
					</view>
					<view class="contentText" style="margin-top: 30upx;">
						欢迎光临问吧。这里是一个开放的问答社区，你可以在此讨论与珠海相关的有意思的话题。你可以在此讨论与珠海相关的有意思的话题。
					</view>
				</view>
				<image src="../../lift/image/noData.png" mode="aspectFill" class="bothSides-img"></image>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			itemList: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				listOne: true
			}
		},
	}
</script>

<style scoped>
	.bothSides{
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
	}
	.bothSides-content{
		flex: 3;
	}
	.bothSides-img{
		flex: 2;
		height: 200upx;
		margin: 0 20upx;
	}
	
	.userWrap {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.contentText {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin-top: 30upx;
		width: 100%;
		height: 84upx;
		font-size: 32upx;
	}
</style>
