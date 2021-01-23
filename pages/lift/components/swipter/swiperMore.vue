<template>
	<view class="swiper-view">
		<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="change">
			<swiper-item v-for="(swiper,index) in swiperList " :key="index" class="listWrap">
				<view v-for="(items,indexs) in  swiper.DataListItem" class="DataList">
					<view class="DataListItems"  @tap="toMySearch(items)">
						<image style="width: 60upx;height: 60upx;" :src="items.StpImg"></image>
						<view class="text">
							{{items.StpName}}
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<swiper-dot class="dot" :current="current" :list="swiperList"></swiper-dot>
	</view>
</template>

<script>
	import swiperDot from './swiperDot.vue';
	export default {
		props: {
			indicatorDots: {
				type: Boolean,
				required: false,
				default: true
			},
			autoplay: {
				type: Boolean,
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
		components: {
			swiperDot
		},
		methods: {
			toMySearch(val) {
				var StpId = val.StpId;
				uni.navigateTo({
					url: "../../../mySearch/mySearch?StpId=" + StpId + "&StpStyle=" + val.StpStyle
				})
			},
			itemTap(items) {
				if (items.AdvLink) {
					uni.navigateTo({
						url: "/pages/lift/UrlDeatils/UrlDeatils?val=" + items.AdvLink
					})
				}
			},
			change(e) {
				this.current = e.detail.current;
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
		position: relative;
		height: 550upx !important;
	}

	.dot {
		position: absolute;
		bottom: 20upx;
	}

	.dot>.drag-item {
		background-color: red !important;
	}

	.dot>.active {
		background-color: #FBA52F !important;
	}

	.listWrap {
		display: flex;
		flex-direction: row;
		width: 100%;
		flex-wrap: wrap
	}

	.DataList {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 25%;
		height: 25%;
	}

	.DataListItems {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	.DataListItems>.text {
		height: 50upx;
		line-height: 50upx;
	}

	.swiper-view {
		width: 100%;
	}

	.swiper {
		width: 100%;
		height: 100%;
	}


	image {
		width: 100%;
	}
</style>
