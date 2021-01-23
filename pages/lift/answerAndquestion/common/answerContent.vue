<template>
	<view class="answerCon">
		<view class="answerCon_nav">
			<view class="answerCon_tit">
				荐
			</view>
			<view class="answerCon_tit_text">
				啊啊啊
			</view>
		</view>
		<view class="content">
			<view class="content_left">
				怎么还安卓手机屏幕
			</view>
			<view class="content_img">
				<img src="../../../../static/theme-hot/spiderman.png" alt="">
			</view>
		</view>
		<view class="footer">
			8人参与讨论
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.answerCon{
		width: 100%;
		padding: 20upx 0;
		border-bottom: 1px solid #C8C7CC;
	}
	.answerCon_nav{
		width: 100%;
		height: 50upx;
	}
	.answerCon_tit{
		float: left;
		display: inline-block;
		width: 50upx;
		height: 50upx;
		margin-left: 20upx;
		line-height: 50upx;
		text-align: center;
		background-color: #DD524D;
		border-radius: 10upx;
	}
	.answerCon_tit_text{
		float: left;
		display: inline-block;
		margin-left: 20upx;
	}
	.content{
		width: 100%;
		height: 200upx;
	}
	.content_left{
		float: left;
		margin-left: 20upx;
		margin-top: 10upx;
	}
	.content_img{
		float: right;
		width: 150upx;
		height: 150upx;
		margin-right: 20upx;
		border-radius: 10upx;
	}
	.content_img>img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
	.footer{
		margin-left: 20upx;
	}
</style>
