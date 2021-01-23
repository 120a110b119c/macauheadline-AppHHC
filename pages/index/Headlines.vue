<template>
	<view style="margin-top: 150upx;height:100%">
		<scroll-view scroll-y="true" style="height:100%" scroll-with-animation="true" :scroll-into-view="scrollViewId">
			<view>
			<view class="header">
				<view class="header_left">
					<view class="timer">{{currentTime}}</view>
					<!-- <view class="tit">頭條快訊</view> -->
				</view>
				<view class="header_right">
					<view class="WeatherImage">
						<image :src="weatherIcons" mode="widthFix"></image>
					</view>
					<view>
						{{temperature}}℃ {{weather}}
					</view>
				</view>
			</view>
			<view class="header_image_one">
				<image src="../../static/Headlines/title_one.jpg" mode="widthFix"></image>
				<image src="../../static/Headlines/headerIcon.png" mode="widthFix" class="headerIcon"></image>
			</view>
			<view class="header_image_two">
				<image src="../../static/Headlines/title_two.png" mode="widthFix"></image>
			</view>
			<view class="header_playImage">
				<image src="../../static/Headlines/playImage.gif" mode="widthFix"></image>
			</view>
			<view class="w100">
					<view v-for="(items,index) in contentList" :key="items.id" >
						<view class="contentList_header">
							<view class="circle"></view>
							<view>{{items.Name}}</view>
						</view>
						<view v-for="(item,index) in items.content" :key="item.DatId" :id='"go"+item.DatId'>
							<view class="contentListItem">
								<view class="title">{{systemInfolanguage=='en'?item.DatTitleFT:item.DatTitle}}</view>
								<view class="textCome">來源:{{systemInfolanguage=='en'?item.DatAutherFT:item.DatAuther}}</view>
								<view class="image" v-if="item.DatPic">
									<image :src="item.DatPic" mode="aspectFill" class="WeatherImageSon"></image>
								</view>
								<view class="content">
									{{item.DatContentFT}}...
									<text style="color: red;" @click="toDeatil(item)">详情>>></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			
			<view class="care">
				<view class="care_line"></view>
				<view class="text">
					關心妳的關心
				</view>
			</view>
			<view class="header_playImage">
				<image class="headerPlay" src="../../static/Headlines/headerPlay.gif" mode="widthFix"></image>
			</view>
			<view class="header_bottomImage">
				<image class="headerPlay" src="../../static/Headlines/bottomImage.jpg" mode="widthFix"></image>
			</view>
			<view class="bottom_text">
				識別二維碼 下載APP
			</view>
			<view class="bottom_text">
				了解更多資訊
			</view>
			<view class="registerList">
				<view class="registerListTop">
					<view @click="shareApp">分享到 微信</view>
					<view @click="shareFriend">分享到 朋友圈</view>
				</view>
				<!-- <view class="registerListBottom">分享到 Facebook</view> -->
			</view>
			<!-- <view class="adv_tit">
				<view class="line"></view>
				<view class="circle_list">
					<view>每</view>
					<view>日</view>
					<view>廣</view>
					<view>告</view>
				</view>
				<view class="adv_list">
					<view class="advItem">
						<view>廣告</view>
					</view>
					<view class="advItem">
						<view>廣告</view>
					</view>
				</view>
			</view> -->
			</view>
		</scroll-view>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	import { appendUserIntegral } from '@/utils/index.js'
	export default {
		data() {
			return {
				weatherIcons:'../../static/Headlines/weather/08.png',
				weather:'陣雨',
				temperature:'',
				currentTime: '',
				contentList: [{
					id: 0,
					text: '11111111111111111111111111'
				}, {
					id: 1,
					text: '22222222222222222222222222'
				}, {
					id: 2,
					text: '33333333333333333333333333'
				}],
				itemIndex: 0,
				usrId:'',//分享時候用一下,獲取也放到初始化分享裡面去了
				scrollViewId:'',
				dataId:''
			}
		},
		created() {
			this.getData()
		},
		onLoad(params) {
			this.getTime() // 获取时间
			this.getWeather()//获取温度和天气状况
			this.uniGetPrivider();
			this.dataId = params.datId
		},
		onNavigationBarButtonTap(res){
			console.log("Fuckking",res)
			if(res.type == 'share'){
				this.shareApp()
			}
		},
		onShow() {
			this.changeData(); //切换简繁体
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		methods: {
			//切换简繁体
			changeData() {
				const system_info = uni.getStorageSync('system_info');
				system_info.language === 'en' ? system_info.language = this._i18n.locale = 'zh_CN' : system_info.language = this._i18n
					.locale = 'en';
				system_info.language === 'en' ? this.systemInfolanguage = 'zh_CN' : this.systemInfolanguage = 'en';
			},
			goPoint(value){
				this.$nextTick(()=>{
					uni.createSelectorQuery().select('#go'+value).boundingClientRect(data=>{//目标位置的节点：类或者id
						if(data){
							uni.pageScrollTo({
								  duration: 100,//过渡时间
								  scrollTop:data.top-70 ,//到达距离顶部的top值
							})
						}
					}).exec();
				})
			},
			//分享使用
			uniGetPrivider(){
				uni.getStorage({
				    key: 'data',
				    success:  (res)=> {
						res = res.data;
				        this.usrId = res.usrId;
				    }
				});
				uni.getProvider({
					service: 'share',
					success: (e) => {
						let data = []
						for (let i = 0; i < e.provider.length; i++) {
							switch (e.provider[i]) {
								case 'weixin':
									data.push({
										name: '分享到微信好友',
										id: 'weixin',
										sort: 0
									})
								default:
									break;
							}
						}
						this.providerList = data.sort((x, y) => {
							return x.sort - y.sort
						});
					},
					fail: (e) => {
						uni.showModal({
							content: '获取分享通道失败',
							showCancel: false
						})
					}
				});
			},
			async shareApp(e) {
				var that = this
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: 'http://2020.macaoheadline.com/h5/headNews/home.html',
				    title: '頭條快訊',
				    summary: this.contentList[0].content[0].DatTitleFT,
				    imageUrl: this.shareImage,
				    success:  (res) =>{
				        if(this.usrId){
							let params = {
								userId: that.usrId,
								integral:'friend'
							}
							appendUserIntegral(params)
						}
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			
			},
			async shareFriend(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: 'http://2020.macaoheadline.com/h5/headNews/home.html',
				    title: '頭條快訊',
				    summary: this.contentList[0].content[0].DatTitleFT,
				    imageUrl: this.shareImage,
				    success:  (res) =>{
				        if(this.usrId){
				    		let params = {
				    			userId: that.usrId,
				    			integral:'friend'
				    		}
				    		appendUserIntegral(params)
				    	}
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			getWeather(){
				this.$Httpps
					.sttp({
						"action": "getweather"
					})
					.then(res => {
						const _this = this;
						this.temperature = res.data.sk.temp;
						switch (res.data.today.weather_id.fb) {
							case '00':
								_this.weatherIcons = '../../static/Headlines/weather/00.png';
								_this.weather = '晴天';
								break;
							case '01':
								_this.weatherIcons = '../../static/Headlines/weather/02.png';
								_this.weather = '多雲';
								break;
							case '02':
								_this.weatherIcons = '../../static/Headlines/weather/02.png';
								_this.weather = '陰天';
								break;
							case '03':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '陣雨';
								break;
							case '04':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '陣雨';
								break;
							case '05':
								_this.weatherIcons = '../../static/Headlines/weather/04.png';
								_this.weather = '雷阵雨伴有冰雹';
								break;
							case '06':
								_this.weatherIcons = '../../static/Headlines/weather/04.png';
								_this.weather = '雨夹雪';
								break;
							case '07':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '小雨';
								break;
							case '08':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '中雨';
								break;
							case '09':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '大雨';
								break;
							case '10':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '暴雨';
								break;
							case '11':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '大暴雨';
								break;
							case '12':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '特大暴雨';
								break;
							case '13':
								_this.weatherIcons = '../../static/Headlines/weather/04.png';
								_this.weather = '阵雪';
								break;
							case '14':
								_this.weatherIcons = '../../static/Headlines/weather/04.png';
								_this.weather = '小雪';
								break;
							case '15':
								_this.weatherIcons = '../../static/Headlines/weather/04.png';
								_this.weather = '中雪';
								break;
							case '16':
								_this.weatherIcons = '../../static/Headlines/weather/04.png';
								_this.weather = '大雪';
								break;
							case '17':
								_this.weatherIcons = '../../static/Headlines/weather/04.png';
								_this.weather = '暴雪';
								break;
							case '18':
								_this.weatherIcons = '../../static/Headlines/weather/02.png';
								_this.weather = '雾';
								break;
							case '19':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '冻雨';
								break;
							case '20':
								_this.weatherIcons = '../../static/Headlines/weather/02.png';
								_this.weather = '沙尘暴';
								break;
							case '21':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '小到中雨';
								break;
							case '22':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '中到大雨';
								break;
							case '23':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '大到暴雨';
								break;
							case '24':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '暴雨到大暴雨';
								break;
							case '25':
								_this.weatherIcons = '../../static/Headlines/weather/03.png';
								_this.weather = '大暴雨特大暴雨';
								break;
							case '26':
								_this.weatherIcons = '../../static/Headlines/weather/04.png';
								_this.weather = '小到中雪';
								break;
							case '27':
								_this.weatherIcons = '../../static/Headlines/weather/04.png';
								_this.weather = '中到大雪';
								break;
							case '28':
								_this.weatherIcons = '../../static/Headlines/weather/04.png';
								_this.weather = '大到暴雪';
								break;
							case '29':
								_this.weatherIcons = '../../static/Headlines/weather/02.png';
								_this.weather = '浮尘';
								break;
							case '30':
							    _this.weatherIcons = '../../static/Headlines/weather/02.png';
							    _this.weather = '扬沙';
								break;
							case '31':
								_this.weatherIcons = '../../static/Headlines/weather/02.png';
								_this.weather = '强沙尘暴';
								break;
							case '53':
								_this.weatherIcons = '../../static/Headlines/weather/02.png';
								_this.weather = '霾';
								break;
						}
					}).catch(err => {
						console.log(err);
					});
			},
			toDeatil(item) {
				let DatId = item.DatId;
				uni.navigateTo({
					url: '../getdatadetail/getdatadetail?item=' + DatId
				})
			},
			getData() {
				let _this = this;
				this.$Httpps
					.sttp({
						"action": "getmorningnews"
					})
					.then(res => {
						_this.contentList = res.data.data;
						console.log('_this.contentList',_this.contentList)
						let array = [];
						var obj = {};
						_this.contentList.forEach(item=>{
							array.push({Name:item.DatMdlName,content:[]});
						})
						for( let i=0;i<array.length;i++  ){
							let value = array[i].Name;
							_this.contentList.forEach(item=>{
								if(value == item.DatMdlName){
									array[i].content.push(item)
								}
							})
						}
						array = array.reduce(function(item, next) {
						       obj[next.Name] ? '' : obj[next.Name] = true && item.push(next);
						       return item;
						}, []);
						_this.contentList = array;
						this.goPoint(this.dataId)
					}).catch(err => {
						console.log(err);
				});
			},
			//获取当前时间
			getTime() {
				const _this = this;
				const myDate = new Date();
				const year = myDate.getFullYear(); //年
				const month = myDate.getMonth() + 1; //月
				let day = myDate.getDate(); //日
				let days = myDate.getDay();
				switch (days) {
					case 1:
						days = '週一';
						break;
					case 2:
						days = '週二';
						break;
					case 3:
						days = '週三';
						break;
					case 4:
						days = '週四';
						break;
					case 5:
						days = '週五';
						break;
					case 6:
						days = '週六';
						break;
					case 0:
						days = '週日';
						break;
				}
				const str = year + "年" + month + "月" + day + "日" + "(" + days + ")";
				_this.currentTime = str;
				return _this.currentTime;
			}
		}
	}
</script>

<style scoped>
	.registerList{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		margin-top: 50upx;
		margin-bottom: 50upx;
	}
	.registerListTop{
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: space-around;
	}
	.registerListTop>uni-view:nth-of-type(1){
		width: 45%;
		height: 80upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 80upx;
		background: url('/static/Headlines/registerList_left.jpg')center center no-repeat;
		border-radius: 10upx;
	}
	.registerListTop>uni-view:nth-of-type(2){
		width: 45%;
		height: 80upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 80upx;
		background: url('/static/Headlines/registerList_right.jpg')center center no-repeat;
		border-radius: 10upx;
	}
	.registerListBottom{
		margin-top: 20upx;
		width: 95%;
		height: 80upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 80upx;
		background: url('/static/Headlines/registerList_bottom.jpg') center center no-repeat;
		border-radius: 10upx;
		margin-left: 2.5%;
	}
	
	.WeatherImageSon{
		width: 100%;
		max-height: 300upx;
	}
	.w100 {
		width: 100%;
	}

	uni-image {
		display: block;
		width: 100%;
	}

	.header {
		width: 100%;
		display: flex;
		flex-direction: row;
		font-size: 36upx;
		letter-spacing: 2upx;
		margin-bottom: 10upx;
	}
	
	.header_left{
		display: flex;
		width: 75%;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.header_left>.timer{
		color: #010101;
		font-weight: bold;
		font-size: 46upx;
	}

	.header_right{
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	
	.WeatherImage{
		margin-left: 70upx;
		width: 30%;
	}

	.header_image_one{
		position: relative;
	}
	.header_image_one>.headerIcon{
		width: 12%;
		position: absolute;
		left: 0upx;
		top: 0upx;
	}

	.header_image_one,
	.header_image_two {
		width: 100%;
	}

	.header_image_two {
		margin: 20upx 0;
	}


	/* 國內 */
	.contentList_header {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 40upx;
		color: red;
		font-weight: bold;
		font-size: 36upx;
		margin-left: 30upx;
	}

	.contentList_header>.circle {
		width: 16upx;
		height: 16upx;
		border-radius: 50%;
		background-color: red;
		margin-right: 10upx;
	}

	.contentListItem {
		padding: 20upx;
		box-sizing: border-box;
		margin: 0 30upx;
		margin-top: 20upx;
		border: 2upx solid rgb(28, 70, 230);
	}

	.contentListItem>.content{
		margin: 20upx 0;
		letter-spacing: 2upx;
		text-align:justify;
		text-justify:inter-word;
		line-height: 50upx;
		font-size: 32upx;
		font-family: 'Courier New', Courier, monospace;
	}

	.contentListItem>.title {
		font-size: 36upx;
		color: #010101;
		font-weight: bold;
	}

	.contentListItem>.textCome {
		margin: 20upx 0;
		color: #888888;
	}

	.contentListItem>.image{
		width: 100%;
		height: 100%;
	}
	
	.contentListItem:last-child {
		margin-bottom: 20upx;
	}
	
	.adv_tit{
		position: relative;
		width: 100%;
		margin-top: 100upx;
	}
	.adv_tit>.line{
		width: 100%;
		height: 4upx;
		background-color: rgb(225,38,38);
	}
	.adv_tit>.circle_list{
		position: absolute;
		right: 50upx;
		top: -30upx;
		display: flex;
		flex-direction: row;
	}
	.circle_list>uni-view{
		width: 60upx;
		height: 60upx;
		line-height: 60upx;
		border-radius: 50%;
		color: #FFFFFF;
		font-size: 34upx;
		text-align: center;
		background-color: red;
	}
	
	.adv_list{
		margin: 60upx 0;
		width: 100%;
	}
	.adv_list>.advItem{
		position: relative;
		margin-top: 30upx;
		width: 100%;
		height: 300upx;
		color: #FFFFFF;
		background: linear-gradient(#F15F60, #F56D45);
	}
	.adv_list>.advItem>uni-view{
		position: absolute;
		right: 20upx;
		bottom: 20upx;
		font-size: 36upx;
	}
	
	.care{
		position: relative;
		margin-top: 60upx;
		width: 100%;
		height: 60upx;
	}
	.care>.care_line{
		position: absolute;
		z-index: 99;
		width: 100%;
		border: 3upx dotted red;
	}
	.care>.text{
		position: absolute;
		z-index: 100;
		left: 50%;
		margin-left: -140upx;
		top: -30upx;
		color: red;
		font-weight: bold;
		width: 280upx;
		height: 60upx;
		font-size: 40upx;
		letter-spacing: 3upx;
		background-color: #fff;
		line-height: 60upx;
		text-align: center;
	}
	.header_playImage{
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.header_playImage>.headerPlay{
		width: 5%;
	}
	.header_bottomImage{
		display: flex;
		margin-left: 200upx;
		width: 50%;
	}
	.bottom_text{
		margin-top: 30upx;
		text-align: center;
		font-size: 36upx;
	}
	.bottom_text:last-child{
		margin-bottom: 30upx;
	}
</style>
