<template>
	<view class="box">
		<view class="moringNew_header">
			<!-- <view>頭條快訊</view> -->
			<view style="width: 140upx">
				<image style="width: 140upx;height: 140upx;" mode="aspectFill" src="@/static/index/headNewsBg.png"></image>
			</view>
			<view class="line">
				<!-- <image src="../../../static/index/line.png" mode="widthFix"></image> -->
			</view>
			<view>
				<go-top :systemInfolanguage="systemInfolanguage"></go-top>
			</view>
			<view class="circleList" @click="toHeaderText">
				<view></view>
				<view></view>
				<view></view>
			</view>
			<!-- <view class="shareIcon">
				<image src="../../../static/index/shareIcon.png" mode="widthFix"></image>
			</view> -->
		</view>
		<view class="bottom">
			<!-- <view class="bordes">置頂</view> -->
			<view class="tit">澳門頭條</view>
		</view>
	</view>
</template>

<script>
	import goTop from "./goTop.vue"
	export default{
		props:{
			systemInfolanguage:{ type:String }
		},
		data(){
			return{
				reverseData:[
					{text:'111111111111111'},
					{text:'22222222222222'},
					{text:'33333333333333'},
					{text:'44444444444444'}
				]
			}
		},
		components:{
			goTop
		},
		methods:{
			toHeaderText(){
				uni.navigateTo({
					url: '../index/Headlines?datId=0'
				})
			}
		}
	}
</script>

<style scoped>
	.circleList{
		display: flex;
		flex-direction: row;
		padding-left: 20upx;
		margin-top: 110upx;
		width: 100upx;
		height: 100%;
		box-sizing: border-box;
	}
	
	.circleList>uni-view{
		margin-bottom: 4upx;
		width: 8upx;
		height: 8upx;
		border-radius: 50%;
		background-color: #C8C8C8;
	}
	.circleList>uni-view:nth-of-type(n+1){
		margin-right: 4upx;
	}
	.shareIcon{
		width: 10%;
		height: 110upx;
	}
	.shareIcon>uni-image{
		display: block;
		width: 60%;
		margin-top: 66upx;
		margin-left: 30upx;
	}
	.line{
		/* width: 10upx;
		height: 140upx;
		padding-top: 14upx; */
		margin-right: 2%;
	}
	.line>uni-image{
		display: block;
		width: 18.5upx;
		margin-top: -20upx;
	}
	.box{
		margin-bottom: 40upx;
	}
	.moringNew_header{
		width: 107%;
		margin-left: -3%;
		margin-top: -10upx;
		height: 140upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-bottom: 20upx;
		box-shadow: 4upx 4upx 20upx 2upx #CCCCCC;
	}
	.moringNew_header >view:nth-of-type(1){
		width: 20%;
		font-size: 46upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 55upx;
		letter-spacing: 6upx;
		background: url('@/static/index/fasterNew.png') no-repeat;
		background-size:100% 100%!important; 
		background-size: cover;  
	}
	.moringNew_header >view:nth-of-type(3){
		width: 80%;
		font-size: 36upx;
		line-height: 45upx;
		box-sizing: border-box;
		color: #FFFFFF;
	}
	.bottom{
		width: 100%;
		display: flex;
		flex-direction: row;
	}
	.bottom>.bordes{
		width: 106upx;
		height: 44upx;
		line-height: 40upx;
		text-align: center;
		padding: 0upx 20upx;
		border: 2upx solid #d9685a;
		border-radius: 10upx;
		color: #d9685a;
	}
	.bottom>.tit{
		color: #adadad;
		height: 44upx;
		line-height: 54upx;
		/* margin-left: 20upx; */
	}
</style>
