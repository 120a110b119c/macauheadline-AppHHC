<template>
	<view class="page">
		<header-title :title='"關於澳門頭條"' @toBack='toMe()' :backText="'我的'" :iconfont='"&#xe728;"'></header-title>
		<scroll-view scroll-y  :style="{height: (swiperheight+50) + 'px',marginTop: 0 }">
			<!-- <view class="bgColor"></view>
			<view class="nav">
				<view class="navContent" @tap="toMe()">
					<view class="iconfont">&#xe728;</view>
					<view class="text">我的</view>
					<view class="title">關於澳門頭條</view>
				</view>
			</view> -->
			<view class="wrap_box">
				<view class="box">
					<view class="componyImg">
						<image src="../../../static/about/weiIcon.png" alt="">
					</view>
					<view class="text">
						澳門頭條是一款智能聚合澳門及世界各地新聞資訊的軟件,一網打盡你的新聞需求,
						它基於大數據挖掘,為用戶推薦每日的澳門頭條及國内國際快訊,立足澳門本土,
						關注澳門人澳門事,深度挖掘澳門新聞,為澳門市民及各地游客提供澳門最新資訊、
						智能生活和便民服務,豐富你的掌上生活。
					</view>
					<view class="treaty" >
						<text @click="toXiYi">用戶協議</text>
						<text @click="toYinSi">隱私政策</text>
					</view>
					<view class="list">
						<view class="youxiang">郵箱:&nbsp;macauheadline@hotmail.com</view>
						<view class="phone">
							<view class="phone_one">電話:&nbsp;(00853)66472833</view>
							<view class="phone_two">(0086)13825636623</view>
						</view>
						<!-- <view class="adress">地址:&nbsp;澳門商業大馬路澳門財富中心五樓</view> -->
						<view class="edition">當前版本:&nbsp;{{version}}</view>
					</view>
				</view>
			</view>
			<view class="copyrightSymbol">©澳門頭條:&nbsp;macauheadline.com</view>
		</scroll-view>
	</view>
</template>

<script>
	import  headerTitle  from '@/components/header-title/index.vue'
	export default{
		data(){
			return{
				version:"",
				swiperheight:0,
			}
		},
		components:{
			headerTitle
		},
		onShow() {
			this.getVersion();//获取设置版本公共变量
		},
		onLoad() {
			this.getPageHeight(); //获取滚动页面高度
		},
		methods:{
			toXiYi(){
			    uni.navigateTo({
			    	url:'../xieYi/xieYi'
			    })
			},
			toYinSi(){
				uni.navigateTo({
					url:'../privacy/index'
				})
			},
			//获取滚动页面高度
			getPageHeight() {
				uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - uni.upx2px(100)
						this.swiperheight = height;
					}
				});
			},
			getVersion(){
				let versionValue = this.versionData;
				this.version = versionValue;
			},
			toMe(){
				uni.switchTab({
					url:'../me'
				})
			}
		}
	}
</script>

<style scoped>
.page{
	width: 100%;
	height: 100%;
	background-color: #f2f6f9;
}
.bgColor{
	width: 100%;
	height: 40upx;
	background-color: #dc5340;
}
.nav{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	background-color: #dc5340;
}
.navContent{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
}
.navContent>.iconfont{
	color: #fff;
	font-size: 46upx;
}
.navContent>.text{
	color: #fff;
	font-size: 30upx;
}
.navContent>.title{
	width: 86%;
	text-align: center;
	color: #fff;
	font-size: 36upx;
}


.wrap_box{
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 100%;
	margin-top: 20upx;
}
.box{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	width: 660upx;
	height: 100%;
	padding: 0 20upx;
	background-color: #fff;
	border: 1px solid #f0f0f0;
}
.componyImg{
	margin-top: 20upx;
	width: 300upx;
	height: 300upx;
	margin-bottom: 20upx;
}
.componyImg uni-image{
	display: block;
	width: 100%;
	height: 100%;
}
.box>.text{
	letter-spacing: 2upx;
	text-align:justify;
	text-justify:inter-word;
	font-size: 34upx;
	line-height: 50upx;
}
.box>.treaty{
	width: 100%;
	height: 100upx;
	line-height: 100upx;
	text-align: center;
	font-size: 30upx;
	color: #0000EE;
	text-decoration: underline;
	letter-spacing: 4upx;
	display: flex;
	justify-content: space-around;
}

.box>.list{
	width: 100%;
}
.box>.list>.youxiang,.box>.list>.phone,.box>.list>.adress{
	font-size: 34upx;
	line-height: 60upx;
}
.box>.list>.edition{
	margin-top: 60upx;
	margin-bottom: 40upx;
	font-size: 34upx;
}

.copyrightSymbol{
	width: 100%;
	margin-top: 40upx;
	margin-bottom: 40upx;
	text-align: center;
	font-size: 32upx;
}
.phone_two{
	text-indent: 2.5em;
}
</style>
