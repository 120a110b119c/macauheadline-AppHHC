<template>
	<view :class="pageShow==true?'page':''">
		<view style="height: 140upx;">
			<view class="headerTitle">
				<view class="bgColor"></view>
				<view class="nav">
					<view class="myIcon" @tap="toHome()">
						<view class="icon icon-zuojiantou iconfont"></view>
						<view class="text">返回</view>
					</view>
					<view class="title">视频发布</view>
				</view>
			</view>
		</view>
		<view class="progress" v-if="listShow">
			<view>
				加载中,请稍后。。。
			</view>
			<u-line-progress :striped="true" :striped-active="true" :percent="number" :show-percent="true"></u-line-progress>
		</view>
		<view class="content">
			<view class="uploader_video"  v-for="(item,index) in allVideoList" :key="index">
				<view class="videoTopBox" v-if="item.videoShow">
					<video :src="item.src" :id="`video_${item.src}`" autoplay="true" class="video"
					  @fullscreenchange="playerFullScreen($event,index)">
						<cover-view class="fuckking" @tap="clickMask(item,index)"></cover-view>
					</video>
				</view>
				<view class="shamVideoBox" v-else  @tap="clickMask(item,index)">
					<view style="width: 100%;display: flex;flex-direction: row;justify-content: space-between;background-color: #000000;">
						<view></view>
						<view style="color: #fff;margin-top: 20upx;">预览</view>
						<view class="x">
							<view class="icon iconfont icon-shanchu" @tap.stop="delectVideo(item,index)"></view>
						</view>
					</view>
					<view style="margin: 0 auto; margin-top: 60upx;width: 40upx;height: 40upx;">
						<image src="@/static/openPage/ionfonts.png" mode="aspectFill" style="width: 40upx;height: 40upx;"></image>
					</view>
				</view>
			</view>
			<!-- <view class="selectVideo" @tap="chooseVideoImage()">
				<view class="icon iconfont icon-jiahao"></view>
				<view class="selectText">选择视频</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	export default {
		components: {
			headerTitle
		},
		data() {
			return {
				allVideoList: [],
				videoCtx: {},
				number:0,
				pageShow:false,
				listShow:false
			}
		},
		onReady: function (res) {
		    // 获取 video 上下文 videoContext 对象
		    this.videoContext = uni.createVideoContext('myVideo');
			console.log('this.videoContext',this.videoContext)
		    // 进入全屏状态
		    this.videoContext.requestFullScreen();
			this.chooseVideo();
		},
		methods: {
			chooseVideo(){
					uni.chooseVideo({
					  count: 9,
					  sourceType: ['album'],
					  maxDuration: 30,
					  camera: 'back',
					  success(res) {
					    console.log(res.tempFilest)
					  }
					})
				
			},
			delectVideo(item,index){
				console.log('item,index',item,index);
				const _this = this;
				const idData = item.id;
				uni.showModal({
				    title:"提示",
				    content:"是否要删除此视频",
				    success:(res) =>{
				        if(res.confirm){
				           _this.requestPost({
				           	"action": 'deletefile',
				           	"id": idData
				           }).then(response =>{
				           	if(response.data.result == 'suc'){
				           		uni.showToast({
				           			icon:'none',
				           			title:'删除成功'
				           		});
								this.allVideoList.splice(index,1);
				           	}else{
				           		uni.showToast({
				           			icon:'none',
				           			title:response.data.msg
				           		})
				           	}
				           })
				        }
				    }
				})
			},
			playerFullScreen(e,index){
				if(!e.detail.fullScreen){
					this.$set(this.allVideoList[index], "videoShow", false);
				}
			},
			clickMask(item,index){
				this.$set(this.allVideoList[index], "videoShow", true);
				this.$nextTick(() => {  
					this.videoCtx = uni.createVideoContext(`video_${this.allVideoList[index].src}`, this);
					this.videoCtx.requestFullScreen({direction: 0});
				})
			},
			toHome() {
				uni.navigateTo({
					url:"./vertical-swiper"
				})
			},
			chooseVideoImage() {
				uni.showActionSheet({
					title: "选择上传类型",
					itemList: ['视频'],
					success: (res) => {
						console.log(res)
						if (res.tapIndex == 0) {
							this.chooseVideo()
						}
					}
				})
			},
			chooseVideo() {
				// 上传视频
				this.requestPost({
					"action": "uploadvideofromurl",
					"url": this.videoUrl,
					"title": this.desc,
					"position": this.IndustryCategoryValue,
					"pic": this.videoUrlImage,
					"usrId": this.usrId,
					"mdlId":this.mdlId
				}).then(response =>{
					if(response.data.result == 'suc'){
						uni.showToast({
							icon:'none',
							title:'上传成功!',
							position:"bottom"
						})
						clearInterval(this.timer);
						this.timer = null;
						this.getNewTextList();
					}else{
						uni.showToast({
							icon:'none',
							title:response.data.msg
						})
					}
				})
				// uni.chooseVideo({
				// 	maxDuration: 60,
				// 	success: (res) => {
				// 		const _this = this;
				// 		let serverUrl = this.serverUrl
				// 		let videoFile = res.tempFilePath;
				// 		this.pageShow = true;
				// 		this.listShow = true;
				// 		const uploadTask = uni.uploadFile({
				// 			url: serverUrl + '?action=uploadvideo',
				// 			filePath: videoFile,
				// 			name: 'file',
				// 			success: (res) => {
				// 				let obj = JSON.parse(res.data);
				// 				if (obj.result == "suc") {
				// 					this.listShow = false;
				// 					this.pageShow = false;
				// 					let list = this.allVideoList;
				// 					let imgObj = {
				// 						src: obj.video,
				// 						id: obj.id,
				// 						videoShow:false
				// 					}
				// 					list.push(imgObj);
				// 					this.$set(this.allVideoList, "", list);
				// 					uni.showToast({
				// 						title:'成功上传',
				// 						icon:'none'
				// 					})
				// 				} else {
				// 					this.listShow = false;
				// 					this.pageShow = false;
				// 					uni.showToast({
				// 						title: obj.msg,
				// 						icon: 'none'
				// 					})
				// 				}
				// 			}
				// 		})
				// 		uploadTask.onProgressUpdate((res) =>{
				// 			_this.number = res.progress;
				// 			if(res.progress == 100){
				// 				uni.showToast({
				// 					title:'上传完成',
				// 					icon:'none'
				// 				})
				// 			}
				// 		});	
				// 		_this.number = 0;
				// 	}
				// })
			}
		}
	}
</script>

<style scoped>
	.page{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(136,134,134,.6);
	}
	.progress{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 70%;
		height: 100upx;
		margin-left: -35%;
		margin-top: -30upx;
	}
	.uploader_video{
		position: relative;
		width: 25%;
		height: 230upx;
		overflow: hidden;
		background: #f4f5f6;
		position: relative;
		border-radius: 5px;
		box-sizing: border-box;
	}
	.shamVideoBox {
		width: 100%;
		height: 100%;
		background-color: #010101;
	}
	.shamVideoBox  .icon-shanchu{
		position: absolute;
		right: 20upx;
		top: 30upx;
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
		border-radius: 50%;
		background-color: #fff;
		text-align: center;
		color: #000;
		font-size: 26upx;
		z-index: 10;
	}
	
	.fuckking {
		width: 100%;
		height: 100%;
	}
	.uploader_video {
		position: relative;
		z-index: 1;
		width: 33.3%;
		height: 250upx;
		padding: 10upx;
		box-sizing: border-box;
	}

	.uploader_video>.icon-shanchu {
		position: absolute;
		right: 20upx;
		top: 20upx;
		width: 50upx;
		height: 50upx;
		line-height: 50upx;
		border-radius: 50%;
		background-color: #fa3534;
		text-align: center;
		color: #fff;
		font-size: 26upx;
		z-index: 10;
	}

	.video {
		width: 100%;
		height: 100%;
	}

	.content {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}

	.content>.imageUpload-image {
		width: 200upx;
		height: 200upx;
	}

	.selectVideo {
		width: 30%;
		height: 230upx;
		overflow: hidden;
		margin: 10upx;
		background: #f4f5f6;
		position: relative;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.selectVideo>.icon-jiahao {
		color: #010101;
	}

	.selectVideo>.selectText {
		margin-top: 10px;
		line-height: 20px;
	}


	.headerTitle {
		height: 120upx;
		position: fixed;
		width: 100%;
		z-index: 9;
		top: 0;
		left: 0;
	}

	.bgColor {
		width: 100%;
		height: 60upx;
		background-color: #010101;
	}

	.nav {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		background-color: #010101;
		width: 100%;
	}

	.myIcon {
		position: absolute;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
	}

	.myIconRight {
		position: absolute;
		right: 10upx;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
	}

	.myIconRight>.icon-jiahao {
		font-size: 40upx;
	}

	.iconfont {
		color: #fff;
		font-size: 54upx;
	}

	.text {
		color: #fff;
		font-size: 30upx;
	}

	.title {
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: 36upx;
	}
</style>
