<template>
	<view class="page">
		<view class="container">
			<!-- 弹框效果 start-->
			<view>
				<u-modal ref="uModal" v-model="ClickModel" :show-cancel-button="true" :show-title="showTitle" :async-close="asyncClose"
				 @confirm="confirm" @cancel="cancel" :content="i18n.sureDeleteCupon">
				</u-modal>
			</view>
			<!-- 弹框效果 end-->

			<view>
				<u-modal ref="uModal" v-model="BtnModel" :show-cancel-button="true" :show-title="showTitle" :async-close="asyncClose"
				 @confirm="confirmBtn" @cancel="cancelBtn" :content="i18n.sureUndercarriageCupon">
				</u-modal>
			</view>
			<view style="height: 104upx;">
				<view class="headerTitle">
					<view class="bgColor"></view>
					<view class="nav">
						<view class="myIcon" @tap="toHome()">
							<view class="icon icon-zuojiantou iconfont"></view>
							<view class="text">返回</view>
						</view>
						<view class="title">商品管理</view>
						<view class="myIconRight" @tap="toRelease()">
							<view class="icon icon-jiahao iconfont"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="navBox">
				<view class="navbar">
					<view v-for="(item, index) in navList" :key="index" class="nav-item" @click="tabClick(index)">
						<view>{{ item.text }}</view>
						<view :class="{ current: tabCurrentIndex === index }" class="line"></view>
					</view>
				</view>
			</view>
			<view class="goodsList">
				<view v-for="(item, i) in DiscountList" :key="i" style="background-color: #FFFFFF;border: 2upx solid #f2f2f2;margin-top: 20upx;padding-bottom: 1px">
					<view class="shoppingInfo" @click="toCouponDetailPage(item)">
						<view class="uImage">
							<image :src="item.cmdPic" mode="aspectFill"></image>
						</view>
						<!-- <view style="width: 250upx;" v-if="item.CpnImage ==''">
							<coupon-page v-if="item.CpnType === '1'|| item.CpnType === '2'" homeShow="1" textOne="￥" :textTwo="item.CpnIntegral"
							 :cpnName="item.CpnName"></coupon-page>
							<coupon-page v-else homeShow="3" :textOne="item.CpnDiscount" textTwo="折" cpnName="折扣劵"></coupon-page>
						</view>
						<view v-else>
							<coupon-page :image="item.CpnImage" homeShow="4" :textOne="''" textTwo="" cpnName=""></coupon-page>
						</view> -->
						<view class="shoppingInfoList">
							<view>{{i18n.shopName}} : {{item.cmdName}}</view>
							<view class="desciptContent">
								<view>描述: </view>
								<view>{{item.cmdDesc}}</view>
							</view>
							<!-- <view>asbcjabscjabschasbcjhasvbcjhabchasbchj</view> -->
							<!-- <view>價格 : {{item.CpnAmount}}元</view>
							<view>庫存 : {{item.CpnStock}}張</view>
							<view>有效期 : {{item.CpnDueDate}}</view> -->
						</view>
						<view class="topRight" :class="item.cmdStatu == '1'?'highlight':'lowlight'">
							<p>{{item.cmdStatu == '1'?'已上架':'已下架'}}</p>
							<!-- <image src="../../image/Manager_topRight.png" mode="widthFix"></image> -->
						</view>
					</view>
					<view class="shoppingLine"></view>
					<view class="shopping-Btns">
						<view>
							<button type="info" @click="deleteItem(item,i)">{{i18n.delete}}</button>
						</view>
						<view>
							<button type="primary" v-if="item.cmdStatu!='1'" @click="reviseItem(item,i)">修改</button>
						</view>
						<view>
							<button type="warn" @click="exchangeState(item,i)">{{item.cmdStatu==="1"?"下架":"上架"}}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;" v-show="showLoading">
			<u-loading mode="circle" color="#2979ff" :size="40"></u-loading>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;color:#999;" v-show="DiscountList.length !== 0">{{i18n.orderReviseBottom}}!</view>
		<u-empty img-width='170' margin-top='120' :show='DiscountList.length == 0' :text="i18n.onShoppingData" mode="list"></u-empty>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import couponPage from "../childComponent/content/couponPage.vue" //優惠卷組件
	export default {
		data() {
			return {
				BtnModel: false,
				showLoading: false,
				noMoreData: false,
				showTitle: true,
				asyncClose: false,
				ClickModel: false, //喚起彈框
				cmdId: '', //優惠卷id
				userInfoUsrId: null, //用戶id
				indexItem: null, //删除優惠卷下標
				downShoppingIndex:'',
				collectPage: 1,
				totalPage: 99,
				navList: [{
						state: 0,
						text: '全部',
						orderList: []
					},
					{
						state: 1,
						text: '已上架',
						orderList: []
					},
					{
						state: 2,
						text: '已下架',
						orderList: []
					}
				],
				tabCurrentIndex: 0,
				swiperheight: 0,
				DiscountList: [],
				objCpnId: null,
				opValue:''
			}
		},
		onLoad(op) {
			if(op.value){
				this.opValue = op.value;
				switch(op.value) {
				     case 'groundShopping':
				       this.tabCurrentIndex = 1;
				        break;
				     case 'homeShopping':
				       this.tabCurrentIndex = 0;
				        break;
				     default:
				        this.tabCurrentIndex = 2;
				} 
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000)

			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000)
		},
		onReachBottom() {
			console.log('222222');
		},
		//优惠卷发布界面
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.navigateTo({
					url: "../discountRelease/index"
				})
			} else {
				uni.navigateTo({
					url: "../../index"
				})
			}
		},
		components: {
			headerTitle,
			loadRefresh,
			couponPage
		},
		onShow() {
			this.getUserId(); //獲取用戶id
			this.getPageHeight();
			if(!this.opValue){
				this.getAllData('9'); //獲取全部優惠卷列表
			}else{
				switch(this.opValue) {
				     case 'groundShopping':
				       this.DiscountList = [];
				       this.collectPage = 1;
				       this.getAllData('1')
				        break;
				     case 'homeShopping':
				      this.DiscountList = [];
				      this.collectPage = 1;
				      this.getAllData('9');
				        break;
				     default:
				       this.DiscountList = [];
				       this.collectPage = 1;
				       this.getAllData('2')
				}
			}
		},
		onPullDownRefresh() {
			let i = this.tabCurrentIndex;
			switch (i) {
				case 0:
					this.DiscountList = [];
					this.collectPage = 1;
					this.getAllData('9');
					break;
				case 1:
					this.DiscountList = [];
					this.collectPage = 1;
					this.getAllData('1')
					break;
				default:
					this.DiscountList = [];
					this.collectPage = 1;
					this.getAllData('2')
			}
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.showLoading = true
			let i = this.tabCurrentIndex;
			switch (i) {
				case 0:
					this.getAllData('9');
					break;
				case 1:
					this.getAllData('1')
					break;
				default:
					this.getAllData('2')
			}
		},
		computed: {  
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		methods: {
			cancelBtn() {
				this.ClickModel = false;
			},
			confirmBtn() {
				let TabIndex = this.tabCurrentIndex;
				let i = this.downShoppingIndex;
				let changeStatu = '2';
				let mesg = '下架成功';
				if( TabIndex == 0){
					this.$Httpps
						.sttp({
							"action": "updatecmdstatu",
							"cmdId": this.objCpnId,
							"cmdStatu": changeStatu
						})
						.then(res => {
							if (res.data.result == 'suc') {
								uni.showToast({
									icon: "none",
									title: mesg
								})
								this.$set(this.DiscountList[i], 'cmdStatu', '2');
							}
						}).catch(err => {
							console.log(err);
					});
				}else{
					this.$Httpps
						.sttp({
							"action": "updatecmdstatu",
							"cmdId": this.objCpnId,
							"cmdStatu": changeStatu
						})
						.then(res => {
							if (res.data.result == 'suc') {
								uni.showToast({
									icon: "none",
									title: mesg
								})
								this.DiscountList.splice(this.indexItem, 1);
							}
						}).catch(err => {
							console.log(err);
					});
				}
			},
			reviseItem(value, i) {
				uni.setStorageSync('shopArray',value)
				uni.navigateTo({
					url: "../reviseShop/index"
				})
			},
			exchangeState(item, i) {
				this.downShoppingIndex = i;
				let TabIndex = this.tabCurrentIndex;
				this.cmdId = item.cmdId;
				let cmdStatu = '';
				let mesg = ''
				if (item.cmdStatu === '1') {
					this.objCpnId = item.cmdId;
					this.BtnModel = true;
					return
				} else {
					cmdStatu = '1';
					mesg = '上架成功'
				}
				if( TabIndex == 0){
					this.$Httpps
						.sttp({
							"action": "updatecmdstatu",
							"cmdId": this.cmdId,
							"cmdStatu": cmdStatu
						})
						.then(res => {
							if (res.data.result == 'suc') {
								uni.showToast({
									icon: "none",
									title: mesg
								})
								this.$set(this.DiscountList[i], 'cmdStatu', '1');
							}
						}).catch(err => {
							console.log(err);
					});
				}else{
					this.$Httpps
						.sttp({
							"action": "updatecmdstatu",
							"cmdId": this.cmdId,
							"cmdStatu": cmdStatu
						})
						.then(res => {
							if (res.data.result == 'suc') {
								uni.showToast({
									icon: "none",
									title: mesg
								})
								this.DiscountList.splice(this.indexItem, 1);
							}
						}).catch(err => {
							console.log(err);
					});
				}
			},
			toCouponDetailPage(value) {
				uni.setStorageSync('shopArray',value)
				uni.navigateTo({
					url: "../shopDetail/index"
				})
			},
			getUserId() {
				let userData = uni.getStorageSync('data');
				if (userData) {
					this.userInfoUsrId = userData.usrId;
				}
			},
			deleteItem(obj, i) {
				this.indexItem = i,
					this.ClickModel = true;
				this.cmdId = obj.cmdId;
			},
			//关闭提示登录框
			cancel() {
				this.btnDisabled = true;
				this.ClickModel = false;
			},
			//確定執行刪除功能
			confirm() {
				this.$Httpps
					.sttp({
						"action": "updatecmdstatu",
						"cmdId": this.cmdId,
						"cmdStatu": '0'
					})
					.then(res => {
						if (res.data.result == 'suc') {
							this.DiscountList.splice(this.indexItem, 1);
						}
					}).catch(err => {
						console.log(err);
					});
			},
			//獲取全部優惠卷列表數據
			getAllData(statu) {
				this.$Httpps
					.sttp({
						"action": "getcmddata",
						"usrId": this.userInfoUsrId,
						"page": this.collectPage,
						"cmdStatu": statu
					})
					.then(res => {
						if (res.data.result != "suc") {
							if (res.data.msg == '没有更多数据') {
								this.showLoading = false
								this.noMoreData = true;
								uni.showToast({
									icon: "none",
									title: res.data.msg
								})
								return;
							}
						}
						this.collectPage++;
						this.DiscountList = this.DiscountList.concat(res.data.data);
						console.log('this.DiscountList', this.DiscountList)
					}).catch(err => {
						console.log(err);
					});
			},
			toRelease() {
				uni.navigateTo({
					url: "../shopRelease/index"
				})
			},
			toHome() {
				uni.navigateTo({
					url: "../../index"
				})
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(220);
						this.swiperheight = height;
					}
				});
			},
			toHome() {
				uni.navigateTo({
					url: "../../index"
				})
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				switch (index) {
					case 0:
						this.collectPage = 1;
						this.DiscountList = [];
						this.getAllData('9')
						break;
					case 1:
						this.collectPage = 1;
						this.DiscountList = [];
						this.getAllData('1')
						break;
					default:
						this.collectPage = 1;
						this.DiscountList = [];
						this.getAllData('2')
				}
			}
		}
	}
</script>

<style scoped>
	.uImage {
		width: 260upx;
		height: 200upx;
	}

	.uImage image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.headerTitle {
		height: 120upx;
		position: fixed;
		width: 100%;
		z-index: 9;
		top: 0;
		left: 0;
	}

	.bgColor {
		width: 100%;
		height: 60upx;
		background-color: #dc5340;
	}

	.nav {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		background-color: #dc543e;
		width: 100%;
	}

	.myIcon {
		position: absolute;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
	}

	.myIconRight {
		position: absolute;
		right: 10upx;
		display: flex;
		flex-direction: row;
		color: white;
		z-index: 5;
	}

	.myIconRight>.icon-jiahao {
		font-size: 40upx;
	}

	.iconfont {
		color: #fff;
		font-size: 54upx;
	}

	.text {
		color: #fff;
		font-size: 30upx;
	}

	.title {
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: 36upx;
	}



	.page {
		width: 100%;
		height: 100%;
		background-color: rgb(255, 255, 255);
	}

	.container {
		margin: 0 20upx;
		padding-top: 120upx;
	}

	.navBox {
		position: fixed;
		left: 0;
		top: 140upx;
		width: 100%;
		height: 100upx;
		z-index: 100;
		background-color: #FFFFFF;
	}

	.navbar {
		position: fixed;
		top: 140upx;
		left: 0;
		display: flex;
		width: 100%;
		line-height: 78upx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		background-color: #fff;
		z-index: 9999;
		overflow: hidden;
		border-bottom: #f2f2f2 1px solid;
	}

	.nav-item {
		position: relative;
		width: 25%;
	}

	.nav-item>.line {
		position: absolute;
		top: 74upx;
		left: 50%;
		margin-left: -20upx;
		width: 40upx;
	}

	.current {
		border-bottom: 4upx solid red;
	}

	.goodsList {
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgb(250, 250, 250);
	}

	.shoppingInfo {
		position: relative;
		padding: 20upx;
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: #FFFFFF;
	}

	.shoppingInfo>.shoppingImage {
		position: relative;
		width: 250upx;
		height: 200upx;
		background: linear-gradient(#f97028, #f42e3b);
		/* 标准语法*/
	}

	.shoppingInfo>.shoppingImage:after {
		color: #ddd;
		font-size: 5px;
		content: '';
		position: absolute;
		width: 10px;
		height: 200upx;
		z-index: 1000;
		left: 0%;
		background: #fff;
		background-size: 2rem .66rem;
		/*transform:  rotate(-90deg);*/
		background-image: linear-gradient(45deg, #f42e3b 25%, transparent 25%, transparent), linear-gradient(45deg, #f42e3b 25%, transparent 25%, transparent), linear-gradient(135deg, transparent 75%, #f42e3b 75%), linear-gradient(-45deg, transparent 75%, #f42e3b 75%);
	}

	.shoppingInfo>.shoppingImage::before {
		color: #ddd;
		font-size: 5px;
		content: '';
		position: absolute;
		width: 10px;
		height: 200upx;
		z-index: 1000;
		right: 0%;
		background: #fff;
		background-size: 2rem .66rem;
		/*transform:  rotate(-90deg);*/
		background-image: linear-gradient(-45deg, #f42e3b 25%, transparent 25%, transparent), linear-gradient(-135deg, #f42e3b 25%, transparent 25%, transparent), linear-gradient(-45deg, transparent 75%, #f42e3b 75%), linear-gradient(-135deg, transparent 75%, #f42e3b 75%);
	}

	.shoppingImage>image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.shoppingInfoList {
		margin-left: 20upx;
		width: 66%;
	}

	.shoppingInfoList>.desciptContent {
		width: 390upx;
		height: 90%;
		color: #e1dfdf;
	}

	.shoppingInfoList>.desciptContent>uni-view:nth-of-type(1) {
		display: inline-block;
		width: 170upx;
		height: 200upx;
	}

	.shoppingInfoList>.desciptContent>uni-view:nth-of-type(2) {
		display: inline-block;
		width: 700upx;
		height: 200upx;
		word-wrap: break-word
	}

	.shoppingInfoList>view {
		display: flex;
		width: 86%;
		justify-content: flex-start;
		align-items: center;
		height: 25%;
	}

	.shoppingInfo>.topRight {
		position: absolute;
		right: 0;
		top: 0;
		width: 0;
		height: 0;
		/* border-top: 120upx solid red; */
		border-left: 120upx solid transparent;
		color: #FFFFFF;
	}

	.highlight{
		border-top: 120upx solid red;
	}
	.lowlight{
		border-top: 120upx solid #cac3c3;
	}
	
	.shoppingInfo>.topRight>p {
		position: absolute;
		top: -128upx;
		width: 30upx;
		left: -60upx;
		transform: rotate(-47deg);
		font-size: 24upx;
	}

	.shoppingInfo>.topRight>image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.shoppingLine {
		position: relative;
		left: -20upx;
		width: 100%;
		height: 4upx;
		margin: 20upx 0;
		background-color: rgb(250, 250, 250);
	}

	.shopping-Btns {
		display: flex;
		width: 100%;
		justify-content: space-around;
		margin-bottom: 20upx;
	}

	.shopping-Btns>view:nth-of-type(1) button {
		background-color: rgb(204, 204, 204);
		color: #FFFFFF;
	}

	.shopping-Btns>view {
		width: 25%;
	}

	.shopping-Btns button {
		font-size: 24upx;
	}
</style>
