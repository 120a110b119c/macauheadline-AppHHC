<template>
	<view class="swiper-view">
		<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration"
		 :circular="circular" :indicator-active-color="indicatorActiveColor"  @change="change" style="width: 100%;">
			<swiper-item v-for="swiper in swiperList" :key="swiper.DatId" style="width: 100%;">
				<image mode="aspectFill" :src="swiper.DatPic" style="height: 100%;width: 100%;" @click="itemTap(swiper)"></image>
			</swiper-item>
		</swiper>
		<swiper-dot class="dot" :current="current" :list="swiperList" style="display: none;"></swiper-dot>
	</view>
</template>

<script>
	import swiperDot from './swiperDot.vue';
	export default {
		props: {
			autoplay: {
				type: Boolean,
				required: false,
				default: false
			},
			circular: {
				type: Boolean,
				required: false,
				default: true
			},
			indicatorActiveColor: {
				type: String,
				required: false,
				default: "#ffffff"
			},
			interval: {
				type: Number,
				required: false,
				default: 3000
			},
			duration: {
				type: Number,
				required: false,
				default: 500
			},
			swiperList: Array
		},
		components:{
			swiperDot
		},
		methods: {
			itemTap(items) {
				if (items.AdvLink) {
					uni.navigateTo({
						url: "/pages/lift/UrlDeatils/UrlDeatils?val=" + items.AdvLink
					})
				}

			},
			change(e) {
				this.current = e.detail.current;
				this.$emit('currentIndex',this.current)
			}
		},
		data() {
			return {
				current: 0
			}
		}
	}
</script>

<style scoped>
	.swiper-view {
		width: 100%;
	}

	.swiper {
		width: 100%;
		height: 100%;
	}

	.uni-swiper-dots>.uni-swiper-dots-horizontal {
		bottom: 84upx !important;
	}
	image {
		width: 100%;
	}
</style>
