<template>
	<view class="page">
		<header-title :title='"商品詳情"' :backText="'返回'" @toBack='back' :iconfont="'&#xe728;'"></header-title>
		<view class="title">
			<!-- <view class="icon iconfont icon-zuojiantou" @click="back"></view> -->
			<!-- 轮播图 start -->
			<index-swiper :swiperList="swiperList" @currentIndex="currentIndex"></index-swiper>
			<!-- 轮播图 end -->
			<view class="buttom">
				{{current?Number(current)+1:current+1}}/{{swiperList.length}}
			</view>
		</view>
		<view class="content">
			<view class="contentItem">
				<view>名稱:</view>
				<view>{{objValue.cmdName}}</view>
			</view>
			<view class="contentItem">
				<view>描述:</view>
				<view>{{objValue.cmdDesc}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import indexSwiper from "./component/swiper.vue" //轮播图组件
	import headerTitle from '@/components/header-title/index.vue'
	export default{
		data(){
			return{
				swiperList:[],
				current:0,
				userInfoUsrId:null,//優惠卷id
				objValue:null
			}
		},
		components:{
			indexSwiper,
			headerTitle
		},
		onLoad(op) {
			if(op){
				let data = uni.getStorageSync('shopArray');
				this.objValue = data;
				this.userInfoUsrId = data.cmdId
			}
			this.getData()
		},
		methods:{
			back(){
				uni.navigateTo({
					url:"../shopManage/index"
				})
			},
			currentIndex(value){
				this.current = value
			},
			getData(){
				this.$Httpps
					.sttp({
						"action": "getcmddetail",
						"cmdId": this.userInfoUsrId
					})
					.then(res => {
						if (res.data.result == 'suc') {
							this.objValue = res.data;
							if( this.objValue.cmdPic!='' ){
								this.swiperList.push({
									DatPic:this.objValue.cmdPic
								})
							}
							if( this.objValue.cmdPic2!='' ){
								this.swiperList.push({
									DatPic:this.objValue.cmdPic2
								})
							}
							if( this.objValue.cmdPic3!='' ){
								this.swiperList.push({
									DatPic:this.objValue.cmdPic3
								})
							}
						}
					}).catch(err => {
						console.log(err);
				});
			}
		}
	}
</script>

<style scoped>
	.page{
		width: 100%;
		height: 100%;
	}
	.title{
		position: relative;
		width: 100%;
		height: 334upx;
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
	
	.title>.icon-zuojiantou{
		position: absolute;
		top: 20upx;
		left: 20upx;
		z-index: 100;
		width: 80upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 50%;
		background-color: rgba(144,144,144,.8);
		color: #FFFFFF;
		font-size: 80upx;
		text-align: center;
	}
	.title>.buttom{
		position: absolute;
		bottom: -60upx;
		right: 20upx;
		width: 100upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		background-color: rgba(76,54,30,.8);
		color: #FFFFFF;
		font-size: 32upx;
		border-radius: 50upx;
	}
	
	.content{
		margin-top: 72upx;
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}
	.content > .contentItem{
		width: 100%;
		display: flex;
		flex-direction: row;
		border-bottom: 2upx solid #eeeeee;
	}
	.content > .contentItem:nth-of-type(2){
		margin-top: 20upx;
		border-bottom: 8upx solid #eeeeee;
	}
	.content > .contentItem >uni-view:nth-of-type(1){
		width: 120upx;
		height: 100upx;
		color: #999999;
	}
	.content > .contentItem >uni-view:nth-of-type(2){
		width: 100%;
		height: 100upx;
	}
</style>
