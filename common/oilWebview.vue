<template>
	<view class="page">
		<web-view :webview-styles="webviewStyles" :src="'http://2020.macaoheadline.com/m/extends/oil/oilapply.html?usrId='+usrId"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				usrId:0,
				statusBarHeight:null,
			}
		},
		onLoad(params) {
			console.log(params)
			this.usrId = params.usrId
		},
		methods:{
			
		},
	}
</script>

<style scoped>
</style>
