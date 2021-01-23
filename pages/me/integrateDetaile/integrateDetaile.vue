<template>
	<view class="page">
		<header-title :title='"積分規則"' @toBack='goBack' :iconfont='"&#xe735;"'></header-title>
		<view class="allView">
			<view class="list">
				<view class="list-item">
					<view class="list-item-name" v-if="list.IntRead">{{list.IntRead?'閱讀':''}}</view>
					<view class="list-item-content"  v-if="list.IntRead">
						<view class="numbers">+ {{list.IntRead}}</view>
						<view class="iconfont">&#xe633;</view>
					</view>
				</view>
				<view class="list-item">
					<view class="list-item-name" v-if="list.IntShare">{{list.IntShare?'分享':''}}</view>
					<view class="list-item-content" v-if="list.IntShare">
						<view class="numbers">+ {{list.IntShare}}</view>
						<view class="iconfont">&#xe633;</view>
					</view>
				</view>
				<view class="list-item">
					<view class="list-item-name" v-if="list.IntDiscuss">{{list.IntDiscuss?'評論':''}}</view>
					<view class="list-item-content" v-if="list.IntDiscuss">
						<view class="numbers">+ {{list.IntDiscuss}}</view>
						<view class="iconfont">&#xe633;</view>
					</view>
				</view>
				<view class="list-item">
					<view class="list-item-name" v-if="list.IntShareToRead">{{list.IntShareToRead?'分享被閱讀':''}}</view>
					<view class="list-item-content" v-if="list.IntShareToRead">
						<view class="numbers">+ {{list.IntShareToRead}}</view>
						<view class="iconfont">&#xe633;</view>
					</view>
				</view>
				<view class="list-item">
					<view class="list-item-name" v-if="list.IntFriend">{{list.IntFriend?'推薦':''}}</view>
					<view class="list-item-content" v-if="list.IntFriend">
						<view class="numbers">+ {{list.IntFriend}}</view>
						<view class="iconfont">&#xe633;</view>
					</view>
				</view>
				<view class="list-item">
					<view class="list-item-name" v-if="list.IntReg">{{list.IntReg?'註冊':''}}</view>
					<view class="list-item-content" v-if="list.IntReg">
						<view class="numbers">+ {{list.IntReg}}</view>
						<view class="iconfont">&#xe633;</view>
					</view>
				</view>
				<view class="list-item">
					<view class="list-item-name" v-if="list.IntFeedback">{{list.IntFeedback?'反饋意見':''}}</view>
					<view class="list-item-content" v-if="list.IntFeedback">
						<view class="numbers">+ {{list.IntFeedback}}</view>
						<view class="iconfont">&#xe633;</view>
					</view>
				</view>
			</view>
			<view class="copyrightSymbol">©澳門頭條:&nbsp;macauheadline.com</view>
		</view>
	</view>
</template>

<script>
	import headerTitle from '../../../components/header-title/index.vue'
	export default{
		data(){
			return{
				list:{}
			}
		},
		components:{
			headerTitle
		},
		methods:{
			toMe(){
				uni.switchTab({
					url:'../me'
				})
			},
			goBack(){
				uni.navigateBack({
				    delta: 1,
				    animationType: 'slide-out-right',
				    animationDuration: 300
				});
			},
		},
		onLoad() {
			var serverUrl = this.serverUrl;
			uni.request({
				url: serverUrl,
				data: {
					"action": "getintegral"
				},
				dataType: 'json',
				success: (res) => {
					this.list = res.data;
					console.log(res,'积分获取');
				},
				fail: (error) => {
					console.log(error, '登录报错');
				}
			});
		}
	}
</script>

<style scoped>
	.allView{
		background-color: white;
		position: relative;
	}
.page{
	width: 100%;
	height: 100%;
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
	justify-content: space-between;
	width: 100%;
}


.leftInfo>.iconfont{
	display: inline-block;
	color: #fff;
	font-size: 46upx;
}
.leftInfo>.text{
	display: inline-block;
	color: #fff;
	line-height: 40upx;
	font-size: 30upx;
}
.navContent>.title{
	text-align: center;
	color: #fff;
	font-size: 36upx;
}
.navRight>.iconfont{
	display: inline-block;
	color: #fff;
	font-size: 46upx;
}
.navRight>.text{
	display: inline-block;
	margin-left: 4upx;
	color: #fff;
	font-size: 30upx;
}

.list{
	display: flex;
	width: 100%;
	height: 100%;
	padding: 0 20upx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	box-sizing:border-box;
}
.list-item{
	display: flex;
	width: 100%;
	padding: 30upx 0;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	box-sizing:border-box;
	border-bottom: 1px solid #CCCCCC;
}
.list-item:last-child{
	border: none;
}
.list-item-name{
	width: 80%;
	font-size: 30upx;
}
.list-item-content{
	display: flex;
	width: 20%;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}
.list-item-content>.iconfont{
	font-size: 50upx;
}


.copyrightSymbol{
	width: 100%;
	margin-top: 40upx;
	margin-bottom: 40upx;
	text-align: center;
	font-size: 32upx;
	position: fixed;
	bottom: 10upx;
}
</style>
