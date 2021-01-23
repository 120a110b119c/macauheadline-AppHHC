<template>
	<view class="page">
		<view class="icon iconfont icon-zuojiantou" @click="toBack()"></view>
		<view class="images">
			<image class='headLogoImg' src="/static/openPage/logo_red.png" mode="aspectFit" />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: "澳門頭條"
			}
		},
		methods: {
			toBack() {
				let currentPage = getCurrentPages().length
				console.log('頁面站信息',getCurrentPages().length,currentPage)
				if(currentPage < 2){
					uni.switchTab({
						url: "../index/home"
					})
				}else{
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style scoped>
	.page {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		height: 160upx;
		line-height: 240upx;
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 100;
	}
	.page .icon {
		position: absolute;
		left: 0;
		top: 0;
		font-size: 60upx;
		height: 90%;
		display: flex;
		align-items: end;
	}

	.page .images {
		display: flex;
		height: 90%;
		align-items: flex-end;
	}

	.page .headLogoImg {
		width: 200upx;
		height: 44upx;
	}
</style>
