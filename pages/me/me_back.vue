<template>
	<view class="pages">
		<scroll-view scroll-y="true"  :style="{height: (swiperheight-50) + 'px'}">
		<view class="navBagColor"></view>
		<view class="content" style="margin-top: 80upx;">
				<view class="navBox">
					<view class="navBox_wrap">
						<view class="navBox_wrap_tit" @tap="denlu()">{{usrName?usrName:'登陸'}}</view>
						<view class="navBox_wrap_content">
							<view class="navBox_wrap_item" @tap="userClock(userissign)">
								<view class="navBox_item_images">
									<image :src="userissign == ''?'../../static/me/register/register.png':'../../static/me/register/registerActive.png'" ></image>
								</view>
								<view class="text">{{userissign == ''?"簽到":"已簽到"}}</view>
							</view>
							<view class="navBox_wrap_item" @tap="toJifen()">
								<view class="iconfont">{{usrIntegral?usrIntegral:'0'}}</view>
								<view class="text">積分</view>
							</view>
							<view class="navBox_wrap_item" @tap="showUserId()">
								<view class="navBox_item_images">
									<image src="../../static/me/register/barCode.png" mode=""></image>
								</view>
								<view class="text">條碼</view>
							</view>
						</view>
					</view>
					<view class="logoImg">
						<image style="border-radius: 50%;" :src="usrLogo != ''?usrLogo:'../../static/logo/icon.png'" mode="aspectFill"></image>
					</view>
				</view>
				<view class="list">
					<view class="listItem" @tap="toShoppingNumbers()">
						<view class="iconfont">&#xe61f;</view>
						<view class="text">積分商城</view>
					</view>
					<view class="listItem" @tap='toVideo()'>
						<view class="iconfont">&#xe602;</view>
						<view class="text">分銷中心</view>
					</view>
					<view class="listItem" @tap="toMyCheater()">
						<view class="iconfont">&#xe7ee;</view>
						<view class="text">我的優惠券</view>
					</view>
					<view class="listItem" @tap="goEditPresonal()">
						<view class="iconfont">&#xe7ea;</view>
						<view class="text">個人資料</view>
					</view>
				</view>
				<view class="InviteFriends">
					<view class="InviteFriendsBg" @tap="goOil()">
						<view class="iconfont">&#xe606;</view>
						<view class="text">邀請好友加入</view>
						<view class="text">享加油八折優惠</view>
						<view class="iconfont">&#xe61c;</view>
					</view>
				</view>
				<uni-list>
						<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="我的收藏" @tap="toColect()" />
						<!-- <uni-list-item :show-extra-icon="true" :extra-icon="extraIcon3" title="浏览历史" @tap="newsHistory()" /> -->
						<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon2" title="意見反饋" @tap="idea()" />
						<block v-for="(value,index) in providerList" :key="index">
							<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon5" title="推薦給朋友" @tap="share(value)" />
						</block>
						<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon3" title="設置" @tap="setUp()" />
						<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon4" title="關於" @tap="toAbout()" />
					
				</uni-list>
		</view>
		</scroll-view>
		<!-- 用户iD -->
		<view class="animated fadeIn faster userID-model" v-if="userIdShow" @tap="userIdShow = false">
			<!-- <view class="user-icon" @tap="userIdShow = false">x</view> -->
			<view class="UserID-box" @top.stop='userIdShow = true'>
				<view style="margin-top: 20upx;font-size: 36upx;font-weight: 500;">用戶ID</view>
				<view style="margin:auto 0;">
					<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="usrCode" :size="size" :unit="unit" :background="background"
					 :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
					 :usingComponents="true" />
				</view>
				<view style="margin-bottom: 20upx;font-size: 36upx;font-weight: 500;">{{usrCode}}</view>
			</view>
		</view>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	import { isNeedLogin , goLogin , appendUserIntegral } from '@/utils/index.js'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				phoneCode: '',
				fogetPhone: '',
				forget: false,
				ifShow: true,
				val: '',
				size: 400,
				unit: 'upx',
				background: '#fff',
				foreground: '#000',
				pdground: '#000',
				icon: '',
				iconsize: 400,
				lv: 3,
				onval: true,
				loadMake: true,
				src: '',
				usrId: '', //用户id
				usrCode:'', //用户代码
				usrIntegral: '', //当前积分
				usrName: '',
				usrLogo: "",
				openId: "",
				userissign: '', //判断用户是否签到
				come: "签到",
				title: 'share',
				shareText: '欢迎使用澳門頭條',
				href: "https://uniapp.dcloud.io",
				image: '',
				shareType: 1,
				providerList: [],
				activeClass: false,
				extraIcon1: {
					color: '#000',
					size: '22',
					type: 'star'
				},
				extraIcon2: {
					color: '#000',
					size: '22',
					type: 'compose'
				},
				extraIcon3: {
					color: '#000',
					size: '22',
					type: 'gear'
				},
				extraIcon4: {
					color: '#000',
					size: '22',
					type: 'home'
				},
				extraIcon5: {
					color: '#000',
					size: '22',
					type: 'redo'
				},
				userIdShow: false,
				swiperheight:0
			}
		},
		onShow() {
			let showPoster = this.$getStorage("data");
			console.log(showPoster)
			if(showPoster){
				this.usrId = showPoster.usrId
				this.getUserInfo()
			}else{
				this.usrId ="";
				this.usrIntegral = ""
				this.usrName = ""
				this.usrLogo = ""
				this.userissign = ""
			}
			
		},
		onLoad(options) {
			this.uniGetPrivider();
			this.getPageHeight();
		},
		methods: {
			toVideo(){
				console.log("fjdskfjklsfjsdlk")
				uni.navigateTo({
					url:'../media/mediaWebView'
				})
			},
			newsHistory(){
				if(isNeedLogin()){
					this.goLogin()
					return
				}
				uni.navigateTo({
					url:'?usrId=' + this.usrId
				})
			},
			goOil(){
				if(isNeedLogin()){
					this.goLogin()
					return
				}
				uni.navigateTo({
					url:'../../common/oilWebview?usrId=' + this.usrId
				})
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.screenHeight;
						this.swiperheight = height;
					}
				});
			},
			goLogin(){
				goLogin("register/register")
			},
			getUserInfo(){
				uni.showLoading()
				uni.request({
					url: this.serverUrl,
					data: {
						"action": "getuser",
						"usrid": this.usrId,
					},
					dataType: 'json',
					success: (res) => {
						uni.hideLoading()
						this.userIfCome()
						let showPoster = this.$getStorage("data");
						showPoster.usrId = res.data.usrId
						showPoster.usrIntegral = res.data.usrIntegral
						showPoster.usrName = res.data.usrName
						showPoster.usrCode = res.data.usrCode
						showPoster.usrIntro = res.data.usrIntro
						showPoster.usrLogo = res.data.usrLogo
						showPoster.usrNo = res.data.usrNo
						showPoster.usrPhone = res.data.usrPhone
						uni.setStorageSync("data", showPoster);
						if (showPoster) {
							this.usrId = showPoster.usrId;
							this.usrCode = showPoster.usrCode;
							this.usrIntegral = showPoster.usrIntegral;
							this.usrName = showPoster.usrNo;
							this.usrLogo = showPoster.usrLogo;
							this.userissign = showPoster.userissign;
						}
					},
					fail: (error) => {
					}
				});
			},
			toMyCheater() {
				if(isNeedLogin()){
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: "./myCheater/myCheater?userId=" + this.usrId
				})
			},
			//用户签到
			userClock(userissign){
				if(isNeedLogin()){
					this.goLogin()
					return
				}
				if(!(userissign == '')){
					return
				}
				uni.request({
					url: this.serverUrl,
					data: {
						"action": "usersign",
						"userId": this.usrId
					},
					dataType: 'json',
					success: (res) => {
						if(res.data.result == 'suc'){
							uni.showToast({
								title:'簽到成功',
								icon:'none',
							})
							this.userissign = true;
							this.getUserInfo()
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.msg
							})
						}
					},
					fail: (error) => {
					}
				})
			},
			userIfCome() {
				var me = this;
				var userId = me.usrId;
				this.$Httpps
					.sttp({
						"action": "getuserissigntoday",
						"userId": userId
					})
					.then(res => {
						if (res.data.result == 'suc') {
							this.userissign = res.data.userissign=="true"?true:false;
						}
					}).catch(err => {
						console.log(err);
				});
			},
			toColect() {
				if(isNeedLogin()){
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: './collect/collect'
				})
			},
			toShoppingNumbers() {
				uni.navigateTo({
					url: './shoppingNumbers/shoppingNumbers'
				})
			},
			toJifen() {
				if(isNeedLogin()){
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: './integrate/integrate'
				})
			},
			showUserId(){
				if(isNeedLogin()){
					this.goLogin()
					return
				}
				this.userIdShow = true
			},
			async share(e) {
				if(isNeedLogin()){
					this.goLogin()
					return
				}
				var that = this
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: 'http://download.macaoheadline.com/',
				    title: '澳門頭條，關心你的關心',
				    summary: '歡迎下載使用澳門頭條，各種新奇又好看的信息等著您',
				    imageUrl: 'http://m.macaoheadline.com/imgs/logoforwechat.png',
				    success: function (res) {
				        let params = {
				        	userId: that.usrId,
				        	integral:'friend'
				        }
				        appendUserIntegral(params)
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});

			},
			idea() {
				uni.navigateTo({
					url: './idea/idea'
				})
			},
			denlu() {
				if (this.usrId || this.usrName) {
					return
				}else{
					this.goLogin()
				}
			},
			toAbout() {
				uni.navigateTo({
					url: './about/about'
				})
			},
			setUp() {
				uni.navigateTo({
					url: './setUp/setUp'
				})
			},
			goEditPresonal(){
				if(isNeedLogin()){
					this.goLogin()
					return
				}
				uni.navigateTo({
					url:"./editPersonal/editPersonal"
				})
			},
			uniGetPrivider(){
				uni.getProvider({
					service: 'share',
					success: (e) => {
						let data = []
						for (let i = 0; i < e.provider.length; i++) {
							switch (e.provider[i]) {
								case 'weixin':
									data.push({
										name: '分享到微信好友',
										id: 'weixin',
										sort: 0
									})
								default:
									break;
							}
						}
						this.providerList = data.sort((x, y) => {
							return x.sort - y.sort
						});
					},
					fail: (e) => {
						console.log('获取分享通道失败', e);
						uni.showModal({
							content: '获取分享通道失败',
							showCancel: false
						})
					}
				});
			},
		}
	}
</script>

<style scoped>
	.pages {
		background-color: #fff;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	uni-page-body{
		height: 100%;
	}
	.navBagColor {
		/* background-image: linear-gradient(to right, #f16149, #fa8447); */
		background: url(@/static/me/version/meShow2.gif) no-repeat 100%;
		background-size: cover;
		width: 100%;
		height: 400upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}
	
	.InviteFriends {
		height: 162upx;
		width: 100%;
		padding: 30upx 30upx;
		box-sizing: border-box;
	}
	
	.InviteFriendsBg {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 90upx;
		line-height: 90upx;
		padding: 0 40upx;
		background-image: linear-gradient(to right, #f6643d, #f36639);
		color: #fff;
		border-radius: 50upx;
	}
	
	.InviteFriendsBg>.text {
		font-size: 28upx;
	}
	
	.InviteFriendsBg>.iconfont {
		font-size: 36upx;
	}
	
	.list {
		position: relative;
		z-index: 100;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		height: 140upx;
		margin-top: 50upx;
		box-sizing: border-box;
		border-bottom: 20upx solid #f3f6fd;
	}
	
	.list>.listItem {
		width: 200upx;
		text-align: center;
	}
	
	.list>.listItem>.iconfont {
		font-size: 50upx;
		color: #f47856;
		padding-bottom: 10upx;
	}
	
	.list>.listItem>.text {
		font-size: 27upx;
	}
	
	.navBox {
		position: relative;
		display: flex;
		margin-top: 40upx;
		justify-content: center;
		width: 100%;
		z-index: 100;
	}
	
	.navBox_wrap {
		display: flex;
		flex-direction: column;
		width: 680upx;
		height: 280upx;
		margin-top: 20upx;
		border-radius: 30upx;
		border: 0;
		background: #fff;
		box-shadow: 1px 1px 1px #ccc, 0px 0px 0px #ccc, -1px 2px 2px #ccc, -1px -1px 1px #ccc;
	}
	
	.navBox_wrap>.navBox_wrap_tit {
		width: 100%;
		height: 100%;
		margin-left: 200upx;
		margin-top: 10upx;
		color: #000000;
		font-weight: bold;
	}
	
	.navBox_wrap_content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 20upx;
		text-align: center;
		width: 100%;
		margin-bottom: 20upx;
	}
	
	.navBox_wrap_item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		border-right: 1px solid #ccc;
	}
	
	.navBox_wrap_item:last-child {
		border: none;
	}
	
	.navBox_wrap_item>.navBox_item_images {
		position: relative;
		width: 60upx;
		height: 60upx;
	}
	
	.navBox_wrap_item>.navBox_item_images>image {
		display: block;
		width: 100%;
		height: 100%;
		left: 30uox;
	}
	
	.navBox_wrap_item>.iconfont {
		font-size: 40upx;
		height: 60upx;
	}
	
	.navBox_wrap_item:last-child>.iconfont {
		font-size: 80upx;
		margin-left: 20upx;
		margin-bottom: 20upx;
	}
	
	.navBox_wrap_item>.text {
		margin-top: 30upx;
		height: 36upx;
		line-height: 22upx;
		font-size: 24upx;
		text-align: center;
		padding: 6upx 20upx;
		border-radius: 20upx;
		box-sizing: border-box;
		border: 1px solid #000000;
	}
	
	.content {
		position: relative;
		top: 160upx;
		width: 100%;
		height: 100%;
		z-index: 110;
	}
	
	.logoImg {
		position: absolute;
		left: 80upx;
		top: -40upx;
		height: 120upx;
		width: 120upx;
		border-radius: 50%;
		z-index: 110;
	}
	
	.logoImg>uni-image,
	.logoImg>uni-image>img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.register {
		position: absolute;
	    top: 40upx;
	    right: 0px;
	    padding-left: 10upx;
	    height: 60upx;
	    line-height: 60upx;
	    width: 180upx;
		border-radius: 50upx 0 0 50upx;
		background-image: linear-gradient(to bottom, #ffad1d, #eba72f);
		z-index: 110;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	
	.register>.iconfont {
		font-size: 30upx;
		color: #FFFFFF;
	}
	
	.register>.text {
		font-size: 23upx;
		margin-left: 10upx;
		color: #FFFFFF;
	}
	
	/* 用户ID弹出框 */
	.userID-model {
		background: rgba(76, 76, 76, 0.49);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1200;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.userID-model>.UserID-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 90%;
		height: 700upx;
		background-color: #fff;
		border-radius: 50upx;
		padding-top: 20upx;
		box-sizing: border-box;
	}
	
	.userID-model>.user-icon {
		position: absolute;
		top: 100upx;
		right: 50upx;
		width: 100upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		border-radius: 50%;
		border: 1px solid #fff;
		color: #fff;
		background-color: rgba(90, 88, 89, 0.49);
	}
	
	
	/* 账号密码登录 */
	/* 微信颜色 */
	.bg-success {
		color: #90df34;
	}
	
	/* QQ颜色 */
	.bg-primary {
		color: #F0555C;
	}
	
	/* 微博颜色 */
	.icon-weibo {
		color: #E71F19;
	}
	.getCode{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 94%;
		margin-bottom: 20upx;
	}
	.getCode>input{
		flex: 1;
		height: 40px;
		border: 1px solid #D8D8D8;
		border-radius: 5px;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.getCode>.codeText{
		flex: 1;
		background-color: #f5f5f5;
		color: #000;
		line-height: 40px;
		border-radius: 5px;
		padding-left: 10px;
		font-size: 30upx;
	}
</style>
