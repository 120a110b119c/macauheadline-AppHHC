<template>
	<view>
		<view class="header">
			<view class="left" @click="navToLift">
				<span class="iconfont">&#xe670;</span>
			</view>
			<view class="header-tit">
				投票大廳
			</view>
		</view>
		<view class="nav">
			<view class="input">
				<span class="iconfont">&#xe61e;</span>
				<input type="text" class="input_text" placeholder="請輸入想投項目的名稱">
			</view>
			<view class="right">搜索</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods:{
			navToLift(){
				uni.switchTab({
					url: "../lift",
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped>
	.header{
		width: 100%;
		height: 100upx;
		padding: 20upx 0;
		box-sizing: border-box;
	}
	.left{
		width: 15%;
	}
	.left{
		float: left;
	}
	.left>span{
		font-size: 40upx;
		margin-left: 20upx;
	}
	.header-tit{
		float: left;
		width: 70%;
		text-align: center;
	}
	
	
	.nav{
		height: 110upx;
		width: 100%;
		background-color: #E1E1E1;
		padding: 20upx;
		box-sizing: border-box;
	}
	.input{
		float: left;
		width: 80%;
		height: 68upx;
		background-color: #FFFFFF;
		border-radius: 10upx;
	}
	.input>span{
		display: inline-block;
		font-size: 60upx;
		margin-left: 20upx;
	}
	.input>.input_text{
		display: inline-block;
		margin-left: 10upx;
	}
	.right{
		float: left;
		width: 20%;
		line-height: 68upx;
		text-align: center;
	}
</style>
