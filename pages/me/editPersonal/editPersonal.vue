<template>
	<view >
		<header-title :title='"個人資料"' :backText="'我的'" @toBack='toMe' :iconfont="'&#xe728;'"></header-title>
		<u-cell-group class="cellGroup">
			<u-cell-item title="我的頭像" :arrow="false" :center="true" @tap='chooseAvatar'>
				<view class="avaterView" slot="right-icon">
					<u-avatar size='mini' :src="avatarPath?avatarPath:'../../../static/logo/icon.png'" @tap.stop="showAvatar"></u-avatar>
					<u-icon style="margin-left: 12upx;" name="arrow-right" color="#909399" size="28"></u-icon>
				</view>
			</u-cell-item>
			<u-cell-item title="*我的手機號" :value="mobile" @tap='goChangePhone'></u-cell-item>
		</u-cell-group>
		<u-cell-group class="cellGroup">
			<u-field disabled label="*用戶名稱" style="color:#606266">
					<view class="rightInput" slot='right'>
						<u-input v-model="name" type="text" :clearable='false' input-align='right' placeholder='請輸入名稱' />
						<u-icon style="margin:0 10upx;" name="arrow-right" color="#909399" size="28"></u-icon>
					</view>
			</u-field>
			<u-field disabled label="*電子郵箱" style="color:#606266">
					<view class="rightInput" slot='right'>
						<u-input v-model="email" type="text" :clearable='false'  input-align='right' placeholder='請輸入郵箱' />
						<u-icon style="margin:0 10upx;" name="arrow-right" color="#909399" size="28"></u-icon>
					</view>
			</u-field>
		</u-cell-group>
		
		<u-cell-group class="cellGroup">
			<u-field disabled label="*真實姓名" style="color:#606266">
					<view class="rightInput" slot='right'>
						<u-input v-model="realname" type="text" :clearable='false' input-align='right' placeholder='請輸入姓名' />
						<u-icon style="margin:0 10upx;" name="arrow-right" color="#909399" size="28"></u-icon>
					</view>
			</u-field>
			<!-- <u-form-item label="*真實姓名" label-width='195' label-align='center'>
				<u-input v-model="realname" type="text" :clearable='false' input-align='right' placeholder='請輸入姓名' />
				<u-icon style="margin-right: 28upx;" name="arrow-right" color="#909399" size="28"></u-icon>
			</u-form-item> -->
			<u-cell-item title="*用戶性別" :value="sex" @tap='sexListShow = true'></u-cell-item>
			<u-cell-item title="*出生年月" :value="birthdate" @tap='bornTimeShow = true'></u-cell-item>
		</u-cell-group>
		<!-- <u-cell-group class="cellGroup" >
			<u-cell-item title="申請頭條號入駐"></u-cell-item>
			<u-cell-item title="申請商家入駐"></u-cell-item>
		</u-cell-group> -->
		<view class="saveBtn" >
			<u-button type="error" @tap='commitUserInfo()' size="default" :ripple="true">保存資料</u-button>
		</view>
		<!-- 二維碼顯示 -->
		<u-popup v-model="erweiCodeShow" border-radius='20' mode="center" width='450' height="500">
		</u-popup>
		<!-- 性別選擇 -->
		<u-action-sheet :list="sexList" @click="chooesSex" v-model="sexListShow" :safe-area-inset-bottom='true'></u-action-sheet>
		<!-- 出生日期選擇 -->
		<u-picker v-model="bornTimeShow" mode="time" :safe-area-inset-bottom='true' @confirm='chooesBornTime'></u-picker>
	</view>
</template>
	
<script>
	import headerTitle  from '@/components/header-title/index.vue'
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		components:{
			headerTitle,
			tkiQrcode
		},
		data() {
			return {
				cellGroupStyle:{
					'font-size':'32upx'
				},
				avatarPath:'',
				sexListShow:false,
				sex:'保密',
				name:'最新用戶',
				mobile:"",
				email:'',
				bornTimeShow:false,
				erweiCodeShow:false,
				birthdate:"",
				realname:'',
				sexList:[
					{ text:'保密' },
					{ text:'男' },
					{ text:'女' },
				],
				userInfo:{}
			}
		},
		onUnload(){
			console.log("触发了卸载事件")
			uni.$off('uAvatarCropper')
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			let serverUrl = this.serverUrl
			uni.$on('uAvatarCropper', path => {
				console.log("这里是用户编辑信息的上传模块")
				// 可以在此上传到服务端
				uni.showLoading({})
				uni.uploadFile({
					url: serverUrl + '?action=uploadimage&usrid='+this.userInfo.usrId,
					filePath: path,
					name: 'file',
					complete: (res) => {
						uni.hideLoading()
						console.log(res)
						let data = JSON.parse(res.data)
						if(data.result == 'suc'){
							this.avatarPath = data.image
						}else{
							uni.showToast({
								title:data.msg,
								icon:'none'
							})
						}
					}
				});
			})
		},
		onLoad(params) {
		},
		onShow() {
			this.userInfo = uni.getStorageSync('data')
			console.log(this.userInfo)
			this.getUserInfo()
		},
		methods:{
			emailBulr(){
				console.log('邮箱')
			},
			getUserInfo(){
				this.$Httpps
					.sttp({
						"action": "getuser",
						"usrId": this.userInfo.usrId
					})
					.then(res => {
						if (res.data.result == 'suc') {
							this.userInfoNews = res.data
							this.mobile = this.userInfoNews.usrPhone
							this.name = this.userInfoNews.usrNo
							this.email = this.userInfoNews.usrEmail
							this.realname = this.userInfoNews.usrName
							this.sex = this.userInfoNews.usrSex?this.userInfoNews.usrSex:'待完善'
							this.birthdate = this.userInfoNews.usrBirthdate?this.userInfoNews.usrBirthdate:'待完善'
							this.avatarPath = this.userInfoNews.usrLogo
						}
					}).catch(err => {
						console.log(err);
				});
			},
			//保存用户信息
			commitUserInfo(){
				if(this.emptyTest()){}else{
					uni.showToast({
						icon:'none',
						title:"請您填寫帶*的內容"
					})
					return
				}
				if(this.email.indexOf("@") < 0){
					uni.showToast({
						icon:'none',
						title:"您的邮箱格式不正确,请检查"
					})
					return
				}
				let userObj = {
					"action": "updateuserinfo",
					"usrId": this.userInfo.usrId,
					"mobile": this.mobile,
					"name": this.name,
					"email": this.email,
					"realname": this.realname,
					"sex":  this.sex,
					"birthdate":  this.birthdate,
				}
				this.$Httpps
					.sttp(userObj)
					.then(res => {
						if (res.data.result == 'suc') {
							console.log(res)
							uni.showToast({
								icon:'none',
								title:'保存資料成功'
							})
							setTimeout(()=>{
								this.toMe()
							},1000)
						}
					}).catch(err => {
						console.log(err);
				});
			},
			//提交前的空字段验证
			emptyTest(){
				if(!this.mobile || !this.name || !this.email || !this.realname || this.sex == '待完善' || this.birthdate == '待完善'){
					return false
				}else{
					return true
				}
			},
			toMe() {
				uni.switchTab({
					url: '../me'
				})
			},
			//顯示二維碼
			showErweiCode(){
				this.erweiCodeShow = true
			},
			//選擇性別
			chooesSex(index){
				this.sex = this.sexList[index].text
			},
			//選擇出生日期
			chooesBornTime(obj){
				this.birthdate = obj.year+ '-' + obj.month+ '-' + obj.day
			},
			//查看頭型
			showAvatar(){
				console.log('查看頭型')
			},
			//去修改手機號
			goChangePhone(){
				uni.navigateTo({
					url:'./editPhoneNumber'
				})
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
.cellGroup{
	width: 100%;
}
.avaterView{
	display: flex;
	justify-content: center;
	align-items: center;
}
.rightInput{
	display: flex;
}
.saveBtn{
	width: 80%;
	margin: 0 auto;
	margin-top: 80upx;
}

</style>
