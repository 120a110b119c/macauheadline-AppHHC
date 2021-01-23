<template>
	<view class="">
		<header-title :title='"自媒体资料"' @toBack='goBack' :iconfont='"&#xe735;"'></header-title>
		<view class="content">
			<view class="infoType">
				<view class="infoTitle">*账号类型:</view>
				<view class="infoInput">
					<u-input v-model="mediaInfo.type" placeholder="请选择" type="select"  @click="typeSelectShow = true" />
				</view>
			</view>
			<view class="infoName">
				<view class="infoTitle">*账号名称:</view>
				<view class="infoInput">
					<u-input v-model="mediaInfo.name" placeholder="1-8个字,请勿使用标点及特殊符号" :border="true" clearable />
				</view>
			</view>
			<view class="infoName" v-if="usrPhone">
				<view class="infoTitle">*绑定手机:</view>
				<view class="infoInput" style="background-color: #f2f2f2;">
					<u-input v-model="usrPhone" disabled placeholder="请输入您的正确手机号码" :border="true" clearable />
				</view>
			</view>
			<view class="infoName" v-else>
				<view class="infoTitle">*绑定手机:</view>
				<view class="infoInput">
					<u-button type="primary" size="mini" @click="goPhoneEdit">手机号验证</u-button>
				</view>
			</view>
			<view class="infoDesc">
				<view class="infoTitle">账号简介:</view>
				<view class="infoInput">
					<u-input v-model="mediaInfo.recommend"  placeholder="请简述账号内容定位,可填写汉字 、数字 、英文," type="textarea" :border="true" clearable />
				</view>
			</view>
			
			<view class="infoAvter">
				<view class="infoTitle">*账号头像:</view>
				<view class="infoInput">
					<view class="u-avatar-wrap" @tap='chooseAvatar'>
						<image class="u-avatar-demo" :src="uploadUrl" mode="aspectFill"></image>
					</view>
					<!-- <u-upload :action="actionUrl" :max-size="5 * 1024 * 1024" :max-count='1' :multiple='false' name="path" 
						:file-list="fileList" @on-success="uploadOk" ></u-upload> -->
				</view>
			</view>
			<u-select v-model="typeSelectShow" @confirm="clickType" :list="typeList"></u-select>
			<view class="btnCommit">
				<u-button :disabled="disabled" class="btn" @click="toCommitData" :ripple="true" type='primary'  ripple-bg-color="#909399">  {{submitValue}}  </u-button>
			</view>
		</view>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	import headerTitle from "@/components/header-title/index.vue"
	export default {
		data() {
			return {
				disabled:false,
				usrMdaUpStatu:'',
				submitValue:'提 交',
				mediaInfo:{
					typeId:0
				},
				actionUrl:this.serverUrl + "?action=publicuploadimage",
				typeSelectShow:false,
				usrId:'',
				usrObj:{},
				fileList:[],
				typeList:[
					{ value:0, label:'个人' },
					{ value:1, label:"企业" },
					{ value:2, label:"其他" }
				],
				usrPhone:'',
				uploadUrl:'../../static/storePage/ShoppingTown/selectImage.png',
			}
		},
		created() {
			
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				console.log("这里是监听自媒体的这里")
				// 可以在此上传到服务端
				uni.uploadFile({
					url: this.actionUrl,
					filePath: path,
					name: 'file',
					complete: (res) => {
						console.log(res.data);
						let data = JSON.parse(res.data)
						this.uploadUrl = data.image;
					}
				});
			})
		},
		components:{
			headerTitle
		},
		onShow(){
			this.usrObj = uni.getStorageSync("data");
			this.usrId = this.usrObj.usrId;
			this.usrPhone = this.usrObj.usrPhone
			this.getUserInfo();
		},
		onUnload(){
			console.log("触发了卸载事件")
			uni.$off('uAvatarCropper')
		},
		methods: {
			toCommitData(){
				let usrMdaUpStatu = this.usrMdaUpStatu;
				if(!this.usrPhone ){
					uni.showToast({
						icon:"none",
						title:"必须绑定手机号码!"
					})
					return
				}
				switch(usrMdaUpStatu) {
				    case '':
					  this.commitData1();
				        break;
					 case '0':
					  this.commitData1();
					   break;
					case '2':
					  this.commitData();
					   break;
				}
			},
			goPhoneEdit(){
				uni.navigateTo({
					url:"../me/editPersonal/editPhoneNumber"
				})
			},
			SubmitStata(){
				let usrMdaUpStatu = this.usrMdaUpStatu;
				switch(usrMdaUpStatu) {
				    case '':
				      this.submitValue='提 交';
				        break;
					 case '0':
					  this.submitValue='提 交';
					   break;
					 case '1':
					   this.submitValue='正在审核中';
					   this.disabled = true;
					    break;
					case '2':
					  this.submitValue='修改自媒体资料';
					  // this.commitData();
					   break;
				} 
			},
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					params: {
						destWidth: 300,
						rectWidth: 200,
						fileType: 'jpg',
					}
				})
			},
			goBack(){
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-out-right',
					animationDuration: 300
				});
			},
			
			getUserInfo(){
				this.requestPost({
						"action": "mdainfo",
						"usrId": this.usrId
					})
					.then(res => {
						if(res.data.result == 'suc'){
							console.log(res.data);
							this.usrMdaUpStatu = res.data.usrMdaUpStatu;
							this.SubmitStata();//判断提交按钮的状态
							this.mediaInfo.type = this.getTypeLabel(res.data.usrMdaType)
							this.mediaInfo.name = res.data.usrMdaName;
							if(res.data.usrMdaHeadImg){
								this.uploadUrl = res.data.usrMdaHeadImg
							}else{
								this.uploadUrl = this.usrObj.usrLogo?this.usrObj.usrLogo:'../../static/storePage/ShoppingTown/selectImage.png';
							}
							if(this.mediaInfo.typeId != ''){
								this.mediaInfo.typeId = res.data.usrMdaType
							}
							if(!this.mediaInfo.name){
								this.mediaInfo.name = this.usrObj.usrNo
							}
							
							this.$set(this.mediaInfo,'recommend',res.data.usrMdaDesc)
						}
					}).catch(err => {
						console.log(err);
				});
			},
			getTypeLabel(value){
				for(var i=0;i<this.typeList.length;i++){
					if(this.typeList[i].value == value){
						console.log(this.typeList[i])
						return this.typeList[i].label
					}
				}
			},
			clickType(event){
				console.log(event)
				this.mediaInfo.type = event[0].label;
				this.mediaInfo.typeId = event[0].value;
			},
			commitData1(){
				if(this.mediaInfo.typeId === '' && this.mediaInfo.name && this.mediaInfo.recommend && this.uploadUrl){
					uni.showToast({
						icon:"none",
						title:'不允许提交空字段'
					})
					return;
				}
				if(this.uploadUrl == '../../static/storePage/ShoppingTown/selectImage.png'){
					uni.showToast({
						icon:"none",
						title:'请选择一张图片提交'
					})
					return
				}
				this.requestPost({
					"action": "applymdarole",
					"usrId":this.usrId,
					"usrMdaType":this.mediaInfo.typeId,
					"usrMdaName":encodeURIComponent(this.mediaInfo.name),
					"usrMdaDesc":encodeURIComponent(this.mediaInfo.recommend),
					"usrMdaHeadImg":this.uploadUrl
				}).then(res=>{
					console.log('提交回调',res)
					if(res.data.result == 'suc'){
						uni.showToast({
							icon:"none",
							title:'提交成功'
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1,
								animationType: 'slide-out-right',
								animationDuration: 300
							});
						},1000)
					}else{
						uni.showToast({
							icon:"none",
							title:res.data.msg
						});
					}
				}).catch(err => {
						console.log(err);
				});
			},
			commitData(){
				if(this.mediaInfo.typeId === '' && this.mediaInfo.name && this.mediaInfo.recommend && this.uploadUrl){
					uni.showToast({
						icon:"none",
						title:'不允许提交空字段'
					})
					return;
				}
				if(this.uploadUrl == '../../static/storePage/ShoppingTown/selectImage.png'){
					uni.showToast({
						icon:"none",
						title:'请选择一张图片提交'
					})
					return
				}
				this.requestPost({
					"action": "mdadataupload",
					"usrId":this.usrId,
					"usrMdaType":this.mediaInfo.typeId,
					"usrMdaName":encodeURIComponent(this.mediaInfo.name),
					"usrMdaDesc":encodeURIComponent(this.mediaInfo.recommend),
					"usrMdaHeadImg":this.uploadUrl
				}).then(res=>{
					console.log('提交回调',res)
					if(res.data.result == 'suc'){
						uni.showToast({
							icon:"none",
							title:'提交成功'
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1,
								animationType: 'slide-out-right',
								animationDuration: 300
							});
						},1500)
					}else{
						uni.showToast({
							icon:"none",
							title:res.data.msg
						});
					}
				}).catch(err => {
						console.log(err);
				});
			},
			
		}
	}
</script>


<style scoped>
	.content{
		background-color: white;
		font-size: 32upx;
	}
	.content>view{
		display: flex;
	}
	.infoType{
		height: 140upx;
		width: 100%;
		align-items: center;
	}
	.infoDesc{
		width: 100%;
		margin-top: 50upx;
	}
	.infoAvter{
		margin-top: 50upx;
		font-size: 32upx;
	}
	.infoName{
		height: 140upx;
		width: 100%;
		align-items: center;
	}
	.infoTitle{
		margin-left: 40upx;
		width: 170upx;
	}
	.infoInput{
		flex: 1;
		margin-right: 40upx;
		border-radius: 8upx;
		font-size: 32upx;
	}
	.btnCommit{
		width: 100%;
		position:fixed;
		display: flex;
		bottom: 50upx;
		justify-content: center;
	}
	.btnCommit .btn{
		width: 60%;
	}
	.u-avatar-wrap{
		height: 220upx;
		width: 220upx;
	}
	.u-avatar-demo{
		width: 100%;
		height: 100%;
	}
</style>
