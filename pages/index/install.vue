<template>
	<view class="content">
		<swiper class="swiper" :indicator-dots="true" :style="{'height':windowHeight}" @animationfinish="animationfinish">
			<swiper-item>
				<view class="swiper-item" :style="{'height':windowHeight,'background-color':'red'}">
					<image src="../../static/install/A1.jpg" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" :style="{'height':windowHeight,'background-color':'green'}">
					<image src="../../static/install/A2.jpg" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" :style="{'height':windowHeight,'background-color':'pink'}">
					<image src="../../static/install/A3.jpg" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				windowHeight: '603px' //定义手机屏幕高度值变量
			}
		},
		onLoad() {
			var _me = this;
			uni.getSystemInfo({ //获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
				success: function(res) {
					_me.windowHeight = res.windowHeight + 'px';
					console.log('手机屏幕高度为' + _me.windowHeight);
				}
			});
		},
		methods: {
			animationfinish(e) {
				if (e.detail.current == 2) {
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/index/home'
						})
					}, 100)
				}
			}
		}
	}
</script>
<style>
	.swiper {
		width: 100%;
	}
	.swiper-item>uni-image{
		display: block;
		width: 100%;
		height: 100%;
	}
	.swiper-item>uni-image>img{
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
