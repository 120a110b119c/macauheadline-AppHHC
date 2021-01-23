<template>
	<view class="page">
		<!-- <web-view :webview-styles="webviewStyles" src="http://2020.macaoheadline.com/h5/weather/weatherDetail.html"></web-view> -->
		<view class="allBg" :style="'background-image:url('+bgImg+')'">
			<!-- <view class="weather">
				<view class="weaDate">{{weathDate}}</view>
				<view>
					<image src="../static/Headlines/weather/00.png" mode=""></image>
				</view>
				<view class="weaDetail">{{weathDetail}}</view>
				<view class="weaWendu"><text>{{weathWdNow}}℃</text> {{weathWd}}</view>
			</view> -->
			<view class="topImageBox">
				<view class="top">
					<view class="topImage">
						<image :src="TopImage" mode="aspectFill"></image>
					</view>
					<view class="topTemplate">{{todayTemplate}}°</view>
				</view>
				<view class="bottom">
					<view>{{weeks}}</view>
					<view>{{dataTime}}</view>
					<view>{{timer}}</view>
				</view>
				<view style="text-align: center;margin-top: 10upx;">{{todayTemplateText}}</view>
			</view>
		
			
			
			<view class="weatherTrendTitle">
				<view class="line"></view>
				<view style="letter-spacing: 3upx;">壹周天氣走勢圖預覽</view>
			</view>
			<view class="weatherTrend">
				<scroll-view scroll-x="true">
					<view class="scrollView" :style="{width:ComputeWidth+'upx'}">
						<view class="scrollItem" v-for="(item,index) in weatherTrend" :key="index">
							<view>{{item.week}}</view>
							<view class="WeatherImage">
								<image :src="item.srcImage" mode="aspectFill"></image>
							</view>
							<view>{{item.temperature}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="weatherTrendTitle">
				<view class="line"></view>
				<view style="letter-spacing: 3upx;">每日壹語</view>
			</view>
			<view class="dayBibi">{{dayBibi}}</view>
			<view class="weatherTrendTitle">
				<view class="line"></view>
				<view style="letter-spacing: 3upx;">星座</view>
			</view>
			<view class="constellation">
				<view class="constellationImg">
					<image :src="constellationImageSrc" mode="aspectFill"></image>
				</view>
				<view class="constellationName">
					{{constellationTitle}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				todayTemplateText: "",
				TopImage: '', //头部天气图片链接地址
				weeks: '', //星期几
				timer: '', //当前时间:小时+分钟
				dataTime: "",
				todayTemplate: "", //当前温度
				ComputeWidth: 0,
				weatherTrend: [],
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				statusBarHeight: null,
				weathDate: '',
				weathDetail: '',
				weathWdNow: '',
				weathWd: '',
				bgImg: '',
				dayBibi: '',
				constellationImageSrc:"",//星座的图片地址
				constellationTitle:""//星座标题
			}
		},
		onLoad() {
			this.getWeathData()
			this.uniGetPrivider()
		},
		onNavigationBarButtonTap(e) {
			this.share()
		},
		onShow() {
			this.imageWidht();
		},
		methods: {
			imageWidht() {
				this.ComputeWidth = (75 * 7 + 140) * 2;
			},
			getWeathData() {
				var time = new Date();
				let day = time.getDate();
				this.dataTime = (time.getMonth() + 1) + '月' + day + '日'
				var weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
				this.weeks = weekDay[time.getDay()];
				let minute = time.getMinutes();
				minute < 10 ? minute = "0" + "" + minute : ""
				this.timer = time.getHours() + ":" + minute;
				//获取天气信息
				this.$Httpps
					.sttp({
						"action": "getweather"
					})
					.then(res => {
						console.log(res, 'res110');
						
						// 天气走势图逻辑 start
						const _this = this;
						let array = res.data.future;
						array.forEach((val, index) => {
							let src = _this.weatherImage(val.weather_id.fa);
							val.srcImage = src;
						})
						this.weatherTrend = array;
						console.log('天气列表数据',array)
						// 天气走势图逻辑 end
						let response = res.data
						if (response.result == 'suc') {
							this.weathDetail = response.today.weather
							//温度
							this.weathWdNow = response.sk.temp
							this.weathWd = response.today.temperature
							this.bgImg = response.pic_main;
							this.dayBibi = response.today.today_keyword
							this.todayTemplate = res.data.sk.temp
							this.TopImage = _this.weatherImage(response.today.weather_id.fa);
							this.todayTemplateText = response.today.weather;
						} else {
							uni.showToast({
								icon: 'none',
								title: response.msg
							})
						}
						
					  //星座或者图片地址
					  let constellationObject = this.constellation(res.data.today.constellation);
					  this.constellationImageSrc = constellationObject.videoSrc;
					  this.constellationTitle = constellationObject.videoTitle;
					}).catch(err => {
						console.log(err);
					});
			},
			constellation(data) {
				var videoObj = {
					videoSrc:"",
					videoTitle:""
				};
				console.log('data',data);
				switch (data) {
					case "白羊座":
						videoObj.videoSrc =  '../static/Headlines/constellation/01.png';
						videoObj.videoTitle =  '白羊座（Aries）是指出生日期为3月21日~4月20日';
						break;
					case "金牛座":
						videoObj.videoSrc =  '../static/Headlines/constellation/02.png';
						videoObj.videoTitle =  '金牛座（Taurus）是指出生日期为4月21日~5月20日';
						break;
					case "双子座":
						videoObj.videoSrc =  '../static/Headlines/constellation/03.png';
						videoObj.videoTitle =  '双子座（Gemini）是指出生日期为5月21日~6月21日';
						break;
					case "巨蟹座":
						videoObj.videoSrc =  '../static/Headlines/constellation/04.png';
						videoObj.videoTitle =  '巨蟹座（Cancer）是指出生日期为6月22日至7月22日';
						break;
					case "狮子座":
						videoObj.videoSrc =  '../static/Headlines/constellation/05.png';
						videoObj.videoTitle =  '狮子座（Leo）是指出生日期为7月23日~8月22日';
						break;
					case "处女座":
						videoObj.videoSrc =  '../static/Headlines/constellation/06.png';
						videoObj.videoTitle =  '处女座（Virgo）是指出生日期为8月23日~9月22日';
						break;
					case "天秤座":
						videoObj.videoSrc =  '../static/Headlines/constellation/07.png';
						videoObj.videoTitle =  '天平座（Libra）是指出生日期为9月23日~10月23日';
						break;
					case "天蝎座":
						videoObj.videoSrc =  '../static/Headlines/constellation/08.png';
						videoObj.videoTitle =  '天蝎座（Scorpio）是指出生日期为10月24日~11月22日';
						break;
					case "射手座":
						videoObj.videoSrc =  '../static/Headlines/constellation/09.png';
						videoObj.videoTitle =  '射手座（Sagittarius）是指出生日期为11月23日~12月21日';
						break;
					case "摩羯座":
						videoObj.videoSrc =  '../static/Headlines/constellation/10.png';
						videoObj.videoTitle =  '摩羯座（Capricornus）是指出生日期为12月22日~1月19日';
						break;
					case "水瓶座":
						videoObj.videoSrc =  '../static/Headlines/constellation/11.png';
						videoObj.videoTitle =  '水瓶座（Aquarius）是指出生日期为1月20日~2月18日';
						break;
					default:
						videoObj.videoSrc =  '../static/Headlines/constellation/12.png';
						videoObj.videoTitle =  '双鱼座（Pisces）是指出生日期为2月19日—3月20日';
						break;
				}
				return videoObj;
			},
			weatherImage(data) {
				switch (data) {
					case '00':
						return '../static/Headlines/weather/00.png';
						break;
					case '01':
						return '../static/Headlines/weather/02.png';
						break;
					case '02':
						return '../static/Headlines/weather/02.png';
						break;
					case '03':
						return '../static/Headlines/weather/03.png';
						break;
					case '04':
						return '../static/Headlines/weather/03.png';
						break;
					case '05':
						return '../static/Headlines/weather/04.png';
						break;
					case '06':
						return '../static/Headlines/weather/04.png';
						break;
					case '07':
						return '../static/Headlines/weather/03.png';
						break;
					case '08':
						return '../static/Headlines/weather/03.png';
						break;
					case '09':
						return '../static/Headlines/weather/03.png';
						break;
					case '10':
						return '../static/Headlines/weather/03.png';
						break;
					case '11':
						return '../static/Headlines/weather/03.png';
						break;
					case '12':
						return '../static/Headlines/weather/03.png';
						break;
					case '13':
						return '../static/Headlines/weather/04.png';
						break;
					case '14':
						return '../static/Headlines/weather/04.png';
						break;
					case '15':
						return '../static/Headlines/weather/04.png';
						break;
					case '16':
						return '../static/Headlines/weather/04.png';
						break;
					case '17':
						return '../static/Headlines/weather/04.png';
						break;
					case '18':
						return '../static/Headlines/weather/02.png';
						break;
					case '19':
						return '../static/Headlines/weather/03.png';
						break;
					case '20':
						return '../static/Headlines/weather/02.png';
						break;
					case '21':
						return '../static/Headlines/weather/03.png';
						break;
					case '22':
						return '../static/Headlines/weather/03.png';
						break;
					case '23':
						return '../static/Headlines/weather/03.png';
						break;
					case '24':
						return '../static/Headlines/weather/03.png';
						break;
					case '25':
						return '../static/Headlines/weather/03.png';
						break;
					case '26':
						return '../static/Headlines/weather/04.png';
						break;
					case '27':
						return '../static/Headlines/weather/04.png';
						break;
					case '28':
						return '../static/Headlines/weather/04.png';
						break;
					case '29':
						return '../static/Headlines/weather/02.png';
						break;
					case '30':
						return '../static/Headlines/weather/02.png';
						break;
					case '31':
						return '../static/Headlines/weather/02.png';
						break;
					case '53':
						return '../static/Headlines/weather/02.png';
						break;
				}
			},
			// formatData(value){
			// 	return (value > 0 && value < 10) ? '0' + value : value
			// },
			uniGetPrivider() {
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
					},
					fail: (e) => {
						console.log('获取分享通道失败', e);
						uni.showModal({
							content: '获取分享通道失败',
							showCancel: false
						})
					}
				});
			},
			async share() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: 'http://2020.macaoheadline.com/h5/weather/weatherDetail.html',
					title: '天氣-澳門頭條，關心你的關心',
					summary: '',
					imageUrl: this.shareImage,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});

			},
		},
	}
</script>

<style scoped>
	/* 星座样式 */
	.constellation{
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-top: 20upx;
		margin-left: 30upx;
	}
	.constellationImg{
		width: 100upx;
		height: 100upx;
		margin-right: 20upx;
	}
	.constellationName{
		width: 500upx;
		height: 80upx;
		margin-top: 10upx;
	}
	/* 当天天气样式 */
	.topImageBox {
		width: 100%;
		margin-top: 100upx;
		margin-bottom: 40upx;
	}

	.topImageBox>.top {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.topTemplate {
		font-size: 120upx;
	}

	.topImage {
		width: 110upx;
		height: 110upx;
	}

	.bottom {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		font-size: 28upx;
	}

	.bottom>uni-view {
		margin-right: 10upx;
	}

	/* 天气走势图 */
	.weatherTrendTitle {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		margin: 20upx 0 0 20upx;
	}

	.weatherTrendTitle>.line {
		width: 5upx;
		height: 30upx;
		background-color: #85f620;
		margin-right: 20upx;
	}

	.WeatherImage {
		margin-left: 50upx;
		width: 50upx;
		height: 50upx;
	}

	uni-image {
		width: 100%;
		height: 100%;
	}

	.scrollItem {
		display: inline-block;
		margin: 20upx;
		width: 150upx;
		text-align: center;
	}





	.allBg {
		width: 100vw;
		height: 100vh;
		background-size: cover;
		color: white;
		letter-spacing: 1upx;
		overflow: hidden;
		background-repeat: no-repeat;
		position: relative;
		background-position: right;
	}

	.weather {
		background-color: rgba(0, 0, 0, 0.3);
		width: 35vw;
		position: absolute;
		top: 13vh;
		left: 10vw;
		text-align: center;
		border-radius: 2vw;
	}

	.weaDate {
		width: 100%;
		height: 5.5vw;
		font-size: 4vw;
		line-height: 5.5vw;
		margin: 3vw 0;
	}

	.weaDetail {
		font-size: 5vw;
		text-align: center;
		position: relative;
		margin: 3vw 0;
		height: 7vw;
	}

	.weaWendu {
		margin: 3vw 0;
		width: 100%;
		font-size: 3.8vw;
	}

	.weaWendu text {
		font-size: 4.8vw;
		margin-right: 2vw;
	}

	.dayBibi {
		/* position: absolute;
		top: 88vh; */
		margin: 0 5vw;
		margin-top: 2vw;
		font-size: 4.2vw;
	}
</style>
