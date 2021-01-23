<template>
	<view class="page">
		<view style="height: 140upx;">
			<view class="headerTitle">
				<view class="bgColor"></view>
				<view class="nav">
					<view class="myIcon" @tap="toHome()">
						<view class="icon icon-zuojiantou iconfont"></view>
						<view class="text">返回</view>
					</view>
					<view class="title">{{i18n.verificationHome}}</view>
				</view>
			</view>
		</view>
		<view class="image">
			<image src="../../../../static/verificationPage/voteTitle.png" mode="aspectFill"></image>
		</view>
		<view class="content">
			<view class="list">
				<view class="item" @tap="toVerificationRecord()">
					<view class="image">
						<image src="../../../../static/verificationPage/left.png" mode="widthFix"></image>
					</view>
					<p>{{i18n.verificationNotes}}</p>
				</view>
				<view class="item" @tap="scanEvent()">
					<view class="image">
						<image src="../../../../static/verificationPage/rigth.png" mode="widthFix"></image>
					</view>
					<p>{{i18n.scanVerification}}</p>
				</view>
			</view>
			<view class="content-text">{{i18n.handVerification}}</view>
			<input class="uni-input" v-model="inputValue" placeholder-style="color:#CCCCCC;letter-spacing: 2upx;" :placeholder="i18n.importWords" />
			<view class="btnBottom">
				<u-button type="error" @tap="masterVerification(inputValue,'click')">{{i18n.immedVerification}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: '',
				userInfoUsrId: null, //用戶id
			}
		},
		onShow() {
			this.getUserId(); //獲取用戶id
		},
		computed: {  
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		methods: {
			scanEvent() {
				uni.scanCode({
					onlyFromCamera: false,
					scanType: ['barCode', 'qrCode'],
					success: (res) => {
						console.log('這裡是掃碼拿到的回調', res);
						this.masterVerification(res.result,'')
					}
				})
			},
			// 用戶id
			getUserId() {
				let userData = uni.getStorageSync('data');
				if (userData) {
					this.userInfoUsrId = userData.usrId;
				}
			},
			//核銷記錄
			toVerificationRecord() {
				uni.navigateTo({
					url: "./verificationRecord/index"
				})
			},
			//返回商家端首頁
			toHome() {
				uni.navigateTo({
					url: "../../index"
				})
			},
			masterVerification(data,itemValue) {
				if(itemValue=='click' && !this.inputValue){
					uni.showToast({
						icon: 'none',
						title: '請輸入核銷碼'
					})
					return
				}
				if(itemValue=='click' && this.inputValue){
					data = this.inputValue
				}
				this.requestPost({
					"action": "bizwriteoff",
					"ucpNo": data,
					"bizId": this.userInfoUsrId
				}).then(response => {
					this.inputValue = "";
					if (response.data.result == 'suc') {
						console.log('response', response)
						uni.showToast({
							icon: 'none',
							title: '成功核銷!'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: response.data.msg,
							duration:2500
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		width: 100%;
		height: 100%;
	}

	.headerTitle {
		height: 120upx;
		position: fixed;
		width: 100%;
		z-index: 9;
		top: 0;
		left: 0;
		letter-spacing: 2upx;
	}

	.bgColor {
		width: 100%;
		height: 60upx;
		background-color: #dc5340;
	}

	.nav {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		background-color: #dc543e;
		width: 100%;
	}

	.myIcon {
		position: absolute;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
	}

	.myIconRight {
		position: absolute;
		right: 10upx;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
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

	.image {
		width: 100%;
		height: 400upx;
	}

	.image>uni-image {
		width: 100%;
		height: 100%;
	}

	.content {
		padding: 0 20upx;
		margin-top: 40upx;
		width: 100%;
		box-sizing: border-box;
	}

	.content>.list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		margin: 80upx 0;
	}

	.content>.list>.item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 47%;
		height: 180upx;
	}

	.content>.list>.item > .image{
		width: 80upx;
	}
	.item > .image >uni-image{
		width: 100%;
		height: 100%;
	}

	.content>.list>.item>.icon {
		margin-bottom: 6upx;
		font-size: 120upx;
		color: red;
	}

	.content>.list>.item>p {
		font-size: 36upx;
		color: #717171;
		font-weight: 300;
	}

	.content-text {
		margin: 30upx 0;
		font-size: 42upx;
		color: #333333;
		font-family: "MicrosoftYaHei";
		font-weight: bold;
	}

	.u-size-default{
		font-size: 36upx;
		letter-spacing: 2upx;
	}
	
	.uni-input {
		border: 3upx solid red;
		border-radius: 10upx;
		height: 100upx;
		padding-left: 10upx;
		box-sizing: border-box;
	}

	.btnBottom {
		margin-top: 40upx;
	}
</style>
