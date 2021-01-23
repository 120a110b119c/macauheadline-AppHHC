<template>
	<view>
		<web-view :webview-styles="webviewStyles"  :src="url"></web-view>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: "",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				title:''
			}
		},
		onLoad(options) {
			if(options.val){
				this.url = options.val;
			}
			if(options.title){
				uni.setNavigationBarTitle({
					title: options.title
				});
			}
			
		}
	}
</script>

<style>

</style>
