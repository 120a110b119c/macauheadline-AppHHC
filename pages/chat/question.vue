<template>
	<view class="page">
		<view class="bgColor"></view>
		<view class="header">
			<view class="icon iconfont icon-zuojiantou" @click="toBack()"></view>
			<view style="color: #333333;font-weight: bold;letter-spacing: 2upx;font-size: 40upx;">新提问</view>
			<view style="color: #9e9e9e;font-size: 36upx;">提交</view>
		</view>
		<view class="textarea_box">
			<textarea class="textarea" style="height: 100upx;" placeholder="输入问题" maxlength="200" v-model="desc"
			 placeholder-style="color:#adadad;font-size:36upx"/>
			<textarea class="textarea" placeholder="写下你的问题,准确的描述问题更容易得到解答" maxlength="200" v-model="desc" 
			 placeholder-style="color:#adadad;font-size:36upx"/>
			<view class="num">{{ desc.length }}/200</view>
		</view>
		<view class="contentList">
			<view></view>
			<view class="picture">
				<image src="../lift/image/noData.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				desc:""
			}
		},
		methods:{
			toBack(){
				uni.switchTab({
					url:"./chat"
				})
			}
		}
	}
</script>

<style scoped>
	.page{
		background-color: #fafafa;
	}
	.bgColor{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		background-color: #fafafa;
	}
	.header{
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		margin-top: 60upx;
		padding: 0 20upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		z-index: 11;
	}
	.header .icon-zuojiantou{
		font-size: 56upx;
	}
	.textarea{
		padding: 20upx;
		width: 100%;
		box-sizing: border-box;
	}
	.num{
		width: 100%;
		text-align: right;
		padding-right: 20upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
	}
	
	.picture{
		border: 4upx dashed #cccc;
		padding: 24upx;
		width: 284upx;
		height: 284upx;
		border-radius: 20upx;
		margin: 0 20upx;
		background-color: #FFFFFF;
	}
	.picture uni-image{
		width: 100%;
		height: 100%;
	}
</style>
