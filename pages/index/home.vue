<template>
	<view class="page">
		<view class="version" v-if="versionShow">
			<view class="version-wrap">
				<view class="version-img"></view>
				<view class="version-tit">{{i18n.contentUpdating}}</view>
				<view class="version-content">
					<view class="version-contentLeft" v-html="versionText"></view>
					<view class="version-contentRight"></view>
				</view>
				<view class="version-bottom">
					<view class="btn">
						<button type="warn" @tap="power()">{{i18n.immediatelyUpdating}}</button>
					</view>
					<view class="btn" @tap="getTrue()">
						<button type="primary" class="btns">{{i18n.noUpdating}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="topTitle">
			<!-- <view class="ImageLeft">
				<image src="@/static/logo/logoLeft.png" mode="widthFix"></image>
			</view> -->
			<view class="ImageCenter">
				<image src="@/static/openPage/logo_white.png" mode="widthFix"></image>
			</view>
			<view class="ImageRight" @click="showPullList">
				<view class="icon iconfont" :class="iconChange"></view>
			</view>
		</view>
		<view class="content">
			<view class="swiperMain">
				<view class="swiperHead" style="border-bottom: 2upx solid #e0dcdc;width: 100%;">
					<swiperNavBar :scrollIntoView="scrollIntoView" :swiperTabList='tabBars' :swiperTabIdx='swiperTabIdx'
					 :currentSwiperWidth='currentSwiperWidth' :currentSwiperHeight='currentSwiperHeight' :swiperColor='swiperColor'
					 :swiperCurrentColor='swiperCurrentColor' :systemInfolanguage="systemInfolanguage" v-if=" swiperTabList.length > 1 "
					 @change="CurrentTab">
					</swiperNavBar>
				</view>
			</view>
			<view class="uni-tab-bar" v-show="!imageShow">
				<swiper :style="{height: (swiperheight)  + 'px',overflow:'hidden' }" style="margin-bottom: 0!important;" class="swiper-box"
				 :current="swiperTabIdx" @change="SwiperChange">
					<swiper-item v-for="(items,index) in newslist" :key="index" class="items" style="position: relative;">
						<load-refresh ref="loadRefresh" :heightReduce="10" :backgroundCover="'#F3F5F5'" :pageNo="currPage" :totalPageNo="totalPage"
						 :isRefresh="true" :refreshTime="800" @loadMore="loadMore(index)" @refresh="refresh" style="margin-bottom: '20upx';"
						 :home="home">
							<view slot="content-list" style="position: relative;">
								<view class="weatherClass" @tap="goWeathDetail" :style="'background-image:url('+weatherBgImg+');'" v-if="index == 0">
									<view class="weathDiv" @tap="goWeathDetail">
										<view class="dataS">
											<view class="dataSLeft">
												<span style="text-shadow: 6upx 6upx 6upx grey;">{{dataS}}</span>
											</view>
											<view class="dataSRight">
												<view style="font-size: 26upx;letter-spacing: 3upx;">
													<span style="text-shadow: 6upx 6upx 6upx grey;">{{yearDays}}</span>
												</view>
												<view style="font-size: 24upx;letter-spacing: 3upx;">
													<span style="text-shadow: 6upx 6upx 6upx grey;">{{week}}</span>
												</view>
											</view>
										</view>
										<view class="weatherBox">
											<view class="WeatherImage">
												<image :src="weatherIcons" mode="aspectFill"></image>
											</view>
											<view class="weatherRight">
												<view style="font-size: 26upx;letter-spacing: 3upx;">
													<!-- <span style="text-shadow: 6upx 6upx 6upx grey;">{{skObj.temp}}℃ {{today.ap_index?today.ap_index:'良'}}</span> -->
												</view>
												<view style="font-size: 26upx;letter-spacing: 3upx;">
													<span style="text-shadow: 6upx 6upx 6upx grey;">{{today.weather}}</span>
												</view>
											</view>
										</view>
										<!-- <view class="weathDay">{{yearDays}}{{week}}</view>
										<view style="display: flex;justify-content: space-around;margin: 16upx 0;">
											<text style="font-size: 32upx;">{{today.weather}}</text>
										</view> -->
										<!-- <view style="display: flex;justify-content: center;margin: 14upx 0;">
											<text style="font-size: 32upx;font-weight: 500;">{{skObj.temp}}℃</text> -->
										<!-- <text style="font-size: 26upx;line-height: 54upx;">{{today.temperature}}</text> -->
										<!-- </view> -->
										<!-- <view style="font-size: 28upx;text-align: center;margin: 22upx 0;">
											<text :class="returnWeathL(today.ap_index)" style="padding:4upx 35upx;border-radius: 20upx;">{{today.ap_index?today.ap_index:'良'}}</text>
										</view> -->
										<!-- <view style="font-size: 26upx;text-align: left;margin-top: 20upx;letter-spacing: 3upx;">
											今日幸運星座：{{today.constellation}}
										</view> -->
										<!-- <view class="weathDayBibi">
											{{today.today_keyword}}
										</view> -->
									</view>
								</view>
								<view class="relay">
									<image @click.stop="relayClick('share')" src="../../static/home/relay.png" mode="aspectFill"></image>
								</view>
								<view style="height: 600upx;width:750upx;z-index:1;position: fixed;top: 0;" @tap="goWeathDetail" v-if="index == 0 "></view>
								<view style="position: sticky;z-index: 9;top: 600upx;background-color: white;">
									<template v-for="(newsitem,index2) in items.list">
										<home-item :systemInfolanguage="systemInfolanguage" :svideoData="svideoData" :randomNumber="randomNumber"
										 @changevideoData="changevideoData" :options="newsitem" :tabIndex="index" :showIndex='index2' :numbers="newsitem.isClickMe"
										 @clickItem="tabClick(newsitem,index,index2)"></home-item>
									</template>
								</view>
							</view>
						</load-refresh>
					</swiper-item>
				</swiper>
			</view>
			<view class="dataNullImage is-animate style1" v-show="imageShow">
				<view>澳</view>
				<view>{{i18n.macauHeader}}</view>
				<view>{{i18n.macauDoor}}</view>
				<view>{{i18n.macauBear}}</view>
			</view>
			<custom-cover></custom-cover>
			<view class="iconList" @click="toIconHide" v-show="pullList">
				<view class="iconListWrap" :class="[releaseShow == '2' ? 'play_bottom' : 'play_bottom1' ]">
					<view class="icon iconfont icon-quanxianfuzhi"></view>
					<view class="pullListtems" @click="toSearch">
						<view class="icon iconfont icon-sousuokuang"></view>
						<view>
							搜索
						</view>
					</view>
					<view class="pullListtems" @click="openTab">
						<view class="icon iconfont icon-biaoqing fontSize50"></view>
						<view>
							{{i18n.columnSetUp}}
						</view>
					</view>
					<view class="pullListtems" @tap='shareApp'>
						<view class="icon iconfont icon-fenxiang_2"></view>
						<view>
							分享
						</view>
					</view>
					<view class="pullListtems" @tap="goMedia">
						<view class="release">
							<image src="@/static/openPage/release.png" mode="aspectFill"></image>
						</view>
						<view>
							{{i18n.regular}}
						</view>
					</view>
					<view class="pullListtems" @tap="toTipster()">
						<view class="tfboys">
							<image src="@/static/openPage/tfboys.png" mode="aspectFill"></image>
						</view>
						<view>
							爆料
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal v-model="showUserMsg" title='个人信息保护指引' :show-confirm-button="false" v-if="showUserMsg">
			<view class="modalText" slot='default'>
				{{i18n.xieYiTitle}}：<br />
				1.{{i18n.xieYiOne}}<br />
				2.{{i18n.xieYiTwo}}<br />
				3.{{i18n.xieYiThree}}<br />
				4.您可查看完整版<text class="linkText" @tap='goUserXieyi'>《用戶協議》</text>、<text class="linkText" @tap='goZhengche'>《隱私政策》</text>以便了解我們收集、使用、共享、存儲信息情況与對信息的保護措施。<br />
				<view style="color: #000000;margin-top: 15upx;">如果您同意請點擊下面的按鈕。</view>
				<view class="modalBtn">
					<u-button type="warning" :ripple='true' ripple-bg-color='#3998ff' @click="hideUserMsg">我同意</u-button>
					<u-button type="error" style="margin-top: 20upx;" :ripple='true' ripple-bg-color='#3998ff' @click="btnError">拒绝</u-button>
				</view>
			</view>
		</u-modal>
		<u-mask :show="fareTips" @click="fareTips = false" v-if="fareTips">
			<view class="fareWrap">
				<view style="color: #fff;margin-top: 180upx;padding-left: 80upx;">请点击右下角</view>
				<view style="color: #fff;padding-left: 80upx;">可以发送给指定朋友</view>
				<view style="color: #fff;padding-left: 80upx;">或分享到朋友圈</view>
				<!-- <view style="color: #fff;padding-left: 80upx;">或分享到Facebook</view> -->
			</view>
			<view class="fareImage">
				<image src="@/static/openPage/fareImage.png" mode="aspectFill"></image>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import uniLoadMore from '../../components/uni-load-more.vue'
	import swiperNavBar from "../../components/swiperNavBar.vue" //导航栏标题
	import mySwipter from "./components/mySwipter.vue"
	import homeItem from "./components/home-item.vue"
	const SHORTCUT = uni.requireNativePlugin("XZH-Shortcut");
	import {
		appendUserIntegral,
		goLogin,
		isNeedLogin
	} from '@/utils/index.js'

	export default {
		data() {
			return {
				roundClick: -1,
				svideoData: [],
				home: "home",
				showUserMsg: false,
				weatherIcons: '../../static/Headlines/weather/00.png',
				dataS: "", //号
				yearDays: "", //年月
				week: "", //星期
				releaseShow: true,
				iconChange: 'icon-icon-1',
				pullList: false,
				scrollIntoView: 0,
				swiperTabList: ['导航1', '导航2', '导航3', '导航4', '导航5', '导航6'],
				swiperTabIdx: 0,
				swiperColor: '#343434',
				swiperCurrentColor: '#dc0000',
				currentSwiperWidth: '14%',
				currentSwiperHeight: 70,
				currentSwiperLineShow: true,
				// currentSwiperLineActiveBg: '#f75001',
				// currentSwiperLineActiveWidth: '40rpx',
				// currentSwiperLineActiveHeight: '4rpx',
				// currentSwiperLineAnimatie: 1000,
				spanIndex: [],
				// 版本检测更新 ---start
				versionShow: false, //版本检测更新--判断是否显示
				versionText: '',
				versionUrl: '',
				// 版本检测更新 ---end
				imageShow: false,
				indexTop: 0,
				scrollInto: "",
				tabIndex: 0, // 选中的
				swiperheight: 0,
				screenheight: 0,
				newslist: [],
				tabBars: [{
					MdlName: "头条",
					MdlNameFT: "頭條",
					MdlNo: "00",
					id: 'shu1',
					MdlId: 99999
				}],
				MdlIdArray: [],
				MdlId: 0,
				today: {},
				skObj: {},
				weathBgImg: '', //已废弃背景图
				stopRefhNumber: 0,
				currPage: 1,
				totalPage: 99, // 总页数
				numbersList: [0],
				arrayItem: [],
				timeNumber: 0,
				tabbarNumber: 0,
				weatherBgImg: '',
				itemIndex: 0,
				usrId: '', //分享時候用一下,獲取也放到初始化分享裡面去了
				version: "",
				randomNumber: 0,
				system: '',
				systemInfolanguage: "en",
				currentTextTitle: "", //判斷得知今天是什麼問候語
				fareTips: false,
				pic_dataId: "" //用来存放重大新闻id
			}
		},
		components: {
			uniLoadMore,
			loadRefresh,
			swiperNavBar,
			homeItem,
			mySwipter
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad() {
			this.version = this.versionData;
			if (!uni.getStorageSync('fontSizeObj')) {
				uni.setStorageSync('fontSizeObj', {
					titleFontSize: '38upx',
					titleTwoFontSize: '48upx',
					oneFontSize: '36upx',
					twoFontSize: '22upx',
					threeFontSize: '22upx'
				})
				uni.setStorageSync("fontSizeType", "標準")
			}
			this.getPageHeight(); //获取滚动页面高度
			if (!uni.getStorageSync("navlist")) {
				this.getmodule(); // 获取新闻栏目
			}
			this.getheadline(); //获取头条新闻 
			this.getWeather(); // 获取天气
			this.versionIfShow(); //判断是否显示当前版本
			this.uniGetPrivider(); //初始化分享
			uni.getSavedFileList({
				success: (res) => {
					if (res.fileList.length > 6) {
 						this.clearFileImgList(); //清除掉开屏广告存在本地的图片
					}
				}
			});
		},
		onShow() {
			if (!uni.getStorageSync("UserMsgShow")) {
				this.showUserMsg = true;
			}
			this.changeData(); //切换简繁体
			this.version = this.versionData;
			this.iconChange = 'icon-icon-1';
			this.getTabData(); //获取缓存数据的值重新渲染tab数据列表
			// this.getCity(); //获取当前所在城市
			this.getNewNumbers();
			this.IfUserType();
			this.dataOfWeek();
			this.getCurrentTime(); //獲取當前時間處於什麼時間段。6-10早安 10-19午安 19-6晚安
			if (uni.getSystemInfoSync().platform === 'android') {
				console.log('我是安卓手机');
				this.noRegistersConfirmation(); //长按app出现下拉框
			}

		},
		//点击tabbar的时候触发函数
		onTabItemTap() {
			this.changeTabBar();
			this.getTime();
			let data = new Date().Format("yyyy-MM-dd hh:mm:ss"); //获取系统当前时间
			this.timeNumber = data;
			uni.removeTabBarBadge({
				index: 0
			});
			this.$refs.loadRefresh[this.tabIndex].runRefresh();
		},
		methods: {
			getCurrentTime() {
				let timeNow = new Date().getHours(); //取得当前时间的小时
				//判断当前时间是否在  09:00-12:00 13:00-16:00 之间
				let textTitle = '';
				if (timeNow >= 6 && timeNow < 10) {
					textTitle = '早安'
				} else if (timeNow >= 10 && timeNow < 19) {
					textTitle = '午安'
				} else if (timeNow >= 19 && timeNow < 6) {
					textTitle = '晚安'
				}
				this.currentTextTitle = textTitle;
			},
			relayClick(type) {
				var textTitle = this.currentTextTitle;
				var srcHref = 'http://download.macaoheadline.com';
				var src = this.weatherBgImg;
				if (type == "share") {
					uni.showActionSheet({
						itemList: ['分享到微信朋友圈', '转发给微信好友'],
						success: function(res) {
							var cScene = "";
							if (res.tapIndex == 0) {
								cScene = "WXSenceTimeline";
							} else if (res.tapIndex == 1) {
								cScene = "WXSceneSession";
							}
							console.log('ss', cScene, src, textTitle)
							uni.share({
								provider: "weixin",
								scene: cScene,
								type: 0,
								href: srcHref,
								title: textTitle,
								summary: textTitle,
								imageUrl: src,
								success: function(res) {
									console.log("分享成功！");
								},
								fail: function(err) {
									uni.showToast({
										"title": "分享失败:" + JSON.stringify(err),
										"icon": "none",
										"duration": 2000
									});
								}
							});
						},
						fail: function(res) {
							console.log('999');
							console.log(res.errMsg);
						}
					});
				}
			},
			noRegistersConfirmation() {
				let res = SHORTCUT.addShortcutsModule({
					list: [{
							id: 'test', //必填,不能重复
							icon: 'file://' + plus.io.convertLocalFileSystemURL( '/static/logo/fabu.png' ), 
							path: '/pages/media/mediaPersonal', //选填,跳转的页面路径
							shortLabel: '', //选填
							title: '发布' //必填
						},
						{
							id: 'home',
							icon: 'file://' + plus.io.convertLocalFileSystemURL( '/static/logo/ziliao.png' ), //本地图片,要使用平台绝对路径
							path: '/pages/index/tipster/index',
							shortLabel: '',
							title: '爆料界面'
						}
					]
				})
			},
			changevideoData(e) {
				this.svideoData = e;
			},
			//切换简繁体
			changeData() {
				const system_info = uni.getStorageSync('system_info');
				system_info.language === 'en' ? system_info.language = this._i18n.locale = 'zh_CN' : system_info.language = this._i18n
					.locale = 'en';
				system_info.language === 'en' ? this.systemInfolanguage = 'zh_CN' : this.systemInfolanguage = 'en';
			},
			hideUserMsg() {
				uni.setStorageSync("UserMsgShow", true);
				this.showUserMsg = false;
				this.fareTips = true;
			},
			btnError() {
				this.showUserMsg = false;
				this.fareTips = true;
				if (this.system == 'android') {
					try {
						plus.runtime.quit();
					} catch (e) {}
				} else {
					try {
						const threadClass = plus.ios.importClass("NSThread");
						const mainThread = plus.ios.invoke(threadClass, "mainThread");
						plus.ios.invoke(mainThread, "exit");
						//上面的不行就用下面的
						plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
					} catch (e) {}
				}
			},
			dataOfWeek() {
				const _this = this;
				const myDate = new Date();
				const year = myDate.getFullYear(); //年
				let month = myDate.getMonth() + 1; //月
				let day = myDate.getDate(); //日
				let days = myDate.getDay();
				let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				month < 10 ? month = "0" + "" + month : "";
				day < 10 ? day = "0" + "" + day : "";
				_this.week = weekDay[myDate.getDay()]
				_this.yearDays = year + "/" + month;
				_this.dataS = day;
			},
			IfUserType() {
				let userTppe = uni.getSystemInfoSync('usrType');
				if (userTppe) {
					this.releaseShow = false;
				}
			},
			//清除掉开屏广告存在本地的图片 千万别动了
			clearFileImgList() {
				let fileImgList = uni.getStorage({
					key: 'opevAdvFileImgList',
					success: (res) => {
						console.log("获取到的列表内容", res)
						for (var i = 0; i < res.data.length; i++) {
							this.removeFileImg(res.data[i].pic)
						}
						uni.removeStorage({
							key: "opevAdvFileImgList"
						})
					}
				})
			},
			//清楚掉本地存下的图片 千万别动了
			removeFileImg(filePath) {
				uni.removeSavedFile({
					filePath: filePath,
					success: (res) => {
						console.log('清楚本地图片事件', res)
					}
				})
			},
			//爆料界面
			toTipster() {
				uni.navigateTo({
					url: './tipster/index'
				})
			},
			//自媒体
			goMedia() {
				console.log('1111');
				if (isNeedLogin()) {
					goLogin('../me/register/register')
					return
				}
				uni.navigateTo({
					url: '../media/mediaPersonal'
				})
			},

			showPullList() {
				if (this.iconChange == 'icon-icon-1') {
					this.iconChange = 'icon-shanchu';
					this.pullList = !this.pullList
				} else {
					this.iconChange = 'icon-icon-1';
					this.pullList = !this.pullList
				}
			},
			toIconHide() {
				if (this.iconChange == 'icon-icon-1') {
					this.iconChange = 'icon-shanchu';
					this.pullList = false;
				} else {
					this.iconChange = 'icon-icon-1';
					this.pullList = false;
				}
			},
			//更改tabbar的样式
			changeTabBar() {
				uni.setTabBarItem({
					index: 0,
					selectedIconPath: 'static/gif/indexHome.gif'
				})
				setTimeout(() => {
					uni.setTabBarItem({
						index: 0,
						selectedIconPath: 'static/tabBarIco/activeIndex.png'
					})
				}, 1000)
			},
			//获取缓存数据的值重新渲染tab数据列表
			getTabData() {
				let _this = this;
				let data = uni.getStorageSync("navlist");
				let listNumber = [];
				if (data) {
					_this.tabBars = data;
					var lengths = _this.tabBars.length;
					var arr = [];
					for (let i = 0; i < lengths; i++) {
						arr.push({
							list: []
						});
					}
					if (this.newslist.length > 0 && lengths > 2) {
						if (this.newslist[this.itemIndex].list) {
							arr[_this.itemIndex].list = this.newslist[this.itemIndex].list;
						}
					}
					_this.newslist = arr;
					_this.getheadline();
				}
				if (uni.getStorageSync('storage_index')) {
					if (!uni.getStorageSync('zhuanmengyonlaikan')) {
						_this.getheadline();
					}
					_this.CurrentTab(Number(uni.getStorageSync('storage_index')));
				}
			},
			//滑动新闻栏目的时候调用的函数，用来取数据的函数
			switchTab(index) {
				this.itemIndex = index;
				let _this = this;
				uni.setStorageSync('storage_index', index); //获取前一个栏目的下标地址
				if (this.numbersList.indexOf(index) == -1) {
					this.numbersList.push(index);
					let lengths = this.numbersList.length;
					let tablengths = 0;
					if (uni.getStorageSync("navlist")) {
						let datesId = uni.getStorageSync("navlist");
						tablengths = datesId.length;
					} else {
						tablengths = this.tabBars.length;
					}
					if (lengths > 2 && tablengths > 2) {
						let y = this.numbersList[lengths - 3];
						this.newslist[y].list = [];
					}
				}
				this.imageShow = true;
				this.currPage = 1;
				this.scrollInto = this.tabBars[index].id;
				let newTagIndex = uni.getStorageSync('newTagIndex');
				let data = uni.getStorageSync("navlist");
				if (this.tabIndex == 0) {
					var needStorageList = this.newslist[0].list[index];
				}
				let itemIndex = this.itemIndex;
				let MdindexOne = this.tabBars[itemIndex].MdlId;
				if (uni.getStorageSync('newTagIndex') == MdindexOne) {
					if (this.newslist[index].list.length === 0 && index != 0) {
						if (uni.getStorageSync("navlist")) {
							let datas = uni.getStorageSync("navlist");
							let items = datas[index];
							let MdlId = items.MdlId;
							_this.MdlId = MdlId;
							_this.getNewContent(MdlId);
						} else {
							let items = _this.tabBars[index];
							let MdlId = items.MdlId;
							_this.MdlId = MdlId;
							_this.getNewContent(MdlId);
						}
					} else {
						this.imageShow = false;
					}
				} else {
					if (index == 0) {
						this.currPage = 1;
						if (this.tabIndex == 1) {
							this.tabIndex = 0;
							uni.removeStorageSync('newTagIndex');
							uni.removeStorageSync('newListCache');
						}
						this.getheadline();
						return;
					} else {
						if (uni.getStorageSync("navlist")) {
							let datas = uni.getStorageSync("navlist");
							let itemIndex = this.itemIndex;
							this.newslist[itemIndex].list = [];
							let items = datas[itemIndex];
							let MdlId = items.MdlId;
							_this.getNewContent(MdlId);
						} else {
							let itemIndex = this.itemIndex;
							let items = _this.tabBars[itemIndex];
							let MdlId = items.MdlId;
							_this.getNewContent(MdlId);
						}
					}
				}
				let MDindex = this.tabBars[this.tabIndex].MdlId;
				uni.setStorage({
					key: 'newTagIndex',
					data: MDindex
				})
				this.tabIndex = index;
				uni.setStorage({
					key: 'newListCache',
					data: needStorageList
				})
			},
			// 获取最新新闻数量 
			getNewNumbers() {
				let _this = this;
				setInterval(_this.methodName, 60000);
			},
			//存放当前时间变量
			methodName() {
				let timeNumber = this.timeNumber;
				if (timeNumber == '0') {
					this.getTime();
					let data = new Date().Format("yyyy-MM-dd hh:mm:ss");
					this.timeNumber = data;
				} else {
					this.requestNewCout(timeNumber, this.MdlId);
				}
			},
			//获取当前时间
			getTime() {
				Date.prototype.Format = function(fmt) {
					var o = {
						"M+": this.getMonth() + 1, //月份 
						"d+": this.getDate(), //日 
						"h+": this.getHours(), //小时 
						"m+": this.getMinutes(), //分 
						"s+": this.getSeconds() //秒 
					};
					if (/(y+)/.test(fmt)) {
						fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
					}
					for (var k in o) {
						if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
							o[k]).substr(("" + o[k]).length)));
					}
					return fmt;
				};
				let data = new Date().Format("yyyy-MM-dd hh:mm:ss");
			},
			//前端发送请求，后台返回新增新闻数量
			requestNewCout(data, mdlId) {
				this.$Httpps
					.sttp({
						"action": "getnewcount",
						"lastLoginTime": data,
						"mdlId": mdlId
					})
					.then(res => {
						this.tabbarNumber = res.data.newCount;
						this.showTarbarNumbe();
					}).catch(err => {
						console.log(err);
					});
			},
			goUserXieyi() {
				uni.navigateTo({
					url: "../me/xieYi/xieYi"
				})
			},
			goZhengche() {
				uni.navigateTo({
					url: '../me/privacy/index'
				})
			},
			//显示tabbar角标
			showTarbarNumbe() {
				let _this = this;
				if (_this.tabbarNumber != '0' && _this.tabbarNumber) {
					wx.setTabBarBadge({
						index: 0,
						text: _this.tabbarNumber
					})
				}
			},
			// 获取当前所在城市
			// getCity() {
			// 	uni.getLocation({
			// 		type: 'wgs84',
			// 		geocode: true,
			// 		success: function(res) {
			// 			uni.setStorage({
			// 				key: 'area_city',
			// 				data: res.address.city
			// 			});
			// 		}
			// 	})
			// },
			// 上划加载更多
			loadMore(valIndex) {
				this.currPage = this.currPage + 1
				if (valIndex == 0) {
					this.getheadline()
				} else {
					var MdlId = this.tabBars[valIndex].MdlId
					this.getNewContent(MdlId)
				}
			},
			// 下拉刷新数据列表
			refresh() {
				let _this = this;
				let tabIndex = this.itemIndex;
				let MdlId = this.tabBars[tabIndex].MdlId;
				this.currPage = 1;
				uni.removeTabBarBadge({
					index: 0
				});
				if (tabIndex === 0) {
					_this.tabbarNumber = 0;
					let me = this;
					this.$Httpps
						.sttp({
							"action": "getheadline",
							"page": this.currPage
						})
						.then(res => {
							this.imageShow = false;
							const list = eval(res.data);
							this.newslist[0].list = list.data;
						}).catch(err => {
							console.log(err);
						});
				} else {
					_this.tabbarNumber = 0;
					this.$Httpps
						.sttp({
							"action": "getdata",
							"page": 1,
							"MdlId": MdlId
						})
						.then(res => {

							const dates = eval(res.data).data;
							this.newslist[this.tabIndex].list = dates;

						}).catch(err => {
							console.log(err);
						});
				}

			},
			//跳转到搜索界面
			toSearch() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			// 判断是否显示升级版本
			versionIfShow() {
				let me = this;
				let systemVersion = '';
				if (uni.getSystemInfoSync().platform === 'android') {
					systemVersion = 'android'
				} else if (uni.getSystemInfoSync().platform == 'ios') {
					systemVersion = 'iOS'
				}
				let version = this.version;
				this.$Httpps
					.sttp({
						"action": "getupgrade",
						"version": this.version,
						"system": systemVersion
					})
					.then(res => {
						if (res.data.detail === '' && res.data.url === '') {
							return
						} else {
							this.versionText = res.data.detail;
							this.versionUrl = res.data.url;
							me.versionShow = true
						}
					}).catch(err => {
						console.log(err);
					});
			},
			//版本检测更新---暂不升级按钮点击
			getTrue() {
				this.versionShow = false
			},
			//版本检测更新---升级按钮点击
			power(val) {
				plus.runtime.openURL(this.versionUrl)
			},
			// 点击切换和点击颜色变灰
			tabClick(item, index, index2) {
				let dataObj = item;
				dataObj.isClickMe = true;
				if (this.tabIndex == 0) {
					this.$set(this.newslist[0].list[index2], index2, dataObj);
				} else {
					this.$set(this.newslist[this.tabIndex].list[index2], index2, dataObj);
				}
				let newId = item.DatId;
				console.log('item', item)
				// if (item.DatReplies === '1') {
				// 	uni.navigateTo({
				// 		url: "../votePage/index?item=" + newId
				// 	});
				// } else {
				uni.navigateTo({
					url: '../getdatadetail/getdatadetail?item=' + newId
				});
				// }
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(230);
						this.swiperheight = height;
					}
				});
			},
			//去天气详情
			goWeathDetail() {
				//如果有重大新闻，则根据传进来的id跳转到新闻详情，如果没有id，则跳转问候详情界面
				if (this.pic_dataId) {
					uni.navigateTo({
						url: '../getdatadetail/getdatadetail?item=' + this.pic_dataId
					});
				} else {
					uni.navigateTo({
						url: '../../common/weathWebView'
					})
				}
			},
			// 获取新闻栏目
			getmodule() {
				this.$Httpps
					.sttp({
						"action": "getmodule"
					})
					.then(res => {
						const list = eval(res.data).data;
						for (let i = 0; i < list.length; i++) {
							list[i].id = "guanzhu" + i;
						}
						this.tabBars = this.tabBars.concat(list);
						console.log('this.tabBars',list);
						console.log('this.tabBars',this.tabBars);
						console.log('list',list)
						var lengths = this.tabBars.length;
						var arr = [];
						for (let i = 0; i < lengths; i++) {
							arr.push({
								list: []
							});
							if (i > 0) {
								let item = this.tabBars[i].MdlId
								this.MdlIdArray.push({
									MdlId: item
								})
							}
						}
						this.newslist = arr;
					}).catch(err => {
						console.log(err);
					});
			},
			//获取天气信息
			getWeather() {
				this.$Httpps
					.sttp({
						"action": "getweather"
					})
					.then(res => {
						this.pic_dataId = res.data.pic_dataId; //给首页重大新闻id赋值
						this.today = res.data.today
						this.today.date_y = this.today.date_y.substring(5)
						this.skObj = res.data.sk;
						this.weatherBgImg = res.data.pic_adv;
						this.weatherImage(res.data.today.weather_id.fb)
					}).catch(err => {
						console.log(err);
					});
			},
			weatherImage(data) {
				const _this = this;
				switch (data) {
					case '00':
						_this.weatherIcons = '../../static/Headlines/weather/00.png';
						break;
					case '01':
						_this.weatherIcons = '../../static/Headlines/weather/02.png';
						break;
					case '02':
						_this.weatherIcons = '../../static/Headlines/weather/02.png';
						break;
					case '03':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '04':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '05':
						_this.weatherIcons = '../../static/Headlines/weather/04.png';
						break;
					case '06':
						_this.weatherIcons = '../../static/Headlines/weather/04.png';
						break;
					case '07':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '08':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '09':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '10':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '11':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '12':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '13':
						_this.weatherIcons = '../../static/Headlines/weather/04.png';
						break;
					case '14':
						_this.weatherIcons = '../../static/Headlines/weather/04.png';
						break;
					case '15':
						_this.weatherIcons = '../../static/Headlines/weather/04.png';
						break;
					case '16':
						_this.weatherIcons = '../../static/Headlines/weather/04.png';
						break;
					case '17':
						_this.weatherIcons = '../../static/Headlines/weather/04.png';
						break;
					case '18':
						_this.weatherIcons = '../../static/Headlines/weather/02.png';
						break;
					case '19':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '20':
						_this.weatherIcons = '../../static/Headlines/weather/02.png';
						break;
					case '21':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '22':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '23':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '24':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '25':
						_this.weatherIcons = '../../static/Headlines/weather/03.png';
						break;
					case '26':
						_this.weatherIcons = '../../static/Headlines/weather/04.png';
						break;
					case '27':
						_this.weatherIcons = '../../static/Headlines/weather/04.png';
						break;
					case '28':
						_this.weatherIcons = '../../static/Headlines/weather/04.png';
						break;
					case '29':
						_this.weatherIcons = '../../static/Headlines/weather/02.png';
						break;
					case '30':
						_this.weatherIcons = '../../static/Headlines/weather/02.png';
						break;
					case '31':
						_this.weatherIcons = '../../static/Headlines/weather/02.png';
						break;
					case '53':
						_this.weatherIcons = '../../static/Headlines/weather/02.png';
						break;
				}
			},
			//返回天气空气质量种类
			returnWeathL(val) {
				if (val == '优' || val == '良') {
					return 'weatherLevel1'
				} else {
					return 'weatherLevel2'
				}
			},

			//点击分类iconfont触发的函数
			openTab() {
				let objArray = [];
				let data = uni.getStorageSync("navlist");
				if (data) {
					objArray = data;
				} else {
					objArray = this.tabBars;
				}
				uni.navigateTo({
					url: `../myViedo/myVideo?data=${JSON.stringify(objArray)}&indexs=` + "1"
				})
			},
			//获取头条新闻
			getheadline() {
				let me = this;
				this.$Httpps
					.sttp({
						"action": "getheadline",
						"page": this.currPage
					})
					.then(res => {
						this.imageShow = false;
						const list = eval(res.data);
						this.newslist[0].list = this.newslist[0].list.concat(list.data);
						this.svideoData = list.svideoData;
						if (this.currPage == 1) {
							this.randomNumber = Math.floor(Math.random() * 20) + 5;
						} else {
							this.randomNumber = (Math.floor(Math.random() * 20) + 5) + (30 * Number(this.currPage));
						}
					}).catch(err => {
						console.log(err);
					});
			},
			//获取其他栏目的新闻
			getNewContent(MdlId) {
				this.$Httpps
					.sttp({
						"action": "getdata",
						"mdlId": MdlId,
						"page": this.currPage
					})
					.then(res => {
						if (res.data.result == 'suc') {
							this.imageShow = false;
							const list = eval(res.data);
							this.newslist[this.tabIndex].list = this.newslist[this.tabIndex].list.concat(list.data);
						} else {
							if (res.data.msg == '没有更多数据') {
								this.totalPage = this.currPage - 1;
								this.$refs.loadRefresh.loadOver()
								return;
							}
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					}).catch(err => {
						console.log(err);
					});
			},
			CurrentTab(index) {
				this.swiperTabIdx = index;
				uni.setStorageSync('storage_index', index);
				this.scrollIntoView = Math.max(0, index - 1);
			},
			SwiperChange(e) {
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
				this.swiperTabIdx = e.detail.current;
				this.scrollIntoView = Math.max(0, e.detail.current - 1);
			},
			//分享使用
			uniGetPrivider() {
				uni.getStorage({
					key: 'data',
					success: (res) => {
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
						console.log('获取分享通道失败', e);
						uni.showModal({
							content: '获取分享通道失败',
							showCancel: false
						})
					}
				});
			},

			async shareApp(e) {
				var that = this;
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: 'http://download.macaoheadline.com/',
					title: '澳門頭條，關心你的關心',
					summary: '歡迎下載使用澳門頭條，各種新奇又好看的信息等著您',
					imageUrl: this.shareImage,
					success: function(res) {
						if (this.usrId) {
							let params = {
								userId: that.usrId,
								integral: 'friend'
							}
							appendUserIntegral(params)
						}
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});

			},
		}
	}
</script>

<style scoped>
	.fareWrap {
		width: 700upx;
		height: 700upx;
		margin: 100upx auto 0 auto;
		background: url('../../static/openPage/titleImage.png') no-repeat;
		background-size: 100% 100%;
		background-position: center center;
		text-align: center;
		padding: 30upx 0;
		line-height: 50upx;
		border-radius: 50upx;
	}

	.fareImage {
		margin: 0 auto;
		width: 200upx;
		height: 200upx;
		margin-top: -200upx;
		margin-left: 440upx;
	}

	.fareImage image {
		display: block;
		width: 100%;
		height: 100%;
	}

	/* 天气 */
	.dataS {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.dataSLeft {
		color: #FFFFFF;
		font-size: 68upx;
	}

	.dataSRight {
		margin-left: 10upx;
		line-height: 34upx;
	}

	.weatherBox {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		margin: 10upx 0;
		line-height: 50upx;
	}

	.weatherRight {
		position: relative;
		left: -4upx;
		line-height: 38upx;
	}

	.WeatherImage {
		position: relative;
		left: -8upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90upx;
		height: 90upx;
	}

	.WeatherImage uni-image {
		width: 100% !important;
	}



	.navTitle {
		display: block;
		width: 100%;
		border-right: 1upx soli #000;
	}

	.topTitle {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 160upx;
		background: url('@/static/index/home.jpg') no-repeat;
		background-size: cover;
	}

	.topTitle>.ImageLeft {
		width: 80upx;
		margin-left: 20upx;
		margin-top: 60upx;
	}

	.topTitle>.ImageCenter {
		position: absolute;
		left: 50%;
		top: 20upx;
		margin-left: -140upx;
		width: 280upx;
		margin-top: 60upx;
	}

	.topTitle>.ImageCenter>uni-image {
		display: block;
		width: 97%;
		height: 100%;
	}

	.topTitle>.ImageLeft>uni-image {
		display: block;
		width: 100%;
		height: 1005;
	}

	.topTitle>.ImageRight {
		position: absolute;
		right: 0;
		top: 30upx;
		margin-top: 60upx;
		margin-right: 20upx;
	}

	.topTitle>.ImageRight>.icon {
		font-size: 50upx;
		color: #FFFFFF;
	}

	.iconList {
		position: absolute;
		top: -180upx;
		right: 0;
		width: 100%;
		height: 200%;
		z-index: 100;
		background-color: rgba(0, 0, 0, .2);
	}

	.iconListWrap>.icon {
		position: absolute;
		right: 20upx;
		top: -30upx;
		font-size: 36upx;
		color: #444;
		transition: height 4s;
	}

	.iconListWrap {
		position: absolute;
		right: 10upx;
		top: 180upx;
		width: 380upx;
		background-color: rgba(68, 68, 68, .9);
		border-radius: 10upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* animation: play_bottom 250ms; */
	}

	.play_bottom {
		animation: play_bottom 250ms;
	}

	.play_bottom1 {
		animation: play_bottom1 250ms;
	}

	@keyframes play_bottom {
		0% {
			height: 0;
		}

		100% {
			height: 400upx;
		}
	}


	@keyframes play_bottom1 {
		0% {
			height: 0;
		}

		100% {
			height: 400upx;
		}
	}


	.pullListtems {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 80%;
		height: 95upx;
		color: #0f0e0e;
		margin-left: 38upx;
		border-bottom: 1upx solid #595959;
	}

	.pullListtems:nth-of-type(3)>.icon {
		margin-left: -10upx;
	}

	.pullListtems:nth-of-type(4)>uni-view:nth-of-type(1) {
		font-size: 30upx;
	}

	.pullListtems:nth-of-type(5)>uni-view:nth-of-type(1),
	.pullListtems:nth-of-type(6)>uni-view:nth-of-type(1) {
		width: 30upx;
		height: 30upx;
	}

	.pullListtems:nth-of-type(5)>uni-view:nth-of-type(2),
	.pullListtems:nth-of-type(6)>uni-view:nth-of-type(2) {
		margin-left: 60upx;
	}

	.iconListWrap>uni-view:last-child {
		border: none
	}

	.pullListtems>.icon {
		width: 30%;
		font-size: 32upx;
		color: #FFFFFF;
	}

	.pullListtems>uni-view:nth-of-type(2) {
		width: 70%;
		color: #fff;
	}

	.fontSize50 {
		font-size: 46upx !important;
	}

	.mySwipter {
		margin-top: 356px;
	}

	uni-body .pages-index-home {
		overflow: hidden !important;
	}

	.u-tabbar__content .u-tabbar__content__item:nth-of-type(4) {
		display: none !important;
	}

	.page {
		overflow: hidden;
	}

	/* 版本检测更新 */

	.version {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(90, 90, 90, .5);
		z-index: 200;
	}

	.version-wrap {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 600upx;
		height: 680upx;
	}

	.version-img {
		width: 600upx;
		height: 400upx;
		background-image: url('@/static/me/version/version.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.version-tit {
		width: 100%;
		padding: 20upx 0;
		padding-left: 20upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.version-content {
		width: 100%;
		display: flex;
		background-color: #fff;
		flex-direction: row;
	}

	.version-contentLeft {
		flex: 1;
		padding-left: 20upx;
		box-sizing: border-box;
		text-align: justify;
		text-justify: inter-word;
		font-size: 28upx;
	}

	.version-contentRight {
		flex: 1;
	}

	.version-bottom {
		width: 100%;
		height: 120upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.version-bottom .btn button {
		border-radius: 15upx;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		width: 280upx;
	}

	.version-bottom>.btn:nth-of-type(2)>uni-button {
		background-color: #f0f0f0;
		color: #000;
	}

	.gray {
		color: #adadad !important;
	}

	.header {
		position: relative;
		top: 0;
		width: 100%;
		height: 170upx;
		line-height: 280upx;
		box-sizing: border-box;
		z-index: 100;
		overflow: hidden;
	}

	.right {
		position: absolute;
		right: 0upx;
		top: -24upx;
		width: 76upx;
		height: 76upx;
	}

	.right>span {
		font-size: 59upx;
		margin-right: 20upx;
	}

	.header-tit {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 88upx;
		background-size: 28%;
		overflow: hidden;
	}

	.headLogoImg {
		margin-top: -2upx;
		width: 242upx;
	}

	.content {
		position: relative;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
	}

	.content uni-image {
		width: 100%;
	}

	.uni-tab-bar:first-child {
		width: 100%;
		height: 60upx;
	}

	.uni-tab-bar:nth-child(2) {
		width: 100%;
	}

	uni-swiper {
		width: 100%;
		height: 100%;
	}

	/* 0 */
	.zero {
		position: relative;
		width: 100%;
		padding: 0 20upx;
		padding-top: 20upx;
		border-bottom: 1px solid #EEE;
		box-sizing: border-box;
		background-color: white;
		z-index: 4;
	}

	.zeroContent {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 50upx;
		padding: 10upx 0;
	}

	.zeroContent>.zeroContent_tit {
		color: #adadad;
		font-size: 26upx;
	}

	.zeroContent>.zeroContent_times {
		font-size: 26upx;
		color: #adadad;
		margin-left: 30upx;
	}

	/* 1 */
	.oneTitle {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 100%;
		line-height: 50upx;
		font-size: 36upx;
		letter-spacing: 1upx;
		text-align: justify;
		text-justify: inter-word;
		font-family: 'STHeiti', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
		color: #0f0f0f;
	}

	.oneLeft,
	.oneRight {
		display: inline-block;
		vertical-align: top;
	}

	.oneLeft {
		width: 60%;
		padding-right: 20upx;
		box-sizing: border-box;
	}

	.oneRight {
		width: 40%;
		height: 200upx;

	}

	.oneRight>uni-image {
		border-radius: 10upx;
	}

	.content uni-image {
		width: 100%;
		height: 100%;
	}

	.content uni-image img {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}

	.contentList {
		position: absolute;
		top: 0;
		right: 0px;
		font-size: 30px;
		z-index: 90;
		background-color: #fff;
	}

	/* 2 */
	.twoTitle {
		width: 100%;
		height: 100%;
		margin-top: 20upx;
		font-size: 30upx;
		letter-spacing: 2upx;
	}

	.twoLeft {
		width: 100%;
		margin-top: 10upx;
	}

	.twoRight {
		width: 100%;
		height: 300upx;
		margin-top: 20upx;
	}

	.twoRight>img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.threeTitle {
		width: 100%;
		height: 100%;
		margin-top: 20upx;
		font-size: 30upx;
		letter-spacing: 2upx;
	}

	.threeLeft {
		width: 100%;
		margin-top: 10upx;
	}

	.threeRight {
		width: 100%;
		height: 436upx;
		margin-top: 10upx;
	}

	.threeRight uni-image:nth-child(1) {
		float: left;
		width: 48%;
		height: 436upx;
		margin-right: 2%;
		border-radius: 10upx;
	}

	.threeRight uni-image:nth-child(2),
	.threeRight uni-image:nth-child(3) {
		float: left;
		width: 50%;
		height: 218upx;
		border-radius: 10upx;
	}

	.threeRight uni-image:nth-child(2) {
		margin-bottom: 10upx;
	}

	.weatherClass {
		position: absolute;
		background-size: cover;
		width: 100%;
		height: 720upx;
		position: sticky;
		top: 0;
		left: 0;
		color: white;
		z-index: -2;
	}

	.relay {
		position: absolute;
		z-index: 2;
		right: 20upx;
		top: 600upx;
		width: 100upx;
		height: 100upx;
	}



	.weathDiv {
		width: 300upx;
		position: absolute;
		top: 20upx;
		right: 20upx;
		padding: 10upx;
		padding-left: 80upx;
		border-radius: 10upx;
	}

	.weathDay {
		font-size: 28upx;
		margin-top: 20upx;
	}

	.weathDay uni-view {
		margin: 16upx 0;
	}

	.weathDayBibi {
		width: 280upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		overflow: hidden;
		padding: 5upx 0upx 5upx 0upx;
		font-size: 32upx;
		letter-spacing: 2upx;
	}

	.weatherLevel1 {
		background: #1AAD19;
	}

	.weatherLevel2 {
		background: #D80000;
	}

	.content {
		width: 100%;
		height: 100%;
	}

	.swiperMain {
		width: 100%;
		height: 70upx;
		/* border-bottom:1px solid #BFBFBF; */
		box-shadow: 0px 10px 4px -8px #ccc !important;
	}

	.swiperHead {
		position: relative;
		top: 0;
		z-index: 10;
		width: 88%;
		background: #FFFFFF;
	}

	.swiperHead scroll-view {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		white-space: nowrap;
	}

	.swiperTab {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
	}

	.swiperCont {
		width: 100%;
		padding-top: 70rpx;
	}

	/* #ifdef H5 */
	.swiperHead {
		position: relative;
		top: 0;
		z-index: 10;
		width: 100%;
		background: #FFFFFF;

	}

	/* #endif */

	.swiper {
		width: 100%;
		height: 400rpx;
	}

	.swiperItem {
		height: 400rpx;
		background: #00B26A;
		text-align: center;
		color: #FFFFFF;
		line-height: 400rpx;
		font-size: 30upx;
	}

	.swiperItem image {
		width: 100%;
		height: 100%;
		display: block;
	}

	>>>.list {
		overflow: hidden;
	}

	@keyframes logoLeft {
		from {
			transform: translateX(0);
			transform: scale(1);
		}

		to {
			transform: translateX(-140px);
			transform: scale(0.7);
		}
	}


	.dataNullImage {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 1000upx;
		color: rgba(237, 70, 21);
		font-family: "Microsoft Yahei";
		font-size: 24px;
		font-weight: bold
	}

	.dataNullImage>view {
		animation-name: style1;
		margin-right: 5upx;
	}

	.dataNullImage>view {
		animation-duration: 1s;
		animation-fill-mode: both;
		animation-iteration-count: infinite;
	}

	.dataNullImage>view:nth-child(1) {
		animation-delay: 0.0s
	}

	.dataNullImage>view:nth-child(2) {
		animation-delay: 0.1s
	}

	.dataNullImage>view:nth-child(3) {
		animation-delay: 0.2s
	}

	.dataNullImage>view:nth-child(4) {
		animation-delay: 0.3s
	}

	@keyframes style1 {

		from,
		20%,
		53%,
		80%,
		to {
			animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			transform: translate3d(0, 0.5, 0.1);
		}

		0% {
			opacity: 0;
			transform: scale3d(.3, .3, .3);
		}

		20% {
			opacity: 0.4;
			transform: scale3d(1.1, 1.1, 1.1);
		}

		40%,
		43% {
			animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			opacity: 0.7;
			transform: scale3d(.9, .9, .9);
			transform: translate3d(0px, -40px, 0);
		}

		to {
			opacity: 1;
			transform: scale3d(1, 1, 1);
		}
	}

	.modalText {
		padding: 0 40upx;
		padding-top: 20upx;
		font-size: 28upx;
		color: #666;
	}

	.modalBtn {
		margin-bottom: 40upx;
		margin-top: 20upx;
	}

	.linkText {
		color: #0000EE;
		text-decoration: underline;
	}
</style>
