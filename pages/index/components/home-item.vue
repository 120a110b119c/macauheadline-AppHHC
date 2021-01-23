<template>
	<view class="zero custom_Kevin" style="padding: 10upx 20upx;box-sizing: border-box;">
		<moring-new :systemInfolanguage="systemInfolanguage" v-if="showIndex == '0'&& tabIndex=='0'"></moring-new>
		<view v-if="randomNumber==showIndex&&svideoData" class="videoWrapBox">
			<scroll-view scroll-x="true" class="scroll">
				<view class="scrollView" :style="{width:(svideoData.length  * 310 )+'upx'}">
					<view class="scrollItem" v-for="(item,index) in svideoData" :key="index">
						<view class="videoListTop"  v-if="item.DatIndexIsVideo == 1">
							<video :src="item.DatVideo" controls :id="`video_${item.DatVideo}`" 
							autoplay="true"  @fullscreenchange="playerScreen($event,index)">
								<cover-view class="fuckking" @tap="toVideoItemPlay(item,index)"></cover-view>
							</video>
						</view>
						<view class="videoListitem"  v-else @tap="toVideoItemPlay(item,index)">
							<image style="width: 300upx;height: 240upx;border-radius: 30upx;" :src="item.DatUsrLogo" mode="aspectFill"></image>
							<image class="iconVideo" src="../../video/image/pause.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</scroll-view>	
			<view class="line"></view>
		</view>
		<view @click="clickItem" v-if="options.DatType == 0 || options.DatType == 3" class="oneTitle" :style="'font-size:'+titleFontSize +';' + (numbers?'color:#ababab':'')"  v-html="systemInfolanguage=='en'?options.DatTitleFT:options.DatTitle"></view>
		<view v-if="options.DatType == 9" class="oneTitle" :style="'font-size:'+titleFontSize +';' + (numbers?'color:#ababab':'')" @click="toWebView(options)" v-html="systemInfolanguage=='en'?options.DatTitleFT:options.DatTitle">
		</view>
		<view v-if="options.DatType == 9" >
			<view class="videoWrap" v-if="videoPlay">
				<video :src="options.DatVideo" controls :id="`video_${options.DatVideo}`" 
				autoplay="true"  @fullscreenchange="playerFullScreen($event)">
					<cover-view class="fuckking" @tap="toVideoPlay()"></cover-view>
				</video>
			</view>
			<view class="videoBox" v-else @tap.stop="toVideoPlay()">
				<image :src="options.DatUsrLogo" style="width: 100%;height: 360upx;border-radius: 30upx;" mode="aspectFill"></image>
				<image class="iconVideo" src="../../video/image/pause.png" mode="aspectFill"></image>
			</view>
		</view>
		<view v-if="options.DatIsAD == 1" class="twoRight" @click.self="toWebView(options)">
			<u-lazy-load loading-img='../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic"
			 :threshold="1000" height='300'  img-mode='aspectFill'></u-lazy-load>
		</view>
		<view v-if="options.DatType == 3" @click="clickItem" class="threeRight">
			<u-lazy-load loading-img='../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic"
			 :threshold="1000" height='442'   img-mode='aspectFill'></u-lazy-load>
			<u-lazy-load loading-img='../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic2"
			 :threshold="1000" height='216' img-mode='aspectFill'></u-lazy-load>
			<u-lazy-load loading-img='../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic3"
			 :threshold="1000" height='216' img-mode='aspectFill'></u-lazy-load>
		</view>
		<view @click="clickItem" v-if="options.DatType == 1 || options.DatType == 2" class="oneTitle">
			<view v-if="options.DatType == 1" class="oneLeft" :style="(numbers?'color:#ababab':'')+';'+'font-size:'+titleFontSize"  v-html="systemInfolanguage=='en'?options.DatTitleFT:options.DatTitle"></view>
			<view v-if="options.DatType == 2 && options.DatIsAD != 1" class="twoLeft" :style="(numbers?'color:#ababab':'')+';'+'font-size:'+titleFontSize"  v-html="systemInfolanguage=='en'?options.DatTitleFT:options.DatTitle"></view>
			<view v-if="options.DatType == 1" class="oneRight">
				<u-lazy-load loading-img='../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic"
				 :threshold="1000" height='200'  img-mode='aspectFill'></u-lazy-load>
			</view>
			<view v-if="options.DatType == 2&& options.DatIsAD != 1" class="twoRight">
				<u-lazy-load loading-img='../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic"
				 :threshold="1000" height='300'  img-mode='aspectFill'></u-lazy-load>
			</view>
			<view class="textDataTwo" v-if="options.DatType ==2">
				<view class="zeroContent_tit" :style="(numbers?'color:#ababab':'')+';'+'font-size:'+twoFontSize">
				{{systemInfolanguage=='en'?options.DatAutherFT:options.DatAuther}}
				</view>
				<view class="zeroContent_times" v-html="options.DatShowDate" :style="'font-size:'+twoFontSize"></view>
			</view>
			<view class="textData" v-if="options.DatType !=2">
				<view class="zeroContent_tit" :style="(numbers?'color:#ababab':'')+';'+'font-size:'+twoFontSize">
				{{systemInfolanguage=='en'?options.DatAutherFT:options.DatAuther}}
				</view>
				<view class="zeroContent_times" v-html="options.DatShowDate" :style="'font-size:'+twoFontSize"></view>
			</view>
		</view>
		<view  v-if="options.DatCaption != ''" @click="clickItem" class="zeroContent" :style="'font-size:'+twoFontSize" style="margin-top: 0;">
			<view class="advName" :style="'font-size:'+threeFontSize" >{{options.DatCaption}}</view>
		</view>
		<view  v-if="options.DatType != 1 && options.DatType != 2" @click="clickItem" class="zeroContent" :style="'font-size:'+twoFontSize">
			<view  v-if="options.DatType != 1 && options.DatType != 2" class="zeroContent_tit" :style="(numbers?'color:#ababab':'')+';'+'font-size:'+twoFontSize">
				{{systemInfolanguage=='en'?options.DatAutherFT:options.DatAuther}}
			</view>
			<view  v-if="options.DatType != 1 && options.DatType != 2" class="zeroContent_times" :style="'font-size:'+twoFontSize" v-html="options.DatShowDate"></view>
		</view>
	</view>
</template>

<script>
	import moringNew from "./moringNew.vue"
	export default {
		props: {
			systemInfolanguage:{ type:String },
			options: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			randomNumber:{
				type:Number,
				default:0
			},
			svideoData:{
				type:Array
			},
			numbers: {
				type: Boolean
			},
			tabIndex:{
				type:Number
			},
			showIndex:{
				type:Number
			}
		},
		onShow() {
			this.videoPlay=false;
		},
		data(){
			return {
				videoItemShow:false,
				titleFontSize:'',
				oneFontSize:'',
				twoFontSize:'',
				threeFontSize:'',
				list:1,
				videoPlay:false,
				videoCtx:{},
				videoItemCtx:{}
			}
		},
		components: {
			moringNew
		},
		created() {
			let FontSizeObj = uni.getStorageSync('fontSizeObj')
			this.titleFontSize = FontSizeObj.titleFontSize;
			this.twoFontSize = FontSizeObj.twoFontSize;
			this.threeFontSize = FontSizeObj.threeFontSize;
		},
		methods: {
			playerScreen(e,index){
				if(!e.detail.fullScreen){
					this.$set(this.svideoData[index], "DatIndexIsVideo", '0');
				}
			},
			toVideoItemPlay(item,index){
				this.$set(this.svideoData[index], "DatIndexIsVideo", '1');
				this.$emit("changevideoData",this.svideoData);
				let DatIdData = this.svideoData[index].DatVideo;
				console.log('this.svideoData',this.svideoData)
				this.$nextTick(() => {
					this.videoItemCtx = uni.createVideoContext(`video_${DatIdData}`, this);
					this.videoItemCtx.requestFullScreen({direction: 0});
				})
			},
			toVideoPlay(){
				this.videoPlay = !this.videoPlay;
				let DatIdData = this.options.DatVideo;
				this.$nextTick(() => {
					this.videoCtx = uni.createVideoContext(`video_${DatIdData}`, this);
					this.videoCtx.requestFullScreen({direction: 0});
				})
			},
			playerFullScreen(e){
				if(!e.detail.fullScreen){ 
					this.$set(this, "videoPlay", false);
				}
			},
			clickItem() {
				this.$emit('clickItem');
			},
			toWebView(item) {
				if(item.DatLink){
					uni.navigateTo({
						url: "../lift/UrlDeatils/UrlDeatils?val=" + item.DatLink
					})
				}
			}
		}

	}
</script>

<style scoped>
	.videoListitem{
		position: relative;
		width: 100%;
	}
	.videoListTop{
		width: 300upx;
		height: 200upx;
		overflow: hidden;
		border-radius: 30upx;
	}
	.videoWrapBox > .line{
		position: relative;
		left: -10%;
		height: 1upx;
		width: 120%;
		background-color: #EEEEEE;
		margin: 20upx 0;
	}
	.scrollItem {
		display: inline-block;
		margin-right: 10upx;
		margin-top: 20upx;
	}
	
	
	.videoWrap{
		width: 100%;
		height: 360upx;
		overflow: hidden;
		border-radius: 30upx;
	}
	uni-video{
		width: 100%;
		height: 100%;
	}
	.fuckking {
		width: 100%;
		height: 100%;
	}
	.videoBox{
		position: relative;
		width: 100%;
		height: 360upx;
		margin: 20upx 0;
	}
	.iconVideo  uni-image{
		width: 100%;
		height: 100%;
		border-radius: 30upx;
	}
	/* .iconVideoBox{
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -50upx;
		margin-top: -50upx;
		width: 100upx;
		height: 100upx;
		border-radius: 100upx;
	} */
	.iconVideo{
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -25upx;
		margin-top: -25upx;
		width: 50upx;
		height: 50upx;
	}
	
	
	.disshow {
		display: none;
	}

	.gray {
		color: #adadad !important;
	}

	.header {
		position: relative;
		top: 0;
		width: 100%;
		height: 170upx;
		line-height: 280upx;
		box-sizing: border-box;
		z-index: 100;
		overflow: hidden;
	}

	.right {
		position: absolute;
		right: 0;
		top: 0;
		width: 54upx;
		height: 54upx;
	}

	.right>span {
		font-size: 50upx;
		margin-right: 20upx;
	}

	.header-tit {
		width: 100%;
		height: 100%;
		background-size: 28%;
		overflow: hidden;
	}

	.headLogoImg {
		width: 200upx;
		height: 52upx;
		margin-left: 300upx;

	}

	.uni-tab-bar:first-child {
		width: 100%;
		height: 60upx;
	}

	.uni-tab-bar:nth-child(2) {
		width: 100%;
	}

	uni-swiper {
		width: 100%;
		height: 100%;
	}

	/* 0 */
	.zero {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 0 18upx;
		padding-top: 20upx;
		border-bottom: 1px solid #EEE;
		background-color: white;
		z-index: 4;
	}

	.zeroContent {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 50upx;
		padding: 10upx 0;
		font-size: 26upx;
	}

	.advName {
		border: 1px solid #ccc;
		padding: 0upx 2upx;
		color: #adadad;
		border-radius: 10upx;
		margin-right: 10upx;
	}

	.zeroContent>.zeroContent_tit {
		color: #adadad;
		letter-spacing: 1upx;
	}

	.zeroContent>.zeroContent_times {
		color: #adadad;
		margin-left: 30upx;
	}

	/* 1 */
	.oneTitle,
	.twoLeft,
	.twoTitle {
		text-align: justify;
		text-justify: inter-word;
		font-size:12px;
		font-family: "SimSun";
		width: 100%;
		letter-spacing: -2.4upx;
		/* margin-bottom: 20upx; */
		font-weight: none;
		color:#333; 
		font-family: "SimSun"; 
	}
	.oneTitle{
		position: relative;
		height: 100%;
	}

	.oneLeft,
	.oneRight {
		display: inline-block;
		vertical-align: top;
	}

	.oneLeft {
		width: 60%;
		padding-right: 20upx;
		box-sizing: border-box;
		margin-bottom: 40upx;
	}

	.oneRight {
		width: 40%;
		height: 200upx;

	} 

	.threeRightImage {
		height: 200upx;
		width: 100%;
	}

	.oneRight .threeRightImage {
		border-radius: 10upx;
	}
	.oneRight .threeRightImage >>> uni-image div,
	.oneRight .threeRightImage >>> uni-image img{
		height: 200upx;
	}
	.u-lazy-item {
		height: 200upx;
	}

	.contentList {
		position: absolute;
		top: 165upx;
		right: 0px;
		font-size: 30px;
		z-index: 90;
		background-color: #fff;
	}

	/* 2 */


	.twoRight {
		width: 100%;
		height: 300upx;
		margin-top: 20upx;
	}

	.twoRight .threeRightImage {
		display: block;
		width: 100%;
		height: 300upx;
	}
	.twoRight .threeRightImage >>> uni-image div,
	.twoRight .threeRightImage >>> uni-image img{
		height: 300upx;
	}
	
	.textData{
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		width: 100%;
		font-size: 27upx;
		flex-direction: row;
		color: #adadad;
	}
	.textData>.zeroContent_tit{
		color: #adadad;
		letter-spacing: 1upx;
	}
	.textData>.zeroContent_times{
		color: #adadad;
		margin-left: 16px;
	}
	.textDataTwo{
		display: flex;
		width: 100%;
		margin-top: 20upx;
		padding-left: 10upx;
		font-size: 27upx;
		flex-direction: row;
		color: #adadad;
	}
	.textDataTwo>.zeroContent_tit{
		color: #adadad;
		letter-spacing: 1upx;
	}
	.textDataTwo>.zeroContent_times{
		color: #adadad;
		margin-left: 16px;
	}

	.threeTitle {
		width: 100%;
		height: 100%;
		margin-top: 20upx;
		font-size: 30upx;
		letter-spacing: 2upx;
	}

	.threeLeft {
		width: 100%;
		margin-top: 10upx;
	}

	.threeRight {
		width: 100%;
		height: 442upx;
		margin-top: 10upx;
	}

	.threeRight .threeRightImage:nth-child(1) {
		float: left;
		width: 48%;
		height: 442upx;
		margin-right: 2%;
		border-radius: 10upx;
	}

	.threeRight .threeRightImage:nth-child(2),
	.threeRight .threeRightImage:nth-child(3) {
		float: left;
		width: 50%;
		height: 216upx;
		border-radius: 10upx;
	}

	.threeRight .threeRightImage:nth-child(2) {
		margin-bottom: 10upx;
	}

	.weatherClass {
		background-size: cover;
		width: 100%;
		height: 700upx;
		position: fixed;
		color: white;
		z-index: 1;
	}

	.weathDiv {
		width: 300upx;
		height: 550upx;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		top: 75upx;
		right: 40upx;
		padding: 0 20upx;
		border-radius: 10upx;
	}

	.weathDay {
		font-size: 28upx;
	}

	.weathDay view {
		margin: 16upx 0;
	}

	.weathDayBibi {
		width: 150px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		padding: 5upx 0upx 5upx 0upx;
		font-size: 32upx;
		letter-spacing: 2upx;
	}

	.weatherLevel1 {
		background: #1AAD19;
	}

	.weatherLevel2 {
		background: #D80000;
	}

	.swiperMain {
		width: 88%;
	}

	.swiperHead {
		position: relative;
		top: 0;
		z-index: 10;
		width: 100%;
		background: #FFFFFF;
	}

	.swiperHead scroll-view {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		white-space: nowrap;
	}

	.swiperTab {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
	}

	.swiperCont {
		width: 100%;
		padding-top: 70rpx;
	}

	/* #ifdef H5 */
	.swiperHead {
		position: relative;
		top: 0;
		z-index: 10;
		width: 100%;
		background: #FFFFFF;

	}

	/* #endif */

	.swiper {
		width: 100%;
		height: 400rpx;
	}

	.swiperItem {
		height: 400rpx;
		background: #00B26A;
		text-align: center;
		color: #FFFFFF;
		line-height: 400rpx;
		font-size: 30upx;
	}

	.swiperItem image {
		width: 100%;
		height: 100%;
		display: block;
	}

	@keyframes logoLeft {
		from {
			transform: translateX(0);
			transform: scale(1);
		}

		to {
			transform: translateX(-140px);
			transform: scale(0.7);
		}
	}

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
		animation-name: style1;
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

	@keyframes style1 {

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

	/deep/ .u-lazy-item {
		width: 100%;
		height: 100%;
		border-radius: 10upx !important;
	}

	/deep/ .threeRightImage uni-view {
		height: 100%;
	}
</style>