<template>
	<view class="storeBox page" :style="{height: (swiperheight)  + 'px',overflow:'hidden' }">
		<view class="header">
			<view class="iconList">
				<view class="icon iconfont icon-icon--" @tap="toRegister"></view>
				<view class="icon iconfont icon-saoma"  @tap="toRecall()"></view>
			</view>
		</view>
		<view class="personInformationBox">
			<view class="parsonInformationList">
				<view class="personImage">
					<image :src="BizLogo?BizLogo:'../../static/logo/iconFirst.png'" mode="widthFix"></image>
				</view>
				<view class="parsonInformation">
					<view>{{dataArray.usrBizName}}</view>
					<view>{{dataArray.usrBizPhone}}</view>
				</view>
			</view>
			<view class="icomeList" style="display: none;">
				<view class="icomeListItem">
					<view>0</view>
					<view>昨日{{i18n.salesCount}}</view>
				</view>
				<view class="icomeListItem">
					<view>0</view>
					<view>本月{{i18n.salesCount}}</view>
				</view>
				<view class="icomeListItem">
					<view>￥0.00</view>
					<view>今日收入</view>
				</view>
				<view class="icomeListItem">
					<view>￥0.00</view>
					<view>昨日收入</view>
				</view>
			</view>
		</view>
		<view class="navList">
			<view class="navListItem" @tap="groundShopping('groundShopping')">
				<view>上架</view>
				<view>{{dataArray.usrtCmdOnNumCount}}</view>
			</view>
			<view class="navListItem"  @tap="groundShopping('homeShopping')">
				<view>{{i18n.babyName}}</view>
				<view>{{Number(dataArray.usrtCmdOnNumCount)+ Number(dataArray.usrtCmdOffNumCount)}}</view>
			</view>
			<view class="navListItem"  @tap="groundShopping('lowerShopping')">
				<view>下架</view>
				<view>{{dataArray.usrtCmdOffNumCount}}</view>
			</view>
		</view>
		<view class="featureList">
			<view class="featureListItem" @click="toShoppingDown()">
				<view class="imageIcon">
					<image src="./image/shoppingManage.png" mode="widthFix"></image>
				</view>
				<view>
					{{i18n.mallSetUp}}
				</view>
			</view>
			<view class="featureListItem"  @click="ShoppingManage">
				<view class="imageIcon">
					<image src="./image/counponPage.png" mode="widthFix"></image>
				</view>
				<view>
					{{i18n.cuponManage}}
				</view>
			</view>
			<view class="featureListItem" @tap="toShopForManage()">
				<view class="imageIcon">
					<image src="./image/order.png" mode="widthFix"></image>
				</view>
				<view>
					商品管理
				</view>
			</view>
			<view class="featureListItem" @tap="toVerificationPage()">
				<view class="imageIcon">
					<image src="./image/order.png" mode="widthFix"></image>
				</view>
				<view>
					{{i18n.verificationEvent}}
				</view>
			</view>
			<!-- <view class="featureListItem">
				<view></view>
				<view>
					统计分析
				</view>
			</view> -->
			<!-- <view class="featureListItem" @click="ShoppingShowOrPull">
				<view></view>
				<view>
					商品展示
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				FormRegisterdata:[],
				userInfoUsrId:null,//用戶id
				dataArray:{},
				BizLogo:""
			}
		},
		onLoad() {
			const item = this.$getStorage("data");
			this.FormRegisterdata = item;
			this.getPageHeight(); //获取滚动页面高度
		},
		computed: {
		 i18n () {  
		    return this.$t('index')  
		 }  
		},
		onShow() {
			this.getUserId(); //獲取用戶id
			this.getData();//获取商家详情信息
		},
		methods:{
			groundShopping(value){
				uni.navigateTo({
					url:"./page/shopManage/index?value="+value
				})
			},
			//喚起方法
			toRecall(){
				uni.scanCode({
				     onlyFromCamera:false,
				     scanType:['barCode','qrCode'],
				     success: (res) => {
				      console.log('這裡是掃碼拿到的回調',res);
					  this.masterVerification(res.result)
				     }
				})
			},
			masterVerification(data) {
				this.requestPost({
					"action": "bizwriteoff",
					"ucpNo": data,
					"bizId": this.userInfoUsrId
				}).then(response => {
					if (response.data.result == 'suc') {
						console.log('response', response)
						uni.showToast({
							icon: 'none',
							title: '成功核銷!'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: response.data.msg,
							duration:2500
						})
					}
				})
			},
			getUserId() {
				let userData = uni.getStorageSync('data');
				if (userData) {
					this.userInfoUsrId = userData.usrId;
				}
			},
			getData(){
				this.$Httpps
					.sttp({
						"action": "getbizdetail",
						"bizId":this.userInfoUsrId
					})
					.then(res => {
						let dataData = res.data;
						if (dataData.result == 'suc') {
							this.dataArray = res.data;
							this.BizImage = this.dataArray.usrBizLogo
							console.log(this.dataArray,'this.dataArray')
						}else{
							console.log(res.data.msg,'res.data.msg')
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
							return;
						}
					}).catch(err => {
						
				});
			},
			//订单管理页面
			toGoodsForManage(){
				uni.navigateTo({
					url:"./page/goodsForManage/index"
				})
			},
			toShopForManage(){
				uni.navigateTo({
					url: './page/shopManage/index'
				});
			},
			toRegister(){
				uni.switchTab({
					url: '../me/me'
				});
			},
			//核销界面
			toVerificationPage(){
				uni.navigateTo({
					url:"./page/verificationPage/index"
				})
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						this.swiperheight = res.windowHeight;
					}
				});
			},
			toShoppingDown(){
				uni.setStorageSync('shoppingsName',this.dataArray)
				uni.navigateTo({
					url: './page/ShoppingTown/index'
				});
			},
			ShoppingShowOrPull(){
				this.$Httpps
					.sttp({
						"action": "getcmddata",
						"page":1,
						"usrId":usrId,
						'cmdStatu':1
					})
					.then(res => {
						const DataList = eval(res.data);
						if(DataList.data.length != 0){
							uni.navigateTo({
								url: './page/shoppingList/index'
							});
						}else{
							uni.navigateTo({
								url: './page/shoppingAdd/index'
							});
						}
					}).catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						})
				});
			},
			ShoppingManage(){
				uni.navigateTo({
					url: './page/shoppingManage/index'
				});
			}
		}
	}
</script>

<style scoped>
	uni-page-body, uni-page-refresh{
		height: 100%!important;
	}
	.storeBox{
		position: static;
		width: 100%;
		height: 100%;
		background: #F2F5FA;
	}
	
	/*头部背景样式 start*/
	.header{
		width: 100%;
		height: 400upx;
		background: linear-gradient(#F6513B, #FA8E0A);
		border-radius: 0 0 40upx 40upx;
		padding: 100upx 40upx;
		box-sizing: border-box;
	}
	.iconList{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.iconList>.icon:nth-of-type(1){
		margin-top: -7upx;
		font-size: 66upx;
		color: #FFFFFF;
	}
	.iconList>.icon:nth-of-type(2){
		font-size: 50upx;
		color: #FFFFFF;
	}
	/*头部背景样式 end*/
	
	.personInformationBox{
		position: absolute;
		left: 50%;
		margin-left: -45%;
		top: 200upx;
		width: 90%;
		height: 140upx;
		border-radius: 10upx;
		background: #FFFFFF;
	}
	.parsonInformationList{
		width: 100%;
		margin-top: 30upx;
		display: flex;
		flex-direction: row;
		border-radius: 20upx;
		padding: 0 20upx;
		box-sizing: border-box;
	}
	.parsonInformationList>.parsonInformation{
		margin-left: 26upx;
	}
	.parsonInformationList>.parsonInformation>uni-view:nth-of-type(1){
		color: #414141;
		font-weight: bold;
		letter-spacing: 2upx;
	}
	.parsonInformationList>.parsonInformation>uni-view:nth-of-type(2){
		font-size: 24upx;
		margin-top: 14upx;
		color: #ADADAD;
	}
	.parsonInformationList>.personImage>image{
		width: 80upx;
	}
	
	.icomeList{
		width: 100%;
		margin-top: 36upx;
		display: flex;
		flex-direction: row;
	}
	.icomeList>.icomeListItem{
		width: 25%;
		text-align: center;
	}
	.icomeList>.icomeListItem>uni-view:nth-of-type(1){
		margin-bottom: 20upx;
	}
	
	.navList{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 60upx;
		margin-left: 5%;
		width: 90%;
		height: 120upx;
		border-radius: 10upx;
		background: #FFFFFF;
	}
	.navList>.navListItem{
		text-align: center;
		width: 33.3%;
	}
	.navList>.navListItem>uni-view:nth-of-type(1){
		margin-bottom: 20upx;
	}
	
	.featureList{
		margin-left: 5%;
		margin-top: 50upx;
		width: 90%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.featureList>.featureListItem{
		position: relative;
		width: 30%;
		text-align: center;
		margin-right: 5%;
		height: 200upx;
		border-radius: 10upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		
	}
	.featureListItem > .imageIcon{
		margin-top: 50upx;
		width: 80upx;
	}
	.featureListItem > .imageIcon image{
		display: block;
		width: 100%;
		height: 100%;
	}
	.featureList>.featureListItem>uni-view:nth-of-type(2){
		position: absolute;
		bottom: 10upx;
		left: 0;
		width: 100%;
		text-align: center;
	}
	.featureList>.featureListItem:nth-of-type(1){
		background-color: rgba(162,157,249,.6);
	}
	.featureList>.featureListItem:nth-of-type(2){
		background-color: rgba(140,202,153,.6);
	}
	.featureList>.featureListItem:nth-of-type(3){
		background-color: rgba(231,162,133,.6);
	}
	/* .featureList>.featureListItem:nth-of-type(4){
		background-color: rgba(247,188,94,.6);
	} */
	.featureList>.featureListItem:nth-of-type(4){
		background-color: rgba(231,162,133,.6);
	}
	.featureList>.featureListItem:nth-child(n+4){
		margin-top: 40upx;
	}
	.featureList>.featureListItem:nth-child(3n){
		margin-right: 0;
	}
</style>
