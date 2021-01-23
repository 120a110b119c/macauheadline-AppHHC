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
				<view class="uni-form-item uni-column">
					<picker @change="bindPickerChange" :range="range">
						<label class="">{{jg}}</label>
					</picker>
				</view>
				<view class="icon iconfont icon-xiala"></view>
				<view class="wrapInput">
					<input class="uni-input" placeholder="請輸入手機號碼" :value="phoneNumber" @blur='phoneNumBlur'  @input="clearInput" />
					<text class="icon iconfont icon-qingchu" v-show="showClearIcon" @click="clearIcon"></text>
				</view>
			</view>
			<view class="getCode">
				<view class="icon iconfont icon-dagou"></view>
				 <input class="uni-input" v-model="phoneCode" type="text" placeholder="請輸入驗證碼" />
				 <view class="code"  @tap="getRegPhoneCode()">{{clickGetCode}}</view>
			</view>
			<view class="password">
				<view class="icon iconfont icon-yinsisuoding"></view>
				 <input class="uni-input" v-model="password" password type="text" placeholder="請輸入最少六位密碼" />
			</view>
			<view class="password">
				<view class="icon iconfont icon-yinsisuoding"></view>
				 <input class="uni-input" v-model="OkPassword" password type="text" placeholder="請再次輸入密碼" />
			</view>
			<view class="password">
				<view class="icon iconfont icon-wode"></view>
				 <input class="uni-input" v-model="invite" type="text" placeholder="邀請碼(選填)" />
			</view>
			<view class="userLoginType" >
				<view class=" loginView" :class="loginClass == 0?'checkLogin' : 0"  style="border-radius: 8upx 0 0 8upx;"
				@tap="changeLoginType(0)">
					用戶注册
				</view>
				<view class=" loginView" :class="loginClass == 1?'checkLogin' : 0" @tap="changeLoginType(1)">
					商家注册
				</view>
				<view class=" loginView" :class="loginClass == 2?'checkLogin' : 0" @tap="changeLoginType(2)" style="border-radius:0 8upx 8upx 0;">
					自媒體注册
				</view>
			</view>
			<view class="reisterBtn" @tap="registerEnter()" >註冊</view>
			<view class="words">
				登陸或註冊即同意澳門頭條<view class="userWords" @click="toXieYi()">用戶服務協議</view>
			</view>
		</view>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	import { testPhoneNum } from '../../../utils/index.js'
	export default {
		data() {
			return {
				phoneCode:"",
				clickGetCode:"獲取驗證碼",
				showClearIcon:false,
				shoClearIcon: false,
				phoneNumber: '',
				password:"",
				invite:"",
				OkPassword:"",
				activeClass: false,
				data:{
					usrId:'',//用户id
					usrIntegral:"",//用户积分
					usrName:"",//用户名称
					srcImg:"",//用户头像
					userissign: '' //判断用户是否签到
				},
				fromErr:false,
				range:['+86','+852','+853'],
				rangeIndex:2,
				jg:'+853',
				requestRangeList:['0086','00852','00853'],
				loginClass:0


			}
		},
		components:{
			
		},
		computed: {
			search() {
				return this.inputClearValue;
			}
		},
		watch: {
			search(newValue) {
				console.log(newValue,'990');
				newValue === "" ? this.activeClass = false : this.activeClass = true;
			}
		},
		methods: {
			//切換登錄角色
			changeLoginType(value){
				this.loginClass = value;
			},
			bindPickerChange(e){
				this.rangeIndex = e.target.value;
				this.jg = this.range[this.rangeIndex];
				console.log(this.rangeIndex)
			},
			getRegPhoneCode() {
				if (this.clickGetCode !== "獲取驗證碼") {
					return
				} else if (this.phoneNumber === '') {
					uni.showToast({
						title: '請輸入手機號碼',
						icon:'none',
						duration: 2000
					})
				} else {
					let second = 59; //初始化
					let millisecond = 0; //毫秒
					const that = this;
					let timer = null;
					let phone = this.requestRangeList[this.rangeIndex]+this.phoneNumber;
					timer = setInterval(() => {
						millisecond = millisecond + 50;
						if (millisecond >= 1000) {
							millisecond = 0;
							second = second - 1;
						}
						if (second <= 0) {
							this.clickGetCode = "獲取驗證碼";
							clearInterval(timer);
						} else {
							this.clickGetCode = second + "秒后再次獲取";
						}
					}, 50);
					// 发送手机短信验证码 
					this.$Httpps
						.sttp({
							"action": "getsmscodeforbind", 
							"userTel": phone
						})
						.then(res => {
							console.log(res, '770110');
						}).catch(err => {
							console.log(err);
					});
				}
			},
			phoneNumBlur(event){
			},
			clearIcon(){
				this.phoneNumber = ""
			},
			clearInput(event) {
			    this.phoneNumber = event.detail.value;
			    if (event.detail.value.length > 0) {
			        this.showClearIcon = true;
			    } else {
			        this.showClearIcon = false;
			    }
			},
			backHome() {
				uni.switchTab({
					url:"../me"
				})
			},
			registerEnter() {
				if (this.phoneNumber === '') {
					uni.showToast({
						title: '請輸入手機號碼！',
						duration: 2000,
						icon:'none'
					});
				} else if (this.phoneCode === '') {
					uni.showToast({
						icon:'none',
						title: '請輸入手機短信驗證碼！',
						duration: 2000
					});
				} else if (this.password === '') {
					uni.showToast({
						icon:'none',
						title: '請輸入密碼！',
						duration: 2000
					});
				} else if (this.password != this.OkPassword) {
					uni.showToast({
						icon:'none',
						title: '請保證兩次輸入的密碼一致！',
						duration: 2000
					});
				} else {
					let phone = this.requestRangeList[this.rangeIndex]+this.phoneNumber;
					console.log(this.data.userName,'name');
					// 用户注册 
					let loginAction = "reg";
					if(this.loginClass == 0){
						loginAction = 'reg';
					}else if(this.loginClass == 1){
						loginAction = 'bizreg'
					}else if(this.loginClass == 2){
						loginAction = 'mediareg'
					}
					this.$Httpps
						.sttp({
							"action": loginAction,
							"usrname":phone,
							"usrTel": phone, //手机号码     
							"smscode": this.phoneCode, //短信验证码     
							"usrPwd": this.password, //密码
							"code":this.invite//邀请码
						})
						.then(res => {
							if(res.data.result == 'suc'){
								uni.setStorageSync('userPhone',this.phoneNumber)
								uni.navigateTo({
									url:'../register/register'
								})
							}else{
								uni.showToast({
									title: res.data.msg,
									icon:'none',
									duration: 2000
								});
							}
						}).catch(err => {
							console.log(err);
					});
				}
			},
			toXieYi(){
				uni.navigateTo({
					url:'../xieYi/xieYi'
				})
			}
		}
	}
</script>

<style scoped>
.header{
	width: 100%;
	height: 320upx;
	background-color: #F5663C;
}
.header>.out{
	padding-top: 80upx;
	padding-left: 50upx;
	color: #FFFFFF;
	position: fixed;
}
.header>.tit{
	color: #FFFFFF;
	padding-top: 180upx;
	font-size: 80upx;
	text-align: center;
	letter-spacing: 4upx;
}
.logoImage{
	width: 400upx;
}

.fromClassErr{
	font-size: 24upx;
	padding-left: 40upx;
	color: red;
	width: 100%;
	line-height: 24upx;
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
.content>.password,
.content>.getCode{
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
.content>.password,
.content>.getCode{
	margin-top: 30upx;
}
.content>.reisterBtn{
	width: 90%;
	height: 100upx;
	line-height: 100upx;
	background-color: #F5663C;
	border-radius: 80upx;
	text-align: center;
	margin-top: 30upx;
	color: #fff;
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
.content>.getCode>.uni-input{
	margin-left: 30upx;
	width: 320upx;
}
.content>.getCode>.code{
	font-size: 32upx;
}

/* words */
.words{
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	color: #949494;
	margin-top: 30upx;
}
.words>.userWords{
	color: #999999;
	font-weight: bold;
}
.userLoginType{
	display: flex;
	width: 100%;
	margin: 20upx 0;
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
