<template>
	<view class="contentList-item">
		<view class="item-tit">问吧标题</view>
		<chat-content :itemList="itemList"></chat-content>
		<chat-bottom :itemList="itemList"></chat-bottom>
	</view>
</template>

<script>
	import chatContent from './chatContent.vue'
	import chatBottom from './chatBottom.vue'
	export default {
		props: {
			itemList: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		components: {
			chatContent,
			chatBottom
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	.contentList-item {
		margin-bottom: 30upx;
	}

	.contentList-item:last-child {
		margin-bottom: 0;
	}

	.contentList-item {
		padding: 30upx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}

	.contentList-item>.item-tit {
		font-size: 40upx;
		letter-spacing: 2upx;
		margin-bottom: 30upx;
	}
</style>
