<template>
	<view>
		<header-title :title='"店鋪設置"' :backText="'返回'" @toBack='toHome' :iconfont="'&#xe728;'"></header-title>
		<u-cell-group class="cellGroup">
			<u-cell-item :title="'*'+i18n.myHeaderImage" :arrow="false" :center="true" @tap='chooseAvatar'>
				<view class="avaterView" slot="right-icon">
					<u-avatar size='mini' :src="avatarPath?avatarPath:'../../../static/logo/icon.png'" @tap.stop="showAvatar"></u-avatar>
				</view>
			</u-cell-item>
			<u-field disabled :label="'*'+i18n.shoppingName" style="color:#606266">
				<view class="rightInput" slot='right'>
					<u-input v-model="shopName" type="text" :clearable='false' input-align='right' />
				</view>
			</u-field>
			<u-cell-item :title="'*'+i18n.tradeFamily" :arrow="true" arrow-direction="down" :value="IndustryCategoryValue" @tap='IndustryCategory = true'></u-cell-item>
			<u-field disabled :label="'*'+i18n.businessAddress" style="color:#606266">
				<view class="rightInput" slot='right'>
					<u-input v-model="shopAdress" type="text" :clearable='false' input-align='right' />
				</view>
			</u-field>
			<u-field disabled :label="'*'+i18n.businessPhone" style="color:#606266">
				<view class="rightInput" slot='right'>
					<u-input v-model="BusinessTelephone " type="text" :clearable='false' input-align='right' />
				</view>
			</u-field>
		</u-cell-group>
		<u-select v-model="IndustryCategory" mode="mutil-column-auto" :list="list" @confirm='chooesIndustryCategory'></u-select>
		<view class="imageUpload">
			<u-upload :action="action" @on-remove="removeImage()" ref="uUpload" :file-list="fileList" max-count="3"></u-upload>
			<view style="margin-left: 10upx;color: #f02f1e;">{{i18n.tipsMessage}}</view>
		</view>
		<view class="shopingInfo">
			<view>{{i18n.shopDescript}}</view>
			<view class="textBox">
				<textarea v-model="BusinessIntroduction" placeholder="本店是經營****" />
				</view>
		</view>
		<view class="saveBtn" >
			<u-button type="error"  size="default" :ripple="true" disabled v-if="usrBizUpStatu == '1'">{{i18n.nowExamine}}</u-button>
			<u-button type="error" @click='commitUserInfo()' size="default" :ripple="true" v-else>{{i18n.preserveSubmit}}</u-button>
		</view>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		components: {
			headerTitle,
			tkiQrcode
		},
		data() {
			return {
				//我的頭像
				avatarPath: '',
				//圖片上傳 start
				action: this.serverUrl+'?action=publicuploadimage',
				fileList: [],
				//店鋪名稱
				shopName: "",
				//行業類別
				IndustryCategoryValue:"請選擇",
				//店鋪地址
				shopAdress:"",
				//營業電話 
				BusinessTelephone:"",
				//商家介紹 
				BusinessIntroduction:"",
				//用戶id
				userInfoUsrId:null,
				IndustryCategory: false,
				usrBizUpStatu:null,
				list: [{
						value: 1,
						label: '餐飲'
					},
					{
						value: 2,
						label: '旅遊'
					},
					{
						value: 3,
						label: '汽車製造/服務'
					}
				]
			}
		},
		computed: {  
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		onLoad() {
			// if(op.data){
			// 	let objData = JSON.parse(op.data);
			// 	this.avatarPath = objData.usrBizImage;
			// 	this.shopName = objData.usrBizName;
			// 	this.BusinessTelephone = objData.usrBizPhone;
			// 	this.shopAdress = objData.usrBizAddress;
			// }
		},
		onShow() {
			let userData = uni.getStorageSync('data');
			if(userData){
				this.userInfoUsrId = userData.usrId;
			}
			this.getUserInfo();
			this.changeData();//切换简繁体
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			let serverUrl = this.serverUrl;
			uni.$on('uAvatarCropper', path => {
				// 可以在此上传到服务端
				uni.showLoading({})
				uni.uploadFile({
					url: serverUrl + '?action=publicuploadimage',
					filePath: path,
					name: 'file',
					complete: (res) => {
						uni.hideLoading()
						let data = JSON.parse(res.data);
						if(data.result == 'suc'){
							this.avatarPath = data.image
							console.log('data.image',data.image)
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					}
				});
			})
		},
		onUnload(){
			uni.$off('uAvatarCropper')
		},
		methods: {
			changeData() {
				const system_info = uni.getStorageSync('system_info');
				system_info.language === 'en' ? system_info.language = this._i18n.locale = 'zh_CN' : system_info.language = this._i18n.locale = 'en'
			},
			removeImage(){
				this.fileList[0].url = '';
			},
			//提交前的空字段验证
			emptyTest() {
				if (!this.avatarPath || !this.shopName || this.IndustryCategoryValue == '請選擇' || !this.shopAdress || !this.BusinessTelephone ) {
					return false
				} else {
					return true
				}
			},
			getUserInfo(){
				console.log(this.userInfoUsrId)
				this.requestPost(
					{
						"bizId":this.userInfoUsrId,
						"action":"getbizinfo"
					}
				).then(res=>{
					if(res.data.result == 'suc'){
						let objData = res.data
						this.avatarPath = objData.usrBizLogo;
						this.shopName = objData.usrBizName;
						this.BusinessTelephone = objData.usrBizPhone;
						this.usrBizUpStatu = objData.usrBizUpStatu;
						this.shopAdress = objData.usrBizAddress;
						if(objData.usrBizImage){
							this.fileList.push({
								url:objData.usrBizImage 
							})
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				})
			},
			//查看頭型
			showAvatar(){
				console.log('查看頭型')
			},
			//返回商家度首頁
			toHome(){
				uni.navigateBack()
			},
			//行業類別選擇
			chooesIndustryCategory(e) {
				this.IndustryCategoryValue = e[0].label
			},
			//保存用户信息
			commitUserInfo() {
				if(!this.emptyTest()){
					uni.showToast({
						icon:'none',
						title:"請您填寫帶*的內容"
					})
					return
				}
				// 圖片上傳 start
				const files = this.$refs.uUpload.lists;//获取上传图片列表
				let ifmPic = '';
				let ifmPic2 = '';
				let ifmPic3 =  '';
				if(this.fileList.length !=0){
					ifmPic = encodeURIComponent(this.fileList[0].url);
				}
				if(this.fileList.length == 0 && files != ''){
					 ifmPic = encodeURIComponent(files[0].response.image);
				}
				if(files.length == 2){
					ifmPic2 = files[1].response.image;
				}
				if(files.length == 3){
					ifmPic2 = files[1].response.image;
				    ifmPic3 =  files[2].response.image;
				}
				let userObj = {
					"action": "updatebizinfo",
					"usrId":this.userInfoUsrId,
					//店鋪名稱
					"usrBizName": encodeURIComponent(this.shopName),
					//店鋪頭像
					"usrBizLogo":this.avatarPath,
					//店鋪地址
					"usrBizAddress":encodeURIComponent(this.shopAdress),
					//營業電話
					"usrBizPhone":this.BusinessTelephone,
					//商家類別
					"usrBizRange":encodeURIComponent(this.IndustryCategoryValue),
					// 圖片上傳 start
					"usrBizImage": ifmPic,
					"usrBizImage1": ifmPic2,
					"usrBizImage2": ifmPic3
				}
				this.$Httpps
					.sttp(userObj)
					.then(res => {
						if (res.data.result == 'suc') {
							uni.showToast({
								icon: 'none',
								title: '保存資料成功'
							})
							let userType = uni.getStorageSync('data');
							let usType = userType.usrType;
							if(usType == 0){
								uni.switchTab({
									url:"../../../me/me"
								})
							}else{
								setTimeout(() => {
									this.toHome()
								}, 1000)
							}
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
			//去裁剪圖片
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
		}
	};
</script>

<style scoped>
	/* 圖片上傳 start */
	.imageUpload{
		margin-left: 20upx;
		margin-top: 20upx;
	}
	.imageUpload > uni-view:nth-of-type(3){
		margin-top: 20upx;
		color: #f02f1e;
	}
	/* 圖片上傳 end */
	.cellGroup {
		width: 100%;
	}

	.avaterView {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.rightInput {
		display: flex;
	}

	.saveBtn {
		width: 80%;
		margin: 0 auto;
		margin-top: 80upx;
	}
	.shopingInfo view:nth-of-type(1){
		margin: 30upx;
		margin-bottom: 10upx;
	}
	.textBox{
		margin: 30upx;
		width: 92%;
		height: 200upx;
		background-color: #f0f0f0;
	}
	.textBox > uni-textarea{
		display: block;
		width: 100%;
	}
	.saveBtn {
		width: 80%;
		margin: 80upx auto;
	}
</style>
