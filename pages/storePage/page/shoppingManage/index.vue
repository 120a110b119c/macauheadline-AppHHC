<template>
	<view class="page">
		<view class="container">
			<!-- 弹框效果 start-->
			<view>
				<u-modal ref="uModal" v-model="ClickModel" :show-cancel-button="true" :show-title="showTitle" :async-close="asyncClose"
				 @confirm="confirm" @cancel="cancel" :content="'確定刪除優惠卷嗎'">
				</u-modal>
			</view>
			<!-- 弹框效果 end-->
			<view>
				<u-modal ref="uModal" v-model="BtnModel" :show-cancel-button="true" :show-title="showTitle" :async-close="asyncClose"
				 @confirm="confirmBtn" @cancel="cancelBtn" :content="'確定下架優惠卷嗎'">
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
						<view class="title">{{i18n.cuponManage}}</view>
						<view class="myIconRight" @tap="toRelease()">
							<view class="icon icon-jiahao iconfont"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="navBox">
				<view class="navbar">
					<view v-for="(item, index) in navList" :key="index" class="nav-item" @tap="tabClick(index)">
						<view>{{ item.text }}</view>
						<view :class="{ current: tabCurrentIndex === index }" class="line"></view>
					</view>
				</view>
			</view>
			<view class="goodsList">
				<view v-for="(item, i) in DiscountList" :key="i" style="background-color: #FFFFFF;margin-top: 20upx;padding-bottom: 2px;border: #f2f2f2 1px solid;">

					<view class="shoppingInfo" @tap="toCouponDetailPage(item)">
						<view style="width: 250upx;" v-if="item.CpnImage ==''">
							<coupon-page v-if="item.CpnType === '1'" homeShow="1" textOne="￥" :textTwo="item.CpnAmount"
							 :cpnName="item.CpnName"></coupon-page>
							 <coupon-page v-else-if="item.CpnType === '2'" homeShow="1" textOne="￥" :textTwo="item.CpnMinCharge"
							  :cpnName="item.CpnName"></coupon-page>
							<coupon-page v-else homeShow="6" :textOne="item.CpnDiscount" textTwo="折" cpnName="折扣劵"></coupon-page>
						</view>
						<view v-else style="width: 260upx;height: 200upx;">
							<coupon-page  style="width: 260upx;height: 200upx;" :image="item.CpnImage" homeShow="4" :textOne="''" textTwo="" cpnName=""></coupon-page>
						</view>
						<view class="shoppingInfoList">
							<view>{{i18n.shopName}} : {{item.CpnName}}</view>
							<view>{{i18n.price}} : {{item.CpnIntegral}}{{i18n.integral}}</view>
							<view>{{i18n.stock}} : {{item.CpnStock}}{{i18n.spread}}</view>
							<view>有效期 : {{item.CpnDueDate}}</view>
						</view>
						<view class="topRight" :class="item.CpnStatus == '停止'?'lowlight':'highlight'">
							<p>{{item.CpnStatus == '停止'?'已下架':'已上架'}}</p>
						</view>
					</view>
					<view class="shoppingLine"></view>
					<view class="shopping-Btns">
						<view>
							<button type="info" @tap="deleteItem(item,i)">{{i18n.deleteWords}}</button>
						</view>
						<view>
							<button type="warn" @click="exchangeState(item,i)">{{item.CpnStatus=="停止"?"上架":"下架"}}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;" v-show="showLoading">
			<u-loading mode="circle" color="#2979ff" :size="40"></u-loading>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;color:#999;"  v-show="DiscountList.length !== 0">{{i18n.readyBottom}}!</view>
		<u-empty img-width='170' margin-top='120' :show='DiscountList.length == 0' :text="i18n.noCouponData" mode="list"></u-empty>
	</view>
</template>

<script>
	import headerTitle from '@/components/header-title/index.vue'
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import couponPage from "../childComponent/content/couponPage.vue" //優惠卷組件
	export default {
		data() {
			return {
				BtnModel:false,
				showLoading:false,
				noMoreData:false,
				showTitle: true,
				asyncClose: false,
				ClickModel: false, //喚起彈框
				CpnId: '', //優惠卷id
				userInfoUsrId: null, //用戶id
				indexItem: null, //删除優惠卷下標
				downShoppingIndex:'',
				collectPage: 1,
				totalPage: 99,
				goodsInfo: {
					goodsName: "购物劵",
					goodsPayFor: "积分兑换",
					goodsCode: "1560",
					goodsNums: 1
				},
				goodsNumber: "2019040515698",
				goodsState: "交易完成",
				goodsTimer: "2020-09-05 16:15:10",
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
				objCpnId:null
			}
		},
		computed: {  
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		//优惠卷发布界面
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.navigateTo({
					url: "../discountRelease/index"
				})
			} else {
				uni.navigateTo({
					url:"../../index"
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
			this.getAllData('9'); //獲取全部優惠卷列表
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
					this.getAllData('0')
			}
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.showLoading = true;
			let i = this.tabCurrentIndex;
			switch (i) {
				case 0:
					this.getAllData('9');
					break;
				case 1:
					this.getAllData('1')
					break;
				default:
					this.getAllData('0')
			}
		},
		methods: {
			exchangeState(obj,i){
				this.downShoppingIndex = i;
				let TabIndex = this.tabCurrentIndex;
				let changeStatu = '';
				let mesg = '';
				if(obj.CpnStatus=="停止"){
					changeStatu = '1'
					mesg= '上架成功'
				}else{
					this.objCpnId = obj.CpnId;
					this.BtnModel = true;
					return
				}
				if( TabIndex == 0){
					this.$Httpps
						.sttp({
							"action": "changecpnstatu",
							"cpnId": obj.CpnId,
							"changeStatu": changeStatu
						})
						.then(res => {
							if (res.data.result == 'suc') {
								uni.showToast({
									icon: "none",
									title: mesg
								})
								this.$set(this.DiscountList[i], 'CpnStatus', '启动');
							}else{
								uni.showToast({
									icon: "none",
									title: res.data.msg
								})
								return;
							}
						}).catch(err => {
							console.log(err);
						});
				}else{
					this.$Httpps
						.sttp({
							"action": "changecpnstatu",
							"cpnId": obj.CpnId,
							"changeStatu": changeStatu
						})
						.then(res => {
							if (res.data.result == 'suc') {
								uni.showToast({
									icon: "none",
									title: mesg
								})
								this.DiscountList.splice(this.indexItem, 1);
							}else{
								uni.showToast({
									icon: "none",
									title: res.data.msg
								})
								return;
							}
						}).catch(err => {
							console.log(err);
						});
				}
			},
			toCouponDetailPage(value){
				uni.setStorageSync('shoppingArray',value)
				uni.navigateTo({
					url:"../couponDetailPage/index"
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
				this.CpnId = obj.CpnId;
			},
			//关闭提示登录框
			cancel() {
				this.btnDisabled = true;
				this.ClickModel = false;
			},
			cancelBtn(){
				this.ClickModel = false;
			},
			
			//確定執行刪除功能
			confirm() {
				this.$Httpps
					.sttp({
						"action": "deletecpn",
						"bizId": this.userInfoUsrId,
						"cpnId": this.CpnId
					})
					.then(res => {
						if (res.data.result == 'suc') {
							this.DiscountList.splice(this.indexItem, 1);
						}
					}).catch(err => {
						console.log(err);
				});
			},
			confirmBtn(){
				let TabIndex = this.tabCurrentIndex;
				let i = this.downShoppingIndex;
				let changeStatu = '0';
				let mesg= '下架成功';
				if( TabIndex == 0){
					this.$Httpps
						.sttp({
							"action": "changecpnstatu",
							"cpnId": this.objCpnId,
							"changeStatu": changeStatu
						})
						.then(res => {
							if (res.data.result == 'suc') {
								uni.showToast({
									icon: "none",
									title: mesg
								})
								this.$set(this.DiscountList[i], 'CpnStatus', '停止');
							}
						}).catch(err => {
							console.log(err);
					});
				}else{
					this.$Httpps
						.sttp({
							"action": "changecpnstatu",
							"cpnId": this.objCpnId,
							"changeStatu": changeStatu
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
			//獲取全部優惠卷列表數據
			getAllData(statu) {
				this.$Httpps
					.sttp({
						"action": "getcpnlist",
						"bizId": this.userInfoUsrId,
						"page": this.collectPage,
						"statu": statu
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
						console.log('this.DiscountList',this.DiscountList)
						this.$zhTran('t')
					}).catch(err => {
						console.log(err);
					});
			},
			toRelease() {
				uni.navigateTo({
					url: "../discountRelease/index"
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
						this.getAllData('0')
				}
			}
		}
	}
</script>

<style scoped>
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
	}

	.shoppingInfoList>view {
		display: flex;
		width: 100%;
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
	.shoppingInfo>.topRight>p{
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
