<template>
	<view style="height: 140upx;">
		<view class="headerTitle">
			<view class="bgColor"></view>
			<view class="nav">
				<view class="myIcon" @tap="toBack()">
					<view class="iconfont" v-html="iconfont"></view>
					<view class="text">{{backText}}</view>
				</view>
				<view class="title">{{title}}</view>
			</view>
		</view>
		<custom-cover ref='customCoverRef'></custom-cover>
	</view>
</template>

<script>
	export default{
		name:"headerTitle",
		props:{
			title: {
			  type: String,
			  default: "澳門頭條"
			},
			backText: {
			  type: String,
			  default: ""
			},
			iconfont:{
				type: String,
				default: ""
			}
		},
		methods:{
			toBack(){
				this.$emit('toBack')
			},
			headChangeDark(value){
				this.$refs.customCoverRef.changeDarkMode(value)
			},
		}
	}
</script>

<style scoped>
.headerTitle{
	height: 120upx;
	position: fixed;
	width: 100%;
	z-index: 9;
	top: 0;
}
.bgColor {
		width: 100%;
		height: 60upx;
		background-color: #dc5340;
	}
.nav{
	display: flex;
	height: 80upx;
	line-height: 80upx;
	background-color: #dc543e;
	width: 100%;
}
 .myIcon{
	position: absolute;
	display: flex;
	flex-direction: row;
	color: white;
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

</style>
