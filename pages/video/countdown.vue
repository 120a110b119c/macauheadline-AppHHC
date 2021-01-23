<template>
	<view class="wrap">
		<view class="progress">
			<view style="color: red;">
				加载中,请稍后。。。
			</view>
			<u-line-progress :striped="true" :striped-active="true" :percent="number" :show-percent="true"></u-line-progress>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				number: 0,
				timer: null
			}
		},
		methods: {
			startTime() {
				this.timer = setInterval(() => {
					this.number++
					if (this.number == 99) {
						clearInterval(this.timer)
					}
				}, 50)
			}
		},
		onShow() {
			this.startTime(); // 开启定时器
		},
		onHide() {
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null;
			}
		}
	}
</script>

<style scoped>
	.wrap {
		width: 100%;
		height: 100vh;
		background-color: rgba(30, 30, 30, .8);
	}

	.progress {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 70%;
		height: 100upx;
		margin-left: -35%;
		margin-top: -30upx;
		z-index: 1000;
	}
</style>
