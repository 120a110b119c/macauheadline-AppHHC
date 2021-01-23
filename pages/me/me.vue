<template>
	<view class="meContent">
		<view class="version" v-if="versionShow">
			<view class="version-wrap">
				<view class="version-img"></view>
				<view class="version-tit">{{i18n.contentUpdating}}</view>
				<view class="version-content">
					<view class="version-contentLeft" v-html="versionText"></view>
					<view class="version-contentRight"></view>
				</view>
				<view class="version-bottom">
					<view class="btn">
						<button type="warn" @tap="power()">{{i18n.immediatelyUpdating}}</button>
					</view>
					<view class="btn" @tap="getTrue()">
						<button type="primary" class="btns">{{i18n.noUpdating}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="headImg"></view>
		<view class="meBody">
			<view class="titImageList" v-if="!usrId">
				<view class="titImage">
					<image src="../../static/me/titleImage.jpg" mode="widthFix"></image>
				</view>
				<view class="titRegister" @tap="botomRegisterShow">
					{{i18n.registerSignUp}}
				</view>
				<!-- <view class="titRegister"  @tap="denglu()">
					登錄/註冊
				</view> -->
			</view>

			<view class="mePeople" v-if="usrId">
				<view class="peoImgDiv">
					<image class="peoImg" :src="usrLogo != ''?usrLogo:'/static/logo/icon.png'" mode="aspectFill"></image>
					<!-- <image class="peoImg" src="" ></image> -->
				</view>
				<view class="peoNameDiv">
					<view class="peoName">
						<view @tap="denglu()">{{usrName?usrName:'登陸'}}</view>
						<view style="height:40upx;width: 40upx;margin-left: 20upx;" @tap="goEditPresonal()">
							<image src="../../static/me/editMe.png" class="editMeImg"></image>
						</view>
					</view>
					<view class="peoNum" v-show="usrId">{{i18n.accountNumber}}:{{usrId}}</view>
				</view>
				<!-- <view class="peoCollect" @tap="userClock(userissign)">{{userissign == ''?"簽到":"已簽到"}}</view> -->
			</view>
			<view class="reqAwh" v-if="usrType!='2' && usrId">
				{{i18n.titleText}}
				<u-button class="reqAwhBtn" @click="myMedia()" :ripple="true" ripple-bg-color="rgba(255, 255, 255)">{{i18n.applicationAustraliaNumber}}</u-button>
			</view>
			<view class="u-demo-wrap" v-if="usrId">
				<view class="u-demo-area">
					<u-steps :list="numList" :current="currentIndex" :mode="mode" :icon="currentIndex==6?'icon iconfont icon-huangguan':'icon iconfont icon-dagou1'"
					 active-color="#fa8b00"></u-steps>
				</view>
			</view>
			<view class="saveBtn" v-if="usrId">
				<u-button type="error" :shape="shape"  ripple-bg-color="rgba(255, 255, 255)" @tap="userClock(userissign)" size="default" :ripple="true">{{registerText}}</u-button>
				<!-- <uni-button @tap="stepValue()">shshha</uni-button> -->
			</view>
			<view class="iconFather">
				<u-grid :col="4" :border='false'>
					<u-grid-item v-for="(item,index) in iconList1" @click="clickFun1(index)">
						<image :src="item.src" class="icon_img" ></image>
						<view class="grid-text">{{systemInfolanguage == 'en'?item.name:item.simplifiedName}}</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="shareImgDiv" @tap='goOil()'>
				<image class="shareImg" src="@/static/me/shareImg.jpg"></image>
			</view>
			<view class="lastDiv">
				<view class="iconTitle">常用功能</view>
				<view class="twoIconDiv">
					<u-grid :col="4" :border='false'>
						<!--  v-show="item.name != '商家端' && item.name != '核銷'" -->
						<u-grid-item v-for="(item,index) in iconList2" @click="clickFun2(index)" v-if="judgeEvent(index)">
							 <!-- v-if="index!=0  || usrType=='2'" -->
							<image :src="item.src" class="icon_img"></image>
							<view class="grid-text">{{systemInfolanguage == 'en'?item.name:item.simplifiedName}}</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
			<view style="height: 300upx;">

			</view>
			<view class="animated fadeIn faster userID-model" v-if="userIdShow" @tap="userIdShow = false">
				<!-- <view class="user-icon" @tap="userIdShow = false">x</view> -->
				<view class="UserID-box">
					<view style="margin-top: 20upx;font-size: 36upx;font-weight: 500;">用戶ID</view>
					<view style="margin:auto 0;">
						<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="usrCode" :size="size" :unit="unit" :background="background"
						 :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval"
						 :loadMake="loadMake" :usingComponents="true" />
					</view>
					<view style="margin-bottom: 20upx;font-size: 36upx;font-weight: 500;">{{usrCode}}</view>
				</view>
			</view>
			<view class="animated fadeIn faster userID-model" v-if="userInviteShow" @tap="userInviteShow = false">
				<!-- <view class="user-icon" @tap="userIdShow = false">x</view> -->
				<view class="UserID-box">
					<view style="margin-top: 20upx;font-size: 36upx;font-weight: 500;">{{i18n.userInviteCode}}</view>
					<view style="margin:auto 0;">
						<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="usrId" :size="size" :unit="unit" :background="background"
						 :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval"
						 :loadMake="loadMake" :usingComponents="true" />
					</view>
					<view style="margin-bottom: 20upx;font-size: 36upx;font-weight: 500;">{{usrId}}</view>
				</view>
			</view>
			<view class="botomRegister" v-show="botomRegister">
				<!-- botomRegister -->
				<view class="RegisterBox">
					<view class="RegisterHeader">
						<view class="icon iconfont icon-shanchu" @tap="cancelButton()"></view>
						<view>{{i18n.oneClicklogin}}</view>
					</view>

					<view class="RegisterContent" v-show="phoneNumber">
						<view style="font-size: 60upx;">{{phoneNumber.replace(/^(\w{3})\w{4}(.*)$/, '$1***$2')}}</view>
						<button class="btnBg" @tap="oneClickLogin">{{i18n.myPhoneNumberOneClicklogin}}</button>
					</view>
					<view class="change" @tap="changNumber" v-show="phoneNumber">{{i18n.exchangeAccountNumber}}></view>
					<view class="noPhone" style="margin-top: 60upx;" v-show="!phoneNumber">
						<button class="btnBg" @tap="changNumber">{{i18n.usePhoneNameRegister}}</button>
					</view>
					<view class="loginPwd">
						<text class="text" @tap='goLogin2'>{{i18n.usePasswordRegister}}</text>
					</view>
					<view class="iconList">
						<view class="list">
							<view class="weixing">
								<view class="exitList">
									<block v-for="(item, index) in iconsList" :key="index">
										<view class="icon iconfont exitList-item" :class="item.icon + ' ' + item.bgColor" @click="thirdPartyLogin(item.name)"></view>
									</block>
								</view>
								<view class="iosLogin" >
									<!--  -->
									<view class="sign-in-with-apple" v-if=" system >= 13 && platform=='ios'"  @tap="appleLogin">
										<image class="iconIos" src="../../static/me/register/icon_ios.png" mode=""></image>
										<text class="iosLoginTitle">{{i18n.useAppleRegister}}</text>
									</view>
								</view>
							</view>
							<!-- <view class="image">
								<image src="../../../static/register/weibo.jpg" mode="widthFix"></image>
							</view>
							<view class="image">
								<image src="../../../static/register/facebook.jpg" mode="widthFix"></image>
							</view>
							<view class="image">
								<image src="../../../static/register/weixing.jpg" mode="widthFix"></image>
							</view>
							<view class="image">
								<image src="../../../static/register/tuite.jpg" mode="widthFix"></image>
							</view>
							<view class="image">
								<image src="../../../static/register/QQ.jpg" mode="widthFix"></image>
							</view> -->
						</view>
					</view>
					<view class="Registerbottom">
						<view>{{i18n.registerRepreAgree}}</view>
						<view @tap="xieYi">{{i18n.disclosureAgreement}}</view>
					</view>
				</view>
			</view>
			<u-toast ref="msgToast" />
			<u-modal v-model="oilShow" @confirm='goOil()' :content="i18n.noWritePersonalInformation" show-cancel-button></u-modal>
			<custom-cover></custom-cover>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	import {
		isNeedLogin,
		goLogin,
		appendUserIntegral
	} from '@/utils/index.js'

	const pluginMobShare = uni.requireNativePlugin('mob-sharesdk');

	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				registerText: "立即签到",
				hairLine: true,
				plain: true,
				ripple: true,
				shape: 'circle',
				mode: 'number',
				icon: '&#xe785;',
				currentIndex: -1,
				yesRegisterDays: "",
				numList: [{
					name: '1天'
				}, {
					name: '2天'
				}, {
					name: '3天'
				}, {
					name: '4天'
				}, {
					name: '5天'
				}, {
					name: '6天'
				}, {
					name: '7天'
				}],
				platform: '', // 平台
				system: '',
				iconsList: [], //登录列表数组
				phoneNumber: '',
				botomRegister: false,
				versionShow: false, //版本检测更新--判断是否显示
				versionText: '',
				iconList1: [{
						src: '/static/me/me_barCode.jpg',
						name: "條碼",
						simplifiedName:"条码"
					},
					{
						src: '/static/me/me_erCode.jpg',
						name: "邀請碼",
						simplifiedName:"邀请码"
					},
					{
						src: '/static/me/me_integral.jpg',
						name: "積分",
						simplifiedName:"积分"
					},
					{
						src: '/static/me/me_msg.jpg',
						name: "消息",
						simplifiedName:"积分任务"
					},
					{
						src: '/static/me/me_job.jpg',
						name: "積分任務",
						simplifiedName:"积分任务"
					},
					{
						src: '/static/me/me_money.jpg',
						name: "我的優惠券",
						simplifiedName:"我的优惠券"
					},
					{
						src: '/static/me/me_love.jpg',
						name: "粉絲",
						simplifiedName:"粉丝"
					},
					{
						src: '/static/me/me_likeMe.jpg',
						name: "關注",
						simplifiedName:"关注"
					}
				],
				iconList2: [{
						src: '/static/me/myVideo.jpg',
						name: "自媒體",
						simplifiedName:"自媒体"
					},
					{
						src: '/static/me/my_shopIcon.png',
						name: "商家端",
						simplifiedName:"商家端"
					},
					{
						src: '/static/me/my_shopIcon.png',
						name: "核銷",
						simplifiedName:"核销"
					},
					{
						src: '/static/me/me_collect.jpg',
						name: "收藏",
						simplifiedName:"收藏"
					},
					{
						src: '/static/me/me_his.jpg',
						name: "歷史",
						simplifiedName:"历史"
					},
					{
						src: '/static/me/me_shopping.jpg',
						name: "積分商城",
						simplifiedName:"积分商城"
					},
					{
						src: '/static/me/me_fxzx.jpg',
						name: "分銷中心",
						simplifiedName:"分销中心"
					},
					{
						src: '/static/me/me_idea.jpg',
						name: "意見反饋",
						simplifiedName:"意见反馈"
					},
					{
						src: '/static/me/me_about.jpg',
						name: "關於我們",
						simplifiedName:"关于我们"
					},
					{
						src: '/static/me/me_setting.jpg',
						name: "設置",
						simplifiedName:"设置"
					},
					{
						src: '/static/me/me_update.jpg',
						name: "版本更新",
						simplifiedName:"版本更新"
					},
					{
						src: '/static/me/question.png',
						name: "问吧",
						simplifiedName:"问吧"
					}
				],
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
				usrCode: '', //用户代码
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
				userIdShow: false,
				swiperheight: 0,
				userInviteShow: false,
				usrType: '',
				userInfo: {},
				oilShow: false,
				areaCode: '',
				usrLoginCheckCode: '',
				version:"",
				systemInfolanguage:"en"
			}
		},
		computed: {
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		onShow() {
			this.version = this.versionData;
			let showPoster = uni.getStorageSync("data"); //有值说明已经登录成功
			// let currentIndexs = uni.getStorageSync("currentIndex");
			// this.currentIndex = currentIndexs;
			this.userInfo = showPoster;
			if (showPoster) {
				this.usrType = showPoster.usrType;
				this.usrId = showPoster.usrId
				this.getRegisterNumber(); //获取连续签到天数
				this.getUserInfo();
			} else {
				this.usrId = "";
				this.usrIntegral = ""
				this.usrName = ""
				this.usrLogo = ""
				this.userissign = ""
			}
			this.phoneNumber = uni.getStorageSync('userPhoneNumber')
			this.areaCode = uni.getStorageSync('userAreaCode');
			this.usrLoginCheckCode = uni.getStorageSync('usrLoginCheckCode');
			this.changeData();//切换简繁体
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.system = res.system
					this.platform = res.platform
				},
				fail: (err) => {},
				complete: () => {}
			});
			this.uniGetPrivider();
			this.getPageHeight();
			this.getLoginAuth();
		},
		methods: {
			changeData() {
				const system_info = uni.getStorageSync('system_info');
				system_info.language === 'en' ? system_info.language = this._i18n.locale = 'zh_CN' : system_info.language = this._i18n.locale = 'en';
				system_info.language === 'en' ? this.systemInfolanguage = 'zh_CN' : this.systemInfolanguage = 'en';
			},
			judgeEvent(index){
				let usrTypeValue = this.usrType;
				let booleanValue = '';
				let hexiao = ''
				usrTypeValue == '2'? booleanValue = true:booleanValue = false;
				usrTypeValue == '1'? hexiao = true:hexiao = false;
				if(index<3){
					if(index ==0 && !booleanValue){
						return false
					}else if(index ==0 && booleanValue){
						return true
					}else if(index ==1 && booleanValue){
						return false
					}
					else if(index ==1 && !booleanValue){
						return true
					}else if(index ==2 && !hexiao){
						return false
					}else if(index ==2 && hexiao){
						return true
					}
				}else{
					return true
				}
			},
			testWXLogin() {
				pluginMobShare.getUserInfo({
					platName: 22,
					mobAppkey: '3029f42f5467b',
					mobSecret: '2fc76d392f2e4816178586f3b8ca0fb1',
				}, result => {
					let formdata = {}
					if (this.platform == "ios") {
						const infoRes = result.userData
						formdata = {
							"action": "loginwechat",
							"openid": encodeURIComponent(infoRes.uid),
							"nickname": encodeURIComponent(infoRes.nickname),
							"headimgurl": encodeURIComponent(infoRes.icon)
						};
					} else {
						const infoRes = JSON.parse(result.onCompleteResult)
						formdata = {
							"action": "loginwechat",
							"openid": encodeURIComponent(infoRes.openid),
							"nickname": encodeURIComponent(infoRes.nickname),
							"headimgurl": encodeURIComponent(infoRes.icon)
						};
					}
					uni.request({
						url: this.serverUrl,
						data: formdata,
						success: res => {
							uni.hideLoading();
							uni.setStorageSync('data', res.data);
							let showPoster = uni.getStorageSync("data");
							this.userInfo = showPoster;
							if (showPoster) {
								this.usrType = showPoster.usrType;
								this.usrId = showPoster.usrId
								this.getUserInfo()
							}
							this.botomRegister = false;
						},
						fail: (error) => {
							console.log('这是登录我们自己平台的错误回调', error)
						}

					});
				}, error => {
					console.log("错误回调", error)
				})
			},
			//获取连续签到天数
			getRegisterNumber() {
				this.$Httpps
					.sttp({
						"action": "getusersigndays",
						"usrId": this.usrId
					})
					.then(res => {
						if (res.data.result == 'suc') {
							console.log('res.data',res.data)
							this.yesRegisterDays = (Number(res.data.days) - 1);
							uni.setStorageSync('yesRegisterDays', this.yesRegisterDays)
						} else {
							uni.showToast({
								title: "報錯:" + res.data.msg,
								icon: 'none'
							})
						}
					}).catch(err => {
						console.log(err);
					});
			},
			myMedia() {
				uni.navigateTo({
					url: "./../media/infoFill"
				})
			},
			//一键登录
			oneClickLogin() {
				let paramsObj = {}
				paramsObj.action = 'onechecklogin';
				paramsObj.userTel = this.areaCode + this.phoneNumber;
				paramsObj.usrLoginCheckCode = this.usrLoginCheckCode
				this.requestPost(paramsObj).then(res => {
					if (res.data.result == 'suc') {
						//验证随机码
						uni.setStorage({
							key: 'usrLoginCheckCode',
							data: res.data.usrLoginCheckCode
						})
						uni.setStorage({
							key: 'data',
							data: res.data
						})
						this.usrType = res.data.usrType;
						this.usrId = res.data.usrId
						this.getUserInfo();
						this.userIfCome();
						
					} else {
						uni.showToast({
							icon: "none",
							title: '一键登录失败,请使用手机验证码登录'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: './register/register'
							})
						}, 1200)
					}
				}).fail((failRes) => {
					console.log(failRes)
				})
			},
			changNumber() {
				this.botomRegister = false;
				uni.navigateTo({
					url: './register/register'
				})
			},
			xieYi() {
				uni.navigateTo({
					url: './xieYi/xieYi'
				})
			},
			cancelButton() {
				this.botomRegister = false;
			},
			// 苹果登录
			appleLogin() {
				// 判断是 iOS13版本
				uni.login({
					provider: 'apple',
					success: (loginRes) => {
						uni.getUserInfo({
							provider: 'apple',
							success: (infoRes) => {
								console.log('这里是ios获取登录GETUserInfo', infoRes)
								uni.showLoading()
								var nickName = ''
								if (infoRes.userInfo.fullName.nickName) {
									nickName = encodeURIComponent(infoRes.userInfo.fullName.nickName)
								}
								let formdata = {
									"action": "loginapple",
									"user": infoRes.userInfo.openId,
									"nickname": nickName,
								};
								uni.request({
									url: this.serverUrl,
									data: formdata,
									success: res => {
										uni.hideLoading()
										console.log('登录我们自己的平台', res.data)
										uni.hideLoading();
										uni.setStorageSync('data', res.data);
										let showPoster = uni.getStorageSync("data");
										this.userInfo = showPoster;
										if (showPoster) {
											this.usrType = showPoster.usrType;
											this.usrId = showPoster.usrId
											this.getUserInfo()
										} else {
											this.usrId = "";
											this.usrIntegral = ""
											this.usrName = ""
											this.usrLogo = ""
											this.userissign = ""
										}
										uni.switchTab({
											url: "../me"
										});
										this.botomRegister = false;
									}

								});
							},
							fail: (err) => {}
						})
					},
					fail: (err) => {}
				})
			},
			//微信登录原模块
			thirdPartyLogin(index) {
				// 等用ShareSDK之后再用回这个登录
				// this.testWXLogin();
				// return;
				if (index === '' || index === undefined || index === 'undefined') {
					uni.showToast({
						title: '参数错误，请联系管理员！',
						icon: 'none',
						duration: 3000
					});
					return false;
				} else {
					console.log("fhjks福建省科技",index)
					let loginType = index;
					uni.login({
						provider: loginType,
						success: res => {
							console.log("首个login报错的错", res)
							var access_token = '';
							access_token = res.authResult.access_token;
							// 3 授权登录成功以后，获取用户的信息
							uni.getUserInfo({
								provider: loginType,
								success: (infoRes) => {
									console.log('获取用户信息的回调', infoRes)
									uni.showLoading({
										title: '加载中'
									})
									let formdata = {
										"action": "loginwechat",
										"openid": encodeURIComponent(infoRes.userInfo.openId),
										"nickname": encodeURIComponent(infoRes.userInfo.nickName),
										"headimgurl": encodeURIComponent(infoRes.userInfo.avatarUrl)
									};
									uni.request({
										url: this.serverUrl,
										data: formdata,
										success: res => {
											uni.hideLoading();
											uni.setStorageSync('data', res.data);
											let showPoster = uni.getStorageSync("data");
											this.userInfo = showPoster;
											if (showPoster) {
												this.usrType = showPoster.usrType;
												this.usrId = showPoster.usrId
												this.getUserInfo();
												this.userIfCome();
											}
											this.botomRegister = false;
										},
										fail: (error) => {
											console.log('这是登录我们自己平台的错误回调', error)
										}

									});
								},
								fail: (error) => {
									console.log('这是微信那边过来的错误回调', error)
								}
							});
						},
						fail: err => {
							console.log('这个是login的错误回调', err)
							uni.showToast({
								title: '请求出错啦！',
								icon: 'none',
								duration: 3000
							});
						},
						complete: (res) => {
							console.log(res)
						}
					});
				}
			},
			//获取当前登录渠道
			getLoginAuth() {
				uni.getProvider({
					service: 'oauth',
					success: result => {
						let providerList = result.provider;
						for (var i = 0; i < providerList.length; i++) {
							var item = providerList[i]
							var itemObj = {}
							if (item == 'weixin') {
								itemObj.providerName = '微信登錄';
								itemObj.name = 'weixin'
								itemObj.icon = 'icon-weixin';
								itemObj.bgColor = 'more-share-wx';
							} else if (item == 'qq') {
								itemObj.providerName = 'QQ登陸';
								itemObj.icon = 'icon-QQ';
								itemObj.name = 'qq'
								itemObj.bgColor = 'more-share-qq';
								continue; //暂时只需要微信登录
							} else if (item == 'sinaweibo') {
								itemObj.providerName = '微博登陸';
								itemObj.name = 'sinaweibo'
								itemObj.icon = 'icon-weibo';
								itemObj.bgColor = 'more-share-wb';
								continue; //暂时只需要微信登录
							} else {
								continue;
							}
							this.iconsList.push(itemObj)
						}
					},
					fail: error => {
						console.log('获取登录通道失败！', error);
						return false;
					}
				})
			},
			botomRegisterShow() {
				this.botomRegister = true;
			},
			versionIfShow() {
				let me = this;
				let systemVersion = '';
				if (uni.getSystemInfoSync().platform === 'android') {
					systemVersion = 'android'
				} else if (uni.getSystemInfoSync().platform == 'ios') {
					systemVersion = 'iOS'
				}
				let version = this.version;
				this.$Httpps
					.sttp({
						"action": "getupgrade",
						"version": version,
						"system": systemVersion
					})
					.then(res => {
						if (res.data.detail === '' && res.data.url === '') {
							this.$refs.msgToast.show({
								title: '当前版本是最新版本',
								type: 'primary',
								icon: false
							})
						} else {
							this.versionText = res.data.detail;
							this.versionUrl = res.data.url;
							me.versionShow = true
						}
					}).catch(err => {
						console.log(err);
					});
			},
			//版本检测更新---升级按钮点击
			power() {
				console.log('this.versionUrl',this.versionUrl)
				plus.runtime.openURL(this.versionUrl)
			},
			//版本检测更新---暂不升级按钮点击
			getTrue() {
				this.versionShow = false
			},
			//历史按钮
			newsHistory() {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: "./newsHistory/newsHistory"
				})
			},
			//自媒体
			toMyVideo() {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: "../media/mediaPersonal"
				})
			},
			clickFun1(index) {
				switch (index) {
					case 0:
						this.showUserId();
						break;
					case 1:
						this.showInviteCode()
						break;
					case 2:
						this.toJifen()
						break;
					case 3:
						// this.toShop()
						this.showMsgList()
						break;
					case 4:
						this.showMsg()
						break;
					case 5:
						this.toMyCheater()
						break;
					case 6:
						this.showMsg()
						break;
					case 7:
						this.showMsg()
						break;
				}
			},
			toShop() {
				uni.navigateTo({
					url: '../coupon/index'
				})
			},
			showMsgList(){
				uni.navigateTo({
					url:"./showMsgList/index"
				})
			},
			clickFun2(index) {
				switch (index) {
					case 0:
						this.toMyVideo()
						break;
					case 1:
						this.toShopStore();
						break;
					case 2:
						this.toVerificationPage();
						break;
					case 3:
						this.toColect();
						break;
					case 4:
						this.newsHistory()
						break;
					case 5:
						this.toShoppingNumbers()
						break;
					case 6:
						this.showMsg()
						break;
					case 7:
						this.idea()
						break;
					case 8:
						this.toAbout()
						break;
					case 9:
						this.setUp()
						break;
					case 10:
						this.versionIfShow()
						break;
					case 11:
						this.questionIfShow()
						break;
				}
			},
			//问吧界面
			questionIfShow(){
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				// window.alert("我是问吧界面")
				uni.navigateTo({
					url: "./question/index"
				})
			},
			//核銷界面
			toVerificationPage(){
				uni.navigateTo({
					url:"../storePage/page/verificationPage/index"
				})
			},
			toShopStore(){
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				let userTypeData = this.usrType;
				if(userTypeData === '0'){
					uni.navigateTo({
						url:'../storePage/page/ShoppingTown/index'
					})
				}else if(userTypeData === '1'){
					uni.navigateTo({
						url:"../storePage/index"
					})
				}else{
					return
				}
			},
			showMsg() {
				this.$refs.msgToast.show({
					title: '該功能正在開發中喲!敬請期待',
					type: 'primary',
					icon: false
				})
			},
			goLogin2(){
				uni.navigateTo({
					url:"./register/register2"
				})	
			},
			//去加油
			goOil() {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: '../../common/oilWebview?usrId=' + this.usrId
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
			//去登录页面
			goLogin() {
				goLogin("register/register")
			},
			//获取用户信息
			getUserInfo() {
				uni.request({
					url: this.serverUrl,
					data: {
						"action": "getuser",
						"usrid": this.usrId,
					},
					dataType: 'json',
					success: (res) => {
						uni.hideLoading()
						if (res.data.result == 'suc') {
							this.userIfCome()
							let showPoster = this.$getStorage("data");
							uni.setStorageSync("data", res.data);
							this.userInfo = res.data;
							this.usrType = res.data.usrType;
							uni.setStorageSync("usrType", res.data.usrType);
							if (showPoster) {
								this.usrId = showPoster.usrId;
								this.usrCode = showPoster.usrCode;
								this.usrIntegral = showPoster.usrIntegral;
								this.usrName = showPoster.usrNo;
								this.usrLogo = showPoster.usrLogo;
								this.userissign = showPoster.userissign;
							}
							this.botomRegister = false;
						}
					},
					fail: (error) => {}
				});
			},
			//去卡包
			toMyCheater() {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: "./myCheater/index?userId=" + this.usrId
				})
			},
			//用户签到
			userClock(userissign) {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				this.requestPost({
						"action": "usersign",
						"userId": this.usrId
					}).then(res => {
						if (res.data.result == 'suc') {
							let yesRegisterDays = uni.getStorageSync('yesRegisterDays');
							this.currentIndex = ++this.yesRegisterDays;
							this.registerText = "今日已簽到",
							this.currentIndex > 6 ? this.currentIndex = 0 : "";
							// 签满七天增加用户积分
							if (this.currentIndex == '6') {
								let NumberObj = {
									userId: this.usrId,
									integral: '7sign'
								}
								appendUserIntegral(NumberObj);
							}
							this.getUserInfo()
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						}
					})
					.catch((error) => {})
			},
			//获取用户今天是否签到
			userIfCome() {
				var me = this;
				var userId = me.usrId;
				this.requestPost({
						"action": "getuserissigntoday",
						"userId": userId
					})
					.then(res => {
						if (res.data.result == 'suc') {
							this.userissign = res.data.userissign == "true" ? true : false;
							if (this.userissign === true) {
								let yesRegisterDays = uni.getStorageSync('yesRegisterDays');
								this.currentIndex = ++yesRegisterDays;
								this.registerText = "今日已簽到";
							}else{
								let yesRegisterDays = uni.getStorageSync('yesRegisterDays');
								this.currentIndex = yesRegisterDays;
								this.registerText = "立即签到";
							}
						}
					}).catch(err => {
						console.log(err);
				});
			},
			//去收藏
			toColect() {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: './collect/collect'
				})
			},
			//去商城
			toShoppingNumbers() {
				uni.navigateTo({
					url: './shoppingNumbers/index'
				})
			},
			//查看积分
			toJifen() {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: './integrate/integrate'
				})
			},
			//查看条码
			showUserId() {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				if (!this.userInfo.usrOil) {
					this.oilShow = true;
					return;
				}
				this.userIdShow = true
			},
			showInviteCode() {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				this.userInviteShow = true
			},
			//分享
			async share(e) {
				if (isNeedLogin()) {
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
					imageUrl: this.shareImage,
					success: function(res) {
						let params = {
							userId: that.usrId,
							integral: 'friend'
						}
						appendUserIntegral(params)
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			//去意见反馈
			idea() {
				uni.navigateTo({
					url: './idea/idea'
				})
			},
			denglu() {
				if (this.usrId || this.usrName) {
					return
				} else {
					this.goLogin()
				}
			},
			//去关于我们
			toAbout() {
				uni.navigateTo({
					url: './about/about'
				})
			},
			//去设置页面
			setUp() {
				uni.navigateTo({
					url: './setUp/setUp'
				})
			},
			//去个人资料
			goEditPresonal() {
				if (isNeedLogin()) {
					this.goLogin()
					return
				}
				uni.navigateTo({
					url: "./editPersonal/editPersonal"
				})
			},

			uniGetPrivider() {
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
			}
		}

	}
</script>

<style scoped>
	/* 签到样式  start*/
	.u-demo-wrap {
		padding: 40upx 20upx;
	}

	.saveBtn {
		width: 80%;
		margin: 0 auto 20upx auto;
	}

	.u-steps>.u-steps-item:nth-of-type(5) .u-steps-item-num {
		width: 60upx !important;
		height: 60upx !important;
	}


	/* 一键登录样式 start*/
	.botomRegister {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		z-index: 99;
	}

	.RegisterBox {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 780upx;
		border-radius: 30upx 30upx 0 0;
		background-color: #FFFFFF;
		z-index: 99;
	}

	.RegisterHeader {
		display: flex;
		flex-direction: row;
		line-height: 50upx;
		align-items: center;
		justify-content: flex-start;
		color: #000000;
		padding: 20upx 20upx 0 20upx;
		box-sizing: border-box;
	}

	.RegisterHeader>.icon {
		font-size: 40upx;
		margin-right: 10upx;
	}

	.RegisterHeader>uni-view:nth-of-type(2) {
		font-size: 30upx;
		letter-spacing: 4upx;
	}

	.RegisterContent {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		margin-top: 60upx;
	}

	.btnBg {
		width: 80%;
		margin-left: 10%;
		text-align: center;
		margin-top: 20upx;
		height: 100%;
		font-size: 36upx;
		background-color: #FF3000;
		border-radius: 80upx;
		box-sizing: border-box;
		color: #FFFFFF;
	}

	.botomRegister .change {
		width: 100%;
		text-align: center;
		margin: 20upx 0;
		margin-bottom: 0;
		color: #FF3000;
		font-size: 36upx;
	}

	.iconList {
		position: absolute;
		bottom: 140upx;
		left: 0;
		width: 90%;
		margin-left: 5%;
	}

	.iconList>.list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10upx;
		width: 100%;
		height: 100%;
	}

	.iconList>.list>.image {
		width: 80upx;
	}

	uni-image {
		display: block;
		width: 100%;
	}


	.weixing {
		width: 100%;
	}

	.weixing>.lineWrap {
		width: 100%;
		line-height: 20upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.weixing>.lineWrap>.line {
		height: 4upx;
		width: 30%;
		background-color: #EDEDED;
	}

	.weixing>.lineWrap>view:nth-of-type(2) {
		margin: 0 20upx;
		font-size: 34upx;
		width: 40%;
		text-align: center;
	}


	.exitList {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		line-height: 100upx;
	}

	.exitList-item {
		width: 100upx;
		height: 100upx;
		line-height: 50upx;
		margin: 0 20upx;
		text-align: center;
		font-size: 46upx;
		border-radius: 50%;
		padding: 20upx;
		box-sizing: border-box;
		border: 1px solid #98bcd6;
	}

	/* 微信颜色 */
	.more-share-wx {
		color: #2AD19B;
	}

	.more-share-qq {
		color: #4A73BA;
	}

	.more-share-wb {
		color: #EE5E5E;
	}

	.iosLogin {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20upx;
	}

	.sign-in-with-apple {
		width: 350upx;
		height: 76upx;
		border-radius: 20upx;
		background-color: #000000;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.iosLoginTitle {
		color: #ffffff;
		font-size: 32upx;
	}

	.iconIos {
		width: 36upx;
		height: 36upx;
		margin-right: 20upx;
	}

	.userLoginType {
		display: flex;
		width: 100%;
		margin: 10upx 0;
		margin-bottom: 40upx;
	}

	.checkLogin {
		background-color: #F5663C !important;
		color: white !important;
	}

	.userLoginType .loginView {
		width: 33%;
		padding: 20upx 0;
		text-align: center;
		color: #F5663C;
		border: solid #F5663C 1px;
	}

	.Registerbottom {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 40upx;
		left: 0;
		width: 100%;
		text-align: center;
		font-size: 36upx;
	}

	.Registerbottom>uni-view:nth-of-type(1) {
		font-size: 34upx;
	}

	.Registerbottom>uni-view:nth-of-type(2) {
		font-size: 34upx;
		color: #0A98D5;
		text-decoration: underline;
	}

	.noPhone {
		display: flex;
		align-items: center;
	}
	



	.titImageList {
		width: 100%;
	}

	.titImageList>.titImage {
		display: flex;
		justify-content: space-between;
		width: 80%;
		margin-left: 10%;
	}

	.titImageList>.titRegister {
		display: flex;
		justify-content: center;
		background: url('../../static/me/baRed.jpg') center center no-repeat;
		width: 70%;
		margin-bottom: 10upx;
		margin-left: 15%;
		height: 70upx;
		letter-spacing: 2upx;
		font-size: 36upx;
		font-family: '微软雅黑';
		color: #FFFFFF;
		font-weight: bold;
		line-height: 70upx;
		border-radius: 100upx;
	}
	.loginPwd{
		text-align: right;
		padding:20upx 100upx;
		color:#FF3000;
	}
	.loginPwd .text{
		text-decoration: underline;
	}
	.icon_img {
		width: 50upx;
		height: 50upx;
	}

	.meContent {
		width: 750upx;
		height: 100vh;
	}

	.headImg {
		width: 100%;
		height: 300upx;
		position: sticky;
		top: 0;
		z-index: 1;
		background: url(@/static/me/version/meShow2.gif) no-repeat 100%;
		background-size: cover;
	}

	.meBody {
		position: sticky;
		top: 0;
		background-color: white;
		z-index: 3;
		width: 100%;
	}

	.mePeople {
		width: 100%;
		padding: 0 10upx;
		display: flex;
		height: 110upx;
		position: relative;
	}

	.peoImgDiv {
		width: 120upx;
		height: 120upx;
		position: relative;
		margin-right: 15upx;
	}

	.peoImgDiv .peoImg {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		position: absolute;
		top: -60upx;
	}

	.peoNameDiv {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.peoName {
		font-size: 36upx;
		display: flex;
		align-items: center;
	}

	.editMeImg {
		width: 26upx;
		height: 26upx;
	}

	.peoNum {
		font-size: 28upx;
	}

	.peoCollect {
		border: #fc4353 2px solid;
		height: 70upx;
		text-align: center;
		line-height: 64upx;
		font-size: 32upx;
		border-radius: 18upx;
		margin-top: 10upx;
		padding: 0 30upx;
		margin-right: 15upx;
	}

	.reqAwh {
		position: relative;
		padding: 0 25upx;
		font-size: 32upx;
		font-family: 楷体;
		height: 150upx;
		line-height: 44upx;
		letter-spacing: 1upx;
	}

	.reqAwhBtn {
		position: absolute;
		right: 25upx;
		background-color: #e80000;
		color: white;
		font-size: 32upx;
		line-height: 60upx;
		bottom: 0;
		height: 60upx;
		padding: 0 15upx;
		border-radius: 15upx;
	}

	.iconFather {
		padding: 0 25upx;
	}

	.grid-text {
		font-size: 28upx;
		margin-top: 10upx;
	}

	.shareImgDiv {
		width: 100%;
		height: 150upx;
		margin: 15upx 0;
	}

	.shareImg {
		width: 100%;
		height: 100%;
	}

	.lastDiv {
		width: 100%;
		padding: 0 25upx;
		margin-top: 25upx;
	}

	.iconTitle {
		font-weight: 550;
		font-size: 36upx;
		margin-bottom: 10upx;
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

	.version {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(90, 90, 90, .5);
		z-index: 200;
	}

	.version-wrap {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 600upx;
		height: 680upx;
	}

	.version-img {
		width: 600upx;
		height: 400upx;
		background-image: url('@/static/me/version/version.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.version-tit {
		width: 100%;
		padding: 20upx 0;
		padding-left: 20upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.version-content {
		width: 100%;
		display: flex;
		background-color: #fff;
		flex-direction: row;
	}

	.version-contentLeft {
		flex: 1;
		padding-left: 20upx;
		box-sizing: border-box;
		text-align: justify;
		text-justify: inter-word;
		font-size: 28upx;
	}

	.version-contentRight {
		flex: 1;
	}

	.version-bottom {
		width: 100%;
		height: 120upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.version-bottom .btn button {
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
</style>
