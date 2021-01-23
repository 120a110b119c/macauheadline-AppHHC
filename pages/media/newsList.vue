<template>
	<view>
		<u-navbar :is-back="false" is-fixed height="50" :immersive="true">
			<view class="slot-wrap">
				<view class="icon_back iconfont">
					&#xe735;
				</view>
				<view class="tagsList" style="width: 400upx;">
					<u-tabs :list="listTypeData" font-size='32' active-color='#f56c25' 
					:is-scroll="false" :current="listType" @change="changeList"></u-tabs>
				</view>
				<view class="icon_more">
					...
				</view>
			</view>
		</u-navbar>
		<view class="contentData">
			<view class="data1" style="border-bottom: 1px solid #d0d0d0;margin-top: 20upx;" v-for="(item,index) in videoList">
				<view class="userInfo">
					<image src="../../static/about/weiIcon.png" mode="aspectFill" class="userImg"></image>
					<view class="userText">
						<view class="userName">春秋争霸</view>
						<view class="userTime">07-05 18:44</view>
					</view>
					<view class="userMore">
						...
					</view>
				</view>
				<view class="dataLoad">
					<view class="videoData">
						<view class="dataTitle">
							{{item.DatTitle}}
						</view>
						<view v-if="item.flag" >
							<video :direction="-90" :src="item.src" :loop="false" 
								:id="`video_${item.src}`"  ref="chunleiVideo" class="video forClassVideo" objectFit="fill">
							</video>
						</view>
						<view class="videoMask" v-show="playIndex!=index" @tap.stop="clickMask(index)">
							<u-lazy-load loading-img='../../static/easy-loadimage/loading.png' error-img=''  class="threeRightImage"
								:image="item.DatPic" :threshold="50" height='440' img-mode='aspectFill'></u-lazy-load>
							<view class="videoPlayImgView"><image src="../../static/videoIcon/videoPlay.png" mode="" class="videoPlayImg"></image></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listTypeData:[
					{
						name: '全部'
					}, 
					{
						name: '视频'
					}, 
					{
						name: '问答'
					}
				],
				list2:[1,1,1,1,1,1,1,1],
				listType:0,
				videoList:[],
				playIndex:-1
			}
		},
		onLoad(){
			this.getVideoData()
		},
		methods: {
			changeList(value){
				this.listType = value
			},
			getVideoData(){
				this.currPage = 1
				uni.request({
					url:  this.serverUrl,
					dataType: 'json', //默认 json格式
					data:{
						"action":"getheadline",
						"page":this.currPage,
						"dataType":"video"
					},
					success: (res) => {
						this.currPage ++
						let videoGroup = []
						for (let item of res.data.data) {
							videoGroup.push({
								src:item.DatVideo,
								content:item.DatTitleFT,
								flag:false,
								DatTitle:item.DatTitleFT,
								DatPic:item.DatPic,
								like:'7w',
								comment:'1045',
								duration:0
							})
						}
						this.videoList = [...videoGroup]
					
					}
				})
			},
			videoPause(){
				if(this.playIndex >= 0){
					this.videoCtx.pause()
					this.$set(this.videoList[this.playIndex],'flag',false)
					this.playIndex = -1
				}
			},
			clickMask(newVal){
				this.playIndex = newVal
				for (let item of this.videoList) {
					item.flag = false
				}
				this.$set(this.videoList[newVal],'flag',true)
				
				this.$nextTick(()=>{
					this.videoCtx = uni.createVideoContext(`video_${this.videoList[newVal].src}`,this)
					this.videoCtx.play()
				})
			},
		}
	}
</script>

<style scoped>
	.slot-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		position: relative;
	}
	.tagsList{
		height: 100%;
	}
	.icon_back{
		position: absolute;
		top: 4px;
		left: 10px;
		font-size: 34px;
		height: 100%;
	}
	.icon_more{
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 58upx;
		height: 33px;
		line-height: 4px;
		letter-spacing: 2upx;
	}
	
	.contentData{
		padding: 0 20upx;
		padding-top: 20upx;
	}
	.userInfo{
		display: flex;
		width: 100%;
	}
	.userInfo .userImg{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
	.userInfo .userText{
		flex: 1;
		padding-left: 20upx;
	}
	.userText .userName{
		font-size: 34upx;
		font-weight: 550;
	}
	.userText .userTime{
		color: #969696;
		margin-top: 10upx;
	}
	.userInfo .userMore{
		font-size: 36upx;
		letter-spacing: 2upx;
		color: #666;
	}
	
	/* 视频模块 */
	/deep/ .uni-video-cover{
		display: none;
	}
	uni-page{
		overflow: hidden;
		height: 100vh;
	}
	.dataTitle{
		font-size: 34upx;
		padding: 20upx 0;
	}
	.dataLoad{
		margin-bottom: 20upx;
	}
	.videoPlay{
		position: absolute;
		bottom:170upx;
		left:305upx;
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		background-color: rgba(0,0,0,0.4);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 20;
	}
	
	.contentList {
		position: absolute;
		top: -2px;
		right: 0px;
		font-size: 30px;
		z-index: 90;
		background-color: #fff;
	}
	
	/* 加载动画 */
	.dataNullImage {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 1000upx;
		color: #CD7F32;
		font-family: "Microsoft Yahei";
		font-size: 24px;
		font-weight: 700;
	}
	
	.dataNullImage>view {
		animation-name: loading;
		margin-right: 30upx;
	}
	
	.dataNullImage>view {
		animation-duration: 1s;
		animation-fill-mode: both;
		animation-iteration-count: infinite;
	}
	
	.dataNullImage>view:nth-child(1) {
		animation-delay: 0.0s
	}
	
	.dataNullImage>view:nth-child(2) {
		animation-delay: 0.1s
	}
	
	.dataNullImage>view:nth-child(3) {
		animation-delay: 0.2s
	}
	
	.dataNullImage>view:nth-child(4) {
		animation-delay: 0.3s
	}
	
	@keyframes loading {
		from,
		20%,
		53%,
		80%,
		to {
			animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			transform: translate3d(0, 0.5, 0.1);
		}
	
		0% {
			opacity: 0;
			transform: scale3d(.3, .3, .3);
		}
	
		20% {
			opacity: 0.4;
			transform: scale3d(1.1, 1.1, 1.1);
		}
	
		40%,
		43% {
			animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			opacity: 0.7;
			transform: scale3d(.9, .9, .9);
			transform: translate3d(0px, -40px, 0);
		}
	
		to {
			opacity: 1;
			transform: scale3d(1, 1, 1);
		}
	}
	/* #ifndef APP-PLUS-NVUE */
	@font-face {font-family: "iconfont";
		src: url('~@/static/srcoll-video/text-icon.ttf') format('truetype');
	}
	.iconfont{
		font-family: "iconfont";
		font-size: 16px;
		color: #fff;
	}
	/* #endif*/
	
	/* #ifdef APP-PLUS-NVUE */
	.iconfont{
		font-family: iconfont;
		font-size: 16px;
		color: #fff;
	}
	/* #endif*/
	.text-sm{
		font-size: 12px;
		color: #333;
	}
	.marginRight{
		margin-right: 10rpx;
	}
	.threeRightImage{
		height: 440upx;
		border-radius: 10upx !important;
	}
	.videoPlayImg{
		width: 60upx;
		height: 66upx;
		margin-right: -6upx;
		background: rgba(0,0,0,0.4);
		border-radius: 50%;
		padding: 12upx;
		padding-left: 18upx;
	}
	.videoPlayImgView{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.page{ 
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		justify-content: flex-start;
		flex-direction: column;
	}
	.custom{
		height: 44px;
		width: 750rpx;
		position: relative;
	}
	.mask{
		position: absolute;
		height: 44px;
		width: 750rpx;
	}
	.video-box{
		position: relative;
		height: 620upx;
		padding: 0 20upx;
	}
	.video{
		height: 440upx;
		width: 710upx;
	}
	.videoMask{
		position: relative;
		height: 440upx;
		width: 710upx;
		
	}
	.title{
		font-size: 14px;
		color: #333;
	}
	.avatar{
		height: 50rpx;
		width: 50rpx;
		border-radius: 25rpx;
	}
	.content{
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.content-left{
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	.content-right{
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
</style>
