<template>
	<view class="page" :style="{height: swiperheight + 'px',overflow:'hidden' }">
		<header-top></header-top>
		<scroll-view scroll-y="true" :scroll-top="scrollTop" :style="{height: (swiperheight-120 ) + 'px',marginTop: 0 }"
		 @scroll="scroll">
			<view class="pageTop">
				<view class="title" :style="'font-size:'+titleTwoFontSize" 
				v-html="systemInfolanguage == 'en'?dataList.DatTitleFT:dataList.DatTitle"></view>
				<view class="wrap">
					<view class="nav">
						<view class="navLeft">
							<text>{{systemInfolanguage == 'en'?dataList.DatSourceFT:dataList.DatSource}}</text>
							<text>{{dataList.DatShowDate}}</text>
						</view>
						<!-- <view class="navContent">
							<view class="content">关注</view>
						</view> -->
						<!-- <view class="icon iconfont icon-ren"></view>
						<view class="nav-con">
							<view class="nav-con-tit">澳門頭條</view>
							<view class="nav-con-text">{{dataList.DatShowDate}}</view>
						</view>
						<view class="concern">
							<button :type="isAbout?'default':'warn'" :plain='isAbout' @click="isAbout = !isAbout">{{isAbout?'已关注':'关 注'}}</button>
						</view> -->


						<!-- <text>瀏覽量{{dataList.DatHits}}</text> -->
					</view>
					<!-- <view class="care" @click="changeCare()" :class="changeCare?">
						<view class="care_text">{{changeCare?care:cancelCare}}</view>
					</view> -->
				</view>
				<!-- <view id="content" @tap='tapContent' :style="'font-size:'+oneFontSize"
				 v-html="systemInfolanguage=='en'?dataList.DatSourceFT:dataList.DatSource" ></view> -->
				 <view v-if="systemInfolanguage=='en'" id="content" @tap='tapContent' :style="'font-size:'+oneFontSize"
				  v-html="dataList.DatContentFT" ></view>
				 <view v-else id="content" @tap='tapContent' :style="'font-size:'+oneFontSize" v-html="dataList.DatContent"></view>
				<view class="iconAndText" @click="togle()">
					<!-- @click="togle()" -->
					<view class="share">
						<image src="../../static/logo/share.png" mode="widthFix"></image>
					</view>
					<view class="share_text">分享有賞</view>
					<!-- <view class="left" :class="dataList.DatUsrFav==1?'activeIcon':''" @tap='storeTap(dataList.DatUsrFav==1)'>
						<view class="iconfont">&#xe859;</view>
						<view :class="dataList.DatUsrFav==1?'activeIcon':''" class="text">收藏</view>
					</view> -->
					<!-- <view class="right">
						<view class="iconfont">&#xe601;</view>
						<view class="text">举报</view>
					</view> -->
				</view>
				<view :class="[keyText.length > 0? 'textList' : 'disshow' ]">
					<view :class="[item != ''? 'textListItem' : 'disshow' ]" v-for="(item,index) in keyText" :key='index' @tap="toSearchPage(item)"
					 v-html="item">

					</view>
				</view>
				<view class="footer">
					{{i18n.newsDetailsStatement}}
				</view>
			</view>

			<view class="line"></view>
			<view class="relatedNews" v-show="dataList.Data !=''">
				<view class="relatedNews-line"></view>
				<view class="relatedNews-text">相關新聞</view>
				<view class="relatedNews-line"></view>
			</view>
			<view class="relatedNewsList" v-show="dataList.Data !=''">
				<view class="relatedNewsBox" v-for="(item,index) in dataList.Data" @tap="toItem(item)">
					<view class="leftText">
						<view class="text" :style="'font-size:'+oneFontSize">
							{{systemInfolanguage=='en'?item.DatTitleFT:item.DatTitle}}
						</view>
						<view style="flex:1;"></view>
						<!-- <view class="PeopleNumbers">
							{{item.DatHits}}次瀏覽
						</view> -->
					</view>
					<view class="rightImg">
						<img :src="item.DatPic" mode="aspectFill">
					</view>
					<view class="dataSource">
						{{systemInfolanguage=='en'?item.DatSourceFT:item.DatSource}}
					</view>
				</view>
			</view>
			<view class="wrapSend">
				<block v-for="(items,index) in sendArray" :key="index">
					<view class="userSend">
						<view class="navImage">
							<image src="../../static/logo/icon.png" mode="aspectFill"></image>
						</view>
						<view class="content">
							<view class="top">
								<view class="userName">{{items.DdsUsrName}}</view>
							</view>
							<view class="centers">{{items.DdsContent}}</view>
							<view class="bottoms" @click="showDeleteDis(index)" v-if="items.DdsUsrId == userInfo.usrId">删除</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>

		<view class="footerTabBar">
			<view class="input" @click="say()">
				<view class="iconfont write">&#xe604;</view>
				<view class="text" style="color: #909090;">{{i18n.newsDetailsSay}}</view>
			</view>
			<view class="iconfont" @tap="commit()">&#xe638;</view>
			<view class="iconfont" @tap='storeTap(dataList.DatUsrFav==1)' style="font-size:44upx ;" :class="dataList.DatUsrFav==1?'activeIcon':''">&#xe859;</view>
			<view class="icon iconfont icon-dianzan1" style="font-size:44upx ;" :class="{giveFiveColor:giveFiveColor==true?'activeIcon':''}"
			 @tap="giveFive()"></view>
			<view class="iconfont" @click="togle()" style="font-size:36upx;padding-top:2upx;">&#xe608;</view>
		</view>
		<view class="animated fadeInUpBig faster sayText" style="border-top: #e0e0e0 1px solid;" v-show="sayText">
			<textarea v-model="userInfo.text" @input='inputSayText' class="textareas" cols="30" rows="10" placeholder="请输入内容"
			 autofocus></textarea>
			<view class="btnList">
				<view class="sendBtn bgRed" @click="cancelText()">
					取消
				</view>
				<view class="sendBtn bgRed" @click="send()">
					發送
				</view>
			</view>
		</view>
		<!-- 分享组件 -->
		<more-share :show="shareshow" @togle='togle'></more-share>
		<u-modal v-model="delDisShow" content="是否删除当前评论?" @confirm="deleteItems()" :show-cancel-button="true"></u-modal>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	import Voice from '../QS-baiduyy/QS-baiduyy.js';
	import moreShare from '../../components/more-share.vue'
	import headerTop from '../../components/headerTop/headerTop.vue'
	import {
		isNeedLogin,
		goLogin,
		appendUserIntegral
	} from '../../utils/index.js'
	export default {
		components: {
			moreShare, //分享组件
			headerTop
		},
		data() {
			return {
				iconsColor: false,
				iconsText: "赞",
				aboutText: '关注',
				dataID: "",
				text: '',
				sayText: false,
				shareshow: false,
				sharedata: {
					title: "",
					url: "",
					titlepic: "",
					shareType: 0,
				},
				giveFiveColor: false,
				type: '',
				list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				dataList: [],
				userInfo: {
					usrId: '',
					usrName: "",
					srcImg: "",
					text: ""
				},
				sendArray: [],
				isAbout: false,
				DatContentFT: '',
				srcList: [],
				swiperheight: 0,
				keyText: [],
				//字體
				titleTwoFontSize: '',
				oneFontSize: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				pageLocation: 0,
				care: '+ 关注',
				cancelCare: "已关注",
				changeCare: true,
				sayTextTitle: '发送',
				numberList: [],
				delDisShow:false,
				delIndex:"",
				videoPlay:'1'
			}
		},
		// updated() {
		// 	let obj = document.getElementById('content');
		// 	let spans = obj.getElementsByTagName('span');
		// 	for( let i=0;i<spans.length;i++ ){
		// 		spans[i].style.fontSize = "18px"
		// 	}
		// },
		onShow() {
			this.shareshow = false;
			uni.setStorageSync('zhuanmengyonlaikan', 1);
			let _this = this;
			this.scrollTop = this.old.scrollTop;
			let dataId = this.dataID;
			let valueObj = uni.getStorageSync("page_location")
			let ScrollTop = valueObj["news" + dataId];
			setTimeout(function() {
				_this.scrollTop = ScrollTop;
			}, 100);
			this.getNewTextList();
			this.changeData(); //切换简繁体
		},
		created() {
			let FontSizeObj = uni.getStorageSync('fontSizeObj');
			console.log(FontSizeObj, 'FontSizeObj');
			this.titleTwoFontSize = FontSizeObj.titleTwoFontSize;
			this.oneFontSize = FontSizeObj.oneFontSize;
			// let obj = document.getElementById('content');
			// let spans = obj.getElementsByTagName('span');
			// for( let i=0;i<spans.length;i++ ){
			// 	spans[i].style.fontSize = oneFontSize
			// }
		},
		computed: {
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		onLoad(data) {
			let showPoster = this.$getStorage("data");
			if (showPoster) {
				this.userInfo.usrId = showPoster.usrId;
				this.userInfo.usrName = showPoster.usrName;
				this.userInfo.srcImg = showPoster.srcImg;
				this.addUserIntegral()
			}
			var itemId = data.item;
			this.dataID = itemId;
			this.getNewsDetail();
			this.getPageHeight();
		},
		methods: {
			//切换简繁体
			changeData() {
				const system_info = uni.getStorageSync('system_info');
				system_info.language === 'en' ? system_info.language = this._i18n.locale = 'zh_CN' : system_info.language = this._i18n
					.locale = 'en';
				system_info.language === 'en' ? this.systemInfolanguage = 'zh_CN' : this.systemInfolanguage = 'en';
			},
			// async broadcast(){
				// var data = 99;
				// let contentData = this.dataList.DatContentFT;
				// let totalUrl = contentData.replace(/<[^<>]+>/g,'').replace(/(&rdquo;|&ldquo;)/ig,'');
				// const audio = await Voice({
				// 	voiceSet: {
				// 		tex: totalUrl
				// 	},
				// 	returnAudio: true
				// })
				// if(this.videoPlay == '1'){
				// 	audio.play();
				// 	this.videoPlay = '2'
				// }else if(this.videoPlay == '2'){
				// 	Voice.pause()
				// }
				
				
				// console.log('audio',audio)
				// if(this.videoPlay == '1'){
				// 	audio.play();
				// 	this.videoPlay = '2'
				// }else if(this.videoPlay == '2'){
				// 	console.log('hhc2');
				// }
				
				// let contentData = this.dataList.DatContentFT;
				// let totalUrl = contentData.replace(/<[^<>]+>/g,'').replace(/(&rdquo;|&ldquo;)/ig,'');
				// const audio = await Voice({
				// 	voiceSet: {
				// 		tex: totalUrl,
				// 		per:1
				// 	},
				// 	returnAudio: false
				// })
				// audio.onPlay(()=>{
				// 	console.log('音频开始播放了')
				// })
				// audio.play();
			// },
			showDeleteDis(index){
				this.delIndex = index;
				this.delDisShow =  true;
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.screenHeight;
						this.swiperheight = height;
					}
				});
			},
			inputSayText(event) {
				console.log(event.detail)
				if (event.detail.cursor > 0) {
					this.sayTextTitle = '发送'
				} else {
					this.sayTextTitle = '取消'
				}
			},
			scroll(e) {
				let num = Math.floor(e.detail.scrollTop);
				let dataId = this.dataID;
				let obj = uni.getStorageSync('page_location');
				obj['news' + dataId] = num
				uni.setStorageSync("page_location", obj);
			},
			//收藏按钮点击事件
			storeTap(value) {
				if (isNeedLogin()) {
					goLogin('../me/register/register')
					return
				}
				uni.showLoading({})
				if (value) {
					//已收藏了调用取消收藏
					this.cancelStoreNews()
				} else {
					//还没收藏,调用收藏
					this.storeNews()
				}
			},
			//增加用户积分
			addUserIntegral() {
				let params = {
					userId: this.userInfo.usrId,
					integral: 'read'
				}
				appendUserIntegral(params)
			},
			//收藏
			storeNews() {
				uni.request({
					url: this.serverUrl,
					dataType: 'json', //默认 json格式
					data: {
						"action": "savefav",
						"type": "1",
						"datId": this.dataID,
						"usrId": this.userInfo.usrId,
					},
					success: (res) => {
						uni.hideLoading()
						if (res.data.result == 'suc') {
							uni.showToast({
								title: '收藏成功',
								icon: 'none',
								position: "bottom"
							})
							this.$set(this.dataList, "DatUsrFav", "1")
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
							})
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},

			//取消收藏
			cancelStoreNews() {
				uni.request({
					url: this.serverUrl,
					dataType: 'json', //默认 json格式
					data: {
						"action": "cancelfav",
						"type": "1",
						"datId": this.dataID,
						"usrId": this.userInfo.usrId,
					},
					success: (res) => {
						uni.hideLoading()
						if (res.data.result == 'suc') {
							uni.showToast({
								title: '取消收藏成功',
								icon: 'none',
								position: "bottom"
							})
							this.$set(this.dataList, "DatUsrFav", "0")
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
							})
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			// 点赞/取消点赞
			giveFive() {
				let me = this;
				if (this.userInfo.usrId) {
					if (this.giveFiveColor === true) {
						this.giveFiveColor = false;
						this.$Httpps
							.sttp({
								"action": "cancelfav",
								"type": "0",
								"datId": me.dataID,
								"usrId": this.userInfo.usrId,
							})
							.then(res => {
								uni.showToast({
									icon: 'none',
									title: '取消点赞'
								})
							}).catch(err => {
								console.log(err);
						})
					} else {
						this.giveFiveColor = true;
						this.$Httpps
							.sttp({
								"action": "savefav",
								"type": "0",
								"datId": me.dataID,
								"usrId": this.userInfo.usrId,
							})
							.then(res => {
								uni.showToast({
									icon: 'none',
									title: '点赞成功'
								})
							}).catch(err => {
								console.log(err);
						})
					}
				} else {
					uni.navigateTo({
						url: "/pages/me/register/register"
					})
				}
			},
			getNewsDetail() {
				let paramsObj = {
					"action": "getdatadetail",
					"datId": this.dataID
				}
				if (this.userInfo.usrId) {
					paramsObj.UsrId = this.userInfo.usrId
				}
				this.$Httpps
					.sttp(paramsObj)
					.then(res => {
						let list;
						try{
							list = eval(res.data);
						}catch(e){
							list = JSON.parse(res.data)
						}
						this.dataList = list;
						console.log('this.dataList110hhc',this.dataList)
						this.DatContentFT = this.dataList.DatContentFT;
						this.keyText = (this.dataList.DatKeywordsFT).split(' ');
						uni.setStorageSync('giveShareNewsItem',list)
						this.resetDatContentFT()
					}).catch(err => {
						console.log(err);
					})
			},
			//对v-html渲染的数据源进行二次操作
			resetDatContentFT() {
				var contentData = "";
				if(this.systemInfolanguage=='en'){
					contentData = this.dataList.DatContentFT.replace(/amp;/g,'');
				}else{
					contentData = this.dataList.DatContent.replace(/amp;/g,'');
				}
				var index = contentData.indexOf('<img'); // 字符出现的位置
				if (index == '-1') return
				let imgIndexList = []
				contentData = contentData.slice(0, index + 4) + ' class="tapImg" ' + contentData.slice(index + 4)
				let srcStart = contentData.indexOf('src="')
				let srcList = []
				let srcLink = contentData.slice(srcStart + 5).slice(0, (contentData.slice(srcStart + 5)).indexOf('"'))
				srcList.push(srcLink) + 5
				while (index !== -1) {
					srcStart = contentData.indexOf('src="', srcStart + 4)
					if (srcStart != -1) {
						srcLink = contentData.slice(srcStart + 5).slice(0, (contentData.slice(srcStart + 5)).indexOf('"'))
						srcList.push(srcLink)
					}
					imgIndexList.push(index)
					index = contentData.indexOf('<img', index + 4); // 从字符串出现的位置的下一位置开始继续查找
					if (index != -1) {
						contentData = contentData.slice(0, index + 4) + ' class="tapImg" ' + contentData.slice(index + 4)
					}
				}
				this.srcList = srcList;
				if(this.systemInfolanguage=='en'){
					this.dataList.DatContentFT= contentData;
				}else{
					this.dataList.DatContent = contentData
				}
			},
			//监听tap事件
			tapContent(event) {
				for (var i = 0; i < this.srcList.length; i++) {
					if (i == 0) {} else {
						if (this.srcList[i - 1] == this.srcList[i]) {
							this.srcList.splice(i, 1)
							break
						}
					}
				}
				var yTop = event.detail.y
				uni.createSelectorQuery().selectAll('.tapImg').fields({
					size: true,
					rect: true,
				}, res => {
					for (var i = 0; i < res.length; i++) {
						if (yTop > res[i].top && yTop < (res[i].top + res[i].height)) {
							uni.previewImage({
								current: i,
								urls: this.srcList,
								longPressActions: {
									itemList: ['保存到相冊'],
									itemColor: '#0281ff',
									success: data => {
										console.log('选中了第', data, '个按钮,第' + (data.index + 1) + '张图片');
										this.saveImgToLocal(data.index)
										uni.showLoading({
											title: '保存中...'
										})
									},
								},
								indicator: "number"
							})
						}
					}
				}).exec(() => {})
			},
			saveImgToLocal(index) {
				uni.downloadFile({
					url: this.srcList[index], //图片地址
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失敗",
										icon: "none"
									});
								}
							});
						}
					}
				})
			},
			//评论
			commit() {
				let datTitle = this.dataList.DatTitle;
				let sendArray = this.sendArray;
				let userId = this.userInfo.usrId;
				if (this.sendArray == undefined) {
					uni.showToast({
						icon: 'none',
						title: '当前尚未评论'
					})
				};
				uni.navigateTo({
					url: "../commit/commit?datTitle=" + datTitle + "&sendArray=" + encodeURIComponent(JSON.stringify(sendArray)) +
						"&length=" + sendArray.length + "&userId=" + userId
				})
			},
			//关注
			aboutNews() {

			},
			// 点赞
			icons(i) {
				if (this.sendArray[i].iconsText == "赞" && this.sendArray[i].iconsColor == false) {
					this.sendArray[i].iconsText = "1";
					this.sendArray[i].iconsColor = true;
				} else {
					this.sendArray[i].iconsText = "赞";
					this.sendArray[i].iconsColor = false;
				}
			},
			// 删除
			deleteItems() {
				let i = this.delIndex;
				this.requestPost({
					"action":"deldiscuss",
					"usrId":this.userInfo.usrId,
					"ddsId":this.sendArray[i].DdsId,
					"datId":this.sendArray[i].DdsDatId,
				}).then(response =>{
					if(response.data.result == 'suc'){
						uni.showToast({
							icon:'none',
							title:'删除成功!',
							position:"bottom"
						})
						this.getNewTextList();
					}else{
						uni.showToast({
							icon:'none',
							title:response.data.msg
						})
					}
				})
			},
			cancelText() {
				this.sayText = false;
			},
			send() {
				if (!this.userInfo.text) {
					this.sayText = false;
					return;
				}
				let that = this;
				let paramsObj = {
					"action": "savediscuss",
					"datId": this.dataID,
					"usrId": this.userInfo.usrId,
					"content": encodeURIComponent(this.userInfo.text)
				}
				this.$Httpps
					.sttp(paramsObj)
					.then(res => {
						console.log('评论事件的回调', paramsObj, res)
						if (res.data.result == 'suc') {
							uni.showToast({
								title: '评论成功',
								icon: 'none',
								position: "bottom"
							})
							let params = {
								userId: that.userInfo.usrId,
								integral: 'discuss'
							}
							appendUserIntegral(params)
						}else{
							if(res.data.result == 'fail'){
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									position: "bottom"
								})
							}
						}
						that.getNewTextList();

					}).catch(err => {
						console.log(err);
					})
				this.userInfo.text = '';
				this.sayText = false;
			},
			//获取新闻评论列表 
			getNewTextList() {
				let me = this;
				this.$Httpps
					.sttp({
						"action": "getdiscuss",
						"datId": this.dataID,
						"page": 1
					})
					.then(res => {
						me.sendArray = res.data.data;
					}).catch(err => {
						console.log(err);
				})
			},
			say() {
				if (this.userInfo.usrId) {
					this.sayTextTitle = '取消'
					this.sayText = true;
				} else {
					uni.navigateTo({
						url: "/pages/me/register/register"
					})
				}

			},
			toSearchPage(value) {
				uni.navigateTo({
					url: "../search/search?Name=" + value + '&ID=' + this.dataID
				})
			},
			toItem(item) {
				var item = item.DatId;
				uni.navigateTo({
					url: '../getdatadetail/getdatadetail?item=' + item
				});
			},
			togle() {
				this.shareshow = !this.shareshow;
			}
		}
	}
</script>

<style scoped>
	.bagRed {
		background: red;
		color: #FFFFFF;
	}

	.cancelRed {
		background: #FFFFFF;
		color: #CCCCCC;

	}

	.disshow {
		display: none;
	}

	.page {
		position: relative;
	}

	.uni-scroll-view {
		position: absolute;
		top: 80upx;
		left: 0;
	}

	/* 点赞 */
	.giveFiveColor {
		color: red;
	}

	.wrapSend {
		width: 100%;
	}

	.bgColor {
		color: red !important;
	}

	.userSend {
		width: 100%;
		padding: 14upx 20upx;
		border-bottom: 1px solid #e3e3e3;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		box-sizing: border-box;
	}

	.userSend>.navImage {
		width: 76upx;
		height: 76upx;
		margin-right: 20upx;
	}

	.userSend>.navImage uni-image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.userSend>.content,
	.userSend>.content>.top {
		width: 600upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 20upx;
	}

	.userSend>.content>.top {
		flex-direction: row;
	}

	.userSend>.content>.top>.icons {
		display: flex;
		flex-direction: row;
	}

	.userSend>.content>.top>.icons>.icon {
		font-size: 50upx;
	}

	.userSend>.content>.centers {
		text-align: left;
		font-family: 'PingFangSC', 'STHeiti', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
	}

	.userSend>.content>.bottoms {
		margin-top: 20upx;
		font-size: 28upx;
		color:#000ccc ;
	}

	.userSend>.content>.top>.userName {
		color: rgba(84, 100, 125);
	}

	/* userSend  end */
	.pageTop {
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.title {
		font: normal 22px/200% "Microsoft Yahei";
		color: #0f0f0f;
		font-weight: bold;
		letter-spacing: 1upx;
		line-height: 70upx;
		text-align: justify;
		text-justify: inter-word;
	}

	.wrap {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.wrap>.care {
		display: flex;
		width: 20%;
		margin-top: 20upx;
		flex-direction: row;
		height: 60upx;
		line-height: 60upx;
		border-radius: 50px;
		text-align: center;
		border: 1px solid red;
	}

	.care>.care_text {
		width: 100%;
		text-align: center;
	}

	.nav {
		width: 100%;
		height: 90upx;
		display: flex;
		flex-direction: row;
		line-height: 90upx;
		margin-top: 10upx;
		font-size: 26upx;
	}

	.navLeft {
		flex: 1;
	}

	.navContent {
		flex: 1;
		height: 100%;
	}

	.navContent>.content {
		margin-left: 68%;
		width: 30%;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32upx;
		background-color: red;
		border-radius: 50upx;
	}

	.navLeft text {
		color: #9c9c9c;
		margin: 0 10upx;
	}

	.nav>.icon {
		font-size: 50upx;
		margin: 0 20upx;
	}

	.nav-tit {
		float: left;
		width: 15%;
		text-align: left;
		font-size: 80upx;
	}

	.nav-con {
		float: left;
		width: 60%;
	}

	.nav-con>.nav-con-tit {
		width: 100%;
		font: normal 16px/200% "Microsoft Yahei";
		color: #0f0f0f;
		font-weight: bold;
		text-align: left;
		height: 60upx;
		line-height: 60upx;
	}

	.nav-con>.nav-con-text {
		width: 100%;
		height: 50upx;
		color: #adadad;
		text-align: left;
		line-height: 50upx;
		font-size: 26upx;
	}

	.concern {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 10;
		float: left;
	}

	.concern>button {
		/* background: #f5663c; */
		margin-top: 20upx;
		height: 55upx;
		line-height: 55upx;
		font-size: 28upx;
		padding: 0;
		width: 120upx;
	}

	uni-button {
		padding-left: 0px;
		padding-right: 0px;
		font-size: 18px;
	}

	#content {
		font-size: 36upx;
		text-align: left;
		width: 100vw;
	}

	#content {
		width: 100%;
		padding: 0 10upx;
	}

	#content /deep/ p {
		font: normal "Microsoft Yahei";
		color: #0f0f0f;
		letter-spacing: 1upx;
		line-height: 60upx;
		text-align: justify;
		text-justify: inter-word;
	}

	#content /deep/ p a {
		display: block;
		width: 100%;
		background-color: rgba(127, 127, 127, .6);
		color: #fff;
		text-decoration: none;
	}

	#content /deep/ img,
	#content /deep/ p img,
	#content /deep/ p a img {
		display: block;
		width: 100% !important;
		height: auto !important;
	}

	#content /deep/ p {
		margin-bottom: 30upx;
	}

	.iconAndText {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		margin-top: 50upx;
		margin-left: 300upx;
		line-height: 80upx;
	}

	/*分享有赏*/
	.iconAndText>.share {
		width: 80upx;
		height: 80upx;
	}

	.iconAndText>.share>image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.iconAndText>.left,
	.iconAndText>.right {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		width: 140upx;
	}

	.share_text {
		text-align: right;
		font-size: 24upx;
		margin-top: -26upx;
	}

	.left>.text,
	.right>.text {
		letter-spacing: 2upx;
		color: #acacac;
		font-size: 28upx;
		margin-left: 10upx;

	}

	.left>.iconfont {
		font-size: 50upx;
		line-height: 80upx;
	}

	.right>.iconfont {
		font-size: 36upx;
	}

	.textList {
		width: 100%;
	}

	.textListItem {
		display: inline-block;
		margin-right: 20upx;
		font-size: 12px;
		color: #000;
		letter-spacing: 2upx;
		border-radius: 6upx;
		padding: 10upx 20upx;
		max-width: 100%;
		box-sizing: border-box;
		background-color: #f2f5fa;
		white-space: nowrap;
		overflow-x: hidden;
	}

	.footer {
		margin-bottom: 20upx;
		margin-top: 10upx;
		font-size: 24upx;
		letter-spacing: 4upx;
		text-align: justify;
		text-justify: inter-word;
		line-height: 40upx;
		color: #ACACAC;

	}


	.line {
		width: 100%;
		height: 20upx;
		background-color: #f2f5fa;
	}

	.relatedNews {
		width: 80%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		margin-left: 10%;
		line-height: 80upx;
		background-color: #eeeeee;
		margin-bottom: 100upx;
	}

	.relatedNews-line {
		float: left;
		width: 25%;
		height: 4upx;
		padding: 0 40upx;
		margin-top: 38upx;
		box-sizing: border-box;
		background-color: #040404;
	}

	.relatedNews-line:first-child {
		margin-left: 5%;
	}

	.relatedNews-line:last-child {
		margin-right: 5%;
	}

	.relatedNews-text {
		float: left;
		width: 40%;
		color: #010101;
		font-weight: bold;
		text-align: center;
		letter-spacing: 2upx;
	}


	.relatedNewsList {
		width: 100%;
		padding: 20px 20upx;
		box-sizing: border-box;
	}

	.relatedNewsBox {
		position: relative;
		display: flex;
		flex-direction: row;
		width: 100%;
		/* height: 260upx; */
		padding: 20upx;
		border-top: 1px solid #e3e3e3;
	}

	.leftText {
		font-size: 36upx;
		letter-spacing: 2upx;
		width: 56%;
		position: relative;
		height: 100%;
	}

	.leftText>.text {
		width: 100%;
		line-height: 50upx;
		font-size: 32upx;
		letter-spacing: 1upx;
		margin-bottom: 50upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
	   -webkit-box-orient: vertical;
	}

	.rightImg {
		width: 300upx;
		margin-left: 4%;
		height: 240upx;
		border-radius: 20upx;
		overflow: hidden;
	}

	.rightImg>img {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}

	.dataSource {
		position: absolute;
		left: 20upx;
		bottom: 40upx;
		width: 100%;
		height: 20upx;
		font-size: 26upx;
		line-height: 40upx;
		color: #909090;
		text-align: left;
	}

	.PeopleNumbers {
		margin-top: 40upx;
		width: 100%;
		height: 50upx;
		font-size: 30upx;
		text-align: right;
	}

	.footerTabBar {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		position: absolute;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		bottom: 0;
		z-index: 99;
		border-top: 1px solid #eeeeee;
		background-color: #fff;
		padding-right: 20px;
		box-sizing: border-box;
	}

	.footerTabBar>.input {
		position: relative;
		float: left;
		width: 390upx;
		height: 50upx;
		margin-left: 10upx;
		margin-right: 20upx;
		margin-top: 16upx;
		border: 1px solid #C8C7CC;
		border-radius: 10upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.footerTabBar>.input>.write {
		position: absolute;
		left: 20upx;
		top: -14upx;
		font-size: 40upx;
	}

	.footerTabBar>.input>.text {
		position: absolute;
		right: 165upx;
		top: -18upx;
		font-size: 32upx;

	}

	.uni-input-wrapper {
		padding-left: 40upx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.uni-input-placeholder {
		left: 50upx !important;
	}

	.footerTabBar>.iconfont {
		float: left;
		width: 9%;
		margin-top: 4upx;
		text-align: center;
		font-size: 40upx;
	}

	/* 发表评论 */
	.sayText {
		position: fixed;
		bottom: 80upx;
		left: 0;
		padding: 0 30upx;
		padding-bottom: 10upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}

	.sayText>.textareas {
		width: 100%;
		height: 200upx;
		margin: 10upx 20upx;
		padding-left: 10upx;
		padding-top: 10upx;
		background-color: #F5F5F5;
		border-radius: 20upx;
		box-sizing: border-box;
	}

	.sayText .btnList {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 100%;
	}

	.sayText .sendBtn {
		width: 25%;
		height: 65upx;
		text-align: center;
		font-size: 36upx;
		line-height: 60upx;
		border-radius: 20upx;
		background-color: #ff3000;
		color: #fff;
	}

	.btnList uni-view:nth-of-type(1) {
		margin-right: 20upx;
	}

	.sayText .sendBtn:nth-of-type(1) {
		background-color: #C8C8C8;
	}

	/* 底部分享 */
	.uni-share {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #fff;
	}

	.uni-share-title {
		line-height: 60rpx;
		font-size: 24rpx;
		padding: 15rpx 0;
		text-align: center;
	}

	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 15px;
	}

	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		width: 200rpx;
	}

	.uni-share-content-image {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		overflow: hidden;
		border-radius: 10rpx;
	}

	.content-image {
		width: 60rpx;
		height: 60rpx;
	}

	.uni-share-content-text {
		font-size: 26rpx;
		color: #333;
		padding-top: 5px;
		padding-bottom: 10px;
	}

	.uni-share-btn {
		height: 90rpx;
		line-height: 90rpx;
		font-size: 14px;
		border-top-color: #f5f5f5;
		border-top-width: 1px;
		border-top-style: solid;
		text-align: center;
		color: #666;
	}

	.bgRed {
		background-color: #ff3000 !important;
	}

	.activeIcon {
		color: #f5663c !important;
	}
</style>
