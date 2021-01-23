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
					<view class="title">商品修改</view>
				</view>
			</view>
		</view>
		<view class="contentTitle">
			<view>名稱:</view>
			<view><input type="text" style="text-align: right;" v-model="inputValue" placeholder="商品名稱"></view>
		</view>
		<view class="shopDestript">
			<view>商品描述</view>
			<textarea v-model="destripts" placeholder="簡單的文字描述" />
		</view>
		<view class="imageList">
			<view>上傳主圖</view>
			<u-upload :action="action"  ref="uUpload" @on-remove="removeImage()" :file-list="fileList" max-count="3"></u-upload>
			<view>溫馨提示:最多上傳三張圖片</view>
		</view>
		<view class="btn">
			<u-button type="error" @click="commitUserInfo()">確定發佈</u-button>
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
				cmdId:null
			}
		},
		onLoad() {
			let data = uni.getStorageSync('shopArray');
			this.cmdId = data.cmdId;
			this.inputValue = data.cmdName;
			this.destripts = data.cmdDesc;
			console.log('data.cmdPic',data.cmdPic)
			if(data.cmdPic!='undefined'){
				this.fileList.push({
					url:data.cmdPic
				})
			}
		},
		methods:{
			removeImage(){
				this.fileList[0].url = ''
			},
			//提交前的空字段验证
			emptyTest() {
				if (!this.destripts || !this.inputValue ) {
					return false
				} else {
					return true
				}
			},
			toHome(){
				uni.navigateTo({
					url:"../shopManage/index"
				})
			},
			commitUserInfo(){
				if(!this.emptyTest()){
					uni.showToast({
						icon:'none',
						title:"請您填寫帶*的內容"
					})
					return
				}
				const files = this.$refs.uUpload.lists;//获取上传图片列表
				let ifmPic = '';
				if(this.fileList[0].url){
					ifmPic = encodeURIComponent(this.fileList[0].url);
				}
				if(!this.fileList[0].url && files != ''){
					 ifmPic = encodeURIComponent(files[0].response.image);
				}
				let ifmPic2 = '';
				let ifmPic3 =  '';
				if(files.length == 2){
					ifmPic2 = files[1].response.image;
				}
				if(files.length == 3){
					ifmPic2 = files[1].response.image;
					ifmPic3 =  files[2].response.image;
				}
				this.$Httpps
					.sttp({
						"action": "updatecmdinfo",
						"cmdId": this.cmdId,
						"cmdDesc":encodeURIComponent(this.destripts),
						"cmdName": encodeURIComponent(this.inputValue),
						"cmdPic":ifmPic,
						"cmdPic2":ifmPic2,
						"cmdPic3":ifmPic3
					})
					.then(res => {
						if (res.data.result == 'suc') {
							uni.showToast({
								icon: "none",
								title: '修改成功'
							})
							uni.navigateTo({
								url:"../shopManage/index"
							})
						}else{
							uni.showToast({
								icon: "none",
								title: '修改不成功:'+res.data.msg
							})
							return;
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
