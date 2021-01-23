<template>
	<view class="animated faster slow" v-if="show">
		<view class="more-share-model" @tap="togle"></view>
		<view class="more-share">
			<view class="more-share-title">分享到</view>
			<view class="more-share-body">
				<view class="more-share-item" 
						v-for="(value,index) in providerList" :key="index"
					  hover-class="more-share-hover" 
					  @tap="share(value)">
					<view class="icon iconfont"
					:class="['icon-'+value.zicon,'more-share-'+value.zclass]">
					</view>
					<view style="font-size: 30upx;">{{value.name}}</view>
				</view>
			</view>
			<view class="more-share-bottom" 
				  hover-class="more-share-hover" 
				  @tap="togle">取消</view>
		</view>
	</view>
</template>

<script>
	import { appendUserIntegral , mobAppKey , mobSecret } from '@/utils/index.js'
	
	import {
		SSDKContentType,
		SSDKPlatformID,
		SSDKShareParams
	} from "@/ShareSDK.js"
	const pluginMobShare = uni.requireNativePlugin('mob-sharesdk');
	
	export default{
		props:{
			show:Boolean,
			sharedata:Object
		},
		data() {
			return {
				title: 'share',
				shareText: '歡迎使用澳門頭條app',
				href:"https://uniapp.dcloud.io",
				image: '',
				shareType:1,
				providerList: [],
				newsItem:{},
				platform:''
			}
		},
		onShareAppMessage() {
			return {
				title: this.shareText ? this.shareText : "歡迎使用澳門頭條app",
				path: '/pages/tabBar/component/component',
				imageUrl:this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					this.platform = res.platform;
					this.uniGetPrivider();
				},
				fail: (err) => {
					this.platform = "ios"
					this.uniGetPrivider();
				},
				complete: () => {}
			});
			
		},
		methods:{
			// 配置
			 submitPrivacyGrantResult() {
				try{
					pluginMobShare.submitPrivacyGrantResult({
						isUrl: 'true',
						mobAppkey: '3029f42f5467b',
						mobSecret: '2fc76d392f2e4816178586f3b8ca0fb1',
					}, result => {
						const msg = JSON.stringify(result);
					},error =>{
						console.log("这里有报错",error)
					});
				}catch{
					
				}
				//this.mobAuthorize()
			},
			//end
			uniGetPrivider(){
				uni.getProvider({
				service: "share",
				success: (e) => {
					console.log("可以分享的回调",e)
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						let zicon = '';
						let zclass = '';
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '微信',
									id: 'weixin',
									zicon:"weixin",
									zclass:"wx",
									sort:0
								})
								data.push({
									name: '朋友圈',
									id: 'weixin',
									type:'WXSenceTimeline',
									zicon:"pengyouquan",
									zclass:"pyq",
									sort:1
								})
								
								break;
							default:
								break;
						}
					}
					if(this.platform){
						console.log('分享')
						//ios没法使用facebook分享
						data.push({
							name: 'facebook',
							id: 'facebook',
							zicon:"facebook",
							zclass:"facebook",
							sort:2
						})
					}
					// data.push({
					// 	name: 'Instagram',
					// 	id: 'ins',
					// 	zicon:"ins",
					// 	zclass:"ins",
					// 	sort:3
					// })
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					alert(1);
					console.log('获取分享通道失败', e);
					uni.showModal({
						content:'获取分享通道失败',
						showCancel:false
					})
				}
			});
			},
			togle(){
				this.$emit('togle');
			},
			share(e) {
				this.newsItem = uni.getStorageSync('giveShareNewsItem')
				this.togle()
				var scene = ''
				if(e.sort == '0'){
					scene = 'WXSceneSession'
				}else if(e.sort == '1'){
					scene = 'WXSenceTimeline'
				}else if(e.sort == '2'){
					//facebook Share
					console.log('這裡是去往facebook分享')
					this.facebookShare()
					return
				}else if(e.sort == '3'){
					//insShare
					this.insShare()
					return
				}
				var shareHref = 'http://2020.macaoheadline.com/m/?id=' + this.newsItem.DatId;
				var shareImage = this.newsItem.DatPic;
				
				if(this.newsItem.DatPic == ''){
					shareImage = this.shareImage
				}
				var shareTitle = '';
				if( uni.getStorageSync('system_info').language == 'en' ){
					shareTitle = this.newsItem.DatTitleFT;
				}else{
					shareTitle = this.newsItem.DatTitle;
				}
				var that = this
				uni.share({
				    provider: "weixin",
				    scene: scene,
				    type: 0,
				    href: shareHref,
				    title: shareTitle,
				    summary: shareTitle,
				    imageUrl: shareImage,
				    success:  (res) => {
						let params = {
							userId: uni.getStorageSync("data").usrId,
							integral:'share'
						}
						appendUserIntegral(params)
						that.togle()
				    },
				    fail: function (err) {
				    }
				});
			},
			facebookShare(){
				console.log('111');
				var shareHref = this.webViewUrl + '/m/?id=' + this.newsItem.DatId
				var shareImage = this.newsItem.DatPic
				if(this.newsItem.DatPic == ''){
					shareImage = this.shareImage
				}
				var shareTitle = this.newsItem.DatTitle
				pluginMobShare.generalShare({
					platName: SSDKPlatformID.Facebook,
					mobAppkey: mobAppKey,
					mobSecret: mobSecret,
					// text: shareTitle,
					// title: shareTitle,
					url: shareHref,
					imageUrl: 'http://download.macaoheadline.com/imgs/d1.png',
					shareType: SSDKContentType.WebPage,
				}, result => {
					console.log('到這裡就說明調用facebook成功了',result)
				},error => {
					console.log('看看facebook的錯誤回調',error)
				});
			},
			radioChange(e){
				console.log('type:' + e.detail.value);
				this.shareType = parseInt(e.detail.value);
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed', 'original'],
					success: (res) => {
						this.image = res.tempFilePaths[0];
					}
				})
			},
			compress(){//压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log('开始压缩');
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => {// 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if(file.size > 20480) {// 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content:'分享图片太大,需要请重新选择图片!',
										showCancel:false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content:'分享图片太大,需要请重新选择图片!',
							showCancel:false
						})
					});
				})
			}
		}
	}
</script>

<style scoped>
/* 分享 */
.more-share-model{
	background: rgba(51,51,51,0.49);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 100;
}
.more-share{
	position: fixed;
	z-index: 110;
	bottom: 70upx;
	left: 0;
	right: 0;
	background: #fff;
}
.more-share-title,.more-share-bottom{
	text-align: center;
	font-size: 32upx;
	padding: 25upx;
	text-align: center;
}
.more-share-body{
	white-space: nowrap;
	width: 100%;
	height: 200upx;
	display: flex !important;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.more-share-item{
	width: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
	text-align: center;
	margin-top: 20upx;
}
.more-share-item>view:first-child{
	width: 100upx;
	height: 100upx;
	border-radius: 100%;
	font-size: 55upx;
	color: #fff;
}
.more-share-item>view:last-child{
	color: #7A7A7A;
}
uni-image {
    width: 80upx!important;
}
.icon-weixin>img{
	display: block;
	width: 100%;
	height: 100%;
	margin-top: 20upx;
}
.more-share-hover{
	background: #EEEEEE;
}
.more-share-wx{
	color: #2AD19B !important;
}
.more-share-pyq{
	color: #514D4C !important;
}
.more-share-wb{
	color: #EE5E5E !important;
}
.more-share-qq{
	color: #4A73BA !important;
}
.more-share-facebook{
	color: #3a5a98 !important;
}
.more-share-ins{
	color: #cf2f79 !important;
}

</style>
