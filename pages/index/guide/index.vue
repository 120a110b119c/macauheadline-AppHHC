<template>
	<view class="pages" :style="{height: swiperheight + 'px' }" :class="{guideAnimate:showtrue}">
		<view :class="[model == 1 ? 'screenImages' : 'images' ]">
			<image :src="pic" @click="toSiderPage"  :class="[imageListShow == true ? 'disshow' : '' ]"   />
			<swipter-item @child-event="parentEvent" :class="[imageListShow == true ? '' : 'disshow' ]" :imageList="imageList" :duration="duration"
			 :interval="interval"></swipter-item>
		</view>
		<view :class="[model == 1 ? 'disshow' : 'login-bottom' ]">
			<image src="../../../static/openPage/careImage.png" mode="aspectFit"></image>
		</view>
		<view class="time" @click="out">
			<view>{{nums}}</view>
		</view>
	</view>
</template>

<script>
	import swipterItem from './swipterItem.vue'
	var timer = null;
	export default {
		data() {
			return {
				index:0,
				nums: '',
				requestImg: '',
				url: '',
				showtrue: false,
				swiperheight: 0,
				pic: '',
				picUrl: "",
				model: 0, //广告模式1:全屏;0:带logo
				toSiderUrl: '', //跳转外部链接的url
				interval: 2000,
				duration: 500,
				userCity: 0,
				imageList: [],
				imageListShow: false,
				datDetailId:'',
				trunOutTimer: false
			}
		},
		components: {
			swipterItem
		},
		onShow() {
			uni.setStorageSync("page_location",{});
			this.model = uni.getStorageSync('openAdvImgModel')
			console.log('看看这个model类型',this.model)
			this.getPageHeight();
			// this.getUserCity(); //获取用户当前在大陆还是澳門
			this.getInfo();//获取开屏广告
			//如果重开,视频未连接WLAN提示打开
			uni.setStorage({
			    key: 'networkTypeModel',
			    data:1
			});
			this.changeGide();//符合条件重启定时器
			this.datDetailId = uni.getStorageSync("datDetailId")
			if(this.datDetailId){
				this.goNewsDetail(this.datDetailId)
				uni.removeStorage({
					key:"datDetailId"
				})
			}
			this.setTime();
		},
		onLoad(){
			this.getLocalImg();
		},
		onReady() {
			this.goToInstall();
		},
		methods: {
			setTime(){
				this.trunOutTimer = false;
				setTimeout(()=>{
					this.trunOutTimer = true;
				},3000)
			},
			//接受子组件传过来的参数值并且停止定时器
			parentEvent(data){
				if( data ){
					clearInterval(timer);
					this.index = data;
				}
			},
			changeGide(){
				let index = this.index;
				if( index === '999' ){
					this.goToGuide()
				}else{
					return;
				}
			},
			getLocalImg(){
				this.model = uni.getStorageSync('openAdvImgModel');
				let picObj = uni.getStorageSync('picAdvImgUrl');
				if(picObj.pic){
					this.imageList.push({
						pic: picObj.pic,
						url: picObj.url
					})
					this.pic = picObj.pic;
					this.picUrl = picObj.url
				}
				let pic2Obj =  uni.getStorageSync('pic2AdvImgUrl');
				if(pic2Obj.pic){
					this.imageList.push({
						pic: pic2Obj.pic,
						url: pic2Obj.url
					})
				}
				let pic3Obj = uni.getStorageSync('pic3AdvImgUrl');
				if(pic3Obj.pic){
					this.imageList.push({
						pic: pic3Obj.pic,
						url: pic3Obj.url
					})
				}
				console.log('到底是什么?',picObj,pic2Obj,pic3Obj)
				if(!picObj && !pic2Obj && !pic3Obj){
					this.out()
					return ;
				}
				let opevAdvFileImgList = [picObj,pic2Obj,pic3Obj]
				uni.setStorage({
					key:'opevAdvFileImgList',
					data:opevAdvFileImgList
				})
				if (this.imageList.length > 1) {
					this.imageListShow = true
				} else {
					this.imageListShow = false
				}
			},
			saveLocalImg(imgUrl,name,url){
				uni.downloadFile({
					url: imgUrl,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveFile({
								tempFilePath:res.tempFilePath,
								success: (saveImgres) => {
									let dataObj = {
										pic:saveImgres.savedFilePath,
										url:url
									}
									uni.setStorage({
										key:(name+'AdvImgUrl'),
										data:dataObj,
										success:(res)=> {
											console.log('成功存进session',dataObj,res)
										},
										fail: (res) => {
											console.log('失败',res)
										}
									})
								}
							})
						}
					}
				});
			},
			// getUserCity() {
			// 	let me = this;
			// 	uni.getLocation({
			// 		type: 'wgs84',
			// 		geocode: true,
			// 		success: function(res) {
			// 			try{
			// 				if (res.address.cityCode == '00853') {
			// 					me.userCity = 1;
			// 					me.getInfo();
			// 				} else {
			// 					me.userCity = 2;
			// 					me.getInfo();
			// 				}
			// 			}catch{
			// 				console.log('获取位置信息有报错,我来到了catch方法');
			// 				me.userCity = 0;
			// 				me.getInfo()
			// 			}
			// 		},
			// 		fail: function(res) {
			// 			me.userCity = 0;
			// 			me.getInfo();
			// 		}
			// 	})
			// },
			//获取开屏广告
			getInfo() {
				let me = this;
				me.$Httpps
					.sttp({
						"action": "getindexadv",
						"city": this.userCity
					})
					.then(res => {
						uni.setStorage({
							key:'openAdvImgModel',
							data:res.data.mode
						})
						if (res.data.pic != '') {
							this.saveLocalImg(res.data.pic,'pic',res.data.url)
						}
						// if (res.data.pic2 != '') {
						// 	this.saveLocalImg(res.data.pic2,'pic2',res.data.url2)
						// }
						// if (res.data.pic3 != '') {
						// 	this.saveLocalImg(res.data.pic3,'pic3',res.data.url3)
						// }
						//清楚之前的图二和图三
						try{
							uni.removeStorage({
								key:"pic2AdvImgUrl"
							})
							uni.removeStorage({
								key:"pic3AdvImgUrl"
							})
						}catch(e){
						}
						if(res.data.pic == '' && res.data.pic2 == '' && res.data.pic3 == ''){
							this.delAllLocalImg();
						}
						if (me.imageList.length > 1) {
							me.imageListShow = true
						} else {
							me.imageListShow = false
						}

					}).catch(err => {
						console.log(err);
					});
			},
			//去掉本地缓存下来的所有的广告
			delAllLocalImg(){
				console.log("由于线上没有广告了,所以我要高速本地,全部都清掉广告")
				uni.removeStorage({
					key:"picAdvImgUrl"
				})
				uni.removeStorage({
					key:"pic2AdvImgUrl"
				})
				uni.removeStorage({
					key:"pic3AdvImgUrl"
				})
			},
			//点击跳转外部h5页面
			toSiderPage() {
				let _this = this;
				let toSiderUrl = this.picUrl;
				if(toSiderUrl){
					_this.index = '999';
					clearInterval(timer);
					uni.navigateTo({
						url: "../../lift/UrlDeatils/UrlDeatils?val=" + toSiderUrl
					})
				}else{
					return;
				}
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight;
						this.swiperheight = height;
					}
				});
			},
			//安装广告的逻辑处理
			goToInstall() {
				var _me = this;
				uni.getStorage({
					key: 'stkeys',
					success: () => {
						if( uni.getStorageSync('newTagIndex') ){
							uni.removeStorageSync('newTagIndex');
						}
						if( uni.getStorageSync('newListCache')){
							uni.removeStorageSync('newListCache');
						}
						if( uni.getStorageSync('storage_index')){
							uni.removeStorageSync('storage_index');
						}
						if(!this.datDetailId){
							console.log("有沒有調用這個開始定時器方法")
							_me.goToGuide();
						}
					},
					fail: function(error) {
						uni.setStorage({
							key: 'stkeys',
							data: 'hhh'
						});
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/index/install'
							})
						}, 100);
					}
				});
			},
			goToGuide() {
				this.index = 0;//防止下次重启页面时候调用onshow生命周期方法中的changeGide。
				var _this = this;
				var second = 4; //初始化
				var millisecond = 0; //毫秒
				timer = setInterval(() => {
					millisecond = millisecond + 50;
					if (millisecond >= 1000) {
						millisecond = 0;
						second = second - 1;
					}
					if (second <= 0) {
						clearInterval(timer);
						_this.showtrue = true
						if( uni.getStorageSync('stopJump') != '0' || this.trunOutTimer  ){
							 setTimeout(function() {
							 	uni.switchTab({
							 		url: '/pages/index/home'
							 	})
							 }, 500);
						}
					}
					_this.nums = '跳过' + second;
				}, 50);
			},
			out() {
				clearInterval(timer);
				this.showtrue = true;
				 setTimeout(function() {
				 	uni.switchTab({
				 		url: '/pages/index/home'
				 	})
				 }, 500)
			},
			goNewsDetail(datId){
				clearInterval(timer);
				this.showtrue = true;
				console.log("這裡是新聞id",datId);
				setTimeout(function() {
					uni.reLaunch({
						url: '../../getdatadetail/getdatadetail?item='+datId
					})
				}, 200)
			}
			
		}
	}
</script>

<style scoped>
	@import url("index.css");
</style>
