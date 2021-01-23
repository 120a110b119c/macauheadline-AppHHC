<template>
	<view>
		<header-title :title='"我要爆料"' @toBack='toHome()' :backText="'首页'" :iconfont='"&#xe735;"'></header-title>
		<view class="textarea_box">
			<textarea class="textarea" placeholder="分享妳的爆料,讓更多的人因妳而改變~~~" maxlength="200" v-model="desc" />
			<view class="num">{{ desc.length }}/200</view>
		</view>
		<view class="content">
			<view class="uploader_video" v-for="(item,index) in allContentList" v-if="item.activeFlag">
				<image v-if="item.image&&!item.video" :data-src="item.image" :src="item.image" class="video" @tap="preImage($event,index)"></image>
				<view  style="width: 100%;height: 100%;" v-if="item.activeFlag&&item.video">
					<video v-if="!item.flag&&item.video" :src="item.video" class="video" :id="`video_${item.video}`" :duration="30" autoplay="true" @fullscreenchange="playerFullScreen($event,index)">
						<cover-view class="fuckking" @tap="clickMask(item,index)"></cover-view>
					</video>
					<view  class="videoWrap" v-if="item.flag" @tap.stop="clickMask(item,index)">
						<image src="../../../static/videoIcon/videoPlay.png" class="videoPlayImg"></image>
					</view>
				</view>
				<progress :percent= "item.precentProgress" stroke-width="10" style="position: relative;top: -20upx;"></progress>
				<view class="icon iconfont icon-shanchu"  v-if="item.flag&&item.video" @tap="delectVideo(item,index)"></view>
				<view class="icon iconfont icon-shanchu"  v-if="item.flag&&item.image" @tap="delectImage(item,index)"></view>
			</view>
			<view class="selectVideo" @tap="chooseVideoImage()">
				<view class="icon iconfont icon-jiahao"></view>
				<view class="selectText">图片、视频</view>
			</view>
		</view>
		<view class="UserInfo">
			<view class="icon iconfont icon-renqun"></view>
			<view>姓名</view>
			<view class="line"></view>
			<input type="text" v-model="UserInfo.name" placeholder="可選填 请输入姓名" />
		</view>
		<view class="UserInfo">
			<view class="icon iconfont icon-dianhua1"></view>
			<view>電話</view>
			<view class="line"></view>
			<input type="number" v-model="UserInfo.telPhone" placeholder="可選填 请输入手机号"  />
		</view>
		<view class="submitBtn">
			<button @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import  headerTitle  from '../../../components/header-title/index.vue'
	export default{
		data(){
			return{
				allContentList:[],
				action: this.serverUrl+'?action=publicuploadimage',
				fileList: [],
				desc: '',
				UserInfo:{
					telPhone:"",
					name:""
				},
				playIndex:-1,
				videoCtx: {},
				percent:0
			}
		},
		onShow() {
			uni.setStorageSync('stopJump',0);//长按跳转不跳转首页
		},
		components:{
			headerTitle
		},
		methods:{
			//预览图片
			preImage(e,index) { 
				let imgArr = [];
				imgArr.push(e.target.dataset.src);
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
			playerFullScreen(e,index){
				if(!e.detail.fullScreen){ 
					this.$set(this.allContentList[index], "flag", true);
				}
			},
			clickMask(item,index){
				this.$set(this.allContentList[index], "flag", false);
				this.$nextTick(() => {  
					this.videoCtx = uni.createVideoContext(`video_${this.allContentList[index].video}`, this);
					this.videoCtx.requestFullScreen({direction: 0});
				})
			},
			chooseVideoImage(){
			    uni.showActionSheet({
			        title:"选择上传类型",
			        itemList: ['图片','视频'],
			        success: (res) => {
			            if(res.tapIndex == 0){
			                this.chooseImages()
			            } else {
			                this.chooseVideo()
			            }
			        }
			    })
			},
			// 上传图片
			chooseImages(){
				let serverUrl = this.serverUrl;
			    uni.chooseImage({
			        count: 9, //默认9
					sizeType:"compressed",
			        success:(res)=> {
			           let igmFile = res.tempFilePaths;
						uni.uploadFile({
							url:serverUrl + '?action=publicuploadimage',
							filePath:igmFile[0],
							success: (res) => {
								let obj = JSON.parse(res.data);
								if (obj.result == "suc") {
									let list = this.allContentList;
									obj.flag = true;
									obj.activeFlag = true;
									obj.precentProgress = 100;
									list.push(obj)
									this.$set(this.allContentList, "", list)
								} else {
									uni.showToast({
										title: obj.msg,
										icon: 'none'
									})
								}
							}
						});
			        },
			    });
			},
			// 上传视频
			chooseVideo(){
			    uni.chooseVideo({
			    	maxDuration: 30,
			    	success: (res) => {
			    		let serverUrl = this.serverUrl
			    		let videoFile = res.tempFilePath;
			    		const uper=uni.uploadFile({
			    			url: serverUrl + '?action=uploadvideo',
			    			filePath: videoFile,
			    			name: 'file',
			    			success: (res) => {
			    				let obj = JSON.parse(res.data);
			    				if (obj.result == "suc") {
			    					let list = this.allContentList;
									obj.flag = true;
									obj.activeFlag = true;
									obj.precentProgress = 100;
			    					list.push(obj);
			    					this.$set(this.allContentList, "", list);
			    				} else {
			    					uni.showToast({
			    						title: obj.msg,
			    						icon: 'none'
			    					})
			    				}
			    			}
			    		})
						uper.onProgressUpdate((e)=>{
							console.log('e110',e);
							// console.log('this.allContentList[0]',this.allContentList,this.allContentList.length);
							 // let arrayList = [];
							 // arrayList.push(e.progress);
							 // arrayList.forEach((item,index)=>{
								// this.allContentList[this.allContentList.length].precentProgress = item;
							 // })
						})
			    	}
			    })
			},
			//预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src
			    uni.previewImage({
			        current: current,
			        urls: this.imageList
			    })
			},
			delectImage(item,index){
				const _this = this;
				const idData = item.id;
				uni.showModal({
				    title:"提示",
				    content:"是否要删除此图片",
				    success:(res) =>{
				        if(res.confirm){
				           _this.requestPost({
				           	"action": 'deletefile',
				           	"id": idData
				           }).then(response =>{
				           	if(response.data.result == 'suc'){
				           		uni.showToast({
				           			icon:'none',
				           			title:'删除成功'
				           		});
				        		this.$set(this.allContentList[index],'activeFlag',false)
				           	}else{
				           		uni.showToast({
				           			icon:'none',
				           			title:response.data.msg
				           		})
				           	}
				           })
				        }
				    }
				})
			},
			delectVideo(item,index){
				const _this = this;
				const idData = item.id;
			    uni.showModal({
			        title:"提示",
			        content:"是否要删除此视频",
			        success:(res) =>{
			            if(res.confirm){
			               _this.requestPost({
			               	"action": 'deletefile',
			               	"id": idData
			               }).then(response =>{
			               	if(response.data.result == 'suc'){
			               		uni.showToast({
			               			icon:'none',
			               			title:'删除成功'
			               		});
								this.$set(this.allContentList[index],'activeFlag',false)
			               	}else{
			               		uni.showToast({
			               			icon:'none',
			               			title:response.data.msg
			               		})
			               	}
			               })
			            }
			        }
			    })
			},
			toHome(){
				uni.switchTab({
					url:"../home"
				})
			},
			submit(){
				uni.navigateTo({
					url:"./one"
				})
				let ifmContent = encodeURIComponent(this.desc);
				if(!ifmContent){
					uni.showToast({
						icon:'none',
						title: '爆料內容不能為空!',
						duration: 2000
					});
					return;
				}
				let ifmPic = '';
				let ifmPic2 = '';
				let ifmPic3 =  '';
				let usrId = '';
				let showPoster = uni.getStorageSync("data");
				if(showPoster){
					usrId = showPoster.usrId
				}
				let ifmPhone = this.UserInfo.telPhone; 
				let ifmName = encodeURIComponent(this.UserInfo.name);
				this.$Httpps
					.sttp({
							"action": "sendinformation",
							"usrId": usrId,
							"ifmPic": ifmPic,
							"ifmPic2": ifmPic2,
							"ifmPic3": ifmPic3,
							"ifmContent": ifmContent,
							"ifmName": ifmName,
							"ifmPhone": ifmPhone
					})
					.then(res => {
						let data = res.data.msg;
						if(res.data.result == 'suc'){
							uni.showToast({
								icon:'none',
								title: '爆料成功!',
								duration: 2000
							});
							setTimeout(function(){
								uni.switchTab({
									url:'../home'
								})
							},2500)
						}else{
							uni.showToast({
								title:"報錯:"+data,
								icon:'none'
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
	.fuckking {
		width: 100%;
		height: 100%;
	}
	.uploader_video {
		position: relative;
		z-index: 1;
		width: 33.3%;
		height: 250upx;
		padding: 10upx;
		box-sizing: border-box;
	}
	
	.uploader_video>.icon-shanchu {
		position: absolute;
		right: 20upx;
		top: 20upx;
		width: 50upx;
		height: 50upx;
		line-height: 50upx;
		border-radius: 50%;
		background-color: #fa3534;
		text-align: center;
		color: #fff;
		font-size: 26upx;
		z-index: 10;
	}
	
	.video {
		width: 100%;
		height: 100%;
	}
	
	.videoWrap{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: #000000;
	}
	
	.videoPlayImg {
		width: 60upx;
		height: 66upx;
		margin-right: -6upx;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 50%;
		padding: 12upx;
		padding-left: 18upx;
	}
	
	
	.content {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}
	
	.content>.imageUpload-image {
		width: 200upx;
		height: 200upx;
	}
	.selectVideo {
		width: 30%;
		height: 230upx;
		overflow: hidden;
		margin: 10upx;
		background: #f4f5f6;
		position: relative;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}
	
	.selectVideo>.icon-jiahao {
		color: #010101;
	}
	
	.selectVideo>.selectText {
		margin-top: 10px;
		line-height: 20px;
	}
	
	
	
	
	
	.textarea{
		margin-top: 20upx;
		padding: 20upx;
		width: 100%;
		box-sizing: border-box;
	}
	.num{
		width: 100%;
		text-align: right;
		padding-right: 20upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
	}
	.UserInfo{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 25upx 20upx;
		font-size: 36upx;
		border-bottom: 2upx solid #FF3000;
		margin: 20upx ;
		box-sizing: border-box;
	}
	.UserInfo>.icon{
		margin-right: 10upx;
		font-size: 50upx;
		color: #FF3000;
	}
	.UserInfo>input{
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.UserInfo>.line{
		width: 2upx;
		height: 40upx;
		background-color: #FF3000;
		margin: 0 20upx;
	}
	.submitBtn{
		width: 90%;
		margin-left:5%;
	}
	.submitBtn uni-button{
		width: 100%;
		height: 100%;
		margin-top: 80upx;
		color: #FFF2F9;
		border-radius: 100upx!important;
		background-color: #FF3000!important;
	}
</style>
