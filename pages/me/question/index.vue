<template>
	<view>
		<view class="gbColor"></view>
		<view class="header">
			<view class="icon iconfont icon-zuojiantou" @tap="toBack()"></view>
			<view>我的问吧</view>
			<view></view>
		</view>
		<view class="tabbar">
			<view class="tabbar-item" :class="{tabbarActive:active == '1'}" @click="tabClick(1)">我的回答</view>
			<view class="tabbar-item" :class="{tabbarActive:active == '2'}" @click="tabClick(2)">我的提问</view>
		</view>
		<transition mode="out-in">
			<component :is="comName"  :style="{height: (phoneHeight)  + 'px',overflow:'hidden' }"></component>
		</transition>
	</view>
</template>

<script>
	import aba from './components/aba/index.vue'
	import myQuestin from './components/myQuestion/index.vue'
	export default {
		components: {
			aba,
			myQuestin
		},
		data() {
			return {
				active: "1",
				comName: "aba",
				phoneHeight:0
			}
		},
		onLoad() {
			this.getHeight(); //获取页面高度
		},
		methods: {
			getHeight() {
				const _this = this;
				uni.getSystemInfo({
					success(res) {
						_this.phoneHeight = res.windowHeight-130;
					}
				});
			},
			toBack() {
				uni.switchTab({
					url: "../me"
				})
			},
			tabClick(i) {
				this.active = i;
				if (i == '1') {
					this.comName = "aba"
				} else {
					this.comName = "myQuestin"
				}
			}
		}
	}
</script>

<style scoped>
	.header {
		width: 100%;
		height: 100upx;
		margin-top: 60upx;
		line-height: 100upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 20upx;
		font-size: 40upx;
		letter-spacing: 2upx;
	}

	.header .icon-zuojiantou {
		font-size: 62upx;
	}


	/* 全局背景颜色 */
	.gbColor {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #f8f8f8;
		z-index: -1;
	}

	/* 我的切换列表 */
	.tabbar {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-bottom: 20upx;
	}

	.tabbar .tabbar-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 200upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		padding: 20upx;
		color: #d6d6d6;
		box-sizing: border-box;
	}

	.tabbarActive {
		color: #212121 !important;
		font-size: 40upx !important;
		border-bottom: 4upx solid red;
	}


	/* vue动画 */
	.v-enter,
	.v-leave-to {
		opacity: 0;
		transform: translateX(750rpx);
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.5s ease;
	}
</style>
