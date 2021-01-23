<template>
	<view class="register">
		<custom-cover></custom-cover>
		<header-top></header-top>
		<!-- <view class="header">
			<view class="tit">
				<image class="logoImage" src="../../../static/openPage/logo_red.png" mode="widthFix"></image>
			</view>
		</view> -->
		<view class="navTitle">請填寫手機號碼、驗證碼以及新密碼完成新密碼設置</view>
		<view class="content">
			<view class="phone">
				<view class="uni-form-item uni-column">
					<picker @change="bindPickerChange" :range="range">
						<label class="">{{jg}}</label>
					</picker>
				</view>
				<view class="icon iconfont icon-xiala"></view>
				<view class="wrapInput">
					<input class="uni-input" placeholder="請輸入已綁定的手機號碼" :value="phoneNumber" @input="clearInput" />
					<text class="icon iconfont icon-qingchu" v-show="showClearIcon" @click="clearIcon"></text>
				</view>
			</view>
			<view class="password">
				 <input class="uni-input" v-model="receiveCode" type="text" placeholder="請輸入驗證碼" />
			</view>
			<view class="getCode">
				 <view  @tap="getRegPhoneCode()">{{clickGetCode}}</view>
			</view>
			<view class="password">
				 <input class="uni-input" v-model="password" password type="text" placeholder="請輸入新密碼(至少6位)" />
			</view>
			<view class="password">
				 <input class="uni-input" v-model="passwordAgain" password type="text" placeholder="請再次輸入密碼" />
			</view>
			<view class="reisterBtn" @tap="registerEnter()">重置密碼</view>
		</view>
		<view class="words">
			*如果未收到驗證碼,可發送郵件到macauheadline@hotmail.com給我們
		</view>
	</view>
</template>

<script>
	import headerTop from '../../../components/headerTop/headerTop.vue'
	export default {
		data() {
			return {
				showClearIcon:false,
				shoClearIcon: false,
				phoneNumber: '',//手机号码
				password:"",//新密码
				passwordAgain:'',
				clickGetCode:"獲取驗證碼",
				receiveCode:"",//输入的验证码
				range:['+86','+852','+853'],
				rangeIndex:0,
				jg:'+853',
				areaNumbers:0
			}
		},
		onShow(){
			this.phoneNumber = uni.getStorageSync('userPhone')
		},
		components:{
			headerTop
		},
		methods: {
			bindPickerChange(e){
				this.rangeIndex = e.target.value;
				this.jg = this.range[this.rangeIndex];
			},
			clearIcon: function() {
			    this.phoneNumber = '';
			    this.showClearIcon = false;
			},
			clearInput: function(event) {
			    this.phoneNumber = event.detail.value;
			    if (event.detail.value.length > 0) {
			        this.showClearIcon = true;
			    } else {
			        this.showClearIcon = false;
			    }
			},
			getRegPhoneCode() {
				
				if (this.clickGetCode !== "獲取驗證碼") {
					return
				} else if (this.phoneNumber === '') {
					uni.showToast({
						icon:'none',
						title: '請輸入手機碼號',
						icon:'none',
						duration: 2000
					})
				} else {
					let second = 59; //初始化
					let millisecond = 0; //毫秒
					const that = this;
					let timer = null;
					if(  this.jg == "+86" ){
						this.areaNumbers = "0086"
					}else if(  this.jg == "+852" ){
						this.areaNumbers = "00852"
					}else if(  this.jg == "+853" ){
						this.areaNumbers = "00853"
					}
					let region = this.areaNumbers;
					let phone = region+this.phoneNumber;
					uni.showLoading({})
					// 发送手机短信验证码 
					this.$Httpps
						.sttp({
							"action": "getsmscode", 
							"userTel": phone
						})
						.then(res => {
							uni.hideLoading()
							if(res.data.result != 'suc'){
								console.log(res)
								uni.showToast({
									icon:'none',
									title:res.data.msg
								})
								return
							}
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
						}).catch(err => {
							uni.hideLoading()
							console.log(err);
					});
				}
			},
			registerEnter(){
				if(  this.jg == "+86" ){
					this.areaNumbers = "0086"
				}else if(  this.jg == "+852" ){
					this.areaNumbers = "00852"
				}else if(  this.jg == "+853" ){
					this.areaNumbers = "00853"
				}
				let region = this.areaNumbers;
				let phone = region+this.phoneNumber;
				if(this.password != this.passwordAgain){
					uni.showToast({
						icon:'none',
						title:'兩次密碼輸入不一致,請檢查'
					})
				}
				if(!this.receiveCode){
					uni.showToast({
						icon:'none',
						title:'验证码不能为空'
					})
				}
				if( this.password && this.receiveCode && this.phoneNumber ){
					this.$Httpps
						.sttp({
							 "action": "validsmscode",
							 "userTel": phone,     
							 "smsCode": this.receiveCode
						})
						.then(res => {
							if(res.data.result == 'suc' ){
								this.saveNewPassword(phone)				 
							}else{
								uni.showToast({
									icon:"none",
									title:res.data.msg
								})
							}
						}).catch(err => {
							console.log(err);
					});
					
					
				}
			},
			saveNewPassword(phone){
				this.$Httpps
					.sttp({
						 "action": "resetpassword",
						 "usrTel": phone,     
						 "usrPwd": this.password
					})
					.then(res => {
						if(res.data.result == 'suc' ){
							uni.setStorageSync('userPhone',this.phoneNumber)
							uni.showToast({
								icon:'none',
								title: '重置密碼成功!',
								duration: 2000
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1200)
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.msg,
								duration: 2000
							})
						}
					}).catch(err => {
						console.log(err);
				});
			},
		}
	}
</script>

<style scoped>
.header{
	width: 100%;
	height: 250upx;
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
.navTitle{
	width: 100%;
	margin-top: 250upx;
	font-size: 32upx;
	text-align: center;
	padding: 0 10upx;
	box-sizing: border-box;
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
	height: 120upx;
	padding-left: 10upx;
	line-height: 120upx;
	border-radius: 10upx;
	display: flex;
	flex-direction: row;
	border: 1upx solid #E36643;
	box-sizing: border-box;
}
.content>.password,.content>.getCode{
	margin-top: 20upx;
}
.content>.getCode{
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #EEEEEE;
}

.content>.reisterBtn{
	width: 95%;
	height: 100upx;
	line-height: 100upx;
	background-color: #F5663C;
	border-radius: 10upx;
	text-align: center;
	margin-top: 20upx;
	color: #fff;
	text-align: center;
}
.content>.phone>.icon{
	font-size: 40upx;
	margin-right: 20upx;
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
.uni-input-placeholder { 
    color:#ACACAC;
	font-size: 32upx;
}
/* words */
.words{
	position: fixed;
	bottom: 20upx;
	width: 100%;
	text-align: center;
}


</style>
