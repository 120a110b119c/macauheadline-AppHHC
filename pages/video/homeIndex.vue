<template>
	<view>
		<!-- <h1>我是视频首页</h1> -->
		<view class="content" :style="{height: phoneHeight  + 'px',overflow:'hidden' }" >
			<vertical-swiper></vertical-swiper>
		</view>
	</view>
</template>

<script>
	import verticalSwiper from './vertical-swiper.nvue'
	export default{
		components:{
			verticalSwiper
		},
		data(){
			return{
				phoneHeight: 0
			}
		},
		onShow() {
			this.getScreenHeight()
		},
		methods:{
			getScreenHeight() {
				const _this = this;
				uni.getSystemInfo({
					success: function(res) {
						_this.phoneHeight = res.screenHeight-50;
					}
				});
			}
		}
	}
</script>

<style>
</style>
