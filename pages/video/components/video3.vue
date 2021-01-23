<template>
	<view class="wrapBox">
		<view class="titleBox">
			<view></view>
			<view class="contentText">
				<text style="color: #000;font-size: 36upx;margin-right: 20upx;">{{i18n.videoLeft}}</text>
				<text style="color: #ccc;font-size: 32upx;" @tap="toSmallVideo()">{{i18n.videoRight}}</text>
			</view>
			<image class="titleImage" src="../../../static/video/classify.png" @click="toList()"></image>
		</view>
		<div class="listBoxs" :class="['play_bottom']" v-if="pullList">
			<div class="listItem" @tap="removeWaterImage()">
				<image class="itemImage" src="../../../static/video/water.png" mode="aspectFill"></image>
				<text style="color: #fff;margin-left: 10upx;">去水印</text>
			</div>
			<div class="listItem" @tap="topublicVideo()">
				<image class="itemImage" src="../../../static/video/publishImage.png" mode="aspectFill"></image>
				<text style="color: #fff;margin-left: 10upx;">上传</text>
			</div>
		</div>
		<div class="page" v-if="activeindex == 0">
			<div v-for="(item,idx) in videoList" :key="idx" class="video-box" v-if="activeindex==0">
				<view v-if="item.flag">
					<video :direction="-90" :src="item.src" :loop="false" :id="`video_${item.src}`" :title="item.DatTitle" direction="0"
					 ref="chunleiVideo" class="video forClassVideo" objectFit="contain" @play='videoPlayFun'>
						<cover-view class="fuckking" @tap="tapVideo"></cover-view>
						<cover-image src="../../../static/videoIcon/videoPlay.png" mode="" v-show="!videoPlayStatu" class="coverImage" @tap="tapVideo"></cover-image>
					</video>
				</view>
				<view class="videoMask" v-show="playIndex!=idx" @tap.stop="clickMask(item,idx)">
					<u-lazy-load loading-img='../../../static/easy-loadimage/loading.png' error-img='' class="threeRightImage" :image="item.DatPic"
					 :threshold="50" height='520' img-mode='aspectFill'></u-lazy-load>
				</view>
			</div>

			<view style="width: 100%;display: flex;justify-content: center;" v-show="showLoading">
				<u-loading mode="circle" color="#2979ff" :size="40"></u-loading>
			</view>
			<view style="width: 100%;display: flex;justify-content: center;color:#999;" v-show="noMoreData">{{i18n.orderReviseBottom}}!</view>
			<u-top-tips ref="videoPlayToast"></u-top-tips>
			<custom-cover></custom-cover>
		</div>
	</view>

</template>

<script>
	import {
		serverUrl
	} from '@/utils/pathSetting/constPath.js'
	const videoBoxHeight = 290 //视频盒子高度

	import chunleiVideoH5 from '@/components/chunlei-video-h5/chunlei-video-h5';

	export default {
		components: {
			chunleiVideoH5
		},
		data() {
			return {
				pullList: false,
				dataList: [],
				activeindex: 0,
				menulist: ['同城', '推荐'],
				left: 144,
				listNumber: 3, //剩余视频小于3时加载视频
				playTop: 220, //播放高度
				index: 0, //当前视频展示索引
				timer: null,
				playIndex: -1,
				timeMask: true,
				videoList: [],
				currPage: 1,
				titleFontSize: '36upx',
				twoFontSize: '26upx',
				showLoading: false,
				videoCtx: {},
				networkType: '',
				showVideoPlayModel: false,
				videoPlayStatu: false,
				touchStartTime: 0,
				noMoreData: false,
				listShow:false,
				number: 0
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		beforeCreate() {
			// #ifdef APP-PLUS-NVUE
			var domModule = weex.requireModule('dom');
			domModule.addRule('fontFace', {
				'fontFamily': "iconfont",
				'src': "url('../../static/srcoll-video/text-icon.ttf')"
			});
			// #endif
		},
		created() {
			let FontSizeObj = uni.getStorageSync('fontSizeObj')
			this.titleFontSize = FontSizeObj.titleFontSize;
			this.twoFontSize = FontSizeObj.twoFontSize;

			//#ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary")
			//#endif
		},
		async mounted() {
			await this.pushVideoList()
			this.playIndex = -1
		},
		onShow() {
			this.pullList = false;
			this.activeindex = 0;
			this.PullDownRefreshHandle();
			uni.getNetworkType({
				success: (res) => {
					console.log(res.networkType);
					this.networkType = res.networkType
				}
			});
			this.showVideoPlayModel = uni.getStorageSync("networkTypeModel") == 1 ? true : false;
		},
		onHide() {
			this.videoPause();
			// this.$refs.video[this.k].pause();
		},
		onPageScroll(e) {
			this.index = (e.scrollTop - 44) / (uni.upx2px(620))
			if (this.index > (this.playIndex + 0.75) && this.playIndex > 0) {
				this.videoCtx.pause()
			}
		},
		onReachBottom() {
			this.showLoading = true
			this.pushVideoList()
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: "../search/search"
			})
		},
		onPullDownRefresh() {
			this.PullDownRefreshHandle()
		},
		methods: {
			PullDownRefreshHandle(){
				this.currPage = 1
				uni.request({
					url: this.serverUrl,
					dataType: 'json', //默认 json格式
					data: {
						"action": "getheadline",
						"page": this.currPage,
						"dataType": "video",
						"mdlId":"-1"
					},
					success: (res) => {
						this.currPage++
						let videoGroup = []
						for (let item of res.data.data) {
							videoGroup.push({
								src: item.DatVideo,
								content: item.DatTitleFT,
								flag: false,
								DatTitle: item.DatTitleFT,
								DatPic: item.DatPic,
								like: '7w',
								comment: '1045',
								duration: 0,
								DatIsSVideo: item.DatIsSVideo,
								DatAutherFT: item.DatAutherFT,
								DatShowDate: item.DatShowDate,
								DatId: item.DatId,
								DatUsrId: item.DatUsrId,
								DatReplies: item.DatReplies,
								DatZan: item.DatZan
							})
						}
						this.videoList = [...videoGroup];
						console.log('this.videoList',this.videoList);
						uni.stopPullDownRefresh();
					}
				})
			},
			topublicVideo() {
				uni.chooseVideo({
					count: 1,
					sourceType: ['album'],
					compressed: true,
					success: (res) => {
						const videoDataLength = parseInt(res.size/1000000);
						if( videoDataLength > 15 ) {
							uni.showToast({
								title: '请重新选择视频上传',
								icon: 'none'
							})
							return;
						}
						const _this = this;
						let serverUrl = this.serverUrl
						let videoFile = res.tempFilePath;
						this.pullList = false;
						uni.navigateTo({
							url:"./countdown"
						})
						const uploadTask = uni.uploadFile({
							url: serverUrl + '?action=uploadvideo',
							filePath: videoFile,
							name: 'file',
							success: (res) => {
								const data = JSON.parse(res.data);
								const {video} = data;
								console.log('data',data);
								uni.setStorageSync('videoWrap',video);
								this.listShow =false;
								uni.navigateTo({
									url: './waterMark?noData='+true+'&mdlId='+'-1'+'&uploadVideoSign='+'990'
								})
							}
						})
						uploadTask.onProgressUpdate((res) => {
							_this.number = res.progress;
							if (res.progress == 100) {
								uni.showToast({
									title: '上传完成,正在加载视频,请稍后',
									icon: 'none'
								})
							}
						});
						_this.number = 0;
					}
				})
			},
			removeWaterImage() {
				uni.navigateTo({
					url: './waterMark?mdlId='+'-1'+'&uploadVideoSign='+'991'
				})
			},
			toList() {
				this.pullList = !this.pullList;
			},
			toSmallVideo() {
				this.pullList = false;
				uni.redirectTo({
					url: "./vertical-swiper"
				})
			},
			toSearch() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			pushVideoList() {
				let promise = new Promise((resolve, reject) => {
					uni.request({
						url: this.serverUrl,
						dataType: 'json', //默认 json格式
						data: {
							"action": "getheadline",
							"page": this.currPage,
							"dataType": "video",
							"mdlId":'-1'
						},
						success: (res) => {
							console.log('res',res)
							if (res.data.result != "suc") {
								if (res.data.msg == '没有更多数据') {
									this.showLoading = false
									this.noMoreData = true;
									return;
								}
								uni.showToast({
									icon: "none",
									title: res.data.msg
								})
							}
							this.currPage++;
							let videoGroup = [];
							for (let item of res.data.data) {
								videoGroup.push({
									src: item.DatVideo,
									content: item.DatTitleFT,
									flag: false,
									DatTitle: item.DatTitleFT,
									DatPic: item.DatPic,
									like: '7w',
									comment: '1045',
									duration: 0,
									DatIsSVideo: item.DatIsSVideo,
									DatAutherFT: item.DatAutherFT,
									DatShowDate: item.DatShowDate,
									DatId: item.DatId,
									DatUsrId: item.DatUsrId,
									DatReplies: item.DatReplies,
									DatZan: item.DatZan
								})
							}
							this.videoList = [...this.videoList, ...videoGroup]
							resolve()
						}
					})
				})
				return promise
			},
			videoPause() {
				if (this.playIndex >= 0) {
					this.videoCtx.pause()
					this.$set(this.videoList[this.playIndex], 'flag', false)
					this.playIndex = -1
				}
			},

			videoPlayFun() {
				return;
				this.videoPlayStatu = true
			},
			tapVideo() {
				return;
				if (this.touchStartTime == 0) {
					this.touchStartTime = new Date().getTime()
				} else {
					console.log(new Date().getTime(), this.touchStartTime)
					if (new Date().getTime() - this.touchStartTime <= 250) {
						console.log('这是双击')
						this.videoDoubleTap()
						this.touchStartTime = 0
					}
				}
				setTimeout(() => {
					if (this.touchStartTime > 0) {
						console.log("这是单击2")
						this.videoTap()
						this.touchStartTime = 0
					}
				}, 350)
			},
			videoTap() {
				return;
				if (this.videoPlayStatu) {
					this.videoPlayStatu = false
					this.videoCtx.pause()
				} else {
					this.videoPlayStatu = true
					this.videoCtx.play()
				}
			},
			videoDoubleTap() {
				return;
				this.videoCtx.requestFullScreen()
			},
			clickMask(itemObj, newVal) {
				if (itemObj.DatIsSVideo) {
					uni.navigateTo({
						url: "./smallVideo?itemObj=" + encodeURIComponent(JSON.stringify(itemObj))
					})
				} else {
					return;
					//正常视频播放
					if (this.networkType != 'wifi' && this.showVideoPlayModel) {
						this.$refs.videoPlayToast.show({
							title: '當前處在非WIFI環境,請注意流量消耗喲',
							type: 'error',
							duration: 3000
						})
						uni.setStorage({
							key: 'networkTypeModel',
							data: 0
						});
						this.showVideoPlayModel = false;
					}
					this.playIndex = newVal
					for (let item of this.videoList) {
						item.flag = false
					}
					this.$set(this.videoList[newVal], 'flag', true);
					this.$nextTick(() => {
						this.videoCtx = uni.createVideoContext(`video_${this.videoList[newVal].src}`, this)
						this.videoCtx.play()
					})
				}
			},
			pauseVideo(val, item) {
				item.initialTime = val
			}
		}
	}
</script>

<style scoped>
	.listBoxs {
		position: fixed;
		top: 150upx;
		right: 0;
		width: 240upx;
		background-color: rgba(0, 0, 0, 0.5) !important;
		z-index: 100;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-bottom-right-radius: 30upx;
		border-bottom-left-radius: 30upx;
	}

	.text {
		margin-left: 20upx;
	}

	.itemImage {
		width: 60upx;
		height: 60upx;
	}

	.titleBox {
		position: fixed;
		width: 750rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-top: 50upx;
		height: 150upx;
		background-color: #FFFFFF;
		z-index: 2;
	}

	.titleImage {
		position: absolute;
		top: 80upx;
		right: 10upx;
		width: 50upx;
		height: 50upx;
	}

	.titleLeftImage {
		position: absolute;
		top: 80upx;
		left: 10upx;
		width: 50upx;
		height: 50upx;
	}

	.contentText {
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.listItem {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 100upx;
		margin-left: 40upx;
		box-sizing: border-box;
	}

	.listItem .text {
		margin-left: 20upx;
	}

	.listItem .itemImage {
		display: block;
		width: 40upx;
		height: 40upx;
	}

	.listItem uni-image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.titleBox {
		position: fixed;
		display: flex;
		width: 750rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-top: 50upx;
		height: 150upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		z-index: 2;
	}

	.titleImage {
		position: absolute;
		top: 80upx;
		right: 10upx;
		width: 50upx;
		height: 50upx;

	}

	.contentText {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}




	.menu-box {
		width: 15%;
		height: 80rpx;
		font-size: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #fff;
	}

	.tabtrue {
		font-weight: bold
	}

	.bottom_line {
		width: 40rpx;
		height: 4rpx;
		background-color: #fff;
		position: absolute;
		bottom: 8rpx;
		transition: all .2s linear;
	}




	.topTitle {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 160upx;
		background-size: 100% 100% !important;
		background-size: cover;
	}

	.topTitle>.ImageLeft {
		width: 80upx;
		margin-left: 20upx;
		margin-top: 20upx;
	}

	.topTitle>.ImageCenter {
		width: 280upx;
		margin-top: 60upx;
	}

	.topTitle>.ImageCenter>uni-image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.topTitle>.ImageLeft>uni-image {
		display: block;
		width: 100%;
		height: 1005;
	}

	.topTitle>.ImageRight {
		margin-top: 60upx;
		margin-right: 20upx;
	}

	.topTitle>.ImageRight>.icon {
		font-size: 50upx;
		color: #000;
	}

	/* #ifndef APP-PLUS-NVUE */
	@font-face {
		font-family: "iconfont";
		src: url('~@/static/srcoll-video/text-icon.ttf') format('truetype');
	}

	.iconfont {
		font-family: "iconfont";
		font-size: 16px;
		color: #fff;
	}

	/* #endif*/

	/* #ifdef APP-PLUS-NVUE */
	.iconfont {
		font-family: iconfont;
		font-size: 16px;
		color: #fff;
	}

	/* #endif*/
	.text-sm {
		font-size: 12px;
		color: #333;
	}

	.marginRight {
		margin-right: 10rpx;
	}

	.threeRightImage {
		height: 420upx;
	}

	.videoPlayImg {
		width: 60upx;
		height: 66upx;
		margin-right: -6upx;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 50%;
		padding: 12upx;
		padding-left: 18upx;
	}

	.videoPlayImgView {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.page {
		/* #ifndef APP-PLUS */
		/* display: flex; */
		/* #endif */
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.custom {
		height: 44px;
		width: 750rpx;
		position: relative;
	}

	.mask {
		position: absolute;
		height: 44px;
		width: 750rpx;
	}

	.video-box {
		position: relative;
		height: 100%;
		/* padding: 0 20upx; */
		width: 50%;
	}

	.video {
		height: 420upx;
		width: 710upx;
		position: relative;
	}

	.videoMask {
		position: relative;
		height: 520upx;
		width: 100%;
		padding: 4upx;
		box-sizing: border-box;
	}


	.videoMask>uni-view {
		height: 100%;
	}

	.title {
		font-size: 14px;
		color: #333;
	}

	.avatar {
		height: 50rpx;
		width: 50rpx;
		border-radius: 25rpx;
	}

	.content {
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.content-left {
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.content-right {
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.coverImage {
		width: 60upx;
		height: 66upx;
		position: absolute;
		display: block;
		top: 178upx;
		left: 332upx;
		z-index: 10;
	}
</style>
<style scoped>
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
		/* background: url(../../static/openPage/toutiao.png) no-repeat center top; */
		background-size: 28%;
		overflow: hidden;
	}

	.headLogoImg {
		width: 200upx;
		height: 52upx;
		margin-left: 300upx;

	}

	.content {
		position: relative;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.zeroContent {
		width: 100%;
		height: 50upx;
		font-size: 26upx;
		padding: 10upx 0;
	}

	.zeroContent>.zeroContent_tit {
		float: left;
		font-size: 30upx;
		width: 30%;
		line-height: 50upx;
		color: #adadad;
	}

	.zeroContent>.zeroContent_times {
		float: left;
		width: 60%;
		text-align: left;
		padding-left: 20upx;
		box-sizing: border-box;
		overflow: hidden;
		line-height: 50upx;
		color: #adadad;
	}

	.oneTitle {
		width: 100%;
		height: 100%;
		margin-top: 20upx;
		font-size: 30upx;
		letter-spacing: 2upx;
		text-align: justify;
		text-justify: inter-word;
	}


	.threeLeft {
		width: 100%;
		line-height: 50upx;
		height: 100upx;
		font-size: 36upx;
		min-height: 50upx;
		padding-bottom: 10upx;
		letter-spacing: 0.5px;
		font-family: '微軟正黑體';
		color: #414141;
		font-weight: bold;
	}



	/deep/ .uni-video-cover {
		display: none;
	}

	uni-page {
		overflow: hidden;
		height: 100vh;
	}

	.videoPlay {
		position: absolute;
		bottom: 170upx;
		left: 305upx;
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		background-color: rgba(0, 0, 0, 0.4);
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

	.fuckking {
		width: 100%;
		height: 100%;
	}
</style>
<style>
	.forClassVideo /deep/ .uni-video-container {
		display: flex;
		justify-content: center;
	}

	.forClassVideo /deep/ .uni-video-container /deep/ .uni-video-video {
		width: auto;
		max-width: 100%;
		height: auto;
		max-height: 100%;
	}
</style>
