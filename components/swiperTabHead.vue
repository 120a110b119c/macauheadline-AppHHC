<template>
	<view class="uni-tab-bar">
		<scroll-view class="uni-swiper-tab" scroll-x :scroll-into-view="scrollInto">
			<block v-for="(tab,index) in tabBars" :key="tab.MdlName" :style="scrollStyle">
				<view class="swiper-tab-list" :class="{'active' : tabIndex==index}" @tap="tabtap(index)" :style="scrollItemStyle">
					<span class="swiper-tab-text">{{tab.MdlName}} {{tab.num?tab.num:""}}</span>
					<view class="swiper-tab-line"></view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			scrollInto:String,
			tabBars: Array,
			tabIndex: Number,
			scrollStyle: {
				type: String,
				default: ""
			},
			scrollItemStyle: {
				type: String,
				default: ""
			}
		},
		methods: {
			//点击切换导航
			tabtap(index) {
				this.$emit('tabtap', index)
			}
		}
	}
</script>

<style scoped>
	.uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		border-bottom: 1px solid #C8C7CC;
	}

	.swiper-tab-list {
		display: inline-block;
		margin-right: 64upx;
		margin-left: 10upx;
		color: #969696;
		font-weight: bold;
	}

	.uni-tab-bar .active {
		color: #343434;
	}

	.swiper-tab-text {
		display: inline-block;
		padding-bottom: 6upx;
	}

	.active .swiper-tab-line {
		width: 35px;
		height: 3px;
		background-color: #FEDE33;
		border-radius: 10px
	}
	.navTitle>span{
		display: block;
		width: 100%;
		border-right: 1upx soli #010101;
	}
</style>
