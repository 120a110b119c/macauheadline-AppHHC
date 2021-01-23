<template>
	<view class="page" :style="{height: (swiperheight)  + 'px',overflow:'hidden' }">
		<view class="titleIcon">
			<view class="icon iconfont icon-zuojiantou" @tap="toMe"></view>
		</view>
		<view class="titHeader"></view>
		<view class="list">
			<view class="listItem">
				<view class="uni-form-item uni-column">
					<picker @change="bindPickerChange" :range="rangeList">
						<label class="">{{chooesRange}}</label>
					</picker>
				</view>
				<view class="icon iconfont icon-xiala" style="color: #FFFFFF;"></view>
				<view class="line"></view>
				<view class="inputs">
					<input type="text" v-model="userInfo.telPhone" style="color: #FFFFFF;"  placeholder="請輸入手机号" />
				</view>
			</view>
			<view class="listItem">
				<view class="password">
					<input type="text" v-model="userInfo.code" style="color: #FFFFFF;"  placeholder="請輸入驗證碼" />
				</view>
				<view class="getBtn"  @tap="getRegPhoneCode()">
					{{clickGetCode}}
				</view>
			</view>
			<view class="listItem" style="margin-top: 50upx;">
				<view class="password">
					<input type="text" v-model="userInfo.inviteCode" style="color: #FFFFFF;"  placeholder="邀請碼(選填)" />
				</view>
			</view>
			<view class="loginNow" @click="registerEnter()">立即註冊</view>
			<radio-group class="group" name="radio" style="margin: 30upx 0;">
				<label class="labelBox" style="width: 60upx;">
					<radio color="#DA3136" value="radio" :checked="checked"  @tap="checkBox()"/>
				</label>
				<view style="color: #FFFFFF;margin-top: 6upx;">請仔細閱讀並同意  <a style="margin-left: 20upx;text-decoration: none;color: #569ad7;" href="javascipt:;" @tap="toXieyi"><<服務協議>></a></view>
			</radio-group>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				clickGetCode:'獲取驗證碼',
				checked: false,
				rangeList: ['+86', '+852', '+853'],
				requestRangeList: ['0086', '00852', '00853'],
				chooesRange: '+853',
				rangeIndex: 2,
				swiperheight: 0,
				userInfo: {
					telPhone: "",
					code: "",
					inviteCode:''
				},
			}
		},
		onLoad() {
			this.getPageHeight(); //获取滚动页面高度
		},
		methods:{
			//立即注册
			registerEnter(){
				if (this.userInfo.telPhone === '') {
					uni.showToast({
						title: '請輸入手機號碼！',
						duration: 2000,
						icon:'none'
					});
				} else if (this.userInfo.code === '') {
					uni.showToast({
						icon:'none',
						title: '請輸入手機短信驗證碼！',
						duration: 2000
					});
				}else if(!this.checked){
					uni.showToast({
						icon:'none',
						title: '請選擇同意協議！',
						duration: 2000
					});
				}else {
					if(  this.chooesRange == "+86" ){
						this.areaNumbers = "0086"
					}else if(  this.chooesRange == "+852" ){
						this.areaNumbers = "00852"
					}else if(  this.chooesRange == "+853" ){
						this.areaNumbers = "00853"
					}
					let region = this.areaNumbers;
					let phone = region+this.userInfo.telPhone;
					this.$Httpps
						.sttp({
							"action": 'newreg',
							"userTel":phone,
							"smsCode": this.userInfo.code,
							"code":this.userInfo.inviteCode
						})
						.then(res => {
							if(res.data.result == 'suc'){
								uni.setStorageSync('data',res.data);
								//用户手机号
								uni.setStorage({
									key:'userPhoneNumber',
									data:this.userInfo.telPhone
								})
								//用户区号
								uni.setStorage({
									key:'userAreaCode',
									data: this.areaNumbers
								})
								uni.setStorageSync('usrLoginCheckCode',res.data.usrLoginCheckCode);
								uni.switchTab({
									url:'../me'
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
			//跳转注册界面
			toNewUser() {
				uni.navigateTo({
					url: "../newUser/newUser"
				})
			},
			toMe(){
				uni.switchTab({
					url:'../me'
				})
			},
			toXieyi(){
				uni.navigateTo({
					url:'../xieYi/xieYi'
				})
			},
			getRegPhoneCode() {
				if (this.clickGetCode !== "獲取驗證碼") {
					return
				} else if (this.userInfo.account === '') {
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
					if(  this.chooesRange == "+86" ){
						this.areaNumbers = "0086"
					}else if(  this.chooesRange == "+852" ){
						this.areaNumbers = "00852"
					}else if(  this.chooesRange == "+853" ){
						this.areaNumbers = "00853"
					}
					let region = this.areaNumbers;
					let number = this.userInfo.telPhone;
					console.log(number,'number110');
					let phone = region+this.userInfo.telPhone;
					uni.showLoading({})
					// 发送手机短信验证码 
					this.$Httpps
						.sttp({
							"action": "getsmscodeforbind", 
							"userTel": phone
						})
						.then(res => {
							uni.hideLoading();
							if(res.data.result != 'suc'){
								uni.showToast({
									icon:'none',
									title:res.data.msg
								})
								return
							}
							uni.showToast({
								icon:'none',
								title:'獲取驗證碼成功'
							})
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
			checkBox() {
				this.checked = !this.checked;
			},
			bindPickerChange(e){
				this.rangeIndex = e.target.value;
				this.chooesRange = this.rangeList[this.rangeIndex]
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight;
						this.swiperheight = height;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.group{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.uni-radio-input{
		width: 30upx!important;
		height: 30upx!important;
		border-radius: 50%!important;
	}
	/* 返回按钮样式 start */
	.titleIcon{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		top: 60upx;
		left: 0;
		width: 100%;
		margin-top: 20upx;
		color: #FFFFFF;
	}
	.titleIcon>uni-view:nth-of-type(2){
		margin-right: 20upx;
		letter-spacing: 4upx;
	}
	.icon-zuojiantou{
		font-size: 60upx;
	}
	/* 返回按钮样式 end */
	.input-placeholder{
		color: #FFFFFF;
	}
	.page{
		width: 100%;
		height: 100%;
		background: url('../../../static/register/registerBg.jpg') center center no-repeat;
		background-size: cover;
	}
	.titHeader {
		margin-top: 120upx;
		width: 100%;
		height: 25%;
		background: url('../../../static/register/titHeader.png') center center no-repeat;
		background-size: 50%;
	}
	.list {
		margin: 0 20upx;
		margin-top: 40upx;
		padding: 60upx;
		padding-bottom: 30upx;
		border-radius: 50upx;
		box-sizing: border-box;
		background-color: rgba(50,58,104,.6);
	}

	
	.list>.listItem:nth-child(2) {
		margin-top: 50upx;
	}
	
	.listItem {
		position: relative;
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
	.listItem .registerPhone image{
		display: block;
		width: 100%;
		height: 100%;
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
	.listItem>.password{
		width: 65%;
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
	.listItem>.password>input {
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.listItem .registerPhone{
	    width: 64upx;
	}
	.getBtn{
		position: absolute;
		right: 0;
		top: 0;
		padding: 0 20upx;
		width: 300upx;
		height: 100upx;
		line-height: 100upx;
		background-color: #FFFFFF;
		text-align: center;
		border-radius: 50upx 0 0 50upx;
		color: #FF3000;
		font-size: 30upx;
	}
	.uni-label-pointer{
		color: #FFFFFF;
	}
	/* 立即登录 */
	.loginNow{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 50upx;
		width: 100%;
		height: 100upx;
		font-size: 38upx;
		background-color: #FF3000;
		border-radius: 50upx;
		color: #FFFFFF;
		letter-spacing: 6upx;
	}
	.labelBox{
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: center;
	}
</style>
