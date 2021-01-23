<template>
	<view>
		<header-title :title='"修改手機號"' @toBack='goBack' :iconfont='"&#xe735;"'></header-title>
		<u-cell-group>
			<view class="phone">
				<view class="uni-form-item uni-column">
					<picker @change="bindPickerChange" :range="range">
						<label class="">{{jg}}</label>
					</picker>
				</view>
				<view class="icon iconfont icon-xiala"></view>
				<view style="display: flex;align-items: center;">
					<view style="margin:0 20upx;">手機號</view>
					<u-input v-model="mobile" type="text" :clearable='false' input-align='left' placeholder='請填寫手機號' />
				</view>
				
			</view>
			<view style="display: flex;align-items: center;">
				<view style="margin-left: 40upx;margin-right: 20upx;">驗證碼</view>
				<u-input v-model="code" type="text" :clearable='false' input-align='left' placeholder='請填寫驗證碼' />
				<u-button size="mini" type="success" @tap="getCode">{{codeText}}</u-button>
			</view>
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
		</u-cell-group>
		<view class="saveBtn">
			<u-button type="error" size="default" :ripple="true" @click="submitPhone">提交</u-button>
		</view>
	</view>
</template>

<script>
	import headerTitle  from '@/components/header-title/index.vue'
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				codeText:'獲取驗證碼',
				range:['+86','+852','+853'],
				rangeIndex:2,
				jg:'+853',
				requestRangeList:['0086','00852','00853'],
				userInfo:{}
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('data')
		},
		components:{
			headerTitle
		},
		methods: {
			bindPickerChange(e){
				this.rangeIndex = e.target.value;
				this.jg = this.range[this.rangeIndex];
				console.log(this.rangeIndex)
			},
			codeChange(text) {
				this.codeText = text;
			},
			goBack(){
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-out-right',
					animationDuration: 300
				});
			},
			getCode() {
				if(!this.mobile){
					uni.showToast({
						icon:'none',
						title:'手機號為空'
					})
					return
				}
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在獲取驗證碼'
					})
					uni.request({
						url:this.serverUrl,
						data: {
							"action": "getsmscodeforbind",
							"userTel": this.requestRangeList[this.rangeIndex] + this.mobile
						},
						dataType: 'json',
						success: (res) => {
							if(res.data.result == 'suc'){
								uni.hideLoading();
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}else{
								uni.showToast({
									icon:"none",
									title:res.data.msg
								})
							}
						},
						fail: (error) => {
							console.log(error, '登录报错');
						}
					});
				}else {
					uni.showToast({
						title:'倒計時結束再發送',
						icon:'none'
					})
				}
			},
			submitPhone(){
				uni.showLoading({})
				this.$Httpps
					.sttp({
						"action":'validsmscode',
						"smsCode":this.code,
						'userTel':this.requestRangeList[this.rangeIndex] + this.mobile
					})
					.then(res => {
						uni.hideLoading()
						if (res.data.result == 'suc') {
							uni.showLoading({})
							this.savePhone()
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}).catch(err => {
						console.log(err);
				});
				
			},
			//保存用戶手機號
			savePhone(){
				this.$Httpps
					.sttp({
						"action":'updateusermobile',
						"usrId": this.userInfo.usrId,
						"mobile":this.requestRangeList[this.rangeIndex] + this.mobile
					})
					.then(res => {
						uni.hideLoading()
						if (res.data.result == 'suc') {
							uni.showToast({
								icon:'none',
								title:'修改手機號成功',
								duration:1000
							})
							let usrObj = uni.getStorageSync("data")
							usrObj.usrPhone = this.requestRangeList[this.rangeIndex] + this.mobile;
							uni.setStorageSync("data",usrObj);
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}
					}).catch(err => {
						console.log(err);
				});
			},
		}
	}
</script>

<style>
.phone{
	width: 100%;
	height: 100upx;
	padding-left: 40upx;
	line-height: 100upx;
	border-radius: 80upx;
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
}
.saveBtn{
	width: 80%;
	margin: 0 auto;
	margin-top: 80upx;
}
</style>
