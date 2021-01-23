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
					<view class="title">{{i18n.shoppingPush}}</view>
				</view>
			</view>
		</view>
		<view class="contentTitle">
			<view style="width: 100upx;">*{{i18n.shopName}}:</view>
			<view style="width: 100%;"><input type="text" style="text-align: right;width: 100%;" v-model="inputValue" :placeholder="i18n.shoppingName"></view>
		</view>
		<view class="shopDestript">
			<view>*商品描述</view>
			<textarea v-model="destripts" :placeholder="i18n.simpleWorld" />
		</view>
		<view class="imageList">
			<view>*{{i18n.unloadMainImage}}</view>
			<u-upload :action="action"  ref="uUpload" :file-list="fileList" max-count="3"></u-upload>
			<view>{{i18n.tipWord}}</view>
		</view>
		<view class="btn">
			<u-button type="error" @click="commitUserInfo()">{{i18n.readyPush}}</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				action: this.serverUrl+'?action=publicuploadimage',
				fileList: [],
				destripts:null,
				inputValue:'',
				userInfoUsrId:null
			}
		},
		computed: {
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		onShow() {
			this.getUserId(); //獲取用戶id
		},
		methods:{
			//提交前的空字段验证
			emptyTest() {
				if (!this.inputValue || !this.cmdDesc ) {
					return false
				} else {
					return true
				}
			},
			toHome(){
				uni.navigateBack()
			},
			getUserId() {
				let userData = uni.getStorageSync('data');
				if (userData) {
					this.userInfoUsrId = userData.usrId;
				}
			},
			commitUserInfo(){
				if(this.emptyTest()){
					uni.showToast({
						icon:'none',
						title:"請您填寫帶*的內容"
					})
					return
				}
				const files = this.$refs.uUpload.lists;//获取上传图片列表
				let ifmPic = '';
				if(files != ''){
				    ifmPic = encodeURIComponent(files[0].response.image);
				}else{
					uni.showToast({
						icon: "none",
						title: '請上傳至少一張圖片'
					})
					return;
				}
				let ifmPic2 = '';
				let ifmPic3 =  '';
				if(files.length == 2){
					ifmPic2 = files[1].response.image;
				}
				if(files.length == 3){
					let ifmPic3 =  files[2].response.image;
				}
				this.$Httpps
					.sttp({
						"action": "cmddataupload",
						"cmdBizId": this.userInfoUsrId,
						"cmdInputId":this.userInfoUsrId,
						"cmdName": encodeURIComponent(this.inputValue),
						"cmdPic":ifmPic,
						"cmdPic2":ifmPic2,
						"cmdPic3":ifmPic3,
						"cmdDesc":encodeURIComponent(this.destripts)
					})
					.then(res => {
						if (res.data.result == 'suc') {
							uni.showToast({
								icon: "none",
								title: '發佈成功'
							})
							uni.navigateTo({
								url:"../shopManage/index"
							})
						}else{
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					}).catch(err => {
						console.log(err);
					});
			}
		}
	}
</script>

<style scoped>
	.page{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgb(250, 250, 250);
	}
	.headerTitle {
		height: 120upx;
		position: fixed;
		width: 100%;
		z-index: 9;
		top: 0;
		left: 0;
	}
	
	.bgColor {
		width: 100%;
		height: 60upx;
		background-color: #fff;
	}
	
	.nav {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		background-color: #fff;
		width: 100%;
	}
	
	.myIcon {
		position: absolute;
		display: flex;
		flex-direction: row;
		color: #000000;
		z-index: 5;
	}
	
	.myIconRight {
		position: absolute;
		right: 10upx;
		display: flex;
		flex-direction: row;
		color: #000000;
		z-index: 5;
	}
	
	.myIconRight>.icon-jiahao {
		font-size: 40upx;
	}
	
	.iconfont {
		color: #000000;
		font-size: 54upx;
	}
	
	.text {
		color: #000000;
		font-size: 30upx;
	}
	
	.title {
		width: 100%;
		text-align: center;
		color: #000000;
		font-size: 36upx;
	}
	
	
	.contentTitle{
		margin: 20upx 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.shopDestript{
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.shopDestript > uni-view:nth-of-type(1){
		margin-bottom: 20upx;
	}
	.shopDestript> textarea{
		text-align: left;
		width: 100%;
		height: 200upx;
		background-color: #e8e8e8;
	}
	.imageList{
		margin-top: 20upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.imageList > uni-view:nth-of-type(1){
		margin-bottom: 20upx;
	}
	.imageList > uni-view:nth-of-type(3){
		margin-top: 20upx;
		color: #f02f1e;
	}
	.btn{
		position: absolute;
		bottom: 40upx;
		left: 10%;
		width: 80%;
		margin: 0 auto;
	}
</style>
