<template>
	<view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in imageList" :key="index" @click="tolick(item)">
					<view class="swiper-item uni-bg-red">
						<image :src="item.pic" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
	export default {
		props:{
			interval:Number,
			duration:Number,
			imageList:Array
		},
		data() {
			return {
				background: ['color1', 'color2', 'color3']
			}
		},
		methods:{
			tolick(item){
				if(item.url){
					let _this = this;
					uni.navigateTo({
						url: "../../lift/UrlDeatils/UrlDeatils?val=" + item.url
					});
					_this.$emit('child-event','999');
				}
			}
		}
	}
</script>

<style scoped>
	.uni-margin-wrap {
		position: relative;
		width:100%;
		height: 100%;
	}
	uni-view{
		width: 100%;
		height: 100%;
	}
	.swiper {
		height: 100%;
	}
	.swiper-item {
		display: block;
		width: 100%;
		height: 100%;
		line-height: 100%;
		text-align: center;
	}
	uni-image{
		display: block!important;
		width: 100%!important;
		height: 100%!important;
	}
	uni-image img{
		display: block!important;
		width: 100%!important;
		height: 100%!important;
	}
	uni-swiper .uni-swiper-dots-horizontal{
		bottom: 25px!important;
	}
	.uni-swiper-dot-active {
	    background-color: #fff!important;
	}
</style>
