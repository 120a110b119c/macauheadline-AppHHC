<template>
	<view>
		<view class="header">
			<view class="headerBtn">
				<view>
					<view class="icon iconfont icon-zuojiantou"></view>
					<view @tap="back()">返回</view>
				</view>
				<view class="icon iconfont icon-shenglvehao"></view>
			</view>
			<view class="headerBg"></view>
			<view class="shopInfo">
				<view class="shopInfo_tit">
					<view class="left">
						<view class="shopName">
							<view>{{data.SevTitle}}</view>
							<view>
								<image :src="data.SevImage?data.SevImage:'../../../../static/storePage/couponPage/govement.jpg' " mode="widthFix"></image>
							</view>
						</view>
						<!-- <view class="startList">
							<image src="../../../../static/storePage/couponPage/startShow.jpg" mode="widthFix"></image>
							<image src="../../../../static/storePage/couponPage/startShow.jpg" mode="widthFix"></image>
							<image src="../../../../static/storePage/couponPage/startShow.jpg" mode="widthFix"></image>
							<image src="../../../../static/storePage/couponPage/startShow.jpg" mode="widthFix"></image>
							<image src="../../../../static/storePage/couponPage/startHide.jpg" mode="widthFix"></image>
						</view> -->
						<!-- <view class="MemberCollection">
							<image src="../../../../static/storePage/couponPage/MemberCollection.jpg" mode="widthFix"></image>
						</view> -->
					</view>
					<view class="shopImage" v-if="!data.SevImage">
						沒有頭像
					</view>
					<view v-else  class="shopImages">
						<image :src="data.SevImage" mode="aspectFill"></image>
					</view>
				</view>
				<view class="shopItem" v-html="data.SevContent">商家介绍......</view>
				<view class="shopItem">联系方式 ：{{data.SevTel}}</view>
				<view class="shopBottom">
					<view style="max-width: 235px;">地址:{{data.SevAddr}}</view>
					<view class="shopBottom_pick">
						<picker @change="bindPickerChange" :range="rangeList">
							<label>{{chooesRange=='个活动'?rangeList.length:''}}{{chooesRange}}</label>
						</picker>
						<view class="icon iconfont icon-xiala" style="color: #000000;"></view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="navbar">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" @click="tabClick(index)">
					<view  :class="[tabCurrentIndex === index? 'bg-red' : 'bg-gray' ]" >{{item.text}}</view>
					<view v-if="item.introduce === '介绍'" class="introduce">{{item.introduce}}</view>
					<view class="line" :class="{ current: tabCurrentIndex === index }"></view>
				</view>
			</view>
			<view class="list" v-if="tabCurrentIndex == 0">
				<view class="listItems" v-if="imageList.length != 0">
					<view class="title">優惠活動</view>
					<view class="imgeList">
						<scroll-view scroll-x="true" class="scroll">
							<view class="scrollView" :style="{width:ComputeWidth+'%'}">
								<view class="scrollItem" v-for="(item,index) in imageList" :key='index'>
									<view style="width: 250upx;" v-if="item.cpnImage ==''">
										<coupon-page v-if="item.cpnType === '1'" homeShow="1" textOne="￥" :textTwo="item.cpnAmount"
										 :cpnName="item.cpnName"  @click.native="toDeatil(item)"></coupon-page>
										 <coupon-page  v-else-if="item.cpnType === '2'" homeShow="1" textOne="￥" :textTwo="item.cpnMinCharge"
										  :cpnName="item.cpnName"  @click.native="toDeatil(item)"></coupon-page>
										<coupon-page v-else homeShow="6" :textOne="item.cpnDiscount" textTwo="折" cpnName="折扣劵"  @click.native="toDeatil(item)"></coupon-page>
									</view>
									<view v-else style="width: 260upx;height: 190upx;"  @tap="toDeatil(item)">
										<coupon-page  style="width: 260upx;height: 190upx;" :image="item.cpnImage" homeShow="4" :textOne="''" textTwo="" cpnName=""></coupon-page>
									</view>
									<view style="color: #2e3138;padding: 0 10upx;margin-top: 20upx;">{{item.title}}</view>
									<view style="color: #c0c0c0;font-size: 14upx;margin: 10upx 0;padding: 0 10upx;box-sizing: border-box;">已售{{item.cpnCount}}张</view>
									<view class="manjian">
										<view style="color: #fe4800;">{{item.cpnName}}</view>
										<view class="icon iconfont icon-jiahao"></view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<u-empty v-else img-width='170' margin-top='120' :show='imageList.length == 0' text="您暫時沒有優惠卷數據了" mode="list"></u-empty>
				<view class="listItems"  v-if="imageList.length != 0">
					<view class="title">店鋪商品</view>
					<view class="shoppingItem" v-for="(item,i) in shoppingArray" :key="i">
						<view class="image">
							<image :src="item.cmdPic" mode="aspectFill"></image>
						</view>
						<view class="rightContent">
							<view>名稱: <span style="margin-left: 10upx;">{{item.cmdName}}</span></view>
							<view class="contentBox">
								<view class="descript">描述:</view>
								<view></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list" v-if="tabCurrentIndex == 1">
				開發中,盡情期待
			</view>
			<view class="list" v-if="tabCurrentIndex == 2">
				開發中,盡情期待
			</view>
		</view>
	</view>
</template>

<script>
	import FullReduction from "../childComponent/common/CouponTopBox/FullReduction.vue"
	import couponPage from "../childComponent/content/couponPage.vue"
	export default {
		data() {
			return {
				SevId: '',
				data: {},
				userInfoUsrId:"",
				ComputeWidth: 0,
				chooesRange: '个活动',
				rangeList: [],
				tabCurrentIndex: 0,
				imageList: [],
				navList: [{
						id: 0,
						text: '优惠卷',
						introduce:''
					},
					{
						id: 1,
						text: '评价',
						introduce:''
					},
					{
						id: 2,
						text: '商家',
						introduce:'介绍'
					}
				],
				shoppingArray:''
			}
		},
		components:{
			FullReduction,
			couponPage
		},
		onLoad(options) {
			this.SevId = options.SevId;
			console.log('optionshhc',options)
			this.getItemDetail();
		},
		methods: {
			toDeatil(value){
				uni.setStorageSync('shopDetailsDatas',value)
				uni.navigateTo({
					url:"../../../me/shoppingNumbers/shoppingNumDetail/index"
				})
			},
			back(){
				uni.navigateBack()
			},
			getUserId(){
				let userData = uni.getStorageSync('data');
				if (userData) {
					this.userInfoUsrId = userData.usrId;
				}
			},
			getData(){
				let SevId = this.SevId;
				this.requestPost({
					"action":'getbizdetail',
					"bizId": SevId
				}).then(response =>{
					if(response.data.result == 'suc'){
						console.log('response.data.cpnData',response.data.cpnData)
						this.imageList = response.data.cpnData;
						this.imageList.forEach((item,index)=>{
							this.rangeList.push(item.cpnName)
						})
						this.shoppingArray =  response.data.cmdData;
						this.imageWidht();
					}else{
						uni.showToast({
							icon:'none',
							title:response.data.msg
						})
					}
				})
			},
			imageWidht() {
				this.ComputeWidth = (this.imageList.length - 2) * 36 + 76;
			},
			bindPickerChange(e) {
				this.rangeIndex = e.target.value;
				this.chooesRange = this.rangeList[this.rangeIndex]
			},
			tabClick(index) {
				this.loginClass = index;
				this.tabCurrentIndex = index;
			},
			
			getItemDetail(){
				let SevId = this.SevId;
				this.requestPost({
					"action": 'getservicedetail',
					"sevId": SevId
				}).then(response =>{
					if(response.data.result == 'suc'){
						this.data = response.data;
					}else{
						uni.showToast({
							icon:'none',
							title:response.data.msg
						})
					}
				})
			}
		},
		onShow() {
			this.getUserId(); //獲取用戶id
			// this.getData();
		}
	}
</script>

<style scoped>
	.bg-red{
		color: #f12e2e;
		font-weight: bold;
	}
	.bg-gray{
		color: #b8b9be;
	}
	.black{
		color: #010101;
	}
	
	
	
	.header {
		width: 100%;
		padding-top: 60upx;
	}

	.headerBtn {

		padding: 0 30upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
	}

	.headerBtn uni-view:nth-of-type(1) {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.headerBtn uni-view:nth-of-type(1)>.icon,
	.headerBtn>.icon {
		font-size: 50upx;
		color: #FFFFFF;
	}

	.headerBtn uni-view:nth-of-type(1)>uni-view {
		font-size: 32upx;
		color: #FFFFFF;
	}

	.headerBg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		background: url('../../../../static/storePage/couponPage/headerBg.jpg') center center no-repeat;
		background-size: 100% 100%;
		min-height: 380upx;
	}
	.shopInfo {
		margin: 0 40upx;
		margin-top: 20upx;
		padding: 20upx;
		width: 90%;
		display: flex;
		border-radius: 30upx;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border: 2px solid #FFFFFF;
		box-shadow: darkgrey 5px 5px 15px 5px; 
	}

	.shopInfo_tit {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
	.shopInfo_tit>.left{
		max-width: 470upx;
		min-height: 100upx;
	}
	.shopInfo_tit>.left>.shopName {
		display: flex;
		flex-direction: row;
	}

	.shopImage {
		position: absolute;
		top: 150upx;
		right: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 150upx;
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		color: #FFFFFF;
		background: linear-gradient(#3b74ff, #279bfe, #19aefe);
	}
	.shopImages{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
		color: #FFFFFF;
		background: linear-gradient(#f1e7e7, #f1e7e7, #f1e7e7);
	}
	.shopImages > uni-image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.shopName>uni-view:nth-of-type(1) {
		font-size: 32upx;
		font-weight: bold;
		letter-spacing: 2upx;
	}

	.shopName>uni-view:nth-of-type(2) {
		width: 150upx;
		margin-left: 10upx;
	}

	.shopName>uni-view:nth-of-type(2)>uni-image {
		width: 100%;
		height: 100%;
	}

	.startList {
		display: flex;
		flex-direction: row;
	}

	.startList uni-image {
		width: 8%;
	}

	.MemberCollection {
		margin: 20upx 0;
	}

	.MemberCollection uni-image {
		width: 60%;
	}

	.shopItem {
		font-size: 24upx;
		margin-bottom: 10upx;
	}

	.shopBottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}

	.shopBottom_pick {
		display: flex;
		flex-direction: row;
		max-width: 150upx;
	}


	.navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		width: 100%;
		margin-top: 30upx;
		border-bottom: 2upx solid #e5e5e5;
	}

	.current {
		border-bottom: 6upx solid red;
		border-radius: 4upx;
		color: #010101;
	}

	.nav-item {
		position: relative;
		height: 64upx;
	}
	.nav-item > uni-view:nth-of-type(1){
		font-size: 34upx;
	}
	
	.nav-item>.introduce{
		position: absolute;
		right: -70upx;
		top: 6upx;
		text-align: center;
		width: 66upx;
		height: 36upx;
		line-height: 30upx;
		border-radius: 20upx;
		background-color: #ed938b;
		color: #ffff;
		font-size: 24upx;
		padding: 4upx;
	}
	.nav-item>.line {
		position: absolute;
		left: 50%;
		margin-left: -35upx;
		width: 70upx;
		margin-top: 14upx;
		overflow: hidden;
	}


	
	.listItems {
		width: 100%;
		padding: 30upx 0 0 30upx;
		box-sizing: border-box;
	}
	.list>.listItems:nth-of-type(2){
		padding: 30upx 30upx 0 30upx;
	}
	.listItems > .title{
		color: #010101;
		font-size: 32upx;
		font-weight: bold;
		letter-spacing: 3upx;
	}
	
	.listItems > .shoppingItem{
		width: 100%;
		display: flex;
		flex-direction: row;
		box-shadow: 0px 0px 13upx #CCCCCC;
		border-radius: 20upx;
		padding: 20upx;
		box-sizing: border-box;
		margin: 30upx 0;
	}
	
	.listItems > .shoppingItem > .image{
		width: 1020upx;
		height: 250upx;
	}
	
	.shoppingItem > .rightContent{
		margin-left: 10upx;
	}
	.rightContent > .contentBox{
		display: flex;
		flex-direction: row;
		margin-top: 10upx;
		height: 80%;
	}
	
	.contentBox >.descript{
		width: 240upx;
		margin-right: 10upx;
		color: #CCCCCC;
	}
	
	.contentBox>uni-view:nth-of-type(2){
		color: #CCCCCC;
	}
	
	.shoppingItem > .image >uni-image{
		width: 100%;
		height: 100%;
	}
	
	.imgeList {
		margin-top: 20upx;
	}

	.scrollItem {
		display: inline-block;
		/* width: 266upx; */
		margin-right: 10upx;
	}

	.scrollItem uni-image {
		width: 100%;
	}

	.manjian {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10upx;
		box-sizing: border-box;
	}

	.manjian>.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50upx;
		height: 50upx;
		background-color: #dc0000;
		color: #FFFFFF;
		border-radius: 50%;
		padding: 10upx;
		font-size: 26upx;
	}
</style>
