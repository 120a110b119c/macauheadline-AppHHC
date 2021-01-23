<template>
	<view>
		<view class="Header">
			<view class="HeaderAddress">
				<picker @change="bindPickerChange" :range="rangeList">
					<label class="">{{chooesRange}}</label>
				</picker>
				<view class="icon iconfont icon-xiala" style="color: #070707;"></view>
			</view>
			<view class="HeaderInput">
				<view class="icon iconfont icon-sousuokuang"></view>
				<input type="text" placeholder="请输入关键词搜索">
				<view class="icon iconfont icon-yanjizhushou-shangchuan_maikefeng"></view>
			</view>
		</view>
		<scroll-view scroll-y="true" style="position: relative; top: 200upx;" :style="{height: swiperheight  + 'px',overflow:'hidden'}">
			<view v-if="swiperList.length != 0">
				<index-swiper :swiperList="swiperList"></index-swiper>
			</view>
			<view class="imgeList" v-if="imageList.length != 0">
				<scroll-view scroll-x="true" class="scroll">
					<view class="scrollView" :style="{width:ComputeWidth+'%'}">
						<image v-for="(item,index) in imageList" :key='index' src="./image/shop_two.jpg" class="image" mode="aspectFill"></image>
						<view class="moreImage">
							<view>更多</view>
							<view>敬请期待</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 商家平台的入口 start -->
			<view class="recommed">
				<view class="title">
					商家平台
				</view>
				<indexSwiperMore :swiperList="DataList"></indexSwiperMore>
			</view>
			<!-- 商家平台的入口 end -->
			<!-- <view class="recommed">
				<view class="title">
					合作商家
				</view>
				<view class="CooperativeBusiness">
					<view class="imageItem">
						<image src="./image/shop_two.jpg" mode="aspectFill"></image>
					</view>
					<view class="imageItem">
						<image src="./image/shop_two.jpg" mode="aspectFill"></image>
					</view>
					<view class="imageItem">
						<image src="./image/shop_two.jpg" mode="aspectFill"></image>
					</view>
					<view class="imageItem">
						<image src="./image/shop_two.jpg" mode="aspectFill"></image>
					</view>
					<view class="imageItem">
						<image src="./image/shop_two.jpg" mode="aspectFill"></image>
					</view>
					<view class="imageItem">
						<image src="./image/shop_two.jpg" mode="aspectFill"></image>
					</view>
					<view class="imageItem">
						<image src="./image/shop_two.jpg" mode="aspectFill"></image>
					</view>
					<view class="imageItem">
						<image src="./image/shop_two.jpg" mode="aspectFill"></image>
					</view>
					<view class="imageItem">
						<image src="./image/shop_two.jpg" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="recommed">
				<view class="title">
					优惠专区
				</view>
				<view class="PreferentialZone">
					<view class="PreferentialZone-left">
						<image src="./image/noData.png" mode="aspectFill"></image>
					</view>
					<view class="PreferentialZone-right">
						<view>
							<image src="./image/shop_two.jpg" mode="aspectFill"></image>
						</view>
						<view>
							<image src="./image/noData.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view> -->
			<view class="recommed">
				<view class="title">
					热门推荐
				</view>
				<view class="recommedList">
					<view class="images">
						<image src="./image/noData.png" mode="widthFix"></image>
					</view>
					<view class="recommedText">
						<view>商家名称有限公司</view>
						<view>地址:珠海市香洲区xxxxxx</view>
						<view>电话:12345678</view>
					</view>
					<view class="recommedCircleList">
						<view></view>
						<view></view>
						<view></view>
					</view>
				</view>
				<view class="recommedList">
					<view class="images">
						<image src="./image/noData.png" mode="widthFix"></image>
					</view>
					<view class="recommedText">
						<view>商家名称有限公司</view>
						<view>地址:珠海市香洲区xxxxxx</view>
						<view>电话:12345678</view>
					</view>
					<view class="recommedCircleList">
						<view></view>
						<view></view>
						<view></view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniCollapse from './components/uni-collapse.vue'
	import uniCollapseItem from './components/uni-collapse-item.vue'
	import indexSwiper from "./components/swipter/swiper.vue" //轮播图组件
	import indexSwiperMore from "./components/swipter/swiperMore.vue" //轮播图组件
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			indexSwiper,
			indexSwiperMore
		},
		onReady() {
			this.getData(); //获取轮播图还是商家列表数据
		},
		onLoad() {
			this.getPageHeight();
		},
		data() {
			return {
				chooesRange: '澳門',
				rangeList: ['珠海', '澳门'],
				swiperheight: 0,
				autoplay: true,
				DataList: [], //生活界面商家平台的数据对象
				current: 3,
				mode: 'default', //提示小点的样式
				ComputeWidth: 0,
				imageList: [{
						index: 0,
						image: './image/shop_two.jpg'
					}
				],
				swiperList: [], //轮播图数据
				cityName: "澳門"
			}
		},
		methods: {
			bindPickerChange(e) {
				this.rangeIndex = e.target.value;
				this.chooesRange = this.rangeList[this.rangeIndex];
				if (this.rangeList[this.rangeIndex] === '澳门') {
					this.cityName = "澳门";
					this.getData()
				} else {
					this.cityName = "珠海";
					this.getData()
				}
			},
			changeAddress() {
				this.accordion.title = this.accordion.content
			},
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight-100;
						this.swiperheight = height;
					}
				});
			},
			change(e) {
				this.current = e.detail.current;
			},
			imageWidht() {
				if( this.imageList.length == 1 ){
					this.ComputeWidth = 100;
					return
				}
				this.ComputeWidth = (this.imageList.length - 2) * 36 + 98;
			},
			//获取轮播图还是商家列表数据
			getData() {
				const _this = this;
				_this.$Httpps
					.sttp({
						"action": 'getservicetype',
						"city": encodeURIComponent(_this.cityName)
					})
					.then(res => {
						console.log(res, 'res')
						let array = [];
						_this.swiperList = [];
						_this.getBusiness = [];
						_this.PanelHot = res.data.data[0].Children;
						_this.platformList = res.data.data[1].Children;
						//将数组中的数据进行分割 start
						const result = [];
						for (var i = 0; i < _this.platformList.length; i += 12) {
							result.push(_this.platformList.slice(i, i + 12))
						}
						//将数组中的数据进行分割 end

						//将分割成功的数据添加到对应的数组中去 start
						_this.DataList = [];
						result.forEach(item => {
							_this.DataList.push({
								DataListItem: item
							})
						})
						//将分割成功的数据添加到对应的数组中去 end

						let advData = res.data.adv;
						for (var i = 0; i < advData.length; i++) {
							let item = advData[i];
							let str = item.AdvNo + "";
							let strs = str.substring(0, 2);
							if (strs === '焦点') {
								array.push(item);
							} else {
								_this.getBusiness.push(item);
							}
						}
						array.map(item => {
							this.swiperList.push({
								AdvLink: item.AdvLink,
								DatPic: item.AdvPic
							});
						});
					}).catch(err => {
						console.log(err);
					});
			}
		},
		onShow() {
			this.imageWidht();
		}
	}
</script>

<style scoped>
	/* 隐藏滚动条 */
	scroll-view ::-webkit-scrollbar {
	    width: 0;
	    height: 0;
	    background-color: transparent;
	}
	
	/* 优惠专区 */
	.PreferentialZone {
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 30upx;
	}

	.PreferentialZone-left {
		width: 350upx;
		height: 400upx;
		margin-right: 40upx;
	}

	.PreferentialZone-left>uni-image {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 20upx;
	}

	.PreferentialZone-right {
		display: flex;
		flex-direction: column;
	}

	.PreferentialZone-right uni-view {
		width: 300upx;
		height: 190upx;
	}

	.PreferentialZone-right uni-view:nth-child(2) {
		margin-top: 20upx;
	}

	.PreferentialZone-right uni-image {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 20upx;
	}

	/* 合作商家 */
	.CooperativeBusiness {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		margin-bottom: 10upx;
	}

	.CooperativeBusiness>.imageItem {
		margin-top: 10upx;
		width: 240upx;
		height: 150upx;
	}

	.imageItem>uni-image {
		display: block;
		width: 100%;
		height: 100%;
	}

	/*推荐 start*/
	.recommed {
		width: 100%;
	}

	.recommed>.title {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 150upx;
		font-size: 42upx;
		background-color: rgba(246, 246, 246, .6);
		color: #070707;
		font-weight: bold;
		letter-spacing: 4upx;
	}

	.recommedList {
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: space-around;
		padding: 20upx;
		box-sizing: border-box;
		border-bottom: 4upx solid #f5f5f5;
	}

	.recommed>.recommedList:last-child {
		border-bottom: none;
	}

	.recommedList>.images {
		width: 180upx;
		border-radius: 20upx;
	}

	.recommedList>.images>uni-image {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 20upx;
	}

	.recommedText>uni-view {
		height: 34%;
	}

	.recommedText>uni-view:nth-of-type(2),
	.recommedText>uni-view:nth-of-type(3) {
		color: #888;
	}

	.recommedCircleList>uni-view {
		width: 10upx;
		height: 10upx;
		border-radius: 50%;
		background-color: #C8C8C8;
		margin-bottom: 4upx;
	}

	/*推荐 end*/

	.Header {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		padding: 0 20upx;
		padding-top: 100upx;
		width: 100%;
		height: 180upx;
		line-height: 100upx;
		box-sizing: border-box;
		z-index: 100%;
		background-color: #FFFFFF;
		z-index: 99;
	}

	.HeaderAddress {
		display: flex;
		align-items: center;
		height: 84upx;
		flex: 1.5;
	}

	.HeaderInput {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		border: 2upx solid #E3E3E3;
		border-radius: 60upx;
		height: 80upx;
		flex: 8.5;
	}

	.uni-collapse-cell--open {
		background-color: #fff !important;
	}

	.content {
		height: 50upx;
		text-align: center;
	}

	.uni-collapse-cell {
		border: none !important;
	}

	.uni-collapse:before,
	.uni-collapse:after {
		background-color: #fff !important;
	}

	.uni-collapse-cell__title-text {
		color: #010101 !important;
	}

	.uni-icons {
		color: #000 !important;
	}

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
		color: #FBA52F;
	}

	.swiper-view {
		height: 386upx;
	}

	.swiper {
		height: 386upx !important;
	}


	.imgeList {
		height: 212upx;
		padding-top: 30upx;
		box-sizing: border-box;
		background-color: #FFF;
	}

	uni-scroll-view {
		height: 100%;
	}

	.scrollView {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		height: 100%;
	}

	.image {
		display: inline-block;
		width: 260upx;
		height: 152upx;
		margin-right: 10upx;
	}

    .image img{
		width: 100%;
		height: 100%;
	}

	.image:nth-of-type(1) {
		margin-left: 20upx;
	}

	.scroll {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}

	.moreImage {
		display: inline-block;
		background: linear-gradient(to right, #FFE7A7, #FFE199, #FFD988);
		border-radius: 10upx 0 0 10upx;
		width: 200upx;
		height: 152upx;
		padding-left: 10upx;
		box-sizing: border-box;
	}

	.moreImage>uni-view:nth-of-type(1) {
		color: #519DC7;
		font-size: 40upx;
	}

	.moreImage>uni-view:nth-of-type(2) {
		color: #519DC7;
		font-size: 36upx;
	}
</style>
