<template>
	<view class="page" :style="{height: (swiperheight)  + 'px',overflow:'hidden' }">
		<view class="icon iconfont icon-zuojiantou"></view>
		<view class="titHeader">
			<!-- <image src="../../../static/register/titHeader.png" class="titHeaderImage"> -->
		</view>
		<view class="icon iconfont icon-zuojiantou headerLrft" @click="headerLrft"></view>
		<view class="content">
			<view class="contentBox">
				<!-- <view class="navbar">
					<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
					 @click="tabClick(index)">
						{{item.text}}
					</view>
				</view> -->
				<view class="list" v-if="tabCurrentIndex == 0 || tabCurrentIndex == 1 || tabCurrentIndex == 2">
					<view class="listItem">
						<view class="registerPhone">
							<image src="../../../static/register/registerPeple.png" mode="widthFix"></image>
						</view>
						<view class="uni-form-item uni-column">
							<picker @change="bindPickerChange" :range="rangeList">
								<label class="">{{chooesRange}}</label>
							</picker>
						</view>
						<view class="icon iconfont icon-xiala" style="color: white;"></view>
						<view class="line"></view>
						<view class="inputs">
							<input type="text" v-model="userInfo.account" style="color: #FFFFFF;"  placeholder="請輸入手机号" />
						</view>
					</view>
					<view class="listItem">
						<view class="registerPhone">
							<image src="../../../static/register/registerSock.png" mode="widthFix"></image>
						</view>
						<view class="registerEye" @click="showPassword">
							<image :src="seen?'../../../static/register/registerEye.png':'../../../static/register/registerOpenEye.png'" mode="widthFix"></image>
						</view>
						<view class="line"></view>
						<view class="inputs">
							<input class="spliceInput" style="color: #FFFFFF;"  :type="seen ? type_text : type_password" v-model="userInfo.password" placeholder="請輸入密碼" />
						</view>
					</view>
					<view class="reisterBtn" @tap="registerEnter()" :class="activeClass == true?'reisterBtnActive':''">登陸</view>
					<view class="twoA">
						<view class="lft">
							<view class="circle" style="margin-right: 20upx;"></view>
							<view style="color: #FFFFFF;" @tap="toNewUser()">註冊</view>
						</view>
						<view class="lfr">
							<view style="color: #FFFFFF;" @tap="toForgetPassword()">忘記密碼</view>
							<view class="circle"  style="margin-left: 20upx;"></view>
						</view>
						<!-- <a href="javascript:;">註冊</a>
						<a href="javascript:;">忘記密碼?</a> -->
					</view>
					<radio-group name="radio" style="margin-top: 20upx;">
						<label class="labelBox">
							<radio color="#DA3136" value="radio" :checked="checked"  @click="checkBox()"/>
							<view style="color: red;margin-top: 6upx;">请仔细阅读并同意  <a @tap="toXieyi" style="margin-left: 20upx;text-decoration: none;" href="javascipt:;"><服務協議></a></view>
						</label>
					</radio-group>
					<!-- <view class="xieYi">请仔细阅读并同意协议</view> -->
					<!-- <view class="iconList">
						<view class="tit">
							<view class="Leftline"></view>
							<view class="text">第三方登录</view>
							<view class="rightLine"></view>
						</view>
						<view class="list">
							<view class="weixing">
								<view class="exitList">
									<block v-for="(item, index) in iconsList" :key="index">
										<view class="icon iconfont exitList-item" :class="item.icon + ' ' + item.bgColor" @click="thirdPartyLogin(item.name)"></view>
									</block>
								</view>
								<view class="iosLogin" v-if=" platform=='ios'" style="margin-bottom: 20upx;">
									<view class="sign-in-with-apple" v-if=" platform=='ios'"  @click="appleLogin">
										<image class="iconIos" src="../../../static/me/register/icon_ios.png" mode=""></image>
										<text class="iosLoginTitle">通過Apple登錄</text>
									</view>
								</view>
							</view>
						</view>
					</view> -->
					<!-- <radio-group name="radio" style="margin-top: 20upx;">
						<label class="labelBox">
							<radio color="#DA3136" value="radio" :checked="checked"  @click="checkBox()"/>
							<view style="color: red;margin-top: 6upx;"@click="toXieyi">登錄即同意協議  <a style="margin-left: 20upx;text-decoration: none;" href="javascipt:;"><服務協議></a></view>
						</label>
					</radio-group> -->
				</view>
			</view>
		</view>
		<u-toast ref="msgToast" />
	</view>
</template>

<script>
	const pluginMobShare = uni.requireNativePlugin('mob-sharesdk');
	export default {
		data() {
			return {
				system: '', // 系统版本
				platform: '', // 平台
				iconsList: [], //登录列表数组
				userInfo: {
					account: "",
					password: ""
				},
				radio: 1,
				checked: false,
				activeClass: false,
				rangeList: ['+86', '+852', '+853'],
				requestRangeList: ['0086', '00852', '00853'],
				chooesRange: '+86',
				rangeIndex: 0,
				loginClass: 0,
				swiperheight: 0,
				tabCurrentIndex: 0,
				navList: [{
						id: 0,
						text: '個人用戶'
					},
					{
						id: 1,
						text: '商家'
					},
					{
						id: 2,
						text: '自媒體'
					}
				],
				seen: false,
				type_text: "text",
				type_password: "password",
				data: {
					usrId: '', //用户id
					usrIntegral: "", //用户积分
					usrName: "", //用户名称
					srcImg: "", //用户头像
					userissign: '' //判断用户是否签到
				},
			}
		},
		onLoad() {
			this.getPageHeight(); //获取滚动页面高度
			// 先判断 系统版本
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					this.system = res.system
					this.platform = res.platform
				},
				fail: (err) => {},
				complete: () => {}
			});
			this.getLoginAuth();
			
		},
		onShow() {
			let userPhone = uni.getStorageSync('userPhone')
			console.log('手机号码',userPhone)
			this.$set(this.userInfo,'account',userPhone)
		},
		computed: {
			search() {
				return this.userInfo.account;
			}
		},
		watch: {
			search(newValue) {
				newValue === "" ? this.activeClass = false : this.activeClass = true;
			}
		},
		methods: {
			bindPickerChange(e){
				console.log(e)
				this.rangeIndex = e.target.value;
				this.chooesRange = this.rangeList[this.rangeIndex]
			},
			// 苹果登录
			appleLogin() {
				// 判断是 iOS13版本
				uni.login({
					provider: 'apple',
					success: (loginRes) => {
						console.log('这里是登录Login',loginRes)
						uni.getUserInfo({
							provider: 'apple',
							success: (infoRes) => {
								console.log('这里是ios获取登录GETUserInfo',infoRes)
								// uni.showModal({
								// 	title:'提示',
								// 	content:JSON.stringify(infoRes)
								// })
								uni.showLoading()
								var nickName = ''
								if( infoRes.userInfo.fullName.nickName){
									nickName = encodeURIComponent(infoRes.userInfo.fullName.nickName)
								}
								let formdata ={
									"action": "loginapple",
									"user": infoRes.userInfo.openId,
									"nickname":nickName,
								};
								console.log(this.serverUrl)
								uni.request({
									url: this.serverUrl,
									data: formdata,
									success: res => {
										uni.hideLoading()
										var userData = {
											usrId:res.data.usrId,//用户id
											usrIntegral:res.data.usrIntegral,//用户积分
											usrName:res.data.usrName,//用户名称
											srcImg:res.data.usrLogo,//用户头像
											userissign: '' //判断用户是否签到
										}
										uni.setStorageSync('data',res.data);
										uni.switchTab({
											url:"../me"
										})
									}
									
								});
							},
							fail: (err) => {
							}
						})
					},
					fail: (err) => {
					}
				})
			},
			//获取当前登录渠道
			getLoginAuth(){
				uni.getProvider({
					service: 'oauth',
					success: result => {
						let providerList = result.provider;
						for(var i=0;i<providerList.length;i++){
							var item = providerList[i]
							var itemObj = {}
							if(item == 'weixin'){
								itemObj.providerName = '微信登錄';
								itemObj.name='weixin'
								itemObj.icon = 'icon-weixin';
								itemObj.bgColor = 'more-share-wx';
							}else if(item == 'qq'){
								itemObj.providerName = 'QQ登陸';
								itemObj.icon = 'icon-QQ';
								itemObj.name='qq'
								itemObj.bgColor = 'more-share-qq';
								continue;  //暂时只需要微信登录
							}else if(item == 'sinaweibo'){
								itemObj.providerName = '微博登陸';
								itemObj.name='sinaweibo'
								itemObj.icon = 'icon-weibo';
								itemObj.bgColor = 'more-share-wb';
								continue; //暂时只需要微信登录
							}else{
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
			clearIcon: function() {
			    this.phoneCode = '';
			    this.showClearIcon = false;
			},
			clearInput: function(event) {
			    this.phoneCode = event.detail.value;
			    if (event.detail.value.length > 0) {
			        this.showClearIcon = true;
			    } else {
			        this.showClearIcon = false;
			    }
			},
			// backHome() {
			// 	uni.navigateBack({
			// 		delta:1,
			// 	})
			// },
			headerLrft(){
				uni.switchTab({
					url:'../me'
				})
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
							console.log('登录我们自己的平台',res.data)
							uni.hideLoading()
							var userData = {
								usrType:res.data.usrType,//用户类型
								usrId:res.data.usrId,//用户id
								usrIntegral:res.data.usrIntegral,//用户积分
								usrName:res.data.usrName,//用户名称
								srcImg:res.data.usrLogo,//用户头像
								userissign: '' //判断用户是否签到
							}
							uni.setStorageSync('data',res.data);
							uni.switchTab({
								url: "../me"
							})
						},
						fail: (error) => {
							console.log('这是登录我们自己平台的错误回调', error)
						}
			
					});
				}, error => {
					console.log("错误回调", error)
				})
			},
			
			thirdPartyLogin(index) {
				if(!this.checked){
					this.$refs.msgToast.show({
						title: '請選擇同意協議',
						type: 'primary',
						icon:false
					})
					return;
				}
				this.testWXLogin();
				return;
				if (index === '' || index === undefined || index === 'undefined') {
					uni.showToast({
						title: '参数错误，请联系管理员！',
						icon: 'none',
						duration: 3000
					});
					return false;
				} else {
					let loginType = index;
					uni.login({
						provider: loginType,
						success: res => {
							console.log('调取login的回调',res)
							var access_token = '';
							access_token = res.authResult.access_token;
							// 3 授权登录成功以后，获取用户的信息
							uni.getUserInfo({
								provider: loginType,
								success: (infoRes) => {
									console.log('获取用户信息的回调',infoRes)
									uni.showLoading({
										title:'加载中'
									})
									let formdata ={
										"action": "loginwechat",
										"openid": encodeURIComponent(infoRes.userInfo.openId),
										"nickname": encodeURIComponent(infoRes.userInfo.nickName),
										"headimgurl": encodeURIComponent(infoRes.userInfo.avatarUrl)
									};
									console.log(this.serverUrl)
									uni.request({
										url: this.serverUrl,
										data: formdata,
										success: res => {
											console.log('登录我们自己的平台',res.data)
											uni.hideLoading()
											var userData = {
												usrType:res.data.usrType,//用户类型
												usrId:res.data.usrId,//用户id
												usrIntegral:res.data.usrIntegral,//用户积分
												usrName:res.data.usrName,//用户名称
												srcImg:res.data.usrLogo,//用户头像
												userissign: '' //判断用户是否签到
											}
											uni.setStorageSync('data',res.data);
											uni.switchTab({
												url: "../me"
											})
										},
										fail:(error) => {
											console.log('这是登录我们自己平台的错误回调',error)
										}
										
									});
								},
								fail:(error) => {
									console.log('这是微信那边过来的错误回调',error)
								}
							});
						},
						fail: err => {
							console.log('这个是login的错误回调',err)
							uni.showToast({
								title: '请求出错啦！',
								icon: 'none',
								duration: 3000
							});
						}
					});
				}
			},
			toXieyi(){
				uni.navigateTo({
					url:'../xieYi/xieYi'
				})
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
			toNewUser() {
				uni.navigateTo({
					url: "../newUser/newUser"
				})
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
								console.log('这里是ios获取登录GETUserInfo',infoRes)
								// uni.showModal({
								// 	title:'提示',
								// 	content:JSON.stringify(infoRes)
								// })
								uni.showLoading()
								var nickName = ''
								if( infoRes.userInfo.fullName.nickName){
									nickName = encodeURIComponent(infoRes.userInfo.fullName.nickName)
								}
								let formdata ={
									"action": "loginapple",
									"user": infoRes.userInfo.openId,
									"nickname":nickName,
								};
								this.requestPost(formdata).then(res => {
									uni.hideLoading()
									var userData = {
										usrId:res.data.usrId,//用户id
										usrIntegral:res.data.usrIntegral,//用户积分
										usrName:res.data.usrName,//用户名称
										srcImg:res.data.usrLogo,//用户头像
										userissign: '' //判断用户是否签到
									}
									uni.setStorageSync('data',res.data);
									uni.switchTab({
										url:"../me"
									})
								});
							},
							fail: (err) => {
							}
						})
					},
					fail: (err) => {
					}
				})
			},
			toForgetPassword(){
				uni.navigateTo({
					url: "../forgetPassword/forgetPassword"
				})
			},
			showPassword() {
				this.seen = !this.seen;
			},
			checkBox() {
				this.checked = !this.checked;
			},
			tabClick(index) {
				this.loginClass = index;
				this.tabCurrentIndex = index;
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight;
						this.swiperheight = height;
						console.log(res.windowHeight, '高度', this.swiperheight)
					}
				});
			},
			registerEnter() {
				var me = this;
				var serverUrl = this.serverUrl;
				var phoneCode = this.requestRangeList[this.rangeIndex] + this.userInfo.account;
				var password = this.userInfo.password;
				if (phoneCode === '') {
					uni.showToast({
						title: '請輸入手機號碼',
						icon: 'none',
						duration: 2000
					});
				} else if (password === '') {
					uni.showToast({
						title: '請輸入密碼',
						icon: 'none',
						duration: 2000
					});
				} else {
					if(!this.checked){
						this.$refs.msgToast.show({
							title: '請選擇同意協議',
							type: 'primary',
							icon:false
						})
						return;
					}
					let loginAction = "login";
					if (this.loginClass == 0) {
						loginAction = 'login';
					} else if (this.loginClass == 1) {
						loginAction = 'bizlogin'
					} else if (this.loginClass == 2) {
						loginAction = 'medialogin'
					}
					this.$Httpps
						.sttp({
							"action": loginAction,
							"usrTel": phoneCode,
							"password": password
						})
						.then(res => {
							if (res.statusCode === 200) {
								if (res.data.result == 'fail') {
									uni.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 2000
									});
									return
								}
								var data = {
									usrType:res.data.usrType,
									usrCode: res.data.usrCode,
									usrId: res.data.usrId, //用户id
									usrIntegral: res.data.usrIntegral, //用户积分
									usrName: res.data.usrName, //用户名称
									srcImg: res.data.usrLogo, //用户头像
									userissign: '', //判断用户是否签到
									usrPhone: res.data.usrPhone,
									usrNo: res.data.usrNo,
									usrIntro: res.data.usrIntro
								}
								uni.setStorageSync('data', res.data);
								console.log(data, 'data120');
								
								uni.switchTab({
									url: "../me"
								})
							}
						}).catch(err => {
							console.log(err);
						});
				}
			},
			// 苹果登录
			bindPickerChange(e) {
				console.log(e)
				this.rangeIndex = e.target.value;
				this.chooesRange = this.rangeList[this.rangeIndex]
			},
		}
	}
</script>

<style scoped>
	.uni-radio-input uni-radio-input-checked{
		background-color: #ff3000!important;
	}
	.xieYi{
		width: 100%;
		text-align: center;
		color: #FFF2F9;
	}
	uni-input-input{  
		background:none;  
		outline:none;  
		border:none;
		webkit-box-shadow: 0 0 0 1000px white inset;
	}
	input:-internal-autofill-selected{
		background-color: none!important;
	}
	.page{
		width: 100%;
		height: 100%;
		background: url('../../../static/register/registerBg.jpg') center center no-repeat;
		background-size: cover;
	}
	.headerLrft{
		position: absolute;
		top: 50upx;
		left: 50upx;
		color: #FFFFFF;
		font-size: 50upx;
	}
	.labelBox{
		display: flex;
		width: 100%;
		flex-direction: row;
	}
	.iconList {
		width: 100%;
		margin-top: 40upx;
	}

	.iconList>.tit {
		display: flex;
		flex-direction: row;
		width: 100%;
		line-height: 50upx;
	}

	.iconList>.tit>.Leftline {
		width: 30%;
		height: 4upx;
		background: linear-gradient(to right, #ECECEC, #DDDDDD, #878787)
	}

	.iconList>.tit>.text {
		margin-top: -20upx;
		width: 40%;
		text-align: center;
		color: #FFFFFF;
	}

	.iconList>.tit>.rightLine {
		width: 30%;
		height: 4upx;
		background: linear-gradient(to right, #878787, #DDDDDD, #ECECEC)
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


	.formBottom {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.checkbox {
		border-radius: 50% !important;
	}

	uni-checkbox .uni-checkbox-input {
		border-radius: 50% !important;
	}

	.uni-label-pointer {
		color: red;
	}



	.reisterBtn {
		width: 100%;
		height: 120upx;
		line-height: 100upx;
		background: url('../../../static/register/btnBg.png') center center no-repeat;
		background-size: 100%;
		text-align: center;
		margin-top: 30upx;
		color: #FFFFFF;
		font-size: 40upx;
		letter-spacing: 10upx;
	}

	.twoA {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		height: 60upx;
		line-height: 60upx;
	}
	.twoA>.lft{
		width: 180upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.twoA>.lfr{
		width: 180upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
	.twoA .circle{
		display: flex;
		flex-direction: row;
		width: 20upx;
		height: 20upx;
		border-radius: 50%;
		background-color: #CCCCCC;
	}
	.twoA>a {
		color: #9E9E9E;
		text-decoration: none;
	}




	.list {
		width: 100%;
		height: 60upx;
		padding: 0 34upx;
		box-sizing: border-box;
	}

	.list>.listItem:nth-child(1) {
		margin-top: 60upx;
	}

	.list>.listItem:nth-child(2) {
		margin-top: 50upx;
	}

	.listItem {
		display: flex;
		flex-direction: row;
		width: 100%;
		line-height: 60upx;
		padding: 20upx;
		border: 2upx solid #D4D4D4;
		border-radius: 50upx;
		overflow: hidden;
		box-sizing: border-box;
	}

	.listItem .registerPhone {
		width: 64upx;
	}

	.listItem .registerEye {
		margin-top: 20upx;
		margin-left: 40upx;
		margin-right: 26upx;
		width: 70upx;
	}

	.uni-form-item {
		margin-left: 20upx;
	}

	.listItem>.line {
		width: 4upx;
		height: 40upx;
		margin-top: 14upx;
		margin-left: 10upx;
		background-color: #D4D4D4;
	}

	.listItem>.inputs {
		width: 100%;
		height: 60upx;
	}
	.listItem>.inputs>uni-view {
		width: 100%;
		height: 100%;
	}
	.spliceInput {
		width: 82%;
		height: 82%;
		border: none;
		padding-left: 33px !important;
	}

	uni-input {
		display: block;
		width: 100%;
		height: 100%;
	}

	.listItem>.inputs>input {
		padding-left: 60upx;
		box-sizing: border-box;
	}



	.content {
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 750upx;
		overflow: hidden;
	}

	.contentBox {
		width: 90%;
		padding: 20upx 50upx;
		background-color: rgba(50,58,104,.6);
		border-radius: 20upx;
	}

	.navbar {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		line-height: 50upx;
	}

	.nav-item {
		width: 20%;
		color: #FFFFFF;
		text-align: center;
		padding-bottom: 10upx;
	}

	.current {
		color: #FFFFFF;
		border-bottom: 2upx solid #FFFFFF;
	}


	.page {
		width: 100%;
		height: 100%;
		background-color: #EEEEEE;
	}

	.titHeader {
		margin-top: 120upx;
		width: 100%;
		height: 25%;
		background: url('../../../static/register/titHeader.png') center center no-repeat;
		background-size: 50%;
	}

	uni-image {
		display: block;
		width: 100%;
	}
	
	
	
	.weixing{
		width: 100%;
		margin-top: 20upx;
	}
	.weixing>.lineWrap{
		width: 100%;
		line-height: 20upx;
		margin-bottom: 20upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.weixing>.lineWrap>.line{
		height: 4upx;
		width: 30%;
		background-color: #EDEDED;
	}
	.weixing>.lineWrap>view:nth-of-type(2){
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
		margin-top: 10upx;
		line-height: 100upx;
		margin-bottom: 20upx;
		/* background-color: #fff; */
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
		/* background-color: #fff; */
		border: 1px solid #98bcd6;
	}
	/* 微信颜色 */
	.more-share-wx{
		color: #2AD19B;
	}
	.more-share-qq{
		color: #4A73BA;
	}
	.more-share-wb{
		color: #EE5E5E;
	}
	.iosLogin{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30upx;
	}
	.sign-in-with-apple{
		width: 280upx;
		height: 60upx;
		border-radius: 12upx;
		background-color: #000000;
		display: flex;
		justify-content:space-around;
		align-items: center;
	}
	.iosLoginTitle{
		color: #ffffff;
		font-size: 24upx;
	}
	
	.iconIos{
		width: 30upx;
		height: 30upx;
	}
	.userLoginType{
		display: flex;
		width: 100%;
		margin: 20upx 0;
		margin-bottom: 40upx;
	}
	.checkLogin{
		background-color: #F5663C !important;
		color: white !important;
	}
	.userLoginType .loginView{
		width: 33%;
		padding: 20upx 0;
		text-align: center;
		color: #F5663C;
		border: solid #F5663C 1px;
	}
</style>
