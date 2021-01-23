<template>
	<view class="page">
		<header-title :title="'个人设置'" ref='headerTitleRef' :backText="'我的'" @toBack='toMe' :iconfont="'&#xe728;'"></header-title>
		<view class="allView">
			<!-- <view class="bgColor"></view>
			<view class="nav">
				<view class="navContent" @tap="toMe()">
					<view class="iconfont">&#xe728;</view>
					<view class="text">我的</view>
					<view class="title">设置</view>
				</view>
			</view> -->
			<!-- <view class="inform" style="border-bottom: 1px solid #CCCCCC;">
				<view>推送通知</view>
				<switch class="section-right" />
			</view> -->
			<view class="inform_list">
				<view class="inform_list_item">
					<view>推送通知</view>
					<switch class="section-right" />
				</view>
				<view class="inform_list_item" @tap="showFontSize = true">
					<view>字體大小</view>
					<view class="text" style="margin-right: 30upx;">{{fontSizeText}}</view>
				</view>
				<view class="inform_list_item">
					<view>中文簡體</view>
					<switch class="section-right" :checked='checkedWordsMode'  @change='checkedWords($event)'  />
				</view>
				<view class="inform_list_item" >
					<view>夜間模式</view>
					<switch :checked='checkedDarkMode' class="section-right" @change='changeDark'/>
				</view>
				<view class="inform_list_item" @tap="goYonghuXY">
					<view>用户协议</view>
					<view class="iconfont icon-youjiantou iconClass"></view>
				</view>
				<view class="inform_list_item" @tap="goYingsZC">
					<view>隐私政策</view>
					<view class="iconfont icon-youjiantou iconClass"></view>
				</view>
				<view class="inform_list_item" @tap="checkEdition()">
					<view>檢查更新</view>
					<view>{{versionData}}</view>
				</view>
			</view>
			
			<!-- <view class="inform" @tap="checkEdition()" style="margin-top: 30upx;">
				<view>检查更新</view>
				<view>{{version}}</view>
			</view> -->
			<view class="inform">
				<!-- <button type="primary" @tap="exitOut()">退出登录</button> -->
				<view class="loginOutBtn" @tap="exitOut()" v-show="showLoginOut">
					退出登錄
				</view>
			</view>
			<view class="copyrightSymbol">©澳門頭條:&nbsp;macauheadline.com</view>
			<view class="version animated flash faster" v-if="versionShow">
				<view class="version-wrap">
					<view class="version-img"></view>
					<view class="version-tit">更新內容</view>
					<view class="version-content">
						<view class="version-contentLeft" v-html="versionTest"></view>
						<view class="version-contentRight"></view>
					</view>
					<view class="version-bottom">
						<view class="btn">
							<button type="warn"  @tap="power()">立即升級</button>
						</view>
						<view class="btn" @tap="getTrue()">
							<button type="primary" class="btns">暫不升級</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-action-sheet :list="fontSizeList" v-model="showFontSize" @tap='chooesFontSize' :safe-area-inset-bottom='true'></u-action-sheet>
		<u-modal v-model="showCloseApp"  @confirm="closeApp" :content="closeText"></u-modal>
		
		
	</view>
</template>

<script>
	import headerTitle from '../../../components/header-title/index.vue'
	import { isNeedLogin } from '../../../utils/index.js'
	export default {
		data(){
			return{
				version:"",
				versionShow:false,
				showLoginOut:false,
				fontSizeList:[
					{ text:'小' },
					{ text:'標準' },
					{ text:'大' },
					{ text:'超大' },
				],
				fontSizeText:'標準',
				showFontSize:false,
				showCloseApp:false,
				checkedDarkMode:false,
				checkedWordsMode:false,
				closeText:'更改字體需關閉當前應用,重啟後方可生效',
				language:"zh-CN",//默认是简体中文
				versionUrl:"",
				versionTest:""
			}
		},
		components:{
			headerTitle
		},
		onShow() {
			if(uni.getStorageSync('btnValue')){
				this.checkedWordsMode = true
			}else{
				this.checkedWordsMode = false
			}
			if(isNeedLogin()){
				this.showLoginOut = false
			}else{
				this.showLoginOut = true
			};
			this.getVersion();//获取设置版本公共变量
		},
		created() {
			this.fontSizeText = uni.getStorageSync('fontSizeType')
			if(uni.getStorageSync('darkMode')){
				this.checkedDarkMode = true
			}else{
				this.checkedDarkMode = false
			}
		},
		methods: {
			power() {
				plus.runtime.openURL(this.versionUrl)
			},
			goYonghuXY(){
				uni.navigateTo({
					url:"../xieYi/xieYi"
				})
			},
			goYingsZC(){
				uni.navigateTo({
					url:"../privacy/index"
				})
			},
			checkedWords(e){
				uni.setStorageSync('btnValue','open');
				let systemInfoData = uni.getStorageSync('system_info');
				if(e.detail.value){
					systemInfoData.language = 'zh_CN';
					uni.setStorageSync('system_info',systemInfoData);
					uni.showToast({
					    title: '成功切換為简体中文',
						icon:'none',
					    duration: 1000
					});
				}else{
					uni.setStorageSync('btnValue','');
					systemInfoData.language = 'en';
					uni.setStorageSync('system_info',systemInfoData);
					uni.showToast({
					    title: '成功切换为繁體中文',
						icon:'none',
					    duration: 1000
					});
				}
			},
			//選擇一個字體
			chooesFontSize(e){
				this.closeText = '更改字體需關閉當前應用,重啟後方可生效'
				this.fontSizeText = this.fontSizeList[e].text
				uni.setStorage({
					key:'fontSizeType',
					data:this.fontSizeText
				})
				switch(e){
				     case 0:
						uni.setStorage({
							key:'fontSizeObj',
							data:{
								titleFontSize:'36upx', //列表标题文字大小
								titleTwoFontSize:'44upx', //内页标题文字大小
								oneFontSize:'32upx', //内页正文文字大小
								twoFontSize:'22upx', //列表中标题下面的日期或者作者
								threeFontSize:'20upx'
							}
						})
				       break;
				     case 1:
						 uni.setStorage({
							key:'fontSizeObj',
							data:{
								titleFontSize:'38upx',
								titleTwoFontSize:'48upx',
								oneFontSize:'36upx',
								twoFontSize:'24upx',
								threeFontSize:'22upx'
							}
						 })
						break;
				     case 2:
						 uni.setStorage({
							key:'fontSizeObj',
							data:{
								titleFontSize:'42upx',
								titleTwoFontSize:'48upx',
								oneFontSize:'40upx',
								twoFontSize:'28upx',
								threeFontSize:'24upx'
							}
						 })
						break;
				     case 3:
						 uni.setStorage({
							key:'fontSizeObj',
							data:{
								titleFontSize:'48upx',
								titleTwoFontSize:'56upx',
								oneFontSize:'44upx',
								twoFontSize:'30upx',
								threeFontSize:'28upx'
							}
						 })
				       break;
				   }
				   this.showCloseApp = true
				   
			},
			//關閉app
			closeApp(){
				try{
				   console.log('用戶的系統',uni.getSystemInfoSync())
				   if (uni.getSystemInfoSync().platform=='ios'){
					   const threadClass = plus.ios.importClass("NSThread");
					   const mainThread = plus.ios.invoke(threadClass, "mainThread");
					   //plus.ios.invoke(mainThread, "exit");
					   //上面的不行就用下面的
					   plus.runtime.restart()
					   // plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
				   } else if (uni.getSystemInfoSync().platform=='android'){
					   // plus.runtime.quit();
					   plus.runtime.restart()
					   
				   }
				}catch(e){
					console.log('有什麼異常',e)
				}
			},
			//改為夜間模式
			changeDark(event){
				let value = event.detail.value
				this.closeText = '更改夜間模式需關閉當前應用,重啟後方可生效'
				this.$refs.headerTitleRef.headChangeDark(value)
				uni.setStorageSync('darkMode',value)
				this.showCloseApp = true
			},
			getVersion(){
				let me = this;
				uni.getStorage({
				    key: 'version_key',
				    success: function (res) {
						me.version = res.data;
				    }
				});
			},
			getTrue(){
				this.versionShow = false
			},
			toMe() {
				uni.switchTab({
					url: '../me'
				})
			},
			checkEdition(){
				let version = this.versionData;
				this.$Httpps
					.sttp({
						"action":"getupgrade",
						"version":version,
						"system": "android"
					})
					.then(res => {
						console.log('res',res)
						if( res.data.detail ===''&&  res.data.url ==='' ){
							uni.showToast({
							    title: '當前已經是最新版本',
								icon:'none',
							    duration: 2000
							});
						}else{
							this.versionShow = true;
							this.versionUrl = res.data.url;
							this.versionTest = res.data.detail;
						}
					}).catch(err => {
						console.log(err);
				});
			},
			exitOut() {
				try {
					uni.removeStorage({key: 'data'});
					uni.removeStorage({key: 'storage_recommedtVideo'});
					uni.removeStorage({key: 'navlistVideo'});
					uni.removeStorage({key: 'storage_index'});
					uni.removeStorage({key: 'navlist'});
					uni.removeStorage({key: 'storage_homeList'});
					uni.removeStorage({key: 'storage_recommed'});
					uni.switchTab({
					    url: '../me'
					});
				} catch (e) {
					uni.reLaunch({
						url: '../login/login',
					});
				};
			}
		}
	}
</script>

<style scoped>
	uni-page-body, uni-page-refresh,uni-scroll-view{
		height: 100%;
	}
	uni-page-wrapper {
		background-color: #f4f5f7 !important;
	}
	.allView{
			background-color: white;
			position: relative;
	}
	.page {
		width: 100%;
		height: 100vh;
		background-color: white;
	}

	.bgColor {
		width: 100%;
		height: 40upx;
		background-color: #dc5340;
	}

	.nav {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		background-color: #dc5340;
	}

	.navContent {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 100%;

	}

	.navContent>.iconfont {
		color: #fff;
		font-size: 46upx;
	}

	.navContent>.text {
		color: #fff;
		font-size: 30upx;
	}

	.navContent>.title {
		width: 86%;
		text-align: center;
		color: #fff;
		font-size: 36upx;
	}

	.inform_list {
		display: flex;
		font-size: 32upx;
		width: 100%;
		flex-direction: column;
		justify-content: space-between;
		background-color: white;
	}
	.section-right{
		transform: scale(0.75);
		margin-top: -10upx;
	}
	.inform_list_item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0 30upx;
		height: 100upx;
		line-height: 40upx;
		padding: 30upx 10upx;
		padding-right: 0;
		background-color: #fff;
		border-bottom: 1px solid #e5e5e5;
		box-sizing: border-box;
		
	}

	
	.inform {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 10upx 20upx;
		margin-top: 40upx;
		background-color: #fff;
		font-size: 32upx;
	}
	.loginOutBtn{
		background-color: #007aff;
		padding: 16upx 44upx;
		color: white;
		border-radius: 15upx;
	}
	.iconClass{
		margin-right: 40upx;
		font-size: 40upx;
	}
	
	/* 版本检测更新 */
	.version{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(90,90,90,.5);
		z-index: 200;
	}
	.version-wrap{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 600upx;
		height: 680upx;
	}
	.version-img{
		width: 600upx;
		height: 400upx;
		background-image: url('../../../static/me/version/version.png');
		background-repeat: no-repeat;  
		background-size: 100% 100%;    
	}
	.version-tit{
		width: 100%;
		padding: 20upx 0;
		padding-left: 20upx;
		box-sizing: border-box;
		background-color: #fff;
	}
	.version-content{
		width: 100%;
		display: flex;
		background-color: #fff;
		flex-direction: row;
	}
	.version-contentLeft{
		flex: 1;
		padding-left: 20upx;
		box-sizing: border-box;
		text-align:justify;
		text-justify:inter-word;
		font-size: 28upx;
	}
	.version-contentRight{
		flex: 1;
	}
	.version-bottom{
		width: 100%;
		height: 120upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background-color: #fff;
		margin-bottom: 20upx;
	}
	.version-bottom .btn button{
		border-radius: 15upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		width: 280upx;
	}
	.version-bottom>.btn:nth-of-type(2)>uni-button {
		background-color: #f0f0f0;
		color: #000;
	}
		
	.copyrightSymbol {
		width: 100%;
		margin-top: 40upx;
		margin-bottom: 40upx;
		text-align: center;
		font-size: 32upx;
		position: fixed;
		bottom: 10upx;
	}
</style>
