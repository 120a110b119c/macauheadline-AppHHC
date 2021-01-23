<template>
	<view class="page">
		<view style="height: 130upx;" :class="{'active':isActive}">
			<view class="headerTitle">
				<view class="bgColor"></view>
				<view class="nav">
					<view class="myIcon" @tap="toHome()">
						<view class="icon icon-zuojiantou iconfont"></view>
					</view>
					<view class="title">一键去水印</view>
					<view class="myIconRight" @tap="uploadVideo()">
						<view>保存本地</view>
					</view>
				</view>
			</view>
		</view>
		<view class="progress" v-if="isActive">
			<view style="color: #FFFFFF;font-weight: bold;margin-bottom: 20upx;">
				视频上传中,请稍后。。。
			</view>
			<u-line-progress :striped="true" :striped-active="true" :percent="number" :show-percent="true"></u-line-progress>
		</view>

		<view class="contentBox" :class="{'active':isActive}">
			<view class="titleBox">
				<view class="left">
					<view class="icon iconfont icon-link-fill"></view>
					<view>短视频链接</view>
				</view>
				<view class="right" @click="removeWatermark">
					<view class="arrangementOne"></view>
					<view class="arrangementTwo"></view>
					<view class="arrangementThree">一键去水印</view>
				</view>
			</view>
			<view class="urlInput">
				<input class="uni-input" focus placeholderColor="#fff" placeholder="此处填写短视频链接" type="text" :value="url" @blur="onBlur"
				 placeholder-style="padding-left:20upx"></input>
			</view>
		</view>
		<view class="videoBox" :class="{'active':isActive}">
			<view class="titleTest">添加文字</view>
			<view class="content">
				<view class="contentLeftText">
					<textarea class="textarea" placeholder="为短视频添加文字吧~" maxlength="30" v-model="desc" />
				</view>
				<view class="videoUrlBox" v-if="videoUrl"  @tap="clickMask()">
					<view class="videoUrlImage" :class="{'noBg':true}">
						<image :src="videoUrlImage" mode="aspectFill"></image>
					</view>
					<image class="pause" src="./image/pause.png" mode="aspectFill"></image>
				</view>
				<view class="video" v-if="!videoUrl" @click="pictureClick" :class="{'active':isActive}">
					<image src="./image/pause.png" mode="aspectFill" style="100upx;height: 100upx;"></image>
				</view>
			</view>
			<view class="num">{{ desc.length }}/30</view>
		</view>
		<view class="selsect"  :class="{'active':isActive}">
			<view class="selsectItem">
				<view class="icon iconfont icon-dingwei"></view>
				<view>当前所在位置</view>
			</view>
			<view class="selsectItem"  @tap='IndustryCategory = true'>{{IndustryCategoryValue}}</view>
		</view>
		<u-select v-model="IndustryCategory" mode="mutil-column-auto" :list="list" @confirm='chooesIndustryCategory'></u-select>
		<view class="butonList" :class="{'active':isActive}">
			<view class="butonItem">
				<u-button type="error" @tap="releaseVideo">发布</u-button>
			</view>
			<view class="butonItem">
				<u-button  type="default" @tap="editorBeautify">编辑美化</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		isNeedLogin
	} from '@/utils/index.js'
	export default{
		data(){
			return{
				timer:null,
				videoUrlImage:"",
				desc:"",
				url: '',
				videoUrl:'',
				videoCtx: {},
				videoImage:false,
				IndustryCategoryValue:"澳门",
				IndustryCategory: false,
				list: [{
						value: 1,
						label: '澳门'
					},
					{
						value: 2,
						label: '香港'
					},
					{
						value: 3,
						label: '国内'
					}
				],
				number:0,
				usrId:"",
				isActive:false,
				mdlId:"",//取决是同城还是推荐发布视频
				noData:'',
				uploadVideoSign:''
			}
		},
		onShow() {
			this.getUserId(); //獲取用戶id
			this.videoUrl = '';
			this.url = '';
			const videoData = uni.getStorageSync('videoWrap');
			if( videoData != 0 ){
				this.$set(this,"videoUrl",videoData)
			}
			uni.setStorageSync('videoWrap',0);
		},
		onLoad(options) {
			if(options){
				this.mdlId = options.mdlId;
				this.noData = options.noData;
				this.uploadVideoSign = options.uploadVideoSign;
			}
		},
		computed: {
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		methods:{
			setTab(){
				this.timer =  setInterval(()=>{
					this.number += 2;
					if(this.number == 100){
						clearInterval(this.timer);
						this.timer = null;
					}
				},100)
			},
			getUserId() {
				let userData = uni.getStorageSync('data');
				if (userData) {
					this.usrId = userData.usrId;
				}
			},
			//上传本地视频发送的数据请求
			uploadVideoResource(){
				const pic = this.videoUrl+"?spm=qipa250&x-oss-process=video/snapshot,t_0,f_jpg,w_500,h_900,m_fast"
				this.requestPost({
					"action": "publishvideo",
					"url": this.videoUrl,
					"title": this.desc,
					"position": this.IndustryCategoryValue,
					"pic": pic,
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
			},
			//去除水印视频之后发送的数据请求
			waterMarkResource(){
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
			},
			releaseVideo(){
				if (!this.usrId) {
					uni.navigateTo({
						url:"../me/register/register"
					})
					return
				}
				if(!this.videoUrl) return;
				this.isActive = true;
				this.setTab();
				//判断是上传本地视频还是去水印之后视频上传
				if( this.uploadVideoSign == '990' ){
					this.uploadVideoResource();
				}else{
					this.waterMarkResource()
				}
			},
			getNewTextList(){
				if( this.mdlId == '-1' ){
					uni.switchTab({
						url:"./video"
					})
				}else{
					uni.navigateTo({
						url:"./vertical-swiper"
					})
				}
			},
			editorBeautify(){
				uni.navigateTo({
					url:"./videoEdit/index"
				})
			},
			//行業類別選擇
			chooesIndustryCategory(e) {
				this.IndustryCategoryValue = e[0].label
			},
			uploadVideo(){
				if(!this.videoUrl){
					uni.showToast({
						icon: "none",
						title: '请先一键去水印'
					})
					return
				}
				const downloadTask = uni.downloadFile({
					url: this.videoUrl,   //视频路径
					success: res => {
						if (res.statusCode == 200) {
								//下载的回调 不要都用res  要换一个使用 方便区分
								downloadTask.onProgressUpdate(red => {
									let that = this;
									that.percentCurrent = red.progress;
									if (red.progress === 100) {
										//当进程全部下载完成之后 在执行保存到相册的回调
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath, //注意这里是res 不是red
											success: ()=> {
												uni.showToast({
													title: '保存到本地成功',
													duration: 1000,
													icon: 'none'
												});
											},
											fail: ()=> {
												uni.showToast({
													title: '保存失败，请稍后重试',
													icon: 'none'
												});
											}
										});
									}
								});
							}
					}
				})
			},
			pictureClick(){
				if(!this.videoUrl){
					uni.showToast({
						icon: "none",
						title: '请先一键去水印'
					})
				}
			},
			toHome(){
				uni.navigateBack({
					delta: 2
				})
			},
			clickMask(){
				const videoInforData = {
					"url": this.videoUrl,
					"title": this.desc,
					"position": this.IndustryCategoryValue,
					"pic": this.videoUrlImage,
					"usrId": this.usrId,
					"mdlId":this.mdlId
				}
				console.log('videoInforData',videoInforData.mdlId,videoInforData.usrId)
				uni.setStorageSync('videoInforData',videoInforData);
				if(this.videoUrl){
					uni.navigateTo({
						url:"./videoPreview?src="+this.videoUrl+'&uploadVideoSign='+this.uploadVideoSign
					})
				}
			},
			onBlur(event) {
				this.url = event.detail.value;
			},
			removeWatermark(){
				if( !this.url ){
					uni.showToast({
						icon: "none",
						title: '请输入链接'
					})
					return
				}
				//在文字之中把http地址提取出来
				let totalUrl;
				if(this.url.indexOf('复') != -1 ){
					totalUrl = this.url.substring(this.url.indexOf('http'),this.url.lastIndexOf("复")-1);
				}else{
					totalUrl = this.url
				}
				uni.request({
					url: 'https://api-sv.videoparse.cn/api/video/normalParse',
					method: 'POST',
					header: {'content-type': 'application/x-www-form-urlencoded'},
					data: {
						url:totalUrl,
						appid:"G4y3TVFXgLY3SpV3",
						appsecret:"HS8cXCOZBSfZD9XJ"
					},
					success: (result) => {
						if (result.statusCode !== 200) {
							return;
						}
						uni.setStorageSync('videoUrl',result.data.body.video_url)
						this.$set(this,'videoUrl',result.data.body.video_url);
						this.$set(this,'videoUrlImage',result.data.body.cover_url);
					},
					fail: (err) => {
						console.log('获取接口返回错误:', err);
					},
				});
			}
		}
	}
</script>

<style scoped>
	.noBg{
		background: url(image/noData.png) center center  no-repeat;
		background-size: cover;
	}
	.progress{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 70%;
		height: 100upx;
		margin-left: -35%;
		margin-top: -80upx;
	}
	.active{
		opacity: 0.4;
	}
	.videoUrlBox{
		position: relative;
		width: 100upx;
		height: 240upx;
		border-radius: 30upx;
	}
	.videoUrlBox .pause{
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -60upx;
		margin-left: -40upx;
		width: 50upx;
		height: 50upx;
	}
	.videoUrlBox .videoUrlImage{
		width: 100%;
		height: 100%;
	}
	.videoUrlBox .videoUrlImage uni-image{
		width: 100%;
		height: 100%;
	}
	.selsect{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin: 0 20upx;
		margin-top: 30upx;
		height: 70upx;
		padding: 40upx;
		border-radius: 50upx;
		background-color: #1f2231;
	}
	.selsect .selsectItem{
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #F0FEFC;
	}
	
	
	.cellGroup {
		width: 100%;
	}
	.butonList{
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100upx;
		justify-content: center;
	}
	.butonList > .butonItem{
		width: 40%;
	}
	.butonList > .butonItem:nth-of-type(1){
		margin-right: 10%;
	}
	
	
	.pauseIcon{
		position: relative;
		top: 220upx;
		right: 460upx;
		width: 60upx;
		height: 60upx;
		z-index: 1000;
	}
	.fuckking {
		width: 100%;
		height: 100%;
	}
	.uni-input-input{
		color: #FFFFFF;
	}
	.uni-input-input:focus
	{
		color: #FFFFFF;
		background-color:yellow;
	}
	.page {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgb(23, 23, 35);
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
		background-color: rgb(23, 23, 35);
	}
	.nav {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		background-color: rgb(23, 23, 35);
		width: 100%;
		padding: 0 20upx;
		box-sizing: border-box;
	}
	.myIcon {
		position: absolute;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
	}
	.myIconRight {
		display: flex;
		flex-direction: row;
		color: #8c8b91;
		z-index: 5;
		width: 150upx;
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
	
	
	
	.contentBox{
		position: relative;
		margin: 0 20upx;
		height: 250upx;
		border-radius: 50upx;
		background-color: #1f2231;
	}
	.contentBox > .titleBox{
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		margin-top: 50upx;
		height: 100upx;
		padding: 20upx;
		padding-top: 50upx;
		box-sizing: border-box;
		color: #FFFFFF;
	}
	.contentBox > .titleBox >.left{
		display: flex;
		height: 100upx;
		flex-direction: row;
		align-items: center;
		color: #e5e5e5;
	}
	.contentBox > .titleBox >.left >.icon-link-fill{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80upx;
		height: 80upx;
		background-color: rgb(23, 23, 35);
		border-radius: 50%;
	}
	.contentBox > .titleBox >.right{
		position: relative;
		top: 8upx;
		right: 0;
		width: 200upx;
		height: 100upx;
	}
	.titleBox >.right>.arrangementOne{
		position: absolute;
		top: 10upx;
		right: 30upx;
		width: 150upx;
		height: 70upx;
		border-radius: 20upx;
		background-color: #73f3e6;
		z-index: 10;
	}
	.titleBox >.right>.arrangementTwo{
		position: absolute;
		top: 22upx;
		right: 10upx;
		width: 150upx;
		height: 70upx;
		border-radius: 20upx;
		background-color: #d94660;
		z-index: 11;
	}
	.titleBox >.right>.arrangementThree{
		position: absolute;
		top: 14upx;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 20upx;
		width: 150upx;
		height: 70upx;
		border-radius: 20upx;
		background-color: #000000;
		z-index: 11;
		color: #e5e5e5;
		padding: 10upx;
		font-size: 26upx;
		box-sizing: border-box;
	}
	.urlInput{
		width: 600upx;
		margin: 20upx auto;
		margin-top: 40upx;
		padding: 20upx 0;
		border-radius: 40upx;
		background-color: rgb(23, 23, 35);
	}
	.urlInput > .uni-input{
		padding-left: 20upx;
		color: #FFFFFF;
	}
	
	.videoBox{
		margin: 0 20upx;
		margin-top: 30upx;
		height: 470upx;
		padding: 40upx;
		border-radius: 50upx;
		background-color: #1f2231;
	}
	.videoBox > .titleTest{
		color: #e5e5e5;
	}
	.videoBox > .content{
		display: flex;
		flex-direction: row;
		margin-top: 20upx;
		width: 100%;
		height: 280upx;
		background-color: rgb(23, 23, 35);
		padding: 20upx;
	}
	.videoBox > .content > uni-view:nth-child(1){
		width: 60%;
		padding: 0 20upx;
	}
	.videoBox > .content > uni-view:nth-child(2){
		display: flex;
		justify-content: center;
		align-items: center;
		/* border: 2upx dashed #707070; */
		width: 40%;
		border-radius: 50upx;
	}
	.videoBox > .content > .video{
		border: 2upx dashed #707070;
	}
	.videoBox > .content > uni-view:nth-child(2) > uni-image{
		display: block;
		width: 100upx;
		height: 100upx;
	}
	.videoStyle{
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 60upx;
	}
	.textarea{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		color: #FFF;
	}
	.videoBox > .num{
		display: flex;
		justify-content: flex-end;
		width: 100%;
		color: #FFFFFF;
		margin-top: 20upx;
		padding-right: 10upx;
	}
</style>
