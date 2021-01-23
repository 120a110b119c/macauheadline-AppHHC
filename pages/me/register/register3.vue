<template>
	<view class="register">
		<view class="header">
			<view @click="backHome()" class="out">x</view>
			<view class="tit">
				<image class="logoImage" src="../../../static/openPage/logo_white.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="content">
			<view class="phone">
				<view class="icon iconfont icon-ren"></view>
				<view class="uni-form-item uni-column">
					<picker @change="bindPickerChange" :range="rangeList">
						<label class="">{{chooesRange}}</label>
					</picker>
				</view>
				<view class="icon iconfont icon-xiala"></view>
				<view class="wrapInput">
					<input class="uni-input" placeholder="請輸入手機號碼" :value="phoneCode" @input="clearInput" />
					<text class="icon iconfont icon-qingchu" v-show="showClearIcon" @click="clearIcon"></text>
				</view>
			</view>
			<view class="password">
				<view class="icon iconfont icon-yinsisuoding"></view>
				 <input class="uni-input" v-model="password" password type="text" placeholder="請輸入密碼" />
			</view>
			<view class="reisterBtn" @tap="registerEnter()" :class="activeClass == true?'reisterBtnActive':''">登陸</view>
			<view class="twoA">
				<a href="javascript:;" @click="toNewUser()">註冊</a>
				<a href="javascript:;" @click="toForgetPassword()">忘記密碼?</a>
			</view>
			<!-- <view class="userLoginType" >
				<view class=" loginView" :class="loginClass == 0?'checkLogin' : 0"  style="border-radius: 8upx 0 0 8upx;"
				@tap="changeLoginType(0)">
					用戶登錄
				</view>
				<view class=" loginView" :class="loginClass == 1?'checkLogin' : 0" @tap="changeLoginType(1)">
					商家登錄
				</view>
				<view class=" loginView" :class="loginClass == 2?'checkLogin' : 0" @tap="changeLoginType(2)" style="border-radius:0 8upx 8upx 0;">
					自媒體登錄
				</view>
			</view> -->
			<view class="weixing">
				<view class="lineWrap">
					<view class="line"></view>
					<view>第三方登錄</view>
					<view class="line"></view>
				</view>
				<view class="exitList">
					<block v-for="(item, index) in iconsList" :key="index">
						<view class="icon iconfont exitList-item" :class="item.icon + ' ' + item.bgColor" @click="thirdPartyLogin(item.name)"></view>
					</block>
				</view>
				<view class="iosLogin" v-if="system >= 13 && platform=='ios'">
					<view class="sign-in-with-apple" v-if="system >= 13 && platform=='ios'"  @click="appleLogin">
						<image class="iconIos" src="../../../static/me/register/icon_ios.png" mode=""></image>
						<text class="iosLoginTitle">通過Apple登錄</text>
					</view>
				</view>
			</view>
			
		</view>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				system: '', // 系统版本
				platform: '',   // 平台
				showClearIcon:false,
				shoClearIcon: false,
				phoneCode: '',
				password:"",
				activeClass: false,
				iconsList: [] ,//登录列表数组
				data:{
					usrId:'',//用户id
					usrIntegral:"",//用户积分
					usrName:"",//用户名称
					srcImg:"",//用户头像
					userissign: '' //判断用户是否签到
				},
				rangeList:['+86','+852','+853'],
				chooesRange:'+853',
				rangeIndex:2,
				requestRangeList:['0086','00852','00853'],
				loginClass:0
			}
		},
		onLoad(){
			// 先判断 系统版本
			uni.getSystemInfo({
				success: (res) => {
					this.system = res.system
					this.platform = res.platform
				},fail: (err) => {
				},complete: () => {
				}
			})
			this.getLoginAuth();
			
		},
		computed: {
			search() {
				return this.phoneCode;
			}
		},
		watch: {
			search(newValue) {
				newValue === "" ? this.activeClass = false : this.activeClass = true;
			}
		},
		methods: {
			//切換登錄角色
			changeLoginType(value){
				this.loginClass = value;
			},
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
										uni.setStorageSync('data',userData);
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
			registerEnter(){
				var me = this;
				var serverUrl = this.serverUrl;
				var phoneCode = this.requestRangeList[this.rangeIndex] + this.phoneCode;
				var password = this.password;
				if (phoneCode === '') {
					uni.showToast({
						title: '請輸入手機號碼',
						icon:'none',
						duration: 2000
					});
				} else if (password === '') {
					uni.showToast({
						title: '請輸入密碼',
						icon:'none',
						duration: 2000
					});
				} else {
					let loginAction = "login";
					if(this.loginClass == 0){
						loginAction = 'login';
					}else if(this.loginClass == 1){
						loginAction = 'bizlogin'
					}else if(this.loginClass == 2){
						loginAction = 'medialogin'
					}
					this.$Httpps
						.sttp({
							"action": loginAction,
							"usrTel": phoneCode,
							"password": password
						})
						.then(res => {
							if( res.statusCode === 200 ){
								if(res.data.result == 'fail'){
									uni.showToast({
										title: res.data.msg,
										icon:'none',
										duration: 2000
									});
									return
								}

								var data = {
									usrCode:res.data.usrCode,
									usrId:res.data.usrId,//用户id
									usrIntegral:res.data.usrIntegral,//用户积分
									usrName:res.data.usrName,//用户名称
									srcImg:res.data.usrLogo,//用户头像
									userissign: '' ,//判断用户是否签到
									usrPhone:res.data.usrPhone,
									usrNo:res.data.usrNo,
									usrIntro:res.data.usrIntro
								}
								uni.setStorageSync('data',data);
								console.log(data,'data120');
								if(loginAction == 'bizlogin'){
									uni.navigateTo({
										url: '../../storePage/index?data='+encodeURIComponent(JSON.stringify(data))
									});
								}else{
									uni.switchTab({
										url:"../me"
									})
								}
							}
							
						}).catch(err => {
							console.log(err);
					});
				}
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
			backHome() {
				uni.navigateBack({
					delta:1
				})
			},
			thirdPartyLogin(index) {
				if (index === '' || index === undefined || index === 'undefined') {
					uni.showToast({
						title: '参数错误，请联系管理员！',
						icon: 'none',
						duration: 3000
					});
					return false;
				} else {
					let loginType = index;
					console.log('去到微信拿回调')
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
											console.log('登录我们自己的平台',res)
											uni.hideLoading()
											var userData = {
												usrId:res.data.usrId,//用户id
												usrIntegral:res.data.usrIntegral,//用户积分
												usrName:res.data.usrName,//用户名称
												srcImg:res.data.usrLogo,//用户头像
												userissign: '' //判断用户是否签到
											}
											uni.setStorageSync('data',userData);
											uni.switchTab({
												url:"../me"
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
			async share(e) {
				console.log('分享通道:' + e.id + '； 分享类型:' + this.shareType);
				if (!this.shareText && (this.shareType === 1 || this.shareType === 0)) {
					uni.showModal({
						content: '分享内容不能为空',
						showCancel: false
					})
					return;
				}
			
				if (!this.image && (this.shareType === 2 || this.shareType === 0)) {
					uni.showModal({
						content: '分享图片不能为空',
						showCancel: false
					})
					return;
				}
				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession',
					type: this.shareType,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '已分享',
							showCancel: false
						})
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: e.errMsg,
							showCancel: false
						})
					},
					complete: function() {
						console.log('分享操作结束!')
					}
				}
			
				switch (this.shareType) {
					case 0:
						shareOPtions.summary = this.shareText;
						shareOPtions.imageUrl = this.image;
						shareOPtions.title = '欢迎体验uniapp';
						shareOPtions.href = 'https://uniapp.dcloud.io';
						break;
					case 1:
						shareOPtions.summary = this.shareText;
						break;
					case 2:
						shareOPtions.imageUrl = this.image;
						break;
					case 5:
						shareOPtions.imageUrl = this.image ? this.image :
							'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
						shareOPtions.title = '欢迎体验uniapp';
						shareOPtions.miniProgram = {
							id: 'gh_33446d7f7a26',
							path: '/pages/tabBar/component/component',
							webUrl: 'https://uniapp.dcloud.io',
							type: 0
						};
						break;
					default:
						break;
				}
			
				if (shareOPtions.type === 0 && plus.os.name === 'iOS') { //如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				if (shareOPtions.type === 1 && shareOPtions.provider === 'qq') { //如果是分享文字到qq，则必须加上href和title
					shareOPtions.href = 'https://uniapp.dcloud.io';
					shareOPtions.title = '欢迎体验uniapp';
				}
				uni.share(shareOPtions);
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed', 'original'],
					success: (res) => {
						this.image = res.tempFilePaths[0];
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			compress() { //压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log('开始压缩');
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => { // 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if (file.size > 20480) { // 压缩后size 大于20Kb
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
										content: '分享图片太大,需要请重新选择图片!',
										showCancel: false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content: '分享图片太大,需要请重新选择图片!',
							showCancel: false
						})
					});
				})
			},
			toNewUser(){
				uni.navigateTo({
					url:"../newUser/newUser"
				})
			},
			toForgetPassword(){
				uni.navigateTo({
					url:"../forgetPassword/forgetPassword"
				})
			}
		}
	}
</script>

<style scoped>
.header{
	width: 100%;
	height: 400upx;
	background-color: #F5663C;
}
.header>.out{
	padding-top: 80upx;
	padding-left: 50upx;
	color: #FFFFFF;
}
.header>.tit{
	color: #FFFFFF;
	padding-top: 100upx;
	font-size: 80upx;
	text-align: center;
	letter-spacing: 4upx;
}
.logoImage{
	width: 400upx;
}
/* content */
.content{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 40upx 50upx;
	height: 100%;
	box-sizing: border-box;
}
.content>.phone,
.content>.password{
	width: 100%;
	height: 100upx;
	padding-left: 40upx;
	line-height: 100upx;
	background-color: #F2F5FA;
	border-radius: 80upx;
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
}
.content>.password{
	margin-top: 30upx;
}
.content>.reisterBtn{
	width: 90%;
	height: 100upx;
	line-height: 100upx;
	background-color: #D6D8D7;
	border-radius: 80upx;
	text-align: center;
	margin-top: 60upx;
	color: #ACACAC;
}
.reisterBtnActive{
	background-color: #F5663C!important;
	color: #FFFFFF!important;
}
.content>.phone>.icon{
	font-size: 40upx;
	margin-right: 40upx;
}
.content>.phone>.wrapInput,.uni-input{
	width: 100%;
	height: 100%;
}
.content>.phone>.wrapInput{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.content>.phone>.wrapInput>.icon{
	margin-right: 40upx;
}

.content>.password>.icon{
	font-size: 40upx;
}
.content>.password>.uni-input{
	margin-left: 30upx;
}

.content>.twoA{
	width: 90%;
	height: 100upx;
	margin-top: 30upx;
	padding-left: 40upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
}
.content>.twoA a{
	color: #333;
}


/* weixing */
.content>.weixing{
	width: 100%;
	margin-top: 20upx;
}
.weixing>.lineWrap{
	width: 100%;
	line-height: 20upx;
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
	margin-top: 30upx;
	line-height: 100upx;
	background-color: #fff;
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
	background-color: #fff;
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
