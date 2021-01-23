<template>
	<view class="page">
		<scroll-view scroll-y="true" :style="{height: (swiperheight-50) + 'px',marginTop: 0 }">
			<view class="header-swipter">
				<!-- 轮播图 start -->
				<index-swiper :swiperList="swiperList"></index-swiper>
				<!-- 轮播图 end -->

				<!-- 切换按钮 start -->
				<view class="header-btns">
					<view class="headerLeftOne" :class="{'activeTab':activeLeftTab}" @click="leftTab">
						{{i18n.macau}}
					</view>
					<view class="headerLeftTwo" :class="{'activeTab':activeRightTab}" @click="rightTab">
						珠海
					</view>
				</view>
				<!-- 切换按钮 end -->
				
				<!-- 搜索框 start-->
				<view class="header-search">
					<view class="icon iconfont icon-sousuokuang" :class="[showWith == false ? 'originLeft' : 'afterLeft' ]"></view>
					<input type="text" style="font-size: 24upx;line-height: 60upx;" placeholder="搜索" :class="[showWith == false ? 'originWidth' : 'afterWidth' ]" @focus="isFocus()"
					 @blur="inputBlur()" @confirm="confirm" confirm-type="search" @input="input" :val="searchVal" placeholder-style="color:#636363;font-size:12px;letter-spacing:1px">
				</view>
				<!-- 搜索框 end-->
			</view>
			<view class="content">
				<view class="content-header">
					<view class="content-header-item" @tap="toConvenience()">
						<view class="icons ren">
							<i class="icon iconfont icon-ren"></i>
						</view>
						<view class="text">便民</view>
					</view>
					<view class="content-header-item" @tap="toShoppingNumbers()">
						<view class="icons chart">
							<i class="icon iconfont icon-gouwuche"></i>
						</view>
						<view class="text">商城</view>
					</view>
					<block v-for="(items,index) in PanelHot" :key="index">
						<view class="content-header-item" @tap="toMySearch(items)">
							<view class="img">
								<image class='relImg' :src="items.StpImg" mode="aspectFill"></image>
							</view>
							<view class="text">{{items.StpName}}</view>
						</view>
					</block>
				</view>
				<h3 style="text-align: center;padding: 20upx 0;padding-bottom: 10upx;">商家平台</h3>
				<view class="platform-list">
					<block v-for="(items,index) in platformList" :key="index">
						<view class="platform-list-item" @tap="toMySearch(items)">
							<view class="img">
								<image class='relImg' :src="items.StpImg" mode="aspectFill"></image>
							</view>
							<view class="text">{{items.StpName}}</view>
						</view>
					</block>
				</view>
				<h3 style="text-align: center;padding: 30upx 0;">合作商家</h3>
				<view class="getBusiness-list">
					<block v-for="(items,index) in getBusiness" :key="index">
						<view class="business-item" @tap="advData(items)">
							<image class='relImg' :src="items.AdvPic" mode="widthFix"></image>
						</view>
					</block>
				</view>
			</view>
		</scroll-view>
		<custom-cover></custom-cover>
	</view>
</template>

<script>
	import indexSwiper from "../../components/swiper.vue" //轮播图组件
	// import indexSwiper from "./components/swipter/swiperMore.vue" //轮播图组件
	export default {
		data() {
			return {
				activeLeftTab: false,
				activeRightTab: true,
				swiperList: [], //轮播图数据
				showWith: false,
				swiperheight: 0,
				PanelHot: [], //热门推荐
				cityName: '澳門',
				platformList: [], //商家平台
				getBusiness: [], //合作商家
				searchVal: ''
			}
		},
		components: {
			indexSwiper
		},
		onLoad() {
			this.getAreaCity();
		},
		onReady() {
			this.getData(); //获取轮播图还是商家列表数据
		},
		computed: {
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		onShow() {
			this.getPageHeight();
			this.leftTab();
			this.changeData();//切换简繁体
		},
		methods: {
			changeData() {
				const system_info = uni.getStorageSync('system_info');
				system_info.language === 'en' ? system_info.language = this._i18n.locale = 'zh_CN' : system_info.language = this._i18n.locale = 'en';
			},
			toConvenience() {
				uni.navigateTo({
					url: "./convenience/conveniencePeople"
				})
			},
			toShoppingNumbers() {
				uni.navigateTo({
					url: '../me/shoppingNumbers/index'
				})
			},
			confirm(res) {
				let value = res.detail.value;
				let me = this;
				uni.navigateTo({
					url: "./keyWords/keyWords?Name=" + value
				});
			},
			leftTab() {
				if (this.activeRightTab === true && this.activeLeftTab === false) {
					this.activeLeftTab = true;
					this.activeRightTab = false;
					this.cityName = "澳门";
					this.getData();
					this.$forceUpdate();
				}
			},
			rightTab() {
				if (this.activeLeftTab === true && this.activeRightTab === false) {
					this.activeLeftTab = false;
					this.activeRightTab = true;
					this.cityName = "珠海";
					this.getData();
					this.$forceUpdate();
				}
			},
			toMySearch(val) {
				var StpId = val.StpId;
				uni.navigateTo({
					url: "./mySearch/mySearch?StpId=" + StpId + "&StpStyle=" + val.StpStyle
				})
			},
			//获取当前用户的位置信息  
			getAreaCity() {
				console.log('city', '110');
				let me = this;
				uni.getStorage({
					key: 'area_city',
					success: function(res) {
						me.cityName = res.data;
						if (res.data == '澳門') {
							me.leftTab()
						} else {
							me.rightTab()
						}
					}
				});
			},
			inputBlur() {
				this.showWith = false
			},
			isFocus() {
				this.showWith = true
			},
			input(res) {
				this.searchVal = res.value
			},
			search(e) {
				// alert(1);
				// uni.navigateTo({
				// 	url:"./mySearch/mySearch?value="+res.value
				// })
			},
			advData(item) {
				uni.navigateTo({
					url: "./UrlDeatils/UrlDeatils?val=" + item.AdvLink
				})
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						this.swiperheight = res.screenHeight;
					}
				});
			},
			//获取轮播图还是商家列表数据
			getData() {
				let me = this;
				this.$Httpps
					.sttp({
						"action": 'getservicetype',
						"city": encodeURIComponent(me.cityName)
					})
					.then(res => {
						let array = [];
						this.swiperList = [];
						this.getBusiness = [];
						this.PanelHot = res.data.data[0].Children;
						this.platformList = res.data.data[1].Children;
						let advData = res.data.adv;
						for (var i = 0; i < advData.length; i++) {
							let item = advData[i];
							let str = item.AdvNo + "";
							let strs = str.substring(0, 2);
							if (strs === '焦点') {
								array.push(item);
							} else {
								me.getBusiness.push(item);
							}
						}
						array.map(item => {
							me.swiperList.push({
								AdvLink: item.AdvLink,
								DatPic: item.AdvPic
							});
						});
						console.log('me.swiperList',me.swiperList)
					}).catch(err => {
						console.log(err);
					});
			}
		}
	}
</script>

<style scoped>
	/* 切换按钮 start */
	.header-btns {
		position: absolute;
		top: 26%;
		left: 5%;
		width: 250px;
		margin: 0 auto;
		height: 27px;
		border-radius: 20upx;
	}

	.headerLeftOne {
		float: left;
		width: 100upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		font-size: 30upx;
		color: #000000;
		border-radius: 10upx 0 0 10upx;
		background-color: #f5f5f5;
	}

	.headerLeftTwo {
		float: left;
		width: 100upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		font-size: 30upx;
		color: #000000;
		border-radius: 0 10upx 10upx 0;
		background-color: #f5f5f5;
	}

	.activeTab {
		background-color: #dc5538;
		color: #fff;
	}

	.swiper-view {
		height: 406upx;
	}

	.swiper {
		height: 406upx !important;
	}

	/* 切换按钮 end */
	/* 轮播图样式 start */
	.header-swipter {
		position: relative;
		width: 100%;
		height: 334upx;
		z-index: 10;
	}

	/* 轮播图样式 end */
	/* 搜索框样式 start */
	.header-search {
		position: absolute;
		top: 24%;
		right: 5%;
		width: 250px;
		margin: 0 auto;
		height: 60px;
		line-height: 60upx;
		border-radius: 20upx;
	}

	.header-search .iconfont {
		position: relative;
		top: 56upx;
		right: 0;
		width: 35upx;
		z-index: 100;
		color: #9C9C9C;
		font-weight: bold;
		font-size: 15px;
		transition: all 0.5s ease 0s;
	}

	.originLeft {
		left: 71%;
	}

	.afterLeft {
		left: 30% !important;
	}

	.header-search input {
		position: relative;
		left: 8upx;
		border-radius: 42px;
		padding: 4px 20px;
		padding-right: 10px;
		border: 2px solid #324B4E;
		background: #eef2f5;
		transition: all 0.5s ease 0s;
		float: right;
		border: none;
		outline: none;
		z-index: 10;
	}

	.originWidth {
		width: 50px;
		margin-left: 20upx;
	}

	.afterWidth {
		width: 150px;
	}

	/* 搜索框样式 end */
	/* 内容样式 start */
	.content {
		position: relative;
		top: 45upx;
		width: 100%;
		height: 100%;
		border-radius: 40upx 40upx 0 0;
		background-color: #fff;
		z-index: 11;
		padding: 0 20upx;
		padding-top: 20upx;
		box-sizing: border-box;
	}

	.swiper>.uni-swiper-wrapper>.uni-swiper-dots {
		bottom: 84upx !important;
	}

	.content-header {
		display: flex;
		width: 100%;
		height: 80px;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-around;
	}

	.content-header-item {
		width: 120upx;
		height: 120upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.content-header-item .iconfont {
		font-size: 19px;
	}

	.content-header-item .icons {
		width: 70upx;
		height: 70upx;
		line-height: 68upx;
		border-radius: 50%;
		margin-top: 10upx;
		text-align: center;
	}

	.content-header-item .text {
		font-size: 24upx;
		margin-top: 22upx;
	}

	.ren {
		background-color: rgba(239, 250, 242);
		color: rgba(86, 110, 138, .8);
	}

	.chart {
		background-color: rgba(247, 214, 214, .6);
		color: #e28b8b;
	}

	.content-header-item>.img {
		width: 80upx;
		height: 80upx;
	}

	.content-header-item>.img .relImg {
		display: block;
		width: 100%;
		height: 100%;
	}


	/* 商家平台 */
	.platform-list {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		text-align: justify;
	}

	.platform-list:after {
		content: "";
		width: 180upx;
	}

	.platform-list-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 228upx;
		border-radius: 10upx;
		padding: 26upx 0;
		margin-top: 16upx;
		background-color: rgba(248, 248, 248, .6);
		box-sizing: border-box;
	}

	.platform-list>.platform-list-item:nth-of-type(6n-2) {
		background-color: rgba(213, 230, 253, .6);
	}

	.platform-list>.platform-list-item:nth-of-type(6n) {
		background-color: rgba(213, 230, 253, .6);
	}

	.platform-list>.platform-list-item:nth-of-type(6n+2) {
		background-color: rgba(250, 214, 214, .6);
	}

	.platform-list-item>.img {
		width: 60upx;
		height: 60upx;
	}

	.platform-list-item .uniImg {
		width: 100%;
		height: 100%;
	}

	.platform-list-item>.img .relImg {
		display: block;
		width: 100%;
		height: 100%;
	}

	.platform-list-item>.text {
		margin-top: 14upx;
		font-size: 24upx;
	}

	/* 内容样式 end */


	.getBusiness-list{
		width: 100%;
	}
	.getBusiness-list:after{
		content: "";
		width: 200upx;
		background: rgba(245,245,245,.6);
		opacity: 0;
	}
	.getBusiness-list>.business-item{
		float: left;
		display: flex;
		align-items: center;
		width: 31%;
		height: 250upx;
		line-height: 326upx;
		background: rgba(245,245,245,.6);
		margin-right: 2.3%;
		margin-top: 20upx;
		padding: 0 10upx;
		box-sizing: border-box;
	}
	.getBusiness-list>.business-item:nth-of-type(1){
		height: 520upx;
	}
	.getBusiness-list>.business-item:nth-of-type(4){
		margin-top: 22upx;
		height: 250upx;
	}
	.getBusiness-list>.business-item:nth-of-type(5){
		margin-top: 22upx;
		height: 250upx;
	}
	.getBusiness-list>.business-item .relImg{
		width: 100%;
	}
	.getBusiness-list .business-item:nth-child(n+6){
		margin-bottom: 20upx;
	}
	.getBusiness-list .business-item:nth-child(n+9){
		display: none!important;
	}
</style>
