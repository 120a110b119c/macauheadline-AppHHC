<template>
	<view class="zero custom_Kevin">
		<view @click="clickItem" v-if="options.DatType == 0 || options.DatType == 3" class="oneTitle" :style="'font-size:'+titleFontSize +';' + (numbers?'color:#ababab':'')">{{options.DatTitleFT}}</view>
		<view v-if="options.DatIsAD == 1" class="oneTitle" :style="'font-size:'+titleFontSize +';' + (numbers?'color:#ababab':'')" @click="toWebView(options)">
			{{options.DatTitleFT}}
		</view>
		<view v-if="options.DatIsAD == 1" class="twoRight" @click="toWebView(options)">
			<u-lazy-load loading-img='../../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic"
			 :threshold="50" height='300'  @load='imgOver' @error='imgError' img-mode='aspectFill'></u-lazy-load>
		</view>
		<view v-if="options.DatType == 3" @click="clickItem" class="threeRight">
			<u-lazy-load loading-img='../../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic"
			 :threshold="50" height='500'  @load='imgOver' @error='imgError' img-mode='aspectFill'></u-lazy-load>
			<u-lazy-load loading-img='../../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic2"
			 :threshold="50" height='250' img-mode='aspectFill'></u-lazy-load>
			<u-lazy-load loading-img='../../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic3"
			 :threshold="50" height='250' img-mode='aspectFill'></u-lazy-load>
		</view>
		<view @click="clickItem" v-if="options.DatType == 1 || options.DatType == 2" class="oneTitle">
			<view v-if="options.DatType == 1" class="oneLeft" :style="(numbers?'color:#ababab':'')+';'+'font-size:'+titleFontSize">{{options.DatTitleFT}}</view>
			<view v-if="options.DatType == 2 && options.DatIsAD != 1" class="twoLeft" :style="(numbers?'color:#ababab':'')+';'+'font-size:'+titleFontSize">{{options.DatTitleFT}}</view>
			<view v-if="options.DatType == 1" class="oneRight">
				<u-lazy-load loading-img='../../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic"
				 :threshold="10" height='200' @load='imgOver' @error='imgError' img-mode='aspectFill'></u-lazy-load>
			</view>
			<view v-if="options.DatType == 2&& options.DatIsAD != 1" class="twoRight">
				<u-lazy-load loading-img='../../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="options.DatPic"
				 :threshold="10" height='300'  @load='imgOver' @error='imgError' img-mode='aspectFill'></u-lazy-load>
			</view>
			<view class="textDataTwo" v-if="options.DatType ==2">
				<view class="zeroContent_tit" :style="numbers?'color:#ababab':''">{{options.DatAutherFT}}</view>
				<view class="zeroContent_times" v-html="options.DatShowDate"></view>
			</view>
			<view class="textData" v-if="options.DatType !=2">
				<view class="zeroContent_tit" :style="numbers?'color:#ababab':''">{{options.DatAutherFT}}</view>
				<view class="zeroContent_times" v-html="options.DatShowDate"></view>
			</view>
		</view>
		<view  v-if="options.DatType != 1 && options.DatType != 2" @click="clickItem" class="zeroContent" :style="'font-size:'+twoFontSize">
			<view  v-if="options.DatType != 1 && options.DatType != 2" class="zeroContent_tit" :style="numbers?'color:#ababab':''">{{options.DatAutherFT}}</view>
			<view  v-if="options.DatType != 1 && options.DatType != 2" class="zeroContent_times" v-html="options.DatShowDate"></view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			options: {
				type: Object,
				default: function(e) {
					return {}
				}
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
		data(){
			return {
				titleFontSize:'',
				oneFontSize:'',
				twoFontSize:'',
				threeFontSize:'',
				list:1
			}
		},
		created() {
			let FontSizeObj = uni.getStorageSync('fontSizeObj')
			this.titleFontSize = FontSizeObj.titleFontSize;
			this.twoFontSize = FontSizeObj.twoFontSize;
			this.threeFontSize = FontSizeObj.threeFontSize;
		},
		methods: {
			imgOver(event){
				console.log('图片加载结束',event)
			},
			imgError(event){
				console.log('cuowu',event)
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
		margin-bottom: 30upx;
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
		height: 218upx;
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




	/deep/ .u-lazy-item {
		width: 100%;
		height: 100%;
		border-radius: 10upx !important;
	}

	/deep/ .threeRightImage uni-view {
		height: 100%;
	}
</style>