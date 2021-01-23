<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<view>
		<view>
			<view class="uni-form-item uni-column inputList">
				<view class="title">商品名稱:</view>
				<input class="uni-input" name="input" placeholder="請輸入商品名稱" v-model="shoppingInfor.Name" />
			</view>
			<view class="imgeList" v-for="(item,index) in imgeList" :key="index" @tap='chooseAvatar(index)'>
				<view>{{item.text}}</view>
				<view class="imgeItems">
					<image class="imgeListItems" :src="item.avatarPath?item.avatarPath:actions" mode="aspectFill"></image>
				</view>
			</view>
			<view class="bottom" @click="submitData">
				<button type="primary">提交</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				shoppingInfor:{
					Name:""
				},
				actions: '../../../../static/storePage/ShoppingTown/selectImage.png',
				imgeList: [{
						index: 0,
						text: "圖片",
						avatarPath: ''
					}
				],
				imageIndex: 0,
				FormHomedata:[]
			}
		},
		onLoad() {
			const item = this.$getStorage("data");
			this.FormHomedata = item;
			this.getPageHeight(); //获取滚动页面高度
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			let serverUrl = this.serverUrl
			uni.$on('uAvatarCropper', (path, index) => {
				// 可以在此上传到服务端
				uni.showLoading({})
				uni.uploadFile({
					url: serverUrl + '?action=publicuploadimage',
					filePath: path,
					name: 'file',
					complete: (res) => {
						uni.hideLoading()
						let data = JSON.parse(res.data)
						if (data.result == 'suc') {
							this.imgeList[this.imageIndex].avatarPath = data.image
						} else {
							uni.showToast({
								title: data.msg,
								icon: 'none'
							})
						}
					}
				});
			})
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			//查看頭型
			showAvatar() {
				console.log('查看頭型')
			},
			//去裁剪圖片
			chooseAvatar(index) {
				this.imageIndex = index;
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
			submitData(){
				if(!this.shoppingInfor.Name){
					uni.showToast({
						title: '請輸入商品名稱',
						icon: 'none'
					})
					return
				}
				if( !this.imgeList[0].avatarPath ){
					uni.showToast({
						title: '請上傳圖片',
						icon: 'none'
					})
					return
				}
				const cmdPic = this.imgeList[0].avatarPath;
				const cmdBizId = this.FormHomedata.usrId;
				const cmdInputId = this.FormHomedata.usrId;
				const cmdName = this.shoppingInfor.Name;
				this.$Httpps
					.sttp({
						"action": "cmddataupload",
						"cmdBizId":cmdBizId,
						"cmdInputId":cmdInputId,
						"cmdName": encodeURIComponent(cmdName),
						"cmdPic":cmdPic
					})
					.then(res => {
							uni.setStorageSync('manageIndex','0');
							uni.navigateTo({
								url: '../shoppingManage/index'
							});
					}).catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						})
				});
			}
		}
	}
</script>

<style scoped>
	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.inputList {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		border-bottom: 1px solid #cecece;
	}

	.inputList>.title {
		width: 20%;
		color: #040404;
		font-weight: 600;
		text-align: center;
	}

	.inputList>input {
		width: 70%;
	}

	.uni-input-placeholder {
		font-size: 24upx;
	}


	.imgeList {
		padding-left: 16upx;
		box-sizing: border-box;
	}

	.imgeList>uni-view:nth-of-type(1) {
		color: #040404;
		font-weight: 600;
	}

	.imgeItems {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.imgeListItems {
		width: 300upx;
		height: 300upx;
	}
	.bottom{
		width: 100%;
		margin-top: 40upx;
	}
</style>
