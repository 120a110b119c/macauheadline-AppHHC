<template>
	<view>
		<view style="padding: 0 30upx;">
			<h1>我是回答界面</h1>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				screenHeight:""
			}
		},
		mounted() {
			this.getScreenHeight()
		},
		methods:{
			getScreenHeight(){
				uni.getSystemInfo({
				    success: function (res) {
						this.screenHeight = res.windowHeight-110
				    }
				});
			}
		}
	}
</script>

<style>
</style>
